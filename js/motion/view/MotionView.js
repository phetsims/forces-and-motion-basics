define( function( require ) {
  "use strict";
  var ControlPanel = require( 'tugofwar/view/ControlPanel' );
  var MotionScenery = require( 'motion/view/MotionScenery' );

  function MotionView( $images, model, $tab ) {
    var view = this;

    var property = model.property( 'appliedForce' );
    var value = property.get();
    var setAppliedForce = property.set;
    var getAppliedForce = property.get;
    console.log( value );
    property.set( 123 );
    console.log( property.get() );
    setAppliedForce( 33 );
    console.log( property.get() );
    console.log( getAppliedForce() );

    property.addListener( function( newVal ) {
      console.log( "new val = " + newVal );
    } );
    setAppliedForce( 321 );

    view.getImage = function( name ) {return $images.parent().find( 'img[src^="images/' + name + '"]' )[0];};

    view.model = model;
//    view.controlPanel = new ControlPanel( model, view );
    view.scenery = new MotionScenery( model, view, $tab );

    view.model.on( 'reset-all', function() {
      view.resetAll();
    } );
  }

  MotionView.prototype = {
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

  return MotionView;
} );