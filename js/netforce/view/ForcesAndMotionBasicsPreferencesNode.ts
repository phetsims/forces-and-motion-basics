// Copyright 2024, University of Colorado Boulder
/**
 *  ForcesAndMotionBasicsPreferencesNode is the user interface for sim-specific preferences, accessed via the
 *  Preferences dialog. These preferences are global and affect all screens.
 *
 * @author Luisa Vargas
 */

import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsPreferences from '../model/ForcesAndMotionBasicsPreferences.js';
import PullerColorControl from './PullerColorControl.js';

export default class ForcesAndMotionBasicsPreferencesNode extends VBox {
  public constructor() {
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