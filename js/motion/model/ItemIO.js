// Copyright 2017, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertInstanceOf' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var ObjectIO = require( 'ifphetio!PHET_IO/types/ObjectIO' );
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );

  /**
   *
   * @param instance
   * @param phetioID
   * @constructor
   */
  function ItemIO( instance, phetioID ) {
    assert && assert( !!instance, 'instance should exist' );
    assert && assertInstanceOf( instance, phet.forcesAndMotionBasics.Item );
    ObjectIO.call( this, instance, phetioID );
  }

  phetioInherit( ObjectIO, 'ItemIO', ItemIO, {}, {
    documentation: 'An Item that can be placed dragged into the play area.',

    toStateObject: function( instance ) {
      return instance.phetioID;
    },

    fromStateObject: function( stateObject ) {
      return stateObject.name;
    }
  } );

  forcesAndMotionBasics.register( 'ItemIO', ItemIO );

  return ItemIO;
} );

