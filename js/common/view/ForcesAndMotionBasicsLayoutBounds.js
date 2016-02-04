// Copyright 2014-2015, University of Colorado Boulder

/**
 * The Bounds2 instance to be used for layout in all of the Forces and Motion: Basics screens.
 *
 * The aspect ratio that this sim was coded for differs by 7% than the one we eventually decided upon.
 * aspect ratio of this screen: 981/604=1.62
 * aspect ratio for default: 768/504=1.52
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  var ForcesAndMotionBasicsLayoutBounds = new Bounds2( 0, 0, 981, 604 );

  forcesAndMotionBasics.register( 'ForcesAndMotionBasicsLayoutBounds', ForcesAndMotionBasicsLayoutBounds );

  return ForcesAndMotionBasicsLayoutBounds;
} );