// Copyright 2013-2025, University of Colorado Boulder

/**
 * Shows the graphic for the puller, which can be dragged from the toolbox to the rope to apply force.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import { FluentPatternDerivedProperty } from '../../../../chipper/js/browser/FluentPattern.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import HighlightFromNode from '../../../../scenery/js/accessibility/HighlightFromNode.js';
import InteractiveHighlighting from '../../../../scenery/js/accessibility/voicing/InteractiveHighlighting.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import { ImageableImage } from '../../../../scenery/js/nodes/Imageable.js';
import Tandem from '../../../../tandem/js/Tandem.js';
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
import NetForceScreenView from './NetForceScreenView.js';
import PullerNodeDragListener from './PullerNodeDragListener.js';
import PullerNodeKeyboardListener from './PullerNodeKeyboardListener.js';

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

  // Image displayed while the puller is waiting in the toolbox.
  public standImage: ImageableImage;

  // Leaning image used when the puller is exerting force.
  public pullImage: ImageableImage;

  // Listener coordinating drag behaviour and related audio.
  private readonly dragListener: PullerNodeDragListener;

  // Keyboard listener that wires the accessible hotkeys for the puller.
  private readonly keyboardListener: PullerNodeKeyboardListener;

  // Cached reference to the NetForce model for convenience.
  private readonly model: NetForceModel;

  public constructor(
    public readonly puller: Puller,
    public readonly view: NetForceScreenView,
    tandem: Tandem,
    accessibleNameProperty: FluentPatternDerivedProperty
  ) {

    // Get the initial images based on current color preference
    const standImage = PullerNode.getPullerImage( puller, false );
    const pullImage = PullerNode.getPullerImage( puller, true );

    const x = puller.positionProperty.value.x;
    const y = puller.positionProperty.value.y;

    super( standImage, {
      tandem: tandem,
      phetioInputEnabledPropertyInstrumented: true,
      phetioFeatured: true,
      visiblePropertyOptions: { phetioFeatured: true },
      x: x,
      y: y,
      cursor: 'pointer',
      scale: 0.86,
      tagName: 'button',
      accessibleName: accessibleNameProperty,
      accessibleRoleDescription: ForcesAndMotionBasicsFluent.a11y.netForceScreen.puller.accessibleRoleDescriptionStringProperty
    } );

    this.standImage = standImage;
    this.pullImage = pullImage;
    const model = puller.model;
    this.model = model;

    this.dragListener = new PullerNodeDragListener( this, tandem.createTandem( 'dragListener' ) );
    this.addInputListener( this.dragListener );

    model.resetAllEmitter.addListener( () => {

      // cancel the drag
      if ( puller.modeProperty.value.isGrabbed() ) {
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
    this.keyboardListener = new PullerNodeKeyboardListener( this, tandem.createTandem( 'keyboardListener' ) );
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

    Multilink.multilink( [
      this.puller.modeProperty,
      this.puller.model.hasStartedProperty,
      this.puller.positionProperty,
      this.puller.model.stateProperty,
      ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty
    ], ( mode, hasStarted, position, state, preference ) => {

      // Get updated images based on current color preference
      this.standImage = PullerNode.getPullerImage( this.puller, false );
      this.pullImage = PullerNode.getPullerImage( this.puller, true );

      // Update the current displayed image based on whether the puller is pulling or standing
      const knot = this.puller.getKnot();
      const pulling = hasStarted && knot && state !== 'completed' && !this.puller.modeProperty.value.isGrabbed();
      this.image = pulling ? this.pullImage : this.standImage;

      const erode = this.puller.size === 'large' ? 35 :
                    this.puller.size === 'medium' ? 25 :
                    0;
      this.setMouseArea( this.localBounds.erodedX( pulling ? erode : 0 ) );
      this.setTouchArea( this.mouseArea );

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
  public getAccessibilityResponseForWaypoint( waypoint: Knot | null ): string {
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
  public static getModeForWaypoint( waypoint: Knot | null, puller: Puller ): PullerMode {
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
