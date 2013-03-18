define( function( require ) {
  "use strict";
  var MotionScenery = require( 'motion/view/MotionScenery' );
  var WatchJS = require( 'watch' );
  var watch = WatchJS.watch;
  var callWatchers = WatchJS.callWatchers;
  var playback = false;
  var log = [];
  var logIndex = 0;
  var playbackTime = 0;
  var getLogEntry = true;

  function MotionView( imageLoader, model, $tab ) {
    var view = this;
    view.imageLoader = imageLoader;
    view.getImage = function( name ) {return imageLoader.getImage( name );};
    window.phet = {model: model};
    view.model = model;

    //Make a deep copy of the initial model to get the initial values.  I tried using jQuery.extend( true, {}, view.model ); but it copied references and they were changing
    var initialModel = JSON.parse( JSON.stringify( view.model ) );

    //Update the model by setting values from the specified model
    function setModel( src, dst ) {

      //set initial model to model
      for ( var obj in src ) {

        var oldVal = dst[obj];
        if ( typeof oldVal === 'number' || typeof oldVal === 'string' || typeof oldVal === 'number' ) {
          //Make sure it has a setter
          var d = Object.getOwnPropertyDescriptor( dst, obj );
          if ( d && d.set ) {
            dst[obj] = src[obj];
            callWatchers( dst, obj, "set", src[obj], oldVal );
          }
        }

        if ( typeof src[obj] === 'object' ) {
          var oldVal = dst[obj];
          setModel( src[obj], dst[obj] );

          //Support composite strategy like position:{x:100,y:100} so that it looks like we called model.position = {};
          callWatchers( dst, obj, "set", src[obj], oldVal );
        }
      }
    }

    function playbackEvent() {
      playback = true;
      playbackTime = log[0].time;

      setModel( initialModel, view.model );
    }

    var $playbackButton = $( '.playback-button' );
    $playbackButton.bind( 'touchstart', playbackEvent );
    $playbackButton.bind( 'click', playbackEvent );
    view.scenery = new MotionScenery( model, view, $tab, imageLoader );

    function reset() {
      setModel( initialModel, view.model );
    }

    var $resetButton = $( '.reset-all-button' );
    $resetButton.bind( 'touchstart', reset );
    $resetButton.bind( 'click', reset );

    if ( typeof io != 'undefined' ) {
//      var socket = io.connect( 'http://simian.colorado.edu:44100' );
      var socket = io.connect( 'http://192.168.1.7:44100' );
      socket.on( 'news', function( data ) {
        console.log( data );
      } );
      if ( getLogEntry ) {
        socket.emit( 'get log entry' );
      }
      socket.on( 'deliver log entry', function( logEntry ) {
        console.log( "deliver log entry" );
        console.log( logEntry );
        log.push( logEntry );
      } );
    }

    watch( view.model, function( property, action, newValue, oldValue, path ) {
      if ( !playback && !getLogEntry ) {
        if ( action !== 'set' ) {
          console.log( path, property, action, newValue );
        }
        var logItem = {time: Date.now(), path: path === undefined ? "root" : path, property: property, action: action, newValue: JSON.stringify( newValue ), oldValue: JSON.stringify( oldValue ) };
//        console.log( "Pushing log item inde:", log.length, "logitem: ", JSON.stringify( logItem ) );
//        var param = $.param(logItem);
//        console.log(param);
//
//        var img = new Image();
//        img.src="http://simian.colorado.edu/__utm.gif?"+param;
////        $.post( 'http://simian.colorado.edu/'+param);//origin error on chrome
        log.push( logItem );

        if ( !getLogEntry && typeof socket !== "undefined" ) {
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
        var m = this.model;

        while ( logIndex < log.length ) {
          //find any events that passed in this time frame
          var time = log[logIndex].time;
          if ( time < playbackTime || getLogEntry ) {

//            console.log( "playing back log index: " + logIndex + ", time=" + time, 'logentry = ', JSON.stringify( log[logIndex].newValue ) );

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
            if ( getLogEntry ) {
              break;
            }
          }
          else {
            break;
          }
        }

        this.scenery.scene.updateScene();
        playbackTime += 17;//ms between frames at 60fps
      }
      else {
        this.model.step();
        this.scenery.scene.updateScene();
      }

    }
  };

  return MotionView;
} );