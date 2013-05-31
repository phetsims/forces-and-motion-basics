define( function( require ) {
  "use strict";
  var PullerNode = require( "tugofwar/view/PullerNode" );
  var Shape = require( 'KITE/Shape' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var arrow = require( 'tugofwar/view/arrow' );
  var KnotNode = require( 'tugofwar/view/KnotNode' );
  var GoPauseButton = require( 'tugofwar/view/GoPauseButton' );
  var ReturnButton = require( 'tugofwar/view/ReturnButton' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var FlagNode = require( 'tugofwar/view/FlagNode' );
  var TugOfWarControlPanel = require( 'tugofwar/view/TugOfWarControlPanel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var imageLoader = require( 'imageLoader' );
  var Layout = require( 'Layout' );
  var TabView = require( 'JOIST/TabView' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var ReadoutArrow = require( 'common/view/ReadoutArrow' );
  var Fort = require( 'FORT/Fort' );
  var property = require( 'FORT/property' );

  var red = "red",
      blue = "blue",
      small = "small",
      medium = "medium",
      large = "large";

  function TugOfWarTabView( model ) {

    //Fit to the window and render the initial scene
    var width = Layout.width;
    var height = Layout.height;

    var tugOfWarTabView = this;
    this.model = model;
    TabView.call( this );
    var getImage = imageLoader.getImage;

    function getPullerImage( puller, leaning ) {
      var type = puller.type;
      var size = puller.size;
      var sizeString = size === large ? "_lrg_" :
                       size === medium ? "_" :
                       "_small_";
      var colorString = type.toUpperCase();
      return imageLoader.getImage( "pull_figure" + sizeString + colorString + "_" + (leaning ? 3 : 0) + ".png" );
    }

    var skyHeight = 376;
    var grassY = 368;
    var groundHeight = height - skyHeight;

    //allow the sky and ground to go off the screen in case the window is larger than the sim aspect ratio
    this.skyNode = new Rectangle( -width, -376, width * 3, 376 * 2, {fill: new LinearGradient( 0, 0, 0, skyHeight ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' )} );
    this.groundNode = new Rectangle( -width, 376, width * 3, groundHeight * 2, { fill: '#c59a5b'} );

    this.addChild( this.skyNode );
    this.addChild( this.groundNode );
    this.addChild( new Image( imageLoader.getImage( 'grass.png' ), {x: 13, y: grassY} ) );

    this.cartNode = new Image( imageLoader.getImage( 'cart.png' ), {x: 399, y: 221} );

    //Black caret below the cart
    this.addChild( new Path( {shape: new Shape().moveTo( -10, 10 ).lineTo( 0, 0 ).lineTo( 10, 10 ), stroke: '#000000', lineWidth: 3, x: Layout.width / 2, y: grassY + 10} ) );

    //Add toolbox backgrounds for the pullers
    var toolboxHeight = 216;
    this.addChild( new Rectangle( 25, Layout.height - toolboxHeight - 4, 324, toolboxHeight, 10, 10, {fill: '#e7e8e9', stroke: '#000000', lineWidth: 1, renderer: 'canvas'} ) );
    this.addChild( new Rectangle( 630, Layout.height - toolboxHeight - 4, 324, toolboxHeight, 10, 10, { fill: '#e7e8e9', stroke: '#000000', lineWidth: 1, renderer: 'canvas'} ) );

    //Split into another canvas to speed up rendering
    this.addChild( new Node( {layerSplit: true} ) );

    this.sumArrow = new ReadoutArrow( 'Sum of Forces', '#7dc673', this.layoutBounds.width / 2, 100, this.model.showValues, {lineDash: [ 10, 5 ], labelPosition: 'top'} );
    this.model.showSumOfForces.link( function( visible ) {tugOfWarTabView.sumArrow.visible = visible} );
    this.leftArrow = new ReadoutArrow( 'Left Force', '#bf8b63', this.layoutBounds.width / 2, 200, this.model.showValues, {lineDash: [ 10, 5], labelPosition: 'side'} );
    this.rightArrow = new ReadoutArrow( 'Right Force', '#bf8b63', this.layoutBounds.width / 2, 200, this.model.showValues, {lineDash: [ 10, 5], labelPosition: 'side'} );

    //Arrows should be dotted when the sim is paused, but solid after pressing 'go'
    this.model.running.link( function( running ) {
      [tugOfWarTabView.sumArrow, tugOfWarTabView.leftArrow, tugOfWarTabView.rightArrow].forEach( function( arrow ) {
        arrow.setArrowDash( running ? null : [ 10, 5 ] );
      } );
    } );

    this.addChild( this.leftArrow );
    this.addChild( this.rightArrow );
    this.addChild( this.sumArrow );

    this.ropeNode = new Image( imageLoader.getImage( 'rope.png' ), {x: 51, y: 263 } );

    model.knots.forEach( function( knot ) { tugOfWarTabView.addChild( new KnotNode( knot ) ); } );

    this.addChild( this.ropeNode );
    this.arrowTailX = this.cartNode.centerX;

    this.model.cart.x.link( function( m, x ) {
      tugOfWarTabView.cartNode.x = x + 399;
      tugOfWarTabView.ropeNode.x = x + 51;
    } );

    this.addChild( this.cartNode );

    //Add the go button, but only if there is a puller attached
    var goPauseButtonContainer = new Node();
    var goPauseButton = new GoPauseButton( getImage, this.model );
    this.addChild( goPauseButtonContainer );
    var update = function() {
      goPauseButtonContainer.children = model.numberPullersAttached.value > 0 && model.state.value !== 'completed' ? [goPauseButton] : [];
    };
    model.running.link( update );
    model.numberPullersAttached.link( update );

    var returnButton = new ReturnButton( model, {centerX: this.layoutBounds.centerX, top: goPauseButton.bottom + 5} );
    this.addChild( returnButton );

    //Update the forces when the number of attached pullers changes
    model.numberPullersAttached.link( this.updateForces.bind( this ) );
    this.model.pullers.forEach( function( puller ) {
      tugOfWarTabView.addChild( new PullerNode( puller, tugOfWarTabView.model, getPullerImage( puller, false ), getPullerImage( puller, true ) ) );
    } );

    this.addChild( new TugOfWarControlPanel( this.model ).mutate( {right: 981 - 5, top: 5} ) );

    function showFlagNode() { tugOfWarTabView.addChild( new FlagNode( model, tugOfWarTabView.layoutBounds.width / 2, 10 ) ); }

    model.state.link( function( state ) { if ( state === 'completed' ) { showFlagNode(); } } );

    var textProperty = property( '' );
    model.numberPullersAttached.link( function() {
      textProperty.value = 'Left force: ' + Math.abs( model.getLeftForce() ) + ' Newtons, ' +
                           'Right force: ' + Math.abs( model.getRightForce() ) + ' Newtons, ' +
                           'Net Force: ' + Math.abs( model.getNetForce() ) + ' Newtons ' +
                           (model.getNetForce() === 0 ? '' : model.getNetForce() > 0 ? 'to the right' : 'to the left');
    } );
    this.addLiveRegion( textProperty );
  }

  inherit( TugOfWarTabView, TabView, {
    updateForces: function() {
      this.leftArrow.setValue( this.model.getLeftForce() );
      this.rightArrow.setValue( this.model.getRightForce() );
      this.sumArrow.setValue( this.model.getNetForce() );
    },
    layoutBounds: new Bounds2( 0, 0, 981, 604 )
  } );
  return TugOfWarTabView;
} );