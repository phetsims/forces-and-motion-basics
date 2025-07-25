// Copyright 2024-2025, University of Colorado Boulder
/**
 *  ForcesAndMotionBasicsPreferencesNode is the user interface for sim-specific preferences, accessed via the
 *  Preferences dialog. These preferences are global and affect all screens.
 *
 * @author Luisa Vargas (PhET Interactive Simulations)
 */

import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsPreferences from '../model/ForcesAndMotionBasicsPreferences.js';
import PullerColorControl from './PullerColorControl.js';

export default class ForcesAndMotionBasicsPreferencesNode extends VBox {
  public constructor( tandem: Tandem ) {
    const pullerColorControl = new PullerColorControl(
      ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty,
      tandem.createTandem( 'netForcePullerColorsControl' )
    );
    super( {
      align: 'left',
      children: [ pullerColorControl ],
      spacing: 20,
      tandem: tandem
    } );
  }
}

forcesAndMotionBasics.register( 'ForcesAndMotionBasicsPreferencesNode', ForcesAndMotionBasicsPreferencesNode );