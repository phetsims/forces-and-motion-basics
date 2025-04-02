// Copyright 2024-2025, University of Colorado Boulder

/**
 * PullerColorControl is the control used to choose the colors of the pushers and pullers in the Net Force screen.
 * The user can change the colors, but they will revert back to the default on a reset. This control is
 * intended to appear in the Preferences dialog.
 *
 * @author Luisa Vargas
 */

import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PreferencesDialogConstants from '../../../../joist/js/preferences/PreferencesDialogConstants.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VerticalAquaRadioButtonGroup from '../../../../sun/js/VerticalAquaRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';

export default class PullerColorControl extends VBox {

  public constructor( netForcePullerColorsProperty: StringUnionProperty<'blueRed' | 'purpleOrange'>, tandem: Tandem ) {

    const text = new Text( ForcesAndMotionBasicsStrings.netForcePullerColorsStringProperty, {
      font: PreferencesDialogConstants.PANEL_SECTION_LABEL_FONT,
      maxWidth: 500
    } );

    /**
     * Create an item for the radio button group.
     * @param value - value associated with the radio button
     * @param labelStringProperty - label that appears on the radio button
     */
    const createItem = ( value: 'blueRed' | 'purpleOrange', labelStringProperty: TReadOnlyProperty<string>, tandemName: string ) => {
      return {
        value: value,
        tandemName: tandemName,
        createNode: () => new Text( labelStringProperty, {
          font: PreferencesDialogConstants.CONTENT_FONT,
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
        'blueRed',
        ForcesAndMotionBasicsStrings.blueAndRedStringProperty,
        'blueRedRadioButton'
      ),
      createItem(
        'purpleOrange',
        ForcesAndMotionBasicsStrings.purpleAndOrangeStringProperty,
        'purpleOrangeRadioButton'
      )
    ];

    const radioButtonGroup = new VerticalAquaRadioButtonGroup( netForcePullerColorsProperty, items, {

      // pdom
      accessibleName: ForcesAndMotionBasicsStrings.netForcePullerColorsStringProperty,
      tandem: tandem.createTandem( 'radioButtonGroup' )
    } );

    super( {
      children: [ text, radioButtonGroup ],
      spacing: 8,
      align: 'center',
      isDisposable: false,
      tandem: tandem,
      phetioFeatured: true,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    this.addLinkedElement( netForcePullerColorsProperty );
  }
}

forcesAndMotionBasics.register( 'PullerColorControl', PullerColorControl );