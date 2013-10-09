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
], function( TugOfWarModel, TugOfWarView, MotionModel, MotionView, Image, Sim, SimLauncher, TugIcon, MotionIcon, FrictionIcon, AccelerationIcon, titleString, tugOfWarString, motionString, frictionString, accelerationString ) {
  'use strict';

  var simOptions = {
    credits: 'PhET Development Team -\n' +
             'Lead Design: Noah Podolefsky\n' +
             'Software Development: Sam Reid\n' +
             'Design Team: Ariel Paul, Kathy Perkins, Trish Loeblein\n' +
             'Interviews: Noah Podolefsky'
  };

  SimLauncher.launch( function() {

    //Create and start the sim
    new Sim( titleString, [
      { name: tugOfWarString,
        icon: new Image( TugIcon ),
        createModel: function() {return new TugOfWarModel();},
        createView: function( model ) {return new TugOfWarView( model );}
      },
      { name: motionString,
        icon: new Image( MotionIcon ),
        createModel: function() {return new MotionModel( 'motion' );},
        createView: function( model ) {return new MotionView( model );}},

      { name: frictionString,
        icon: new Image( FrictionIcon ),
        createModel: function() {return new MotionModel( 'friction' );},
        createView: function( model ) {return new MotionView( model );}},

      { name: accelerationString,
        icon: new Image( AccelerationIcon ),
        createModel: function() {return new MotionModel( 'acceleration' );},
        createView: function( model ) {return new MotionView( model );}}

    ], simOptions ).start();
  } );
} );
