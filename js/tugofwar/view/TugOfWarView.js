// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main class for the entire view of the Tug of War model, including cart, pullers, background, controls & audio sounds (when tug of war game complete).
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var PullerNode = require( 'FORCES_AND_MOTION_BASICS/tugofwar/view/PullerNode' );
  var Shape = require( 'KITE/Shape' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var KnotHighlightNode = require( 'FORCES_AND_MOTION_BASICS/tugofwar/view/KnotHighlightNode' );
  var GoPauseButton = require( 'FORCES_AND_MOTION_BASICS/tugofwar/view/GoPauseButton' );
  var ReturnButton = require( 'FORCES_AND_MOTION_BASICS/tugofwar/view/ReturnButton' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var FlagNode = require( 'FORCES_AND_MOTION_BASICS/tugofwar/view/FlagNode' );
  var TugOfWarControlPanel = require( 'FORCES_AND_MOTION_BASICS/tugofwar/view/TugOfWarControlPanel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var platform = require( 'PHET_CORE/platform' );
  var grassImage = require( 'image!FORCES_AND_MOTION_BASICS/../images/grass.png' );
  var ropeImage = require( 'image!FORCES_AND_MOTION_BASICS/../images/rope.png' );
  var cartImage = require( 'image!FORCES_AND_MOTION_BASICS/../images/cart.png' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var ReadoutArrow = require( 'FORCES_AND_MOTION_BASICS/common/view/ReadoutArrow' );
  var Property = require( 'AXON/Property' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Strings = require( 'FORCES_AND_MOTION_BASICS/forces-and-motion-basics-strings' );
  var Sound = require( 'VIBE/Sound' );
  var pullFigureBlue0Image = require( 'image!FORCES_AND_MOTION_BASICS/../images/pull_figure_BLUE_0.png' );
  var pullFigureBlue3Image = require( 'image!FORCES_AND_MOTION_BASICS/../images/pull_figure_BLUE_3.png' );
  var pullFigureLargeBlue0Image = require( 'image!FORCES_AND_MOTION_BASICS/../images/pull_figure_lrg_BLUE_0.png' );
  var pullFigureLargeBlue3Image = require( 'image!FORCES_AND_MOTION_BASICS/../images/pull_figure_lrg_BLUE_3.png' );
  var pullFigureSmallBlue0Image = require( 'image!FORCES_AND_MOTION_BASICS/../images/pull_figure_small_BLUE_0.png' );
  var pullFigureSmallBlue3Image = require( 'image!FORCES_AND_MOTION_BASICS/../images/pull_figure_small_BLUE_3.png' );
  var pullFigureRed0Image = require( 'image!FORCES_AND_MOTION_BASICS/../images/pull_figure_RED_0.png' );
  var pullFigureRed3Image = require( 'image!FORCES_AND_MOTION_BASICS/../images/pull_figure_RED_3.png' );
  var pullFigureLargeRed0Image = require( 'image!FORCES_AND_MOTION_BASICS/../images/pull_figure_lrg_RED_0.png' );
  var pullFigureLargeRed3Image = require( 'image!FORCES_AND_MOTION_BASICS/../images/pull_figure_lrg_RED_3.png' );
  var pullFigureSmallRed0Image = require( 'image!FORCES_AND_MOTION_BASICS/../images/pull_figure_small_RED_0.png' );
  var pullFigureSmallRed3Image = require( 'image!FORCES_AND_MOTION_BASICS/../images/pull_figure_small_RED_3.png' );

  /**
   * @param {TugOfWarModel} model
   * @constructor
   */
  function TugOfWarView( model ) {

    //Fit to the window and render the initial scene
    var width = this.layoutBounds.width;
    var height = this.layoutBounds.height;

    var tugOfWarView = this;
    this.model = model;
    ScreenView.call( this );

    //Create the sky and ground.  Allow the sky and ground to go off the screen in case the window is larger than the sim aspect ratio
    var skyHeight = 376;
    var grassY = 368;
    var groundHeight = height - skyHeight;
    this.addChild( new Rectangle( -width, -skyHeight, width * 3, skyHeight * 2, {fill: new LinearGradient( 0, 0, 0, skyHeight ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' )} ) );
    this.addChild( new Rectangle( -width, skyHeight, width * 3, groundHeight * 2, { fill: '#c59a5b'} ) );

    //Show the grass.
    this.addChild( new Image( grassImage, {x: 13, y: grassY} ) );
    this.addChild( new Image( grassImage, {x: 13 - grassImage.width, y: grassY} ) );
    this.addChild( new Image( grassImage, {x: 13 + grassImage.width, y: grassY} ) );

    this.cartNode = new Image( cartImage, {y: 221} );

    //Black caret below the cart
    this.addChild( new Path( new Shape().moveTo( -10, 10 ).lineTo( 0, 0 ).lineTo( 10, 10 ), { stroke: '#000000', lineWidth: 3, x: this.layoutBounds.width / 2, y: grassY + 10} ) );

    //Add toolbox backgrounds for the pullers
    var toolboxHeight = 216;
    this.addChild( new Rectangle( 25, this.layoutBounds.height - toolboxHeight - 4, 324, toolboxHeight, 10, 10, {fill: '#e7e8e9', stroke: '#000000', lineWidth: 1} ) );
    this.addChild( new Rectangle( 630, this.layoutBounds.height - toolboxHeight - 4, 324, toolboxHeight, 10, 10, { fill: '#e7e8e9', stroke: '#000000', lineWidth: 1} ) );

    //Split into another canvas to speed up rendering
    this.addChild( new Node( {layerSplit: true} ) );

    //Create the arrow nodes
    var opacity = 0.8;
    this.sumArrow = new ReadoutArrow( Strings.sumOfForces, '#7dc673', this.layoutBounds.width / 2, 100, this.model.netForceProperty, this.model.showValuesProperty, {lineDash: [ 10, 5 ], labelPosition: 'top', opacity: opacity} );
    this.leftArrow = new ReadoutArrow( Strings.leftForce, '#bf8b63', this.layoutBounds.width / 2, 200, this.model.leftForceProperty, this.model.showValuesProperty, {lineDash: [ 10, 5], labelPosition: 'side', opacity: opacity} );
    this.rightArrow = new ReadoutArrow( Strings.rightForce, '#bf8b63', this.layoutBounds.width / 2, 200, this.model.rightForceProperty, this.model.showValuesProperty, {lineDash: [ 10, 5], labelPosition: 'side', opacity: opacity} );

    //Arrows should be dotted when the sim is paused, but solid after pressing 'go'
    this.model.runningProperty.link( function( running ) {
      [tugOfWarView.sumArrow, tugOfWarView.leftArrow, tugOfWarView.rightArrow].forEach( function( arrow ) {
        arrow.setArrowDash( running ? null : [ 10, 5 ] );
      } );
    } );

    this.model.showSumOfForcesProperty.linkAttribute( this.sumArrow, 'visible' );

    this.ropeNode = new Image( ropeImage, {x: 51, y: 273 } );

    model.knots.forEach( function( knot ) { tugOfWarView.addChild( new KnotHighlightNode( knot ) ); } );

    this.addChild( this.ropeNode );

    this.model.cart.xProperty.link( function( x ) {
      tugOfWarView.cartNode.x = x + 412;
      tugOfWarView.ropeNode.x = x + 51;
    } );

    this.addChild( this.cartNode );

    //Add the go button, but only if there is a puller attached
    var goPauseButtonContainer = new Node();
    var goPauseButton = new GoPauseButton( this.model, this.layoutBounds.width );
    this.addChild( goPauseButtonContainer );
    var update = function() {
      goPauseButtonContainer.children = model.numberPullersAttached > 0 && model.state !== 'completed' ? [goPauseButton] : [];
    };
    model.runningProperty.link( update );
    model.numberPullersAttachedProperty.link( update );

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
    this.model.pullers.forEach( function( puller ) {
      pullerLayer.addChild( new PullerNode( puller, tugOfWarView.model, getPullerImage( puller, false ), getPullerImage( puller, true ) ) );
    } );

    //Add the arrow nodes after the pullers so they will appear in the front in z-ordering
    this.addChild( this.leftArrow );
    this.addChild( this.rightArrow );
    this.addChild( this.sumArrow );

    //Show the control panel
    this.addChild( new TugOfWarControlPanel( this.model ).mutate( {right: 981 - 5, top: 5} ) );

    //Show the flag node when pulling is complete
    var showFlagNode = function() { tugOfWarView.addChild( new FlagNode( model, tugOfWarView.layoutBounds.width / 2, 10 ) ); };
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


    //On iOS, we must play an audio file from a thread initiated by a user event such as touchstart.
    //This is impossible with scenery, since all scenery events are batched and dispatched from animation
    //Also, there was a quirky bug where the 1st event wasn't getting invoked here, so wait for the 2nd one
    //then play a blank audio file. This will enable audio for the rest of the app (whether from
    //user event or not).
    //See http://stackoverflow.com/questions/12517000/no-sound-on-ios-6-web-audio-api
    //Note: right now this requires the user to touch the screen at least twice before audio can be played
    var golfClap = new Sound( 'audio/golf-clap.mp3' );

    //Play audio golf clap when game completed
    model.stateProperty.link( function( state ) {
      if ( state === 'completed' && model.volumeOn ) {
        golfClap.play();
      }
    } );

    //Show 'Sum of Forces = 0' when showForces is selected but the force is zero
    this.sumOfForcesText = new Text( Strings.sumOfForcesEqualsZero, {font: new PhetFont( { size: 16, weight: 'bold' } ), centerX: width / 2, y: 53} );
    model.multilink( ['netForce', 'showSumOfForces'], function( netForce, showSumOfForces ) {tugOfWarView.sumOfForcesText.visible = !netForce && showSumOfForces;} );
    this.addChild( this.sumOfForcesText );
  }

  return inherit( ScreenView, TugOfWarView,

    //The aspect ratio that this sim was coded for differs by 7% than the one we eventually decided upon.
    //aspect ratio of this screen: 981/604=1.62
    //aspect ratio for default: 768/504=1.52
    //TODO: Rewrite the sim layout to use the standard bounds (lower priority)
    { layoutBounds: new Bounds2( 0, 0, 981, 604 ) } );
} );
