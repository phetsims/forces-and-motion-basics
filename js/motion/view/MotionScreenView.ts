// Copyright 2013-2025, University of Colorado Boulder

/**
 * Main scenery view for the Motion, Friction and Acceleration screens.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import FineCoarseSpinner from '../../../../scenery-phet/js/FineCoarseSpinner.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import StopwatchNode from '../../../../scenery-phet/js/StopwatchNode.js';
import TimeControlNode from '../../../../scenery-phet/js/TimeControlNode.js';
import AlignBox from '../../../../scenery/js/layout/nodes/AlignBox.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import LinearGradient from '../../../../scenery/js/util/LinearGradient.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import skateboard_svg from '../../../images/skateboard_svg.js';
import ForcesAndMotionBasicsQueryParameters from '../../common/ForcesAndMotionBasicsQueryParameters.js';
import ForcesAndMotionBasicsLayoutBounds from '../../common/view/ForcesAndMotionBasicsLayoutBounds.js';
import ReadoutArrow from '../../common/view/ReadoutArrow.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';
import Item from '../model/Item.js';
import MotionModel from '../model/MotionModel.js';
import AccelerometerNode from './AccelerometerNode.js';
import AppliedForceSlider from './AppliedForceSlider.js';
import ItemNode from './ItemNode.js';
import MotionControlPanel from './MotionControlPanel.js';
import MovingBackgroundNode from './MovingBackgroundNode.js';
import PusherNode from './PusherNode.js';
import SpeedometerNode from './SpeedometerNode.js';
import WaterBucketNode from './WaterBucketNode.js';

const sumOfForcesStringProperty = ForcesAndMotionBasicsStrings.sumOfForcesStringProperty;

// constants
const PLAY_PAUSE_BUFFER = 10; // separation between step and reset all button, useful for i18n

// strings
const accelerationStringProperty = ForcesAndMotionBasicsStrings.accelerationStringProperty;
const appliedForceStringProperty = ForcesAndMotionBasicsStrings.appliedForceStringProperty;
const frictionForceStringProperty = ForcesAndMotionBasicsStrings.frictionForceStringProperty;
const pattern0Name1ValueUnitsAccelerationStringProperty = ForcesAndMotionBasicsStrings.pattern[ '0name' ][ '1valueUnitsAccelerationStringProperty' ];
const pattern0ValueUnitsNewtonsStringProperty = ForcesAndMotionBasicsStrings.pattern[ '0valueUnitsNewtonsStringProperty' ];
const sumOfForcesEqualsZeroStringProperty = ForcesAndMotionBasicsStrings.sumOfForcesEqualsZeroStringProperty;

export default class MotionScreenView extends ScreenView {

  private readonly resetAllButton: ResetAllButton;
  private readonly sumArrow: ReadoutArrow;
  private readonly sumOfForcesText: Text;
  public readonly itemNodes: ItemNode[];
  private readonly appliedForceArrow: ReadoutArrow;
  private readonly frictionArrow: ReadoutArrow;
  private readonly itemModelToNodeMap = new Map<Item, ItemNode>();

  /**
   * @param model model for the entire screen
   * @param tandem
   */
  public constructor( private readonly model: MotionModel, tandem: Tandem ) {

    super( {
      layoutBounds: ForcesAndMotionBasicsLayoutBounds,
      tandem: tandem
    } );

    //Variables for this constructor, for convenience
    const width = this.layoutBounds.width;
    const height = this.layoutBounds.height;

    //Constants
    const skyHeight = 362;
    const groundHeight = height - skyHeight;

    //Create the static background
    const skyGradient = new LinearGradient( 0, 0, 0, skyHeight ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' );
    const sky = new Rectangle( -width, -skyHeight, width * 3, skyHeight * 2, { fill: skyGradient, pickable: false } );

    const groundNode = new Rectangle( -width, skyHeight, width * 3, groundHeight * 3, {
      fill: '#c59a5b',
      pickable: false
    } );
    this.addChild( sky );
    this.addChild( groundNode );

    //Create the dynamic (moving) background
    this.addChild( new MovingBackgroundNode( model, this.layoutBounds.width / 2 ).mutate( { layerSplit: true } ) );

    // The pusher should be behind the skateboard
    this.addChild( new PusherNode( model, this.layoutBounds.width, this.itemModelToNodeMap, tandem.createTandem( 'pusherNode' ) ) );

    // Add the skateboard if on the 'motion' screen
    if ( model.skateboard ) {
      this.addChild( new Image( skateboard_svg, {
        scale: 0.75,
        centerX: width / 2, y: 315 + 12,
        pickable: false
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
      lineWidth: 1
    } );
    const rightItemToolboxNode = new Rectangle( width - 10 - 300, height - boxHeight - 10, 300, boxHeight, 10, 10, {
      fill: fill,
      stroke: stroke,
      lineWidth: 1
    } );

    //Create the slider
    const disableText = ( node: Text ) => ( length: number ) => {node.fill = length === 0 ? 'gray' : 'black';};

    const maxTextWidth = ( rightItemToolboxNode.left - leftItemToolboxNode.right ) - 10;
    const appliedForceSliderText = new Text( appliedForceStringProperty, {
      font: new PhetFont( 22 ),
      y: 430,
      maxWidth: maxTextWidth
    } );
    appliedForceStringProperty.link( () => { appliedForceSliderText.centerX = width / 2; } );
    const appliedForceSlider = new AppliedForceSlider( model, new Range( -500, 500 ),
      tandem.createTandem( 'appliedForceSlider' ), {
        centerX: width / 2 + 1,
        y: 555
      } );

    this.addChild( appliedForceSliderText );
    this.addChild( appliedForceSlider );

    // Do not allow the user to apply a force that would take the object beyond its maximum velocity
    // The appliedForce range will change depending on whether the stack has exceeded maximum speed. This will
    // most often be in cases where there is no friction, because the speed will remain at maximum values and we
    // do not want to allow additional applied force at that time
    Multilink.lazyMultilink( [ model.appliedForceProperty, model.speedClassificationProperty, model.stackSizeProperty ],
      ( appliedForce, speedClassification, stackSize ) => {
        const enableRightButtons = ( stackSize > 0 && ( speedClassification !== 'RIGHT_SPEED_EXCEEDED' ) );
        const enableLeftButtons = ( stackSize > 0 && ( speedClassification !== 'LEFT_SPEED_EXCEEDED' ) );

        const rangeMax = enableRightButtons ? 500 : 0;
        const rangeMin = enableLeftButtons ? -500 : 0;
        const range = new Range( rangeMin, rangeMax );

        // The applied force Property has a dynamic range that changes depending on whether the max speed has been
        // reached or not. Therefore, we need to ensure that the applied force value is clamped within range
        // when the range changes.
        model.appliedForceProperty.value = Utils.clamp( model.appliedForceProperty.value, range.min, range.max );
        model.appliedForceProperty.range = range;
      } );

    const appliedForceSpinner = new FineCoarseSpinner( model.appliedForceProperty, {
      numberDisplayOptions: {
        valuePattern: pattern0ValueUnitsNewtonsStringProperty,
        align: 'center',
        xMargin: 20,
        yMargin: 4,
        textOptions: {
          font: new PhetFont( 22 ),
          maxWidth: maxTextWidth / 3,
          tandem: Tandem.OPT_OUT
        }
      },
      deltaFine: 1,
      deltaCoarse: 50,
      spacing: 6,
      bottom: appliedForceSlider.top - 12,

      tandem: tandem.createTandem( 'appliedForceSpinner' )
    } );
    pattern0ValueUnitsNewtonsStringProperty.link( () => { appliedForceSpinner.centerX = width / 2; } );
    model.fallenProperty.link( fallen => {
      fallen && appliedForceSpinner.interruptSubtreeInput();
    } );
    this.addChild( appliedForceSpinner );

    // force cannot be applied when there is nothing on the stack
    model.stackSizeProperty.link( size => {
      appliedForceSpinner.enabled = size > 0;
    } );

    model.stackedItems.lengthProperty.link( disableText( appliedForceSliderText ) );
    model.stackedItems.lengthProperty.link( length => { appliedForceSlider.enabled = length > 0; } );

    //Create the speedometer.  Specify the position after construction so we can set the 'top'
    const speedometerNode = new SpeedometerNode( model.speedProperty, model.showSpeedProperty, model.showValuesProperty, {
        x: 300,
        top: 8
      } );

    this.addChild( speedometerNode );

    //Create and add the control panel
    const controlPanel = new MotionControlPanel( model, tandem.createTandem( 'controlPanel' ) );
    this.addChild( controlPanel );

    const stopwatchDragBounds = new Bounds2( this.layoutBounds.minX, this.layoutBounds.minY, controlPanel.left, 200 );
    const stopwatchNode = new StopwatchNode( model.stopwatch, {
      tandem: tandem.createTandem( 'stopwatchNode' ),
      visibleProperty: model.stopwatch.isVisibleProperty,
      dragBoundsProperty: new Property( stopwatchDragBounds ),
      dragListenerOptions: {
        positionProperty: model.stopwatch.positionProperty
      },
      numberDisplayOptions: {
        textOptions: {
          maxWidth: 80
        }
      }
    } );
    model.stopwatch.positionProperty.value = controlPanel.leftTop.plusXY( -stopwatchNode.width, 10 );

    this.addChild( stopwatchNode );

    // play, step, and reset buttons in an HBox aligned left bottom under the control panel
    const playPauseVerticalOffset = 35;
    const timeControlNode = new TimeControlNode( model.isPlayingProperty, {
      tandem: tandem.createTandem( 'timeControlNode' ),
      leftCenter: controlPanel.leftBottom.plusXY( 0, playPauseVerticalOffset ),
      playPauseStepButtonOptions: {
        stepForwardButtonOptions: {
          listener: () => { model.manualStep(); }
        }
      }
    } );
    this.addChild( timeControlNode );

    //Reset all button goes beneath the control panel.  Not a closure variable since API access is required.
    //TODO: Is that OK? or should we invest dynamic search/lookups to keep as closure var? https://github.com/phetsims/forces-and-motion-basics/issues/319
    this.resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput();
        model.reset();

        // We want to reset the position to what was explicitly set after the stopwatchNode was created.
        this.model.stopwatch.positionProperty.value = controlPanel.leftTop.plusXY( -stopwatchNode.width, 10 );
      },
      radius: 23,
      rightCenter: controlPanel.rightBottom.plusXY( 0, playPauseVerticalOffset ),
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( this.resetAllButton );

    // i18n - if the play control buttons are too close to reset all, they should be separated
    if ( timeControlNode.right > this.resetAllButton.left - PLAY_PAUSE_BUFFER ) {
      timeControlNode.leftCenter = controlPanel.leftBottom.plusXY( -2 * PLAY_PAUSE_BUFFER, playPauseVerticalOffset );
    }

    //Add the accelerometer, if on the final screen
    if ( model.accelerometer ) {

      const accelerometerNode = new AccelerometerNode( model.accelerationProperty );

      // build up the string label for the acceleration
      const labelTextStringProperty = new DerivedStringProperty( [
          model.showValuesProperty, pattern0Name1ValueUnitsAccelerationStringProperty, accelerationStringProperty, model.accelerationProperty ],
        ( showValues, pattern0Name1ValueUnitsAccelerationString, accelerationString, acceleration ) => {
          return showValues ?
                 StringUtils.format( pattern0Name1ValueUnitsAccelerationString, accelerationString, Utils.toFixed( acceleration, 2 ) ) :
                 accelerationString;
        } );
      const labelText = new RichText( labelTextStringProperty, {
        font: new PhetFont( 18 ),
        supScale: 0.60,
        supYOffset: 2,
        maxWidth: accelerometerNode.width * 3 / 2
      } );

      // create the tick labels
      const tickLabel = ( label: string, tick: Node, tandemID: string ) => new Text( label, {
        pickable: false,
        font: new PhetFont( 16 ),
        centerX: tick.centerX,
        top: tick.bottom + 27
      } );
      const tickLabels = new Node( {
        children: [
          tickLabel( '-20', accelerometerNode.ticks[ 0 ], 'Negative20' ),
          tickLabel( '0', accelerometerNode.ticks[ 2 ], 'Zero' ),
          tickLabel( '20', accelerometerNode.ticks[ 4 ], 'Positive20' )
        ]
      } );

      // put it all together in a VBox
      const accelerometerWithTickLabels = new Node( {
        children: [ labelText, accelerometerNode, tickLabels ],
        pickable: false,
        centerX: 300,
        y: 170
      } );
      labelText.bottom = accelerometerNode.top;
      tickLabels.top = accelerometerNode.bottom;
      model.showAccelerationProperty.linkAttribute( accelerometerWithTickLabels, 'visible' );

      this.addChild( accelerometerWithTickLabels );

      // whenever showValues and acceleration changes, update the label text position
      const initialLabelWidth = labelText.width;
      Multilink.multilink( [ model.showValuesProperty, labelTextStringProperty ], showValues => {

        // Make sure that the acceleration readout does not shift as the value changes by compensating for the change
        // in width.
        labelText.centerX = showValues ?
                            accelerometerNode.centerX + ( labelText.width - initialLabelWidth ) / 2 - 40 :
                            accelerometerNode.centerX;
      } );
    }

    // Map the items to their correct toolbox, one of left or right, corresponding to the side of the screen that
    // toolbox is sitting on.
    const getItemSide = ( item: Item ) => {
      // the fridge and the crates both go in hte left toolbox
      if ( item.name === 'fridge' || item.name === 'crate1' || item.name === 'crate2' ) {
        return 'left';
      }
      else {
        return 'right';
      }
    };

    //Iterate over the items in the model and create and add nodes for each one
    const leftItemLayer = new Node();
    const rightItemLayer = new Node();
    this.itemNodes = [];

    const itemsTandem = tandem.createTandem( 'items' );
    for ( let i = 0; i < model.items.length; i++ ) {
      const item = model.items[ i ];
      const itemSide = getItemSide( item );
      const toolboxNode = itemSide === 'left' ? leftItemToolboxNode : rightItemToolboxNode;
      const itemLayer = itemSide === 'left' ? leftItemLayer : rightItemLayer;

      const sittingImageProperty = item.sittingImageProperty.value ? item.sittingImageProperty : item.imageProperty;
      const holdingImageProperty = item.holdingImageProperty.value ? item.holdingImageProperty : item.imageProperty;

      const itemNode = item.bucket ?
                       new WaterBucketNode( model, this, item, item.imageProperty, sittingImageProperty, holdingImageProperty, model.showMassesProperty, toolboxNode, itemsTandem.createTandem( item.name + 'Node' ) ) :
                       new ItemNode( model, this, item, item.imageProperty, sittingImageProperty, holdingImageProperty, model.showMassesProperty, toolboxNode, itemsTandem.createTandem( item.name + 'Node' ) );

      this.itemNodes.push( itemNode );

      //Provide a reference from the item model to its view so that view dimensions can be looked up easily
      this.itemModelToNodeMap.set( item, itemNode );
      itemLayer.addChild( itemNode );
    }

    leftItemToolboxNode.addChild( leftItemLayer );
    rightItemToolboxNode.addChild( rightItemLayer );

    //Add the force arrows & associated readouts in front of the items
    const arrowScale = 0.3;

    //Round the forces so that the sum is correct in the display, see https://github.com/phetsims/forces-and-motion-basics/issues/72 and
    // https://github.com/phetsims/forces-and-motion-basics/issues/74
    const roundedAppliedForceProperty = new DerivedProperty(
      [ model.appliedForceProperty ],
      appliedForce => Utils.roundSymmetric( appliedForce ) );
    const roundedFrictionForceProperty = new DerivedProperty(
      [ model.frictionForceProperty ],
      frictionForce => Utils.roundSymmetric( frictionForce ) );

    //Only update the sum force arrow after both friction and applied force changed, so we don't get partial updates, see
    // https://github.com/phetsims/forces-and-motion-basics/issues/83
    const roundedSumProperty = new NumberProperty( roundedAppliedForceProperty.get() + roundedFrictionForceProperty.get(), {
      tandem: tandem.createTandem( 'roundedSumProperty' ),
      units: 'N',
      phetioReadOnly: true
    } );

    model.stepEmitter.addListener( () => {
      roundedSumProperty.set( roundedAppliedForceProperty.get() + roundedFrictionForceProperty.get() );
    } );

    this.sumArrow = new ReadoutArrow( sumOfForcesStringProperty, '#96c83c', this.layoutBounds.width / 2, 225, roundedSumProperty, model.showValuesProperty, {
        labelPosition: 'top',
        arrowScale: arrowScale
      } );
    this.sumOfForcesText = new Text( sumOfForcesEqualsZeroStringProperty, {
      pickable: false,
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      maxWidth: 125
    } );
    const sumOfForcesAlignBox = new AlignBox( this.sumOfForcesText, {
      alignBounds: this.layoutBounds,
      xAlign: 'center',
      y: 195,
      yAlign: 'top'
    } );

    //If the (rounded) sum of forces arrow is zero, then show the text "Sum of Forces = 0", see #76
    new DerivedProperty( [ model.showSumOfForcesProperty, roundedSumProperty ],
      ( showSumOfForces, sumOfForces ) => showSumOfForces && sumOfForces === 0 ).linkAttribute( this.sumOfForcesText, 'visible' );
    this.appliedForceArrow = new ReadoutArrow( appliedForceStringProperty, '#e66e23', this.layoutBounds.width / 2, 280, roundedAppliedForceProperty, model.showValuesProperty, {
        labelPosition: 'side',
        arrowScale: arrowScale
      } );
    this.frictionArrow = new ReadoutArrow( frictionForceStringProperty, 'red', this.layoutBounds.width / 2, 280, roundedFrictionForceProperty, model.showValuesProperty, {
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
    this.addChild( sumOfForcesAlignBox );

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

  // Get the height of the objects in the stack (doesn't include skateboard)
  private get stackHeight(): number {
    let sum = 0;
    for ( let i = 0; i < this.model.stackedItems.length; i++ ) {
      const itemNode = this.itemModelToNodeMap.get( this.model.stackedItems.get( i ) );

      assert && assert( itemNode, 'itemNode should not be null' );
      sum = sum + itemNode!.height;
    }
    return sum;
  }

  // Find the top of the stack, so that a new object can be placed on top
  public get topOfStack(): number {
    const n = this.model.skateboard ? 334 : 360;
    return n - this.stackHeight;
  }

  // Get the size of an item's image.  Dependent on the current scale of the image.
  public getSize( item: Item ): { width: number; height: number } {
    // get the current scale for the element and apply it to the image
    const itemNode = this.itemModelToNodeMap.get( item );
    assert && assert( itemNode, 'itemNode should not be null' );
    const scaledWidth = itemNode!.sittingImageNode.width * item.getCurrentScale();
    return { width: scaledWidth, height: itemNode!.height };
  }
}

forcesAndMotionBasics.register( 'MotionScreenView', MotionScreenView );