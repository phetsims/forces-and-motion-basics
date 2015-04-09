// Copyright 2002-2014, University of Colorado Boulder

/**
 * The Bounds2 instance to be used for layout in all of the Forces and Motion: Basics screens.
 *
 * The aspect ratio that this sim was coded for differs by 7% than the one we eventually decided upon.
 * aspect ratio of this screen: 981/604=1.62
 * aspect ratio for default: 768/504=1.52
 * TODO: Rewrite the sim layout to use the standard bounds (lower priority)?
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );

  return new Bounds2( 0, 0, 981, 604 );
} );