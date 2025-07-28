// Copyright 2013-2025, University of Colorado Boulder

/**
 * Shows the graphic for the puller, which can be dragged from the toolbox to the rope to apply force.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Image, { ImageOptions } from '../../../../scenery/js/nodes/Image.js';
import { ImageableImage } from '../../../../scenery/js/nodes/Imageable.js';
import ForcesAndMotionBasicsQueryParameters from '../../common/ForcesAndMotionBasicsQueryParameters.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsPreferences from '../model/ForcesAndMotionBasicsPreferences.js';
import Knot from '../model/Knot.js';
import NetForceModel from '../model/NetForceModel.js';
import Puller from '../model/Puller.js';
import NetForceHotkeyData from '../NetForceHotkeyData.js';
import PullerFocusManager from './PullerFocusManager.js';


type SelfOptions = EmptySelfOptions;
type PullerNodeOptions = ImageOptions & SelfOptions;

export default class PullerNode extends Image {
  public standImage: ImageableImage;
  private readonly dragListener: SoundDragListener;
  private keyboardListener: KeyboardListener<OneKeyStroke[]> | null = null;
  private readonly model: NetForceModel;
  private readonly focusManager: PullerFocusManager;

  // Note: Redundant state tracking removed - now using puller.state object

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
      visiblePropertyOptions: { phetioFeatured: true },
      x: x,
      y: y,
      cursor: 'pointer',
      scale: 0.86,
      tagName: 'button',
      accessibleName: new DerivedProperty( [ ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty ], pullerColor => {
        const displayColor = pullerColor === 'purpleOrange' ?
                             ( puller.type === 'blue' ? 'purple' : 'orange' ) :
                             puller.type;
        return `${puller.size} ${displayColor} puller`;
      } )
    }, providedOptions );

    super( image, options );

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
            this.addAccessibleContextResponse( `${puller.size} ${puller.type} puller attached to ${knotDescription}.` );
          }
          else {
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

    // DEBUG: Track focus loss during keyboard grab operations
    if ( ForcesAndMotionBasicsQueryParameters.debugAltInput ) {
      this.focusedProperty.link( ( focused, wasFocused ) => {
        if ( wasFocused && !focused && puller.isGrabbed() && puller.state.dragType === 'keyboard' ) {
          console.log( '🔥 FOCUS LOST during keyboard grab for:', puller.size, puller.type );
          console.log( 'Stack trace:', new Error().stack );
        }
      } );
    }

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
   * Simplified keyboard input handler using the new state system
   */
  private handleKeyboardInput( keysPressed: string ): void {
    ForcesAndMotionBasicsQueryParameters.debugAltInput &&
    console.log( 'keyboardListener fired for puller:', this.puller, 'key:', keysPressed );

    const puller = this.puller;
    const isGrabbed = puller.isGrabbed();

    // ARROW KEY HANDLING
    if ( keysPressed === 'arrowLeft' || keysPressed === 'arrowRight' || keysPressed === 'arrowUp' || keysPressed === 'arrowDown' ) {
      if ( isGrabbed ) {
        // GRABBED MODE: Arrow keys cycle through knots + home position
        this.handleKnotCycling( keysPressed );
      }
      else {
        // NORMAL MODE: Delegate to focus manager for consistent behavior
        const direction = keysPressed.replace( 'arrow', '' ).toLowerCase() as 'left' | 'right' | 'up' | 'down';
        this.focusManager.handleArrowNavigation( this, direction );
      }
      return;
    }

    // ESCAPE HANDLING
    if ( keysPressed === 'escape' ) {
      if ( isGrabbed ) {
        puller.cancelGrab();
        this.updatePosition( puller, this.model );
        this.updateImage( puller, this.model );
        this.addAccessibleResponse( `Cancelled. ${puller.size} ${puller.type} puller returned to original position.` );
      }
      return;
    }

    // ENTER/SPACE HANDLING - simplified grab/drop logic
    if ( keysPressed === 'enter' || keysPressed === 'space' ) {
      if ( isGrabbed ) {
        ForcesAndMotionBasicsQueryParameters.debugAltInput &&
        console.log( 'DROP: About to drop puller:', puller.size, puller.type );

        // Drop the puller
        puller.drop();
        this.updatePosition( puller, this.model );
        this.updateImage( puller, this.model );

        ForcesAndMotionBasicsQueryParameters.debugAltInput &&
        console.log( 'DROP: After drop, calling handlePullerDrop' );

        // Let focus manager handle auto-focus
        this.focusManager.handlePullerDrop( this );

        // Add accessibility feedback - check state.attachedKnot for immediate feedback
        if ( puller.state.attachedKnot ) {
          const knotDescription = this.getKnotDescription( puller.state.attachedKnot );
          this.addAccessibleResponse( `${puller.size} ${puller.type} puller attached to ${knotDescription}.` );
        }
        else {
          this.addAccessibleResponse( `${puller.size} ${puller.type} puller returned to toolbox.` );
        }
      }
      else {
        ForcesAndMotionBasicsQueryParameters.debugAltInput &&
        console.log( 'GRAB: Starting grab for puller:', puller.size, puller.type, 'isFocused:', this.isFocused, 'focusable:', this.focusable );

        // Store current focus state
        const hadFocus = this.isFocused();

        // Ensure this puller remains focusable during grab
        this.focusable = true;

        // Prevent focus manager interference during grab
        this.focusManager.setGrabbing( true );

        // Grab the puller
        puller.grab( 'keyboard' );
        this.updateImage( puller, this.model );
        this.moveToFront();
        puller.userControlledEmitter.emit();

        // Move to appropriate position for keyboard interaction
        this.positionForKeyboardGrab();

        // CRITICAL: Force focus to stay on this puller after grab transition
        if ( hadFocus ) {
          // Ensure focusability and explicitly focus
          this.focusable = true;
          this.focus();
          ForcesAndMotionBasicsQueryParameters.debugAltInput &&
          console.log( 'GRAB: Forced focus restoration after grab for:', puller.size, puller.type );
        }

        // Re-enable focus manager
        this.focusManager.setGrabbing( false );

        ForcesAndMotionBasicsQueryParameters.debugAltInput &&
        console.log( 'GRAB: After grab for puller:', puller.size, puller.type, 'isFocused:', this.isFocused, 'focusable:', this.focusable );

        // Add accessibility feedback
        this.addAccessibleResponse( 'Grabbed' );
      }
    }
  }

  /**
   * Handle knot cycling during grabbed state
   */
  private handleKnotCycling( keysPressed: string ): void {
    if ( keysPressed !== 'arrowLeft' && keysPressed !== 'arrowRight' ) {
      return; // Only left/right navigate knots when grabbed
    }

    const puller = this.puller;

    // Get available knots for this puller's type
    const availableKnots = this.model.knots.filter( knot =>
      knot.type === puller.type && this.model.getPuller( knot ) === null
    );

    // Create waypoints array: [knot1, knot2, ..., knotN, HOME]
    const waypoints = [ ...availableKnots, null ]; // null = home position

    if ( waypoints.length === 0 ) { return; }

    // Find current waypoint index
    const currentTarget = puller.state.targetKnot;
    let currentIndex = currentTarget === null ?
                       waypoints.length - 1 : // Home is last waypoint
                       availableKnots.indexOf( currentTarget );

    if ( currentIndex === -1 ) { currentIndex = 0; }

    // Navigate to next/previous waypoint
    const delta = keysPressed === 'arrowLeft' ? -1 : 1;
    const nextIndex = ( currentIndex + delta + waypoints.length ) % waypoints.length;
    const targetWaypoint = waypoints[ nextIndex ];

    // Update target in state
    puller.state.targetKnot = targetWaypoint;

    if ( targetWaypoint === null ) {
      // Move to home position
      puller.positionProperty.reset();
      this.updatePosition( puller, this.model );
      this.addAccessibleResponse( 'Over return to toolbox position' );
    }
    else {
      // Move to knot position
      this.updatePositionKnotted( puller, this.model, targetWaypoint );
      const knotDescription = this.getKnotDescription( targetWaypoint );
      this.addAccessibleResponse( `Over ${knotDescription}` );
    }
  }

  /**
   * Position puller appropriately when grabbed via keyboard
   */
  private positionForKeyboardGrab(): void {
    const puller = this.puller;
    const grabOrigin = puller.state.grabOrigin;

    if ( grabOrigin?.attachedKnot ) {
      // Was on rope - position at that knot
      this.updatePositionKnotted( puller, this.model, grabOrigin.attachedKnot );
      puller.state.targetKnot = grabOrigin.attachedKnot;
    }
    else {
      // Was in toolbox - move to first available knot
      const availableKnots = this.model.knots.filter( knot =>
        knot.type === puller.type && this.model.getPuller( knot ) === null
      );

      if ( availableKnots.length > 0 ) {
        const firstKnot = availableKnots[ 0 ];
        this.updatePositionKnotted( puller, this.model, firstKnot );
        puller.state.targetKnot = firstKnot;
      }
    }
  }


  /**
   * Reset the puller node to its initial state
   */
  public reset(): void {
    // Update visual state based on reset model
    this.updateImage( this.puller, this.model );
    this.updatePosition( this.puller, this.model );

    // Ensure focusable state is correct (pullers in toolbox should be focusable)
    if ( this.puller.knotProperty.get() === null ) {
      this.focusable = true;
    }
  }
}

forcesAndMotionBasics.register( 'PullerNode', PullerNode );