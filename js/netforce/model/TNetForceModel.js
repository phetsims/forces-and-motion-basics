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
  var TVoid = require( 'ifphetio!PHET_IO/types/TVoid' );

  /**
   *
   * @param instance
   * @param phetioID
   * @constructor
   */
  function TNetForceModel( instance, phetioID ) {
    assert && assert( !!instance, 'instance should exist' );
    assertInstanceOf( instance, phet.forcesAndMotionBasics.NetForceModel );
    TObject.call( this, instance, phetioID );
  }

  phetioInherit( TObject, 'TNetForceModel', TNetForceModel, {
    reset: {
      returnType: TVoid,
      parameterTypes: [],
      implementation: function() {
        this.instance.reset();
      },
      documentation: 'Reset the model'
    }
  }, { documentation: 'A Net Force Model type.' } );

  forcesAndMotionBasics.register( 'TNetForceModel', TNetForceModel );

  return TNetForceModel;
} );