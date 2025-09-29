// Copyright 2013-2025, University of Colorado Boulder

/**
 * Scenery node that shows the control panel for the Motion, Friction and Acceleration screens. This class is reusable
 * across 3 screens that have different control panels, and it is consequently complicated.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import GaugeNode from '../../../../scenery-phet/js/GaugeNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Stopwatch from '../../../../scenery-phet/js/Stopwatch.js';
import StopwatchNode from '../../../../scenery-phet/js/StopwatchNode.js';
import HBox, { HBoxOptions } from '../../../../scenery/js/layout/nodes/HBox.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import HStrut from '../../../../scenery/js/nodes/HStrut.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import { rasterizeNode } from '../../../../scenery/js/util/rasterizeNode.js';
import Panel from '../../../../sun/js/Panel.js';
import VerticalCheckboxGroup, { type VerticalCheckboxGroupItem } from '../../../../sun/js/VerticalCheckboxGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ForcesAndMotionBasicsLayoutBounds from '../../common/view/ForcesAndMotionBasicsLayoutBounds.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import MotionModel from '../model/MotionModel.js';
import MotionConstants from '../MotionConstants.js';
import AccelerometerNode from './AccelerometerNode.js';
import FrictionControl from './FrictionControl.js';

const accelerationStringProperty = ForcesAndMotionBasicsFluent.accelerationStringProperty;
const forcesStringProperty = ForcesAndMotionBasicsFluent.forcesStringProperty;
const forceStringProperty = ForcesAndMotionBasicsFluent.forceStringProperty;
const massesStringProperty = ForcesAndMotionBasicsFluent.massesStringProperty;
const speedStringProperty = ForcesAndMotionBasicsFluent.speedStringProperty;
const stopwatchStringProperty = ForcesAndMotionBasicsFluent.stopwatchStringProperty;
const sumOfForcesStringProperty = ForcesAndMotionBasicsFluent.sumOfForcesStringProperty;
const valuesStringProperty = ForcesAndMotionBasicsFluent.valuesStringProperty;

const VBOX_SPACING = 5;

// No icon, so this can be wider
const SUM_OF_FORCES_MAX_WIDTH = 120;
const FONT_SIZE = 18;
const MAX_TEXT_WIDTH = 97;
const MIN_MOTION_AND_FRICTION_CONTROLS_CONTENT_WIDTH = 185;

type LabelSelfOptions = {
  indent?: number;
  icon?: Node;
};
type LabelOptions = StrictOmit<HBoxOptions, 'children' | 'spacing'> & LabelSelfOptions;

export default class MotionControlPanel extends Node {

  private readonly model: MotionModel;
  private readonly sumOfForcesDescriptionProperty: TReadOnlyProperty<string>;
  private readonly speedDescriptionProperty: TReadOnlyProperty<string>;
  private readonly accelerationDescriptionProperty: TReadOnlyProperty<string>;

  public constructor( model: MotionModel, sumOfForcesDescriptionProperty: TReadOnlyProperty<string>, speedDescriptionProperty: TReadOnlyProperty<string>, accelerationDescriptionProperty: TReadOnlyProperty<string>, tandem: Tandem ) {
    super( {
      tandem: tandem,
      phetioFeatured: true
    } );

    this.model = model;
    this.sumOfForcesDescriptionProperty = sumOfForcesDescriptionProperty;
    this.speedDescriptionProperty = speedDescriptionProperty;
    this.accelerationDescriptionProperty = accelerationDescriptionProperty;

    const contents = this.model.screen === 'motion' ? this.createMotionControls() :
                     this.model.screen === 'friction' ? this.createFrictionControls() :
                     this.createAccelerationControls();

    const panel = new Panel( contents, {
      xMargin: 12,
      yMargin: 7,
      fill: '#e3e980'
    } );
    this.addChild( panel.mutate( { left: ForcesAndMotionBasicsLayoutBounds.width - panel.width - 5, top: 5 } ) );
  }

  private createMotionControls(): Node {
    const containerNode = new VBox( {
      spacing: VBOX_SPACING
    } );

    const items = this.createCommonCheckboxItems( true, false, false );

    const checkboxGroup = new VerticalCheckboxGroup( items, {
      tandem: this.tandem.createTandem( 'checkboxGroup' ),
      phetioFeatured: true,
      minContentWidth: MIN_MOTION_AND_FRICTION_CONTROLS_CONTENT_WIDTH
    } );
    containerNode.addChild( checkboxGroup );

    this.layoutCheckboxes(
      [ forceStringProperty, valuesStringProperty, massesStringProperty, speedStringProperty, stopwatchStringProperty ],
      checkboxGroup
    );

    return containerNode;
  }

  private createFrictionControls(): Node {
    const containerNode = new VBox( {
      spacing: VBOX_SPACING
    } );

    const items = this.createCommonCheckboxItems( true, true, false );

    const checkboxGroup = new VerticalCheckboxGroup( items, {
      tandem: this.tandem.createTandem( 'checkboxGroup' ),
      phetioFeatured: true,
      minContentWidth: MIN_MOTION_AND_FRICTION_CONTROLS_CONTENT_WIDTH
    } );
    containerNode.addChild( checkboxGroup );

    this.layoutCheckboxes(
      [ forcesStringProperty, sumOfForcesStringProperty, valuesStringProperty, massesStringProperty, speedStringProperty, stopwatchStringProperty ],
      checkboxGroup
    );

    containerNode.addChild( this.createFrictionControl() );

    return containerNode;
  }

  private createAccelerationControls(): Node {
    const containerNode = new VBox( {
      spacing: VBOX_SPACING
    } );

    const items = this.createCommonCheckboxItems( true, true, true );

    const checkboxGroup = new VerticalCheckboxGroup( items, {
      tandem: this.tandem.createTandem( 'checkboxGroup' ),
      phetioFeatured: true,

      // set so the icons appear right-aligned
      minContentWidth: MIN_MOTION_AND_FRICTION_CONTROLS_CONTENT_WIDTH + 10 // empirically determined as the 'acceleration' screen controls have longer strings
    } );
    containerNode.addChild( checkboxGroup );

    this.layoutCheckboxes(
      [ forcesStringProperty, sumOfForcesStringProperty, valuesStringProperty, massesStringProperty, speedStringProperty, accelerationStringProperty ],
      checkboxGroup
    );

    containerNode.addChild( this.createFrictionControl() );
    return containerNode;
  }

  private createCommonCheckboxItems( includeForces: boolean, includeSumOfForces: boolean, includeAcceleration: boolean ): VerticalCheckboxGroupItem[] {
    const items: VerticalCheckboxGroupItem[] = [];

    if ( includeForces ) {
      items.push( {
        createNode: () => this.createLabel( this.model.screen === 'motion' ? forceStringProperty : forcesStringProperty, { icon: this.createArrowIcon() } ),
        property: this.model.showForceProperty,
        tandemName: this.model.screen === 'motion' ? 'forceCheckbox' : 'forcesCheckbox',
        options: {
          accessibleHelpText: this.model.screen === 'motion' ?
                              ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.forceCheckbox.accessibleHelpTextStringProperty :
                              ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.forcesCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseChecked: this.model.screen === 'motion' ?
                                            ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.forceCheckbox.accessibleContextResponseCheckedStringProperty :
                                            ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.forcesCheckbox.accessibleContextResponseCheckedStringProperty,
          accessibleContextResponseUnchecked: this.model.screen === 'motion' ?
                                              ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.forceCheckbox.accessibleContextResponseUncheckedStringProperty :
                                              ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.forcesCheckbox.accessibleContextResponseUncheckedStringProperty
        }
      } );
    }

    if ( includeSumOfForces ) {
      items.push( {
        createNode: () => this.createLabel( sumOfForcesStringProperty, {}, SUM_OF_FORCES_MAX_WIDTH ),
        property: this.model.showSumOfForcesProperty,
        tandemName: 'sumOfForcesCheckbox',
        options: {
          accessibleHelpText: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.sumOfForcesCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseChecked: this.sumOfForcesDescriptionProperty,
          accessibleContextResponseUnchecked: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.sumOfForcesCheckbox.accessibleContextResponseUncheckedStringProperty
        }
      } );
    }

    items.push( {
      createNode: () => this.createLabel( valuesStringProperty ),
      property: this.model.showValuesProperty,
      tandemName: 'valuesCheckbox',
      options: {
        accessibleHelpText: this.model.screen === 'acceleration' ?
                            ForcesAndMotionBasicsFluent.a11y.valuesCheckbox.accessibleHelpTextForceSpeedAccelerationStringProperty :
                            ForcesAndMotionBasicsFluent.a11y.valuesCheckbox.accessibleHelpTextForceSpeedStringProperty,
        accessibleContextResponseChecked: ForcesAndMotionBasicsFluent.a11y.valuesCheckbox.checkedResponseStringProperty,
        accessibleContextResponseUnchecked: ForcesAndMotionBasicsFluent.a11y.valuesCheckbox.uncheckedResponseStringProperty
      }
    } );

    items.push( {
      createNode: () => this.createLabel( massesStringProperty ),
      property: this.model.showMassesProperty,
      tandemName: 'massesCheckbox',
      options: {
        accessibleHelpText: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.massesCheckbox.accessibleHelpTextStringProperty,
        accessibleContextResponseChecked: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.massesCheckbox.accessibleContextResponseCheckedStringProperty,
        accessibleContextResponseUnchecked: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.massesCheckbox.accessibleContextResponseUncheckedStringProperty
      }
    } );

    items.push( {
      createNode: () => this.createLabel( speedStringProperty, { icon: this.createSpeedometerIcon() } ),
      property: this.model.showSpeedProperty,
      tandemName: 'speedCheckbox',
      options: {
        accessibleHelpText: ForcesAndMotionBasicsFluent.a11y.speedCheckbox.accessibleHelpTextStringProperty,
        accessibleContextResponseChecked: this.speedDescriptionProperty,
        accessibleContextResponseUnchecked: ForcesAndMotionBasicsFluent.a11y.speedCheckbox.accessibleContextResponseUncheckedStringProperty
      }
    } );

    if ( includeAcceleration ) {
      items.push( {
        createNode: () => this.createLabel( accelerationStringProperty, { icon: this.createAccelerometerIcon() } ),
        property: this.model.showAccelerationProperty,
        tandemName: 'accelerationCheckbox',
        options: {
          accessibleHelpText: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.accelerationCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseChecked: this.accelerationDescriptionProperty,
          accessibleContextResponseUnchecked: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.accelerationCheckbox.accessibleContextResponseUncheckedStringProperty
        }
      } );
    }

    if ( !includeAcceleration ) {
      items.push( {
        createNode: () => this.createLabel( stopwatchStringProperty, { icon: createStopwatchIcon() } ),
        property: this.model.stopwatch.isVisibleProperty,
        tandemName: 'stopwatchCheckbox',
        options: {
          accessibleHelpText: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.stopwatchCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseChecked: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.stopwatchCheckbox.accessibleContextResponseCheckedStringProperty,
          accessibleContextResponseUnchecked: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.stopwatchCheckbox.accessibleContextResponseUncheckedStringProperty
        }
      } );
    }

    return items;
  }

  private createFrictionControl(): Node {
    return new FrictionControl( this.model, FONT_SIZE, MAX_TEXT_WIDTH, this.tandem.createTandem( 'frictionSlider' ) );
  }

  private layoutCheckboxes( stringProperties: TReadOnlyProperty<string>[], checkboxes: Node ): void {
    const checkboxesCenterX = checkboxes.centerX;
    Multilink.multilinkAny( stringProperties, () => {
      checkboxes.centerX = checkboxesCenterX;
    } );
  }

  private createLabel( text: TReadOnlyProperty<string>, providedOptions?: LabelOptions, maxTextWidth: number = MAX_TEXT_WIDTH ): Node {
    const options = optionize<LabelOptions, LabelSelfOptions, HBoxOptions>()( {
      indent: 0,
      icon: new Node()
    }, providedOptions );

    const labelText = new Text( text, {
      font: new PhetFont( FONT_SIZE ),
      maxWidth: maxTextWidth
    } );

    let iconSpacer = new HStrut( 0 );
    if ( options.icon ) {
      iconSpacer = new HStrut( 10 );
    }

    const hBoxOptions = combineOptions<HBoxOptions>( {
      spacing: 0,
      children: [ labelText, iconSpacer, options.icon ]
    }, options );

    return new HBox( hBoxOptions );
  }

  private createArrowIcon(): ArrowNode {
    return new ArrowNode( 0, 0, 40, 0, {
      headHeight: 20,
      headWidth: 20,
      tailWidth: 10,
      fill: '#e66e23',
      stroke: 'black'
    } );
  }

  private createSpeedometerIcon(): Node {
    const speedometerIconValueProperty = new Property( 0 );
    return new GaugeNode( speedometerIconValueProperty, speedStringProperty, new Range( 0, MotionConstants.MAX_SPEED ), {
      radius: 67,
      scale: 0.2
    } );
  }

  private createAccelerometerIcon(): Node {
    const accelerometerIconValueProperty = new Property( 5 );
    return new AccelerometerNode( accelerometerIconValueProperty ).mutate( { scale: 0.3 } );
  }
}

const createStopwatchIcon = () => {

  const stopwatch = new Stopwatch( {
    isVisible: true,
    tandem: Tandem.OPT_OUT
  } );

  const stopwatchNode = new StopwatchNode( stopwatch, {
    numberDisplayOptions: {
      textOptions: {
        maxWidth: 80
      }
    },
    tandem: Tandem.OPT_OUT
  } );

  const icon = rasterizeNode( stopwatchNode, {
    resolution: 5,
    nodeOptions: {
      cursor: 'pointer'
    }
  } );
  icon.setScaleMagnitude( 0.3 );

  return icon;
};


forcesAndMotionBasics.register( 'MotionControlPanel', MotionControlPanel );
