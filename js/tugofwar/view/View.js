define( function( require ) {
  "use strict";
  var ControlPanel = require( 'tugofwar/view/ControlPanel' );
  var TugOfWarScenery = require( 'tugofwar/view/TugOfWarScenery' );

  function View( $images, model ) {
    var view = this;

    model.on( 'change:state', function( m, state ) {
      if ( state === 'completed' && m.get( 'volumeOn' ) ) {
        var sound = new Howl( {urls: ['./audio/golf-clap.wav', './audio/golf-clap.ogg']} ).play();
      }
    } );

    view.getImage = function( name ) {return $images.parent().find( 'img[src^="images/' + name + '"]' )[0];};

    view.model = model;
    view.controlPanel = new ControlPanel( model, view );
    view.scenery = new TugOfWarScenery( model, view );

    view.model.on( 'reset-all', function() {
      view.resetAll();
    } );
  }

  View.prototype = {
    render: function() {
      this.scenery.scene.updateScene();
    },
    updateForces: function() {
      this.scenery.updateForces();
    },
    resetAll: function() {
      this.scenery.updateForces();
    }
  };

  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           function( callback ) {
             window.setTimeout( callback, 1000 / 60 );
           };
  })();

  return View;
} );