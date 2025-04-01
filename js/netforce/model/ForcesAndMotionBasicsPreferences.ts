// Copyright 2024, University of Colorado Boulder

/**
 * ForcesAndMotionBasicsPreferences is the model for sim-specific preferences.  The values declared here can be updated via
 * the Preferences dialog.
 *
 * @author Luisa Vargas
 */

import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ForcesAndMotionBasicsQueryParameters from '../../common/ForcesAndMotionBasicsQueryParameters.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

const ForcesAndMotionBasicsPreferences = {
  netForcePullerColorsProperty: new StringUnionProperty<'blueRed' | 'purpleOrange'>( ForcesAndMotionBasicsQueryParameters.pullerColor as 'blueRed' | 'purpleOrange', {
    validValues: [ 'blueRed', 'purpleOrange' ],
    tandem: Tandem.PREFERENCES.createTandem( 'netForcePullerColorsProperty' ),
    phetioFeatured: true
  } )
};

forcesAndMotionBasics.register( 'ForcesAndMotionBasicsPreferences', ForcesAndMotionBasicsPreferences );
export default ForcesAndMotionBasicsPreferences;