// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOf = require( 'PHET_IO/assertions/assertInstanceOf' );
  var phetioNamespace = require( 'PHET_IO/phetioNamespace' );
  var phetioInherit = require( 'PHET_IO/phetioInherit' );
  var TObject = require( 'PHET_IO/types/TObject' );
  var TVoid = require( 'PHET_IO/types/TVoid' );

  var TNetForceModel = function( instance, phetioID ) {
    assert && assert( !!instance, 'instance should exist' );
    assertInstanceOf( instance, phet.forcesAndMotionBasics.NetForceModel );
    TObject.call( this, instance, phetioID );
  };

  phetioInherit( TObject, 'TNetForceModel', TNetForceModel, {

    reset: {
      returnType: TVoid,
      parameterTypes: [],
      implementation: function() {
        this.instance.reset();
      },
      documentation: 'Reset the model'
    }
  }, {} );

  phetioNamespace.register( 'TNetForceModel', TNetForceModel );

  return TNetForceModel;
} );