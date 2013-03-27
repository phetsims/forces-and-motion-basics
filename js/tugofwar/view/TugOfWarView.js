define( function( require ) {
  "use strict";
  var ControlPanel = require( 'tugofwar/view/ControlPanel' );
  var TugOfWarScenery = require( 'tugofwar/view/TugOfWarScenery' );

  function TugOfWarView( imageLoader, model, $tab ) {
    var view = this;

    view.imageLoader = imageLoader;
    model.on( 'change:state', function( m, state ) {
      if ( state === 'completed' && m.volumeOn ) {
        var sound = new Howl( {urls: ['./audio/golf-clap.wav', './audio/golf-clap.ogg']} ).play();
      }
    } );

    view.getImage = function( name ) {return imageLoader.getImage( name );};

    view.model = model;
    view.controlPanel = new ControlPanel( model, view );
    view.scenery = new TugOfWarScenery( model, view, $tab );

    view.model.on( 'reset-all', function() { view.resetAll(); } );
  }

  TugOfWarView.prototype = {
    updateForces: function() {
      this.scenery.updateForces();
    },
    resetAll: function() {
      this.scenery.updateForces();
    },
    step: function() {
      this.model.step();
      this.scenery.scene.updateScene();
    }
  };

  //Resize when the tab becomes active to make sure it has the right size.
  Object.defineProperty( TugOfWarView.prototype, 'active', {
    get: function() {return this._active;},
    set: function( active ) {
      this._active = active;
      this.scenery.resize();
      console.log( "active changed: " + active );
    },
    configurable: true,
    enumerable: true
  } );

  return TugOfWarView;
} );