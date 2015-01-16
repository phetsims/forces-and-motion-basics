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
    MotionModel = require( 'FORCES_AND_MOTION_BASICS/motion/model/MotionModel' ),
    MotionScreenView = require( 'FORCES_AND_MOTION_BASICS/motion/view/MotionScreenView' ),
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
    accelerationString = require( 'string!FORCES_AND_MOTION_BASICS/acceleration' );

  var simOptions = {
    credits: {
      leadDesign: 'Noah Podolefsky',
      softwareDevelopment: 'Sam Reid',
      team: 'Trish Loeblein, Ariel Paul, Kathy Perkins'
    }
  };

  SimLauncher.launch( function() {

    //Create and start the sim
    new Sim( titleString, [
      new Screen( netForceString, new Image( TugIcon ),
        function() {return new NetForceModel();},
        function( model ) {return new NetForceScreenView( model );}
      ),
      new Screen( motionString, new Image( MotionIcon ),
        function() {return new MotionModel( 'motion' );},
        function( model ) {return new MotionScreenView( model );}
      ),
      new Screen( frictionString, new Image( FrictionIcon ),
        function() {return new MotionModel( 'friction' );},
        function( model ) {return new MotionScreenView( model );}
      ),
      new Screen( accelerationString, new Image( AccelerationIcon ),
        function() {return new MotionModel( 'acceleration' );},
        function( model ) {return new MotionScreenView( model );}
      )
    ], simOptions ).start();

    var sessionID = 'session-' + Date.now();
    Metacog.init( {
      "session": {
        "publisher_id": 'bf2e4b52',
        "application_id": '617dd906494998d92d922e0df42b35ca',
        "widget_id": 'forces-and-motion-basics',
        "learner_id": "testing",
        "session_id": sessionID
      },
      log_tab: true,
      mode: "production"
    } );


    //and use "on_any_event" as event name when using sendEvent method

    Metacog.Logger.start();

    var stripWhitespace = function( string ) {
      string = string || 'undefined';
      return string.replace( /\s/g, "" );
    };

    window.phet.arch.targets.push( function( message ) {
      var phet_message  =JSON.parse( message );
      var  event_name = phet_message.messageType + '_' + stripWhitespace( phet_message.componentID ) + '_' + phet_message.componentType + '_' + phet_message.action;

      Metacog.Router.sendEvent( {
        event: phet_message.action + "_"+phet_message.componentID,
        data: phet_message,
        type: Metacog.EVENT_TYPE.MODEL
      } );
    } );
  } );
} );
