// Copyright 2017-2022, University of Colorado Boulder

/**
 * Static factory for creating icons in Forces and Motion: Basics.
 *
 * @author John Blanco
 */

import Property from '../../../../axon/js/Property.js';
import Range from '../../../../dot/js/Range.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GaugeNode from '../../../../scenery-phet/js/GaugeNode.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';
import MotionConstants from '../../motion/MotionConstants.js';

const speedString = ForcesAndMotionBasicsStrings.speed;

/**
 * Static object, not meant to be instantiated.
 */
const ForcesAndMotionBasicsIconFactory = {
  speedometerIcon( tandem ) {

    // the 'speed' option requires the text and a speedometer icon
    const speedometerIconValueProperty = new Property( 0 );
    return new GaugeNode( speedometerIconValueProperty, speedString, new Range( 0, MotionConstants.MAX_SPEED ),
      { radius: 67, scale: 0.2, tandem: Tandem.OPT_OUT } );
  }
};

forcesAndMotionBasics.register( 'ForcesAndMotionBasicsIconFactory', ForcesAndMotionBasicsIconFactory );

export default ForcesAndMotionBasicsIconFactory;