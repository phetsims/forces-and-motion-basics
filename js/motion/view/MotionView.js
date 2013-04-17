define( function( require ) {
  "use strict";

  var imageLoader = require( 'imageLoader' );

//  var MotionScenery = require( 'motion/view/MotionScenery' );
  var playback = false;
  var log = [];
  var logIndex = 0;
  var playbackTime = 0;
  var resetPlaybackTime = false; //Temporary flag used to reset the playback time when switching to a new set of log entries
  var readServer = false;//If true, loads from server and plays it back.  If false, records locally and mirrors to server.
  var sendMessagesToServer = false;

  function MotionView( motionModel, $tab ) {
    var view = this;
    this.motionModel = motionModel;
    motionModel.getSize = function( item ) {
      var itemNode = view.scenery.getItemNode( item );
      return {width: itemNode.width, height: itemNode.height};
    };
    view.getImage = function( name ) {return imageLoader.getImage( name );};

    function startPlayback() {
      playback = true;
      playbackTime = log[0].time;

      motionModel.reset();
    }

    var $playbackButton = $( '.playback-button' );
    $playbackButton.bind( 'click', startPlayback );

    var $resetButton = $( '.reset-all-button' );
    $resetButton.bind( 'click', motionModel.reset.bind( motionModel ) );

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

    //Aggregate all the models to watch and log
    //TODO: consider automatically infer this by inspecting the model
    var modelsToWatch = [];
    modelsToWatch.push( {model: motionModel, path: 'root'} );
    for ( var k = 0; k < motionModel.items.length; k++ ) {
      modelsToWatch.push( {model: motionModel.items[k], path: ['items', k.toFixed( 0 )]} );
    }

    _.each( modelsToWatch, function( element ) {
      var model = element.model;
      var path = element.path;
      model.on( 'all', function( event, model, a1, a2 ) {
        if ( !playback ) {
          if ( event.lastIndexOf( 'change:' ) >= 0 ) {
            var attribute = event.substring( event.lastIndexOf( ':' ) + 1 );
            var logItem = {time: Date.now(), path: path, property: attribute, action: "change", newValue: JSON.stringify( model[attribute] ), oldValue: model.previous( attribute )};
            log.push( logItem );

            //Send it to the server
            if ( !readServer && sendMessagesToServer && typeof socket !== "undefined" ) {
              socket.emit( 'post log entry', logItem );
            }
          }
        }
      } );
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
      if ( playback || readServer ) {
        var m = this.motionModel;

        while ( logIndex < log.length ) {
          //find any events that passed in this time frame
          //Note, may handle multiple events before calling scene.updateScene()
          var time = log[logIndex].time;
          if ( time < playbackTime ) {

            var logEntry = log[logIndex];
            var path = logEntry.path;
            if ( path === "root" ) {
              if ( typeof logEntry.newValue !== "undefined" ) {
                m[logEntry.property] = JSON.parse( logEntry.newValue );
              }
            }
            else {
              var item = m;
              for ( var k = 0; k < path.length; k++ ) {
                var pathElement = path[k];
                item = item[pathElement];
              }
              if ( typeof item === 'undefined' ) {
                console.log( "undefined" );
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
        this.motionModel.step();
        this.scenery.scene.updateScene();
      }

    }
  };

  return MotionView;
} );