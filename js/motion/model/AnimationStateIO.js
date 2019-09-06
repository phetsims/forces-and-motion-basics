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
  var validate = require( 'AXON/validate' );

  class AnimationStateIO extends ObjectIO {

    /**
     * @param {Object} animationState
     * @returns {Object}
     * @override
     */
    static toStateObject( animationState ) {
      validate( animationState, this.validator );
      return animationState;
    }

    /**
     * @param {Object} stateObject
     * @returns {Object}
     * @override
     */
    static fromStateObject( stateObject ) {
      return stateObject;
    }
  }

  AnimationStateIO.documentation = 'Data that is stored in the "Item.animationState" Property. Type to serialize the data object across the iframe';
  AnimationStateIO.validator = { valueType: Object };
  AnimationStateIO.typeName = 'AnimationStateIO';
  ObjectIO.validateSubtype( AnimationStateIO );

  return forcesAndMotionBasics.register( 'AnimationStateIO', AnimationStateIO );
} );
