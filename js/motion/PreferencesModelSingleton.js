// Copyright 2024, University of Colorado Boulder

/**
 * Preferences model as a singleton, so it can be accessed by the HumanTypeEnum.
 *
 * @author Luisa Vargas
 */

import PreferencesModel from '../../../joist/js/preferences/PreferencesModel.js';
import forcesAndMotionBasics from '../forcesAndMotionBasics.js';
import MassPlayerImages from './view/MassPlayerImages.js';

const PreferencesModelSingleton = new PreferencesModel( {
  localizationOptions: {
    portrayals: MassPlayerImages.MASS_PLAYER_PORTRAYALS
  }
} );

forcesAndMotionBasics.register( 'PreferencesModelSingleton', PreferencesModelSingleton );
export default PreferencesModelSingleton;