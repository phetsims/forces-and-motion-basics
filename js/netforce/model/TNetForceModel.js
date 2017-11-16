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
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );
  var ObjectIO = require( 'ifphetio!PHET_IO/types/ObjectIO' );
  var VoidIO = require( 'ifphetio!PHET_IO/types/VoidIO' );

  /**
   *
   * @param instance
   * @param phetioID
   * @constructor
   */
  function TNetForceModel( instance, phetioID ) {
    assert && assert( !!instance, 'instance should exist' );
    assert && assertInstanceOf( instance, phet.forcesAndMotionBasics.NetForceModel );
    ObjectIO.call( this, instance, phetioID );
  }

  phetioInherit( ObjectIO, 'TNetForceModel', TNetForceModel, {
    reset: {
      returnType: VoidIO,
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