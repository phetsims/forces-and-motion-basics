// Copyright 2017-2020, University of Colorado Boulder

/**
 * Stores the data from the Item.animating Property.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import IOType from '../../../../tandem/js/types/IOType.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

const AnimationStateIO = new IOType( 'AnimationStateIO', {
  valueType: Object, // TODO:  https://github.com/phetsims/tandem/issues/211, convert to a named type
  documentation: 'Data that is stored in the "Item.animationState" Property. Type to serialize the data object across the iframe'
} );

forcesAndMotionBasics.register( 'AnimationStateIO', AnimationStateIO );
export default AnimationStateIO;