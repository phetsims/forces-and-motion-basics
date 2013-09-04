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
  'FORCES_AND_MOTION_BASICS/forces-and-motion-basics-images',
  'FORCES_AND_MOTION_BASICS/forces-and-motion-basics-strings'
], function( TugOfWarModel, TugOfWarView, MotionModel, MotionView, Image, Sim, SimLauncher, forcesAndMotionBasicsImages, Strings ) {
  'use strict';

  var simOptions = {
    credits: 'PhET Development Team -\n' +
             'Lead Design: Noah Podolefsky\n' +
             'Software Development: Sam Reid\n' +
             'Design Team: Ariel Paul, Kathy Perkins, Trish Loeblein\n' +
             'Interviews: Noah Podolefsky'
  };

  SimLauncher.launch( [
    {name: 'forces-and-motion-basics', imageLoader: forcesAndMotionBasicsImages}
  ], function() {

    //Create and start the sim
    new Sim( Strings['forces-and-motion-basics.name'], [
      { name: Strings.tugOfWar,
        icon: new Image( forcesAndMotionBasicsImages.getImage( 'Tug_Icon.png' ) ),
        createModel: function() {return new TugOfWarModel();},
        createView: function( model ) {return new TugOfWarView( model ).mutate( { renderer: 'svg' } );}
      },
      { name: Strings.motion,
        icon: new Image( forcesAndMotionBasicsImages.getImage( 'Motion_icon.png' ) ),
        createModel: function() {return new MotionModel( 'motion' );},
        createView: function( model ) {return new MotionView( model ).mutate( { renderer: 'svg' } );}},

      { name: Strings.friction,
        icon: new Image( forcesAndMotionBasicsImages.getImage( 'Friction_Icon.png' ) ),
        createModel: function() {return new MotionModel( 'friction' );},
        createView: function( model ) {return new MotionView( model ).mutate( { renderer: 'svg' } );}},

      { name: Strings.acceleration,
        icon: new Image( forcesAndMotionBasicsImages.getImage( 'Acceleration_Icon.png' ) ),
        createModel: function() {return new MotionModel( 'acceleration' );},
        createView: function( model ) {return new MotionView( model ).mutate( { renderer: 'svg' } );}}

    ], simOptions ).start();
  } );
} );
