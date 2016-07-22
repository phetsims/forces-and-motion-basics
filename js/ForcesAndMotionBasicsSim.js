// Copyright 2015, University of Colorado Boulder

/**
 *
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Sim = require( 'JOIST/Sim' );
  var NetForceModel = require( 'FORCES_AND_MOTION_BASICS/netforce/model/NetForceModel' );
  var NetForceScreenView = require( 'FORCES_AND_MOTION_BASICS/netforce/view/NetForceScreenView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Screen = require( 'JOIST/Screen' );
  var MotionScreen = require( 'FORCES_AND_MOTION_BASICS/motion/MotionScreen' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  // images
  var TugIcon = require( 'image!FORCES_AND_MOTION_BASICS/Tug_Icon.png' );
  var MotionIcon = require( 'image!FORCES_AND_MOTION_BASICS/Motion_Icon.png' );
  var FrictionIcon = require( 'image!FORCES_AND_MOTION_BASICS/Friction_Icon.png' );
  var AccelerationIcon = require( 'image!FORCES_AND_MOTION_BASICS/Acceleration_Icon.png' );

  // strings
  var forcesAndMotionBasicsTitleString = require( 'string!FORCES_AND_MOTION_BASICS/forces-and-motion-basics.title' );
  var netForceString = require( 'string!FORCES_AND_MOTION_BASICS/netForce' );
  var motionString = require( 'string!FORCES_AND_MOTION_BASICS/motion' );
  var frictionString = require( 'string!FORCES_AND_MOTION_BASICS/friction' );
  var accelerationString = require( 'string!FORCES_AND_MOTION_BASICS/acceleration' );

  /**
   *
   * @constructor
   */
  function ForcesAndMotionBasicsSim( options ) {
    var tandem = options.tandem;

    //Provide the screen names as named fields so they can be easily accessed dynamically, for API features
    //And lookups will still work properly even if the screens are reduced with ?screens=...
    var netForceScreenTandem = tandem.createTandem( 'netForceScreen' );
    this.netForceScreen = new Screen( netForceString, new Image( TugIcon ),
      function() {return new NetForceModel( netForceScreenTandem.createTandem( 'model' ) );},
      function( model ) {return new NetForceScreenView( model, netForceScreenTandem.createTandem( 'view' ) );}, {
        tandem: netForceScreenTandem
      }
    );
    this.motionScreen = new MotionScreen( motionString, new Image( MotionIcon ), 'motion', tandem.createTandem( 'motionScreen' ) );
    this.frictionScreen = new MotionScreen( frictionString, new Image( FrictionIcon ), 'friction', tandem.createTandem( 'frictionScreen' ) );
    this.accelerationScreen = new MotionScreen( accelerationString, new Image( AccelerationIcon ), 'acceleration', tandem.createTandem( 'accelerationScreen' ) );

    // alternate route:
    // sim.screens[0]
    // sim.netForceScreen

    //Create and start the sim
    Sim.call( this,
      forcesAndMotionBasicsTitleString, [
        this.netForceScreen,
        this.motionScreen,
        this.frictionScreen,
        this.accelerationScreen
      ],
      options );
  }

  forcesAndMotionBasics.register( 'ForcesAndMotionBasicsSim', ForcesAndMotionBasicsSim );

  return inherit( Sim, ForcesAndMotionBasicsSim );
} );