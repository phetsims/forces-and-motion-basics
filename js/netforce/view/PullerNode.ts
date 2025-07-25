// Copyright 2013-2025, University of Colorado Boulder

/**
 * Shows the graphic for the puller, which can be dragged from the toolbox to the rope to apply force.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Image, { ImageOptions } from '../../../../scenery/js/nodes/Image.js';
import { ImageableImage } from '../../../../scenery/js/nodes/Imageable.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsQueryParameters from '../../common/ForcesAndMotionBasicsQueryParameters.js';
import Knot from '../model/Knot.js';
import NetForceModel from '../model/NetForceModel.js';
import Puller from '../model/Puller.js';

/**
 * Strategy interface for keyboard navigation behavior.
 * Different contexts (toolbox vs rope) can provide their own implementations.
 */
export type PullerKeyboardStrategy = {
  /**
   * Navigate between pullers in the same context
   * @param currentPuller - The puller currently focused
   * @param direction - The navigation direction
   * @returns The puller to focus next, or null if navigation not possible
   */
  navigateToPuller( currentPuller: PullerNode, direction: 'left' | 'right' | 'up' | 'down' ): PullerNode | null;
  
  /**
   * Called after a puller is successfully dropped
   * @param puller - The puller that was dropped
   * @param droppedOnKnot - Whether the puller was dropped on a knot (true) or returned to toolbox (false)
   */
  onDropComplete( puller: PullerNode, droppedOnKnot: boolean ): void;
  
  /**
   * Get the group of pullers this puller belongs to
   * @returns Array of all pullers in the same context
   */
  getPullerGroup(): PullerNode[];
  
  /**
   * Context-specific accessibility message
   * @param action - The action performed
   * @param location - Where the action occurred
   * @returns The accessibility message to announce
   */
  getAccessibilityMessage( action: 'grabbed' | 'dropped', location: 'knot' | 'toolbox' ): string;
};

type SelfOptions = EmptySelfOptions;
type PullerNodeOptions = ImageOptions & SelfOptions;

