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

    var item0 = model.property( 'items' ).get()[0];
    console.log( item0 );

//    var item0position = model.property( 'items[0].position' );

    //Get a wrapper for a submodel, which can use property interface, etc.
    var submodel = model.get( 'userInfo' );
    console.log( submodel );
    var name = submodel.property( 'name' );
    console.log( name.get() );

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