// Copyright 2013-2017, University of Colorado Boulder

/**
 * Main class for the entire view of the Net Force model, including cart, pullers, background, controls & audio sounds (when Net Force game complete).
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var CartNode = require( 'FORCES_AND_MOTION_BASICS/netforce/view/CartNode' );
  var CartStopperNode = require( 'FORCES_AND_MOTION_BASICS/netforce/view/CartStopperNode' );
  var FlagNode = require( 'FORCES_AND_MOTION_BASICS/netforce/view/FlagNode' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var ForcesAndMotionBasicsLayoutBounds = require( 'FORCES_AND_MOTION_BASICS/common/view/ForcesAndMotionBasicsLayoutBounds' );
  var GoPauseButton = require( 'FORCES_AND_MOTION_BASICS/netforce/view/GoPauseButton' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var KnotFocusRegion = require( 'FORCES_AND_MOTION_BASICS/netforce/view/KnotFocusRegion' );
  var KnotHighlightNode = require( 'FORCES_AND_MOTION_BASICS/netforce/view/KnotHighlightNode' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var NetForceControlPanel = require( 'FORCES_AND_MOTION_BASICS/netforce/view/NetForceControlPanel' );
  var NetForceModel = require( 'FORCES_AND_MOTION_BASICS/netforce/model/NetForceModel' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var PullerNode = require( 'FORCES_AND_MOTION_BASICS/netforce/view/PullerNode' );
  var PullerToolboxNode = require( 'FORCES_AND_MOTION_BASICS/netforce/view/PullerToolboxNode' );
  var ReadoutArrow = require( 'FORCES_AND_MOTION_BASICS/common/view/ReadoutArrow' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ReturnButton = require( 'FORCES_AND_MOTION_BASICS/netforce/view/ReturnButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Shape = require( 'KITE/Shape' );
  var Sound = require( 'VIBE/Sound' );
  var sumOfForcesEqualsZeroString = require( 'string!FORCES_AND_MOTION_BASICS/sumOfForcesEqualsZero' );
  var Text = require( 'SCENERY/nodes/Text' );

  // phet-io modules
  var TString = require( 'ifphetio!PHET_IO/types/TString' );

  // images
  var grassImage = require( 'image!FORCES_AND_MOTION_BASICS/grass.png' );
  var pullFigureBlue0Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_BLUE_0.png' );
  var pullFigureBlue3Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_BLUE_3.png' );
  var pullFigureLargeBlue0Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_lrg_BLUE_0.png' );
  var pullFigureLargeBlue3Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_lrg_BLUE_3.png' );
  var pullFigureLargeRed0Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_lrg_RED_0.png' );
  var pullFigureLargeRed3Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_lrg_RED_3.png' );
  var pullFigureRed0Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_RED_0.png' );
  var pullFigureRed3Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_RED_3.png' );
  var pullFigureSmallBlue0Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_small_BLUE_0.png' );
  var pullFigureSmallBlue3Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_small_BLUE_3.png' );
  var pullFigureSmallRed0Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_small_RED_0.png' );
  var pullFigureSmallRed3Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_small_RED_3.png' );
  var ropeImage = require( 'image!FORCES_AND_MOTION_BASICS/rope.png' );

  // strings
  var bluePullerGroupDescriptionString = require( 'string!FORCES_AND_MOTION_BASICS/bluePullerGroup.description' );
  var groupString = require( 'string!FORCES_AND_MOTION_BASICS/group' );
  var leftForceString = require( 'string!FORCES_AND_MOTION_BASICS/leftForce' );
  var leftString = require( 'string!FORCES_AND_MOTION_BASICS/left' );
  var netForceDescriptionString = require( 'string!FORCES_AND_MOTION_BASICS/netForce.description' );
  var pullerString = require( 'string!FORCES_AND_MOTION_BASICS/puller' );
  var redPullerGroupDescriptionString = require( 'string!FORCES_AND_MOTION_BASICS/redPullerGroup.description' );
  var rightForceString = require( 'string!FORCES_AND_MOTION_BASICS/rightForce' );
  var rightString = require( 'string!FORCES_AND_MOTION_BASICS/right' );
  var sumOfForcesString = require( 'string!FORCES_AND_MOTION_BASICS/sumOfForces' );

  // audio
  var golfClapSound = require( 'audio!FORCES_AND_MOTION_BASICS/golf-clap' );

  // constants
  var STOPPER_TOP_WIDTH = 11;
  var STOPPER_BOTTOM_WIDTH = 30;
  var STOPPER_HEIGHT = 24;
  var SUM_ARROW_TAIL_Y = 127;

  /**
   * @param {NetForceModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function NetForceScreenView( model, tandem ) {
    var self = this;

    ScreenView.call( this, {
      layoutBounds: ForcesAndMotionBasicsLayoutBounds,
      screenDescription: netForceDescriptionString,
      tandem: tandem
    } );

    //Fit to the window and render the initial scene
    var width = this.layoutBounds.width;
    var height = this.layoutBounds.height;

    this.model = model;

    //Create the sky and ground.  Allow the sky and ground to go off the screen in case the window is larger than the sim aspect ratio
    var skyHeight = 376;
    var grassY = 368;
    var groundHeight = height - skyHeight;
    this.addChild( new Rectangle( -width, -skyHeight, width * 3, skyHeight * 2, {
      fill: new LinearGradient( 0, 0, 0, skyHeight ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' )
    } ) );
    this.addChild( new Rectangle( -width, skyHeight, width * 3, groundHeight * 3, {
      fill: '#c59a5b'
    } ) );

    //Show the grass.
    this.addChild( new Image( grassImage, {
      tandem: tandem.createTandem( 'grassImage1' ),
      x: 13,
      y: grassY
    } ) );
    this.addChild( new Image( grassImage, {
      tandem: tandem.createTandem( 'grassImage2' ),
      x: 13 - grassImage.width,
      y: grassY
    } ) );
    this.addChild( new Image( grassImage, {
      tandem: tandem.createTandem( 'grassImage3' ),
      x: 13 + grassImage.width,
      y: grassY
    } ) );

    this.cartNode = new CartNode( model.cart, model.speedProperty, model.showSpeedProperty, tandem.createTandem( 'cartNode' ) );

    //Black caret below the cart
    var layoutCenterX = this.layoutBounds.width / 2;
    this.addChild( new Path( new Shape().moveTo( -10, 10 ).lineTo( 0, 0 ).lineTo( 10, 10 ), {
      stroke: '#000000',
      lineWidth: 3,
      x: layoutCenterX,
      y: grassY + 10,
      tandem: tandem.createTandem( 'caretPathNode' )
    } ) );

    var cursorWidth = 18;

    var cursorPathNode = new Path( new Shape().moveTo( 0, 0 ).lineTo( cursorWidth, 0 ).lineTo( cursorWidth / 2, cursorWidth / 10 * 8 ).close(), {
      fill: 'blue',
      stroke: 'black',
      lineWidth: 1,
      tandem: tandem.createTandem( 'cursorPathNode' )
    } );

    // cart stoppers that seem to stop cart motion
    var stopperY = grassY + 5; // a little lower than the grass because the grass includes some sky blue
    var rightStopper = new CartStopperNode( STOPPER_TOP_WIDTH, STOPPER_BOTTOM_WIDTH, STOPPER_HEIGHT, tandem.createTandem( 'rightStopper' ), {
      left: layoutCenterX + NetForceModel.GAME_LENGTH,
      y: stopperY
    } );
    var leftStopper = new CartStopperNode( STOPPER_TOP_WIDTH, STOPPER_BOTTOM_WIDTH, STOPPER_HEIGHT, tandem.createTandem( 'leftStopper' ), {
      direction: 'right',
      right: layoutCenterX - NetForceModel.GAME_LENGTH,
      y: stopperY
    } );
    this.addChild( rightStopper );
    this.addChild( leftStopper );

    // create and add the rope node as an image
    this.ropeNode = new Image( ropeImage, {
      tandem: tandem.createTandem( 'ropeImageNode' ),
      x: 51,
      y: 273
    } );
    this.addChild( this.ropeNode );

    // create the toolboxes that hold the puller children
    var leftToolbox = new PullerToolboxNode( model, this, 25, 'left', 0, 0, 3, 'blue', bluePullerGroupDescriptionString );
    var rightToolbox = new PullerToolboxNode( model, this, 630, 'right', model.pullers.length - 1, 4, model.pullers.length - 1, 'red', redPullerGroupDescriptionString );
    this.addChild( leftToolbox );
    this.addChild( rightToolbox );

    var ropeHeightOffset = 215;

    // region which holds the left knots for drag and drop
    var leftFocusRegion = new KnotFocusRegion( model, leftToolbox, ropeHeightOffset, 'left' );
    this.addChild( leftFocusRegion );

    // region which holds the right knots for drag and drop
    var rightFocusRegion = new KnotFocusRegion( model, rightToolbox, ropeHeightOffset, 'right' );
    this.addChild( rightFocusRegion );

    //Split into another canvas to speed up rendering
    this.addChild( new Node( {
      tandem: tandem.createTandem( 'frontLayer' ),
      layerSplit: true
    } ) );

    //Create the arrow nodes
    var opacity = 0.8;
    this.sumArrow = new ReadoutArrow( sumOfForcesString, '#7dc673', layoutCenterX, SUM_ARROW_TAIL_Y, this.model.netForceProperty, this.model.showValuesProperty,
      tandem.createTandem( 'sumArrow' ), {
        lineDash: [ 10, 5 ], labelPosition: 'top', opacity: opacity
      } );
    this.leftArrow = new ReadoutArrow( leftForceString, '#bf8b63', layoutCenterX, 200, this.model.leftForceProperty, this.model.showValuesProperty,
      tandem.createTandem( 'leftArrow' ), {
        lineDash: [ 10, 5 ], labelPosition: 'side', opacity: opacity
      } );
    this.rightArrow = new ReadoutArrow( rightForceString, '#bf8b63', layoutCenterX, 200, this.model.rightForceProperty, this.model.showValuesProperty,
      tandem.createTandem( 'rightArrow' ), {
        lineDash: [ 10, 5 ], labelPosition: 'side', opacity: opacity
      } );

    //Arrows should be dotted when the sim is paused, but solid after pressing 'go'
    this.model.runningProperty.link( function( running ) {
      [ self.sumArrow, self.leftArrow, self.rightArrow ].forEach( function( arrow ) {
        arrow.setArrowDash( running ? [] : [ 10, 5 ] );
      } );
    } );

    this.model.showSumOfForcesProperty.linkAttribute( this.sumArrow, 'visible' );

    this.model.cart.xProperty.link( function( x ) {
      self.cartNode.x = x + 412;
      self.ropeNode.x = x + 51;
    } );

    this.addChild( this.cartNode );

    //Lookup a puller image given a puller instance and whether they are leaning or not.
    var getPullerImage = function( puller, leaning ) {
      var type = puller.type;
      var size = puller.size;

      //todo: compress with more ternary?
      return type === 'blue' && size === 'large' && !leaning ? pullFigureLargeBlue0Image :
             type === 'blue' && size === 'large' && leaning ? pullFigureLargeBlue3Image :
             type === 'blue' && size === 'medium' && !leaning ? pullFigureBlue0Image :
             type === 'blue' && size === 'medium' && leaning ? pullFigureBlue3Image :
             type === 'blue' && size === 'small' && !leaning ? pullFigureSmallBlue0Image :
             type === 'blue' && size === 'small' && leaning ? pullFigureSmallBlue3Image :
             type === 'red' && size === 'large' && !leaning ? pullFigureLargeRed0Image :
             type === 'red' && size === 'large' && leaning ? pullFigureLargeRed3Image :
             type === 'red' && size === 'medium' && !leaning ? pullFigureRed0Image :
             type === 'red' && size === 'medium' && leaning ? pullFigureRed3Image :
             type === 'red' && size === 'small' && !leaning ? pullFigureSmallRed0Image :
             type === 'red' && size === 'small' && leaning ? pullFigureSmallRed3Image :
             null;
    };

    // get the focus region for a given puller.
    var getKnotRegion = function( puller ) {
      return puller.type === 'red' ? rightFocusRegion : leftFocusRegion;
    };

    // get the associated toolbox for the puller
    var getPullerToolbox = function( puller ) {
      return puller.type === 'red' ? rightToolbox : leftToolbox;
    };

    var getAccessiblePullerDescription = function( puller ) {
      var type = puller.type;
      var size = puller.size;

      var sideDescription = type === 'blue' ? leftString : rightString;

      // create the accessible description for this puller.
      return sideDescription + ' ' + groupString + ' ' + size + ' ' + pullerString + ' ';
    };

    var leftPullerLayer = new Node( {
      tandem: tandem.createTandem( 'leftPullerLayer' )
    } );
    var rightPullerLayer = new Node( {
      tandem: tandem.createTandem( 'rightPullerLayer' )
    } );
    this.pullerNodes = [];

    this.model.pullers.forEach( function( puller ) {
      var pullerNode = new PullerNode( puller, self.model,
        getPullerImage( puller, false ),
        getPullerImage( puller, true ),
        getKnotRegion( puller ),
        getPullerToolbox( puller ),
        getAccessiblePullerDescription( puller ),
        tandem.createTandem( puller.tandem.tail )
      );
      var pullerLayer = pullerNode.puller.type === 'blue' ? leftPullerLayer : rightPullerLayer;
      pullerLayer.addChild( pullerNode );
      self.pullerNodes.push( pullerNode );
    } );

    model.knots.forEach( function( knot, i ) {
      if ( knot.type === 'blue' ) {
        leftFocusRegion.addChild( new KnotHighlightNode( knot, leftPullerLayer.children, leftFocusRegion, leftToolbox, model, tandem.createTandem( 'blueHighlightNode' + i ) ) );
      }
      else if ( knot.type === 'red' ) {
        rightFocusRegion.addChild( new KnotHighlightNode( knot, rightPullerLayer.children, rightFocusRegion, rightToolbox, model, tandem.createTandem( 'redHighlightNode' + i ) ) );
      }
      else {
        assert && assert( 'Knots can only be of type "red" or "blue" in this sim.' );
      }
    } );

    // add puller groups to the tool boxes for nesting hierarchy in parallel DOM.  Specify puller order here.
    leftToolbox.accessibleOrder = leftPullerLayer.children.sort( function( a, b ) {
      if ( a.bounds.height < b.bounds.height ) {
        return 1;
      }
      if ( a.bounds.height > b.bounds.height ) {
        return -1;
      }
      else {
        return 0;
      }
    } );
    rightToolbox.accessibleOrder = rightPullerLayer.children.sort( function( a, b ) {
      if ( a.bounds.height < b.bounds.height ) {
        return -1;
      }
      if ( a.bounds.height > b.bounds.height ) {
        return 1;
      }
      else {
        return 0;
      }
    } );
    leftToolbox.addChild( leftPullerLayer );
    rightToolbox.addChild( rightPullerLayer );

    //Add the go button, but only if there is a puller attached
    // i18n - ensure that the go, pause, and return buttons will fit in between the puller toolboxes
    var maxWidth = ( rightToolbox.left - leftToolbox.right ) / 2;
    var goPauseButton = new GoPauseButton( this.model, this.layoutBounds.width, tandem.createTandem( 'goPauseButton' ), {
      maxWidth: maxWidth,
      tandem: tandem.createTandem( 'goPauseButton' )
    } );
    this.addChild( goPauseButton );

    //Return button
    this.addChild( new ReturnButton( model, tandem.createTandem( 'returnButton' ), {
      centerX: this.layoutBounds.centerX,
      top: goPauseButton.bottom + 5,
      maxWidth: maxWidth
    } ) );

    // Add the arrow nodes after the pullers so they will appear in the front in z-ordering
    this.addChild( this.leftArrow );
    this.addChild( this.rightArrow );
    this.addChild( this.sumArrow );

    // Show the control panel
    this.controlPanel = new NetForceControlPanel( this.model, tandem.createTandem( 'controlPanel' ) ).mutate( {
      right: 981 - 5,
      top: 5
    } );
    this.addChild( this.controlPanel );

    var lastFlagNode = null;

    // Show the flag node when pulling is complete
    Property.multilink( [ model.stateProperty, model.cart.xProperty ], function( state, x ) {
      lastFlagNode && lastFlagNode.dispose();
      lastFlagNode = null;
      if ( state === 'completed' && Math.abs( x ) > 1E-6 ) {
        lastFlagNode = new FlagNode( model, self.layoutBounds.width / 2, 8, tandem.createTandem( 'flagNode' ) );
        self.addChild( lastFlagNode );
      }
    } );

    // Accessibility for reading out the total force
    var accessibleTextProperty = new Property( '', {
      tandem: tandem.createTandem( 'accessibleTextProperty' ),
      phetioValueType: TString
    } );
    model.numberPullersAttachedProperty.link( function() {
      accessibleTextProperty.value = 'Left force: ' + Math.abs( model.getLeftForce() ) + ' Newtons, ' +
                                     'Right force: ' + Math.abs( model.getRightForce() ) + ' Newtons, ' +
                                     'Net Force: ' + Math.abs( model.getNetForce() ) + ' Newtons ' +
                                     (model.getNetForce() === 0 ? '' : model.getNetForce() > 0 ? 'to the right' : 'to the left');
    } );

    var golfClap = new Sound( golfClapSound );

    //Play audio golf clap when game completed
    model.stateProperty.link( function( state ) {
      if ( state === 'completed' && model.volumeOnProperty.get() ) {
        golfClap.play();
      }
    } );

    //Show 'Sum of Forces = 0' when showForces is selected but the force is zero
    this.sumOfForcesText = new Text( sumOfForcesEqualsZeroString, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      centerX: width / 2,
      bottom: SUM_ARROW_TAIL_Y - ReadoutArrow.ARROW_HEAD_WIDTH / 2,
      maxWidth: 280,
      tandem: tandem.createTandem( 'sumOfForcesTextNode' )
    } );
    console.log( this.sumOfForcesText.width );

    Property.multilink( [ model.netForceProperty, model.showSumOfForcesProperty ], function( netForce, showSumOfForces ) { self.sumOfForcesText.visible = !netForce && showSumOfForces; } );
    this.addChild( this.sumOfForcesText );

    cursorPathNode.visible = false;
    this.addChild( cursorPathNode );
  }

  forcesAndMotionBasics.register( 'NetForceScreenView', NetForceScreenView );

  return inherit( ScreenView, NetForceScreenView );
} );
