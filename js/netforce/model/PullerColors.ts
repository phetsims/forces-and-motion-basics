// Copyright 2024, University of Colorado Boulder

/**
 * Enumeration of puller color sets used in the Forces and Motion: Basics simulation.
 *
 * @author Luisa Vargas
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

class PullerColors extends EnumerationValue {
  static BLUE_AND_RED = new PullerColors();
  static PURPLE_AND_ORANGE = new PullerColors();

  // Gets a list of keys, values and mapping between them.  For use in EnumerationProperty
  static enumeration = new Enumeration( PullerColors );
}

forcesAndMotionBasics.register( 'PullerColors', PullerColors );
export default PullerColors;