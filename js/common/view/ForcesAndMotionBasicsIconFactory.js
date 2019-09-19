// Copyright 2017-2018, University of Colorado Boulder

/**
 * Static factory for creating icons in Forces and Motion: Basics.
 *
 * @author John Blanco
 */
define( require => {
  'use strict';

  // modules
  const forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  const GaugeNode = require( 'SCENERY_PHET/GaugeNode' );
  const MotionConstants = require( 'FORCES_AND_MOTION_BASICS/motion/MotionConstants' );
  const Property = require( 'AXON/Property' );
  const Range = require( 'DOT/Range' );

  // strings
  const speedString = require( 'string!FORCES_AND_MOTION_BASICS/speed' );

  /**
   * Static object, not meant to be instantiated.
   */
  var ForcesAndMotionBasicsIconFactory = {
    speedometerIcon: function( tandem ) {

    // the 'speed' option requires the text and a speedometer icon
    var speedometerIconValueProperty = new Property( 0 );
      return new GaugeNode( speedometerIconValueProperty, speedString, new Range( 0, MotionConstants.MAX_SPEED ),
        { radius: 67, scale: 0.2, tandem: tandem.createTandem( 'speedometerIcon' ) } );
    }
  };

  forcesAndMotionBasics.register( 'ForcesAndMotionBasicsIconFactory', ForcesAndMotionBasicsIconFactory );

  return ForcesAndMotionBasicsIconFactory;
} );