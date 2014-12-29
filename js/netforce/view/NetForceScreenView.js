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
  var ForcesAndMotionBasicsLayoutBounds = require( 'FORCES_AND_MOTION_BASICS/common/view/ForcesAndMotionBasicsLayoutBounds' );
  var ReadoutArrow = require( 'FORCES_AND_MOTION_BASICS/common/view/ReadoutArrow' );
  var Property = require( 'AXON/Property' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var sumOfForcesEqualsZeroString = require( 'string!FORCES_AND_MOTION_BASICS/sumOfForcesEqualsZero' );
  var Sound = require( 'VIBE/Sound' );
  var Sim = require( 'JOIST/Sim' );
  var Display = require( 'SCENERY/display/Display' );
  var Input = require( 'SCENERY/input/Input' );
  var PullerToolboxNode = require( 'FORCES_AND_MOTION_BASICS/netforce/view/PullerToolboxNode' );

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

  /**
   * @param {NetForceModel} model
   * @constructor
   */
  function NetForceScreenView( model ) {
    var netForceScreenView = this;

    ScreenView.call( this, {renderer: Sim.joistRenderer, layoutBounds: ForcesAndMotionBasicsLayoutBounds} );

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
    this.addChild( new Image( grassImage, {x: 13, y: grassY} ) );
    this.addChild( new Image( grassImage, {x: 13 - grassImage.width, y: grassY} ) );
    this.addChild( new Image( grassImage, {x: 13 + grassImage.width, y: grassY} ) );

    this.cartNode = new Image( cartImage, {y: 221} );

    //Black caret below the cart
    var layoutCenterX = this.layoutBounds.width / 2;
    this.addChild( new Path( new Shape().moveTo( -10, 10 ).lineTo( 0, 0 ).lineTo( 10, 10 ), {
      stroke: '#000000', lineWidth: 3, x: layoutCenterX, y: grassY + 10
    } ) );

    var cursorWidth = 18;

    var cursor = new Path( new Shape().moveTo( 0, 0 ).lineTo( cursorWidth, 0 ).lineTo( cursorWidth / 2, cursorWidth / 10 * 8 ).close(), {fill: 'blue', stroke: 'black', lineWidth: 1} );

    var leftToolbox = new PullerToolboxNode( model, this, 25, 'left', 0, 0, 3, 'blue' );
    var rightToolbox = new PullerToolboxNode( model, this, 630, 'right', model.pullers.length - 1, 4, model.pullers.length - 1, 'red' );
    this.addChild( leftToolbox );
    this.addChild( rightToolbox );

    //Split into another canvas to speed up rendering
    this.addChild( new Node( {layerSplit: true} ) );

    //Create the arrow nodes
    var opacity = 0.8;
    this.sumArrow = new ReadoutArrow( sumOfForcesString, '#7dc673', layoutCenterX, 100, this.model.netForceProperty, this.model.showValuesProperty, {
      lineDash: [ 10, 5 ], labelPosition: 'top', opacity: opacity
    } );
    this.leftArrow = new ReadoutArrow( leftForceString, '#bf8b63', layoutCenterX, 200, this.model.leftForceProperty, this.model.showValuesProperty, {
      lineDash: [ 10, 5], labelPosition: 'side', opacity: opacity
    } );
    this.rightArrow = new ReadoutArrow( rightForceString, '#bf8b63', layoutCenterX, 200, this.model.rightForceProperty, this.model.showValuesProperty, {
      lineDash: [ 10, 5], labelPosition: 'side', opacity: opacity
    } );

    //Arrows should be dotted when the sim is paused, but solid after pressing 'go'
    this.model.runningProperty.link( function( running ) {
      [netForceScreenView.sumArrow, netForceScreenView.leftArrow, netForceScreenView.rightArrow].forEach( function( arrow ) {
        arrow.setArrowDash( running ? null : [ 10, 5 ] );
      } );
    } );

    this.model.showSumOfForcesProperty.linkAttribute( this.sumArrow, 'visible' );

    this.ropeNode = new Image( ropeImage, {x: 51, y: 273 } );

    model.knots.forEach( function( knot ) { netForceScreenView.addChild( new KnotHighlightNode( knot ) ); } );

    this.addChild( this.ropeNode );

    this.model.cart.xProperty.link( function( x ) {
      netForceScreenView.cartNode.x = x + 412;
      netForceScreenView.ropeNode.x = x + 51;
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
    this.pullerNodes = [];
    this.model.pullers.forEach( function( puller ) {
      var pullerNode = new PullerNode( puller, netForceScreenView.model, getPullerImage( puller, false ), getPullerImage( puller, true ), {
        tabIndex: pullerTabIndex++
      } );
      pullerLayer.addChild( pullerNode );
      netForceScreenView.pullerNodes.push( pullerNode );
    } );

    //Add the arrow nodes after the pullers so they will appear in the front in z-ordering
    this.addChild( this.leftArrow );
    this.addChild( this.rightArrow );
    this.addChild( this.sumArrow );

    //Show the control panel
    this.addChild( new NetForceControlPanel( this.model ).mutate( {right: 981 - 5, top: 5} ) );

    //Show the flag node when pulling is complete
    var showFlagNode = function() { netForceScreenView.addChild( new FlagNode( model, netForceScreenView.layoutBounds.width / 2, 10 ) ); };
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
    model.multilink( ['netForce', 'showSumOfForces'], function( netForce, showSumOfForces ) {netForceScreenView.sumOfForcesText.visible = !netForce && showSumOfForces;} );
    this.addChild( this.sumOfForcesText );

    cursor.visible = false;
    this.addChild( cursor );

    // Show highlight around the toolbox when a toolbox node is focused.
    Display.focusedInstanceProperty && Display.focusedInstanceProperty.link( function( focusedInstance ) {
      if ( focusedInstance ) {
        if ( focusedInstance.node instanceof PullerNode ) {
          if ( focusedInstance.node.puller.type === 'blue' ) {
            leftToolbox.highlighted = true;
            rightToolbox.highlighted = false;
          }
          else {
            leftToolbox.highlighted = false;
            rightToolbox.highlighted = true;
          }
        }
        else {
        }
      }
    } );

  }

  var inited = false;
  return inherit( ScreenView, NetForceScreenView, {
    step: function() {

      if ( !inited ) {
        console.log( 'getting all focusable instances' );
        Input.focusableInstances = Input.getAllFocusableInstances();
        console.log( 'done' );
        if ( Input.focusableInstances.length ) {
          inited = true;
        }
      }
    }
  } );
} );
