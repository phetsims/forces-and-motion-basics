// Copyright 2013-2017, University of Colorado Boulder

/**
 * Entry point for PhET Interactive Simulation's Forces and Motion: Basics application.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var Image = require( 'SCENERY/nodes/Image' );
  var MotionScreen = require( 'FORCES_AND_MOTION_BASICS/motion/MotionScreen' );
  var NetForceModel = require( 'FORCES_AND_MOTION_BASICS/netforce/model/NetForceModel' );
  var NetForceScreenView = require( 'FORCES_AND_MOTION_BASICS/netforce/view/NetForceScreenView' );
  var Screen = require( 'JOIST/Screen' );
  var Sim = require( 'JOIST/Sim' );

  // images
  var accelerationIcon = require( 'image!FORCES_AND_MOTION_BASICS/Acceleration_Icon.png' );
  var frictionIcon = require( 'image!FORCES_AND_MOTION_BASICS/Friction_Icon.png' );
  var motionIcon = require( 'image!FORCES_AND_MOTION_BASICS/Motion_Icon.png' );
  var tugIcon = require( 'image!FORCES_AND_MOTION_BASICS/Tug_Icon.png' );

  // strings
  var accelerationString = require( 'string!FORCES_AND_MOTION_BASICS/acceleration' );
  var forcesAndMotionBasicsTitleString = require( 'string!FORCES_AND_MOTION_BASICS/forces-and-motion-basics.title' );
  var frictionString = require( 'string!FORCES_AND_MOTION_BASICS/friction' );
  var motionString = require( 'string!FORCES_AND_MOTION_BASICS/motion' );
  var netForceString = require( 'string!FORCES_AND_MOTION_BASICS/netForce' );

  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Tandem = require( 'TANDEM/Tandem' );

  // constants
  var tandem = Tandem.createRootTandem();

  var simOptions = {
    credits: {
      leadDesign: 'Ariel Paul, Noah Podolefsky',
      graphicArts: 'Mariah Hermsmeyer, Sharon Siman-Tov',
      softwareDevelopment: 'Jesse Greenberg, Sam Reid',
      team: 'Amy Rouinfar, Trish Loeblein, Kathy Perkins',
      qualityAssurance: 'Steele Dalton, Bryce Griebenow, Ethan Johnson, Elise Morgan, Oliver Orejola, Ben Roberts, ' +
                        'Bryan Yoelin'
    }
  };

  SimLauncher.launch( function() {

    var netForceScreenTandem = tandem.createTandem( 'netForceScreen' );
    var motionScreenTandem = tandem.createTandem( 'motionScreen' );
    var frictionScreenTandem = tandem.createTandem( 'frictionScreen' );
    var accelerationScreenTandem = tandem.createTandem( 'accelerationScreen' );

    //Provide the screen names as named fields so they can be easily accessed dynamically, for API features
    //And lookups will still work properly even if the screens are reduced with ?screens=...
    var netForceImageNode = new Image( tugIcon, { tandem: netForceScreenTandem.createTandem( 'icon' ) } );
    var netForceScreen = new Screen(
      function() {return new NetForceModel( netForceScreenTandem.createTandem( 'model' ) );},
      function( model ) {return new NetForceScreenView( model, netForceScreenTandem.createTandem( 'view' ) );}, {
        name: netForceString,
        tandem: netForceScreenTandem,
        homeScreenIcon: netForceImageNode
      }
    );

    var motionScreen = new MotionScreen( 'motion', motionScreenTandem, {
      name: motionString,
      homeScreenIcon: new Image( motionIcon, {
        tandem: motionScreenTandem.createTandem( 'icon' )
      } )
    } );

    var frictionScreen = new MotionScreen( 'friction', frictionScreenTandem, {
      name: frictionString,
      homeScreenIcon: new Image( frictionIcon, {
        tandem: frictionScreenTandem.createTandem( 'icon' )
      } )
    } );

    var accelerationScreen = new MotionScreen( 'acceleration', accelerationScreenTandem, {
      name: accelerationString,
      homeScreenIcon: new Image( accelerationIcon, {
        tandem: accelerationScreenTandem.createTandem( 'icon' )
      } )
    } );

    //Create and start the sim
    var sim = new Sim( forcesAndMotionBasicsTitleString, [
        netForceScreen,
        motionScreen,
        frictionScreen,
        accelerationScreen
      ],
      simOptions );
    sim.start();
  } );
} );