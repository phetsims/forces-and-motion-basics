// Copyright 2013-2024, University of Colorado Boulder

/**
 * Control panel with options to show sum of forces and values, and also buttons below the control panel for reset all and sound.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import merge from '../../../../phet-core/js/merge.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import SoundToggleButton from '../../../../scenery-phet/js/buttons/SoundToggleButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { HBox, Node, Text } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import VerticalCheckboxGroup from '../../../../sun/js/VerticalCheckboxGroup.js';
import ForcesAndMotionBasicsIconFactory from '../../common/view/ForcesAndMotionBasicsIconFactory.js';
import ForcesAndMotionBasicsLayoutBounds from '../../common/view/ForcesAndMotionBasicsLayoutBounds.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';

// constants
const BUTTON_PADDING = 7; // placement padding for the reset all button and the mute button

// strings
const speedStringProperty = ForcesAndMotionBasicsStrings.speedStringProperty;
const sumOfForcesStringProperty = ForcesAndMotionBasicsStrings.sumOfForcesStringProperty;
const valuesStringProperty = ForcesAndMotionBasicsStrings.valuesStringProperty;

class NetForceControlPanel extends Node {
  /**
   * Create the NetForceControlPanel.
   *
   * @param {NetForceModel} model the model for this control panel
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( model, tandem, options ) {
    options = merge( { tandem: tandem }, options );
    super( options );

    const fontOptions = { font: new PhetFont( 18 ), maxWidth: 115 };

    // the content for "show speed" is a label with an icon
    const speedometerIconNode = ForcesAndMotionBasicsIconFactory.speedometerIcon( tandem.createTandem( 'speedometerIconNode' ) );
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

    const soundToggleButton = new SoundToggleButton( model.volumeOnProperty, {
      padX: 19,
      padY: 19,
      tandem: tandem.createTandem( 'soundToggleButton' )
    } );

    this.addChild( soundToggleButton );

    // Update the layout to support dynamic locale
    Multilink.multilink( [ sumOfForcesStringProperty, valuesStringProperty, speedStringProperty ], () => {
      verticalCheckboxGroupPanel.right = ForcesAndMotionBasicsLayoutBounds.width - 5;
      this.resetAllButton.rightCenter = verticalCheckboxGroupPanel.rightBottom.plusXY( -BUTTON_PADDING, 35 );
      soundToggleButton.left = verticalCheckboxGroupPanel.left + BUTTON_PADDING;
      soundToggleButton.centerY = this.resetAllButton.centerY;

      // i18n - if the strings are too short, the sound toggle button will overlap the reset all button, add some padding
      if ( this.resetAllButton.left < soundToggleButton.right ) {
        soundToggleButton.right = this.resetAllButton.left - 2 * BUTTON_PADDING;
      }
    } );
  }
}

forcesAndMotionBasics.register( 'NetForceControlPanel', NetForceControlPanel );

export default NetForceControlPanel;