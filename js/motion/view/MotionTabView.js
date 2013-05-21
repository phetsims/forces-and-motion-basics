define( function( require ) {
  "use strict";
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Pattern = require( 'SCENERY/util/Pattern' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var arrow = require( 'tugofwar/view/arrow' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var ItemNode = require( 'motion/view/ItemNode' );
  var PusherNode = require( 'motion/view/PusherNode' );
  var HSlider = require( 'motion/view/HSlider' );
  var Strings = require( 'Strings' );
  var SpeedometerNode = require( "motion/view/SpeedometerNode" );
  var inherit = require( 'PHET_CORE/inherit' );
  var MotionControlPanel = require( 'motion/view/MotionControlPanel' );
  var imageLoader = require( 'imageLoader' );
  var TabView = require( 'JOIST/TabView' );
  var Bounds2 = require( 'DOT/Bounds2' );

  function MotionTabView( model ) {
    this.model = model;
    TabView.call( this );
    this.layoutBounds = new Bounds2( 0, 0, 981, 604 );
    var motionTabView = this;
    motionTabView.model = model;

    var width = this.layoutBounds.width;
    var height = this.layoutBounds.height;

    var skyHeight = 362;
    var groundHeight = height - skyHeight;

    model.getSize = function( item ) {
      return {width: item.view.width, height: item.view.height};
    };

    var skyGradient = new LinearGradient( 0, 0, 0, skyHeight ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' );
    this.model = model;//Wire up so main.js can step the model

    this.skyNode = new Rectangle( -width, -skyHeight, width * 3, skyHeight * 2, {fill: skyGradient} );
    this.groundNode = new Rectangle( -width, skyHeight, width * 3, groundHeight * 2, {fill: '#c59a5b'} );
    this.addChild( this.skyNode );
    this.addChild( this.groundNode );

    this.addChild( new Node( {layerSplit: true} ) );

    var modWidth = 120 * 15;
    var addBackgroundSprite = function( offset, imageName, distanceScale, y, scale ) {
      var sprite = new Image( imageLoader.getImage( imageName ), {scale: scale, y: y} );
      motionTabView.addChild( sprite );
      model.link( 'position', function( position ) { sprite.x = -(position / distanceScale + offset) % modWidth + modWidth - sprite.width; } );
    };

    var mountainY = 311;
    addBackgroundSprite( 100, 'mountains.png', 10, mountainY, 1 );
    addBackgroundSprite( 300, 'mountains.png', 10, mountainY, 1 );
    addBackgroundSprite( 700, 'mountains.png', 10, mountainY, 1 );

    addBackgroundSprite( 100, 'cloud1.png', 5, 10, 1 );
    addBackgroundSprite( 600, 'cloud1.png', 5, -30, 1 );
    addBackgroundSprite( 1200, 'cloud1.png', 5, 5, 0.9 );

    //We tested that Pattern has superior performance to a large cached image
    var tile = imageLoader.getImage( 'brick-tile.png' );
    var ground = new Rectangle( 0, mountainY + 50, tile.width * 12, tile.height, {fill: new Pattern( tile )} );
    var mod = ground.width / 12;
    var offset = motionTabView.layoutBounds.width / 2 - ground.width / 2;
    model.link( 'position', function( position ) { ground.x = -position % mod + offset; } );
    this.addChild( ground );

    //Add toolbox backgrounds for the objects
    var boxHeight = 180;
    this.addChild( new Rectangle( 10, height - boxHeight - 10, 300, boxHeight, 10, 10, {fill: '#e7e8e9', stroke: '#000000', lineWidth: 1, renderer: 'svg'} ) );
    this.addChild( new Rectangle( width - 10 - 300, height - boxHeight - 10, 300, boxHeight, 10, 10, { fill: '#e7e8e9', stroke: '#000000', lineWidth: 1, renderer: 'svg'} ) );

    //Split into another canvas to speed up rendering
    this.addChild( new Node( {layerSplit: true} ) );

    this.itemNodes = [];

    for ( var i = 0; i < model.items.length; i++ ) {
      var item = model.items[i];
      var itemNode = new ItemNode( model, motionTabView, item,
                                   imageLoader.getImage( item.image ),
                                   imageLoader.getImage( item.imageSitting ? item.imageSitting : item.image ),
                                   imageLoader.getImage( item.imageHolding ? item.imageHolding : item.image ),
                                   model.property( 'showMasses' ) );
      this.itemNodes.push( itemNode );

      //Provide a reference from the item model to its view so that view dimensions can be looked up easily
      item.view = itemNode;
      this.addChild( itemNode );
    }

    this.addChild( new Image( imageLoader.getImage( 'skateboard.png' ), {centerX: width / 2, y: 315 + 12} ) );
    this.addChild( new PusherNode( model, this ) );

    this.sumArrow = new Path( {fill: '#7dc673', stroke: '#000000', lineWidth: 1} );
    this.leftArrow = new Path( {fill: '#bf8b63', stroke: '#000000', lineWidth: 1} );
    this.rightArrow = new Path( {fill: '#bf8b63', stroke: '#000000', lineWidth: 1} );
    this.addChild( this.leftArrow );
    this.addChild( this.rightArrow );
    this.addChild( this.sumArrow );

    var sliderLabel = new Text( Strings.appliedForce, {fontSize: '22px', renderer: 'svg'} );
    var slider = new HSlider( -100, 100, 300, model.property( 'appliedForce' ) ).addNormalTicks();
    var sliderControl = new VBox( {children: [sliderLabel, slider], centerX: width / 2 - 18, y: 465, spacing: 8} );
    this.addChild( sliderControl );//text box only seems to work if addedlast

    //Position the units to the right of the text box.  TODO: use coordinate transforms to do this instead of assuming a fixed relationship to sliderControl
    var readout = new Text( '???', {fontSize: '22px'} );
    var unitsLabel = new Text( Strings.newtons, {fontSize: '22px'} );
    readout.top = sliderControl.bottom + 10;
    model.link( 'appliedForce', function( appliedForce ) {
      readout.text = appliedForce.toFixed( 0 );
      readout.centerX = width / 2 + 2;
      unitsLabel.x = readout.right + 10;
    } );
    unitsLabel.centerY = readout.centerY;
    this.addChild( readout );
    this.addChild( unitsLabel );

    //Show a line that indicates the center of the layout
//    this.addChild( new Path( {shape: Shape.lineSegment( Layout.width / 2, 0, Layout.width / 2, Layout.height ), stroke: 'black', lineWidth: 1} ) );

    model.link( 'showForce', motionTabView.sumArrow, 'visible' );
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
    var speedometerNode = new SpeedometerNode( model.property( 'velocity' ) ).mutate( {x: width / 2, top: 2} );
    model.link( 'showSpeed', speedometerNode, 'visible' );

    //Move away from the stack if the stack getting too high.  No need to record this in the model since it will always be caused deterministically by the model.
    model.on( 'stackChanged', function() {
      if ( model.stack.length > 2 && speedometerNode.isCentered ) {
        speedometerNode.isCentered = false;
        new TWEEN.Tween( speedometerNode ).to( { left: 50}, 400 ).easing( TWEEN.Easing.Cubic.InOut ).start();
      }
      else if ( model.stack.length <= 2 && !speedometerNode.isCentered ) {
        speedometerNode.isCentered = true;
        new TWEEN.Tween( speedometerNode ).to( { x: width / 2}, 400 ).easing( TWEEN.Easing.Cubic.InOut ).start();
      }
    } );
    this.addChild( speedometerNode );

    var controlPanel = new MotionControlPanel( model );
    this.addChild( controlPanel );

    var resetButton = new ResetAllButton( model.reset.bind( model ) ).mutate( {left: controlPanel.left, top: controlPanel.bottom + 5} );
    this.addChild( resetButton );

    //This code shows the results of the profiler, useful on iPad where it is more difficult to collect metrics
//    var text = new Text( 'profiler', {top: 100, left: 100} );
//    profiler.addListener( function( summary ) {text.text = summary;} );
//    this.addChild( text );
  }

  inherit( MotionTabView, TabView, {
    get topOfStack() {
      var sum = 0;
      for ( var i = 0; i < this.model.stack.length; i++ ) {
        sum = sum + this.model.stack[i].view.height;
      }
      return 380 - sum - 42 - 3;
    }
  } );

  return MotionTabView;
} );
