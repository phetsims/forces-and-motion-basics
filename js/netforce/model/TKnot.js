// Copyright 2017, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertInstanceOf' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var phetio = require( 'ifphetio!PHET_IO/phetio' );
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );
  var TObject = require( 'ifphetio!PHET_IO/types/TObject' );

  /**
   *
   * @param instance
   * @param phetioID
   * @constructor
   */
  function TKnot( instance, phetioID ) {
    assert && assert( !!instance, 'instance should exist' );
    assert && assertInstanceOf( instance, phet.forcesAndMotionBasics.Knot );
    TObject.call( this, instance, phetioID );
  }

  phetioInherit( TObject, 'TKnot', TKnot, {}, {
    documentation: 'A knot',

    fromStateObject: function( stateObject ) {
      if ( stateObject === 'null' ) {
        return null;
      }
      else {
        return phetio.getWrapper( stateObject ).instance;
      }
    },

    toStateObject: function( instance ) {
      if ( instance ) {
        assert && assert( instance.phetioID, 'id should exist' );
        return instance.phetioID;
      }
      else {
        return 'null';
      }
    }
  } );

  forcesAndMotionBasics.register( 'TKnot', TKnot );

  return TKnot;
} );

