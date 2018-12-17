// Copyright 2016-2018, University of Colorado Boulder

/**
 * Speedometer used in Forces and Motion: Basics.  This is a typical gauge node with a value readout near the bottom.
 *
 * @author Sam Reid
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  //modules
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var GaugeNode = require( 'SCENERY_PHET/GaugeNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MotionConstants = require( 'FORCES_AND_MOTION_BASICS/motion/MotionConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Range = require( 'DOT/Range' );

  // strings
  var pattern0Name1ValueUnitsVelocityString = require( 'string!FORCES_AND_MOTION_BASICS/pattern.0name.1valueUnitsVelocity' );
  var speedString = require( 'string!FORCES_AND_MOTION_BASICS/speed' );

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

    options = _.extend( {
      radius: 67,
      tandem: tandem
    }, options );

    // mutate with the options after construction so we can set the 'top'
    Node.call( this );

    // create the gaugeNode
    var gaugeNode = new GaugeNode( speedProperty, speedString, new Range( 0, MotionConstants.MAX_SPEED ),
      {
        radius: 67,
        tandem: tandem.createTandem( 'gaugeNode' ),
        displayValue: true,
        numberDisplayOptions: {
          valuePattern: pattern0Name1ValueUnitsVelocityString,
          font: new PhetFont( 16 ),
          backgroundStroke: 'black',
          align: 'center',
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
