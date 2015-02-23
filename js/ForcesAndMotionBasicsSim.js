//  Copyright 2002-2014, University of Colorado Boulder

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
  var TugIcon = require( 'image!FORCES_AND_MOTION_BASICS/Tug_Icon.png' );
  var MotionIcon = require( 'image!FORCES_AND_MOTION_BASICS/Motion_Icon.png' );
  var FrictionIcon = require( 'image!FORCES_AND_MOTION_BASICS/Friction_Icon.png' );
  var AccelerationIcon = require( 'image!FORCES_AND_MOTION_BASICS/Acceleration_Icon.png' );
  var titleString = require( 'string!FORCES_AND_MOTION_BASICS/forces-and-motion-basics.name' );
  var netForceString = require( 'string!FORCES_AND_MOTION_BASICS/netForce' );
  var motionString = require( 'string!FORCES_AND_MOTION_BASICS/motion' );
  var frictionString = require( 'string!FORCES_AND_MOTION_BASICS/friction' );
  var accelerationString = require( 'string!FORCES_AND_MOTION_BASICS/acceleration' );
  var NetForceModel = require( 'FORCES_AND_MOTION_BASICS/netforce/model/NetForceModel' );
  var NetForceScreenView = require( 'FORCES_AND_MOTION_BASICS/netforce/view/NetForceScreenView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Screen = require( 'JOIST/Screen' );
  var MotionScreen = require( 'FORCES_AND_MOTION_BASICS/motion/MotionScreen' );

  /**
   *
   * @constructor
   */
  function ForcesAndMotionBasicsSim( options ) {

    //Provide the screen names as named fields so they can be easily accessed dynamically, for API features
    //And lookups will still work properly even if the screens are reduced with ?screens=...
    this.netForceScreen = new Screen( netForceString, new Image( TugIcon ),
      function() {return new NetForceModel();},
      function( model ) {return new NetForceScreenView( model );}
    );
    this.motionScreen = new MotionScreen( motionString, new Image( MotionIcon ), 'motion' );
    this.frictionScreen = new MotionScreen( frictionString, new Image( FrictionIcon ), 'friction' );
    this.accelerationScreen = new MotionScreen( accelerationString, new Image( AccelerationIcon ), 'acceleration' );

    // alternate route:
    // sim.screens[0]
    // sim.netForceScreen

    //Create and start the sim
    Sim.call( this,
      titleString, [
        this.netForceScreen,
        this.motionScreen,
        this.frictionScreen,
        this.accelerationScreen
      ],
      options );
  }

  return inherit( Sim, ForcesAndMotionBasicsSim, {
    getAPI: function( route ) {
      var api = Sim.prototype.getAPI.call( this, route );

      //TODO: include "sim." in the route?
      api.netForceScreen = this.netForceScreen.getAPI( 'netForceScreen' );

      // TODO: Not working yet
      //api.motionScreen = this.motionScreen.getAPI();
      //api.frictionScreen = this.frictionScreen.getAPI();
      //api.accelerationScreen = this.accelerationScreen.getAPI();
      return api;
    }
  } );
} );