export default class PullerNode extends Image {
  public standImage: ImageableImage;
  private readonly dragListener: SoundDragListener;
  private keyboardStrategy: PullerKeyboardStrategy | null = null;
  private keyboardListener: KeyboardListener<( 'enter' | 'space' | 'arrowLeft' | 'arrowRight' | 'arrowUp' | 'arrowDown' )[]> | null = null;
  private readonly model: NetForceModel;

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
        start: () => {

          // check to see if a puller is knotted - if it is, store the knot
          const knot = puller.knotProperty.get();

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
          puller.droppedEmitter.emit();
          this.updateImage( puller, model );

          // Add accessible response when a puller is dropped
          if ( puller.knotProperty.get() ) {
            this.addAccessibleContextResponse( `${puller.size} ${puller.type} puller attached to rope.` );
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

    this.mutate( options );

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
    const blueOffset = this.puller.type === 'blue' ? -60 : 0;
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
   * Set the keyboard navigation strategy for this puller.
   * This determines how keyboard interactions behave based on context (toolbox vs rope).
   * @param strategy - The strategy to use, or null to remove keyboard handling
   */
  public setKeyboardStrategy( strategy: PullerKeyboardStrategy | null ): void {
    // Remove existing keyboard listener if any
    if ( this.keyboardListener ) {
      this.removeInputListener( this.keyboardListener );
      this.keyboardListener = null;
    }
    
    this.keyboardStrategy = strategy;
    
    if ( strategy ) {
      this.keyboardListener = new KeyboardListener( {
        keys: [ 'enter', 'space', 'arrowLeft', 'arrowRight', 'arrowUp', 'arrowDown' ],
        fireOnDown: false,
        fire: ( event, keysPressed ) => this.handleKeyboardInput( keysPressed )
      } );
      this.addInputListener( this.keyboardListener );
    }
  }

  /**
   * Handle keyboard input using the current strategy.
   * This contains all the common keyboard logic that was previously duplicated in the group classes.
   */
  private handleKeyboardInput( keysPressed: string ): void {
    if ( !this.keyboardStrategy ) { return; }
    
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
              ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Moved puller to HOME position' );
            }
            else {
              // Move to knot position
              this.updatePositionKnotted( puller, this.model, targetWaypoint );
              ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Moved puller to knot:', targetWaypoint.positionProperty.get() );
            }
          }
        }
        // Ignore up/down arrows when grabbed (only left/right navigate knots)
      }
      else {
        // NORMAL MODE: Use strategy to navigate between pullers
        let direction: 'left' | 'right' | 'up' | 'down';
        if ( keysPressed === 'arrowLeft' ) { direction = 'left'; }
        else if ( keysPressed === 'arrowRight' ) { direction = 'right'; }
        else if ( keysPressed === 'arrowUp' ) { direction = 'up'; }
        else { direction = 'down'; }
        
        const nextPuller = this.keyboardStrategy.navigateToPuller( this, direction );
        
        if ( nextPuller ) {
          // Make current puller non-focusable
          this.focusable = false;
          
          // Make new puller focusable and focus it
          nextPuller.focusable = true;
          nextPuller.focus();
          
          ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Navigated to next puller' );
        }
      }
      return; // Don't process Enter/Space if we handled arrow keys
    }
    
    // ENTER/SPACE HANDLING - grab/drop logic
    if ( keysPressed === 'enter' || keysPressed === 'space' ) {
      if ( isGrabbed ) {
        // Second press: Drop the puller (complete the interaction)
        const targetKnot = this.model.getTargetKnot( puller );
        
        // Check if puller is at HOME waypoint (no target knot)
        if ( targetKnot === null ) {
          // Puller is at HOME - return to toolbox
          puller.userControlledProperty.set( false );
          puller.reset(); // This returns puller to its original toolbox position
          this.updateImage( puller, this.model );
          ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Returned puller to toolbox' );
          
          // Notify strategy about drop completion
          this.keyboardStrategy.onDropComplete( this, false );
        }
        else {
          // Puller is at a knot - normal drop behavior
          
          // PHASE I: Check if this is a toolbox puller being dropped on rope
          // Capture the strategy BEFORE any drop logic that might change it
          const wasFromToolbox = puller.knotProperty.get() === null;
          const originalToolboxStrategy = wasFromToolbox ? this.keyboardStrategy : null;
          
          if ( originalToolboxStrategy ) {
            ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'PHASE I: Captured original strategy:', originalToolboxStrategy.constructor.name );
          }
          
          puller.userControlledProperty.set( false );
          puller.droppedEmitter.emit();
          this.updateImage( puller, this.model );
          
          // PHASE I: Handle focus after successful toolbox-to-rope drop
          if ( wasFromToolbox && originalToolboxStrategy ) {
            // For toolbox pullers, use a one-time listener to detect successful attachment
            // This avoids timing issues with immediate checks
            const successListener = ( newKnot: Knot | null ) => {
              if ( newKnot !== null ) {
                // Successfully attached to rope, notify ORIGINAL strategy for focus handling
                ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'PHASE I: Successful toolbox-to-rope drop detected, calling onDropComplete on original strategy:', originalToolboxStrategy.constructor.name );
                ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'PHASE I: About to call originalToolboxStrategy.onDropComplete( this, true )' );
                try {
                  originalToolboxStrategy.onDropComplete( this, true );
                  ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'PHASE I: Successfully called onDropComplete' );
                }
 catch( error ) {
                  console.error( 'PHASE I: Error calling onDropComplete:', error );
                }
                puller.knotProperty.unlink( successListener );
              }
            };
            puller.knotProperty.link( successListener );
          }
          else if ( !wasFromToolbox ) {
            // For non-toolbox pullers (rope-to-rope moves), notify immediately
            this.keyboardStrategy.onDropComplete( this, true );
          }
        }
      }
      else {
        // First press: Grab the puller (start showing yellow circles)
        const knot = puller.knotProperty.get();
        ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'First press - puller at position:', puller.positionProperty.get(), 'knot:', knot );
        
        ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'BEFORE disconnect - userControlled:', puller.userControlledProperty.get(), 'knotProperty:', puller.knotProperty.get() );
        
        // Set user controlled FIRST to prevent transfer during disconnect
        puller.userControlledProperty.set( true );
        ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Set userControlled = true' );
        
        // Disconnect from current knot if attached
        puller.disconnect();
        ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'AFTER disconnect - userControlled:', puller.userControlledProperty.get(), 'knotProperty:', puller.knotProperty.get() );
        
        this.updateImage( puller, this.model );
        
        // Move to front and emit
        this.moveToFront();
        puller.userControlledEmitter.emit();
        
        // Announce the grab action
        this.addAccessibleResponse( this.keyboardStrategy.getAccessibilityMessage( 'grabbed', knot ? 'knot' : 'toolbox' ) );
        
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
}

forcesAndMotionBasics.register( 'PullerNode', PullerNode );