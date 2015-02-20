// Copyright 2002-2013, University of Colorado Boulder

/**
 * Entry point for PhET Interactive Simulation's Forces and Motion: Basics application.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var SimLauncher = require( 'JOIST/SimLauncher' );
  var ForcesAndMotionBasicsSim = require( 'FORCES_AND_MOTION_BASICS/ForcesAndMotionBasicsSim' );
  var forcesAndMotionBasicsAPI = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasicsAPI' );

  var simOptions = {
    api: forcesAndMotionBasicsAPI,
    credits: {
      leadDesign: 'Noah Podolefsky',
      softwareDevelopment: 'Sam Reid',
      team: 'Trish Loeblein, Ariel Paul, Kathy Perkins'
    },
    textDescription: '. There is a heavily loaded cart on wheels sitting on a track. ' +
                     'Attached to the left side of the cart is a thick 8 foot rope with 4 large knots spaced ' +
                     'at equal intervals. Standing near this knotted rope is a group of 4 people. On the opposite ' +
                     'side of the cart, a similar rope with 4 large knots is attached to the right side of the cart. ' +
                     'There is another group of 4 people - they are standing near this other rope. ' +
                     'The centre position of the cart has been marked on the ground.'
  };

  SimLauncher.launch( function() {
    new ForcesAndMotionBasicsSim( simOptions ).start();
  } );
} );
