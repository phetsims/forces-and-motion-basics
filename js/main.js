require( [ "tugofwar/model/TugOfWarModel",
           "motion/model/MotionModel",
           'SCENERY/nodes/Image',
           'PHETCOMMON/util/ImagesLoader',
           'motion/view/MotionTab',
           'tugofwar/view/TugOfWarTab',
           'SCENERY_PHET/Sim',
           'imageLoader',
           'Strings'
         ], function( TugOfWarModel, MotionModel, Image, ImagesLoader, MotionTab, TugOfWarTab, Sim, imageLoader, Strings ) {
  "use strict";

  new ImagesLoader( function( loader ) {

    //Initialize the image loader
    imageLoader.getImage = loader.getImage;

    //Create and start the sim
    new Sim( Strings['forces-and-motion-basics.name'], [

      { name: Strings.tugOfWar,
        icon: new Image( imageLoader.getImage( 'Tug_Icon.png' ) ),
        createModel: function() {return new TugOfWarModel();},
        createView: function( model ) {return new TugOfWarTab( model );}
      },

      { name: Strings.motion,
        icon: new Image( imageLoader.getImage( 'Motion_icon.png' ) ),
        createModel: function() {return new MotionModel( {tab: 'motion'} );},
        createView: function( model ) {return new MotionTab( model );}},

      { name: Strings.friction,
        icon: new Image( imageLoader.getImage( 'Friction_Icon.png' ) ),
        createModel: function() {return new MotionModel( {tab: 'friction'} );},
        createView: function( model ) {return new MotionTab( model );}},

      { name: Strings.acceleration,
        icon: new Image( imageLoader.getImage( 'Acceleration_Icon.png' ) ),
        createModel: function() {return new MotionModel( {tab: 'acceleration'} );},
        createView: function( model ) {return new MotionTab( model );}}

    ], { home: false, tab: 0} ).start();
  } );
} );