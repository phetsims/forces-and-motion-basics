// Copyright 2017-2020, University of Colorado Boulder

/**
 * IO Type for NetForceModel
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */

import IOType from '../../../../tandem/js/types/IOType.js';
import VoidIO from '../../../../tandem/js/types/VoidIO.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

const NetForceModelIO = new IOType( 'NetForceModelIO', {
  isValidValue: v => v instanceof phet.forcesAndMotionBasics.NetForceModel,
  methods: {
    reset: {
      returnType: VoidIO,
      parameterTypes: [],
      implementation: function() {
        this.reset();
      },
      documentation: 'Resets the model',
      invocableForReadOnlyElements: false
    }
  }
} );

forcesAndMotionBasics.register( 'NetForceModelIO', NetForceModelIO );
export default NetForceModelIO;