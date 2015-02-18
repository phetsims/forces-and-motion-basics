// Copyright 2002-2013, University of Colorado Boulder

/**
 * Entry point for PhET Interactive Simulation's Forces and Motion: Basics application.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var
    NetForceModel = require( 'FORCES_AND_MOTION_BASICS/netforce/model/NetForceModel' ),
    NetForceScreenView = require( 'FORCES_AND_MOTION_BASICS/netforce/view/NetForceScreenView' ),
    Image = require( 'SCENERY/nodes/Image' ),
    Screen = require( 'JOIST/Screen' ),
    Sim = require( 'JOIST/Sim' ),
    SimLauncher = require( 'JOIST/SimLauncher' ),
    TugIcon = require( 'image!FORCES_AND_MOTION_BASICS/Tug_Icon.png' ),
    MotionIcon = require( 'image!FORCES_AND_MOTION_BASICS/Motion_Icon.png' ),
    FrictionIcon = require( 'image!FORCES_AND_MOTION_BASICS/Friction_Icon.png' ),
    AccelerationIcon = require( 'image!FORCES_AND_MOTION_BASICS/Acceleration_Icon.png' ),
    titleString = require( 'string!FORCES_AND_MOTION_BASICS/forces-and-motion-basics.name' ),
    netForceString = require( 'string!FORCES_AND_MOTION_BASICS/netForce' ),
    motionString = require( 'string!FORCES_AND_MOTION_BASICS/motion' ),
    frictionString = require( 'string!FORCES_AND_MOTION_BASICS/friction' ),
    accelerationString = require( 'string!FORCES_AND_MOTION_BASICS/acceleration' ),
    MotionScreen = require( 'FORCES_AND_MOTION_BASICS/motion/MotionScreen' );

  var simOptions = {
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

    //Create and start the sim
    new Sim( titleString, [
      new Screen( netForceString, new Image( TugIcon ),
        function() {return new NetForceModel();},
        function( model ) {return new NetForceScreenView( model );}
      ),
      new MotionScreen( motionString, new Image( MotionIcon ), 'motion' ),
      new MotionScreen( frictionString, new Image( FrictionIcon ), 'friction' ),
      new MotionScreen( accelerationString, new Image( AccelerationIcon ), 'acceleration' )
    ], simOptions ).start();
  } );
} );
