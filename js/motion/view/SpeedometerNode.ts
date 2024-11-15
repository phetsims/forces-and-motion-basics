// Copyright 2016-2024, University of Colorado Boulder

/**
 * Speedometer used in Forces and Motion: Basics.  This is a typical gauge node with a value readout near the bottom.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg
 */


//modules
import Range from '../../../../dot/js/Range.js';
import merge from '../../../../phet-core/js/merge.js';
import ValueGaugeNode from '../../../../scenery-phet/js/ValueGaugeNode.js';
import { Node } from '../../../../scenery/js/imports.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';
import MotionConstants from '../MotionConstants.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import Tandem from '../../../../tandem/js/Tandem.js';

const pattern0Name1ValueUnitsVelocityStringProperty = ForcesAndMotionBasicsStrings.pattern[ '0name' ][ '1valueUnitsVelocityStringProperty' ];
const speedStringProperty = ForcesAndMotionBasicsStrings.speedStringProperty;

export default class SpeedometerNode extends Node {

  public constructor( speedProperty: TReadOnlyProperty<number>, showSpeedProperty: TReadOnlyProperty<boolean>, showValuesProperty: TReadOnlyProperty<boolean>, tandem: Tandem, options?: IntentionalAny ) {

    // eslint-disable-next-line phet/bad-typescript-text
    options = merge( {
      radius: 67,
      tandem: tandem
    }, options );

    // mutate with the options after construction so we can set the 'top'
    super();

    const gaugeRadius = 67;
    const gaugeNode = new ValueGaugeNode( speedProperty, speedStringProperty, new Range( 0, MotionConstants.MAX_SPEED ), {
        radius: gaugeRadius,
        tandem: tandem.createTandem( 'gaugeNode' ),
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