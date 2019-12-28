// Copyright 2013-2019, University of Colorado Boulder

/**
 * Main scenery view for the Motion, Friction and Acceleration screens.
 */
define( require => {
  'use strict';

  // modules
  const AccelerometerNode = require( 'FORCES_AND_MOTION_BASICS/motion/view/AccelerometerNode' );
  const AppliedForceSlider = require( 'FORCES_AND_MOTION_BASICS/motion/view/AppliedForceSlider' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const FineCoarseSpinner = require( 'SCENERY_PHET/FineCoarseSpinner' );
  const forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  const ForcesAndMotionBasicsLayoutBounds = require( 'FORCES_AND_MOTION_BASICS/common/view/ForcesAndMotionBasicsLayoutBounds' );
  const ForcesAndMotionBasicsQueryParameters = require( 'FORCES_AND_MOTION_BASICS/common/ForcesAndMotionBasicsQueryParameters' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const Image = require( 'SCENERY/nodes/Image' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ItemNode = require( 'FORCES_AND_MOTION_BASICS/motion/view/ItemNode' );
  const LinearGradient = require( 'SCENERY/util/LinearGradient' );
  const MotionControlPanel = require( 'FORCES_AND_MOTION_BASICS/motion/view/MotionControlPanel' );
  const MovingBackgroundNode = require( 'FORCES_AND_MOTION_BASICS/motion/view/MovingBackgroundNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const PlayPauseButton = require( 'SCENERY_PHET/buttons/PlayPauseButton' );
  const Property = require( 'AXON/Property' );
  const PusherNode = require( 'FORCES_AND_MOTION_BASICS/motion/view/PusherNode' );
  const Range = require( 'DOT/Range' );
  const ReadoutArrow = require( 'FORCES_AND_MOTION_BASICS/common/view/ReadoutArrow' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const SpeedometerNode = require( 'FORCES_AND_MOTION_BASICS/motion/view/SpeedometerNode' );
  const StepForwardButton = require( 'SCENERY_PHET/buttons/StepForwardButton' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const sumOfForcesString = require( 'string!FORCES_AND_MOTION_BASICS/sumOfForces' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );
  const WaterBucketNode = require( 'FORCES_AND_MOTION_BASICS/motion/view/WaterBucketNode' );

  // constants
  const PLAY_PAUSE_BUFFER = 10; // separation between step and reset all button, usedful for i18n

  // images
  const skateboardImage = require( 'image!FORCES_AND_MOTION_BASICS/skateboard.png' );

  // strings
  const accelerationString = require( 'string!FORCES_AND_MOTION_BASICS/acceleration' );
  const appliedForceString = require( 'string!FORCES_AND_MOTION_BASICS/appliedForce' );
  const frictionForceString = require( 'string!FORCES_AND_MOTION_BASICS/frictionForce' );
  const pattern0Name1ValueUnitsAccelerationString = require( 'string!FORCES_AND_MOTION_BASICS/pattern.0name.1valueUnitsAcceleration' );
  const pattern0ValueUnitsNewtonsString = require( 'string!FORCES_AND_MOTION_BASICS/pattern.0valueUnitsNewtons' );
  const sumOfForcesEqualsZeroString = require( 'string!FORCES_AND_MOTION_BASICS/sumOfForcesEqualsZero' );

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
    ScreenView.call( this, {
      layoutBounds: ForcesAndMotionBasicsLayoutBounds,
      tandem: tandem
    } );

    //Variables for this constructor, for convenience
    const self = this;
    const width = this.layoutBounds.width;
    const height = this.layoutBounds.height;

    //Constants
    const skyHeight = 362;
    const groundHeight = height - skyHeight;

    //Create the static background
    const skyGradient = new LinearGradient( 0, 0, 0, skyHeight ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' );
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
    const boxHeight = 180;
    const showItemToolboxes = ForcesAndMotionBasicsQueryParameters.showItemToolboxes;
    const fill = showItemToolboxes ? '#e7e8e9' : null;
    const stroke = showItemToolboxes ? '#000000' : null;
    const leftItemToolboxNode = new Rectangle( 10, height - boxHeight - 10, 300, boxHeight, 10, 10, {
      fill: fill,
      stroke: stroke,
      lineWidth: 1,
      tandem: tandem.createTandem( 'leftItemToolboxNode' )
    } );
    const rightItemToolboxNode = new Rectangle( width - 10 - 300, height - boxHeight - 10, 300, boxHeight, 10, 10, {
      fill: fill,
      stroke: stroke,
      lineWidth: 1,
      tandem: tandem.createTandem( 'rightItemToolboxNode' )
    } );

    //Create the slider
    const disableText = function( node ) { return function( length ) {node.fill = length === 0 ? 'gray' : 'black';}; };

    const maxTextWidth = ( rightItemToolboxNode.left - leftItemToolboxNode.right ) - 10;
    const appliedForceSliderTextNode = new Text( appliedForceString, {
      font: new PhetFont( 22 ),
      centerX: width / 2,
      y: 430,
      maxWidth: maxTextWidth,
      tandem: tandem.createTandem( 'appliedForceSliderTextNode' )
    } );
    const appliedForceSlider = new AppliedForceSlider( model, new Range( -500, 500 ),
      tandem.createTandem( 'appliedForceSlider' ), {
        centerX: width / 2 + 1,
        y: 555
      } );

    this.addChild( appliedForceSliderTextNode );
    this.addChild( appliedForceSlider );

    // The range for the spinner will change depending on whether the stack has exceeded maximum speed. This will
    // most often be in cases where there is no friction, because the speed will remain at maximum values and we
    // do not want to allow additional applied force at that time
    const spinnerRange = new Range( -500, 500 );

    // Do not allow the user to apply a force that would take the object beyond its maximum velocity
    Property.lazyMultilink( [ model.appliedForceProperty, model.speedClassificationProperty, model.stackSizeProperty ], function( appliedForce, speedClassification, stackSize ) {

      const enableRightButtons = ( stackSize > 0 && ( speedClassification !== 'RIGHT_SPEED_EXCEEDED' ) );
      spinnerRange.max = enableRightButtons ? 500 : 0;

      const enableLeftButtons = ( stackSize > 0 && ( speedClassification !== 'LEFT_SPEED_EXCEEDED' ) );
      spinnerRange.min = enableLeftButtons ? -500 : 0;
    } );

    const appliedForceSpinner = new FineCoarseSpinner( model.appliedForceProperty, {
      numberDisplayOptions: {
        font: new PhetFont( 22 ),
        valuePattern: pattern0ValueUnitsNewtonsString,

        align: 'center',
        xMargin: 20,
        yMargin: 4,
        numberMaxWidth: maxTextWidth / 3
      },

      range: spinnerRange,

      deltaFine: 1,
      deltaCoarse: 50,

      spacing: 6,
      centerBottom: new Vector2( width / 2, appliedForceSlider.top - 12 ),

      tandem: tandem.createTandem( 'appliedForceSpinner' )
    } );

    this.addChild( appliedForceSpinner );

    // force cannot be applied when there is nothing on the stack
    model.stackSizeProperty.link( function( size ) {
      appliedForceSpinner.enabled = size > 0;
    } );

    model.stack.lengthProperty.link( disableText( appliedForceSliderTextNode ) );
    model.stack.lengthProperty.link( function( length ) { appliedForceSlider.enabled = length > 0; } );

    //Create the speedometer.  Specify the location after construction so we can set the 'top'
    const speedometerNode = new SpeedometerNode( model.speedProperty, model.showSpeedProperty, model.showValuesProperty,
      tandem.createTandem( 'speedometerNode' ), {
        x: 300,
        top: 8
      } );

    this.addChild( speedometerNode );

    //Create and add the control panel
    const controlPanel = new MotionControlPanel( model, tandem.createTandem( 'controlPanel' ) );
    this.addChild( controlPanel );

    // create the play, pause, and step buttons
    const playPauseButton = new PlayPauseButton( model.playProperty, {
      radius: 18,
      scaleFactorWhenPaused: 1.28,
      tandem: tandem.createTandem( 'playPauseButton' )
    } );
    const stepForwardButton = new StepForwardButton( {
      isPlayingProperty: model.playProperty,
      listener: function() { model.manualStep(); },
      radius: 18,
      tandem: tandem.createTandem( 'stepForwardButton' )
    } );

    // play, step, and reset buttons in an HBox aligned left bottom under the control panel
    const playPauseVerticalOffset = 35;
    const playPauseStepHBox = new HBox( {
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

      const accelerometerNode = new AccelerometerNode( model.accelerationProperty, tandem.createTandem( 'accelerometerNode' ) );

      // build up the string label for the acceleration
      const labelString = StringUtils.format( pattern0Name1ValueUnitsAccelerationString, accelerationString, model.accelerationProperty.value );
      const labelText = new RichText( labelString, {
        font: new PhetFont( 18 ),
        supScale: 0.60,
        supYOffset: 2,
        maxWidth: accelerometerNode.width * 3 / 2
      } );

      // create the tick labels
      const tickLabel = function( label, tick, tandemID ) {
        return new Text( label, {
          pickable: false,
          font: new PhetFont( 16 ),
          centerX: tick.centerX,
          top: tick.bottom + 27,
          tandem: tandem.createTandem( 'tickLabelTextNode' + tandemID )
        } );
      };
      const tickLabels = new Node( {
        tandem: tandem.createTandem( 'tickLabels' ),
        children: [
          tickLabel( '-20', accelerometerNode.ticks[ 0 ], 'Negative20' ),
          tickLabel( '0', accelerometerNode.ticks[ 2 ], 'Zero' ),
          tickLabel( '20', accelerometerNode.ticks[ 4 ], 'Positive20' )
        ]
      } );

      // put it all together in a VBox
      const accelerometerWithTickLabels = new Node( {
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
      const initialLabelWidth = labelText.width;
      Property.multilink( [ model.showValuesProperty, model.accelerationProperty ], function( showValues, acceleration ) {
        if ( showValues ) {
          const accelerationValue = Util.toFixed( acceleration, 2 );
          labelText.setText( StringUtils.format( pattern0Name1ValueUnitsAccelerationString, accelerationString, accelerationValue ) );

          // Make sure that the acceleration readout does not shift as the value changes by compensating for the change
          // in width.
          labelText.centerX = accelerometerNode.centerX + ( labelText.width - initialLabelWidth ) / 2 - 10;
        }
        else {
          labelText.setText( accelerationString );
          labelText.centerX = accelerometerNode.centerX;
        }
      } );
    }

    // Map the items to their correct toolbox, one of left or right, corresponding to the side of the screen that
    // toolbox is sitting on.
    const getItemSide = function( item ) {
      // the fridge and the crates both go in hte left toolbox
      if ( item.name === 'fridge' || item.name === 'crate1' || item.name === 'crate2' ) {
        return 'left';
      }
      else {
        return 'right';
      }
    };

    //Iterate over the items in the model and create and add nodes for each one
    const leftItemLayer = new Node( { tandem: tandem.createTandem( 'leftItemLayer' ) } );
    const rightItemLayer = new Node( { tandem: tandem.createTandem( 'rightItemLayer' ) } );
    this.itemNodes = [];
    for ( let i = 0; i < model.items.length; i++ ) {
      const item = model.items[ i ];
      const itemSide = getItemSide( item );
      const toolboxNode = itemSide === 'left' ? leftItemToolboxNode : rightItemToolboxNode;
      const itemLayer = itemSide === 'left' ? leftItemLayer : rightItemLayer;
      const Constructor = item.bucket ? WaterBucketNode : ItemNode;
      const itemNode = new Constructor( model, self, item,
        item.image,
        item.sittingImage || item.image,
        item.holdingImage || item.image,
        model.showMassesProperty,
        toolboxNode,
        tandem.createTandem( item.name ) );
      this.itemNodes.push( itemNode );

      //Provide a reference from the item model to its view so that view dimensions can be looked up easily
      item.view = itemNode;
      itemLayer.addChild( itemNode );
    }

    leftItemToolboxNode.addChild( leftItemLayer );
    rightItemToolboxNode.addChild( rightItemLayer );

    //Add the force arrows & associated readouts in front of the items
    const arrowScale = 0.3;

    //Round the forces so that the sum is correct in the display, see https://github.com/phetsims/forces-and-motion-basics/issues/72 and  https://github.com/phetsims/forces-and-motion-basics/issues/74
    const roundedAppliedForceProperty = new DerivedProperty(
      [ model.appliedForceProperty ],
      function( appliedForce ) {
        return Util.roundSymmetric( appliedForce );
      } );
    const roundedFrictionForceProperty = new DerivedProperty(
      [ model.frictionForceProperty ],
      function( frictionForce ) {
        return Util.roundSymmetric( frictionForce );
      } );

    //Only update the sum force arrow after both friction and applied force changed, so we don't get partial updates, see https://github.com/phetsims/forces-and-motion-basics/issues/83
    const roundedSumProperty = new NumberProperty( roundedAppliedForceProperty.get() + roundedFrictionForceProperty.get(), {
      tandem: tandem.createTandem( 'roundedSumProperty' ),
      units: 'N'
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
    const toolboxContainer = new Node( { tandem: tandem.createTandem( 'toolboxContainer' ) } );
    toolboxContainer.addChild( leftItemToolboxNode );
    toolboxContainer.addChild( rightItemToolboxNode );
    this.addChild( toolboxContainer );

    // add the force arrows, which should be in front of all items and pusher
    this.addChild( this.sumArrow );
    this.addChild( this.appliedForceArrow );
    this.addChild( this.frictionArrow );
    this.addChild( this.sumOfForcesText );

    //Whichever arrow is smaller should be in front (in z-ordering)
    const frictionLargerProperty = new DerivedProperty( [ roundedAppliedForceProperty, roundedFrictionForceProperty ],
      function( roundedAppliedForce, roundedFrictionForce ) {
        return Math.abs( roundedFrictionForce ) > Math.abs( roundedAppliedForce );
      } );
    frictionLargerProperty.link( function( frictionLarger ) {
      const node = frictionLarger ? self.appliedForceArrow : self.frictionArrow;
      node.moveToFront();
    } );

    //On the motion screens, when the 'Friction' label overlaps the force vector it should be displaced vertically
    Property.multilink( [ model.appliedForceProperty, model.frictionForceProperty ], function( appliedForce, frictionForce ) {
      const sameDirection = ( appliedForce < 0 && frictionForce < 0 ) || ( appliedForce > 0 && frictionForce > 0 );
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
  }

  forcesAndMotionBasics.register( 'MotionScreenView', MotionScreenView );

  return inherit( ScreenView, MotionScreenView, {

    //Get the height of the objects in the stack (doesn't include skateboard)
    get stackHeight() {
      let sum = 0;
      for ( let i = 0; i < this.model.stack.length; i++ ) {
        sum = sum + this.model.stack.get( i ).view.height;
      }
      return sum;
    },

    //Find the top of the stack, so that a new object can be placed on top
    get topOfStack() {
      const n = this.model.skateboard ? 334 : 360;
      return n - this.stackHeight;
    },

    //Get the size of an item's image.  Dependent on the current scale of the image.
    getSize: function( item ) {
      // get the current scale for the element and apply it to the image
      const scaledWidth = item.view.sittingImage.width * item.getCurrentScale();
      return { width: scaledWidth, height: item.view.height };
    }
  } );
} );
