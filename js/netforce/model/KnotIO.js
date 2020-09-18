// Copyright 2017-2020, University of Colorado Boulder

/**
 * IO Type for Knot
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */

import IOType from '../../../../tandem/js/types/IOType.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

const KnotIO = new IOType( 'KnotIO', {
  isValidValue: v => v instanceof phet.forcesAndMotionBasics.Knot,

  /**
   * @param {Knot} knot
   * @returns {string}
   * @public
   * @override
   */
  toStateObject( knot ) {
    if ( knot ) {
      return knot.tandem.phetioID;
    }
    else {
      return 'null';
    }
  },

  /**
   * @param {Object} stateObject
   * @returns {Knot}
   * @public
   * @override
   */
  fromStateObject( stateObject ) {
    if ( stateObject === 'null' ) {
      return null;
    }
    else {
      return phet.phetio.phetioEngine.getPhetioObject( stateObject );
    }
  }
} );

forcesAndMotionBasics.register( 'KnotIO', KnotIO );
export default KnotIO;