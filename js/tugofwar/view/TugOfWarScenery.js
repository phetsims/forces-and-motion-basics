define( function( require ) {
  "use strict";
  var PullerNode = require( "tugofwar/view/PullerNode" );
  var Shape = require( 'SCENERY/Shape' );
  var LayerType = require( 'SCENERY/layers/LayerType' );
  var Scene = require( 'SCENERY/Scene' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Vector2 = require( 'DOT/Vector2' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Property = require( 'PHETCOMMON/model/property/Property' );
  var arrow = require( 'tugofwar/view/arrow' );
  var ControlPanel = require( 'tugofwar/view/ControlPanel' );
  var KnotNode = require( 'tugofwar/view/KnotNode' );
  var GoButton = require( 'tugofwar/view/GoButton' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var FlagNode = require( 'tugofwar/view/FlagNode' );
  var red = "red",
      blue = "blue",
      small = "small",
      medium = "medium",
      large = "large";

  function TugOfWarScenery( model, topView ) {
    this.model = model;
    var tugOfWarScenery = this;
    var view = this;
    var getImage = topView.getImage;

    function getPullerImage( puller, leaning ) {
      var type = puller.get( "type" );
      var size = puller.get( "size" );
      var sizeString = size === large ? "_lrg_" :
                       size === medium ? "_" :
                       "_small_";
      var colorString = type.toUpperCase();
      return topView.getImage( "pull_figure" + sizeString + colorString + "_" + (leaning ? 3 : 0) );
    }

    view.model = model;

    var skyGradient = new LinearGradient( 0, 0, 0, 100 ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' );
    this.scene = new Scene( $( "#scene" ), {width: 200, height: 200, allowDevicePixelRatioScaling: true} );
    this.skyNode = new Path( {shape: Shape.rect( 0, 0, 100, 100 ), fill: skyGradient} );
    this.groundNode = new Path( {shape: Shape.rect( 0, 0, 100, 100 ), fill: '#c59a5b'} );
    this.scene.addChild( this.skyNode );
    this.scene.addChild( this.groundNode );
    var grassY = 368;
    this.scene.addChild( new Image( topView.getImage( 'grass' ), {x: 13, y: grassY} ) );
    this.sumArrow = new Path( {shape: new Shape(), fill: '#7dc673', stroke: '#000000', lineWidth: 1} );
    this.model.on( 'change:showSumOfForces', function( m, showSumOfForces ) { view.sumArrow.visible = showSumOfForces; } );
    this.model.trigger( 'change:showSumOfForces' );
    this.leftArrow = new Path( {shape: new Shape(), fill: '#bf8b63', stroke: '#000000', lineWidth: 1} );
    this.rightArrow = new Path( {shape: new Shape(), fill: '#bf8b63', stroke: '#000000', lineWidth: 1} );
    this.scene.addChild( this.leftArrow );
    this.scene.addChild( this.rightArrow );
    this.scene.addChild( this.sumArrow );

    view.ropeNode = new Image( topView.getImage( 'rope' ), {x: 51, y: 263 } );

    model.knots.each( function( knot ) {
      var knotNode = new KnotNode( knot );
      view.scene.addChild( knotNode );
    } );

    this.scene.addChild( view.ropeNode );
    this.cartNode = new Image( topView.getImage( 'cart' ), {x: 399, y: 221} );
    view.arrowTailX = view.cartNode.centerX;

    this.model.cart.on( 'change:x', function( m, x ) {
      view.cartNode.x = x + 399;
      view.ropeNode.x = x + 51;
    } );

    this.scene.addChild( this.cartNode );
    this.scene.addChild( new GoButton( getImage, this.model ) );

    //Black caret below the cart
    view.scene.addChild( new Path( {shape: new Shape().moveTo( -10, 10 ).lineTo( 0, 0 ).lineTo( 10, 10 ), stroke: '#000000', lineWidth: 3, x: view.cartNode.centerX, y: grassY + 10} ) );

    //Add toolbox backgrounds for the pullers
    view.scene.addChild( new Path( {shape: Shape.roundRect( 25, 400, 300, 250, 10, 10 ), fill: '#e7e8e9', stroke: '#000000', lineWidth: 1, renderer: 'canvas'} ) );
    view.scene.addChild( new Path( {shape: Shape.roundRect( 623, 400, 300, 250, 10, 10 ), fill: '#e7e8e9', stroke: '#000000', lineWidth: 1, renderer: 'canvas'} ) );

    view.model.pullers.each( function( puller ) {
      puller.on( 'change:x change:y', function( puller ) {
        view.updateForces();
      } );
      view.scene.addChild( new PullerNode( puller, view.model, getPullerImage( puller, false ), getPullerImage( puller, true ) ) );
    } );

    model.on( 'change:state', function( m, state ) {
      if ( state === 'completed' ) {
        tugOfWarScenery.scene.addChild( new FlagNode( model ) );
      }
    } );

    this.scene.initializeFullscreenEvents(); // sets up listeners on the document with preventDefault(), and forwards those events to our scene
    this.scene.resizeOnWindowResize(); // the scene gets resized to the full screen size

    //Fit to the window and render the initial scene
    $( window ).resize( function() { view.resize(); } );
    this.resize();

    //http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // place the rAF *before* the render() to assure as close to
    // 60fps with the setTimeout fallback.
    (function animloop() {
      requestAnimFrame( animloop );
      model.step();
      view.render();
    })();
  }

  TugOfWarScenery.prototype = {
    resize: function() {
      var width = $( window ).width();
      var height = $( window ).height() - 50;//leave room for the tab bar

      var scale = Math.min( width / 981, height / 644 );

      this.scene.resize( width, height );
      this.scene.setScale( scale );

      var skyHeight = (376) * scale;
      var groundHeight = height - skyHeight;

      //Clear raphael layers and rebuild
      $( "#background" ).empty();

      this.skyNode.shape = Shape.rect( 0, 0, width / scale, 376 );
      this.skyNode.fill = new LinearGradient( 0, 0, 0, skyHeight ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' );

      this.groundNode.shape = Shape.rect( 0, 376, width / scale, groundHeight / scale );

      var $tabIcons = $( '.tab-icons' );
      $tabIcons.css( {left: width / 2 - $tabIcons.width() / 2, bottom: 3} );
      $( '.icon-home' ).css( {left: width / 2 + $tabIcons.width() / 2, bottom: 3} );

      this.render();
    },
    render: function() {
      this.scene.updateScene();
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