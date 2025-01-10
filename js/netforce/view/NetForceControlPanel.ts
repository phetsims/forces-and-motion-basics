// Copyright 2013-2025, University of Colorado Boulder

/**
 * Control panel with options to show sum of forces and values, and also buttons below the control panel for reset all and sound.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import merge from '../../../../phet-core/js/merge.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { HBox, Node, NodeOptions, Text } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import VerticalCheckboxGroup from '../../../../sun/js/VerticalCheckboxGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ForcesAndMotionBasicsIconFactory from '../../common/view/ForcesAndMotionBasicsIconFactory.js';
import ForcesAndMotionBasicsLayoutBounds from '../../common/view/ForcesAndMotionBasicsLayoutBounds.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';
import NetForceModel from '../model/NetForceModel.js';

// constants
const BUTTON_PADDING = 7; // placement padding for the reset all button and the mute button

// strings
const speedStringProperty = ForcesAndMotionBasicsStrings.speedStringProperty;
const sumOfForcesStringProperty = ForcesAndMotionBasicsStrings.sumOfForcesStringProperty;
const valuesStringProperty = ForcesAndMotionBasicsStrings.valuesStringProperty;

type SelfOptions = EmptySelfOptions;
type NetForceControlPanelOptions = NodeOptions & SelfOptions;
export default class NetForceControlPanel extends Node {
  private readonly verticalCheckboxGroup: VerticalCheckboxGroup;
  private readonly resetAllButton: ResetAllButton;

  /**
   * Create the NetForceControlPanel.
   *
   * @param model the model for this control panel
   * @param tandem
   * @param providedOptions
   */
  public constructor( model: NetForceModel, tandem: Tandem, providedOptions?: NetForceControlPanelOptions ) {
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
    const showSpeedTextNode = new Text( speedStringProperty, merge( { tandem: tandem.createTandem( 'showSpeedText' ) }, speedFontOptions ) );

    const verticalCheckboxGroupTandem = tandem.createTandem( 'verticalCheckboxGroup' );
    this.verticalCheckboxGroup = new VerticalCheckboxGroup( [ {
      createNode: tandem => new Text( sumOfForcesStringProperty, merge( { tandem: tandem.createTandem( 'showSumOfForcesText' ) }, fontOptions ) ),
      property: model.showSumOfForcesProperty,
      tandemName: 'showSumOfForcesCheckbox'
    }, {
      createNode: tandem => new Text( valuesStringProperty, merge( { tandem: tandem.createTandem( 'showValuesText' ) }, fontOptions ) ),
      property: model.showValuesProperty,
      tandemName: 'showValuesCheckbox'
    }, {
      createNode: tandem => new HBox( {
        children: [ showSpeedTextNode, speedometerIconNode ],
        tandem: tandem.createTandem( 'showSpeedContent' ),
        spacing: speedTextAndSpeedometerIconSpacing
      } ),
      property: model.showSpeedProperty,
      tandemName: 'showSpeedCheckbox'
    } ], {
      tandem: verticalCheckboxGroupTandem,
      minContentWidth: 100
    } );
    const verticalCheckboxGroupPanel = new Panel( this.verticalCheckboxGroup, {
      xMargin: 10,
      yMargin: 10,
      fill: '#e3e980',
      tandem: tandem.createTandem( 'verticalCheckboxGroupPanel' )
    } );
    this.addChild( verticalCheckboxGroupPanel );

    //Create sound and reset buttons, and size them to be the same height.  They appear below the top panel
    this.resetAllButton = new ResetAllButton( {
      listener: () => {
        model.reset();
      },
      radius: 23,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( this.resetAllButton );

    // Update the layout to support dynamic locale
    Multilink.multilink( [ sumOfForcesStringProperty, valuesStringProperty, speedStringProperty ], () => {
      verticalCheckboxGroupPanel.right = ForcesAndMotionBasicsLayoutBounds.width - 5;

      // TODO: How should layout occur here when checkbox is hidden? https://github.com/phetsims/forces-and-motion-basics/issues/342
      if ( verticalCheckboxGroupPanel.bounds.isFinite() ) {
        this.resetAllButton.rightCenter = verticalCheckboxGroupPanel.rightBottom.plusXY( -BUTTON_PADDING, 35 );
      }
    } );
  }
}

forcesAndMotionBasics.register( 'NetForceControlPanel', NetForceControlPanel );