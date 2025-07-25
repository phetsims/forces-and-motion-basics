// Copyright 2016-2025, University of Colorado Boulder

/**
 * Speedometer used in Forces and Motion: Basics.  This is a typical gauge node with a value readout near the bottom.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

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

    // mutate post node construction so we can correctly translate
    this.mutate( options );
  }
}

forcesAndMotionBasics.register( 'SpeedometerNode', SpeedometerNode );