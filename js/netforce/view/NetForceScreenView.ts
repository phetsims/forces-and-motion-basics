// Copyright 2013-2025, University of Colorado Boulder

/**
 * Main class for the entire view of the Net Force model, including cart, pullers, background, controls & audio sounds (when Net Force game complete).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import Shape from '../../../../kite/js/Shape.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import LinearGradient from '../../../../scenery/js/util/LinearGradient.js';
import SoundClip from '../../../../tambo/js/sound-generators/SoundClip.js';
import soundManager from '../../../../tambo/js/soundManager.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import grass_png from '../../../images/grass_png.js';
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
import rope_png from '../../../images/rope_png.js';
import golfClap_mp3 from '../../../sounds/golfClap_mp3.js';
import ForcesAndMotionBasicsLayoutBounds from '../../common/view/ForcesAndMotionBasicsLayoutBounds.js';
import ReadoutArrow from '../../common/view/ReadoutArrow.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import ForcesAndMotionBasicsPreferences from '../model/ForcesAndMotionBasicsPreferences.js';
import NetForceModel from '../model/NetForceModel.js';
import Puller from '../model/Puller.js';
import CartNode from './CartNode.js';
import CartStopperNode from './CartStopperNode.js';
import FlagNode from './FlagNode.js';
import GoPauseButton from './GoPauseButton.js';
import KnotHighlightNode from './KnotHighlightNode.js';
import NetForceControlPanel from './NetForceControlPanel.js';
import NetForceScreenSummaryContent from './NetForceScreenSummaryContent.js';
import PullerFocusManager from './PullerFocusManager.js';
import PullerGroupNode from './PullerGroupNode.js';
import PullerNode from './PullerNode.js';
import PullersOnRopeGroupNode from './PullersOnRopeGroupNode.js';
import PullerToolboxNode from './PullerToolboxNode.js';
import ReturnButton from './ReturnButton.js';

const leftForceStringProperty = ForcesAndMotionBasicsFluent.leftForceStringProperty;
const rightForceStringProperty = ForcesAndMotionBasicsFluent.rightForceStringProperty;
const sumOfForcesStringProperty = ForcesAndMotionBasicsFluent.sumOfForcesStringProperty;

// constants
const MARGIN_FROM_LAYOUT_BOUNDS = 5;
const STOPPER_TOP_WIDTH = 11;
const STOPPER_BOTTOM_WIDTH = 30;
const STOPPER_HEIGHT = 24;
const SUM_ARROW_TAIL_Y = 127;
const BUTTON_PADDING = 7; // placement padding for the reset all button

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

export default class NetForceScreenView extends ScreenView {
  private readonly cartNode: CartNode;
  private readonly ropeImageNode: Image;
  private readonly sumArrow: ReadoutArrow;
  private readonly leftArrow: ReadoutArrow;
  private readonly rightArrow: ReadoutArrow;
  private readonly pullerNodes: PullerNode[] = [];
  private readonly controlPanel: NetForceControlPanel;
  private readonly resetAllButton: ResetAllButton;
  private readonly sumOfForcesText: Text;
  private readonly leftPullerGroup: PullerGroupNode;
  private readonly rightPullerGroup: PullerGroupNode;
  private readonly leftRopePullerGroup: PullersOnRopeGroupNode;
  private readonly rightRopePullerGroup: PullersOnRopeGroupNode;
  private readonly returnButton: ReturnButton;
  private readonly pullerFocusManager: PullerFocusManager;


  public constructor( private readonly model: NetForceModel, tandem: Tandem ) {

    super( {
      layoutBounds: ForcesAndMotionBasicsLayoutBounds,
      tandem: tandem,
      screenSummaryContent: new NetForceScreenSummaryContent( model )
    } );
    //Fit to the window and render the initial scene
    const width = this.layoutBounds.width;
    const height = this.layoutBounds.height;

    //Create the sky and ground.  Allow the sky and ground to go off the screen in case the window is larger than the sim aspect ratio
    const skyHeight = 376;
    const grassY = 368;
    const groundHeight = height - skyHeight;
    this.addChild( new Rectangle( -width, -skyHeight, width * 3, skyHeight * 2, {
      fill: new LinearGradient( 0, 0, 0, skyHeight ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' )
    } ) );
    this.addChild( new Rectangle( -width, skyHeight, width * 3, groundHeight * 3, {
      fill: '#c59a5b'
    } ) );

    //Show the grass.
    this.addChild( new Image( grass_png, {
      x: 13,
      y: grassY
    } ) );
    this.addChild( new Image( grass_png, {
      x: 13 - grass_png.width,
      y: grassY
    } ) );
    this.addChild( new Image( grass_png, {
      x: 13 + grass_png.width,
      y: grassY
    } ) );

    this.cartNode = new CartNode( model.cart, model.speedProperty, model.showSpeedProperty );

    //Black caret below the cart
    const layoutCenterX = this.layoutBounds.width / 2;
    this.addChild( new Path( new Shape().moveTo( -10, 10 ).lineTo( 0, 0 ).lineTo( 10, 10 ), {
      stroke: '#000000',
      lineWidth: 3,
      x: layoutCenterX,
      y: grassY + 10
    } ) );

    const cursorWidth = 18;

    const cursorPathNode = new Path( new Shape().moveTo( 0, 0 ).lineTo( cursorWidth, 0 ).lineTo( cursorWidth / 2, cursorWidth / 10 * 8 ).close(), {
      fill: 'blue',
      stroke: 'black',
      lineWidth: 1
    } );

    // cart stoppers that seem to stop cart motion
    const stopperY = grassY + 5; // a little lower than the grass because the grass includes some sky blue
    const rightStopper = new CartStopperNode( STOPPER_TOP_WIDTH, STOPPER_BOTTOM_WIDTH, STOPPER_HEIGHT, {
      left: layoutCenterX + NetForceModel.GAME_LENGTH,
      y: stopperY
    } );
    const leftStopper = new CartStopperNode( STOPPER_TOP_WIDTH, STOPPER_BOTTOM_WIDTH, STOPPER_HEIGHT, {
      direction: 'right',
      right: layoutCenterX - NetForceModel.GAME_LENGTH,
      y: stopperY
    } );
    this.addChild( rightStopper );
    this.addChild( leftStopper );

    // create and add the rope node as an image
    const SVG_WIDTH = 1130.2;
    const PRIOR_SCALE = 0.78;
    const PNG_WIDTH = 2356;
    this.ropeImageNode = new Image( rope_png, {

      // Exactly match the dimensions of the prior SVG image
      scale: ( SVG_WIDTH * PRIOR_SCALE ) / PNG_WIDTH,
      x: 51,
      y: 273
    } );
    this.addChild( this.ropeImageNode );

    model.knots.forEach( ( knot, i ) => {
      if ( knot.type === 'blue' ) {
        this.addChild( new KnotHighlightNode( knot ) );
      }
      else if ( knot.type === 'red' ) {
        this.addChild( new KnotHighlightNode( knot ) );
      }
      else {
        assert && assert( false, 'Knots can only be of type "red" or "blue" in this sim.' );
      }
    } );

    //Split into another canvas to speed up rendering
    this.addChild( new Node( {
      layerSplit: true
    } ) );

    //Create the arrow nodes
    const opacity = 0.8;
    this.sumArrow = new ReadoutArrow( sumOfForcesStringProperty, '#7dc673', layoutCenterX, SUM_ARROW_TAIL_Y, this.model.netForceProperty, this.model.showValuesProperty, {
      labelPosition: 'top', opacity: opacity,
      arrowNodeOptions: {
        lineDash: [ 10, 5 ]
      }
    } );
    this.leftArrow = new ReadoutArrow( leftForceStringProperty, '#bf8b63', layoutCenterX, 200, this.model.leftForceProperty, this.model.showValuesProperty, {
      labelPosition: 'side', opacity: opacity,
      arrowNodeOptions: {
        lineDash: [ 10, 5 ]
      }
    } );
    this.rightArrow = new ReadoutArrow( rightForceStringProperty, '#bf8b63', layoutCenterX, 200, this.model.rightForceProperty, this.model.showValuesProperty, {
      labelPosition: 'side', opacity: opacity,
      arrowNodeOptions: {
        lineDash: [ 10, 5 ]
      }
    } );

    //Arrows should be dotted when the sim is paused, but solid after pressing 'go'
    this.model.isRunningProperty.link( running => {
      [ this.sumArrow, this.leftArrow, this.rightArrow ].forEach( arrow => {
        arrow.setArrowDash( running ? [] : [ 10, 5 ] );
      } );
    } );

    this.model.showSumOfForcesProperty.linkAttribute( this.sumArrow, 'visible' );

    this.model.cart.positionProperty.link( x => {
      this.cartNode.x = x + 412;
      this.ropeImageNode.x = x + 51;
    } );

    this.addChild( this.cartNode );

    // Add accessible description for the cart and rope visual scene
    this.cartNode.accessibleParagraph = 'A wheeled cart sits on a flat surface with a rope attached to both sides.';

    // Create DerivedProperties that wire directly to the preference
    const leftTeamHeadingProperty = new DerivedProperty(
      [ ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty ],
      pullerColor => {
        const displayColor = pullerColor === 'purpleOrange' ? 'purple' : 'blue';
        const colorKey = displayColor.charAt( 0 ).toUpperCase() + displayColor.slice( 1 );
        return `${colorKey} Team Toolbox`;
      }
    );

    const rightTeamHeadingProperty = new DerivedProperty(
      [ ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty ],
      pullerColor => {
        const displayColor = pullerColor === 'purpleOrange' ? 'orange' : 'red';
        const colorKey = displayColor.charAt( 0 ).toUpperCase() + displayColor.slice( 1 );
        return `${colorKey} Team Toolbox`;
      }
    );

    const leftTeamGroupNameProperty = new DerivedProperty(
      [ ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty ],
      pullerColor => {
        const displayColor = pullerColor === 'purpleOrange' ? 'purple' : 'blue';
        const colorKey = displayColor.charAt( 0 ).toUpperCase() + displayColor.slice( 1 );
        return `${colorKey} Team Pullers`;
      }
    );

    const rightTeamGroupNameProperty = new DerivedProperty(
      [ ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty ],
      pullerColor => {
        const displayColor = pullerColor === 'purpleOrange' ? 'orange' : 'red';
        const colorKey = displayColor.charAt( 0 ).toUpperCase() + displayColor.slice( 1 );
        return `${colorKey} Team Pullers`;
      }
    );

    //Lookup a puller image given a puller instance and whether they are leaning or not.
    const getPullerImage = ( puller: Puller, leaning: boolean ) => {
      const pullerColor = ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty.value;
      const type = puller.type;
      const size = puller.size;

      // Map the type to the appropriate color based on the netForcePullerColorsProperty
      const mappedType = ( type === 'blue' && pullerColor === 'purpleOrange' ) ? 'purple' :
                         ( type === 'red' && pullerColor === 'purpleOrange' ) ? 'orange' : type;

      const colorTypeSet: ColorTypeSet = colorMapping[ mappedType ];
      return colorTypeSet[ size ][ leaning ? 'leaning' : 'notLeaning' ] || null;
    };

    // Create the toolboxes with dynamic accessibility properties
    const leftToolbox = new PullerToolboxNode( model, this, 25, 'left', 0, 0, 3, 'blue', {
      tagName: 'div',
      accessibleName: leftTeamHeadingProperty,
      accessibleParagraph: 'Use arrow keys to select a puller, then press Space or Enter to grab. Drag to attach to rope knots.'
    } );
    const rightToolbox = new PullerToolboxNode( model, this, 630, 'right', model.pullers.length - 1, 4, model.pullers.length - 1, 'red', {
      tagName: 'div',
      accessibleName: rightTeamHeadingProperty,
      accessibleParagraph: 'Use arrow keys to select a puller, then press Space or Enter to grab. Drag to attach to rope knots.'
    } );

    this.addChild( leftToolbox );
    this.addChild( rightToolbox );

    const pullersTandem = tandem.createTandem( 'pullers' );

    // Initialize the centralized focus manager
    this.pullerFocusManager = new PullerFocusManager();

    this.leftPullerGroup = new PullerGroupNode( model, {
      side: 'left',
      accessibleName: leftTeamGroupNameProperty
    } );
    this.rightPullerGroup = new PullerGroupNode( model, {
      side: 'right',
      accessibleName: rightTeamGroupNameProperty
    } );
    this.model.pullers.forEach( puller => {
      // Create dynamic accessibleName property for this puller wired directly to preference
      const dynamicAccessibleNameProperty = new DerivedProperty(
        [ ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty ],
        pullerColor => {
          let displayColor: string;
          if ( pullerColor === 'purpleOrange' ) {
            displayColor = puller.type === 'blue' ? 'purple' : 'orange';
          }
          else {
            displayColor = puller.type; // 'blue' or 'red'
          }
          return `${puller.size} ${displayColor} puller`;
        }
      );

      const pullerNode = new PullerNode( puller, this.model, this.pullerFocusManager,
        getPullerImage( puller, false ),
        getPullerImage( puller, true ), {
          tandem: pullersTandem.createTandem( `${puller.tandem.name}Node` ),
          accessibleName: dynamicAccessibleNameProperty
        }
      );
      const pullerGroup = pullerNode.puller.type === 'blue' ? this.leftPullerGroup : this.rightPullerGroup;
      pullerGroup.addPullerNode( pullerNode, this.model );
      this.pullerNodes.push( pullerNode );

      // Register with the centralized focus manager
      this.pullerFocusManager.registerPuller( pullerNode );

      // Listen for knot property changes to move pullers between groups
      puller.knotProperty.link( ( newKnot, oldKnot ) => {
        const toolboxGroup = puller.type === 'blue' ? this.leftPullerGroup : this.rightPullerGroup;
        const ropeGroup = puller.type === 'blue' ? this.leftRopePullerGroup : this.rightRopePullerGroup;

        if ( newKnot !== null && oldKnot === null ) {
          // Puller attached to rope - move from toolbox to rope group
          if ( toolboxGroup.pullerNodes.includes( pullerNode ) ) {
            toolboxGroup.removePullerNode( pullerNode );
            ropeGroup.addPullerNode( pullerNode, this.model );
          }
        }
        else if ( newKnot === null && oldKnot !== null ) {
          // Puller detached from rope - move from rope group back to toolbox
          if ( ropeGroup.ropePullerNodes.includes( pullerNode ) ) {
            ropeGroup.removePullerNode( pullerNode );
            toolboxGroup.addPullerNode( pullerNode, this.model );
          }
        }
      } );


      // Listen for drops to handle auto-focus to next puller
      puller.droppedEmitter.addListener( ( source: 'mouse' | 'keyboard' ) => {
        // Only handle keyboard drops for auto-focus
        if ( source === 'keyboard' ) {
          // Check if the puller was dropped on the rope (has a knot)
          if ( puller.knotProperty.get() !== null ) {
            // The puller was dropped on the rope, focus next puller in toolbox
            const toolboxGroup = puller.type === 'blue' ? this.leftPullerGroup : this.rightPullerGroup;
            toolboxGroup.focusNextPullerInToolbox( pullerNode );
          }
        }
      } );
    } );

    ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty.link( () => {
      this.pullerNodes.forEach( pullerNode => {
        pullerNode.standImage = getPullerImage( pullerNode.puller, false );
        pullerNode.pullImage = getPullerImage( pullerNode.puller, true );
        pullerNode.updateImage( pullerNode.puller, model );
        pullerNode.updatePosition( pullerNode.puller, model );
      } );
    } );

    leftToolbox.addChild( this.leftPullerGroup );
    rightToolbox.addChild( this.rightPullerGroup );

    // Create DerivedProperties for rope group names
    const leftRopeGroupNameProperty = new DerivedProperty(
      [ ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty ],
      pullerColor => {
        const displayColor = pullerColor === 'purpleOrange' ? 'purple' : 'blue';
        const colorKey = displayColor.charAt( 0 ).toUpperCase() + displayColor.slice( 1 );
        return `${colorKey} Team Pullers on Rope`;
      }
    );

    const rightRopeGroupNameProperty = new DerivedProperty(
      [ ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty ],
      pullerColor => {
        const displayColor = pullerColor === 'purpleOrange' ? 'orange' : 'red';
        const colorKey = displayColor.charAt( 0 ).toUpperCase() + displayColor.slice( 1 );
        return `${colorKey} Team Pullers on Rope`;
      }
    );

    // Create separate rope groups for blue (left) and red (right) pullers
    this.leftRopePullerGroup = new PullersOnRopeGroupNode( model, {
      side: 'left',
      accessibleName: leftRopeGroupNameProperty
    } );
    this.rightRopePullerGroup = new PullersOnRopeGroupNode( model, {
      side: 'right',
      accessibleName: rightRopeGroupNameProperty
    } );
    this.addChild( this.leftRopePullerGroup );
    this.addChild( this.rightRopePullerGroup );

    // Note: Complex transfer logic has been replaced with centralized focus management.
    // The PullerFocusManager now handles focus state based on puller modes automatically.

    //Add the go button, but only if there is a puller attached
    // i18n - ensure that the go, pause, and return buttons will fit in between the puller toolboxes
    const maxWidth = ( rightToolbox.left - leftToolbox.right ) / 2;
    const goPauseButton = new GoPauseButton( this.model, this.layoutBounds.width, tandem.createTandem( 'goPauseButton' ), {
      maxWidth: maxWidth,
      tandem: tandem.createTandem( 'goPauseButton' )
    } );
    this.addChild( goPauseButton );

    // Return button
    this.returnButton = new ReturnButton( model, tandem.createTandem( 'returnButton' ), {
      centerX: this.layoutBounds.centerX,
      top: goPauseButton.bottom + MARGIN_FROM_LAYOUT_BOUNDS,
      maxWidth: maxWidth
    } );
    this.addChild( this.returnButton );

    // Add the arrow nodes after the pullers so they will appear in the front in z-ordering
    this.addChild( this.leftArrow );
    this.addChild( this.rightArrow );
    this.addChild( this.sumArrow );

    // Show the control panel
    this.controlPanel = new NetForceControlPanel( this.model, tandem.createTandem( 'controlPanel' ), {
      visiblePropertyOptions: { phetioFeatured: true }
    } );

    // Create reset all button
    this.resetAllButton = new ResetAllButton( {
      listener: () => {
        model.reset();

        // Reset all puller nodes
        this.pullerNodes.forEach( pullerNode => pullerNode.reset() );

        // Reset the centralized focus management
        this.pullerFocusManager.reset();

        // Reset the focus state of all puller groups to ensure proper keyboard navigation
        this.leftPullerGroup.reset();
        this.rightPullerGroup.reset();
        this.leftRopePullerGroup.reset();
        this.rightRopePullerGroup.reset();
      },
      radius: 23,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );

    this.addChild( this.controlPanel );
    this.addChild( this.resetAllButton );

    ManualConstraint.create( this, [ this.controlPanel ], controlPanelProxy => {
      controlPanelProxy.right = this.layoutBounds.width - MARGIN_FROM_LAYOUT_BOUNDS;
      controlPanelProxy.top = MARGIN_FROM_LAYOUT_BOUNDS;
    } );

    // It was specifically requested that the reset all button not move when the control panel visibleProperty becomes false,
    // see https://github.com/phetsims/forces-and-motion-basics/issues/353
    this.resetAllButton.right = this.layoutBounds.width - MARGIN_FROM_LAYOUT_BOUNDS;
    this.resetAllButton.top = this.controlPanel.bottom + BUTTON_PADDING;

    let lastFlagNode: FlagNode | null = null;
    let hasAnnouncedWinner = false; // Prevent duplicate win announcements

    // Show the flag node when pulling is complete
    Multilink.multilink( [ model.stateProperty, model.cart.positionProperty ], ( state, x ) => {
      lastFlagNode && lastFlagNode.dispose();
      lastFlagNode = null;
      if ( state === 'completed' && Math.abs( x ) > 1E-6 ) {
        lastFlagNode = new FlagNode( model );
        this.addChild( lastFlagNode );
        lastFlagNode.centerX = this.layoutBounds.width / 2;
        lastFlagNode.top = 8;

        // Add ARIA-LIVE announcement for the winner (only once per game)
        if ( !hasAnnouncedWinner ) {
          const pullerColor = ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty.value;
          let winnerAnnouncement: string;
          if ( pullerColor === 'purpleOrange' ) {
            winnerAnnouncement = x < 0 ? 'Purple wins!' : 'Orange wins!';
          }
          else {
            winnerAnnouncement = x < 0 ? 'Blue wins!' : 'Red wins!';
          }
          this.addAccessibleResponse( winnerAnnouncement );
          hasAnnouncedWinner = true;
        }
      }
    } );

    const golfClap = new SoundClip( golfClap_mp3 );
    soundManager.addSoundGenerator( golfClap );

    //Play audio golf clap when game completed
    model.stateProperty.link( state => {
      if ( state === 'completed' ) {
        golfClap.play();
      }
      // Reset the win announcement flag when starting a new game
      if ( state === 'experimenting' ) {
        hasAnnouncedWinner = false;
      }
    } );

    //Show 'Sum of Forces = 0' when showForces is selected but the force is zero
    this.sumOfForcesText = new Text( ForcesAndMotionBasicsFluent.sumOfForcesEqualsZeroStringProperty, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      bottom: SUM_ARROW_TAIL_Y - ReadoutArrow.ARROW_HEAD_WIDTH / 2,
      maxWidth: 280
    } );
    ForcesAndMotionBasicsFluent.sumOfForcesEqualsZeroStringProperty.link( () => {
      this.sumOfForcesText.centerX = width / 2;
    } );

    Multilink.multilink( [ model.netForceProperty, model.showSumOfForcesProperty ], ( netForce, showSumOfForces ) => { this.sumOfForcesText.visible = !netForce && showSumOfForces; } );
    this.addChild( this.sumOfForcesText );

    cursorPathNode.visible = false;
    this.addChild( cursorPathNode );

    // Set up the pdomOrder for proper accessibility hierarchy
    // Play Area: left toolbox -> right toolbox -> blue rope group -> red rope group -> buttons
    this.pdomPlayAreaNode.pdomOrder = [
      leftToolbox,
      rightToolbox,
      this.leftRopePullerGroup,
      this.rightRopePullerGroup,
      goPauseButton,
      this.returnButton,
      this.cartNode
    ];

    // Control Area: control panel and reset button
    this.pdomControlAreaNode.pdomOrder = [
      this.controlPanel,
      this.resetAllButton
    ];
  }
}

forcesAndMotionBasics.register( 'NetForceScreenView', NetForceScreenView );