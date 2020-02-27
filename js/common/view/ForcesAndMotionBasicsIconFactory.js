// Copyright 2017-2019, University of Colorado Boulder

/**
 * Static factory for creating icons in Forces and Motion: Basics.
 *
 * @author John Blanco
 */

import Property from '../../../../axon/js/Property.js';
import Range from '../../../../dot/js/Range.js';
import GaugeNode from '../../../../scenery-phet/js/GaugeNode.js';
import forcesAndMotionBasicsStrings from '../../forces-and-motion-basics-strings.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import MotionConstants from '../../motion/MotionConstants.js';

const speedString = forcesAndMotionBasicsStrings.speed;

/**
 * Static object, not meant to be instantiated.
 */
const ForcesAndMotionBasicsIconFactory = {
  speedometerIcon: function( tandem ) {

    // the 'speed' option requires the text and a speedometer icon
    const speedometerIconValueProperty = new Property( 0 );
    return new GaugeNode( speedometerIconValueProperty, speedString, new Range( 0, MotionConstants.MAX_SPEED ),
      { radius: 67, scale: 0.2, tandem: tandem.createTandem( 'speedometerIcon' ) } );
  }
};

forcesAndMotionBasics.register( 'ForcesAndMotionBasicsIconFactory', ForcesAndMotionBasicsIconFactory );

export default ForcesAndMotionBasicsIconFactory;