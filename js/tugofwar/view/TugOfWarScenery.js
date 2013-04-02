define( function( require ) {
  "use strict";
  var PullerNode = require( "tugofwar/view/PullerNode" );
  var Shape = require( 'KITE/Shape' );
  var LayerType = require( 'SCENERY/layers/LayerType' );
  var Scene = require( 'SCENERY/Scene' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Vector2 = require( 'DOT/Vector2' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Property = require( 'PHETCOMMON/model/property/Property' );
  var arrow = require( 'tugofwar/view/arrow' );
  var KnotNode = require( 'tugofwar/view/KnotNode' );
  var GoButton = require( 'tugofwar/view/GoButton' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var FlagNode = require( 'tugofwar/view/FlagNode' );
  var TugOfWarControlPanel = require( 'tugofwar/view/TugOfWarControlPanel' );
  var red = "red",
      blue = "blue",
      small = "small",
      medium = "medium",
      large = "large";

  function TugOfWarScenery( model, imageLoader ) {
    this.model = model;
    var tugOfWarScenery = this;
    var view = this;
    var getImage = imageLoader.getImage;

    function getPullerImage( puller, leaning ) {
      var type = puller.type;
      var size = puller.size;
      var sizeString = size === large ? "_lrg_" :
                       size === medium ? "_" :
                       "_small_";
      var colorString = type.toUpperCase();
      return imageLoader.getImage( "pull_figure" + sizeString + colorString + "_" + (leaning ? 3 : 0) );
    }

    view.model = model;

    var skyGradient = new LinearGradient( 0, 0, 0, 100 ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' );
    this.scene = new Node();
    this.scene.model = model;//Wire up so that main.js can step the model

    this.skyNode = new Rectangle( 0, 0, 100, 100, {fill: skyGradient} );
    this.groundNode = new Rectangle( 0, 0, 100, 100, { fill: '#c59a5b'} );

    this.scene.addChild( this.skyNode );
    this.scene.addChild( this.groundNode );
    var grassY = 368;
    this.scene.addChild( new Image( imageLoader.getImage( 'grass' ), {x: 13, y: grassY} ) );

    this.cartNode = new Image( imageLoader.getImage( 'cart' ), {x: 399, y: 221} );
    //Black caret below the cart
    view.scene.addChild( new Path( {shape: new Shape().moveTo( -10, 10 ).lineTo( 0, 0 ).lineTo( 10, 10 ), stroke: '#000000', lineWidth: 3, x: view.cartNode.centerX, y: grassY + 10} ) );

    //Add toolbox backgrounds for the pullers
    view.scene.addChild( new Rectangle( 25, 400, 300, 250, 10, 10, {fill: '#e7e8e9', stroke: '#000000', lineWidth: 1, renderer: 'canvas'} ) );
    view.scene.addChild( new Rectangle( 623, 400, 300, 250, 10, 10, { fill: '#e7e8e9', stroke: '#000000', lineWidth: 1, renderer: 'canvas'} ) );

    //Split into another canvas to speed up rendering
    this.scene.addChild( new Node( {layerSplit: true} ) );

    this.sumArrow = new Path( {fill: '#7dc673', stroke: '#000000', lineWidth: 1} );
    this.model.link( 'showSumOfForces', view.sumArrow, 'visible' );
    this.leftArrow = new Path( {fill: '#bf8b63', stroke: '#000000', lineWidth: 1} );
    this.rightArrow = new Path( {fill: '#bf8b63', stroke: '#000000', lineWidth: 1} );
    this.scene.addChild( this.leftArrow );
    this.scene.addChild( this.rightArrow );
    this.scene.addChild( this.sumArrow );

    view.ropeNode = new Image( imageLoader.getImage( 'rope' ), {x: 51, y: 263 } );

    model.knots.each( function( knot ) {
      var knotNode = new KnotNode( knot );
      view.scene.addChild( knotNode );
    } );

    this.scene.addChild( view.ropeNode );
    view.arrowTailX = view.cartNode.centerX;

    this.model.cart.on( 'change:x', function( m, x ) {
      view.cartNode.x = x + 399;
      view.ropeNode.x = x + 51;
    } );

    this.scene.addChild( this.cartNode );
    this.scene.addChild( new GoButton( getImage, this.model ) );

    this.scene.addChild( new TugOfWarControlPanel( this.model ) );

    //Update the forces when the number of attached pullers changes
    model.link( 'numberPullersAttached', view.updateForces, view );
    view.model.pullers.each( function( puller ) {
      view.scene.addChild( new PullerNode( puller, view.model, getPullerImage( puller, false ), getPullerImage( puller, true ) ) );
    } );

    model.on( 'change:state', function( m, state ) {
      if ( state === 'completed' ) {
        tugOfWarScenery.scene.addChild( new FlagNode( model ) );
      }
    } );

    //Fit to the window and render the initial scene
    $( window ).resize( function() { view.resize(); } );
    this.resize();
  }

  TugOfWarScenery.prototype = {
    resize: function() {
      var width = $( window ).width();
      var height = $( window ).height() - 40;//leave room for the tab bar

      var scale = Math.min( width / 981, height / 644 );

      this.scene.resetTransform();
      this.scene.scale( scale );

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
  };

  return TugOfWarScenery;
} );