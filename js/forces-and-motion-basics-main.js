// Copyright 2002-2013, University of Colorado Boulder

/**
 * Entry point for PhET Interactive Simulation's Forces and Motion: Basics application.
 *
 * @author Sam Reid
 */
require( [
  'FORCES_AND_MOTION_BASICS/tugofwar/model/TugOfWarModel',
  'FORCES_AND_MOTION_BASICS/tugofwar/view/TugOfWarView',
  'FORCES_AND_MOTION_BASICS/motion/model/MotionModel',
  'FORCES_AND_MOTION_BASICS/motion/view/MotionView',
  'SCENERY/nodes/Image',
  'JOIST/Screen',
  'JOIST/Sim',
  'JOIST/SimLauncher',
  'image!FORCES_AND_MOTION_BASICS/Tug_Icon.png',
  'image!FORCES_AND_MOTION_BASICS/Motion_Icon.png',
  'image!FORCES_AND_MOTION_BASICS/Friction_Icon.png',
  'image!FORCES_AND_MOTION_BASICS/Acceleration_Icon.png',
  'string!FORCES_AND_MOTION_BASICS/forces-and-motion-basics.name',
  'string!FORCES_AND_MOTION_BASICS/tugOfWar',
  'string!FORCES_AND_MOTION_BASICS/motion',
  'string!FORCES_AND_MOTION_BASICS/friction',
  'string!FORCES_AND_MOTION_BASICS/acceleration'
], function( TugOfWarModel, TugOfWarView, MotionModel, MotionView, Image, Screen, Sim, SimLauncher, TugIcon, MotionIcon, FrictionIcon, AccelerationIcon, titleString, tugOfWarString, motionString, frictionString, accelerationString ) {
  'use strict';

  var simOptions = {
    credits: {
      leadDesign: 'Noah Podolefsky',
      softwareDevelopment: 'Sam Reid',
      designTeam: 'Ariel Paul, Kathy Perkins, Trish Loeblein',
      interviews: 'Noah Podolefsky'
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
      new Screen( accelerationString, new Image( AccelerationIcon ),
        function() {return new MotionModel( 'acceleration' );},
        function( model ) {return new MotionView( model );}
      )
    ], simOptions ).start();
  } );
} );
