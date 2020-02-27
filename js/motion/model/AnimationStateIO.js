// Copyright 2017-2019, University of Colorado Boulder

/**
 * Stores the data from the Item.animating Property.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import validate from '../../../../axon/js/validate.js';
import ObjectIO from '../../../../tandem/js/types/ObjectIO.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

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

forcesAndMotionBasics.register( 'AnimationStateIO', AnimationStateIO );
export default AnimationStateIO;