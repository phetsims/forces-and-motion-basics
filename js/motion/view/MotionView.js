define( function( require ) {
  "use strict";
  var ControlPanel = require( 'tugofwar/view/ControlPanel' );
  var MotionScenery = require( 'motion/view/MotionScenery' );
  var WatchJS = require( 'watch' );
  var watch = WatchJS.watch;
  var callWatchers = WatchJS.callWatchers;
  var playback = false;
  var log = [];
  var logIndex = 0;
  var playbackTime = 0;

  function MotionView( imageLoader, model, $tab ) {
    var view = this;
    view.imageLoader = imageLoader;
    view.getImage = function( name ) {return imageLoader.getImage( name );};

    view.model = model;
//    view.controlPanel = new ControlPanel( model, view );
    var initialModel = jQuery.extend( true, {}, view.model );

    //Update the model by setting values from the specified model
    function setModel( src, dst ) {
      //set initial model to model
      for ( var obj in src ) {
        var oldVal = dst[obj];
        if ( typeof oldVal === 'number' || typeof oldVal === 'string' ) {
          dst[obj] = src[obj];
        }
        callWatchers( dst, obj, "set", src[obj], oldVal );
        if ( typeof src[obj] === 'object' ) {
          setModel( src[obj], dst[obj] );
        }
      }
    }

    function playbackEvent() {
      playback = true;

//      console.log(JSON.stringify(view.model));
      setModel( initialModel, view.model );
      playbackTime = log[0].time;
//      view.model.items[0].position = {x: 0, y: 0};
//      console.log(JSON.stringify(view.model));
    }

    var $resetAllButton = $( '.playback-button' );
    $resetAllButton.bind( 'touchstart', playbackEvent );
    $resetAllButton.bind( 'click', playbackEvent );
    view.scenery = new MotionScenery( model, view, $tab, imageLoader );

    view.model.on( 'reset-all', function() {
      view.resetAll();
    } );

//
    watch( view.model, function( property, action, newValue, oldValue, path ) {
////      console.log( "something changed", arguments, JSON.stringify( path ) );
//
      log.push( {time: Date.now(), path: path === undefined ? "root" : path, property: property, action: action, newValue: newValue, oldValue: oldValue } );
////      console.log( JSON.stringify( log ) );
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
      if ( playback ) {

        if ( logIndex >= log.length ) {
          playback = false;
        }
        var m = this.model;

        while ( logIndex < log.length ) {
          //find any events that passed in this time frame
          var time = log[logIndex].time;
          if ( time < playbackTime ) {

            var obj = log[logIndex];
            var path = obj.path;
            if ( path === "root" ) {
              m[obj.property] = obj.newValue;
            }
            else {
              var item = m;
              for ( var k = 0; k < path.length; k++ ) {
                var pathElement = path[k];
                item = item[pathElement];
              }
              item[obj.property] = obj.newValue;
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
        this.model.step();
        this.scenery.scene.updateScene();
      }

    }
  };

  return MotionView;
} );