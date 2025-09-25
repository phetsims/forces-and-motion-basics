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
import pull_figure_BLUE_0_png from '../../../images/pushPullFigures/pull_figure_BLUE_0_png.js';
import pull_figure_BLUE_3_png from '../../../images/pushPullFigures/pull_figure_BLUE_3_png.js';
import pull_figure_lrg_BLUE_0_png from '../../../images/pushPullFigures/pull_figure_lrg_BLUE_0_png.js';
import pull_figure_lrg_BLUE_3_png from '../../../images/pushPullFigures/pull_figure_lrg_BLUE_3_png.js';
import pull_figure_lrg_ORANGE_0_png from '../../../images/pushPullFigures/pull_figure_lrg_ORANGE_0_png.js';
import pull_figure_lrg_ORANGE_3_png from '../../../images/pushPullFigures/pull_figure_lrg_ORANGE_3_png.js';
import pull_figure_lrg_PURPLE_0_png from '../../../images/pushPullFigures/pull_figure_lrg_PURPLE_0_png.js';
import pull_figure_lrg_PURPLE_3_png from '../../../images/pushPullFigures/pull_figure_lrg_PURPLE_3_png.js';
import pull_figure_lrg_RED_0_png from '../../../images/pushPullFigures/pull_figure_lrg_RED_0_png.js';
import pull_figure_lrg_RED_3_png from '../../../images/pushPullFigures/pull_figure_lrg_RED_3_png.js';
import pull_figure_ORANGE_0_png from '../../../images/pushPullFigures/pull_figure_ORANGE_0_png.js';
import pull_figure_ORANGE_3_png from '../../../images/pushPullFigures/pull_figure_ORANGE_3_png.js';
import pull_figure_PURPLE_0_png from '../../../images/pushPullFigures/pull_figure_PURPLE_0_png.js';
import pull_figure_PURPLE_3_png from '../../../images/pushPullFigures/pull_figure_PURPLE_3_png.js';
import pull_figure_RED_0_png from '../../../images/pushPullFigures/pull_figure_RED_0_png.js';
import pull_figure_RED_3_png from '../../../images/pushPullFigures/pull_figure_RED_3_png.js';
import pull_figure_small_BLUE_0_png from '../../../images/pushPullFigures/pull_figure_small_BLUE_0_png.js';
import pull_figure_small_BLUE_3_png from '../../../images/pushPullFigures/pull_figure_small_BLUE_3_png.js';
import pull_figure_small_ORANGE_0_png from '../../../images/pushPullFigures/pull_figure_small_ORANGE_0_png.js';
import pull_figure_small_ORANGE_3_png from '../../../images/pushPullFigures/pull_figure_small_ORANGE_3_png.js';
import pull_figure_small_PURPLE_0_png from '../../../images/pushPullFigures/pull_figure_small_PURPLE_0_png.js';
import pull_figure_small_PURPLE_3_png from '../../../images/pushPullFigures/pull_figure_small_PURPLE_3_png.js';
import pull_figure_small_RED_0_png from '../../../images/pushPullFigures/pull_figure_small_RED_0_png.js';
import pull_figure_small_RED_3_png from '../../../images/pushPullFigures/pull_figure_small_RED_3_png.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
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

// Define the color mapping for the pullers
type ColorTypeSet = {
  large: {
    leaning: HTMLImageElement;
    notLeaning: HTMLImageElement;
  };
  medium: {
    leaning: HTMLImageElement;
    notLeaning: HTMLImageElement;
  };
  small: {
    leaning: HTMLImageElement;
    notLeaning: HTMLImageElement;
  };
};
type ColorMap = {
  blue: ColorTypeSet;
  red: ColorTypeSet;
  purple: ColorTypeSet;
  orange: ColorTypeSet;
};

