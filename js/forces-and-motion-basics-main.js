// Copyright 2013-2015, University of Colorado Boulder

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
    }
  };

  SimLauncher.launch( function() {
    new ForcesAndMotionBasicsSim( simOptions ).start();
  } );
} );
