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
import Utils from '../../../../dot/js/Utils.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import StopwatchNode from '../../../../scenery-phet/js/StopwatchNode.js';
import TimeControlNode from '../../../../scenery-phet/js/TimeControlNode.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
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
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import Item from '../model/Item.js';
import MotionModel from '../model/MotionModel.js';
import AccelerometerNode from './AccelerometerNode.js';
import AppliedForceControl from './AppliedForceControl.js';
import ItemNode from './ItemNode.js';
import ItemStackGroupNode from './ItemStackGroupNode.js';
import StackKeyboardStrategy from './StackKeyboardStrategy.js';
import ItemToolboxGroupNode from './ItemToolboxGroupNode.js';
import ToolboxKeyboardStrategy from './ToolboxKeyboardStrategy.js';
import MotionControlPanel from './MotionControlPanel.js';
import MotionForcesListDescription from './MotionForcesListDescription.js';
import MotionScreensAccelerationDescription from './MotionScreensAccelerationDescription.js';
import MotionScreensSpeedDescription from './MotionScreensSpeedDescription.js';
import MotionScreenSummaryContent from './MotionScreenSummaryContent.js';
import MotionStackListDescription from './MotionStackListDescription.js';
import MovingBackgroundNode from './MovingBackgroundNode.js';
import PusherNode from './PusherNode.js';
import SpeedometerNode from './SpeedometerNode.js';
import WaterBucketNode from './WaterBucketNode.js';
import MotionGrabReleaseCueNode from './MotionGrabReleaseCueNode.js';

const sumOfForcesStringProperty = ForcesAndMotionBasicsFluent.sumOfForcesStringProperty;

// constants
const PLAY_PAUSE_BUFFER = 10; // separation between step and reset all button, useful for i18n

// strings
const accelerationStringProperty = ForcesAndMotionBasicsFluent.accelerationStringProperty;
const appliedForceStringProperty = ForcesAndMotionBasicsFluent.appliedForceStringProperty;
const frictionForceStringProperty = ForcesAndMotionBasicsFluent.frictionForceStringProperty;
const pattern0Name1ValueUnitsAccelerationStringProperty = ForcesAndMotionBasicsFluent.pattern[ '0name' ][ '1valueUnitsAccelerationStringProperty' ];
const sumOfForcesEqualsZeroStringProperty = ForcesAndMotionBasicsFluent.sumOfForcesEqualsZeroStringProperty;

export default class MotionScreenView extends ScreenView {

  private readonly resetAllButton: ResetAllButton;
  private readonly sumArrow: ReadoutArrow;
  private readonly sumOfForcesText: Text;
  public readonly itemNodes: ItemNode[];
  private readonly appliedForceArrow: ReadoutArrow;
  private readonly frictionArrow: ReadoutArrow;
  private readonly itemModelToNodeMap = new Map<Item, ItemNode>();
  private readonly toolboxContainer: Node;
  private readonly grabReleaseCueNode: MotionGrabReleaseCueNode;

  // Keyboard navigation groups
  private readonly itemToolboxGroup: ItemToolboxGroupNode;
  private readonly itemStackGroup: ItemStackGroupNode;

  // Update PDOM order for toolbox and stack items
  private updateItemPDOMOrder(): void {

    // Compute desired orders
    const toolboxItems = this.itemToolboxGroup.itemNodes
      .slice()
      .sort( ( a, b ) => a.centerX - b.centerX );

    const stackItems = this.itemStackGroup.stackItemNodes
      .slice()
      .sort( ( a, b ) => a.top - b.top );

    // Clear existing pdomOrder first to avoid transient duplicates across groups
    this.itemToolboxGroup.pdomOrder = [];
    this.itemStackGroup.pdomOrder = [];

    // Apply updated orders
    this.itemToolboxGroup.pdomOrder = toolboxItems;
    this.itemStackGroup.pdomOrder = stackItems;
  }

