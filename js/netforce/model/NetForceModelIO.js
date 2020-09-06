// Copyright 2017-2020, University of Colorado Boulder

/**
 * IO Type for NetForceModel
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */

import ObjectIO from '../../../../tandem/js/types/ObjectIO.js';
import VoidIO from '../../../../tandem/js/types/VoidIO.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

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
ObjectIO.validateIOType( NetForceModelIO );

forcesAndMotionBasics.register( 'NetForceModelIO', NetForceModelIO );
export default NetForceModelIO;