define( function( require ) {
  "use strict";
  var PullerNode = require( "tugofwar/view/PullerNode" );
  var Shape = require( 'KITE/Shape' );
  var LayerType = require( 'SCENERY/layers/LayerType' );
  var Scene = require( 'SCENERY/Scene' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var DOM = require( 'SCENERY/nodes/DOM' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Vector2 = require( 'DOT/Vector2' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var arrow = require( 'tugofwar/view/arrow' );
  var ControlPanel = require( 'tugofwar/view/ControlPanel' );
  var KnotNode = require( 'tugofwar/view/KnotNode' );
  var GoButton = require( 'tugofwar/view/GoButton' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var FlagNode = require( 'tugofwar/view/FlagNode' );
  var ItemNode = require( 'motion/view/ItemNode' );
  var PusherNode = require( 'motion/view/PusherNode' );
  var HSlider = require( 'motion/view/HSlider' );

  function MotionScenery( model, topView, $tab, imageLoader ) {
    this.model = model;
    var tugOfWarScenery = this;
    var view = this;
    view.imageLoader = imageLoader;
    var getImage = topView.getImage;

    view.model = model;

    var skyGradient = new LinearGradient( 0, 0, 0, 100 ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' );
    this.scene = new Scene( $tab.find( ".scene" ), {width: 200, height: 200, allowDevicePixelRatioScaling: true} );
    this.skyNode = new Path( {shape: Shape.rect( 0, 0, 100, 100 ), fill: skyGradient} );
    this.groundNode = new Path( {shape: Shape.rect( 0, 0, 100, 100 ), fill: '#c59a5b'} );
    this.scene.addChild( this.skyNode );
    this.scene.addChild( this.groundNode );
    var grassY = 368;

    //TODO: Consider using scenery.Pattern instead of background-repeat: repeat-x;
    //TODO: or use the same pattern we used for the clouds and mountains 
    var brickDOM = new DOM( $( '#brick' ) );
    view.brickDOM = brickDOM;
    brickDOM.x = 100;
    brickDOM.y = 368 + 8;
    brickDOM.scale = 1;
    this.scene.addChild( brickDOM );
    var brickWidth = 120;
    model.sync( 'position', function( m, newValue ) {
      var x = -(newValue % brickWidth);
      if ( x > 0 ) { x = x - brickWidth; }//Prevent it from showing gaps when animating to the left
      brickDOM.x = x;
    } );

    var addBackgroundSprite = function( offset, imageName, distanceScale, y, scale ) {
      var sprite = new Image( imageLoader.getImage( imageName ), {scale: scale, y: y, renderer: 'svg', rendererOptions: {cssTransform: true}} );
      view.scene.addChild( sprite );
      model.sync( 'position', function( m, newValue ) { sprite.x = -(newValue / distanceScale + offset) % 1500 + 1500 - sprite.width; } );
    };
    addBackgroundSprite( 100, 'mountains.png', 10, 320, 0.3 );
    addBackgroundSprite( 600, 'mountains.png', 10, 320, 0.3 );
    addBackgroundSprite( 1200, 'mountains.png', 10, 320, 0.3 );

    addBackgroundSprite( 100, 'cloud1.png', 5, 10, 0.6 );
    addBackgroundSprite( 600, 'cloud1.png', 5, -30, 0.7 );
    addBackgroundSprite( 1200, 'cloud1.png', 5, 5, 0.5 );

    //Add toolbox backgrounds for the pullers
    view.scene.addChild( new Path( {shape: Shape.roundRect( 25, 400, 300, 250, 10, 10 ), fill: '#e7e8e9', stroke: '#000000', lineWidth: 1, renderer: 'canvas'} ) );
    view.scene.addChild( new Path( {shape: Shape.roundRect( 623, 400, 300, 250, 10, 10 ), fill: '#e7e8e9', stroke: '#000000', lineWidth: 1, renderer: 'canvas'} ) );

    //Split into another canvas to speed up rendering
    this.scene.addChild( new Node( {layerSplit: true} ) );

    this.scene.initializeStandaloneEvents(); // sets up listeners on the document with preventDefault(), and forwards those events to our scene
    this.scene.resizeOnWindowResize(); // the scene gets resized to the full screen size
    this.itemNodes = [];

    for ( var i = 0; i < model.items.length; i++ ) {
      var item = model.items[i];
      var itemNode = new ItemNode( model, view, item, view.imageLoader.getImage( item.image ) );
      this.itemNodes.push( itemNode );
      this.scene.addChild( itemNode );
    }

    var skateboardImage = new Image( imageLoader.getImage( 'skateboard.png' ), {x: 395, y: 342} );
    this.scene.addChild( skateboardImage );

    var pusher = new PusherNode( model, topView, imageLoader );
    this.scene.addChild( pusher );

    var slider = new HSlider( -100, 100, 200, model.property( 'appliedForce' ), {x: 400, y: 450} );
    this.scene.addChild( slider );

    this.sumArrow = new Path( {fill: '#7dc673', stroke: '#000000', lineWidth: 1} );
    this.leftArrow = new Path( {fill: '#bf8b63', stroke: '#000000', lineWidth: 1} );
    this.rightArrow = new Path( {fill: '#bf8b63', stroke: '#000000', lineWidth: 1} );
    this.scene.addChild( this.leftArrow );
    this.scene.addChild( this.rightArrow );
    this.scene.addChild( this.sumArrow );

    model.sync( 'showForce', function() {view.sumArrow.visible = model.showForce;} );
    model.sync( 'appliedForce', this.updateForces, this );

    //Fit to the window and render the initial scene
    $( window ).resize( function() { view.resize(); } );
    this.resize();
  }

  MotionScenery.prototype = {
    getItemNode: function( item ) {
      for ( var i = 0; i < this.itemNodes.length; i++ ) {
        if ( this.itemNodes[i].item === item ) {
          return this.itemNodes[i];
        }
      }
      debugger;
      throw new Error( "Couldn't find itemNode for item" );
    },
    get topOfStack() {
      var sum = 0;
      for ( var i = 0; i < this.model.stack.length; i++ ) {
        var itemView = this.getItemNode( this.model.stack[i] );
        sum = sum + itemView.height;
      }
      return 350 - sum;
    },
    resize: function() {
      var width = $( window ).width();
      var height = $( window ).height() - 50;//leave room for the tab bar

      var scale = Math.min( width / 981, height / 644 );
      this.scene.resetTransform();
      this.scene.resize( width, height );
      this.scene.scale( scale );

      var skyHeight = (376) * scale;
      var groundHeight = height - skyHeight;

      this.skyNode.shape = Shape.rect( 0, 0, width / scale, 376 );
      this.skyNode.fill = new LinearGradient( 0, 0, 0, skyHeight ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' );

      this.groundNode.shape = Shape.rect( 0, 376, width / scale, groundHeight / scale );

      var $tabIcons = $( '.tab-icons' );
      $tabIcons.css( {left: width / 2 - $tabIcons.width() / 2, bottom: 3} );
      $( '.icon-home' ).css( {left: width / 2 + $tabIcons.width() / 2, bottom: 3} );

//      $( '#brick' ).css( {width: width / scale + 120 * 2} );

      this.render();
    },
    render: function() {
      this.scene.updateScene();
    },
    updateForces: function() {
      var tailX = 981 / 2;
      var tailY = 280;
      var tailWidth = 25;
      var headWidth = 50;
      var headHeight = 40;
//      this.leftArrow.shape = arrow( x, 100, x + this.model.appliedForce, 100, tailWidth, headWidth, headHeight );
//      this.rightArrow.shape = arrow( x, 100, x + this.model.appliedForce, 100, tailWidth, headWidth, headHeight );
      this.sumArrow.shape = arrow( tailX, tailY, tailX + this.model.appliedForce, tailY, tailWidth, headWidth, headHeight );
    }
  };

  return MotionScenery;
} );