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
  var ObjectIO = require( 'TANDEM/types/ObjectIO' );
  var VoidIO = require( 'TANDEM/types/VoidIO' );
  var phetioInherit = require( 'TANDEM/phetioInherit' );

  // ifphetio
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertInstanceOf' );

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