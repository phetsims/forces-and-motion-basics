// Copyright 2017-2018, University of Colorado Boulder

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
  
  // phet-io modules
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertInstanceOf' );
  var ObjectIO = require( 'ifphetio!PHET_IO/types/ObjectIO' );
  var phetio = require( 'ifphetio!PHET_IO/phetio' );
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );

  /**
   * @param {Knot} knot
   * @param {string} phetioID
   * @constructor
   */
  function KnotIO( knot, phetioID ) {
    assert && assertInstanceOf( knot, phet.forcesAndMotionBasics.Knot );
    ObjectIO.call( this, knot, phetioID );
  }

  phetioInherit( ObjectIO, 'KnotIO', KnotIO, {}, {
    documentation: 'A knot',

    toStateObject: function( knot ) {
      assert && assertInstanceOf( knot, phet.forcesAndMotionBasics.Knot );
      if ( knot ) {
        return knot.tandem.phetioID;
      }
      else {
        return 'null';
      }
    },

    fromStateObject: function( stateObject ) {
      if ( stateObject === 'null' ) {
        return null;
      }
      else {
        return phetio.getInstance( stateObject );
      }
    }
  } );

  forcesAndMotionBasics.register( 'KnotIO', KnotIO );

  return KnotIO;
} );

