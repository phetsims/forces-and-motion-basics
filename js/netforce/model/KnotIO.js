// Copyright 2017-2019, University of Colorado Boulder

/**
 * IO type for Knot
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var ObjectIO = require( 'TANDEM/types/ObjectIO' );
  var phetioInherit = require( 'TANDEM/phetioInherit' );
  var validate = require( 'AXON/validate' );

  // ifphetio
  var phetioEngine = require( 'ifphetio!PHET_IO/phetioEngine' );

  /**
   * @param {Knot} knot
   * @param {string} phetioID
   * @constructor
   */
  function KnotIO( knot, phetioID ) {
    ObjectIO.call( this, knot, phetioID );
  }

  phetioInherit( ObjectIO, 'KnotIO', KnotIO, {}, {
    documentation: 'A knot',
    validator: { isValidValue: v => v instanceof phet.forcesAndMotionBasics.Knot },

    /**
     * @param {Knot} knot
     * @returns {string}
     * @override
     */
    toStateObject: function( knot ) {
      validate( knot, this.validator );
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
     * @override
     */
    fromStateObject: function( stateObject ) {
      if ( stateObject === 'null' ) {
        return null;
      }
      else {
        return phetioEngine.getPhetioObject( stateObject );
      }
    }
  } );

  forcesAndMotionBasics.register( 'KnotIO', KnotIO );

  return KnotIO;
} );

