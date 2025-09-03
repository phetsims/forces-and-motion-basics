// Copyright 2013-2025, University of Colorado Boulder

/**
 * Scenery node that shows the control panel for the Motion, Friction and Acceleration screens.
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
import VerticalCheckboxGroup from '../../../../sun/js/VerticalCheckboxGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ForcesAndMotionBasicsLayoutBounds from '../../common/view/ForcesAndMotionBasicsLayoutBounds.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import MotionModel from '../model/MotionModel.js';
import MotionConstants from '../MotionConstants.js';
import AccelerometerNode from './AccelerometerNode.js';
import FrictionSlider from './FrictionSlider.js';

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

export default class MotionControlPanel extends Node {

  public constructor( model: MotionModel, sumOfForcesDescriptionProperty: TReadOnlyProperty<string>, tandem: Tandem ) {
    super( {
      tandem: tandem,
      phetioFeatured: true
    } );

    const fontSize = 18;
    const maxTextWidth = 97;

    // empirically determined so 'motion' and 'friction' screen controls more closely match the 'acceleration' screen controls
    const minMotionAndFrictionControlsContentWidth = 185;

    /**
     * Create a label node with options icon
     * @param text - the label string
     * @param [options]
     */
    type LabelSelfOptions = {
      indent?: number;
      icon?: Node;
    };
    type LabelOptions = StrictOmit<HBoxOptions, 'children' | 'spacing'> & LabelSelfOptions;
    const createLabel = ( text: TReadOnlyProperty<string>, providedOptions?: LabelOptions, _maxTextWidth = maxTextWidth ) => {
      const options = optionize<LabelOptions, LabelSelfOptions, HBoxOptions>()( {
        indent: 0,
        icon: new Node()
      }, providedOptions );

      // create the label for the checkbox
      const labelText = new Text( text, {
        font: new PhetFont( fontSize ),
        maxWidth: _maxTextWidth
      } );

      // optional icon needs spacing next to text
      let iconSpacer = new HStrut( 0 );
      if ( options.icon ) {
        // create a horizontal spacer for the icon
        iconSpacer = new HStrut( 10 );
      }

      const hBoxOptions = combineOptions<HBoxOptions>( {
        spacing: 0, children: [ labelText, iconSpacer, options.icon ]
      }, options );
      return new HBox( hBoxOptions );
    };

    // Icon for the forces in the control panel
    const createArrowIcon = () => new ArrowNode( 0, 0, 40, 0, {
      headHeight: 20,
      headWidth: 20,
      tailWidth: 10,
      fill: '#e66e23',
      stroke: 'black'
    } );
    const speedometerIcon = () => {
      const speedometerIconValueProperty = new Property( 0 );
      return new GaugeNode( speedometerIconValueProperty, speedStringProperty, new Range( 0, MotionConstants.MAX_SPEED ),
        { radius: 67, scale: 0.2 } );
    };
    const accelerometerIcon = () => {
      const accelerometerIconValueProperty = new Property( 5 ); // the accelerometer icon looks best with ~5 m/s^2 filled in
      return new AccelerometerNode( accelerometerIconValueProperty ).mutate( { scale: 0.3 } );
    };

    const createFrictionSlider = () => new FrictionSlider( model, fontSize, maxTextWidth, tandem );

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

    // Ensure the checkboxes are centered with dynamic locale
    const layoutCheckboxes = ( stringProperties: TReadOnlyProperty<string>[], checkboxes: Node ) => {
      const checkboxesCenterX = checkboxes.centerX;
      Multilink.multilinkAny( stringProperties, () => { checkboxes.centerX = checkboxesCenterX; } );
    };

    // Helper function to create common checkbox items
    const createCommonCheckboxItems = ( includeForces: boolean, includeSumOfForces: boolean, includeAcceleration: boolean ) => {
      const items = [];

      // Force/Forces checkbox (different labels for motion vs friction/acceleration screens)
      if ( includeForces ) {
        items.push( {
          createNode: () => createLabel( model.screen === 'motion' ? forceStringProperty : forcesStringProperty, { icon: createArrowIcon() } ),
          property: model.showForceProperty,
          tandemName: model.screen === 'motion' ? 'forceCheckbox' : 'forcesCheckbox',
          options: {
            accessibleName: model.screen === 'motion' ?
                            ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.force.accessibleNameStringProperty :
                            ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.forces.accessibleNameStringProperty,
            accessibleHelpText: model.screen === 'motion' ?
                                ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.force.accessibleHelpTextStringProperty :
                                ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.forces.accessibleHelpTextStringProperty,
            accessibleContextResponseChecked: model.screen === 'motion' ?
                                              ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.force.accessibleContextResponseCheckedStringProperty :
                                              ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.forces.accessibleContextResponseCheckedStringProperty,
            accessibleContextResponseUnchecked: model.screen === 'motion' ?
                                                ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.force.accessibleContextResponseUncheckedStringProperty :
                                                ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.forces.accessibleContextResponseUncheckedStringProperty
          }
        } );
      }

      // Sum of Forces checkbox (only for friction and acceleration screens)
      if ( includeSumOfForces ) {
        items.push( {
          createNode: () => createLabel( sumOfForcesStringProperty, {}, SUM_OF_FORCES_MAX_WIDTH ),
          property: model.showSumOfForcesProperty,
          tandemName: 'sumOfForcesCheckbox',
          options: {
            accessibleName: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.sumOfForces.accessibleNameStringProperty,
            accessibleHelpText: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.sumOfForces.accessibleHelpTextStringProperty,
            accessibleContextResponseChecked: sumOfForcesDescriptionProperty,
            accessibleContextResponseUnchecked: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.sumOfForces.accessibleContextResponseUncheckedStringProperty
          }
        } );
      }

      // Values checkbox (common to all screens)
      items.push( {
        createNode: () => createLabel( valuesStringProperty ),
        property: model.showValuesProperty,
        tandemName: 'valuesCheckbox',
        options: {
          accessibleName: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.values.accessibleNameStringProperty,
          accessibleHelpText: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.values.accessibleHelpTextStringProperty,
          accessibleContextResponseChecked: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.values.accessibleContextResponseCheckedStringProperty,
          accessibleContextResponseUnchecked: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.values.accessibleContextResponseUncheckedStringProperty
        }
      } );

      // Masses checkbox (common to all screens)
      items.push( {
        createNode: () => createLabel( massesStringProperty ),
        property: model.showMassesProperty,
        tandemName: 'massesCheckbox',
        options: {
          accessibleName: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.masses.accessibleNameStringProperty,
          accessibleHelpText: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.masses.accessibleHelpTextStringProperty,
          accessibleContextResponseChecked: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.masses.accessibleContextResponseCheckedStringProperty,
          accessibleContextResponseUnchecked: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.masses.accessibleContextResponseUncheckedStringProperty
        }
      } );

      // Speed checkbox (common to all screens)
      items.push( {
        createNode: () => createLabel( speedStringProperty, { icon: speedometerIcon() } ),
        property: model.showSpeedProperty,
        tandemName: 'speedCheckbox',
        options: {
          accessibleName: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.speed.accessibleNameStringProperty,
          accessibleHelpText: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.speed.accessibleHelpTextStringProperty,
          accessibleContextResponseChecked: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.speed.accessibleContextResponseCheckedStringProperty,
          accessibleContextResponseUnchecked: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.speed.accessibleContextResponseUncheckedStringProperty
        }
      } );

      // Acceleration checkbox (only for acceleration screen)
      if ( includeAcceleration ) {
        items.push( {
          createNode: () => createLabel( accelerationStringProperty, { icon: accelerometerIcon() } ),
          property: model.showAccelerationProperty,
          tandemName: 'accelerationCheckbox',
          options: {
            accessibleName: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.acceleration.accessibleNameStringProperty,
            accessibleHelpText: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.acceleration.accessibleHelpTextStringProperty,
            accessibleContextResponseChecked: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.acceleration.accessibleContextResponseCheckedStringProperty,
            accessibleContextResponseUnchecked: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.acceleration.accessibleContextResponseUncheckedStringProperty
          }
        } );
      }

      // Stopwatch checkbox (common to all screens) - always last except for acceleration screen
      if ( !includeAcceleration ) {
        items.push( {
          createNode: () => createLabel( stopwatchStringProperty, { icon: createStopwatchIcon() } ),
          property: model.stopwatch.isVisibleProperty,
          tandemName: 'stopwatchCheckbox',
          options: {
            accessibleName: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.stopwatch.accessibleNameStringProperty,
            accessibleHelpText: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.stopwatch.accessibleHelpTextStringProperty,
            accessibleContextResponseChecked: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.stopwatch.accessibleContextResponseCheckedStringProperty,
            accessibleContextResponseUnchecked: ForcesAndMotionBasicsFluent.a11y.motionScreen.motionControlPanel.stopwatch.accessibleContextResponseUncheckedStringProperty
          }
        } );
      }

      return items;
    };

    // Create controls for the 'motion' screen
    const createMotionControls = () => {

      // container node for checkboxes
      const containerNode = new VBox( {
        spacing: VBOX_SPACING
      } );

      // Motion screen: includes force, no sum of forces, no acceleration
      const items = createCommonCheckboxItems( true, false, false );

      // create the checkboxes
      const checkboxGroup = new VerticalCheckboxGroup( items, {
        tandem: tandem.createTandem( 'checkboxGroup' ),
        phetioFeatured: true,
        minContentWidth: minMotionAndFrictionControlsContentWidth
      } );
      containerNode.addChild( checkboxGroup );

      layoutCheckboxes(
        [ forceStringProperty, valuesStringProperty, massesStringProperty, speedStringProperty, stopwatchStringProperty ],
        checkboxGroup );

      return containerNode;
    };

    // Create controls for the 'friction' screen, including a set of checkboxes and a slider
    // The slider is centered under the checkboxes, which are aligned to the left
    const createFrictionControls = () => {

      // container for all controls
      const containerNode = new VBox( {
        spacing: VBOX_SPACING
      } );

      // Friction screen: includes forces, sum of forces, no acceleration
      const items = createCommonCheckboxItems( true, true, false );

      // create the checkboxes
      const checkboxGroup = new VerticalCheckboxGroup( items, {
        tandem: tandem.createTandem( 'checkboxGroup' ),
        phetioFeatured: true,
        minContentWidth: minMotionAndFrictionControlsContentWidth
      } );
      containerNode.addChild( checkboxGroup );

      layoutCheckboxes(
        [ forcesStringProperty, sumOfForcesStringProperty, valuesStringProperty, massesStringProperty, speedStringProperty, stopwatchStringProperty ],
        checkboxGroup );

      containerNode.addChild( createFrictionSlider() );

      return containerNode;
    };

    // Create controls for the 'acceleration' screen
    // The slider is centered under the checkboxes, which are aligned to the left
    const createAccelerationControls = () => {

      // node containing checkboxes, spacing, and slider
      const containerNode = new VBox( {
        spacing: VBOX_SPACING
      } );

      // Acceleration screen: includes forces, sum of forces, and acceleration (no stopwatch)
      const items = createCommonCheckboxItems( true, true, true );

      const checkboxGroup = new VerticalCheckboxGroup( items, {
        tandem: tandem.createTandem( 'checkboxGroup' ),
        phetioFeatured: true,

        // set so the icons appear right-aligned
        minContentWidth: minMotionAndFrictionControlsContentWidth + 10 // empirically determined as the 'acceleration' screen controls have longer strings
      } );
      containerNode.addChild( checkboxGroup );

      layoutCheckboxes(
        [ forcesStringProperty, sumOfForcesStringProperty, valuesStringProperty, massesStringProperty, speedStringProperty, accelerationStringProperty ],
        checkboxGroup );

      // add the slider friction slider under the checkboxes
      containerNode.addChild( createFrictionSlider() );
      return containerNode;
    };

    // collect contents for the panel
    const contents = model.screen === 'motion' ? createMotionControls() :
                     model.screen === 'friction' ? createFrictionControls() :
                     createAccelerationControls();

    const panel = new Panel( contents, {
      xMargin: 12,
      yMargin: 7,
      fill: '#e3e980'
    } );
    this.addChild( panel.mutate( { left: ForcesAndMotionBasicsLayoutBounds.width - panel.width - 5, top: 5 } ) );
  }
}

forcesAndMotionBasics.register( 'MotionControlPanel', MotionControlPanel );