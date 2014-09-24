// Copyright 2002-2013, University of Colorado Boulder

/**
 * Entry point for PhET Interactive Simulation's Forces and Motion: Basics application.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var
    TugOfWarModel = require( 'FORCES_AND_MOTION_BASICS/tugofwar/model/TugOfWarModel' ),
    TugOfWarView = require( 'FORCES_AND_MOTION_BASICS/tugofwar/view/TugOfWarView' ),
    MotionModel = require( 'FORCES_AND_MOTION_BASICS/motion/model/MotionModel' ),
    MotionView = require( 'FORCES_AND_MOTION_BASICS/motion/view/MotionView' ),
    Image = require( 'SCENERY/nodes/Image' ),
    Screen = require( 'JOIST/Screen' ),
    Sim = require( 'JOIST/Sim' ),
    SimLauncher = require( 'JOIST/SimLauncher' ),
    TugIcon = require( 'image!FORCES_AND_MOTION_BASICS/Tug_Icon.png' ),
    MotionIcon = require( 'image!FORCES_AND_MOTION_BASICS/Motion_Icon.png' ),
    FrictionIcon = require( 'image!FORCES_AND_MOTION_BASICS/Friction_Icon.png' ),
    AccelerationIcon = require( 'image!FORCES_AND_MOTION_BASICS/Acceleration_Icon.png' ),
    titleString = require( 'string!FORCES_AND_MOTION_BASICS/forces-and-motion-basics.name' ),
    tugOfWarString = require( 'string!FORCES_AND_MOTION_BASICS/tugOfWar' ),
    motionString = require( 'string!FORCES_AND_MOTION_BASICS/motion' ),
    frictionString = require( 'string!FORCES_AND_MOTION_BASICS/friction' ),
    accelerationString = require( 'string!FORCES_AND_MOTION_BASICS/acceleration' );

  var simOptions = {
    credits: {
      leadDesign: 'Noah Podolefsky',
      softwareDevelopment: 'Sam Reid',
      team: 'Trish Loeblein, Ariel Paul, Kathy Perkins, Noah Podolefsky'
    }
  };

  SimLauncher.launch( function() {

    //Create and start the sim
    new Sim( titleString, [
      new Screen( tugOfWarString, new Image( TugIcon ),
        function() {return new TugOfWarModel();},
        function( model ) {return new TugOfWarView( model );}
      ),
      new Screen( motionString, new Image( MotionIcon ),
        function() {return new MotionModel( 'motion' );},
        function( model ) {return new MotionView( model );}
      ),
      new Screen( frictionString, new Image( FrictionIcon ),
        function() {return new MotionModel( 'friction' );},
        function( model ) {return new MotionView( model );}
      ),
      new Screen( accelerationString, new Image( AccelerationIcon ),
        function() {return new MotionModel( 'acceleration' );},
        function( model ) {return new MotionView( model );}
      )
    ], simOptions ).start();
  } );
} );
