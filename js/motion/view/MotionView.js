define( function( require ) {
  "use strict";
  var MotionScenery = require( 'motion/view/MotionScenery' );
  var MotionControlPanel = require( 'motion/view/MotionControlPanel' );
  var WatchJS = require( 'watch' );
  var watch = WatchJS.watch;
  var playback = false;
  var log = [];
  var logIndex = 0;
  var playbackTime = 0;
  var resetPlaybackTime = false; //Temporary flag used to reset the playback time when switching to a new set of log entries
  var getLogEntry = false;//If true, loads from server and plays it back.  If false, records locally and mirrors to server.
  var sendMessagesToServer = false;

  function MotionView( imageLoader, motionModel, $tab ) {
    var view = this;
    var controlPanel = new MotionControlPanel( $tab, motionModel, imageLoader );
    this.motionModel = motionModel;
    motionModel.getSize = function( item ) {
      var itemNode = view.scenery.getItemNode( item );
      return {width: itemNode.width, height: itemNode.height};
    };
    view.imageLoader = imageLoader;
    view.getImage = function( name ) {return imageLoader.getImage( name );};

    function startPlayback() {
      playback = true;
      playbackTime = log[0].time;

      view.motionModel.reset();
    }

    var $playbackButton = $( '.playback-button' );
    $playbackButton.bind( 'touchstart', startPlayback );
    $playbackButton.bind( 'click', startPlayback );

    var $resetButton = $( '.reset-all-button' );
    $resetButton.bind( 'touchstart', motionModel.reset.bind( motionModel ) );
    $resetButton.bind( 'click', motionModel.reset.bind( motionModel ) );

    view.scenery = new MotionScenery( motionModel.state, view, $tab, imageLoader );

    //Connect to server for sending or delivering log events
    if ( typeof io != 'undefined' && (sendMessagesToServer || getLogEntry) ) {
//      var socket = io.connect( 'http://simian.colorado.edu:44100' );
      var socket = io.connect( 'http://192.168.1.7:44100' );
      socket.on( 'news', function( data ) {
        console.log( data );
      } );
      socket.on( 'clientIDs', function( data ) {
        console.log( 'client IDs', data );

        //TODO: Show client IDs in a GUI and let the user select one.

        if ( getLogEntry ) {
          socket.emit( 'get log', {clientID: data.clientIDs[1]} );
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

    watch( motionModel.state, function( property, action, newValue, oldValue, path ) {
      if ( !playback && !getLogEntry ) {
        var logItem = {time: Date.now(), path: path === undefined ? "root" : path, property: property, action: action, newValue: JSON.stringify( newValue ), oldValue: JSON.stringify( oldValue ) };
        log.push( logItem );

        if ( !getLogEntry && sendMessagesToServer && typeof socket !== "undefined" ) {
          socket.emit( 'post log entry', logItem );
        }
      }
    } );
  }

  MotionView.prototype = {
    updateForces: function() {
      this.scenery.updateForces();
    },
    resetAll: function() {
      this.scenery.updateForces();
    },
    step: function() {
      if ( playback || getLogEntry ) {
        var m = this.motionModel.state;

        while ( logIndex < log.length ) {
          //find any events that passed in this time frame
          //Note, may handle multiple events before calling scene.updateScene()
          var time = log[logIndex].time;
          if ( time < playbackTime ) {

            var logEntry = log[logIndex];
            var path = logEntry.path;
            if ( path === "root" ) {
              m[logEntry.property] = JSON.parse( logEntry.newValue );
            }
            else {
              var item = m;
              for ( var k = 0; k < path.length; k++ ) {
                var pathElement = path[k];
                item = item[pathElement];
              }
              item[logEntry.property] = JSON.parse( logEntry.newValue );
            }

            logIndex++;
          }
          else {
            break;
          }
        }

        this.scenery.scene.updateScene();
        playbackTime += 17;//ms between frames at 60fps
      }
      else {
        this.motionModel.state.step();
        this.scenery.scene.updateScene();
      }

    }
  };

  return MotionView;
} );