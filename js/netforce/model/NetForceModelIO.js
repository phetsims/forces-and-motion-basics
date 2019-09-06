// Copyright 2017-2019, University of Colorado Boulder

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

  class NetForceModelIO extends ObjectIO {}

  NetForceModelIO.methods = {
    reset: {
      returnType: VoidIO,
      parameterTypes: [],
      implementation: function() {
        this.phetioObject.reset();
      },
      documentation: 'Resets the model',
      invocableForReadOnlyElements: false
    }
  };

  NetForceModelIO.documentation = 'A Net Force Model type.';
  NetForceModelIO.validator = { isValidValue: v => v instanceof phet.forcesAndMotionBasics.NetForceModel };
  NetForceModelIO.typeName = 'NetForceModelIO';
  ObjectIO.validateSubtype( NetForceModelIO );

  return forcesAndMotionBasics.register( 'NetForceModelIO', NetForceModelIO );
} );