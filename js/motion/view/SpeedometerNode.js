// Copyright 2016-2019, University of Colorado Boulder

/**
 * Speedometer used in Forces and Motion: Basics.  This is a typical gauge node with a value readout near the bottom.
 *
 * @author Sam Reid
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  //modules
  const forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const MotionConstants = require( 'FORCES_AND_MOTION_BASICS/motion/MotionConstants' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Range = require( 'DOT/Range' );
  const ValueGaugeNode = require( 'SCENERY_PHET/ValueGaugeNode' );

  // strings
  const pattern0Name1ValueUnitsVelocityString = require( 'string!FORCES_AND_MOTION_BASICS/pattern.0name.1valueUnitsVelocity' );
  const speedString = require( 'string!FORCES_AND_MOTION_BASICS/speed' );

  /**
   * Constructor.
   *
   * @param {Property<number>} speedProperty
   * @param {Property<number>} showSpeedProperty
   * @param {Property<boolean>} showValuesProperty
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function SpeedometerNode( speedProperty, showSpeedProperty, showValuesProperty, tandem, options ) {

    options = merge( {
      radius: 67,
      tandem: tandem
    }, options );

    // mutate with the options after construction so we can set the 'top'
    Node.call( this );

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

    showValuesProperty.link( function( showValues ) {
      gaugeNode.numberDisplayVisible = showValues;
    } );

    // mutate post node construction so we can correctly translate
    this.mutate( options );
  }

  forcesAndMotionBasics.register( 'SpeedometerNode', SpeedometerNode );

  return inherit( Node, SpeedometerNode );

} );
