// Copyright 2024, University of Colorado Boulder
/**
 *  ForcesAndMotionBasicsPreferencesNode is the user interface for sim-specific preferences, accessed via the
 *  Preferences dialog. These preferences are global and affect all screens.
 *
 * @author Luisa Vargas
 */

import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import { VBox } from '../../../../scenery/js/imports.js';
import ForcesAndMotionBasicsPreferences from '../model/ForcesAndMotionBasicsPreferences.js';
import PullerColorControl from './PullerColorControl.js';

class ForcesAndMotionBasicsPreferencesNode extends VBox {
  constructor() {
    const pusherPullerColorControl = new PullerColorControl(
      ForcesAndMotionBasicsPreferences.pullerColorProperty
    );

    super( {
      align: 'left',
      children: [ pusherPullerColorControl ],
      spacing: 20
    } );
  }
}

forcesAndMotionBasics.register( 'ForcesAndMotionBasicsPreferencesNode', ForcesAndMotionBasicsPreferencesNode );
export default ForcesAndMotionBasicsPreferencesNode;