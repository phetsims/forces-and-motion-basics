// Copyright 2013-2025, University of Colorado Boulder

/**
 * Shows the graphic for the puller, which can be dragged from the toolbox to the rope to apply force.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Image, { ImageOptions } from '../../../../scenery/js/nodes/Image.js';
import { ImageableImage } from '../../../../scenery/js/nodes/Imageable.js';
import ForcesAndMotionBasicsQueryParameters from '../../common/ForcesAndMotionBasicsQueryParameters.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import NetForceHotkeyData from '../NetForceHotkeyData.js';
import Knot from '../model/Knot.js';
import NetForceModel from '../model/NetForceModel.js';
import Puller, { PullerMode } from '../model/Puller.js';
import PullerFocusManager from './PullerFocusManager.js';


type SelfOptions = EmptySelfOptions;
type PullerNodeOptions = ImageOptions & SelfOptions;

export default class PullerNode extends Image {
  public standImage: ImageableImage;
  private readonly dragListener: SoundDragListener;
  private keyboardListener: KeyboardListener<OneKeyStroke[]> | null = null;
  private readonly model: NetForceModel;
  private readonly focusManager: PullerFocusManager;

  // Track whether this puller was originally attached to a knot when grabbed (for focus management)
  private wasOriginallyOnRope = false;
  
  // Track the stable mode before grabbing (for transfer logic)
  private preGrabMode: PullerMode | null = null;
  
  // Track original state for escape key functionality
  private originalMode: PullerMode | null = null;
  private originalPosition: Vector2 | null = null;

  /**
   * Create a PullerNode for the specified puller
   *
   * @param puller
   * @param model
   * @param image image of the puller standing upright
   * @param pullImage image of the puller exerting a force
   * @param [providedOptions]
   */
  public constructor(
    public readonly puller: Puller,
    model: NetForceModel,
    focusManager: PullerFocusManager,
    image: ImageableImage,
    public pullImage: ImageableImage,
    providedOptions?: PullerNodeOptions ) {

    const x = puller.positionProperty.get().x;
    const y = puller.positionProperty.get().y;

    const options = optionize<PullerNodeOptions, SelfOptions, ImageOptions>()( {
      phetioInputEnabledPropertyInstrumented: true,
      phetioFeatured: true,
      visiblePropertyOptions: { phetioFeatured: true }
    }, providedOptions );

    super( image, {
      x: x,
      y: y,
      cursor: 'pointer',
      scale: 0.86,
      tagName: 'button'
    } );

    this.puller.node = this; //Wire up so node can be looked up by model element.
    this.standImage = image;
    this.model = model;
    this.focusManager = focusManager;

    model.hasStartedProperty.link( () => {
      this.updateImage( puller, model );
      this.updatePosition( puller, model );
    } );
    puller.positionProperty.link( () => {
      this.updateImage( puller, model );
      this.updatePosition( puller, model );
    } );

    model.hasStartedProperty.link( () => {
      this.updateImage( puller, model );
      this.updatePosition( puller, model );
    } );
    model.isRunningProperty.link( () => {
      this.updateImage( puller, model );
      this.updatePosition( puller, model );
    } );
    model.stateProperty.link( () => {
      this.updateImage( puller, model );
      this.updatePosition( puller, model );
    } );

    this.dragListener = new SoundDragListener( {
        tandem: options.tandem?.createTandem( 'dragListener' ),
        allowTouchSnag: true,
        positionProperty: puller.positionProperty,
        start: event => {

          // check to see if a puller is knotted - if it is, store the knot
          const knot = puller.knotProperty.get();

          // Set the appropriate dragging mode based on input type
          if ( event.pointer.isTouchLike() ) {
            puller.modeProperty.set( 'touchDragging' );
          }
          else {
            puller.modeProperty.set( 'mouseDragging' );
          }

          // disconnect the puller from the knot and update the image
          puller.disconnect();
          this.updateImage( puller, model );

          // fire updates
          puller.userControlledProperty.set( true );
          this.moveToFront();
          puller.userControlledEmitter.emit();

          // if the puller was knotted, update the image position so that it is centered on the knot it was previously
          // grabbing
          if ( knot ) {
            this.updatePositionKnotted( puller, model, knot );
          }
        },
        end: () => {
          this.updatePosition( puller, model );
          puller.userControlledProperty.set( false );
          puller.droppedEmitter.emit( 'mouse' );
          this.updateImage( puller, model );

          // Add accessible response when a puller is dropped
          if ( puller.knotProperty.get() ) {
            const knotDescription = this.getKnotDescription( puller.knotProperty.get()! );
            this.updateAccessibleDescription( knotDescription );
            this.addAccessibleContextResponse( `${puller.size} ${puller.type} puller attached to ${knotDescription}.` );
          }
          else {
            this.updateAccessibleDescription( 'toolbox' );
            this.addAccessibleContextResponse( `${puller.size} ${puller.type} puller returned to toolbox.` );
          }
        }
      }
    );
    this.addInputListener( this.dragListener );

    model.resetAllEmitter.addListener( () => {
      this.updatePosition( puller, model );

      // cancel the drag
      if ( puller.userControlledProperty.get() ) {
        this.dragListener.interrupt();

        puller.reset();
      }
    } );

    this.mutate( options );

    // Set initial accessible description
    this.updateAccessibleDescription( 'toolbox' );

    this.addLinkedElement( this.puller, {
      tandemName: 'puller'
    } );

    // When hiding the puller via the PhET-iO API (e.g. in PhET-iO Studio or PhET Studio), detach from the knot and move back to the toolbox, invisibly
    this.visibleProperty.link( visible => {
      if ( !visible ) {
        puller.reset();
      }
    } );
  }

  /**
   * Update the position of the puller immediately after it has been clicked on after being removed from a knot
   * position.  Sets the translation of the puller relative to its previous knot position.  This knot position is
   * lost in updatePosition because the puller has already been disconnected from the knot by the time those functions
   * are called.
   *
   * @param puller
   * @param model
   * @param knot - the last knot that the puller was holding on to
   */
  public updatePositionKnotted( puller: Puller, model: NetForceModel, knot: Knot ): void {
    const blueOffset = this.puller.type === 'blue' ? -40 : 0;
    puller.positionProperty.set( new Vector2( knot.positionProperty.get() + blueOffset, knot.y - this.height + 90 ) );
  }

  /**
   * Update the image puller image depending on whether the puller is knotted and pulling
   */
  public updateImage( puller: Puller, model: NetForceModel ): void {
    const knotted = puller.knotProperty.get();
    const pulling = model.hasStartedProperty.get() && knotted && model.stateProperty.get() !== 'completed';
    this.image = pulling ? this.pullImage : this.standImage;
  }

  /**
   * Update the position of a puller depending on whether it is knotted and pulling.
   */
  public updatePosition( puller: Puller, model: NetForceModel ): void {
    const knotted = puller.knotProperty.get();
    const pulling = model.hasStartedProperty.get() && knotted && model.stateProperty.get() !== 'completed';
    if ( knotted ) {
      const pullingOffset = pulling ? -puller.dragOffsetX : puller.standOffsetX;
      const blueOffset = this.puller.type === 'blue' ? -60 + 10 : 0;
      this.setTranslation( puller.knotProperty.get()!.positionProperty.get() + pullingOffset + blueOffset, puller.knotProperty.get()!.y - this.height + 90 );
    }
    else {
      this.setTranslation( puller.positionProperty.get() );
    }
  }

  /**
   * Get the stable mode before the current grab (for transfer logic)
   */
  public getPreGrabMode(): string | null {
    return this.preGrabMode;
  }

  /**
   * Set up keyboard navigation for this puller.
   * This creates the keyboard listener for all puller interactions.
   */
  public setupKeyboardNavigation(): void {
    // Remove existing keyboard listener if any
    if ( this.keyboardListener ) {
      this.removeInputListener( this.keyboardListener );
      this.keyboardListener = null;
    }

    // Create a single listener that combines all hotkey data
    this.keyboardListener = new KeyboardListener( {
      keyStringProperties: [
        ...NetForceHotkeyData.pullerNode.navigation.keyStringProperties,
        ...NetForceHotkeyData.pullerNode.grabOrDrop.keyStringProperties,
        ...NetForceHotkeyData.pullerNode.cancelInteraction.keyStringProperties
      ],
      fireOnDown: false,
      fire: ( event, keysPressed ) => this.handleKeyboardInput( keysPressed )
    } );
    this.addInputListener( this.keyboardListener );
  }

  /**
   * Get a human-readable description of a knot's position
   * @param knot - The knot to describe
   * @returns A string like "left knot 1" or "right knot 3"
   */
  public getKnotDescription( knot: Knot ): string {
    // Find the index of this knot among knots of the same type
    const sameTypeKnots = this.model.knots.filter( k => k.type === knot.type );
    const index = sameTypeKnots.indexOf( knot );
    const side = knot.type === 'blue' ? 'left' : 'right';
    return `${side} knot ${index + 1}`;
  }

  /**
   * Update the accessible paragraph description based on the puller's current location
   * @param location - Description of where the puller is
   */
  private updateAccessibleDescription( location: string ): void {
    this.accessibleName = `${this.puller.size} ${this.puller.type} puller at ${location}`;
  }

  /**
   * Handle keyboard input using the current strategy.
   * This contains all the common keyboard logic that was previously duplicated in the group classes.
   */
  private handleKeyboardInput( keysPressed: string ): void {
    ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'keyboardListener fired for puller:', this.puller, 'key:', keysPressed );
    const puller = this.puller;
    const isGrabbed = puller.userControlledProperty.get();

    // ARROW KEY HANDLING - depends on mode
    if ( keysPressed === 'arrowLeft' || keysPressed === 'arrowRight' || keysPressed === 'arrowUp' || keysPressed === 'arrowDown' ) {

      if ( isGrabbed ) {
        // GRABBED MODE: Arrow keys cycle through knots + home position
        if ( keysPressed === 'arrowLeft' || keysPressed === 'arrowRight' ) {
          // Get available knots for this puller's type (blue/red) and side
          const availableKnots = this.model.knots.filter( knot =>
            knot.type === puller.type && this.model.getPuller( knot ) === null
          );

          // Create waypoints array: [knot1, knot2, ..., knotN, HOME]
          const waypoints = [ ...availableKnots, null ]; // null = home position

          if ( waypoints.length > 0 ) {
            // Find current waypoint index
            const currentTarget = this.model.getTargetKnot( puller );
            let currentIndex;

            if ( currentTarget === null ) {
              // Currently at home position
              currentIndex = waypoints.length - 1; // Home is last waypoint
            }
            else {
              // Currently at a knot
              currentIndex = availableKnots.indexOf( currentTarget );
              if ( currentIndex === -1 ) {
                currentIndex = 0; // Default to first waypoint if not found
              }
            }

            // Navigate to next/previous waypoint
            const delta = keysPressed === 'arrowLeft' ? -1 : 1;
            const nextIndex = ( currentIndex + delta + waypoints.length ) % waypoints.length;
            const targetWaypoint = waypoints[ nextIndex ];

            if ( targetWaypoint === null ) {
              // Move to home position (original position in toolbox)
              puller.positionProperty.reset(); // Reset to original toolbox coordinates
              this.updatePosition( puller, this.model );
              this.updateAccessibleDescription( 'return to toolbox' );
              this.addAccessibleResponse( 'Over return to toolbox position' );
              ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Moved puller to HOME position' );
            }
            else {
              // Move to knot position
              this.updatePositionKnotted( puller, this.model, targetWaypoint );
              const knotDescription = this.getKnotDescription( targetWaypoint );
              this.updateAccessibleDescription( knotDescription );
              this.addAccessibleResponse( `Over ${knotDescription}` );
              ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Moved puller to knot:', targetWaypoint.positionProperty.get() );
            }
          }
        }
        // Ignore up/down arrows when grabbed (only left/right navigate knots)
      }
      else {
        // NORMAL MODE: Navigate between pullers based on current mode
        const currentMode = puller.modeProperty.get();
        let direction: 'left' | 'right' | 'up' | 'down';
        if ( keysPressed === 'arrowLeft' ) { direction = 'left'; }
        else if ( keysPressed === 'arrowRight' ) { direction = 'right'; }
        else if ( keysPressed === 'arrowUp' ) { direction = 'up'; }
        else { direction = 'down'; }

        // Get all pullers in the same logical context (toolbox vs rope)
        const isInToolbox = currentMode === 'home';
        const allPullers = this.getAllPullersInSameContext( isInToolbox );
        
        const currentIndex = allPullers.indexOf( this );
        
        if ( currentIndex !== -1 ) {
          const delta = ( direction === 'left' || direction === 'up' ) ? -1 : 1;
          const newIndex = currentIndex + delta;
          
          // Keep selection within bounds
          if ( newIndex >= 0 && newIndex < allPullers.length ) {
            const nextPuller = allPullers[ newIndex ];
            
            // FIXED: Prevent focus manager interference during arrow navigation
            this.focusManager.setNavigating( true );
            
            // Ensure target puller is focusable before transferring focus
            nextPuller.focusable = true;
            nextPuller.focus();
            
            // Re-enable focus manager after navigation completes
            this.focusManager.setNavigating( false );
            
            console.log( `🎯 Arrow navigation: ${this.puller.size} ${this.puller.type} → ${nextPuller.puller.size} ${nextPuller.puller.type}` );
          }
          else {
            console.log( `🎯 Arrow navigation blocked: no more pullers in ${direction} direction` );
          }
        }
        else {
          console.log( '🎯 Arrow navigation failed: current puller not found in context' );
        }
      }
      return; // Don't process Enter/Space if we handled arrow keys
    }

    // ESCAPE HANDLING - cancel and return to original position
    if ( keysPressed === 'escape' ) {
      if ( isGrabbed ) {
        this.handleEscapeKey();
      }
      return; // Don't process other keys if we handled escape
    }

    // ENTER/SPACE HANDLING - grab/drop logic
    if ( keysPressed === 'enter' || keysPressed === 'space' ) {
      if ( isGrabbed ) {
        // Second press: Drop the puller (complete the interaction)
        const targetKnot = this.model.getTargetKnot( puller );

        // Check if puller is at HOME waypoint (no target knot)
        if ( targetKnot === null ) {
          // Puller is at HOME - return to toolbox
          // Use the stored flag to determine if puller originally came from the rope
          const wasAlreadyOnRope = this.wasOriginallyOnRope;

          // Use the new mode system - simply set mode to home
          puller.modeProperty.set( 'home' );
          
          // Follow the same sequence as drag end: position, userControlled, emit, image
          this.updatePosition( puller, this.model );
          puller.userControlledProperty.set( false );
          puller.droppedEmitter.emit( 'keyboard' );
          this.updateImage( puller, this.model );
          
          // Add accessibility announcement for HOME drop
          this.updateAccessibleDescription( 'toolbox' );
          this.addAccessibleResponse( `${puller.size} ${puller.type} puller returned to toolbox.` );
          
          ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Returned puller to toolbox, wasAlreadyOnRope:', wasAlreadyOnRope );

          // Reset the flags for next interaction
          this.wasOriginallyOnRope = false;
          this.preGrabMode = null;
          this.originalMode = null;
          this.originalPosition = null;

          // For pullers that originated from rope, maintain focus after transfer
          if ( wasAlreadyOnRope ) {
            // The new mode system will handle the transfer automatically
            // Just ensure focus is maintained
            this.focusable = true;
            this.focus();
            ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Maintained focus on rope puller after transfer to toolbox' );
          }
          // Focus management for toolbox drops is now handled automatically by PullerFocusManager
        }
        else {
          // Puller is at a knot - normal drop behavior

          // Determine the target knot and set the appropriate mode
          const targetKnot = this.model.getTargetKnot( puller );
          if ( targetKnot ) {
            const attachedMode = puller.getModeForKnot( targetKnot, false );
            puller.modeProperty.set( attachedMode );
            ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Set attached mode:', attachedMode );
          }
          
          // Follow the same sequence as drag end: position, userControlled, emit, image
          this.updatePosition( puller, this.model );
          puller.userControlledProperty.set( false );
          puller.droppedEmitter.emit( 'keyboard' );
          this.updateImage( puller, this.model );

          // Reset the flags for next interaction
          this.wasOriginallyOnRope = false;
          this.preGrabMode = null;
          this.originalMode = null;
          this.originalPosition = null;
          
          // Focus management is now handled automatically by PullerFocusManager
        }
      }
      else {
        // First press: Grab the puller (start showing yellow circles)
        const knot = puller.knotProperty.get();
        ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'First press - puller at position:', puller.positionProperty.get(), 'knot:', knot );

        // Store whether this puller was originally on the rope (for focus management during HOME drops)
        this.wasOriginallyOnRope = knot !== null;
        ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Stored wasOriginallyOnRope:', this.wasOriginallyOnRope );

        const currentMode = puller.modeProperty.get();
        this.preGrabMode = currentMode; // Store stable mode before grab
        
        // Store original state for escape key functionality
        this.originalMode = currentMode;
        this.originalPosition = puller.positionProperty.get().copy();
        
        ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'BEFORE grab - current mode:', currentMode, 'stored as preGrabMode and originalMode' );

        // Use the new disconnect method which sets the appropriate grabbed mode
        puller.disconnect();
        
        const newMode = puller.modeProperty.get();
        const isUserControlled = puller.userControlledProperty.get();
        ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'AFTER grab - new mode:', newMode, 'userControlled:', isUserControlled );
        
        // CRITICAL FIX: Ensure userControlled is properly set for keyboard grabs
        // The mode should trigger this, but let's ensure it happens
        if ( newMode.startsWith( 'keyboardGrabbedOver' ) && !isUserControlled ) {
          console.warn( 'KEYBOARD GRAB BUG: Mode was set to grabbed but userControlled is still false. Fixing...' );
          puller.userControlledProperty.set( true );
        }

        this.updateImage( puller, this.model );

        // Move to front and emit
        this.moveToFront();
        puller.userControlledEmitter.emit();

        // Announce the grab action with current position
        let locationDescription = 'toolbox';
        if ( knot ) {
          locationDescription = this.getKnotDescription( knot );
        }
        this.updateAccessibleDescription( locationDescription );
        this.addAccessibleResponse( `Grabbed from ${locationDescription}` );

        // If puller was knotted, position it at the knot location for better UX
        if ( knot ) {
          ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Moving puller to knot position:', knot.positionProperty.get(), knot.y );
          this.updatePositionKnotted( puller, this.model, knot );
          ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Puller position after move:', puller.positionProperty.get() );
        }
        else {
          // For pullers not yet on the rope, move to first available knot position
          const availableKnots = this.model.knots.filter( knot =>
            knot.type === puller.type && this.model.getPuller( knot ) === null
          );
          if ( availableKnots.length > 0 ) {
            const firstKnot = availableKnots[ 0 ];
            this.updatePositionKnotted( puller, this.model, firstKnot );
            ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Moving puller from toolbox to first available knot:', firstKnot.positionProperty.get() );
          }
          else {
            // Fallback to neutral position if no knots available
            const neutralY = 350;
            const currentPosition = puller.positionProperty.get();
            puller.positionProperty.set( new Vector2( currentPosition.x, neutralY ) );
            ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'No available knots, moving to neutral position:', puller.positionProperty.get() );
          }
        }
      }
    }
  }

  /**
   * Handle escape key press - return puller to its original position and state
   */
  private handleEscapeKey(): void {
    if ( !this.originalMode || !this.originalPosition ) {
      ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'No original state stored for escape key' );
      return;
    }

    const puller = this.puller;
    
    ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Escape pressed - returning puller to original state:', this.originalMode );

    // Reset to original mode and position
    puller.modeProperty.set( this.originalMode );
    puller.positionProperty.set( this.originalPosition );
    
    // Follow the same sequence as normal drop: position, userControlled, emit, image
    this.updatePosition( puller, this.model );
    puller.userControlledProperty.set( false );
    puller.droppedEmitter.emit( 'keyboard' );
    this.updateImage( puller, this.model );

    // Add accessibility announcement for escape/cancel
    const wasOnRope = this.originalMode.startsWith( 'left' ) || this.originalMode.startsWith( 'right' );
    const locationDescription = wasOnRope ? this.getKnotDescription( puller.knotProperty.get()! ) : 'toolbox';
    this.updateAccessibleDescription( locationDescription );
    this.addAccessibleResponse( `Cancelled. ${puller.size} ${puller.type} puller returned to ${locationDescription}.` );

    // Reset the stored state for next interaction
    this.wasOriginallyOnRope = false;
    this.preGrabMode = null;
    this.originalMode = null;
    this.originalPosition = null;
  }

  /**
   * Get all pullers in the same context (toolbox vs rope) as this puller
   */
  private getAllPullersInSameContext( isInToolbox: boolean ): PullerNode[] {
    const allPullers = this.model.pullers.map( puller => puller.node! ).filter( node => node !== null );
    
    return allPullers.filter( pullerNode => {
      const pullerMode = pullerNode.puller.modeProperty.get();
      const pullerIsInToolbox = pullerMode === 'home';
      const sameContext = pullerIsInToolbox === isInToolbox;
      const sameType = pullerNode.puller.type === this.puller.type;
      
      return sameContext && sameType;
    } );
  }

  /**
   * Reset the puller node to its initial state
   */
  public reset(): void {
    // Reset internal tracking state
    this.wasOriginallyOnRope = false;
    this.preGrabMode = null;
    this.originalMode = null;
    this.originalPosition = null;

    // Update visual state based on reset model
    this.updateImage( this.puller, this.model );
    this.updatePosition( this.puller, this.model );
    
    // Update accessibility description to reflect toolbox position
    this.updateAccessibleDescription( 'toolbox' );
    
    // Ensure focusable state is correct (pullers in toolbox should be focusable)
    if ( this.puller.knotProperty.get() === null ) {
      this.focusable = true;
    }
  }
}

forcesAndMotionBasics.register( 'PullerNode', PullerNode );