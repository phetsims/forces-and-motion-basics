require( [ "tugofwar/model/TugOfWarModel",
           "motion/model/MotionModel",
           'SCENERY/nodes/Image',
           'PHETCOMMON/util/ImagesLoader',
           'motion/view/MotionTab',
           'tugofwar/view/TugOfWarTab',
           'Sim',
           'imageLoader',
           'Strings'
         ], function( TugOfWarModel, MotionModel, Image, ImagesLoader, MotionTab, TugOfWarTab, Sim, imageLoader, Strings ) {
  "use strict";

  new ImagesLoader( function( loader ) {

    //Initialize the image loader
    imageLoader.getImage = loader.getImage;

    //Create and start the sim
    new Sim( "Forces and Motion: Basics", [
      {name: Strings.tugOfWar, icon: new Image( imageLoader.getImage( 'Tug_Icon.png' ) ), create: function() {return new TugOfWarTab( new TugOfWarModel() );}},
      {name: Strings.motion, icon: new Image( imageLoader.getImage( 'Motion_icon.png' ) ), create: function() {return new MotionTab( new MotionModel( {tab: 'motion'} ) );}},
      {name: Strings.friction, icon: new Image( imageLoader.getImage( 'Friction_Icon.png' ) ), create: function() {return new MotionTab( new MotionModel( {tab: 'friction'} ) );}},
      {name: Strings.acceleration, icon: new Image( imageLoader.getImage( 'Acceleration_Icon.png' ) ), create: function() {return new MotionTab( new MotionModel( {tab: 'acceleration'} ) );}}
    ] ).start();
  } );
} );