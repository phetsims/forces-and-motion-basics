// Copyright 2013-2024, University of Colorado Boulder

/**
 * Main scenery view for the Motion, Friction and Acceleration screens.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import FineCoarseSpinner from '../../../../scenery-phet/js/FineCoarseSpinner.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import StopwatchNode from '../../../../scenery-phet/js/StopwatchNode.js';
import TimeControlNode from '../../../../scenery-phet/js/TimeControlNode.js';
import { Image, LinearGradient, Node, Rectangle, RichText, Text } from '../../../../scenery/js/imports.js';
import skateboard_png from '../../../images/skateboard_png.js';
import ForcesAndMotionBasicsQueryParameters from '../../common/ForcesAndMotionBasicsQueryParameters.js';
import ForcesAndMotionBasicsLayoutBounds from '../../common/view/ForcesAndMotionBasicsLayoutBounds.js';
import ReadoutArrow from '../../common/view/ReadoutArrow.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';
import AccelerometerNode from './AccelerometerNode.js';
import AppliedForceSlider from './AppliedForceSlider.js';
import ItemNode from './ItemNode.js';
import MotionControlPanel from './MotionControlPanel.js';
import MovingBackgroundNode from './MovingBackgroundNode.js';
import PusherNode from './PusherNode.js';
import SpeedometerNode from './SpeedometerNode.js';
import WaterBucketNode from './WaterBucketNode.js';

const sumOfForcesString = ForcesAndMotionBasicsStrings.sumOfForces;

// constants
const PLAY_PAUSE_BUFFER = 10; // separation between step and reset all button, usedful for i18n

// strings
const accelerationString = ForcesAndMotionBasicsStrings.acceleration;
const appliedForceStringProperty = ForcesAndMotionBasicsStrings.appliedForceStringProperty;
const frictionForceStringProperty = ForcesAndMotionBasicsStrings.frictionForceStringProperty;
const pattern0Name1ValueUnitsAccelerationString = ForcesAndMotionBasicsStrings.pattern[ '0name' ][ '1valueUnitsAcceleration' ];
const pattern0ValueUnitsNewtonsString = ForcesAndMotionBasicsStrings.pattern[ '0valueUnitsNewtons' ];
const sumOfForcesEqualsZeroString = ForcesAndMotionBasicsStrings.sumOfForcesEqualsZero;

class MotionScreenView extends ScreenView {

  /**
   * @param {MotionModel} model model for the entire screen
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {

    super( {
      layoutBounds: ForcesAndMotionBasicsLayoutBounds,
      tandem: tandem
    } );

    //TODO visibility? https://github.com/phetsims/tasks/issues/1129
    this.model = model;

    //Variables for this constructor, for convenience
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
      this.addChild( new Image( skateboard_png, {
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
    const disableText = node => length => {node.fill = length === 0 ? 'gray' : 'black';};

    const maxTextWidth = ( rightItemToolboxNode.left - leftItemToolboxNode.right ) - 10;
    const appliedForceSliderText = new Text( appliedForceStringProperty, {
      font: new PhetFont( 22 ),
      y: 430,
      maxWidth: maxTextWidth,
      tandem: tandem.createTandem( 'appliedForceSliderText' )
    } );
    appliedForceStringProperty.link( () => { appliedForceSliderText.centerX = width / 2; } );
    const appliedForceSlider = new AppliedForceSlider( model, new Range( -500, 500 ),
      tandem.createTandem( 'appliedForceSlider' ), {
        centerX: width / 2 + 1,
        y: 555
      } );

    this.addChild( appliedForceSliderText );
    this.addChild( appliedForceSlider );

    // The range for the spinner will change depending on whether the stack has exceeded maximum speed. This will
    // most often be in cases where there is no friction, because the speed will remain at maximum values and we
    // do not want to allow additional applied force at that time
    const spinnerRange = new Range( -500, 500 );

    // Do not allow the user to apply a force that would take the object beyond its maximum velocity
    Multilink.lazyMultilink( [ model.appliedForceProperty, model.speedClassificationProperty, model.stackSizeProperty ], ( appliedForce, speedClassification, stackSize ) => {

      const enableRightButtons = ( stackSize > 0 && ( speedClassification !== 'RIGHT_SPEED_EXCEEDED' ) );
      spinnerRange.max = enableRightButtons ? 500 : 0;

      const enableLeftButtons = ( stackSize > 0 && ( speedClassification !== 'LEFT_SPEED_EXCEEDED' ) );
      spinnerRange.min = enableLeftButtons ? -500 : 0;
    } );

    const appliedForceSpinner = new FineCoarseSpinner( model.appliedForceProperty, {
      numberDisplayOptions: {
        valuePattern: pattern0ValueUnitsNewtonsString,
        align: 'center',
        xMargin: 20,
        yMargin: 4,
        textOptions: {
          font: new PhetFont( 22 ),
          maxWidth: maxTextWidth / 3
        }
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
    model.stackSizeProperty.link( size => {
      appliedForceSpinner.enabled = size > 0;
    } );

    model.stackObservableArray.lengthProperty.link( disableText( appliedForceSliderText ) );
    model.stackObservableArray.lengthProperty.link( length => { appliedForceSlider.enabled = length > 0; } );

    //Create the speedometer.  Specify the position after construction so we can set the 'top'
    const speedometerNode = new SpeedometerNode( model.speedProperty, model.showSpeedProperty, model.showValuesProperty,
      tandem.createTandem( 'speedometerNode' ), {
        x: 300,
        top: 8
      } );

    this.addChild( speedometerNode );

    //Create and add the control panel
    const controlPanel = new MotionControlPanel( model, tandem.createTandem( 'controlPanel' ) );
    this.addChild( controlPanel );

    model.stopwatch.positionProperty.value = controlPanel.leftTop.plusXY( -100, 10 );

    const stopwatchNode = new StopwatchNode( model.stopwatch, {
      visibleProperty: model.showStopwatchProperty,
      numberDisplayOptions: {
        textOptions: {
          maxWidth: 100
        }
      }
    } );

    this.addChild( stopwatchNode );

    // play, step, and reset buttons in an HBox aligned left bottom under the control panel
    const playPauseVerticalOffset = 35;
    const playPauseStepHBox = new TimeControlNode( model.playProperty, {
      leftCenter: controlPanel.leftBottom.plusXY( 0, playPauseVerticalOffset ),
      playPauseStepButtonOptions: {
        stepForwardButtonOptions: {
          listener: () => { model.manualStep(); }
        }
      }
    } );
    this.addChild( playPauseStepHBox );

    //Reset all button goes beneath the control panel.  Not a closure variable since API access is required.
    //TODO: Is that OK? or should we invest dynamic search/lookups to keep as closure var? https://github.com/phetsims/tasks/issues/1129
    this.resetAllButton = new ResetAllButton( {
      listener: () => {
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
      const tickLabel = ( label, tick, tandemID ) => new Text( label, {
        pickable: false,
        font: new PhetFont( 16 ),
        centerX: tick.centerX,
        top: tick.bottom + 27,
        tandem: tandem.createTandem( `tickLabel${tandemID}Text` )
      } );
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
      Multilink.multilink( [ model.showValuesProperty, model.accelerationProperty ], ( showValues, acceleration ) => {
        if ( showValues ) {
          const accelerationValue = Utils.toFixed( acceleration, 2 );
          labelText.setString( StringUtils.format( pattern0Name1ValueUnitsAccelerationString, accelerationString, accelerationValue ) );

          // Make sure that the acceleration readout does not shift as the value changes by compensating for the change
          // in width.
          labelText.centerX = accelerometerNode.centerX + ( labelText.width - initialLabelWidth ) / 2 - 10;
        }
        else {
          labelText.setString( accelerationString );
          labelText.centerX = accelerometerNode.centerX;
        }
      } );
    }

    // Map the items to their correct toolbox, one of left or right, corresponding to the side of the screen that
    // toolbox is sitting on.
    const getItemSide = item => {
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
      const sittingImageProperty = item.sittingImageProperty.value ? item.sittingImageProperty : item.imageProperty;
      const holdingImageProperty = item.holdingImageProperty.value ? item.holdingImageProperty : item.imageProperty;
      const itemNode = new Constructor( model, this, item,
        item.imageProperty,
        sittingImageProperty,
        holdingImageProperty,
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
      appliedForce => Utils.roundSymmetric( appliedForce ) );
    const roundedFrictionForceProperty = new DerivedProperty(
      [ model.frictionForceProperty ],
      frictionForce => Utils.roundSymmetric( frictionForce ) );

    //Only update the sum force arrow after both friction and applied force changed, so we don't get partial updates, see https://github.com/phetsims/forces-and-motion-basics/issues/83
    const roundedSumProperty = new NumberProperty( roundedAppliedForceProperty.get() + roundedFrictionForceProperty.get(), {
      tandem: tandem.createTandem( 'roundedSumProperty' ),
      units: 'N'
    } );

    model.stepEmitter.addListener( () => {
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
      tandem: tandem.createTandem( 'sumOfForcesText' )
    } );

    //If the (rounded) sum of forces arrow is zero, then show the text "Sum of Forces = 0", see #76
    new DerivedProperty( [ model.showSumOfForcesProperty, roundedSumProperty ],
      ( showSumOfForces, sumOfForces ) => showSumOfForces && sumOfForces === 0 ).linkAttribute( this.sumOfForcesText, 'visible' );
    this.appliedForceArrow = new ReadoutArrow( appliedForceStringProperty, '#e66e23', this.layoutBounds.width / 2, 280, roundedAppliedForceProperty, model.showValuesProperty,
      tandem.createTandem( 'appliedForceArrow' ), {
        labelPosition: 'side',
        arrowScale: arrowScale
      } );
    this.frictionArrow = new ReadoutArrow( frictionForceStringProperty, 'red', this.layoutBounds.width / 2, 280, roundedFrictionForceProperty, model.showValuesProperty,
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
      ( roundedAppliedForce, roundedFrictionForce ) => Math.abs( roundedFrictionForce ) > Math.abs( roundedAppliedForce ) );
    frictionLargerProperty.link( frictionLarger => {
      const node = frictionLarger ? this.appliedForceArrow : this.frictionArrow;
      node.moveToFront();
    } );

    //On the motion screens, when the 'Friction' label overlaps the force vector it should be displaced vertically
    Multilink.multilink( [ model.appliedForceProperty, model.frictionForceProperty ], ( appliedForce, frictionForce ) => {
      const sameDirection = ( appliedForce < 0 && frictionForce < 0 ) || ( appliedForce > 0 && frictionForce > 0 );
      this.frictionArrow.overlapsOther = sameDirection;
      this.frictionArrow.labelPosition = sameDirection ? 'bottom' : 'side';

      // the applied force arrow must be updated directly since its label position doesn't change
      this.appliedForceArrow.overlapsOther = sameDirection;
      this.appliedForceArrow.update();
    } );

    model.showForceProperty.linkAttribute( this.appliedForceArrow, 'visible' );
    model.showForceProperty.linkAttribute( this.frictionArrow, 'visible' );
    model.showSumOfForcesProperty.linkAttribute( this.sumArrow, 'visible' );

    //After the view is constructed, move one of the blocks to the top of the stack.
    model.viewInitialized( this );
  }

  // @private Get the height of the objects in the stack (doesn't include skateboard)
  get stackHeight() {
    let sum = 0;
    for ( let i = 0; i < this.model.stackObservableArray.length; i++ ) {
      sum = sum + this.model.stackObservableArray.get( i ).view.height;
    }
    return sum;
  }

  // @public Find the top of the stack, so that a new object can be placed on top
  get topOfStack() {
    const n = this.model.skateboard ? 334 : 360;
    return n - this.stackHeight;
  }

  // @public Get the size of an item's image.  Dependent on the current scale of the image.
  getSize( item ) {
    // get the current scale for the element and apply it to the image
    const scaledWidth = item.view.sittingImageNode.width * item.getCurrentScale();
    return { width: scaledWidth, height: item.view.height };
  }
}

forcesAndMotionBasics.register( 'MotionScreenView', MotionScreenView );
export default MotionScreenView;