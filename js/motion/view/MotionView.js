define( function( require ) {
  "use strict";
  var ControlPanel = require( 'tugofwar/view/ControlPanel' );
  var MotionScenery = require( 'motion/view/MotionScenery' );

  function MotionView( imageLoader, model, $tab ) {
    var view = this;
    view.imageLoader = imageLoader;
    view.getImage = function( name ) {return imageLoader.getImage( name );};

    view.model = model;
//    view.controlPanel = new ControlPanel( model, view );
    view.scenery = new MotionScenery( model, view, $tab, imageLoader );

    view.model.on( 'reset-all', function() {
      view.resetAll();
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
      this.model.step();
      this.scenery.scene.updateScene();
    }
  };

  return MotionView;
} );