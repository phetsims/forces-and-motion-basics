// Copyright 2016-2021, University of Colorado Boulder

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

const pattern0Name1ValueUnitsVelocityString = ForcesAndMotionBasicsStrings.pattern[ '0name' ][ '1valueUnitsVelocity' ];
const speedString = ForcesAndMotionBasicsStrings.speed;

class SpeedometerNode extends Node {
  /**
   * Constructor.
   *
   * @param {Property.<number>} speedProperty
   * @param {Property.<number>} showSpeedProperty
   * @param {Property.<boolean>} showValuesProperty
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( speedProperty, showSpeedProperty, showValuesProperty, tandem, options ) {

    options = merge( {
      radius: 67,
      tandem: tandem
    }, options );

    // mutate with the options after construction so we can set the 'top'
    super();

    const gaugeNode = new ValueGaugeNode( speedProperty, speedString, new Range( 0, MotionConstants.MAX_SPEED ),
      {
        radius: 67,
        tandem: tandem.createTandem( 'gaugeNode' ),
        displayValue: true,
        numberDisplayOptions: {
          valuePattern: pattern0Name1ValueUnitsVelocityString,
          decimalPlaces: 1
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

export default SpeedometerNode;