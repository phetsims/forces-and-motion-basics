// Copyright 2013-2025, University of Colorado Boulder

/**
 * Control panel with options to show sum of forces and values, and also buttons below the control panel for reset all and sound.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Panel from '../../../../sun/js/Panel.js';
import VerticalCheckboxGroup from '../../../../sun/js/VerticalCheckboxGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ForcesAndMotionBasicsIconFactory from '../../common/view/ForcesAndMotionBasicsIconFactory.js';
import ForcesAndMotionBasicsLayoutBounds from '../../common/view/ForcesAndMotionBasicsLayoutBounds.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import NetForceModel from '../model/NetForceModel.js';

// strings
const speedStringProperty = ForcesAndMotionBasicsFluent.speedStringProperty;
const sumOfForcesStringProperty = ForcesAndMotionBasicsFluent.sumOfForcesStringProperty;
const valuesStringProperty = ForcesAndMotionBasicsFluent.valuesStringProperty;

type SelfOptions = EmptySelfOptions;
type NetForceControlPanelOptions = NodeOptions & SelfOptions;

export default class NetForceControlPanel extends Node {
  private readonly verticalCheckboxGroup: VerticalCheckboxGroup;
  private readonly verticalCheckboxGroupPanel: Panel;

  public constructor(
    model: NetForceModel,
    tandem: Tandem,
    netForceDescription: TReadOnlyProperty<string>,
    speedDescriptionProperty: TReadOnlyProperty<string>,
    providedOptions?: NetForceControlPanelOptions
  ) {
    const options = optionize<NetForceControlPanelOptions, SelfOptions, NodeOptions>()( {
      tandem: tandem
    }, providedOptions );
    super( options );

    const fontOptions = { font: new PhetFont( 18 ), maxWidth: 115 };

    // the content for "show speed" is a label with an icon
    const speedometerIconNode = ForcesAndMotionBasicsIconFactory.speedometerIcon();
    const speedTextAndSpeedometerIconSpacing = 10;

    // Create a separate font options to account for the speedometerIconNode and speedTextAndSpeedometerIconSpacing
    const speedFontOptions = { font: fontOptions.font, maxWidth: fontOptions.maxWidth - speedometerIconNode.width - speedTextAndSpeedometerIconSpacing };
    const showSpeedTextNode = new Text( speedStringProperty, speedFontOptions );

    const verticalCheckboxGroupTandem = tandem.createTandem( 'checkboxGroup' );
    this.verticalCheckboxGroup = new VerticalCheckboxGroup( [ {
      createNode: () => new Text( sumOfForcesStringProperty, fontOptions ),
      property: model.showSumOfForcesProperty,
      tandemName: 'sumOfForcesCheckbox',
      options: {
        accessibleName: ForcesAndMotionBasicsFluent.a11y.netForceScreen.netForceControlPanel.sumOfForces.accessibleNameStringProperty,
        accessibleHelpText: ForcesAndMotionBasicsFluent.a11y.netForceScreen.netForceControlPanel.sumOfForces.accessibleHelpTextStringProperty,

        // When checked, read the dynamic description of the net force which is the same as in the PDOM description, see https://github.com/phetsims/forces-and-motion-basics/issues/417
        accessibleContextResponseChecked: netForceDescription,
        accessibleContextResponseUnchecked: ForcesAndMotionBasicsFluent.a11y.netForceScreen.netForceControlPanel.sumOfForces.accessibleContextResponseUncheckedStringProperty
      }
    }, {
      createNode: () => new Text( valuesStringProperty, fontOptions ),
      property: model.showValuesProperty,
      tandemName: 'valuesCheckbox',
      options: {
        accessibleName: ForcesAndMotionBasicsFluent.a11y.netForceScreen.netForceControlPanel.values.accessibleNameStringProperty,
        accessibleHelpText: ForcesAndMotionBasicsFluent.a11y.netForceScreen.netForceControlPanel.values.accessibleHelpTextStringProperty,
        accessibleContextResponseChecked: ForcesAndMotionBasicsFluent.a11y.netForceScreen.netForceControlPanel.values.accessibleContextResponseCheckedStringProperty,
        accessibleContextResponseUnchecked: ForcesAndMotionBasicsFluent.a11y.netForceScreen.netForceControlPanel.values.accessibleContextResponseUncheckedStringProperty
      }
    }, {
      createNode: tandem => new HBox( {
        children: [ showSpeedTextNode, speedometerIconNode ],
        spacing: speedTextAndSpeedometerIconSpacing
      } ),
      property: model.showSpeedProperty,
      tandemName: 'speedCheckbox',
      options: {
        accessibleName: ForcesAndMotionBasicsFluent.a11y.netForceScreen.netForceControlPanel.speed.accessibleNameStringProperty,
        accessibleHelpText: ForcesAndMotionBasicsFluent.a11y.netForceScreen.netForceControlPanel.speed.accessibleHelpTextStringProperty,
        accessibleContextResponseChecked: speedDescriptionProperty,
        accessibleContextResponseUnchecked: ForcesAndMotionBasicsFluent.a11y.netForceScreen.netForceControlPanel.speed.accessibleContextResponseUncheckedStringProperty
      }
    } ], {
      tandem: verticalCheckboxGroupTandem,
      minContentWidth: 100,
      visiblePropertyOptions: { phetioFeatured: true }
    } );
    this.verticalCheckboxGroupPanel = new Panel( this.verticalCheckboxGroup, {
      xMargin: 10,
      yMargin: 10,
      fill: '#e3e980'
    } );
    this.addChild( this.verticalCheckboxGroupPanel );

    // Update the layout to support dynamic locale
    Multilink.multilink( [ sumOfForcesStringProperty, valuesStringProperty, speedStringProperty ], () => {
      this.verticalCheckboxGroupPanel.right = ForcesAndMotionBasicsLayoutBounds.width - 5;
    } );
  }
}

forcesAndMotionBasics.register( 'NetForceControlPanel', NetForceControlPanel );