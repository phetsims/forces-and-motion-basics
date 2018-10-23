// Copyright 2017-2018, University of Colorado Boulder

/**
 * Stores the data from the Item.animating Property.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var ObjectIO = require( 'TANDEM/types/ObjectIO' );

  // ifphetio
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertInstanceOf' );
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );

  /**
   * @param {Object} animationState
   * @param {string} phetioID
   * @constructor
   */
  function AnimationStateIO( animationState, phetioID ) {
    assert && assertInstanceOf( animationState, Object );
    ObjectIO.call( this, animationState, phetioID );
  }

  phetioInherit( ObjectIO, 'AnimationStateIO', AnimationStateIO, {}, {
    documentation: 'Data that is stored in the "Item.animationState" Property. Type to serialize the data object across the iframe',

    /**
     * @param {Object} animationState
     * @returns {Object}
     * @override
     */
    toStateObject: function( animationState ) {
      assert && assertInstanceOf( animationState, Object );
      return animationState;
    },

    /**
     * @param {Object} stateObject
     * @returns {Object}
     * @override
     */
    fromStateObject: function( stateObject ) {
      return stateObject;
    }
  } );

  forcesAndMotionBasics.register( 'AnimationStateIO', AnimationStateIO );

  return AnimationStateIO;
} );
