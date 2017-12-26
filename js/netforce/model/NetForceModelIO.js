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
  var ObjectIO = require( 'ifphetio!PHET_IO/types/ObjectIO' );
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );
  var VoidIO = require( 'ifphetio!PHET_IO/types/VoidIO' );

  /**
   *
   * @param {NetForceModel} netForceModel
   * @param {string} phetioID
   * @constructor
   */
  function NetForceModelIO( netForceModel, phetioID ) {
    assert && assertInstanceOf( netForceModel, phet.forcesAndMotionBasics.NetForceModel );
    ObjectIO.call( this, netForceModel, phetioID );
  }

  phetioInherit( ObjectIO, 'NetForceModelIO', NetForceModelIO, {
    reset: {
      returnType: VoidIO,
      parameterTypes: [],
      implementation: function() {
        this.instance.reset();
      },
      documentation: 'Reset the model'
    }
  }, { documentation: 'A Net Force Model type.' } );

  forcesAndMotionBasics.register( 'NetForceModelIO', NetForceModelIO );

  return NetForceModelIO;
} );