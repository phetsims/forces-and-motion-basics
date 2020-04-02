// Copyright 2017-2020, University of Colorado Boulder

/**
 * IO type for Knot
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */

import validate from '../../../../axon/js/validate.js';
import ObjectIO from '../../../../tandem/js/types/ObjectIO.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

class KnotIO extends ObjectIO {

  /**
   * @param {Knot} knot
   * @returns {string}
   * @override
   */
  static toStateObject( knot ) {
    validate( knot, this.validator );
    if ( knot ) {
      return knot.tandem.phetioID;
    }
    else {
      return 'null';
    }
  }

  /**
   * @param {Object} stateObject
   * @returns {Knot}
   * @override
   */
  static fromStateObject( stateObject ) {
    if ( stateObject === 'null' ) {
      return null;
    }
    else {
      return phet.phetio.phetioEngine.getPhetioObject( stateObject );
    }
  }
}

KnotIO.documentation = 'A knot';
KnotIO.validator = { isValidValue: v => v instanceof phet.forcesAndMotionBasics.Knot };
KnotIO.typeName = 'KnotIO';
ObjectIO.validateSubtype( KnotIO );

forcesAndMotionBasics.register( 'KnotIO', KnotIO );
export default KnotIO;