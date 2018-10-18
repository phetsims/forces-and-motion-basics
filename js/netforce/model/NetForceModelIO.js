// Copyright 2017-2018, University of Colorado Boulder

/**
 * IO type for NetForceModel
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  // ifphetio
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertInstanceOf' );
  var ObjectIO = require( 'TANDEM/types/ObjectIO' );
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );
  var VoidIO = require( 'TANDEM/types/VoidIO' );

  /**
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
      documentation: 'Resets the model',
      invocableForReadOnlyInstances: false
    }
  }, { documentation: 'A Net Force Model type.' } );

  forcesAndMotionBasics.register( 'NetForceModelIO', NetForceModelIO );

  return NetForceModelIO;
} );