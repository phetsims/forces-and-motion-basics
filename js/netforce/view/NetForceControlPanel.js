// Copyright 2013-2023, University of Colorado Boulder

/**
 * Control panel with options to show sum of forces and values, and also buttons below the control panel for reset all and sound.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import SoundToggleButton from '../../../../scenery-phet/js/buttons/SoundToggleButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { HBox, Node, Text } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import VerticalCheckboxGroup from '../../../../sun/js/VerticalCheckboxGroup.js';
import ForcesAndMotionBasicsIconFactory from '../../common/view/ForcesAndMotionBasicsIconFactory.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';

const sumOfForcesString = ForcesAndMotionBasicsStrings.sumOfForces;
const valuesString = ForcesAndMotionBasicsStrings.values;

// constants
const BUTTON_PADDING = 7; // placement padding for the reset all button and the mute button

// strings
const speedString = ForcesAndMotionBasicsStrings.speed;

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

    const fontOptions = { font: new PhetFont( 18 ), maxWidth: 230 };

    // the content for "show speed" is a label with an icon
    const speedometerIconNode = ForcesAndMotionBasicsIconFactory.speedometerIcon( tandem.createTandem( 'speedometerIconNode' ) );
    const showSpeedTextNode = new Text( speedString, merge( { tandem: tandem.createTandem( 'showSpeedText' ) }, fontOptions ) );

    const verticalCheckboxGroupTandem = tandem.createTandem( 'verticalCheckboxGroup' );
    this.verticalCheckboxGroup = new VerticalCheckboxGroup( [ {
      createNode: tandem => new Text( sumOfForcesString, merge( { tandem: tandem.createTandem( 'showSumOfForcesText' ) }, fontOptions ) ),
      property: model.showSumOfForcesProperty,
      tandemName: 'showSumOfForcesCheckbox'
    }, {
      createNode: tandem => new Text( valuesString, merge( { tandem: tandem.createTandem( 'showValuesText' ) }, fontOptions ) ),
      property: model.showValuesProperty,
      tandemName: 'showValuesCheckbox'
    }, {
      createNode: tandem => new HBox( {
        children: [ showSpeedTextNode, speedometerIconNode ],
        tandem: tandem.createTandem( 'showSpeedContent' ),
        spacing: 10
      } ),
      property: model.showSpeedProperty,
      tandemName: 'showSpeedCheckbox'
    } ], {
      tandem: verticalCheckboxGroupTandem
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
      rightCenter: verticalCheckboxGroupPanel.rightBottom.plusXY( -BUTTON_PADDING, 35 ),
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( this.resetAllButton );

    const soundToggleButton = new SoundToggleButton( model.volumeOnProperty, {
      padX: 19,
      padY: 19,
      centerY: this.resetAllButton.centerY,
      tandem: tandem.createTandem( 'soundToggleButton' )
    } );

    // layout
    soundToggleButton.left = verticalCheckboxGroupPanel.left + BUTTON_PADDING;

    // i18n - if the strings are too short, the sound toggle button will overlap the reset all button, add some padding
    if ( this.resetAllButton.left < soundToggleButton.right ) {
      soundToggleButton.right = this.resetAllButton.left - 2 * BUTTON_PADDING;
    }

    this.addChild( soundToggleButton );
  }
}

forcesAndMotionBasics.register( 'NetForceControlPanel', NetForceControlPanel );

export default NetForceControlPanel;