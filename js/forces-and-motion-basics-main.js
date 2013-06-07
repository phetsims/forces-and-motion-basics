require( [ "tugofwar/model/TugOfWarModel",
  "motion/model/MotionModel",
  'SCENERY/nodes/Image',
  'motion/view/MotionTabView',
  'tugofwar/view/TugOfWarTabView',
  'JOIST/Sim',
  'imageLoader',
  'Strings',
  'JOIST/SimLauncher'
], function( TugOfWarModel, MotionModel, Image, MotionTabView, TugOfWarTabView, Sim, imageLoader, Strings, SimLauncher ) {
  "use strict";

  SimLauncher.launch( imageLoader, function() {

    //Create and start the sim
    new Sim( Strings['forces-and-motion-basics.name'], [
      { name: Strings.tugOfWar,
        icon: new Image( imageLoader.getImage( 'Tug_Icon.png' ) ),
        createModel: function() {return new TugOfWarModel();},
        createView: function( model ) {return new TugOfWarTabView( model );}
      },
      { name: Strings.motion,
        icon: new Image( imageLoader.getImage( 'Motion_icon.png' ) ),
        createModel: function() {return new MotionModel( 'motion', true, false );},
        createView: function( model ) {return new MotionTabView( model );}},

      { name: Strings.friction,
        icon: new Image( imageLoader.getImage( 'Friction_Icon.png' ) ),
        createModel: function() {return new MotionModel( 'friction', false, false );},
        createView: function( model ) {return new MotionTabView( model );}},

      { name: Strings.acceleration,
        icon: new Image( imageLoader.getImage( 'Acceleration_Icon.png' ) ),
        createModel: function() {return new MotionModel( 'acceleration', false, true );},
        createView: function( model ) {return new MotionTabView( model );}}

    ], { showHomeScreen: false, tabIndex: 3} )
      .start();
  } );
} );