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
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Vector2 = require( 'DOT/Vector2' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var arrow = require( 'tugofwar/view/arrow' );
  var ControlPanel = require( 'tugofwar/view/ControlPanel' );
  var KnotNode = require( 'tugofwar/view/KnotNode' );
  var GoButton = require( 'tugofwar/view/GoButton' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Pattern = require( 'SCENERY/util/Pattern' );
  var FlagNode = require( 'tugofwar/view/FlagNode' );
  var ItemNode = require( 'motion/view/ItemNode' );
  var PusherNode = require( 'motion/view/PusherNode' );
  var HSlider = require( 'motion/view/HSlider' );
  var Strings = require( "i18n!../../../nls/forces-and-motion-basics-strings" );
  var SpeedometerNode = require( "motion/view/SpeedometerNode" );
  var brickTemplate = require( 'tpl!../../../svg/brick.svg' );

  function MotionScenery( model, topView, $tab, imageLoader ) {
    this.model = model;
    var tugOfWarScenery = this;
    var view = this;
    view.imageLoader = imageLoader;
    var getImage = topView.getImage;

    view.WIDTH = 981;
    view.HEIGHT = 644;
    view.model = model;

    var skyGradient = new LinearGradient( 0, 0, 0, 100 ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' );
    this.scene = new Scene( $tab.find( ".scene" ), {width: 200, height: 200, allowDevicePixelRatioScaling: true} );
    this.skyNode = new Path( {shape: Shape.rect( 0, 0, 100, 100 ), fill: skyGradient} );
    this.groundNode = new Path( {shape: Shape.rect( 0, 0, 100, 100 ), fill: '#c59a5b'} );
    this.scene.addChild( this.skyNode );
    this.scene.addChild( this.groundNode );

    var modWidth = 120 * 15;
    var addBackgroundSprite = function( offset, imageName, distanceScale, y, scale ) {
      var sprite = new Image( imageLoader.getImage( imageName ), {scale: scale, y: y, renderer: 'svg', rendererOptions: {cssTransform: true}} );
      view.scene.addChild( sprite );
      model.link( 'position', function( m, newValue ) { sprite.x = -(newValue / distanceScale + offset) % modWidth + modWidth - sprite.width; } );
    };
    var mountainY = 353;

    addBackgroundSprite( 100, 'mountains.png', 10, mountainY, 1 );
    addBackgroundSprite( 600, 'mountains.png', 10, mountainY, 1 );
    addBackgroundSprite( 1200, 'mountains.png', 10, mountainY, 1 );

    addBackgroundSprite( 100, 'cloud1.png', 5, 10, 1 );
    addBackgroundSprite( 600, 'cloud1.png', 5, -30, 1 );
    addBackgroundSprite( 1200, 'cloud1.png', 5, 5, 0.9 );

    var addBackgroundSprite2 = function( image, offset, imageName, distanceScale, y, scale ) {
      var sprite = new Image( image, { y: mountainY + 50, renderer: 'svg'} );
      view.scene.addChild( sprite );
      model.link( 'position', function( m, newValue ) { sprite.x = -(newValue / distanceScale + offset) % modWidth + modWidth - sprite.width; } );
    };
    addBackgroundSprite2( $( '.mybrick' )[0], 0, '', 1, 0, 1 );
    addBackgroundSprite2( $( '.mybrick2' )[0], 1000, '', 1, 0, 1 );

    //Add toolbox backgrounds for the pullers
    var boxHeight = 180;
    view.scene.addChild( new Path( {shape: Shape.roundRect( 10, view.HEIGHT - boxHeight - 10, 300, boxHeight, 10, 10 ), fill: '#e7e8e9', stroke: '#000000', lineWidth: 1, renderer: 'canvas'} ) );
    view.scene.addChild( new Path( {shape: Shape.roundRect( view.WIDTH - 10 - 300, view.HEIGHT - boxHeight - 10, 300, boxHeight, 10, 10 ), fill: '#e7e8e9', stroke: '#000000', lineWidth: 1, renderer: 'canvas'} ) );

    //Split into another canvas to speed up rendering
    this.scene.addChild( new Node( {layerSplit: true} ) );

    this.scene.initializeStandaloneEvents(); // sets up listeners on the document with preventDefault(), and forwards those events to our scene
    this.scene.resizeOnWindowResize(); // the scene gets resized to the full screen size
    this.itemNodes = [];

    for ( var i = 0; i < model.items.length; i++ ) {
      var item = model.items[i];
      var itemNode = new ItemNode( model, view, item, view.imageLoader.getImage( item.image ),
                                   view.imageLoader.getImage( item.imageSitting ), view.imageLoader.getImage( item.imageHolding ),
                                   model.property( 'showMasses' ) );
      this.itemNodes.push( itemNode );
      this.scene.addChild( itemNode );
    }

    var skateboardImage = new Image( imageLoader.getImage( 'skateboard.png' ), {centerX: view.WIDTH / 2, y: 372} );
    this.scene.addChild( skateboardImage );

    var pusher = new PusherNode( model, topView, imageLoader );
    this.scene.addChild( pusher );

    this.sumArrow = new Path( {fill: '#7dc673', stroke: '#000000', lineWidth: 1} );
    this.leftArrow = new Path( {fill: '#bf8b63', stroke: '#000000', lineWidth: 1} );
    this.rightArrow = new Path( {fill: '#bf8b63', stroke: '#000000', lineWidth: 1} );
    this.scene.addChild( this.leftArrow );
    this.scene.addChild( this.rightArrow );
    this.scene.addChild( this.sumArrow );

    var sliderLabel = new Text( Strings.appliedForce, {fontSize: '22px', renderer: 'svg'} );
    var slider = new HSlider( -100, 100, 300, model.property( 'appliedForce' ) );
    var textBox = new DOM( $( '<input type="text" class="span1 applied-force-text-input" >' ), { interactive: true } );
    var vbox = new VBox( {children: [sliderLabel, slider, textBox], centerX: view.WIDTH / 2 - 18, y: 465, spacing: function( top, bottom ) { return bottom === textBox ? -20 : 8; }} );
    this.scene.addChild( vbox );//text box only seems to work if addedlast
    model.link( 'appliedForce', function( m, value ) { $( '.applied-force-text-input' ).val( value.toFixed( 0 ) );} );

    //Position the units to the right of the text box.  TODO: use coordinate transforms to do this instead of assuming a fixed relationship to vbox
    var unitsLabel = new Text( Strings.newtons, {fontSize: '22px', renderer: 'svg'} );
    unitsLabel.x = textBox.x + textBox.width + vbox.x + 10;
    unitsLabel.centerY = textBox.centerY + vbox.y;
    this.scene.addChild( unitsLabel );

    //Show a line that indicates the center of the layout
//    this.scene.addChild( new Path( {shape: Shape.lineSegment( WIDTH / 2, 0, WIDTH / 2, HEIGHT ), stroke: 'black', lineWidth: 1} ) );

    model.link( 'showForce', view.sumArrow, 'visible' );
    model.link( 'appliedForce', function() {
      var tailX = 981 / 2;
      var tailY = 280;
      var tailWidth = 25;
      var headWidth = 50;
      var headHeight = 40;
//      this.leftArrow.shape = arrow( x, 100, x + this.model.appliedForce, 100, tailWidth, headWidth, headHeight );
//      this.rightArrow.shape = arrow( x, 100, x + this.model.appliedForce, 100, tailWidth, headWidth, headHeight );
      this.sumArrow.shape = arrow( tailX, tailY, tailX + this.model.appliedForce, tailY, tailWidth, headWidth, headHeight );
    }, this );

    //Create the speedometer.  Specify the location after construction so we can set the 'top'
    var speedometerNode = new SpeedometerNode( model.property( 'velocity' ) ).mutate( {x: view.WIDTH / 2, top: 2} );
    model.link( 'showSpeed', speedometerNode, 'visible' );
    this.scene.addChild( speedometerNode );

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
      throw new Error( "Couldn't find itemNode for item" );
    },
    get topOfStack() {
      var sum = 0;
      for ( var i = 0; i < this.model.stack.length; i++ ) {
        var itemView = this.getItemNode( this.model.stack[i] );
        sum = sum + itemView.height;
      }
      return 380 - sum;
    },
    resize: function() {
      var width = $( window ).width();
      var height = $( window ).height() - 40;//leave room for the tab bar

      var scale = Math.min( width / 981, height / 644 );
      this.scene.resetTransform();
      this.scene.resize( width, height );
      this.scene.scale( scale );

      var skyHeight = (412) * scale;
      var groundHeight = height - skyHeight;

      this.skyNode.shape = Shape.rect( 0, 0, width / scale, 412 );
      this.skyNode.fill = new LinearGradient( 0, 0, 0, skyHeight ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' );

      this.groundNode.shape = Shape.rect( 0, 412, width / scale, groundHeight / scale );

      var $tabIcons = $( '.tab-icons' );
      $tabIcons.css( {left: width / 2 - $tabIcons.width() / 2, bottom: 3} );
      $( '.icon-home' ).css( {left: width / 2 + $tabIcons.width() / 2, bottom: 3} );

      this.render();
    },
    render: function() {
      this.scene.updateScene();
    }};

  return MotionScenery;
} );
