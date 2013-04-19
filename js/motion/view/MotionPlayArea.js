define( function( require ) {
  "use strict";
  var LayerType = require( 'SCENERY/layers/LayerType' );
  var Shape = require( 'KITE/Shape' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var DOM = require( 'SCENERY/nodes/DOM' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var arrow = require( 'tugofwar/view/arrow' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var ItemNode = require( 'motion/view/ItemNode' );
  var PusherNode = require( 'motion/view/PusherNode' );
  var HSlider = require( 'motion/view/HSlider' );
  var Strings = require( 'Strings' );
  var SpeedometerNode = require( "motion/view/SpeedometerNode" );
  var Button = require( 'SUN/Button' );
  var inherit = require( 'PHET_CORE/inherit' );
  var CheckBox = require( 'SUN/CheckBox' );
  var MotionControlPanel = require( 'motion/view/MotionControlPanel' );
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  var imageLoader = require( 'imageLoader' );
  var Layout = require( 'SCENERY_PHET/Layout' );
  var PlayArea = require( 'SCENERY_PHET/PlayArea' );
  var Bounds2 = require( 'DOT/Bounds2' );

  function MotionPlayArea( model ) {
    this.model = model;
    PlayArea.call( this );
    var view = this;
    view.model = model;

    var width = Layout.width;
    var height = Layout.height;

    var skyHeight = 362;
    var groundHeight = height - skyHeight;

    model.getSize = function( item ) {
      var itemNode = view.getItemNode( item );
      return {width: itemNode.width, height: itemNode.height};
    };

    var skyGradient = new LinearGradient( 0, 0, 0, skyHeight ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' );
    this.model = model;//Wire up so main.js can step the model

    this.skyNode = new Rectangle( -width, -skyHeight, width * 3, skyHeight * 2, {fill: skyGradient} );
    this.groundNode = new Rectangle( -width, skyHeight, width * 3, groundHeight * 2, {fill: '#c59a5b'} );
    this.addChild( this.skyNode );
    this.addChild( this.groundNode );

    var modWidth = 120 * 15;
    var addBackgroundSprite = function( offset, imageName, distanceScale, y, scale ) {
      var sprite = new Image( imageLoader.getImage( imageName ), {scale: scale, y: y, renderer: 'canvas', rendererOptions: {cssTransform: true}} );
      view.addChild( sprite );
      model.link( 'position', function( newValue ) { sprite.x = -(newValue / distanceScale + offset) % modWidth + modWidth - sprite.width; } );
    };
    var mountainY = 353 - 54 + 12;

    addBackgroundSprite( 100, 'mountains.png', 10, mountainY, 1 );
    addBackgroundSprite( 300, 'mountains.png', 10, mountainY, 1 );
    addBackgroundSprite( 700, 'mountains.png', 10, mountainY, 1 );

    addBackgroundSprite( 100, 'cloud1.png', 5, 10, 1 );
    addBackgroundSprite( 600, 'cloud1.png', 5, -30, 1 );
    addBackgroundSprite( 1200, 'cloud1.png', 5, 5, 0.9 );

    var addBrick = function( image, offset, imageName, distanceScale, y, scale ) {
      var sprite = new Image( image, { y: mountainY + 50, renderer: 'svg', scale: 4, rendererOptions: {cssTransform: true}} );
      view.addChild( sprite );
      model.link( 'position', function( newValue ) { sprite.x = -(newValue / distanceScale + offset) % modWidth + modWidth - sprite.width; } );
    };
    addBrick( imageLoader.getImage( 'brick-repeat.svg' ), 0, '', 1, 0, 1 );
    addBrick( imageLoader.getImage( 'brick-repeat.svg' ), 1000, '', 1, 0, 1 );

    //Add toolbox backgrounds for the objects
    var boxHeight = 180;
    this.addChild( new Rectangle( 10, Layout.height - boxHeight - 10, 300, boxHeight, 10, 10, {fill: '#e7e8e9', stroke: '#000000', lineWidth: 1, renderer: 'svg'} ) );
    this.addChild( new Rectangle( Layout.width - 10 - 300, Layout.height - boxHeight - 10, 300, boxHeight, 10, 10, { fill: '#e7e8e9', stroke: '#000000', lineWidth: 1, renderer: 'svg'} ) );

    //Split into another canvas to speed up rendering
    this.addChild( new Node( {layerSplit: true} ) );

    this.itemNodes = [];

    for ( var i = 0; i < model.items.length; i++ ) {
      var item = model.items[i];
      var itemNode = new ItemNode( model, view, item,
                                   imageLoader.getImage( item.image ),
                                   imageLoader.getImage( item.imageSitting ? item.imageSitting : item.image ),
                                   imageLoader.getImage( item.imageHolding ? item.imageHolding : item.image ),
                                   model.property( 'showMasses' ) );
      this.itemNodes.push( itemNode );
      this.addChild( itemNode );
    }

    this.getItemNode = function( item ) {
      for ( var i = 0; i < this.itemNodes.length; i++ ) {
        if ( this.itemNodes[i].item === item ) {
          return this.itemNodes[i];
        }
      }
      throw new Error( "Couldn't find itemNode for item", item );
    };

    this.addChild( new Image( imageLoader.getImage( 'skateboard.png' ), {centerX: Layout.width / 2, y: 315 + 12} ) );
    this.addChild( new PusherNode( model, this ) );

    this.sumArrow = new Path( {fill: '#7dc673', stroke: '#000000', lineWidth: 1} );
    this.leftArrow = new Path( {fill: '#bf8b63', stroke: '#000000', lineWidth: 1} );
    this.rightArrow = new Path( {fill: '#bf8b63', stroke: '#000000', lineWidth: 1} );
    this.addChild( this.leftArrow );
    this.addChild( this.rightArrow );
    this.addChild( this.sumArrow );

    var sliderLabel = new Text( Strings.appliedForce, {fontSize: '22px', renderer: 'svg'} );
    var slider = new HSlider( -100, 100, 300, model.property( 'appliedForce' ) ).addNormalTicks();
    var sliderControl = new VBox( {children: [sliderLabel, slider], centerX: Layout.width / 2 - 18, y: 465, spacing: 8} );
    this.addChild( sliderControl );//text box only seems to work if addedlast

    //Position the units to the right of the text box.  TODO: use coordinate transforms to do this instead of assuming a fixed relationship to sliderControl
    var readout = new Text( '???', {fontSize: '22px'} );
    var unitsLabel = new Text( Strings.newtons, {fontSize: '22px'} );
    readout.top = sliderControl.bottom + 10;
    model.link( 'appliedForce', function( appliedForce ) {
      readout.text = appliedForce.toFixed( 0 );
      readout.centerX = Layout.width / 2 + 2;
      unitsLabel.x = readout.right + 10;
    } );
    unitsLabel.centerY = readout.centerY;
    this.addChild( readout );
    this.addChild( unitsLabel );

    //Show a line that indicates the center of the layout
//    this.addChild( new Path( {shape: Shape.lineSegment( Layout.width / 2, 0, Layout.width / 2, Layout.height ), stroke: 'black', lineWidth: 1} ) );

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
    var speedometerNode = new SpeedometerNode( model.property( 'velocity' ) ).mutate( {x: Layout.width / 2, top: 2} );
    model.link( 'showSpeed', speedometerNode, 'visible' );
    this.addChild( speedometerNode );

    var controlPanel = new MotionControlPanel( model );
    this.addChild( controlPanel );

    var resetButton = new Button( new FontAwesomeNode( 'refresh', {fill: '#fff'} ), {}, model.reset.bind( model ) ).
        mutate( {left: controlPanel.left, top: controlPanel.bottom + 5} );
    this.addChild( resetButton );
  }

  inherit( MotionPlayArea, PlayArea, {
    get topOfStack() {
      var sum = 0;
      for ( var i = 0; i < this.model.stack.length; i++ ) {
        var itemView = this.getItemNode( this.model.stack[i] );
        sum = sum + itemView.height;
      }
      return 380 - sum - 42 - 3;
    },
    layoutBounds: new Bounds2( 0, 0, 981, 604 )
  } );

  return MotionPlayArea;
} );
