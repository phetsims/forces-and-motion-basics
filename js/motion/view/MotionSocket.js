// Copyright 2002-2013, University of Colorado Boulder

define( function( require ) {
  'use strict';

  var imageLoader = require( 'imageLoader' );

//  var MotionScenery = require( 'motion/view/MotionScenery' );
  var playback = false;
  var log = [];
  var playbackTime = 0;
  var resetPlaybackTime = false; //Temporary flag used to reset the playback time when switching to a new set of log entries
  var readServer = false;//If true, loads from server and plays it back.  If false, records locally and mirrors to server.
  var sendMessagesToServer = false;

  function MotionView( motionModel, $tab ) {
    var view = this;
    motionModel.getSize = function( item ) {
      return {width: item.view.width, height: item.view.height};
    };
    view.getImage = function( name ) {return imageLoader.getImage( name );};

    function startPlayback() {
      playback = true;
      playbackTime = log[0].time;

      motionModel.reset();
    }

    var $playbackButton = $( '.playback-button' );
    $playbackButton.bind( 'click', startPlayback );

    //Connect to server for sending or delivering log events
    if ( typeof io !== 'undefined' && (sendMessagesToServer || readServer) ) {
//      var socket = io.connect( 'http://simian.colorado.edu:44100' );
      var socket = io.connect( 'http://192.168.1.7:44100' );
      socket.on( 'news', function( data ) {
        console.log( data );
      } );
      socket.on( 'clientIDs', function( data ) {
        console.log( 'client IDs', data );

        //TODO: Show client IDs in a GUI and let the user select one.

        if ( readServer ) {
          socket.emit( 'get log', {clientID: data.clientIDs[2]} );
          resetPlaybackTime = true;
        }
        socket.on( 'deliver log entry', function( logEntry ) {
          log.push( logEntry );
          if ( resetPlaybackTime ) {
            playbackTime = logEntry.time;
            resetPlaybackTime = false;
          }
        } );
      } );
    }

  }

  return MotionView;
} );