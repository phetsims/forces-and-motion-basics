// Copyright 2016-2025, University of Colorado Boulder

/**
 * Speedometer used in Forces and Motion: Basics.  This is a typical gauge node with a value readout near the bottom.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ValueGaugeNode from '../../../../scenery-phet/js/ValueGaugeNode.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import MotionConstants from '../MotionConstants.js';

const pattern0Name1ValueUnitsVelocityStringProperty = ForcesAndMotionBasicsFluent.pattern[ '0name' ][ '1valueUnitsVelocityStringProperty' ];
const speedStringProperty = ForcesAndMotionBasicsFluent.speedStringProperty;

type SelfOptions = {
  radius?: number;
};
type SpeedometerNodeOptions = StrictOmit<NodeOptions, 'children'> & SelfOptions;
export default class SpeedometerNode extends Node {

  public constructor(
    speedProperty: TReadOnlyProperty<number>,
    showSpeedProperty: TReadOnlyProperty<boolean>,
    showValuesProperty: TReadOnlyProperty<boolean>,
    providedOptions?: SpeedometerNodeOptions
  ) {

    const options = optionize<SpeedometerNodeOptions, SelfOptions, NodeOptions>()( {
      radius: 67
    }, providedOptions );

    // mutate with the options after construction so we can set the 'top'
    super();

    const gaugeRadius = options.radius;
    const gaugeNode = new ValueGaugeNode( speedProperty, speedStringProperty, new Range( 0, MotionConstants.MAX_SPEED ), {
      radius: gaugeRadius,
      numberDisplayOptions: {
        valuePattern: pattern0Name1ValueUnitsVelocityStringProperty,
        decimalPlaces: 1,
        textOptions: {
          maxWidth: gaugeRadius * 1.3
        }
      }
    } );
    this.addChild( gaugeNode );

    // dispose unnecessary for property links, SpeedometerNode exists for the lifetime of the sim
    showSpeedProperty.linkAttribute( this, 'visible' );

    showValuesProperty.link( showValues => {
      gaugeNode.numberDisplayVisible = showValues;
    } );

    // Add accessibility descriptions
    // MotionConstants.MAX_SPEED is 40 m/s
    Multilink.multilink( [ speedProperty, showValuesProperty ], ( speed, showValues ) => {
      
      // Build the accessible paragraph description
      let description = 'A speedometer shows the speed.';
      
      // Add qualitative speed description
      const absSpeed = Math.abs( speed );
      const speedDescriptor = absSpeed === 0 ? 'stopped' :
                             absSpeed < 2 ? 'very slow' :
                             absSpeed < 5 ? 'slow' :
                             absSpeed < 10 ? 'moderate' :
                             absSpeed < 20 ? 'fast' :
                             absSpeed < 30 ? 'very fast' :
                             'extremely fast';
      
      if ( absSpeed === 0 ) {
        description += ' The speed is zero';
      }
      else {
        description += ` The speed is ${speedDescriptor}`;
      }
      
      // Add exact value if shown
      if ( showValues ) {
        description += ` at ${absSpeed.toFixed( 1 )} meters per second`;
      }
      
      description += '.';
      
      this.accessibleParagraph = description;
    } );

    // mutate post node construction so we can correctly translate
    this.mutate( options );
  }
}

forcesAndMotionBasics.register( 'SpeedometerNode', SpeedometerNode );