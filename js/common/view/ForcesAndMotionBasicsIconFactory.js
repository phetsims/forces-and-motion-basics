// Copyright 2017-2018, University of Colorado Boulder

/**
 * Static factory for creating icons in Forces and Motion: Basics.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var GaugeNode = require( 'SCENERY_PHET/GaugeNode' );
  var MotionConstants = require( 'FORCES_AND_MOTION_BASICS/motion/MotionConstants' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );

  // strings
  var speedString = require( 'string!FORCES_AND_MOTION_BASICS/speed' );

  /**
   * Static object, not meant to be instantiated.
   */
  var ForcesAndMotionBasicsIconFactory = {
    speedometerIcon: function( tandem ) {

    // the 'speed' option requires the text and a speedometer icon
    var speedometerIconValueProperty = new Property( 0 );
      return new GaugeNode( speedometerIconValueProperty, speedString, new Range( 0, MotionConstants.MAX_SPEED ),
        { scale: 0.2, tandem: tandem.createTandem( 'speedometerIcon' ) } );
    }
  };

  forcesAndMotionBasics.register( 'ForcesAndMotionBasicsIconFactory', ForcesAndMotionBasicsIconFactory );

  return ForcesAndMotionBasicsIconFactory;
} );