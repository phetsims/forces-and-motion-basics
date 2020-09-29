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

  // TODO: https://github.com/phetsims/tandem/issues/215 use ReferenceIO or equivalent
  toStateObject: knot => {
    if ( knot ) {
      return knot.tandem.phetioID;
    }
    else {
      return 'null';
    }
  },
  fromStateObject: stateObject => {
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