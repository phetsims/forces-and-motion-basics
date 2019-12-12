// Copyright 2013-2019, University of Colorado Boulder

/**
 * Entry point for PhET Interactive Simulation's Forces and Motion: Basics application.
 *
 * @author Sam Reid
 */
define( require => {
  'use strict';

  // modules
  const Image = require( 'SCENERY/nodes/Image' );
  const MotionScreen = require( 'FORCES_AND_MOTION_BASICS/motion/MotionScreen' );
  const NetForceModel = require( 'FORCES_AND_MOTION_BASICS/netforce/model/NetForceModel' );
  const NetForceScreenView = require( 'FORCES_AND_MOTION_BASICS/netforce/view/NetForceScreenView' );
  const Screen = require( 'JOIST/Screen' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const Tandem = require( 'TANDEM/Tandem' );

  // images
  const accelerationIcon = require( 'image!FORCES_AND_MOTION_BASICS/Acceleration_Icon.png' );
  const frictionIcon = require( 'image!FORCES_AND_MOTION_BASICS/Friction_Icon.png' );
  const motionIcon = require( 'image!FORCES_AND_MOTION_BASICS/Motion_Icon.png' );
  const tugIcon = require( 'image!FORCES_AND_MOTION_BASICS/Tug_Icon.png' );

  // strings
  const accelerationString = require( 'string!FORCES_AND_MOTION_BASICS/acceleration' );
  const forcesAndMotionBasicsTitleString = require( 'string!FORCES_AND_MOTION_BASICS/forces-and-motion-basics.title' );
  const frictionString = require( 'string!FORCES_AND_MOTION_BASICS/friction' );
  const motionString = require( 'string!FORCES_AND_MOTION_BASICS/motion' );
  const netForceString = require( 'string!FORCES_AND_MOTION_BASICS/netForce' );

  // constants
  const tandem = Tandem.ROOT;

  const simOptions = {
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

    const netForceScreenTandem = tandem.createTandem( 'netForceScreen' );
    const motionScreenTandem = tandem.createTandem( 'motionScreen' );
    const frictionScreenTandem = tandem.createTandem( 'frictionScreen' );
    const accelerationScreenTandem = tandem.createTandem( 'accelerationScreen' );

    //Provide the screen names as named fields so they can be easily accessed dynamically, for API features
    //And lookups will still work properly even if the screens are reduced with ?screens=...
    const netForceImageNode = new Image( tugIcon, { tandem: netForceScreenTandem.createTandem( 'icon' ) } );
    const netForceScreen = new Screen(
      function() {return new NetForceModel( netForceScreenTandem.createTandem( 'model' ) );},
      function( model ) {return new NetForceScreenView( model, netForceScreenTandem.createTandem( 'view' ) );}, {
        name: netForceString,
        tandem: netForceScreenTandem,
        homeScreenIcon: netForceImageNode
      }
    );

    const motionScreen = new MotionScreen( 'motion', motionScreenTandem, {
      name: motionString,
      homeScreenIcon: new Image( motionIcon, {
        tandem: motionScreenTandem.createTandem( 'icon' )
      } )
    } );

    const frictionScreen = new MotionScreen( 'friction', frictionScreenTandem, {
      name: frictionString,
      homeScreenIcon: new Image( frictionIcon, {
        tandem: frictionScreenTandem.createTandem( 'icon' )
      } )
    } );

    const accelerationScreen = new MotionScreen( 'acceleration', accelerationScreenTandem, {
      name: accelerationString,
      homeScreenIcon: new Image( accelerationIcon, {
        tandem: accelerationScreenTandem.createTandem( 'icon' )
      } )
    } );

    //Create and start the sim
    const sim = new Sim( forcesAndMotionBasicsTitleString, [
        netForceScreen,
        motionScreen,
        frictionScreen,
        accelerationScreen
      ],
      simOptions );
    sim.start();
  } );
} );