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

  SimLauncher.launch( 'Acceleration_Icon.png brick-tile.png cart.png cloud1.png crate.png ' +
                      'Friction_Icon.png fridge.png girl-holding.png girl-sitting.png girl-standing.png ' +
                      'go_hover.png go_pressed.png go_up.png grass.png ice_overlay.png man-holding.png ' +
                      'man-sitting.png man-standing.png Motion_icon.png mountains.png mystery-object-01.png ' +
                      'pull_figure_BLUE_0.png pull_figure_BLUE_3.png pull_figure_lrg_BLUE_0.png ' +
                      'pull_figure_lrg_BLUE_3.png pull_figure_lrg_RED_0.png pull_figure_lrg_RED_3.png ' +
                      'pull_figure_RED_0.png pull_figure_RED_3.png ' +
                      'pull_figure_small_BLUE_0.png   pull_figure_small_BLUE_3.png   pull_figure_small_RED_0.png   ' +
                      'pull_figure_small_RED_3.png   pusher_0.png   pusher_1.png ' +
                      'pusher_10.png pusher_11.png pusher_12.png pusher_13.png pusher_14.png pusher_2.png ' +
                      'pusher_3.png pusher_4.png pusher_5.png pusher_6.png pusher_7.png ' +
                      'pusher_8.png pusher_9.png pusher_fall_down.png pusher_straight_on.png ' +
                      'rope.png skateboard.png stop_hover.png stop_pressed.png stop_up.png trash-can.png ' +
                      'Tug_Icon.png water-bucket.png brick-repeat.svg handle_blue_top_grip_flat_gradient_3.svg', function() {

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

    ], { showHomeScreen: false, tabIndex: 1} )
      .start();
  } );
} );