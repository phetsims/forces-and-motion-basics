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
  var GoButton = require( 'tugofwar/view/GoButton' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var FlagNode = require( 'tugofwar/view/FlagNode' );
  var TugOfWarControlPanel = require( 'tugofwar/view/TugOfWarControlPanel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var imageLoader = require( 'imageLoader' );
  var LayoutConstants = require( 'SCENERY_PHET/LayoutConstants' );

  var red = "red",
      blue = "blue",
      small = "small",
      medium = "medium",
      large = "large";

  function TugOfWarTab( model ) {

    //Fit to the window and render the initial scene
    var width = LayoutConstants.TAB_WIDTH;
    var height = LayoutConstants.TAB_HEIGHT;//leave room for the tab bar

    var tugOfWarTab = this;
    this.model = model;
    Node.call( this );
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

    this.model = model;//Wire up so that main.js can step the model

    var skyHeight = 376;
    var grassY = 368;
    var groundHeight = height - skyHeight;

    //allow the sky and ground to go off the screen in case the window is larger than the sim aspect ratio
    this.skyNode = new Rectangle( -width, -376, width * 3, 376 * 2, {fill: new LinearGradient( 0, 0, 0, skyHeight ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' )} );
    this.groundNode = new Rectangle( -width, 376, width * 3, groundHeight, { fill: '#c59a5b'} );

    this.addChild( this.skyNode );
    this.addChild( this.groundNode );
    this.addChild( new Image( imageLoader.getImage( 'grass.png' ), {x: 13, y: grassY} ) );

    this.cartNode = new Image( imageLoader.getImage( 'cart.png' ), {x: 399, y: 221} );

    //Black caret below the cart
    this.addChild( new Path( {shape: new Shape().moveTo( -10, 10 ).lineTo( 0, 0 ).lineTo( 10, 10 ), stroke: '#000000', lineWidth: 3, x: LayoutConstants.TAB_WIDTH / 2, y: grassY + 10} ) );

    //Add toolbox backgrounds for the pullers
    var toolboxHeight = 216;
    this.addChild( new Rectangle( 25, LayoutConstants.TAB_HEIGHT - toolboxHeight - 4, 324, toolboxHeight, 10, 10, {fill: '#e7e8e9', stroke: '#000000', lineWidth: 1, renderer: 'canvas'} ) );
    this.addChild( new Rectangle( 630, LayoutConstants.TAB_HEIGHT - toolboxHeight - 4, 324, toolboxHeight, 10, 10, { fill: '#e7e8e9', stroke: '#000000', lineWidth: 1, renderer: 'canvas'} ) );

    //Split into another canvas to speed up rendering
    this.addChild( new Node( {layerSplit: true} ) );

    this.sumArrow = new Path( {fill: '#7dc673', stroke: '#000000', lineWidth: 1} );
    this.model.link( 'showSumOfForces', this.sumArrow, 'visible' );
    this.leftArrow = new Path( {fill: '#bf8b63', stroke: '#000000', lineWidth: 1} );
    this.rightArrow = new Path( {fill: '#bf8b63', stroke: '#000000', lineWidth: 1} );
    this.addChild( this.leftArrow );
    this.addChild( this.rightArrow );
    this.addChild( this.sumArrow );

    this.ropeNode = new Image( imageLoader.getImage( 'rope.png' ), {x: 51, y: 263 } );

    model.knots.each( function( knot ) {
      tugOfWarTab.addChild( new KnotNode( knot ) );
    } );

    this.addChild( this.ropeNode );
    this.arrowTailX = this.cartNode.centerX;

    this.model.cart.on( 'change:x', function( m, x ) {
      tugOfWarTab.cartNode.x = x + 399;
      tugOfWarTab.ropeNode.x = x + 51;
    } );

    this.addChild( this.cartNode );
    this.addChild( new GoButton( getImage, this.model ) );

    this.addChild( new TugOfWarControlPanel( this.model, imageLoader ).mutate( {right: 981 - 5, top: 5} ) );

    //Update the forces when the number of attached pullers changes
    model.link( 'numberPullersAttached', this.updateForces, this );
    this.model.pullers.each( function( puller ) {
      tugOfWarTab.addChild( new PullerNode( puller, tugOfWarTab.model, getPullerImage( puller, false ), getPullerImage( puller, true ) ) );
    } );

    model.on( 'change:state', function( m, state ) {
      if ( state === 'completed' ) {
        tugOfWarTab.addChild( new FlagNode( model ) );
      }
    } );
  }

  inherit( TugOfWarTab, Node, {
    updateForces: function() {
      var x = this.arrowTailX;
      var tailWidth = 25;
      var headWidth = 50;
      var headHeight = 40;
      this.leftArrow.shape = arrow( x, 100, x + this.model.getLeftForce(), 100, tailWidth, headWidth, headHeight );
      this.rightArrow.shape = arrow( x, 100, x + this.model.getRightForce(), 100, tailWidth, headWidth, headHeight );
      this.sumArrow.shape = arrow( x, 40, x + this.model.getNetForce(), 40, tailWidth, headWidth, headHeight );
    }
  } );
  return TugOfWarTab;
} );