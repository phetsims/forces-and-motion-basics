// Copyright 2024, University of Colorado Boulder

/**
 * ForcesAndMotionBasicsPreferences is the model for sim-specific preferences.  The values declared here can be updated via
 * the Preferences dialog.
 *
 * @author Luisa Vargas
 */

import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import ForcesAndMotionBasicsQueryParameters from '../../common/ForcesAndMotionBasicsQueryParameters.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import PullerColors from './PullerColors.js';

// map used to set the pusher / puller colors based on the value of a query parameter
const mapStringToColorSet = new Map<string, PullerColors>( [
  [ 'blueRed', PullerColors.BLUE_AND_RED ],
  [ 'purpleOrange', PullerColors.PURPLE_AND_ORANGE ]
] );

const pullerColorString = ForcesAndMotionBasicsQueryParameters.pullerColor!;

const pullerColor = mapStringToColorSet.get( pullerColorString );

const ForcesAndMotionBasicsPreferences = {

  // @ts-expect-error
  pullerColorProperty: new EnumerationProperty( pullerColor )
};

forcesAndMotionBasics.register( 'ForcesAndMotionBasicsPreferences', ForcesAndMotionBasicsPreferences );
export default ForcesAndMotionBasicsPreferences;