const colorMapping: ColorMap = {
  blue: {
    large: {
      notLeaning: pull_figure_lrg_BLUE_0_png,
      leaning: pull_figure_lrg_BLUE_3_png
    },
    medium: {
      notLeaning: pull_figure_BLUE_0_png,
      leaning: pull_figure_BLUE_3_png
    },
    small: {
      notLeaning: pull_figure_small_BLUE_0_png,
      leaning: pull_figure_small_BLUE_3_png
    }
  },
  red: {
    large: {
      notLeaning: pull_figure_lrg_RED_0_png,
      leaning: pull_figure_lrg_RED_3_png
    },
    medium: {
      notLeaning: pull_figure_RED_0_png,
      leaning: pull_figure_RED_3_png
    },
    small: {
      notLeaning: pull_figure_small_RED_0_png,
      leaning: pull_figure_small_RED_3_png
    }
  },
  purple: {
    large: {
      notLeaning: pull_figure_lrg_PURPLE_0_png,
      leaning: pull_figure_lrg_PURPLE_3_png
    },
    medium: {
      notLeaning: pull_figure_PURPLE_0_png,
      leaning: pull_figure_PURPLE_3_png
    },
    small: {
      notLeaning: pull_figure_small_PURPLE_0_png,
      leaning: pull_figure_small_PURPLE_3_png
    }
  },
  orange: {
    large: {
      notLeaning: pull_figure_lrg_ORANGE_0_png,
      leaning: pull_figure_lrg_ORANGE_3_png
    },
    medium: {
      notLeaning: pull_figure_ORANGE_0_png,
      leaning: pull_figure_ORANGE_3_png
    },
    small: {
      notLeaning: pull_figure_small_ORANGE_0_png,
      leaning: pull_figure_small_ORANGE_3_png
    }
  }
};

export default class PullerNode extends InteractiveHighlighting( Image ) {

  public standImage: ImageableImage;
  public pullImage: ImageableImage;
  private readonly dragListener: SoundDragListener;
  private readonly keyboardListener: KeyboardListener<OneKeyStroke[]> | null = null;
  private readonly model: NetForceModel;

  /**
   * Get the appropriate puller image based on the current color preference
   * @param puller - The puller model
   * @param leaning - Whether the puller is leaning (pulling) or standing
   * @returns The appropriate image for the puller
   */
  public static getPullerImage( puller: Puller, leaning: boolean ): ImageableImage {
    const pullerColor = ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty.value;
    const type = puller.type;
    const size = puller.size;

    // Map the type to the appropriate color based on the netForcePullerColorsProperty
    const mappedType = ( type === 'blue' && pullerColor === 'purpleOrange' ) ? 'purple' :
                       ( type === 'red' && pullerColor === 'purpleOrange' ) ? 'orange' : type;

    const colorTypeSet: ColorTypeSet = colorMapping[ mappedType ];
    return colorTypeSet[ size ][ leaning ? 'leaning' : 'notLeaning' ] || null;
  }

