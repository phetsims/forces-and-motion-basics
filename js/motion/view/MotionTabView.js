define( function( require ) {
  "use strict";
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var arrow = require( 'tugofwar/view/arrow' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var ItemNode = require( 'motion/view/ItemNode' );
  var PusherNode = require( 'motion/view/PusherNode' );
  var HSlider = require( 'motion/view/HSlider' );
  var Strings = require( 'Strings' );
  var SpeedometerNode = require( "motion/view/SpeedometerNode" );
  var inherit = require( 'PHET_CORE/inherit' );
  var MotionControlPanel = require( 'motion/view/MotionControlPanel' );
  var MovingBackgroundNode = require( 'motion/view/MovingBackgroundNode' );
  var imageLoader = require( 'imageLoader' );
  var TabView = require( 'JOIST/TabView' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var ReadoutArrow = require( 'common/view/ReadoutArrow' );

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
    this.addChild( new MovingBackgroundNode( model, this.layoutBounds.width / 2 ) );

    //Add toolbox backgrounds for the objects
    var boxHeight = 180;
    this.addChild( new Rectangle( 10, height - boxHeight - 10, 300, boxHeight, 10, 10, {fill: '#e7e8e9', stroke: '#000000', lineWidth: 1, renderer: 'svg'} ) );
    this.addChild( new Rectangle( width - 10 - 300, height - boxHeight - 10, 300, boxHeight, 10, 10, { fill: '#e7e8e9', stroke: '#000000', lineWidth: 1, renderer: 'svg'} ) );

    this.itemNodes = [];

    this.addChild( new PusherNode( model, this ) );

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

    if ( model.skateboard ) {
      this.addChild( new Image( imageLoader.getImage( 'skateboard.png' ), {centerX: width / 2, y: 315 + 12} ) );
    }

    this.sumArrow = new ReadoutArrow( 'Sum of Forces', '#96c83c', this.layoutBounds.width / 2, 230, model.property( 'showValues' ), {labelPosition: 'top'} );
    this.appliedForceArrow = new ReadoutArrow( 'Applied Force', '#e66e23', this.layoutBounds.width / 2, 280, model.property( 'showValues' ), {labelPosition: 'side'} );
    this.frictionArrow = new ReadoutArrow( 'Friction', '#e66e23', this.layoutBounds.width / 2, 280, model.property( 'showValues' ), {labelPosition: 'side'} );
    this.addChild( this.sumArrow );
    this.addChild( this.appliedForceArrow );
    this.addChild( this.frictionArrow );

    var sliderLabel = new Text( Strings.appliedForce, {fontSize: '22px', renderer: 'svg'} );
    var slider = new HSlider( -100, 100, 300, model.property( 'appliedForce' ), {zeroOnRelease: true} ).addNormalTicks();
    var sliderControl = new VBox( {children: [sliderLabel, slider], centerX: width / 2 - 18, y: 465, spacing: 8} );
    this.addChild( sliderControl );//text box only seems to work if added last

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

    var updateSumOfForcesVisible = function() { motionTabView.sumArrow.visible = model.showForce && model.showSumOfForces; };
    model.on( 'change:showForce change:showSumOfForces', updateSumOfForcesVisible );
    updateSumOfForcesVisible();

    model.link( 'showForce', motionTabView.appliedForceArrow, 'visible' );

    //TODO: move this code to ReadoutArrow
    model.link( 'appliedForce', function( appliedForce ) { this.appliedForceArrow.setValue( appliedForce ); }, this );//TODO: change to string based link style with ES5
    model.link( 'sumOfForces', function( sumOfForces ) { this.sumArrow.setValue( sumOfForces ); }, this );//TODO: change to string based link style with ES5
    model.link( 'frictionForce', function( frictionForce ) { this.frictionArrow.setValue( frictionForce ); }, this );//TODO: change to string based link style with ES5

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

    var resetButton = new ResetAllButton( model.reset.bind( model ) ).mutate( {centerX: controlPanel.centerX, top: controlPanel.bottom + 5} );
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
      var n = this.model.skateboard ? 335 : 360;
      return n - sum;
    }
  } );

  return MotionTabView;
} );
