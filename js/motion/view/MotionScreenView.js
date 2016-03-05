// Copyright 2013-2015, University of Colorado Boulder

/**
 * Main scenery view for the Motion, Friction and Acceleration screens.
 */
define( function( require ) {
  'use strict';

  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var PlayPauseButton = require( 'SCENERY_PHET/buttons/PlayPauseButton' );
  var StepButton = require( 'SCENERY_PHET/buttons/StepButton' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Text = require( 'SCENERY/nodes/Text' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );
  var VBox = require( 'SCENERY/nodes/VBox' );
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
  var ArrowButton = require( 'SCENERY_PHET/buttons/ArrowButton' );
  var Util = require( 'DOT/Util' );
  var ItemToolboxNode = require( 'FORCES_AND_MOTION_BASICS/motion/view/ItemToolboxNode' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  // images
  var skateboardImage = require( 'image!FORCES_AND_MOTION_BASICS/skateboard.png' );

  // strings
  var motionDescriptionString = require( 'string!FORCES_AND_MOTION_BASICS/motion.description' );
  var motionInterfaceDescriptionString = require( 'string!FORCES_AND_MOTION_BASICS/motion.interface.description' );
  var motionLeftItemGroupDescriptionString = require( 'string!FORCES_AND_MOTION_BASICS/motion.leftItemGroup.description' );
  var motionRightItemGroupDescriptionString = require( 'string!FORCES_AND_MOTION_BASICS/motion.rightItemGroup.description' );
  var accelerationString = require( 'string!FORCES_AND_MOTION_BASICS/acceleration' );
  var pattern0Name1ValueUnitsAccelerationString = require( 'string!FORCES_AND_MOTION_BASICS/pattern.0name.1valueUnitsAcceleration' );
  var pattern0ValueUnitsNewtonsString = require( 'string!FORCES_AND_MOTION_BASICS/pattern.0valueUnitsNewtons' );

  /**
   * Constructor for the MotionScreenView
   * @param {MotionModel} model model for the entire screen
   * @constructor
   */
  function MotionScreenView( model ) {

    //Constants and fields
    this.model = model;

    //Call super constructor
    ScreenView.call( this, { layoutBounds: ForcesAndMotionBasicsLayoutBounds } );

    //Variables for this constructor, for convenience
    var motionView = this;
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
    this.addChild( new MovingBackgroundNode( model, this.layoutBounds.width / 2 ).mutate( { layerSplit: true } ) );

    //Add toolbox backgrounds for the objects
    var boxHeight = 180;
    var leftItemToolboxNode = new ItemToolboxNode( 10, height - boxHeight - 10, 300, boxHeight, 10, 10, 'left', {
      fill: '#e7e8e9',
      stroke: '#000000',
      lineWidth: 1,
      accessibleDescription: motionLeftItemGroupDescriptionString
    } );
    var rightItemToolboxNode = new ItemToolboxNode( width - 10 - 300, height - boxHeight - 10, 300, boxHeight, 10, 10, 'right', {
      fill: '#e7e8e9',
      stroke: '#000000',
      lineWidth: 1,
      accessibleDescription: motionRightItemGroupDescriptionString
    } );
    this.addChild( leftItemToolboxNode );
    this.addChild( rightItemToolboxNode );

    //Add the pusher
    this.addChild( new PusherNode( model, this.layoutBounds.width ) );

    //Add the skateboard if on the 'motion' screen
    if ( model.skateboard ) {
      this.addChild( new Image( skateboardImage, { centerX: width / 2, y: 315 + 12, pickable: false } ) );
    }

    //Create the slider
    var disableText = function( node ) { return function( length ) {node.fill = length === 0 ? 'gray' : 'black';}; };
    var disableLeftProperty = new DerivedProperty( [ model.fallenProperty, model.fallenDirectionProperty ], function( fallen, fallenDirection ) {
      return fallen && fallenDirection === 'left';
    } );
    var disableRightProperty = new DerivedProperty( [ model.fallenProperty, model.fallenDirectionProperty ], function( fallen, fallenDirection ) {
      return fallen && fallenDirection === 'right';
    } );

    var maxTextWidth = ( rightItemToolboxNode.left - leftItemToolboxNode.right ) - 10;
    var sliderLabel = new Text( appliedForceString, { font: new PhetFont( 22 ), centerX: width / 2, y: 430, maxWidth: maxTextWidth } );
    var slider = new AppliedForceSlider( model.appliedForceProperty, { min: -500, max: 500 }, model.speedClassificationProperty, disableLeftProperty, disableRightProperty, {
      centerX: width / 2 + 1,
      y: 555
    } );

    this.addChild( sliderLabel );
    this.addChild( slider );

    //Position the units to the right of the text box.
    var readout = new Text( '???', { font: new PhetFont( 22 ), pickable: false, maxWidth: maxTextWidth / 2 } );
    readout.bottom = slider.top - 15;
    model.appliedForceProperty.link( function( appliedForce ) {

      //Must match the other formatters below, see roundedAppliedForceProperty near the creation of the ReadoutArrows
      var roundedValue = Util.toFixed( Util.roundSymmetric( appliedForce ), 0 );
      var numberText = Util.toFixed( parseInt( roundedValue, 10 ), 0 );

      //Prevent -0 from appearing, see https://github.com/phetsims/forces-and-motion-basics/issues/70
      if ( numberText === '-0' ) { numberText = '0'; }
      readout.text = StringUtils.format( pattern0ValueUnitsNewtonsString, numberText );
      readout.centerX = width / 2;
    } );

    //Make 'Newtons Readout' stand out but not look like a text entry field
    this.textPanelNode = new Rectangle( 0, 0, readout.right - readout.left + 50, readout.height + 4, {
      fill: 'white',
      stroke: 'lightgrey',
      centerX: width / 2,
      centerY: readout.centerY,
      pickable: false
    } );
    this.addChild( this.textPanelNode );
    this.addChild( readout );

    //Show left arrow button 'tweaker' to change the applied force in increments of 50
    var leftArrowButton = new ArrowButton( 'left', function() {
      model.appliedForce = Math.max( model.appliedForce - 50, -500 );
    }, {
      rectangleYMargin: 7,
      rectangleXMargin: 10,
      right: this.textPanelNode.left - 6,
      centerY: this.textPanelNode.centerY
    } );

    //Do not allow the user to apply a force that would take the object beyond its maximum velocity
    model.multilink( [ 'appliedForce', 'speedClassification', 'stackSize' ], function( appliedForce, speedClassification, stackSize ) {
      leftArrowButton.enabled = ( stackSize > 0 && (speedClassification === 'LEFT_SPEED_EXCEEDED' ? false : appliedForce > -500 ) );
    } );
    this.addChild( leftArrowButton );

    //Show right arrow button 'tweaker' to change the applied force in increments of 50
    var rightArrowButton = new ArrowButton( 'right', function() {
      model.appliedForce = Math.min( model.appliedForce + 50, 500 );
    }, {
      left: this.textPanelNode.right + 6,
      centerY: this.textPanelNode.centerY
    } );

    //Do not allow the user to apply a force that would take the object beyond its maximum velocity
    model.multilink( [ 'appliedForce', 'speedClassification', 'stackSize' ], function( appliedForce, speedClassification, stackSize ) {
      rightArrowButton.enabled = ( stackSize > 0 && (speedClassification === 'RIGHT_SPEED_EXCEEDED' ? false : appliedForce < 500 ) );
    } );
    this.addChild( rightArrowButton );

    model.stack.lengthProperty.link( disableText( sliderLabel ) );
    model.stack.lengthProperty.link( disableText( readout ) );
    model.stack.lengthProperty.link( function( length ) { slider.enabled = length > 0; } );

    //Create the speedometer.  Specify the location after construction so we can set the 'top'
    var speedometerNode = new SpeedometerNode( model.velocityProperty, model.showSpeedProperty, model.showValuesProperty, {
      // x: width / 2, // see comments about tween code below
      x: 300,
      top: 2
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
    //     new TWEEN.Tween( speedometerNode ).to( { centerX: 300 }, 400 ).easing( TWEEN.Easing.Cubic.InOut ).start();
    //     if ( accelerometerNode ) {
    //       new TWEEN.Tween( accelerometerWithTickLabels ).to( { centerX: 300 }, 400 ).easing( TWEEN.Easing.Cubic.InOut ).start();
    //     }
    //   }
    //   else if ( motionView.stackHeight <= stackHeightThreshold && !itemsCenteredProperty.value ) {
    //     itemsCenteredProperty.value = true;

    //     new TWEEN.Tween( speedometerNode ).to( { x: width / 2 }, 400 ).easing( TWEEN.Easing.Cubic.InOut ).start();
    //     if ( accelerometerNode ) {
    //       new TWEEN.Tween( accelerometerWithTickLabels ).to( { centerX: width / 2 }, 400 ).easing( TWEEN.Easing.Cubic.InOut ).start();
    //     }
    //   }
    // } );
    this.addChild( speedometerNode );

    //Create and add the control panel
    var controlPanel = new MotionControlPanel( model );
    this.addChild( controlPanel );

    //Reset all button goes beneath the control panel.  Not a closure variable since API access is required.
    //TODO: Is that OK? or should we invest dynamic search/lookups to keep as closure var?
    var playPauseVerticalOffset = 16;
    this.resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
      },
      radius: 20,
      rightTop: controlPanel.rightBottom.plusXY( -7, playPauseVerticalOffset ) 
    } );
    this.addChild( this.resetAllButton );

    // create the play, pause, and step buttons
    var playPauseButton = new PlayPauseButton( model.playProperty, { radius: 18 } );
    var stepButton = new StepButton( function() { model.manualStep(); }, model.playProperty, { radius: 18 } );

    // Make the Play/Pause button bigger when it is showing the pause button, see #298
    var pauseSizeIncreaseFactor = 1.28;
      model.playProperty.lazyLink( function( isPlaying ) {
      playPauseButton.scale( isPlaying ? ( 1 / pauseSizeIncreaseFactor ) : pauseSizeIncreaseFactor );
    } );
   
    // play, step, and reset buttons in an HBox aligned left bottom under the control panel
    var playPauseStepHBox = new HBox( {
      children: [ playPauseButton, stepButton ],
      spacing: 10,
      resize: false,
      leftTop: controlPanel.leftBottom.plusXY( 7, playPauseVerticalOffset )
    } );
    this.addChild( playPauseStepHBox );

    //Add the accelerometer, if on the final screen
    if ( model.accelerometer ) {

      var accelerometerNode = new AccelerometerNode( model.accelerationProperty );

      // build up the string label for the acceleration
      var labelString = StringUtils.format( pattern0Name1ValueUnitsAccelerationString, accelerationString, model.accelerationProperty.value );
      var labelText = new SubSupText( labelString, { font: new PhetFont( 18 ), supScale: 0.60, supYOffset: 2, maxWidth: accelerometerNode.width * 3 / 2 } );

      // create the tick labels
      var tickLabel = function( label, tick ) {
        return new Text( label, {
          pickable: false,
          font: new PhetFont( 16 ),
          centerX: tick.centerX,
          top: tick.bottom + 27
        } );
      };
      var tickLabels = new Node( { children: [
        tickLabel( '-20', accelerometerNode.ticks[ 0 ] ),
        tickLabel( '0', accelerometerNode.ticks[ 2 ] ),
        tickLabel( '20', accelerometerNode.ticks[ 4 ] )
      ] } );

      // put it all together in a VBox
      var accelerometerWithTickLabels = new VBox( {
        children: [ labelText, accelerometerNode, tickLabels ],
        pickable: false,
        y: 145
      } );
      model.showAccelerationProperty.linkAttribute( accelerometerWithTickLabels, 'visible' );

      this.addChild( accelerometerWithTickLabels );

      // whenever showValues and accleration changes, update the label text
      model.multilink( [ 'showValues', 'acceleration' ], function( showValues, acceleration ) {
        if( showValues ) {
          var accelerationValue = Util.toFixed( acceleration, 1 );
          labelText.setText( StringUtils.format( pattern0Name1ValueUnitsAccelerationString, accelerationString, accelerationValue ) );
        }
        else {
          labelText.setText( accelerationString );
        }

        // fix layout of the accelerometer after text changes
        accelerometerWithTickLabels.centerX = 300;

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
    var leftItemLayer = new Node();
    var rightItemLayer = new Node();
    this.itemNodes = [];
    for ( var i = 0; i < model.items.length; i++ ) {
      var item = model.items[ i ];
      var itemSide = getItemSide( item );
      var toolBoxNode = itemSide === 'left' ? leftItemToolboxNode : rightItemToolboxNode;
      var itemLayer = itemSide === 'left' ? leftItemLayer : rightItemLayer;
      var accessibleDescription = getAccessibleDescription();
      var Constructor = item.bucket ? WaterBucketNode : ItemNode;
      var itemNode = new Constructor( model, motionView, item,
        item.image,
        item.sittingImage || item.image,
        item.holdingImage || item.image,
        model.showMassesProperty,
        toolBoxNode,
        accessibleDescription );
      this.itemNodes.push( itemNode );

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
    var roundedSumProperty = new Property( roundedAppliedForceProperty.get() + roundedFrictionForceProperty.get() );
    model.on( 'stepped', function() {
      roundedSumProperty.set( roundedAppliedForceProperty.get() + roundedFrictionForceProperty.get() );
    } );

    this.sumArrow = new ReadoutArrow( sumOfForcesString, '#96c83c', this.layoutBounds.width / 2, 225, roundedSumProperty, model.showValuesProperty, {
      labelPosition: 'top',
      arrowScale: arrowScale
    } );
    model.multilink( [ 'showForce', 'showSumOfForces' ], function( showForce, showSumOfForces ) {
      motionView.sumArrow.visible = showForce && showSumOfForces;
    } );
    this.sumOfForcesText = new Text( sumOfForcesEqualsZeroString, {
      pickable: false,
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      centerX: width / 2,
      y: 200,
      maxWidth: 125
    } );

    //If the (rounded) sum of forces arrow is zero, then show the text "Sum of Forces = 0", see #76
    new DerivedProperty( [ model.showForceProperty, model.showSumOfForcesProperty, roundedSumProperty ],
      function( showForce, showSumOfForces, sumOfForces ) {
        return showForce && showSumOfForces && sumOfForces === 0;
      } ).linkAttribute( motionView.sumOfForcesText, 'visible' );
    this.appliedForceArrow = new ReadoutArrow( appliedForceString, '#e66e23', this.layoutBounds.width / 2, 280, roundedAppliedForceProperty, model.showValuesProperty, {
      labelPosition: 'side',
      arrowScale: arrowScale
    } );
    this.frictionArrow = new ReadoutArrow( frictionForceString, 'red', this.layoutBounds.width / 2, 280, roundedFrictionForceProperty, model.showValuesProperty, {
      labelPosition: 'side',
      arrowScale: arrowScale
    } );
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
      var node = frictionLarger ? motionView.appliedForceArrow : motionView.frictionArrow;
      node.moveToFront();
    } );

    //On the motion screens, when the 'Friction' label overlaps the force vector it should be displaced vertically
    model.multilink( [ 'appliedForce', 'frictionForce' ], function( appliedForce, frictionForce ) {
      var sameDirection = (appliedForce < 0 && frictionForce < 0) || (appliedForce > 0 && frictionForce > 0);
      motionView.frictionArrow.labelPosition = sameDirection ? 'bottom' : 'side';
    } );

    model.showForceProperty.linkAttribute( this.appliedForceArrow, 'visible' );
    model.showForceProperty.linkAttribute( this.frictionArrow, 'visible' );

    //After the view is constructed, move one of the blocks to the top of the stack.
    model.viewInitialized( this );

    // Outfit this screen view with accessible content.
    this.accessibleContent = {
      createPeer: function( accessibleInstance ) {

        // TODO: This string is for an experimental feature which we are calling 'basic interface instructions'. It is
        // TODO: separate from the overall description, but read with the description on load.  It as to be part of the
        // TODO: label so it must be concatenated with the description string.  This is outside of ScreenView since
        // TODO: no other screens have this type of interface description yet.
        var onLoadString = motionDescriptionString + motionInterfaceDescriptionString;

        // generate the 'supertype peer' for the ScreenView in the parallel DOM.
        var accessiblePeer = ScreenView.ScreenViewAccessiblePeer( accessibleInstance, onLoadString );

        // create an element for action descriptions.  This element gets updated whenever the user moves a puller
        // and places it in a new location.
        var actionElement = document.createElement( 'p' );
        actionElement.innerText = '';
        actionElement.setAttribute( 'aria-live', 'polite' );
        actionElement.id = 'motionActionElement';
        accessiblePeer.domElement.appendChild( actionElement );

        // on load, the screen view should be in the accessible order to provide an overall description of the sim
        accessiblePeer.domElement.tabIndex = '0';

        accessiblePeer.domElement.addEventListener( 'blur', function() {
          accessiblePeer.domElement.tabIndex = '-1';
        } );

        // add a global event listener to all children of this screen view, bubbles through all children
        accessiblePeer.domElement.addEventListener( 'keydown', function( event ) {
          // 'global' event behavior in here...

          // when the user presses 'm' we want the AT to read off the sim state.
          //if( event.keyCode === )
        } );

        return accessiblePeer;
      }
    };

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
      var n = this.model.skateboard ? 335 : 360;
      return n - this.stackHeight;
    },

    //Get the size of an item's image.  Dependent on the current scale of the image. 
    getSize: function( item ) {
      // get the current scale for the element and apply it to the image
      var scaledWidth = item.view.normalImageNode.width * item.getCurrentScale();
      return { width: scaledWidth, height: item.view.height };
    }
  } );
} );
