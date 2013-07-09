// Copyright 2002-2013, University of Colorado Boulder

/**
 * Entry point for PhET Interactive Simulation's Forces and Motion: Basics application.
 *
 * @author Sam Reid
 */
require( [
  'tugofwar/model/TugOfWarModel',
  'tugofwar/view/TugOfWarTabView',
  'motion/model/MotionModel',
  'motion/view/MotionTabView',
  'SCENERY/nodes/Image',
  'JOIST/Sim',
  'JOIST/SimLauncher',
  'imageLoader',
  'Strings',
  'motion/MotionConstants'
], function( TugOfWarModel, TugOfWarTabView, MotionModel, MotionTabView, Image, Sim, SimLauncher, imageLoader, Strings, MotionConstants ) {
  'use strict';

  var simOptions = {
    credits: 'PhET Development Team -\n' +
             'Lead Design: Noah Podolefsky\n' +
             'Software Development: Sam Reid\n' +
             'Design Team: Ariel Paul, Kathy Perkins, Trish Loeblein\n' +
             'Interviews: Noah Podolefsky'
  };

  SimLauncher.launch( imageLoader, function() {

    //Create and start the sim
    new Sim( Strings['forces-and-motion-basics.name'], [
      { name: Strings.tugOfWar,
        icon: new Image( imageLoader.getImage( 'Tug_Icon.png' ) ),
        createModel: function() {return new TugOfWarModel();},
        createView: function( model ) {return new TugOfWarTabView( model );}
      },
      { name: Strings.motion,
        icon: new Image( imageLoader.getImage( 'Motion_icon.png' ) ),
        createModel: function() {return new MotionModel( 'motion', true, false, 0 );},
        createView: function( model ) {return new MotionTabView( model );}},

      { name: Strings.friction,
        icon: new Image( imageLoader.getImage( 'Friction_Icon.png' ) ),
        createModel: function() {return new MotionModel( 'friction', false, false, MotionConstants.maxFriction / 2 );},
        createView: function( model ) {return new MotionTabView( model );}},

      { name: Strings.acceleration,
        icon: new Image( imageLoader.getImage( 'Acceleration_Icon.png' ) ),
        createModel: function() {return new MotionModel( 'acceleration', false, true, MotionConstants.maxFriction / 2 );},
        createView: function( model ) {return new MotionTabView( model );}}

    ], simOptions ).start();
  } );
} );