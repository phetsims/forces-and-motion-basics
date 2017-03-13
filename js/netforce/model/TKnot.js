// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertions/assertInstanceOf' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );
  var TObject = require( 'ifphetio!PHET_IO/types/TObject' );
  var phetio = require( 'ifphetio!PHET_IO/phetio' );

  var TKnot = function( instance, phetioID ) {
    assert && assert( !!instance, 'instance should exist' );
    assertInstanceOf( instance, phet.forcesAndMotionBasics.Knot );
    TObject.call( this, instance, phetioID );
  };

  phetioInherit( TObject, 'TKnot', TKnot, {}, {

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

