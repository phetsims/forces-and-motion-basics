// Copyright 2013-2015, University of Colorado Boulder

/**
 * Main scenery view for the Motion, Friction and Acceleration screens.
 */
define( function( require ) {
  'use strict';

  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var PlayPauseButton = require( 'SCENERY_PHET/buttons/PlayPauseButton' );
  var StepForwardButton = require( 'SCENERY_PHET/buttons/StepForwardButton' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Text = require( 'SCENERY/nodes/Text' );
  var RichText = require( 'SCENERY/nodes/RichText' );
  var Shape = require( 'KITE/Shape' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var ItemNode = require( 'FORCES_AND_MOTION_BASICS/motion/view/ItemNode' );
  var WaterBucketNode = require( 'FORCES_AND_MOTION_BASICS/motion/view/WaterBucketNode' );
  var PusherNode = require( 'FORCES_AND_MOTION_BASICS/motion/view/PusherNode' );
  var AppliedForceSlider = require( 'FORCES_AND_MOTION_BASICS/motion/view/AppliedForceSlider' );
  var appliedForceString = require( 'string!FORCES_AND_MOTION_BASICS/appliedForce' );
  var sumOfForcesString = require( 'string!FORCES_AND_MOTION_BASICS/sumOfForces' );
  var sumOfForcesEqualsZeroString = require( 'string!FORCES_AND_MOTION_BASICS/sumOfForcesEqualsZero' );
  var frictionForceString = require( 'string!FORCES_AND_MOTION_BASICS/frictionForce' );
  var SpeedometerNode = require( 'FORCES_AND_MOTION_BASICS/motion/view/SpeedometerNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MotionControlPanel = require( 'FORCES_AND_MOTION_BASICS/motion/view/MotionControlPanel' );
  var MovingBackgroundNode = require( 'FORCES_AND_MOTION_BASICS/motion/view/MovingBackgroundNode' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var ForcesAndMotionBasicsLayoutBounds = require( 'FORCES_AND_MOTION_BASICS/common/view/ForcesAndMotionBasicsLayoutBounds' );
  var ReadoutArrow = require( 'FORCES_AND_MOTION_BASICS/common/view/ReadoutArrow' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var AccelerometerNode = require( 'FORCES_AND_MOTION_BASICS/motion/view/AccelerometerNode' );
  var Property = require( 'AXON/Property' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var ArrowButton = require( 'SUN/buttons/ArrowButton' );
  var Util = require( 'DOT/Util' );
  var ItemToolboxNode = require( 'FORCES_AND_MOTION_BASICS/motion/view/ItemToolboxNode' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var Line = require( 'SCENERY/nodes/Line' );
  var ForcesAndMotionBasicsQueryParameters = require( 'FORCES_AND_MOTION_BASICS/common/ForcesAndMotionBasicsQueryParameters' );

  // phet-io modules
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );

  // constants
  var DEBUG = false; // adds a line at the bottom of the items to assist with layout
  var PLAY_PAUSE_BUFFER = 10; // separation between step and reset all button, usedful for i18n
  var ARROW_TOUCH_DILATION = 7; // dilattion in single dimension for touch areas of the double arrow button

  // arrow button constants
  var BUTTON_ARROW_HEIGHT = 14;
  var BUTTON_ARROW_WIDTH = BUTTON_ARROW_HEIGHT * Math.sqrt( 3 ) / 2;
  var BUTTON_ARROW_SPACING = -BUTTON_ARROW_HEIGHT * ( 1 / 2.5 );

  // images
  var skateboardImage = require( 'image!FORCES_AND_MOTION_BASICS/skateboard.png' );

  // strings
  var motionLeftItemGroupDescriptionString = require( 'string!FORCES_AND_MOTION_BASICS/motion.leftItemGroup.description' );
  var motionRightItemGroupDescriptionString = require( 'string!FORCES_AND_MOTION_BASICS/motion.rightItemGroup.description' );
  var accelerationString = require( 'string!FORCES_AND_MOTION_BASICS/acceleration' );
  var pattern0Name1ValueUnitsAccelerationString = require( 'string!FORCES_AND_MOTION_BASICS/pattern.0name.1valueUnitsAcceleration' );
  var pattern0ValueUnitsNewtonsString = require( 'string!FORCES_AND_MOTION_BASICS/pattern.0valueUnitsNewtons' );

  /**
   * Constructor for the MotionScreenView
   *
   * @param {MotionModel} model model for the entire screen
   * @param {Tandem} tandem
   * @constructor
   */
  function MotionScreenView( model, tandem ) {

    //Constants and fields
    this.model = model;

    //Call super constructor
    ScreenView.call( this, { layoutBounds: ForcesAndMotionBasicsLayoutBounds } );

    //Variables for this constructor, for convenience
    var self = this;
    var width = this.layoutBounds.width;
    var height = this.layoutBounds.height;

    //Constants
    var skyHeight = 362;
    var groundHeight = height - skyHeight;

    //Create the static background
    var skyGradient = new LinearGradient( 0, 0, 0, skyHeight ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' );
    this.sky = new Rectangle( -width, -skyHeight, width * 3, skyHeight * 2, { fill: skyGradient, pickable: false } );

    this.groundNode = new Rectangle( -width, skyHeight, width * 3, groundHeight * 3, {
      fill: '#c59a5b',
      pickable: false
    } );
    this.addChild( this.sky );
    this.addChild( this.groundNode );

    //Create the dynamic (moving) background
    this.addChild( new MovingBackgroundNode( model, this.layoutBounds.width / 2, tandem.createTandem( 'movingBackgroundNode' ) ).mutate( { layerSplit: true } ) );

    // The pusher should be behind the skateboard
    this.addChild( new PusherNode( model, this.layoutBounds.width, tandem.createTandem( 'pusherNode' ) ) );

    // Add the skateboard if on the 'motion' screen
    if ( model.skateboard ) {
      this.addChild( new Image( skateboardImage, {
        centerX: width / 2, y: 315 + 12,
        pickable: false,
        tandem: tandem.createTandem( 'skateboardImageNode' )
      } ) );
    }

    //Add toolbox backgrounds for the objects
    var boxHeight = 180;
    var showItemToolboxes = ForcesAndMotionBasicsQueryParameters.showItemToolboxes;
    var fill = showItemToolboxes ? '#e7e8e9' : null;
    var stroke = showItemToolboxes ? '#000000' : null;
    var leftItemToolboxNode = new ItemToolboxNode( 10, height - boxHeight - 10, 300, boxHeight, 10, 10, 'left', {
      fill: fill,
      stroke: stroke,
      lineWidth: 1,
      accessibleDescription: motionLeftItemGroupDescriptionString,
      tandem: tandem.createTandem( 'leftItemToolboxNode' )
    } );
    var rightItemToolboxNode = new ItemToolboxNode( width - 10 - 300, height - boxHeight - 10, 300, boxHeight, 10, 10, 'right', {
      fill: fill,
      stroke: stroke,
      lineWidth: 1,
      accessibleDescription: motionRightItemGroupDescriptionString,
      tandem: tandem.createTandem( 'rightItemToolboxNode' )
    } );

    //Create the slider
    var disableText = function( node ) { return function( length ) {node.fill = length === 0 ? 'gray' : 'black';}; };

    var maxTextWidth = ( rightItemToolboxNode.left - leftItemToolboxNode.right ) - 10;
    var appliedForceSliderTextNode = new Text( appliedForceString, {
      font: new PhetFont( 22 ),
      centerX: width / 2,
      y: 430,
      maxWidth: maxTextWidth,
      tandem: tandem.createTandem( 'appliedForceSliderTextNode' )
    } );
    var appliedForceSlider = new AppliedForceSlider( model, {
      min: -500,
      max: 500
    }, tandem.createTandem( 'appliedForceSlider' ), {
      centerX: width / 2 + 1,
      y: 555
    } );

    this.addChild( appliedForceSliderTextNode );
    this.addChild( appliedForceSlider );

    //Position the units to the right of the text box.
    var readoutTextNode = new Text( '???', {
      font: new PhetFont( 22 ),
      pickable: false,
      maxWidth: maxTextWidth / 3,
      tandem: tandem.createTandem( 'readoutTextNode' )
    } );
    readoutTextNode.bottom = appliedForceSlider.top - 15;
    model.appliedForceProperty.link( function( appliedForce ) {

      //Must match the other formatters below, see roundedAppliedForceProperty near the creation of the ReadoutArrows
      var roundedValue = Util.toFixed( Util.roundSymmetric( appliedForce ), 0 );
      var numberText = Util.toFixed( parseInt( roundedValue, 10 ), 0 );

      //Prevent -0 from appearing, see https://github.com/phetsims/forces-and-motion-basics/issues/70
      if ( numberText === '-0' ) { numberText = '0'; }
      readoutTextNode.text = StringUtils.format( pattern0ValueUnitsNewtonsString, numberText );
      readoutTextNode.centerX = width / 2;
    } );

    //Make 'Newtons Readout' stand out but not look like a text entry field
    this.textPanelNode = new Rectangle( 0, 0, readoutTextNode.right - readoutTextNode.left + 50, readoutTextNode.height + 4, {
      fill: 'white',
      stroke: 'lightgrey',
      centerX: width / 2,
      centerY: readoutTextNode.centerY,
      pickable: false
    } );
    this.addChild( this.textPanelNode );
    this.addChild( readoutTextNode );

    // Show left arrow button 'tweaker' to change the applied force in increments of 50
    var doubleLeftArrowButton = new ArrowButton( 'left', function() {
      model.appliedForceProperty.set( Math.max( model.appliedForceProperty.get() - 50, -500 ) );
    }, {
      right: this.textPanelNode.left - 6,
      centerY: this.textPanelNode.centerY,
      numberOfArrows: 2,
      arrowSpacing: BUTTON_ARROW_SPACING,
      arrowHeight: BUTTON_ARROW_HEIGHT,
      arrowWidth: BUTTON_ARROW_WIDTH,
      tandem: tandem.createTandem( 'doubleLeftArrowButton' )
    } );

    // Small left arrow button 'tweaker' to change the applied force in increments of 1
    var leftArrowButton = new ArrowButton( 'left', function() {
      model.appliedForceProperty.set( Math.max( model.appliedForceProperty.get() - 1, -500 ) );
    }, {
      right: doubleLeftArrowButton.left - 6,
      centerY: this.textPanelNode.centerY,
      arrowHeight: BUTTON_ARROW_HEIGHT, // from tip to base
      arrowWidth: BUTTON_ARROW_WIDTH, // width of base
      tandem: tandem.createTandem( 'leftArrowButton' )
    } );

    // define custom touch areas so the arrow buttons don't overlap
    var doubleLeftShape = new Shape.rect( 0, -ARROW_TOUCH_DILATION, doubleLeftArrowButton.width + ARROW_TOUCH_DILATION, doubleLeftArrowButton.height + 2 * ARROW_TOUCH_DILATION );
    doubleLeftArrowButton.touchArea = doubleLeftShape;

    //Do not allow the user to apply a force that would take the object beyond its maximum velocity
    Property.multilink( [ model.appliedForceProperty, model.speedClassificationProperty, model.stackSizeProperty ], function( appliedForce, speedClassification, stackSize ) {
      var enableButtons = ( stackSize > 0 && (speedClassification === 'LEFT_SPEED_EXCEEDED' ? false : appliedForce > -500 ) );
      leftArrowButton.enabled = enableButtons;
      doubleLeftArrowButton.enabled = enableButtons;
    } );
    this.addChild( doubleLeftArrowButton );
    this.addChild( leftArrowButton );

    //Show right arrow button 'tweaker' to change the applied force in increments of 50
    var doubleRightArrowButton = new ArrowButton( 'right', function() {
      model.appliedForceProperty.set( Math.min( model.appliedForceProperty.get() + 50, 500 ) );
    }, {
      left: this.textPanelNode.right + 6,
      centerY: this.textPanelNode.centerY,
      numberOfArrows: 2,
      arrowSpacing: BUTTON_ARROW_SPACING,
      arrowHeight: BUTTON_ARROW_HEIGHT,
      arrowWidth: BUTTON_ARROW_WIDTH,
      tandem: tandem.createTandem( 'doubleRightArrowButton' )
    } );

    var rightArrowButton = new ArrowButton( 'right', function() {
      model.appliedForceProperty.set( Math.min( model.appliedForceProperty.get() + 1, 500 ) );
    }, {
      // xMargin: SINGLE_ARROW_X_MARGIN,
      // yMargin: SINGLE_ARROW_Y_MARGIN,
      left: doubleRightArrowButton.right + 6,
      centerY: this.textPanelNode.centerY,
      arrowHeight: BUTTON_ARROW_HEIGHT, // from tip to base
      arrowWidth: BUTTON_ARROW_WIDTH, // width of base
      tandem: tandem.createTandem( 'rightArrowButton' )
    } );

    var doubleRightShape = new Shape.rect( -ARROW_TOUCH_DILATION, -ARROW_TOUCH_DILATION, doubleLeftArrowButton.width + ARROW_TOUCH_DILATION, doubleLeftArrowButton.height + 2 * ARROW_TOUCH_DILATION );
    doubleRightArrowButton.touchArea = doubleRightShape;

    //Do not allow the user to apply a force that would take the object beyond its maximum velocity
    Property.multilink( [ model.appliedForceProperty, model.speedClassificationProperty, model.stackSizeProperty ], function( appliedForce, speedClassification, stackSize ) {
      var enableButtons = ( stackSize > 0 && (speedClassification === 'RIGHT_SPEED_EXCEEDED' ? false : appliedForce < 500 ) );
      doubleRightArrowButton.enabled = enableButtons;
      rightArrowButton.enabled = enableButtons;
    } );
    this.addChild( rightArrowButton );
    this.addChild( doubleRightArrowButton );

    model.stack.lengthProperty.link( disableText( appliedForceSliderTextNode ) );
    model.stack.lengthProperty.link( disableText( readoutTextNode ) );
    model.stack.lengthProperty.link( function( length ) { appliedForceSlider.enabled = length > 0; } );

    //Create the speedometer.  Specify the location after construction so we can set the 'top'
    var speedometerNode = new SpeedometerNode( model.velocityProperty, model.showSpeedProperty, model.showValuesProperty,
      tandem.createTandem( 'speedometerNode' ), {
        // x: width / 2, // see comments about tween code below
        x: 300,
        top: 8
      } );

    // Due to the addition of the acceleration readout, vertical space above the stack is more limited.  We are trying
    // out a new layout where the accelerometer and speedometer are always to the left of the stack.
    // See https://github.com/phetsims/forces-and-motion-basics/issues/153
    // TODO: Keeping this code until we verify that this is acceptable behavior. Remove this code once verified.
    //Move away from the stack if the stack getting too high.  No need to record this in the model since it will always be caused deterministically by the model.
    //Use Tween.JS to smoothly animate
    // var itemsCenteredProperty = new Property( true );
    // var stackHeightThreshold = 160;
    // model.stack.lengthProperty.link( function() {

    //   //Move both the accelerometer and speedometer if the stack is getting too high, based on the height of items in the stack
    //   if ( motionView.stackHeight > stackHeightThreshold && itemsCenteredProperty.value ) {
    //     itemsCenteredProperty.value = false;
    //     new TWEEN.Tween( speedometerNode ).to( { centerX: 300 }, 400 ).easing( TWEEN.Easing.Cubic.InOut ).start(phet.joist.elapsedTime);
    //     if ( accelerometerNode ) {
    //       new TWEEN.Tween( accelerometerWithTickLabels ).to( { centerX: 300 }, 400 ).easing( TWEEN.Easing.Cubic.InOut ).start(phet.joist.elapsedTime);
    //     }
    //   }
    //   else if ( motionView.stackHeight <= stackHeightThreshold && !itemsCenteredProperty.value ) {
    //     itemsCenteredProperty.value = true;

    //     new TWEEN.Tween( speedometerNode ).to( { x: width / 2 }, 400 ).easing( TWEEN.Easing.Cubic.InOut ).start(phet.joist.elapsedTime);
    //     if ( accelerometerNode ) {
    //       new TWEEN.Tween( accelerometerWithTickLabels ).to( { centerX: width / 2 }, 400 ).easing( TWEEN.Easing.Cubic.InOut ).start(phet.joist.elapsedTime);
    //     }
    //   }
    // } );
    this.addChild( speedometerNode );

    //Create and add the control panel
    var controlPanel = new MotionControlPanel( model, tandem.createTandem( 'controlPanel' ) );
    this.addChild( controlPanel );

    // create the play, pause, and step buttons
    var playPauseButton = new PlayPauseButton( model.playProperty, {
      radius: 18,
      tandem: tandem.createTandem( 'playPauseButton' )
    } );
    var stepForwardButton = new StepForwardButton( {
      playingProperty: model.playProperty,
      listener: function() { model.manualStep(); },
      radius: 18,
      tandem: tandem.createTandem( 'stepForwardButton' )
    } );

    // Make the Play/Pause button bigger when it is showing the pause button, see #298
    var pauseSizeIncreaseFactor = 1.28;
    model.playProperty.lazyLink( function( isPlaying ) {
      playPauseButton.scale( isPlaying ? ( 1 / pauseSizeIncreaseFactor ) : pauseSizeIncreaseFactor );
    } );

    // play, step, and reset buttons in an HBox aligned left bottom under the control panel
    var playPauseVerticalOffset = 35;
    var playPauseStepHBox = new HBox( {
      children: [ playPauseButton, stepForwardButton ],
      spacing: PLAY_PAUSE_BUFFER,
      resize: false,
      leftCenter: controlPanel.leftBottom.plusXY( 0, playPauseVerticalOffset )
    } );
    this.addChild( playPauseStepHBox );

    //Reset all button goes beneath the control panel.  Not a closure variable since API access is required.
    //TODO: Is that OK? or should we invest dynamic search/lookups to keep as closure var?
    this.resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
      },
      radius: 23,
      rightCenter: controlPanel.rightBottom.plusXY( 0, playPauseVerticalOffset ),
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( this.resetAllButton );

    // i18n - if the play control buttons are too close to reset all, they should be separated
    if ( playPauseStepHBox.right > this.resetAllButton.left - PLAY_PAUSE_BUFFER ) {
      playPauseStepHBox.leftCenter = controlPanel.leftBottom.plusXY( -2 * PLAY_PAUSE_BUFFER, playPauseVerticalOffset );
    }

    //Add the accelerometer, if on the final screen
    if ( model.accelerometer ) {

      var accelerometerNode = new AccelerometerNode( model.accelerationProperty, tandem.createTandem( 'accelerometerNode' ) );

      // build up the string label for the acceleration
      var labelString = StringUtils.format( pattern0Name1ValueUnitsAccelerationString, accelerationString, model.accelerationProperty.value );
      var labelText = new RichText( labelString, {
        font: new PhetFont( 18 ),
        supScale: 0.60,
        supYOffset: 2,
        maxWidth: accelerometerNode.width * 3 / 2
      } );

      // create the tick labels
      var tickLabel = function( label, tick ) {
        return new Text( label, {
          pickable: false,
          font: new PhetFont( 16 ),
          centerX: tick.centerX,
          top: tick.bottom + 27,
          tandem: tandem.createTandem( 'tickLabelTextNode_' + label )
        } );
      };
      var tickLabels = new Node( {
        tandem: tandem.createTandem( 'tickLabels' ),
        children: [
          tickLabel( '-20', accelerometerNode.ticks[ 0 ] ),
          tickLabel( '0', accelerometerNode.ticks[ 2 ] ),
          tickLabel( '20', accelerometerNode.ticks[ 4 ] )
        ]
      } );

      // put it all together in a VBox
      var accelerometerWithTickLabels = new Node( {
        tandem: tandem.createTandem( 'accelerometerWithTickLabels' ),
        children: [ labelText, accelerometerNode, tickLabels ],
        pickable: false,
        centerX: 300,
        y: 170
      } );
      labelText.bottom = accelerometerNode.top;
      tickLabels.top = accelerometerNode.bottom;
      model.showAccelerationProperty.linkAttribute( accelerometerWithTickLabels, 'visible' );

      this.addChild( accelerometerWithTickLabels );

      // whenever showValues and accleration changes, update the label text
      var initialLabelWidth = labelText.width;
      Property.multilink( [ model.showValuesProperty, model.accelerationProperty ], function( showValues, acceleration ) {
        if ( showValues ) {
          var accelerationValue = Util.toFixed( acceleration, 2 );
          labelText.setText( StringUtils.format( pattern0Name1ValueUnitsAccelerationString, accelerationString, accelerationValue ) );

          // Make sure that the acceleration readout does not shift as the value changes by compensating for the change
          // in width.
          labelText.centerX = accelerometerNode.centerX + ( labelText.width - initialLabelWidth ) / 2 - 10;
        }
        else {
          labelText.setText( accelerationString );
          labelText.centerX = accelerometerNode.centerX;
        }

        // accelerometer and speedometer are always to the left of the stack now
        // TODO: Remove this code once this layout change is verified.
        // see comments about tween code above.
        // if( motionView.stackHeight > stackHeightThreshold ) {
        //   accelerometerWithTickLabels.centerX = 300;
        // }
        // else if ( motionView.stackHeight <= stackHeightThreshold ) {
        //   accelerometerWithTickLabels.centerX = width / 2;
        // }
      } );
    }

    // Map the items to their correct toolbox, one of left or right, corresponding to the side of the screen that
    // toolbox is sitting on.
    //var getItemToolbox = function( item ) {
    //   the fridge and the crates both go in hte left toolbox
    //if ( item.name === 'fridge' || item.name === 'crate1' || item.name === 'crate2' ) {
    //  return leftItemToolboxNode;
    //}
    //else {
    //  return rightItemToolboxNode;
    //}
    //};
    // Map the items to their correct toolbox, one of left or right, corresponding to the side of the screen that
    // toolbox is sitting on.
    var getItemSide = function( item ) {
      // the fridge and the crates both go in hte left toolbox
      if ( item.name === 'fridge' || item.name === 'crate1' || item.name === 'crate2' ) {
        return 'left';
      }
      else {
        return 'right';
      }
    };

    // get the accessible description for the item
    var getAccessibleDescription = function( item ) {
      return 'Please implement the "getAccessibleDescription" function';
    };

    //Iterate over the items in the model and create and add nodes for each one
    var leftItemLayer = new Node( { tandem: tandem.createTandem( 'leftItemLayer' ) } );
    var rightItemLayer = new Node( { tandem: tandem.createTandem( 'rightItemLayer' ) } );
    this.itemNodes = [];
    for ( var i = 0; i < model.items.length; i++ ) {
      var item = model.items[ i ];
      var itemSide = getItemSide( item );
      var toolBoxNode = itemSide === 'left' ? leftItemToolboxNode : rightItemToolboxNode;
      var itemLayer = itemSide === 'left' ? leftItemLayer : rightItemLayer;
      var accessibleDescription = getAccessibleDescription();
      var Constructor = item.bucket ? WaterBucketNode : ItemNode;
      var itemNode = new Constructor( model, self, item,
        item.image,
        item.sittingImage || item.image,
        item.holdingImage || item.image,
        model.showMassesProperty,
        toolBoxNode,
        accessibleDescription,
        tandem.createTandem( item.name ) );
      this.itemNodes.push( itemNode );

      // TODO: This should be removed once the layout of items has gone through review.
      if ( DEBUG && item.name === 'fridge' ) {
        // create a line at the bottom of the fridge to assist with layout
        var debugLine = new Line( 0, itemNode.bottom, this.layoutBounds.width, itemNode.bottom, { stroke: 'red' } );
        self.addChild( debugLine );
      }

      //Provide a reference from the item model to its view so that view dimensions can be looked up easily
      item.view = itemNode;
      itemLayer.addChild( itemNode );
    }

    leftItemToolboxNode.addChild( leftItemLayer );
    rightItemToolboxNode.addChild( rightItemLayer );

    //Add the force arrows & associated readouts in front of the items
    var arrowScale = 0.3;

    //Round the forces so that the sum is correct in the display, see https://github.com/phetsims/forces-and-motion-basics/issues/72 and  https://github.com/phetsims/forces-and-motion-basics/issues/74
    var roundedAppliedForceProperty = new DerivedProperty(
      [ model.appliedForceProperty ],
      function( appliedForce ) {
        return Util.roundSymmetric( appliedForce );
      } );
    var roundedFrictionForceProperty = new DerivedProperty(
      [ model.frictionForceProperty ],
      function( frictionForce ) {
        return Util.roundSymmetric( frictionForce );
      } );

    //Only update the sum force arrow after both friction and applied force changed, so we don't get partial updates, see https://github.com/phetsims/forces-and-motion-basics/issues/83
    var roundedSumProperty = new Property( roundedAppliedForceProperty.get() + roundedFrictionForceProperty.get(), {
      tandem: tandem.createTandem( 'roundedSumProperty' ),
      phetioValueType: TNumber( { units: 'newtons' } )
    } );

    model.stepEmitter.addListener( function() {
      roundedSumProperty.set( roundedAppliedForceProperty.get() + roundedFrictionForceProperty.get() );
    } );

    this.sumArrow = new ReadoutArrow( sumOfForcesString, '#96c83c', this.layoutBounds.width / 2, 225, roundedSumProperty, model.showValuesProperty,
      tandem.createTandem( 'sumArrow' ), {
        labelPosition: 'top',
        arrowScale: arrowScale
      } );
    this.sumOfForcesText = new Text( sumOfForcesEqualsZeroString, {
      pickable: false,
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      centerX: width / 2,
      y: 195,
      maxWidth: 125,
      tandem: tandem.createTandem( 'sumOfForcesTextNode' )
    } );

    //If the (rounded) sum of forces arrow is zero, then show the text "Sum of Forces = 0", see #76
    new DerivedProperty( [ model.showSumOfForcesProperty, roundedSumProperty ],
      function( showSumOfForces, sumOfForces ) {
        return showSumOfForces && sumOfForces === 0;
      } ).linkAttribute( self.sumOfForcesText, 'visible' );
    this.appliedForceArrow = new ReadoutArrow( appliedForceString, '#e66e23', this.layoutBounds.width / 2, 280, roundedAppliedForceProperty, model.showValuesProperty,
      tandem.createTandem( 'appliedForceArrow' ), {
        labelPosition: 'side',
        arrowScale: arrowScale
      } );
    this.frictionArrow = new ReadoutArrow( frictionForceString, 'red', this.layoutBounds.width / 2, 280, roundedFrictionForceProperty, model.showValuesProperty,
      tandem.createTandem( 'frictionArrow' ), {
        labelPosition: 'side',
        arrowScale: arrowScale
      } );

    // toolboxes and their children should be in front of all above items
    // contain the toolboxes in a parent node so that we can easily change the z-order of each toolbox.  This way
    // items of the right toolbox will not be layered in front of items of left toolbox items
    var toolBoxContainer = new Node( { tandem: tandem.createTandem( 'toolBoxContainer' ) } );
    toolBoxContainer.addChild( leftItemToolboxNode );
    toolBoxContainer.addChild( rightItemToolboxNode );
    this.addChild( toolBoxContainer );

    // add the force arrows, which should be in front of all items and pusher
    this.addChild( this.sumArrow );
    this.addChild( this.appliedForceArrow );
    this.addChild( this.frictionArrow );
    this.addChild( this.sumOfForcesText );

    //Whichever arrow is smaller should be in front (in z-ordering)
    var frictionLargerProperty = new DerivedProperty( [ roundedAppliedForceProperty, roundedFrictionForceProperty ],
      function( roundedAppliedForce, roundedFrictionForce ) {
        return Math.abs( roundedFrictionForce ) > Math.abs( roundedAppliedForce );
      } );
    frictionLargerProperty.link( function( frictionLarger ) {
      var node = frictionLarger ? self.appliedForceArrow : self.frictionArrow;
      node.moveToFront();
    } );

    //On the motion screens, when the 'Friction' label overlaps the force vector it should be displaced vertically
    Property.multilink( [ model.appliedForceProperty, model.frictionForceProperty ], function( appliedForce, frictionForce ) {
      var sameDirection = (appliedForce < 0 && frictionForce < 0) || (appliedForce > 0 && frictionForce > 0);
      self.frictionArrow.overlapsOther = sameDirection;
      self.frictionArrow.labelPosition = sameDirection ? 'bottom' : 'side';

      // the applied force arrow must be updated directly since its label position doesn't change
      self.appliedForceArrow.overlapsOther = sameDirection;
      self.appliedForceArrow.update();
    } );

    model.showForceProperty.linkAttribute( this.appliedForceArrow, 'visible' );
    model.showForceProperty.linkAttribute( this.frictionArrow, 'visible' );
    model.showSumOfForcesProperty.linkAttribute( this.sumArrow, 'visible' );

    //After the view is constructed, move one of the blocks to the top of the stack.
    model.viewInitialized( this );

    // set the navigation order for this screen
    this.accessibleOrder = [ leftItemToolboxNode, rightItemToolboxNode ];
  }

  forcesAndMotionBasics.register( 'MotionScreenView', MotionScreenView );

  return inherit( ScreenView, MotionScreenView, {

    //Get the height of the objects in the stack (doesn't include skateboard)
    get stackHeight() {
      var sum = 0;
      for ( var i = 0; i < this.model.stack.length; i++ ) {
        sum = sum + this.model.stack.get( i ).view.height;
      }
      return sum;
    },

    //Find the top of the stack, so that a new object can be placed on top
    get topOfStack() {
      var n = this.model.skateboard ? 334 : 360;
      return n - this.stackHeight;
    },

    //Get the size of an item's image.  Dependent on the current scale of the image.
    getSize: function( item ) {
      // get the current scale for the element and apply it to the image
      var scaledWidth = item.view.sittingImage.width * item.getCurrentScale();
      return { width: scaledWidth, height: item.view.height };
    }
  } );
} );