  /**
   * @param model model for the entire screen
   * @param tandem
   */
  public constructor( private readonly model: MotionModel, tandem: Tandem ) {

    super( {
      layoutBounds: ForcesAndMotionBasicsLayoutBounds,
      tandem: tandem,
      screenSummaryContent: new MotionScreenSummaryContent( model )
    } );

    // Variables for this constructor, for convenience
    const width = this.layoutBounds.width;
    const height = this.layoutBounds.height;

    // Constants
    const skyHeight = 362;
    const groundHeight = height - skyHeight;

    // Create the static background
    const skyGradient = new LinearGradient( 0, 0, 0, skyHeight ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' );
    const sky = new Rectangle( -width, -skyHeight, width * 3, skyHeight * 2, { fill: skyGradient, pickable: false } );

    const groundNode = new Rectangle( -width, skyHeight, width * 3, groundHeight * 3, {
      fill: '#c59a5b',
      pickable: false
    } );
    this.addChild( sky );
    this.addChild( groundNode );

    // Create the dynamic (moving) background
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

    // Add toolbox backgrounds for the objects
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

    const appliedForceControl = new AppliedForceControl( tandem.createTandem( 'appliedForceControl' ), ( rightItemToolboxNode.left - leftItemToolboxNode.right ) - 10, model );

    const appliedForcePlayAreaControlNode = new Node( {
      tagName: 'div',
      accessibleHeading: ForcesAndMotionBasicsFluent.a11y.motionScreen.playAreaControls.accessibleHeadingStringProperty,
      descriptionContent: ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.playArea.appliedForceControl.descriptionStringProperty,
      appendDescription: false,
      children: [ appliedForceControl ]
    } );

    const top = leftItemToolboxNode.top - 4;
    ManualConstraint.create( this, [ appliedForcePlayAreaControlNode ], appliedForcePlayAreaControlNodeProxy => {
      appliedForcePlayAreaControlNodeProxy.centerX = this.layoutBounds.centerX;
      appliedForcePlayAreaControlNodeProxy.top = top;
    } );

    this.addChild( appliedForcePlayAreaControlNode );

    // Accessible forces list description for Motion screens
    const forcesListDescription = new MotionForcesListDescription( model );
    this.addChild( forcesListDescription );

    // Acceleration description (visible only on acceleration screen when checkbox enabled)
    const accelerationDescription = new MotionScreensAccelerationDescription( model );
    this.addChild( accelerationDescription );

    // Compute dynamic speed description to announce when Speed is enabled
    const speedDescription = new MotionScreensSpeedDescription( model );
    this.addChild( speedDescription );

    // Create the speedometer.  Specify the position after construction so we can set the 'top'
    const speedometerNode = new SpeedometerNode( model.speedProperty, model.showSpeedProperty, model.showValuesProperty, {
      x: 300,
      top: 8
    } );

    this.addChild( speedometerNode );

    // Create and add the control panel (pass dynamic speed description for accessibility announcement)
    const controlPanel = new MotionControlPanel( model, forcesListDescription.netForceDescriptionProperty, speedDescription.speedDescriptionProperty, accelerationDescription.accelerationDescriptionProperty, tandem.createTandem( 'controlPanel' ) );
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

    // We want to reset the position to what was explicitly set after the stopwatchNode was created.
    const stopwatchInitialPosition = controlPanel.leftTop.plusXY( -stopwatchNode.width, 10 );
    model.stopwatch.positionProperty.setInitialValue( stopwatchInitialPosition );
    model.stopwatch.positionProperty.value = stopwatchInitialPosition;

    // Stopwatch Play Area section with heading, visible only when Stopwatch is checked
    const stopwatchPlayAreaSection = new Node( {
      tagName: 'div',
      accessibleHeading: ForcesAndMotionBasicsFluent.stopwatchStringProperty,
      visibleProperty: model.stopwatch.isVisibleProperty,
      appendDescription: false,
      children: [ stopwatchNode ]
    } );
    this.addChild( stopwatchPlayAreaSection );

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

    // Reset all button goes beneath the control panel.  Not a closure variable since API access is required.
    this.resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput();
        model.reset();
        this.grabReleaseCueNode.reset();
      },
      radius: 23,
      rightCenter: controlPanel.rightBottom.plusXY( 0, playPauseVerticalOffset ),
      tandem: tandem.createTandem( 'resetAllButton' )
    } );

    // i18n - if the play control buttons are too close to reset all, they should be separated
    if ( timeControlNode.right > this.resetAllButton.left - PLAY_PAUSE_BUFFER ) {
      timeControlNode.leftCenter = controlPanel.leftBottom.plusXY( -2 * PLAY_PAUSE_BUFFER, playPauseVerticalOffset );
    }

    this.addChild( timeControlNode );
    this.addChild( this.resetAllButton );

    // Add the accelerometer, if on the final screen
    if ( model.accelerometer ) {

      const accelerometerNode = new AccelerometerNode( model.accelerationProperty );

      // build up the string label for the acceleration
      const labelTextStringProperty = new DerivedStringProperty( [
          model.showValuesProperty, pattern0Name1ValueUnitsAccelerationStringProperty, accelerationStringProperty, model.accelerationProperty ],
        ( showValues, pattern0Name1ValueUnitsAccelerationString, accelerationString, acceleration ) => {
          return showValues ?
                 StringUtils.format( pattern0Name1ValueUnitsAccelerationString, accelerationString, StringUtils.toFixedLTR( acceleration, 2 ) ) :
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

    // Iterate over the items in the model and create and add nodes for each one
    const leftItemLayer = new Node();
    const rightItemLayer = new Node();
    this.itemNodes = [];

    const itemsTandem = tandem.createTandem( 'items' );
    for ( let i = 0; i < model.items.length; i++ ) {
      const item = model.items[ i ];
      const itemSide = getItemSide( item );
      const itemLayer = itemSide === 'left' ? leftItemLayer : rightItemLayer;

      const sittingImageProperty = item.sittingImageProperty.value ? item.sittingImageProperty : item.imageProperty;
      const holdingImageProperty = item.holdingImageProperty.value ? item.holdingImageProperty : item.imageProperty;

      const itemNode = item.bucket ?
                       new WaterBucketNode( model, this, item, item.imageProperty, sittingImageProperty, holdingImageProperty, model.showMassesProperty, itemLayer, itemsTandem.createTandem( item.name + 'Node' ) ) :
                       new ItemNode( model, this, item, item.imageProperty, sittingImageProperty, holdingImageProperty, model.showMassesProperty, itemLayer, itemsTandem.createTandem( item.name + 'Node' ) );

      this.itemNodes.push( itemNode );

      // Provide a reference from the item model to its view so that view dimensions can be looked up easily
      this.itemModelToNodeMap.set( item, itemNode );
      // Don't add to itemLayer yet - will be added to groups
    }

    // Create keyboard navigation groups AFTER items are created
    this.itemToolboxGroup = new ItemToolboxGroupNode( leftItemToolboxNode.bounds, rightItemToolboxNode.bounds, {
      tandem: tandem.createTandem( 'itemToolboxGroup' ),
      accessibleHeading: ForcesAndMotionBasicsFluent.a11y.objectToolboxes.objectToolboxStringProperty
    } );
    this.itemStackGroup = new ItemStackGroupNode( {
      tandem: tandem.createTandem( 'itemStackGroup' )
    } );

    // A container for the Skateboard/Stack heading, the stack description list, and the items themselves
    const stackSection = new Node( {
      tagName: 'div',
      accessibleHeading: model.skateboard ? ForcesAndMotionBasicsFluent.a11y.objectToolboxes.skateboardStringProperty :
                         ForcesAndMotionBasicsFluent.a11y.objectToolboxes.stackStringProperty
    } );

    // Add the requested list under the heading, before the objects
    const stackListDescription = new MotionStackListDescription( model );
    stackSection.addChild( stackListDescription );
    stackSection.addChild( this.itemStackGroup );

    // Announce stack movement direction changes for accessibility, driven by velocityProperty
    const EPSILON = 1E-6;
    model.velocityProperty.lazyLink( ( velocity, oldVelocity ) => {
      const sign = ( v: number ) => v > EPSILON ? 1 : ( v < -EPSILON ? -1 : 0 );

      // Compute previous sign; if oldVelocity is undefined, treat as no change
      const prev = sign( oldVelocity );
      const curr = sign( velocity );
      if ( curr !== prev ) {
        if ( curr > 0 ) {
          stackSection.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.motionScreen.stackMovement.stackMovingRightStringProperty.value );
        }
        else if ( curr < 0 ) {
          stackSection.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.motionScreen.stackMovement.stackMovingLeftStringProperty.value );
        }
        else {
          stackSection.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.motionScreen.stackMovement.stackStationaryStringProperty.value );
        }
      }
    } );

    // Add all items to toolbox group initially and set up keyboard strategies
    this.itemNodes.forEach( itemNode => {
      this.itemToolboxGroup.addItemNode( itemNode, model );
      itemNode.setKeyboardStrategy( new ToolboxKeyboardStrategy( this.itemToolboxGroup, model ), this.itemToolboxGroup );
    } );

    // Add the force arrows & associated readouts in front of the items
    const arrowScale = 0.3;

    // Round the forces so that the sum is correct in the display, see https://github.com/phetsims/forces-and-motion-basics/issues/72 and
    // https://github.com/phetsims/forces-and-motion-basics/issues/74
    const roundedAppliedForceProperty = new DerivedProperty( [ model.appliedForceProperty ], appliedForce => Utils.roundSymmetric( appliedForce ) );
    const roundedFrictionForceProperty = new DerivedProperty( [ model.frictionForceProperty ], frictionForce => Utils.roundSymmetric( frictionForce ) );

    // Only update the sum force arrow after both friction and applied force changed, so we don't get partial updates, see
    // https://github.com/phetsims/forces-and-motion-basics/issues/83
    const roundedSumProperty = new NumberProperty( roundedAppliedForceProperty.get() + roundedFrictionForceProperty.get(), {
      tandem: tandem.createTandem( 'roundedSumProperty' ),
      units: 'N',
      phetioReadOnly: true
    } );

    model.stepEmitter.addListener( () => {
      roundedSumProperty.value = roundedAppliedForceProperty.get() + roundedFrictionForceProperty.get();
    } );

    this.sumArrow = new ReadoutArrow( 'sum', sumOfForcesStringProperty, '#96c83c', this.layoutBounds.width / 2, 225, roundedSumProperty, model.showValuesProperty, {
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

    // If the (rounded) sum of forces arrow is zero, then show the text "Sum of Forces = 0", see #76
    new DerivedProperty( [ model.showSumOfForcesProperty, roundedSumProperty ],
      ( showSumOfForces, sumOfForces ) => showSumOfForces && sumOfForces === 0 ).linkAttribute( this.sumOfForcesText, 'visible' );
    this.appliedForceArrow = new ReadoutArrow( 'applied', appliedForceStringProperty, '#e66e23', this.layoutBounds.width / 2, 280, roundedAppliedForceProperty, model.showValuesProperty, {
      labelPosition: 'side',
      arrowScale: arrowScale
    } );
    this.frictionArrow = new ReadoutArrow( 'friction', frictionForceStringProperty, 'red', this.layoutBounds.width / 2, 280, roundedFrictionForceProperty, model.showValuesProperty, {
      labelPosition: 'side',
      arrowScale: arrowScale
    } );

    // toolboxes and their children should be in front of all above items
    // contain the toolboxes in a parent node so that we can easily change the z-order of each toolbox.  This way
    // items of the right toolbox will not be layered in front of items of left toolbox items
    this.toolboxContainer = new Node( {
      tandem: tandem.createTandem( 'toolboxContainer' ),
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );
    this.toolboxContainer.addChild( leftItemToolboxNode );
    this.toolboxContainer.addChild( rightItemToolboxNode );
    this.addChild( this.toolboxContainer );

    // Add keyboard navigation groups to scene graph
    this.addChild( this.itemToolboxGroup );
    this.addChild( stackSection );

    // Allow moveToFront on the individual layers, while still being behind the arrows and readouts
    const itemLayer = new Node( { children: [ leftItemLayer, rightItemLayer ] } );
    this.addChild( itemLayer );

    // add the force arrows, which should be in front of all items and pusher
    this.addChild( this.sumArrow );
    this.addChild( this.appliedForceArrow );
    this.addChild( this.frictionArrow );
    this.addChild( sumOfForcesAlignBox );

    // Keyboard hint: space/enter to grab (mirrors Net Force)
    this.grabReleaseCueNode = new MotionGrabReleaseCueNode( this.itemNodes, this.layoutBounds, tandem.createTandem( 'grabReleaseCueNode' ) );
    this.addChild( this.grabReleaseCueNode );

    // Hide hint after first keyboard grab interaction
    this.itemNodes.forEach( itemNode => {
      itemNode.item.modeProperty.link( mode => {
        if ( mode === 'keyboardGrabbedFromToolbox' || mode === 'keyboardGrabbedFromStack' ) {
          this.grabReleaseCueNode.hasInteractedProperty.value = true;
        }
      } );
    } );

    // When a PhET-iO client hides the toolbox, hide any items that are in the toolboxes, and vice versa.
    this.toolboxContainer.visibleProperty.link( visible => {
      this.itemNodes.forEach( itemNode => {
        if ( !itemNode.item.inStackProperty.value && !itemNode.item.userControlledProperty.value ) {
          itemNode.visible = visible;
        }
      } );
    } );

    // Whichever arrow is smaller should be in front (in z-ordering)
    const frictionLargerProperty = new DerivedProperty( [ roundedAppliedForceProperty, roundedFrictionForceProperty ],
      ( roundedAppliedForce, roundedFrictionForce ) => Math.abs( roundedFrictionForce ) > Math.abs( roundedAppliedForce ) );
    frictionLargerProperty.link( frictionLarger => {
      const node = frictionLarger ? this.appliedForceArrow : this.frictionArrow;
      node.moveToFront();
    } );

    // On the motion screens, when the 'Friction' label overlaps the force vector it should be displaced vertically
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

    // After the view is constructed, move one of the blocks to the top of the stack.
    model.viewInitialized( this );

    // Set up transfer logic for keyboard groups based on item stack state
    this.setupKeyboardGroupTransfers( model );

    // Update PDOM order when items move between regions or change position
    this.itemNodes.forEach( itemNode => {
      itemNode.item.inStackProperty.link( () => this.updateItemPDOMOrder() );
      itemNode.item.positionProperty.link( () => this.updateItemPDOMOrder() );
    } );

    // Initial PDOM order
    this.updateItemPDOMOrder();

    this.pdomPlayAreaNode.pdomOrder = [
      this.itemToolboxGroup,
      stackSection,
      appliedForcePlayAreaControlNode,
      forcesListDescription,
      speedDescription,
      accelerationDescription,
      this.appliedForceArrow,
      this.frictionArrow,
      this.sumArrow,
      speedometerNode,
      stopwatchPlayAreaSection
    ];

    this.pdomControlAreaNode.pdomOrder = [
      controlPanel,
      timeControlNode,
      this.resetAllButton
    ];

    this.model.fallenProperty.lazyLink( fallen => {
      if ( fallen ) {
        this.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.motionScreen.pusherResponses.fellDownAppliedForceZeroStringProperty.value );
      }
    } );
  }

  // Get the height of the objects in the stack (doesn't include skateboard)
  private get stackHeight(): number {
    let sum = 0;
    for ( let i = 0; i < this.model.stackedItems.length; i++ ) {
      const itemNode = this.itemModelToNodeMap.get( this.model.stackedItems.get( i ) );
      affirm( itemNode, 'itemNode should not be null' );
      sum = sum + itemNode.height;
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
    affirm( itemNode, 'itemNode should not be null' );
    const scaledWidth = itemNode.sittingImageNode.width * item.getCurrentScale();
    return { width: scaledWidth, height: itemNode.height };
  }

  public isToolboxContainerVisible(): boolean {
    return this.toolboxContainer.visible;
  }

  /**
   * Set up the transfer logic for moving items between keyboard groups based on stack state
   */
  private setupKeyboardGroupTransfers( model: MotionModel ): void {

    // Helper function to perform group transfer logic using unified mode property
    const performGroupTransfer = ( itemNode: ItemNode ) => {
      const mode = itemNode.item.modeProperty.get();
      const isGrabbed = itemNode.item.isGrabbed();

      // Only transfer when item is not being grabbed (to avoid focus loss during interaction)
      if ( !isGrabbed ) {
        if ( mode === 'onStack' ) {

          // Item moved to stack - transfer from toolbox group to stack group
          if ( this.itemToolboxGroup.itemNodes.includes( itemNode ) ) {
            this.itemToolboxGroup.removeItemNode( itemNode );
            this.itemStackGroup.addItemNode( itemNode, model );

            // Update keyboard strategy for stack navigation
            itemNode.setKeyboardStrategy( new StackKeyboardStrategy( this.itemStackGroup, model ), null );

            // Update PDOM order after transfer
            this.updateItemPDOMOrder();
          }
        }
        else if ( mode === 'inToolbox' ) {

          // Item moved to toolbox - ensure it's in toolbox group and not in stack group
          // Remove from stack group if it's there
          if ( this.itemStackGroup.stackItemNodes.includes( itemNode ) ) {
            this.itemStackGroup.removeItemNode( itemNode );
          }

          // Add to toolbox group if it's not already there
          if ( !this.itemToolboxGroup.itemNodes.includes( itemNode ) ) {
            this.itemToolboxGroup.addItemNode( itemNode, model );

            // Update keyboard strategy for toolbox navigation
            itemNode.setKeyboardStrategy( new ToolboxKeyboardStrategy( this.itemToolboxGroup, model ), this.itemToolboxGroup );
          }

          // Update PDOM order after transfer
          this.updateItemPDOMOrder();
        }
        // Note: Animation modes are handled automatically and don't require group transfers
      }
    };

    // Listen to each item's mode property to transfer between groups
    this.itemNodes.forEach( itemNode => {

      itemNode.item.modeProperty.link( () => {
        performGroupTransfer( itemNode );
      } );
    } );

    // Listen to model stackedItems changes for proper ordering in stack group
    model.stackedItems.lengthProperty.link( () => {

      // Only re-sort when no items are being grabbed (to avoid focus loss during interaction)
      const anyItemGrabbed = this.itemNodes.some( itemNode => itemNode.item.userControlledProperty.get() );
      if ( !anyItemGrabbed ) {

        // Re-sort stack items when stack changes
        this.itemStackGroup.stackItemNodes.forEach( stackItemNode => {

          // Trigger re-sort by removing and re-adding
          this.itemStackGroup.removeItemNode( stackItemNode );
          this.itemStackGroup.addItemNode( stackItemNode, model );
        } );

        // Update PDOM after re-sorting
        this.updateItemPDOMOrder();
      }
    } );
  }
}

forcesAndMotionBasics.register( 'MotionScreenView', MotionScreenView );