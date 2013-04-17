require( [ "tugofwar/model/TugOfWarModel",
           "motion/model/MotionModel",
           'SCENERY/nodes/Image',
           'PHETCOMMON/util/ImagesLoader',
           'motion/view/MotionNode',
           'tugofwar/view/TugOfWarTab',
           'Sim',
           'imageLoader'
         ], function( TugOfWarModel, MotionModel, Image, ImagesLoader, MotionNode, TugOfWarTab, Sim, imageLoader ) {
  "use strict";

  new ImagesLoader( function( loader ) {

    //Initialize the image loader
    imageLoader.getImage = loader.getImage;

    //Create and start the sim
    new Sim( "Forces and Motion: Basics", [
      {name: "Tug of War", icon: new Image( imageLoader.getImage( 'Tug_Icon.png' ) ), create: function() {return new TugOfWarTab( new TugOfWarModel() );}},
      {name: "Motion", icon: new Image( imageLoader.getImage( 'Motion_icon.png' ) ), create: function() {return new MotionNode( new MotionModel( {tab: 'motion'} ) );}},
      {name: "Friction", icon: new Image( imageLoader.getImage( 'Friction_Icon.png' ) ), create: function() {return new MotionNode( new MotionModel( {tab: 'friction'} ) );}},
      {name: "Acceleration", icon: new Image( imageLoader.getImage( 'Acceleration_Icon.png' ) ), create: function() {return new MotionNode( new MotionModel( {tab: 'acceleration'} ) );}}
    ] ).start();
  } );
} );