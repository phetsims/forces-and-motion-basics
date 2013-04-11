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
  var red = "red",
      blue = "blue",
      small = "small",
      medium = "medium",
      large = "large";

  function TugOfWarScenery( model, imageLoader ) {
    var tugOfWarScenery = this;
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

    var skyGradient = new LinearGradient( 0, 0, 0, 100 ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' );
    this.model = model;//Wire up so that main.js can step the model

    this.skyNode = new Rectangle( 0, 0, 100, 100, {fill: skyGradient} );
    this.groundNode = new Rectangle( 0, 0, 100, 100, { fill: '#c59a5b'} );

    this.addChild( this.skyNode );
    this.addChild( this.groundNode );
    var grassY = 368;
    this.addChild( new Image( imageLoader.getImage( 'grass.png' ), {x: 13, y: grassY} ) );

    this.cartNode = new Image( imageLoader.getImage( 'cart.png' ), {x: 399, y: 221} );
    //Black caret below the cart
    this.addChild( new Path( {shape: new Shape().moveTo( -10, 10 ).lineTo( 0, 0 ).lineTo( 10, 10 ), stroke: '#000000', lineWidth: 3, x: this.cartNode.centerX, y: grassY + 10} ) );

    //Add toolbox backgrounds for the pullers
    this.addChild( new Rectangle( 25, 390, 324, 250, 10, 10, {fill: '#e7e8e9', stroke: '#000000', lineWidth: 1, renderer: 'canvas'} ) );
    this.addChild( new Rectangle( 630, 390, 324, 250, 10, 10, { fill: '#e7e8e9', stroke: '#000000', lineWidth: 1, renderer: 'canvas'} ) );

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
      var knotNode = new KnotNode( knot );
      tugOfWarScenery.addChild( knotNode );
    } );

    this.addChild( this.ropeNode );
    this.arrowTailX = this.cartNode.centerX;

    this.model.cart.on( 'change:x', function( m, x ) {
      tugOfWarScenery.cartNode.x = x + 399;
      tugOfWarScenery.ropeNode.x = x + 51;
    } );

    this.addChild( this.cartNode );
    this.addChild( new GoButton( getImage, this.model ) );

    this.addChild( new TugOfWarControlPanel( this.model, imageLoader ).mutate( {right: 981 - 5, top: 5} ) );

    //Update the forces when the number of attached pullers changes
    model.link( 'numberPullersAttached', this.updateForces, this );
    this.model.pullers.each( function( puller ) {
      tugOfWarScenery.addChild( new PullerNode( puller, tugOfWarScenery.model, getPullerImage( puller, false ), getPullerImage( puller, true ) ) );
    } );

    model.on( 'change:state', function( m, state ) {
      if ( state === 'completed' ) {
        tugOfWarScenery.addChild( new FlagNode( model ) );
      }
    } );

    //Fit to the window and render the initial scene
    $( window ).resize( function() { tugOfWarScenery.resize(); } );
    this.resize();
  }

  inherit( TugOfWarScenery, Node, {
    resize: function() {
      var width = $( window ).width();
      var height = $( window ).height() - 40;//leave room for the tab bar

      var scale = Math.min( width / 981, height / 644 );
      console.log( 'scale', scale );

      this.resetTransform();
      this.scale( scale );

      var skyHeight = (376) * scale;
      var groundHeight = height - skyHeight;

      this.skyNode.mutate( {rectX: 0, rectY: 0, rectWidth: width / scale, rectHeight: 376} );
      this.skyNode.fill = new LinearGradient( 0, 0, 0, skyHeight ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' );

      this.groundNode.mutate( {rectX: 0, rectY: 376, rectWidth: width / scale, rectHeight: groundHeight / scale} );
    },
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
  return TugOfWarScenery;
} );