// Copyright 2024, University of Colorado Boulder

/**
 * PullerColorControl is the control used to choose the colors of the pushers and pullers in the Net Force screen.
 * The user can change the colors, but they will revert back to the default on a reset. This control is
 * intended to appear in the Preferences dialog.
 *
 * @author Luisa Vargas
 */

import PreferencesDialog from '../../../../joist/js/preferences/PreferencesDialog.js';
import { Text, VBox } from '../../../../scenery/js/imports.js';
import VerticalAquaRadioButtonGroup from '../../../../sun/js/VerticalAquaRadioButtonGroup.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';
import PullerColors from '../model/PullerColors.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

export default class PullerColorControl extends VBox {

  public constructor( pullerColorProperty: IntentionalAny ) {

    const text = new Text( ForcesAndMotionBasicsStrings.netForcePullerColorsStringProperty, {
      font: PreferencesDialog.PANEL_SECTION_LABEL_FONT,
      maxWidth: 500
    } );

    /**
     * Create an item for the radio button group.
     * @param value - value associated with the radio button
     * @param labelStringProperty - label that appears on the radio button
     */
    const createItem = ( value: PullerColors, labelStringProperty: TReadOnlyProperty<string> ) => {
      return {
        value: value,
        createNode: () => new Text( labelStringProperty, {
          font: PreferencesDialog.CONTENT_FONT,
          maxWidth: 500
        } ),
        options: {
          accessibleName: labelStringProperty
        }
      };
    };

    // Items that describe the radio buttons
    const items = [
      createItem(
        PullerColors.BLUE_AND_RED,
        ForcesAndMotionBasicsStrings.blueAndRedStringProperty
      ),
      createItem(
        PullerColors.PURPLE_AND_ORANGE,
        ForcesAndMotionBasicsStrings.purpleAndOrangeStringProperty
      )
    ];


    const radioButtonGroup = new VerticalAquaRadioButtonGroup( pullerColorProperty, items, {

      // pdom
      // @ts-expect-error
      labelContent: ForcesAndMotionBasicsStrings.netForcePullerColorsStringProperty
    } );

    super( {
      children: [ text, radioButtonGroup ],
      spacing: 8,
      align: 'center',
      isDisposable: false
    } );
  }
}

forcesAndMotionBasics.register( 'PullerColorControl', PullerColorControl );