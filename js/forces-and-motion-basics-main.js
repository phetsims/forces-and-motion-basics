// Copyright 2002-2013, University of Colorado Boulder

/**
 * Entry point for PhET Interactive Simulation's Forces and Motion: Basics application.
 *
 * @author Sam Reid
 */
require( [
  'tugofwar/model/TugOfWarModel',
  'tugofwar/view/TugOfWarView',
  'motion/model/MotionModel',
  'motion/view/MotionView',
  'SCENERY/nodes/Image',
  'JOIST/Sim',
  'JOIST/SimLauncher',
  'imageLoader',
  'Strings'
], function( TugOfWarModel, TugOfWarView, MotionModel, MotionView, Image, Sim, SimLauncher, imageLoader, Strings ) {
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
        createView: function( model ) {return new TugOfWarView( model ).mutate( { renderer: 'svg' } );}
      },
      { name: Strings.motion,
        icon: new Image( imageLoader.getImage( 'Motion_icon.png' ) ),
        createModel: function() {return new MotionModel( 'motion' );},
        createView: function( model ) {return new MotionView( model ).mutate( { renderer: 'svg' } );}},

      { name: Strings.friction,
        icon: new Image( imageLoader.getImage( 'Friction_Icon.png' ) ),
        createModel: function() {return new MotionModel( 'friction' );},
        createView: function( model ) {return new MotionView( model ).mutate( { renderer: 'svg' } );}},

      { name: Strings.acceleration,
        icon: new Image( imageLoader.getImage( 'Acceleration_Icon.png' ) ),
        createModel: function() {return new MotionModel( 'acceleration' );},
        createView: function( model ) {return new MotionView( model ).mutate( { renderer: 'svg' } );}}

    ], simOptions ).start();
  } );
} );
