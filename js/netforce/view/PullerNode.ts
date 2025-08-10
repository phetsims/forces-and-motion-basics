// Copyright 2013-2025, University of Colorado Boulder

/**
 * Shows the graphic for the puller, which can be dragged from the toolbox to the rope to apply force.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import { clamp } from '../../../../dot/js/util/clamp.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import HighlightFromNode from '../../../../scenery/js/accessibility/HighlightFromNode.js';
import InteractiveHighlighting from '../../../../scenery/js/accessibility/voicing/InteractiveHighlighting.js';
import { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Image, { ImageOptions } from '../../../../scenery/js/nodes/Image.js';
import { ImageableImage } from '../../../../scenery/js/nodes/Imageable.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsPreferences from '../model/ForcesAndMotionBasicsPreferences.js';
import Knot from '../model/Knot.js';
import NetForceModel from '../model/NetForceModel.js';
import Puller from '../model/Puller.js';
import PullerMode from '../model/PullerMode.js';
import NetForceHotkeyData from '../NetForceHotkeyData.js';
import NetForceScreenView from './NetForceScreenView.js';

type SelfOptions = EmptySelfOptions;
type PullerNodeOptions = ImageOptions & SelfOptions;

// Vertical offset when keyboard grabbed to show puller is "above" and not connected
const KEYBOARD_GRABBED_Y_OFFSET = 20;

export default class PullerNode extends InteractiveHighlighting( Image ) {

  public standImage: ImageableImage;
  private readonly dragListener: SoundDragListener;
  private readonly keyboardListener: KeyboardListener<OneKeyStroke[]> | null = null;
  private readonly model: NetForceModel;

  /**
   * Create a PullerNode for the specified puller
   *
   * @param puller
   * @param view
   * @param image image of the puller standing upright
   * @param pullImage image of the puller exerting a force
   * @param [providedOptions]
   */
  public constructor(
    public readonly puller: Puller,
    public readonly view: NetForceScreenView,
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

    // this.puller.node = this; //Wire up so node can be looked up by model element.
    this.standImage = image;
    const model = puller.model;
    this.model = model;

    this.dragListener = new SoundDragListener( {
        tandem: options.tandem?.createTandem( 'dragListener' ),
        allowTouchSnag: true,
        positionProperty: puller.positionProperty,
        start: () => {

          puller.modeProperty.set( PullerMode.pointerGrabbed() );

          // fire updates
          this.moveToFront();
        },
        end: () => {

          // Determine drop location using the model's existing getTargetKnot method
          const dropKnot = model.getTargetKnot( puller );

          if ( dropKnot ) {
            puller.dropAtKnot( dropKnot );
          }
          else {
            puller.dropAtHome();
          }

          // Add accessible response
          const knot = puller.modeProperty.value.getKnot( puller.model );
          if ( knot ) {
            const knotDescription = this.getKnotDescription( knot );
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

      // cancel the drag
      if ( puller.modeProperty.value.isUserControlled() ) {
        this.dragListener.interrupt();

        puller.reset();
      }
    } );

    this.addLinkedElement( this.puller, {
      tandemName: 'puller'
    } );

    // When hiding the puller via the PhET-iO API (e.g. in PhET-iO Studio or PhET Studio), detach from the knot and move back to the toolbox, invisibly
    this.visibleProperty.link( visible => {
      if ( !visible ) {
        puller.reset();
      }
    } );

    const highlightFromNode = new HighlightFromNode( this );
    this.focusHighlight = highlightFromNode;

    puller.modeProperty.link( mode => {
      if ( mode.isKeyboardGrabbed() ) {
        highlightFromNode.setDashed( true );
      }
      else {
        highlightFromNode.setDashed( false );
      }
    } );

    // Create a single listener that combines all hotkey data
    this.keyboardListener = new KeyboardListener( {
      keyStringProperties: [
        ...NetForceHotkeyData.pullerNode.navigation.keyStringProperties,
        ...NetForceHotkeyData.pullerNode.grabOrDrop.keyStringProperties,
        ...NetForceHotkeyData.pullerNode.cancelInteraction.keyStringProperties,
        ...NetForceHotkeyData.pullerNode.returnToToolbox.keyStringProperties
      ],
      fireOnDown: false,
      fire: ( event, keysPressed ) => {

        // NAVIGATION (Arrow Keys)
        if ( NetForceHotkeyData.pullerNode.navigation.hasKeyStroke( keysPressed ) ) {

          // When no puller is grabbed, select between available pullers of the same type
          if ( !puller.isGrabbed() ) {

            // Find all pullers of the same type in the toolbox
            const availablePullers = this.view.pullerNodes.filter( pullerNode => pullerNode.puller.type === this.puller.type );

            if ( availablePullers.length > 1 ) {

              // Sort by position for consistent order
              availablePullers.sort( ( a, b ) => a.centerX - b.centerX );

              // find our index in the list
              const currentIndex = availablePullers.indexOf( this );

              const delta = keysPressed === 'arrowLeft' ? -1 : 1;
              const newIndex = clamp( currentIndex + delta, 0, availablePullers.length - 1 );

              if ( newIndex !== currentIndex ) {
                const nextPuller = availablePullers[ newIndex ];

                nextPuller.focusable = true;
                nextPuller.focus();
                this.focusable = false;
              }
            }
          }
          else {

            const direction = keysPressed === 'arrowLeft' ? -1 : 1;

            console.log( puller.type );
            console.log( puller.modeProperty.value.toString() );

            // Get available knots for this puller's type
            const availableKnots = model.knots.filter( knot =>

              // Include the current puller's knot so we can index it, and know which is before/after
              knot.type === puller.type && ( model.getPuller( knot ) === null || model.getPuller( knot ) === puller )
            );

            // console.log( 'puller is at knot: ' + puller.getKnot()!.tandem.name + ', availableKnots', availableKnots.map( knot => knot.tandem.name ) );

            // Create navigation waypoints: [knot1, knot2, ..., knotN, HOME]
            const waypoints: ( Knot | null )[] = [ ...availableKnots, null ]; // null = home position

            if ( waypoints.length <= 1 ) {
              return; // no navigation possible
            }

            // Find current waypoint index based on current mode
            const currentMode = puller.modeProperty.get();
            let currentWaypointIndex: number;

            if ( currentMode.isKeyboardGrabbedOverHome() ) {
              currentWaypointIndex = waypoints.length - 1; // Home is last waypoint
            }
            else {
              // Find the knot from current mode
              const currentKnot = puller.getKnot();
              currentWaypointIndex = currentKnot ? availableKnots.indexOf( currentKnot ) : 0;
              if ( currentWaypointIndex === -1 ) {
                currentWaypointIndex = 0; // Default to first knot
              }
            }

            // Navigate to next/previous waypoint
            const nextIndex = ( currentWaypointIndex + direction + waypoints.length ) % waypoints.length;
            const targetWaypoint = waypoints[ nextIndex ];

            // Update puller mode based on target waypoint
            const newMode = PullerNode.getModeForWaypoint( targetWaypoint, puller );
            puller.modeProperty.set( newMode );

            // Generate accessibility response
            const accessibilityResponse = targetWaypoint === null
                                          ? 'Over return to toolbox position'
                                          : `Over ${this.getKnotDescription( targetWaypoint )}`;

            this.addAccessibleContextResponse( accessibilityResponse );
          }
        }

        // GRAB/DROP (Enter/Space)
        if ( NetForceHotkeyData.pullerNode.grabOrDrop.hasKeyStroke( keysPressed ) ) {

          // Pick up an ungrabbed puller
          if ( !puller.isGrabbed() ) {

            const wasInHome = puller.modeProperty.get().isHome();

            // Store current state for potential cancel operation
            puller.storeGrabOrigin();

            // Determine initial grabbed mode based on current position
            let newMode: PullerMode;

            // Was in toolbox - start with first available knot or home
            const availableKnots = model.knots.filter( knot =>
              knot.type === puller.type && model.getPuller( knot ) === null
            );

            if ( availableKnots.length > 0 && wasInHome ) {
              newMode = PullerNode.getModeForWaypoint( availableKnots[ 0 ], this.puller );
            }
            else if ( puller.modeProperty.get().isAttached() ) {
              // Puller is attached to a knot - grab it over that knot
              const currentKnot = puller.getKnot();
              newMode = PullerNode.getModeForWaypoint( currentKnot, puller );
            }
            else {
              // Fallback to keyboard grabbed over home
              newMode = PullerMode.keyboardGrabbedOverHome();
            }

            puller.modeProperty.set( newMode );
          }
          else {

            // Drop the grabbed puller
            const currentMode = puller.modeProperty.get();

            // Check if puller was originally from home (to determine if we should auto-focus next)
            const grabOrigin = puller.getGrabOrigin();
            const wasFromHome = grabOrigin && grabOrigin.mode.isHome();

            // Determine where to drop based on current mode
            let newMode: PullerMode;
            let droppedOnRope = false;

            if ( currentMode.isKeyboardGrabbedOverHome() ) {
              // Drop at home (toolbox)
              newMode = PullerMode.home();
              this.addAccessibleContextResponse( `${puller.size} ${puller.type} puller returned to toolbox.` );
            }
            else if ( currentMode.isKeyboardGrabbedOverKnot() ) {
              // Drop at knot - convert keyboard grabbed to attached
              const knotIndex = currentMode.getKeyboardGrabbedKnotIndex();
              if ( knotIndex !== null ) {
                newMode = PullerMode.attachedToKnot( knotIndex );
                droppedOnRope = true;

                const knot = puller.getKnot();
                const knotDescription = knot ? this.getKnotDescription( knot ) : 'knot';
                this.addAccessibleContextResponse( `${puller.size} ${puller.type} puller attached to ${knotDescription}.` );
              }
              else {
                // Fallback to home
                newMode = PullerMode.home();
                this.addAccessibleContextResponse( `${puller.size} ${puller.type} puller returned to toolbox.` );
              }
            }
            else {
              // Fallback to home
              newMode = PullerMode.home();
              this.addAccessibleContextResponse( `${puller.size} ${puller.type} puller returned to toolbox.` );
            }

            // Clear grab origin
            puller.clearGrabOrigin();

            // Update mode
            puller.modeProperty.set( newMode );

            // If puller was from home and dropped on rope, autofocus next available home puller
            if ( wasFromHome && droppedOnRope ) {
              const availableHomePullers = this.view.pullerNodes.filter( pullerNode =>
                pullerNode.puller.type === this.puller.type &&
                pullerNode.puller.modeProperty.value.isHome() &&
                pullerNode.puller !== this.puller
              );

              if ( availableHomePullers.length > 0 ) {
                // Sort by position for consistent order
                availableHomePullers.sort( ( a, b ) => a.centerX - b.centerX );

                // Focus the first available puller
                const nextPuller = availableHomePullers[ 0 ];
                nextPuller.focusable = true;
                nextPuller.focus();
                this.focusable = false;
              }
            }

          }
        }

        // CANCEL (Escape)
        if ( NetForceHotkeyData.pullerNode.cancelInteraction.hasKeyStroke( keysPressed ) ) {
          if ( puller.isGrabbed() ) {
            // Cancel the grab and return to original position
            puller.cancelGrab();

            // Add accessibility response
            this.addAccessibleContextResponse( `${puller.size} ${puller.type} puller interaction canceled.` );
          }
        }

        // RETURN TO TOOLBOX (Delete/Backspace)
        if ( NetForceHotkeyData.pullerNode.returnToToolbox.hasKeyStroke( keysPressed ) ) {
          if ( puller.isGrabbed() ) {
            puller.clearGrabOrigin();

            // Move puller back to home and retain focus
            puller.modeProperty.set( PullerMode.home() );

            // Add accessibility response
            this.addAccessibleContextResponse( `${puller.size} ${puller.type} puller returned to toolbox.` );
          }
        }
      }
    } );
    this.addInputListener( this.keyboardListener );

    this.focusedProperty.lazyLink( focused => {

      if ( focused ) {

        // make other members of this group unfocusable
        this.view.pullerNodes.forEach( pullerNode => {
          if ( pullerNode.puller.type === this.puller.type && pullerNode !== this ) {
            pullerNode.focusable = false;
          }
        } );
      }

      if ( !focused && puller.isGrabbed() ) {

        // Handle focus blur during keyboard grab - drop the puller
        puller.modeProperty.value = PullerMode.home();
      }
    } );

    Multilink.multilink( [ this.puller.modeProperty, this.puller.model.hasStartedProperty, this.puller.positionProperty ], ( mode, hasStarted, position ) => {
      const knot = this.puller.getKnot();
      const pulling = hasStarted && knot && this.puller.model.stateProperty.get() !== 'completed';
      this.image = pulling ? this.pullImage : this.standImage;

      if ( mode.isAttached() ) {
        affirm( knot, 'PullerNode expected to have a knot when in attached mode' );

        // Normal attached position
        const pullingOffset = pulling ? -puller.dragOffsetX : puller.standOffsetX;
        this.setKnotTranslation( knot, pullingOffset );
      }
      else if ( mode.isHome() ) {
        this.setTranslation( puller.positionProperty.initialValue );
      }
      else if ( mode.isPointerGrabbed() ) {

        // Home position (toolbox or pointerGrabbed)
        this.setTranslation( position );
      }
      else if ( mode.isKeyboardGrabbed() ) {
        if ( mode.isKeyboardGrabbedOverHome() ) {
          this.setTranslation( puller.positionProperty.initialValue.plusXY( 0, -KEYBOARD_GRABBED_Y_OFFSET ) );
        }
        else if ( mode.isKeyboardGrabbedOverKnot() ) {

          // Position at knot when keyboard grabbed over a knot
          const knot = mode.getKnot( puller.model );
          affirm( knot, 'Expected knot to be defined when keyboard grabbed over knot' );

          // Use similar positioning as attached mode, but offset upward to show not connected
          this.setKnotTranslation( knot, puller.standOffsetX, KEYBOARD_GRABBED_Y_OFFSET );
        }
      }
    } );
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
    return `${side} knot ${index}`;
  }

  /**
   * Reset the puller node to its initial state
   */
  public reset(): void {

    // Ensure focusable state is correct (pullers in toolbox should be focusable)
    if ( this.puller.getKnot() === null ) {
      this.focusable = true;
    }
  }

  /**
   * Set the translation for a puller at a knot position
   * @param knot - The knot to position the puller at
   * @param offset - The horizontal offset (standOffsetX or dragOffsetX)
   * @param verticalOffset - Additional vertical offset (0 for attached, KEYBOARD_GRABBED_Y_OFFSET for grabbed)
   */
  private setKnotTranslation( knot: Knot, offset: number, verticalOffset = 0 ): void {
    const blueOffset = this.puller.type === 'blue' ? -60 + 10 : 0;
    this.setTranslation( knot.positionProperty.get() + offset + blueOffset, knot.y - this.height + 90 - verticalOffset );
  }

  /**
   * Get mode for a specific waypoint (knot or home)
   */
  private static getModeForWaypoint( waypoint: Knot | null, puller: Puller ): PullerMode {
    if ( waypoint === null ) {
      return PullerMode.keyboardGrabbedOverHome();
    }

    // Get the absolute knot index from the model knots array
    const knotIndex = puller.model.knots.indexOf( waypoint );
    affirm( knotIndex >= 0 && knotIndex <= 7, `knotIndex must be 0-7 for absolute indexing, got ${knotIndex}` );

    return PullerMode.keyboardGrabbedOverKnot( knotIndex );
  }

}

forcesAndMotionBasics.register( 'PullerNode', PullerNode );