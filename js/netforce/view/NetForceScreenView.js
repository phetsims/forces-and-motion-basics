// Copyright 2013-2024, University of Colorado Boulder

/**
 * Main class for the entire view of the Net Force model, including cart, pullers, background, controls & audio sounds (when Net Force game complete).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import { Shape } from '../../../../kite/js/imports.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Image, LinearGradient, Node, Path, Rectangle, Text } from '../../../../scenery/js/imports.js';
import Sound from '../../../../vibe/js/Sound.js';
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
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';
import ForcesAndMotionBasicsPreferences from '../model/ForcesAndMotionBasicsPreferences.js';
import NetForceModel from '../model/NetForceModel.js';
import PullerColors from '../model/PullerColors.js';
import CartNode from './CartNode.js';
import CartStopperNode from './CartStopperNode.js';
import FlagNode from './FlagNode.js';
import GoPauseButton from './GoPauseButton.js';
import NetForceControlPanel from './NetForceControlPanel.js';
import PullerNode from './PullerNode.js';
import PullerToolboxNode from './PullerToolboxNode.js';
import ReturnButton from './ReturnButton.js';

const leftForceStringProperty = ForcesAndMotionBasicsStrings.leftForceStringProperty;
const rightForceStringProperty = ForcesAndMotionBasicsStrings.rightForceStringProperty;
const sumOfForcesStringProperty = ForcesAndMotionBasicsStrings.sumOfForcesStringProperty;

// constants
const MARGIN_FROM_LAYOUT_BOUNDS = 5;
const STOPPER_TOP_WIDTH = 11;
const STOPPER_BOTTOM_WIDTH = 30;
const STOPPER_HEIGHT = 24;
const SUM_ARROW_TAIL_Y = 127;

// Define the color mapping for the pullers
const colorMapping = {
  blueRed: {
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
    }
  },
  purpleOrange: {
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
  }
};

class NetForceScreenView extends ScreenView {

  /**
   * @param {NetForceModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {

    super( {
      layoutBounds: ForcesAndMotionBasicsLayoutBounds,
      tandem: tandem
    } );
    //Fit to the window and render the initial scene
    const width = this.layoutBounds.width;
    const height = this.layoutBounds.height;

    this.model = model;

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
      tandem: tandem.createTandem( 'grassImage1' ),
      x: 13,
      y: grassY
    } ) );
    this.addChild( new Image( grass_png, {
      tandem: tandem.createTandem( 'grassImage2' ),
      x: 13 - grass_png.width,
      y: grassY
    } ) );
    this.addChild( new Image( grass_png, {
      tandem: tandem.createTandem( 'grassImage3' ),
      x: 13 + grass_png.width,
      y: grassY
    } ) );

    this.cartNode = new CartNode( model.cart, model.speedProperty, model.showSpeedProperty, tandem.createTandem( 'cartNode' ) );

    //Black caret below the cart
    const layoutCenterX = this.layoutBounds.width / 2;
    this.addChild( new Path( new Shape().moveTo( -10, 10 ).lineTo( 0, 0 ).lineTo( 10, 10 ), {
      stroke: '#000000',
      lineWidth: 3,
      x: layoutCenterX,
      y: grassY + 10,
      tandem: tandem.createTandem( 'caretPathNode' )
    } ) );

    const cursorWidth = 18;

    const cursorPathNode = new Path( new Shape().moveTo( 0, 0 ).lineTo( cursorWidth, 0 ).lineTo( cursorWidth / 2, cursorWidth / 10 * 8 ).close(), {
      fill: 'blue',
      stroke: 'black',
      lineWidth: 1,
      tandem: tandem.createTandem( 'cursorPathNode' )
    } );

    // cart stoppers that seem to stop cart motion
    const stopperY = grassY + 5; // a little lower than the grass because the grass includes some sky blue
    const rightStopper = new CartStopperNode( STOPPER_TOP_WIDTH, STOPPER_BOTTOM_WIDTH, STOPPER_HEIGHT, tandem.createTandem( 'rightStopper' ), {
      left: layoutCenterX + NetForceModel.GAME_LENGTH,
      y: stopperY
    } );
    const leftStopper = new CartStopperNode( STOPPER_TOP_WIDTH, STOPPER_BOTTOM_WIDTH, STOPPER_HEIGHT, tandem.createTandem( 'leftStopper' ), {
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
      tandem: tandem.createTandem( 'ropeImageNode' ),
      x: 51,
      y: 273
    } );
    this.addChild( this.ropeImageNode );

    // create the toolboxes that hold the puller children
    const leftToolbox = new PullerToolboxNode( model, this, 25, 'left', 0, 0, 3, 'blue' );
    const rightToolbox = new PullerToolboxNode( model, this, 630, 'right', model.pullers.length - 1, 4, model.pullers.length - 1, 'red' );
    this.addChild( leftToolbox );
    this.addChild( rightToolbox );

    //Split into another canvas to speed up rendering
    this.addChild( new Node( {
      tandem: tandem.createTandem( 'frontLayer' ),
      layerSplit: true
    } ) );

    //Create the arrow nodes
    const opacity = 0.8;
    this.sumArrow = new ReadoutArrow( sumOfForcesStringProperty, '#7dc673', layoutCenterX, SUM_ARROW_TAIL_Y, this.model.netForceProperty, this.model.showValuesProperty,
      tandem.createTandem( 'sumArrow' ), {
        lineDash: [ 10, 5 ], labelPosition: 'top', opacity: opacity
      } );
    this.leftArrow = new ReadoutArrow( leftForceStringProperty, '#bf8b63', layoutCenterX, 200, this.model.leftForceProperty, this.model.showValuesProperty,
      tandem.createTandem( 'leftArrow' ), {
        lineDash: [ 10, 5 ], labelPosition: 'side', opacity: opacity
      } );
    this.rightArrow = new ReadoutArrow( rightForceStringProperty, '#bf8b63', layoutCenterX, 200, this.model.rightForceProperty, this.model.showValuesProperty,
      tandem.createTandem( 'rightArrow' ), {
        lineDash: [ 10, 5 ], labelPosition: 'side', opacity: opacity
      } );

    //Arrows should be dotted when the sim is paused, but solid after pressing 'go'
    this.model.runningProperty.link( running => {
      [ this.sumArrow, this.leftArrow, this.rightArrow ].forEach( arrow => {
        arrow.setArrowDash( running ? [] : [ 10, 5 ] );
      } );
    } );

    this.model.showSumOfForcesProperty.linkAttribute( this.sumArrow, 'visible' );

    this.model.cart.xProperty.link( x => {
      this.cartNode.x = x + 412;
      this.ropeImageNode.x = x + 51;
    } );

    this.addChild( this.cartNode );

    //Lookup a puller image given a puller instance and whether they are leaning or not.
    const getPullerImage = ( puller, leaning ) => {
      const pullerColor = ForcesAndMotionBasicsPreferences.pullerColorProperty.value;
      const type = puller.type;
      const size = puller.size;
      const colorSet = pullerColor === PullerColors.BLUE_AND_RED ? colorMapping.blueRed : colorMapping.purpleOrange;

      // Map the type to the appropriate color based on the pullerColorProperty
      const mappedType = ( type === 'blue' && pullerColor === PullerColors.PURPLE_AND_ORANGE ) ? 'purple' :
                         ( type === 'red' && pullerColor === PullerColors.PURPLE_AND_ORANGE ) ? 'orange' : type;

      return colorSet[ mappedType ][ size ][ leaning ? 'leaning' : 'notLeaning' ] || null;
    };

    // get the associated toolbox for the puller
    const getPullerToolbox = puller => puller.type === 'red' ? rightToolbox : leftToolbox;

    const leftPullerLayer = new Node( {
      tandem: tandem.createTandem( 'leftPullerLayer' )
    } );
    const rightPullerLayer = new Node( {
      tandem: tandem.createTandem( 'rightPullerLayer' )
    } );
    this.pullerNodes = [];

    this.model.pullers.forEach( puller => {
      const pullerNode = new PullerNode( puller, this.model,
        getPullerImage( puller, false ),
        getPullerImage( puller, true ),
        getPullerToolbox( puller ),
        tandem.createTandem( puller.pullerTandem.name )
      );
      const pullerLayer = pullerNode.puller.type === 'blue' ? leftPullerLayer : rightPullerLayer;
      pullerLayer.addChild( pullerNode );
      this.pullerNodes.push( pullerNode );
    } );

    ForcesAndMotionBasicsPreferences.pullerColorProperty.link( () => {
      this.pullerNodes.forEach( pullerNode => {
        pullerNode.standImage = getPullerImage( pullerNode.puller, false );
        pullerNode.pullImage = getPullerImage( pullerNode.puller, true );
        pullerNode.updateImage( pullerNode.puller, model );
        pullerNode.updatePosition( pullerNode.puller, model );
      } );
    } );

    leftToolbox.addChild( leftPullerLayer );
    rightToolbox.addChild( rightPullerLayer );

    //Add the go button, but only if there is a puller attached
    // i18n - ensure that the go, pause, and return buttons will fit in between the puller toolboxes
    const maxWidth = ( rightToolbox.left - leftToolbox.right ) / 2;
    const goPauseButton = new GoPauseButton( this.model, this.layoutBounds.width, tandem.createTandem( 'goPauseButton' ), {
      maxWidth: maxWidth,
      tandem: tandem.createTandem( 'goPauseButton' )
    } );
    this.addChild( goPauseButton );

    //Return button
    this.addChild( new ReturnButton( model, tandem.createTandem( 'returnButton' ), {
      centerX: this.layoutBounds.centerX,
      top: goPauseButton.bottom + MARGIN_FROM_LAYOUT_BOUNDS,
      maxWidth: maxWidth
    } ) );

    // Add the arrow nodes after the pullers so they will appear in the front in z-ordering
    this.addChild( this.leftArrow );
    this.addChild( this.rightArrow );
    this.addChild( this.sumArrow );

    // Show the control panel
    this.controlPanel = new NetForceControlPanel( this.model, tandem.createTandem( 'controlPanel' ) ).mutate( {
      right: this.layoutBounds.width - MARGIN_FROM_LAYOUT_BOUNDS,
      top: MARGIN_FROM_LAYOUT_BOUNDS
    } );
    this.addChild( this.controlPanel );

    let lastFlagNode = null;

    // Show the flag node when pulling is complete
    Multilink.multilink( [ model.stateProperty, model.cart.xProperty ], ( state, x ) => {
      lastFlagNode && lastFlagNode.dispose();
      lastFlagNode = null;
      if ( state === 'completed' && Math.abs( x ) > 1E-6 ) {
        lastFlagNode = new FlagNode( model, this.layoutBounds.width / 2, 8, tandem.createTandem( 'flagNode' ) );
        this.addChild( lastFlagNode );
      }
    } );

    const golfClap = new Sound( golfClap_mp3 );

    //Play audio golf clap when game completed
    model.stateProperty.link( state => {
      if ( state === 'completed' && model.volumeOnProperty.get() ) {
        golfClap.play();
      }
    } );

    //Show 'Sum of Forces = 0' when showForces is selected but the force is zero
    this.sumOfForcesText = new Text( ForcesAndMotionBasicsStrings.sumOfForcesEqualsZeroStringProperty, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      bottom: SUM_ARROW_TAIL_Y - ReadoutArrow.ARROW_HEAD_WIDTH / 2,
      maxWidth: 280,
      tandem: tandem.createTandem( 'sumOfForcesText' )
    } );
    ForcesAndMotionBasicsStrings.sumOfForcesEqualsZeroStringProperty.link( () => {
      this.sumOfForcesText.centerX = width / 2;
    } );

    Multilink.multilink( [ model.netForceProperty, model.showSumOfForcesProperty ], ( netForce, showSumOfForces ) => { this.sumOfForcesText.visible = !netForce && showSumOfForces; } );
    this.addChild( this.sumOfForcesText );

    cursorPathNode.visible = false;
    this.addChild( cursorPathNode );
  }
}

forcesAndMotionBasics.register( 'NetForceScreenView', NetForceScreenView );
export default NetForceScreenView;