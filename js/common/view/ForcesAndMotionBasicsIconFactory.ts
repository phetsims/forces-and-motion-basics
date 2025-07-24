// Copyright 2017-2024, University of Colorado Boulder

/**
 * Static factory for creating icons in Forces and Motion: Basics.
 *
 * @author John Blanco
 */

import Property from '../../../../axon/js/Property.js';
import Range from '../../../../dot/js/Range.js';
import GaugeNode from '../../../../scenery-phet/js/GaugeNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import MotionConstants from '../../motion/MotionConstants.js';

const speedStringProperty = ForcesAndMotionBasicsFluent.speedStringProperty;

/**
 * Static object, not meant to be instantiated.
 */
const ForcesAndMotionBasicsIconFactory = {
  speedometerIcon(): GaugeNode {

    // the 'speed' option requires the text and a speedometer icon
    const speedometerIconValueProperty = new Property( 0 );
    return new GaugeNode( speedometerIconValueProperty, speedStringProperty, new Range( 0, MotionConstants.MAX_SPEED ),
      { radius: 67, scale: 0.2, tandem: Tandem.OPT_OUT } );
  }
};

forcesAndMotionBasics.register( 'ForcesAndMotionBasicsIconFactory', ForcesAndMotionBasicsIconFactory );

export default ForcesAndMotionBasicsIconFactory;