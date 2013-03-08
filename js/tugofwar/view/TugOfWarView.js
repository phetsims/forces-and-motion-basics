define( function( require ) {
  "use strict";
  var ControlPanel = require( 'tugofwar/view/ControlPanel' );
  var TugOfWarScenery = require( 'tugofwar/view/TugOfWarScenery' );

  function TugOfWarView( imageLoader, model, $tab ) {
    var view = this;

    view.imageLoader = imageLoader;
    model.on( 'change:state', function( m, state ) {
      if ( state === 'completed' && m.get( 'volumeOn' ) ) {
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

  return TugOfWarView;
} );