  /**
   * Create a PullerNode for the specified puller
   *
   * @param puller
   * @param view
   * @param [providedOptions]
   */
  public constructor(
    public readonly puller: Puller,
    public readonly view: NetForceScreenView,
    providedOptions?: PullerNodeOptions ) {

    // Get the initial images based on current color preference
    const standImage = PullerNode.getPullerImage( puller, false );
    const pullImage = PullerNode.getPullerImage( puller, true );

    const x = puller.positionProperty.value.x;
    const y = puller.positionProperty.value.y;

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
      } ),
      accessibleRoleDescription: ForcesAndMotionBasicsFluent.a11y.netForceScreen.puller.accessibleRoleDescriptionStringProperty
    }, providedOptions );

    super( standImage, options );

    this.standImage = standImage;
    this.pullImage = pullImage;
    const model = puller.model;
    this.model = model;

    // Listen to color preference changes and update images accordingly
    ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty.lazyLink( () => {

      // Get updated images based on current color preference
      const standImage = PullerNode.getPullerImage( this.puller, false );
      const pullImage = PullerNode.getPullerImage( this.puller, true );
      this.updateImages( standImage, pullImage );
    } );

    //REVIEW Factor out PullerDragListener extends SoundDragListener
    this.dragListener = new SoundDragListener( {
        tandem: options.tandem?.createTandem( 'dragListener' ),
        allowTouchSnag: true,
        positionProperty: puller.positionProperty,
        start: () => {

          puller.modeProperty.value = PullerMode.pointerGrabbed();

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
            this.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.netForceScreen.pullerResponses.pullerAttachedToKnot.format( {
              size: puller.size,
              color: puller.colorProperty,
              knotDescription: knotDescription,
              index: puller.descriptionIndex
            } ) );
          }
          else {
            this.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.netForceScreen.pullerResponses.pullerReturnedToToolbox.format( {
              size: puller.size,
              color: puller.colorProperty,
              index: puller.descriptionIndex
            } ) );
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
      highlightFromNode.setDashed( mode.isGrabbed() );

      this.accessibleRoleDescription = mode.isGrabbed() ? ForcesAndMotionBasicsFluent.a11y.navigableStringProperty : ForcesAndMotionBasicsFluent.a11y.sortableStringProperty;
    } );

    // Create a single listener that combines all hotkey data
    //REVIEW Factor out PullerKeyboardListener extends KeyboardListener
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

            // Find all pullers of the same type
            const availablePullers = this.view.pullerNodes.filter( pullerNode => pullerNode.puller.type === this.puller.type );

            if ( availablePullers.length > 1 ) {

              // Sort: pullers on rope first (left to right), then pullers in toolbox (left to right)
              availablePullers.sort( ( a, b ) => {
                const aOnRope = a.puller.modeProperty.value.isAttached();
                const bOnRope = b.puller.modeProperty.value.isAttached();

                // If one is on rope and the other isn't, rope puller comes first
                if ( aOnRope && !bOnRope ) {
                  return -1;
                }
                if ( !aOnRope && bOnRope ) {
                  return 1;
                }

                // If both are in same location (both on rope or both in toolbox), sort by X position
                return a.centerX - b.centerX;
              } );

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

            // Get available knots for this puller's type
            const availableKnots = model.knots.filter( knot =>

              // Include the current puller's knot so we can index it, and know which is before/after
              knot.type === puller.type && ( model.getPuller( knot ) === null || model.getPuller( knot ) === puller )
            );

            // Create navigation waypoints: [knot1, knot2, ..., knotN, HOME]
            const waypoints: ( Knot | null )[] = [ ...availableKnots, null ]; // null = home position

            if ( waypoints.length <= 1 ) {
              return; // no navigation possible
            }

            // Find current waypoint index based on current mode
            const currentMode = puller.modeProperty.value;
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
            puller.modeProperty.value = PullerNode.getModeForWaypoint( targetWaypoint, puller );

            // Generate accessibility response
            this.addAccessibleContextResponse( this.getAccessibilityResponseForWaypoint( targetWaypoint ) );
          }
        }

        // GRAB/DROP (Enter/Space)
        if ( NetForceHotkeyData.pullerNode.grabOrDrop.hasKeyStroke( keysPressed ) ) {

          // Pick up an ungrabbed puller
          if ( !puller.isGrabbed() ) {

            const wasInHome = puller.modeProperty.value.isHome();

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
            else if ( puller.modeProperty.value.isAttached() ) {
              // Puller is attached to a knot - grab it over that knot
              const currentKnot = puller.getKnot();
              newMode = PullerNode.getModeForWaypoint( currentKnot, puller );
            }
            else {
              // Fallback to keyboard grabbed over home
              newMode = PullerMode.keyboardGrabbedOverHome();
            }

            puller.modeProperty.value = newMode;

            // Announce current position when grabbed - reuse the same logic as navigation
            const currentMode = puller.modeProperty.value;
            const knotIndex = currentMode.getKeyboardGrabbedKnotIndex();
            const targetWaypoint = knotIndex !== null ? model.knots[ knotIndex ] : null;

            const grabAccessibilityResponse = this.getAccessibilityResponseForWaypoint( targetWaypoint );
            this.addAccessibleContextResponse( grabAccessibilityResponse );
          }
          else {

            // Drop the grabbed puller
            const currentMode = puller.modeProperty.value;

            // Determine where to drop based on current mode
            let newMode: PullerMode;

            if ( currentMode.isKeyboardGrabbedOverHome() ) {
              // Drop at home (toolbox)
              newMode = PullerMode.home();

              this.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.netForceScreen.pullerResponses.pullerReturnedToToolbox.format( {
                size: puller.size,
                color: puller.colorProperty,
                index: puller.descriptionIndex
              } ) );
            }
            else if ( currentMode.isKeyboardGrabbedOverKnot() ) {
              // Drop at knot - convert keyboard grabbed to attached
              const knotIndex = currentMode.getKeyboardGrabbedKnotIndex();
              if ( knotIndex !== null ) {
                newMode = PullerMode.attachedToKnot( knotIndex );

                const knot = puller.getKnot();
                const knotDescription = knot ? this.getKnotDescription( knot ) : 'knot';
                this.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.netForceScreen.pullerResponses.pullerAttachedToKnot.format( {
                  size: puller.size,
                  color: puller.colorProperty,
                  knotDescription: knotDescription,
                  index: puller.descriptionIndex
                } ) );
              }
              else {
                // Fallback to home
                newMode = PullerMode.home();
                this.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.netForceScreen.pullerResponses.pullerReturnedToToolbox.format( {
                  size: puller.size,
                  color: puller.colorProperty,
                  index: puller.descriptionIndex
                } ) );
              }
            }
            else {
              // Fallback to home
              newMode = PullerMode.home();
              this.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.netForceScreen.pullerResponses.pullerReturnedToToolbox.format( {
                size: puller.size,
                color: puller.colorProperty,
                index: puller.descriptionIndex
              } ) );
            }

            // Clear grab origin
            puller.clearGrabOrigin();

            // Update mode
            puller.modeProperty.value = newMode;
          }
        }

        // CANCEL (Escape)
        if ( NetForceHotkeyData.pullerNode.cancelInteraction.hasKeyStroke( keysPressed ) ) {
          if ( puller.isGrabbed() ) {
            // Cancel the grab and return to original position
            puller.cancelGrab();

            // Add accessibility response
            this.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.netForceScreen.pullerResponses.pullerInteractionCancelled.format( {
              size: puller.size,
              color: puller.colorProperty,
              index: puller.descriptionIndex
            } ) );
          }
        }

        // RETURN TO TOOLBOX (Delete/Backspace)
        if ( NetForceHotkeyData.pullerNode.returnToToolbox.hasKeyStroke( keysPressed ) ) {
          if ( puller.isGrabbed() ) {
            puller.clearGrabOrigin();

            // Move puller back to home and retain focus
            puller.modeProperty.value = PullerMode.home();

            // Add accessibility response
            this.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.netForceScreen.pullerResponses.pullerReturnedToToolbox.format( {
              size: puller.size,
              color: puller.colorProperty,
              index: puller.descriptionIndex
            } ) );
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
      const pulling = hasStarted && knot && this.puller.model.stateProperty.value !== 'completed';
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
    const side = knot.type === 'blue' ?
                 ForcesAndMotionBasicsFluent.a11y.pullers.leftSideStringProperty.value :
                 ForcesAndMotionBasicsFluent.a11y.pullers.rightSideStringProperty.value;

    // Format without creating a Property to avoid leaks in transient usage
    return ForcesAndMotionBasicsFluent.a11y.pullers.knotDescription.format( {
      side: side,
      number: ( index + 1 ).toString()
    } );
  }

  /**
   * Get accessibility response for a given waypoint (knot or null for home)
   * @param waypoint - The waypoint to describe, or null for home
   * @returns The accessibility response string
   */
  private getAccessibilityResponseForWaypoint( waypoint: Knot | null ): string {
    if ( waypoint === null ) {
      return ForcesAndMotionBasicsFluent.a11y.pullers.overReturnToToolboxStringProperty.value;
    }
    else {
      // Use the internationalized "Over knot description" pattern
      const sameTypeKnots = this.model.knots.filter( k => k.type === waypoint.type );
      const index = sameTypeKnots.indexOf( waypoint );
      const side = waypoint.type === 'blue' ?
                   ForcesAndMotionBasicsFluent.a11y.pullers.leftSideStringProperty.value :
                   ForcesAndMotionBasicsFluent.a11y.pullers.rightSideStringProperty.value;

      // Use Fluent pattern with variables
      return ForcesAndMotionBasicsFluent.a11y.pullers.overKnotDescription.format( {
        side: side,
        number: ( index + 1 ).toString()
      } );
    }
  }

  /**
   * Update the puller's images when the color scheme changes
   * @param standImage - The new standing image
   * @param pullImage - The new pulling image
   */
  public updateImages( standImage: ImageableImage, pullImage: ImageableImage ): void {
    this.standImage = standImage;
    this.pullImage = pullImage;

    // Update the current displayed image based on whether the puller is pulling or standing
    const knot = this.puller.getKnot();
    const pulling = this.model.hasStartedProperty.value && knot && this.model.stateProperty.value !== 'completed';
    this.image = pulling ? this.pullImage : this.standImage;
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
    this.setTranslation( knot.positionProperty.value + offset + blueOffset, knot.y - this.height + 90 - verticalOffset );
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