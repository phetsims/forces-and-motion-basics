// Copyright 2017-2019, University of Colorado Boulder

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
  var phetioInherit = require( 'TANDEM/phetioInherit' );
  var validate = require( 'AXON/validate' );

  /**
   * @param {Object} animationState
   * @param {string} phetioID
   * @constructor
   */
  function AnimationStateIO( animationState, phetioID ) {
    ObjectIO.call( this, animationState, phetioID );
  }

  phetioInherit( ObjectIO, 'AnimationStateIO', AnimationStateIO, {}, {
    documentation: 'Data that is stored in the "Item.animationState" Property. Type to serialize the data object across the iframe',
    validator: { valueType: Object },

    /**
     * @param {Object} animationState
     * @returns {Object}
     * @override
     */
    toStateObject: function( animationState ) {
      validate( animationState, this.validator );
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
