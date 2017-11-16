// Copyright 2017, University of Colorado Boulder

/**
 * Data object
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertInstanceOf' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );
  var ObjectIO = require( 'ifphetio!PHET_IO/types/ObjectIO' );

  /**
   * Stores the data from the Item.animating Property.
   * @param instance
   * @param phetioID
   * @constructor
   */
  function TAnimationState( instance, phetioID ) {
    assert && assert( !!instance, 'instance should exist' );
    assert && assertInstanceOf( instance, Object);
    ObjectIO.call( this, instance, phetioID );
  }

  phetioInherit( ObjectIO, 'TAnimationState', TAnimationState, {}, {
    documentation: 'Data that is stored in the "Item.animationState" Property. Type to serialize the data object across the iframe',

    toStateObject: function( instance ) {
      return instance;
    },

    fromStateObject: function( stateObject ) {
      return stateObject;
    }
  } );

  forcesAndMotionBasics.register( 'TAnimationState', TAnimationState );

  return TAnimationState;
} );
