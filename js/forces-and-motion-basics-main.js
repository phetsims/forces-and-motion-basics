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

  var simOptions = {
    credits: {
      leadDesign: 'Ariel Paul, Noah Podolefsky',
      graphicArts: 'Mariah Hermsmeyer, Sharon Siman-Tov',
      softwareDevelopment: 'Jesse Greenberg, Sam Reid',
      team: 'Amy Rouinfar, Trish Loeblein, Kathy Perkins',
      qualityAssurance: 'Steele Dalton, Bryce Griebenow, Elise Morgan,\n\tOliver Orejola, Ben Roberts, Bryan Yoelin'
    }
  };

  SimLauncher.launch( function() {
    new ForcesAndMotionBasicsSim( simOptions ).start();
  } );
} );
