// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main class for the entire view of the Net Force model, including cart, pullers, background, controls & audio sounds (when Net Force game complete).
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var PullerNode = require( 'FORCES_AND_MOTION_BASICS/netforce/view/PullerNode' );
  var Shape = require( 'KITE/Shape' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var KnotHighlightNode = require( 'FORCES_AND_MOTION_BASICS/netforce/view/KnotHighlightNode' );
  var GoPauseButton = require( 'FORCES_AND_MOTION_BASICS/netforce/view/GoPauseButton' );
  var ReturnButton = require( 'FORCES_AND_MOTION_BASICS/netforce/view/ReturnButton' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var FlagNode = require( 'FORCES_AND_MOTION_BASICS/netforce/view/FlagNode' );
  var NetForceControlPanel = require( 'FORCES_AND_MOTION_BASICS/netforce/view/NetForceControlPanel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var ReadoutArrow = require( 'FORCES_AND_MOTION_BASICS/common/view/ReadoutArrow' );
  var Property = require( 'AXON/Property' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var sumOfForcesEqualsZeroString = require( 'string!FORCES_AND_MOTION_BASICS/sumOfForcesEqualsZero' );
  var Sound = require( 'VIBE/Sound' );
  var Sim = require( 'JOIST/Sim' );

  // images
  var grassImage = require( 'image!FORCES_AND_MOTION_BASICS/grass.png' );
  var ropeImage = require( 'image!FORCES_AND_MOTION_BASICS/rope.png' );
  var cartImage = require( 'image!FORCES_AND_MOTION_BASICS/cart.png' );
  var pullFigureBlue0Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_BLUE_0.png' );
  var pullFigureBlue3Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_BLUE_3.png' );
  var pullFigureLargeBlue0Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_lrg_BLUE_0.png' );
  var pullFigureLargeBlue3Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_lrg_BLUE_3.png' );
  var pullFigureSmallBlue0Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_small_BLUE_0.png' );
  var pullFigureSmallBlue3Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_small_BLUE_3.png' );
  var pullFigureRed0Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_RED_0.png' );
  var pullFigureRed3Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_RED_3.png' );
  var pullFigureLargeRed0Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_lrg_RED_0.png' );
  var pullFigureLargeRed3Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_lrg_RED_3.png' );
  var pullFigureSmallRed0Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_small_RED_0.png' );
  var pullFigureSmallRed3Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_small_RED_3.png' );

  // strings
  var sumOfForcesString = require( 'string!FORCES_AND_MOTION_BASICS/sumOfForces' );
  var leftForceString = require( 'string!FORCES_AND_MOTION_BASICS/leftForce' );
  var rightForceString = require( 'string!FORCES_AND_MOTION_BASICS/rightForce' );

  // audio
  var golfClapSound = require( 'audio!FORCES_AND_MOTION_BASICS/golf-clap' );

  //The aspect ratio that this sim was coded for differs by 7% than the one we eventually decided upon.
  //aspect ratio of this screen: 981/604=1.62
  //aspect ratio for default: 768/504=1.52
  //TODO: Rewrite the sim layout to use the standard bounds (lower priority)
  var LAYOUT_BOUNDS = new Bounds2( 0, 0, 981, 604 );

  /**
   * @param {NetForceModel} model
   * @constructor
   */
  function NetForceScreenView( model ) {
    var netForceScreenView = this;

    ScreenView.call( this, {renderer: Sim.joistRenderer, layoutBounds: LAYOUT_BOUNDS} );

    //Fit to the window and render the initial scene
    var width = this.layoutBounds.width;
    var height = this.layoutBounds.height;

    var NetForceScreenView = this;
    this.model = model;

    //Create the sky and ground.  Allow the sky and ground to go off the screen in case the window is larger than the sim aspect ratio
    var skyHeight = 376;
    var grassY = 368;
    var groundHeight = height - skyHeight;
    this.addChild( new Rectangle( -width, -skyHeight, width * 3, skyHeight * 2, {fill: new LinearGradient( 0, 0, 0, skyHeight ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' )} ) );
    this.addChild( new Rectangle( -width, skyHeight, width * 3, groundHeight * 3, { fill: '#c59a5b'} ) );

    //Show the grass.
    this.addChild( new Image( grassImage, {x: 13, y: grassY} ) );
    this.addChild( new Image( grassImage, {x: 13 - grassImage.width, y: grassY} ) );
    this.addChild( new Image( grassImage, {x: 13 + grassImage.width, y: grassY} ) );

    this.cartNode = new Image( cartImage, {y: 221} );

    //Black caret below the cart
    this.addChild( new Path( new Shape().moveTo( -10, 10 ).lineTo( 0, 0 ).lineTo( 10, 10 ), { stroke: '#000000', lineWidth: 3, x: this.layoutBounds.width / 2, y: grassY + 10} ) );

    //Add toolbox backgrounds for the pullers
    var createToolbox = function( x ) {
      var toolboxHeight = 216;
      var toolboxOptions = {
        fill: '#e7e8e9',
        stroke: 'black',
        lineWidth: 1
      };
      var toolboxY = netForceScreenView.layoutBounds.height - toolboxHeight - 4;
      var toolboxWidth = 324;
      var toolboxArcWidth = 10;
      return new Rectangle( x, toolboxY, toolboxWidth, toolboxHeight, toolboxArcWidth, toolboxArcWidth, toolboxOptions );
    };
    var leftToolbox = createToolbox( 25 );
    var rightToolbox = createToolbox( 630 );
    this.addChild( leftToolbox );
    this.addChild( rightToolbox );

    //Split into another canvas to speed up rendering
    this.addChild( new Node( {layerSplit: true} ) );

    //Create the arrow nodes
    var opacity = 0.8;
    this.sumArrow = new ReadoutArrow( sumOfForcesString, '#7dc673', this.layoutBounds.width / 2, 100, this.model.netForceProperty, this.model.showValuesProperty, {lineDash: [ 10, 5 ], labelPosition: 'top', opacity: opacity} );
    this.leftArrow = new ReadoutArrow( leftForceString, '#bf8b63', this.layoutBounds.width / 2, 200, this.model.leftForceProperty, this.model.showValuesProperty, {lineDash: [ 10, 5], labelPosition: 'side', opacity: opacity} );
    this.rightArrow = new ReadoutArrow( rightForceString, '#bf8b63', this.layoutBounds.width / 2, 200, this.model.rightForceProperty, this.model.showValuesProperty, {lineDash: [ 10, 5], labelPosition: 'side', opacity: opacity} );

    //Arrows should be dotted when the sim is paused, but solid after pressing 'go'
    this.model.runningProperty.link( function( running ) {
      [NetForceScreenView.sumArrow, NetForceScreenView.leftArrow, NetForceScreenView.rightArrow].forEach( function( arrow ) {
        arrow.setArrowDash( running ? null : [ 10, 5 ] );
      } );
    } );

    this.model.showSumOfForcesProperty.linkAttribute( this.sumArrow, 'visible' );

    this.ropeNode = new Image( ropeImage, {x: 51, y: 273 } );

    model.knots.forEach( function( knot ) { NetForceScreenView.addChild( new KnotHighlightNode( knot ) ); } );

    this.addChild( this.ropeNode );

    this.model.cart.xProperty.link( function( x ) {
      NetForceScreenView.cartNode.x = x + 412;
      NetForceScreenView.ropeNode.x = x + 51;
    } );

    this.addChild( this.cartNode );

    //Add the go button, but only if there is a puller attached
    var goPauseButton = new GoPauseButton( this.model, this.layoutBounds.width );
    var goPauseButtonContainer = new Node( {children: [goPauseButton]} );
    this.addChild( goPauseButtonContainer );

    //Return button
    this.addChild( new ReturnButton( model, {centerX: this.layoutBounds.centerX, top: goPauseButton.bottom + 5} ) );

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

    var pullerLayer = new Node();
    this.addChild( pullerLayer );
    var pullerTabIndex = 1;
    this.model.pullers.forEach( function( puller ) {
      pullerLayer.addChild( new PullerNode( puller, NetForceScreenView.model, getPullerImage( puller, false ), getPullerImage( puller, true ), {
        tabIndex: pullerTabIndex++
      } ) );
    } );

    //Add the arrow nodes after the pullers so they will appear in the front in z-ordering
    this.addChild( this.leftArrow );
    this.addChild( this.rightArrow );
    this.addChild( this.sumArrow );

    //Show the control panel
    this.addChild( new NetForceControlPanel( this.model ).mutate( {right: 981 - 5, top: 5} ) );

    //Show the flag node when pulling is complete
    var showFlagNode = function() { NetForceScreenView.addChild( new FlagNode( model, NetForceScreenView.layoutBounds.width / 2, 10 ) ); };
    model.stateProperty.link( function( state ) { if ( state === 'completed' ) { showFlagNode(); } } );

    //Accessibility for reading out the total force
    var textProperty = new Property( '' );
    model.numberPullersAttachedProperty.link( function() {
      textProperty.value = 'Left force: ' + Math.abs( model.getLeftForce() ) + ' Newtons, ' +
                           'Right force: ' + Math.abs( model.getRightForce() ) + ' Newtons, ' +
                           'Net Force: ' + Math.abs( model.getNetForce() ) + ' Newtons ' +
                           (model.getNetForce() === 0 ? '' : model.getNetForce() > 0 ? 'to the right' : 'to the left');
    } );
    this.addLiveRegion( textProperty );

    var golfClap = new Sound( golfClapSound );

    //Play audio golf clap when game completed
    model.stateProperty.link( function( state ) {
      if ( state === 'completed' && model.volumeOn ) {
        golfClap.play();
      }
    } );

    //Show 'Sum of Forces = 0' when showForces is selected but the force is zero
    this.sumOfForcesText = new Text( sumOfForcesEqualsZeroString, {font: new PhetFont( { size: 16, weight: 'bold' } ), centerX: width / 2, y: 53} );
    model.multilink( ['netForce', 'showSumOfForces'], function( netForce, showSumOfForces ) {NetForceScreenView.sumOfForcesText.visible = !netForce && showSumOfForces;} );
    this.addChild( this.sumOfForcesText );
  }

  return inherit( ScreenView, NetForceScreenView );
} );
