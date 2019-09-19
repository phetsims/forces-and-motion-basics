// Copyright 2017-2019, University of Colorado Boulder

/**
 * IO type for Knot
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  const ObjectIO = require( 'TANDEM/types/ObjectIO' );
  const validate = require( 'AXON/validate' );

  // ifphetio
  const phetioEngine = require( 'ifphetio!PHET_IO/phetioEngine' );

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
        return phetioEngine.getPhetioObject( stateObject );
      }
    }
  }

  KnotIO.documentation = 'A knot';
  KnotIO.validator = { isValidValue: v => v instanceof phet.forcesAndMotionBasics.Knot };
  KnotIO.typeName = 'KnotIO';
  ObjectIO.validateSubtype( KnotIO );

  return forcesAndMotionBasics.register( 'KnotIO', KnotIO );
} );

