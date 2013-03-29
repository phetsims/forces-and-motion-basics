require( [ "tugofwar/view/TugOfWarView", "tugofwar/model/TugOfWarModel",
           "motion/view/MotionView", "motion/model/MotionModel",
           'SCENERY/nodes/Image',
           'PHETCOMMON/util/ImagesLoader', "i18n!../nls/forces-and-motion-basics-strings", 'FORT/examples', 'FORT/Fort',
           'SCENERY/util/Util', 'SCENERY_PHET/NavigationBar'], function( TugOfWarView, TugOfWarModel, MotionView, MotionModel, Image, ImagesLoader, Strings, fortExamples, Fort, Util, NavigationBar ) {
  "use strict";

  var main = {};
//  fortExamples();
  new FastClick( document.body );

  Util.polyfillRequestAnimationFrame();

  //Code to show console output in a div, requires a #debugDiv in the HTML
  var useDebugDiv = false;
  if ( useDebugDiv ) {
    if ( typeof console !== "undefined" ) {
      if ( typeof console.log !== 'undefined' ) { console.olog = console.log; }
      else { console.olog = function() {}; }
    }
    console.log = function( message ) {
      console.olog( message );
      $( '#debugDiv' ).append( '<p>' + message + '</p>' );
    };
  }

  var views = [];
  var $tabs = [];

  var selectedTabIndex = 0;

  main.setSelectedTab = function( tabIndex ) {
    for ( var i = 0; i < $tabs.length; i++ ) {
      $tabs[i].detach();
    }

    var tabName = tabIndex + 1;
    views[selectedTabIndex].active = false;
    var $tabContainer = $( '.tabs' );
    $tabs[tabIndex].appendTo( $tabContainer );
    selectedTabIndex = tabName - 1;
    views[selectedTabIndex].active = true;
  };

  //Wait until images are loaded, then launch the sim and show the initial tab
  new ImagesLoader( function( imageLoader ) {

    $tabs.push( $( '.tab1' ).detach() );
    $tabs.push( $( '.tab2' ).detach() );
    $tabs.push( $( '.tab3' ).detach() );
    $tabs.push( $( '.tab4' ).detach() );

    views.push( new TugOfWarView( imageLoader, new TugOfWarModel(), $tabs[0] ) );
    views.push( new MotionView( imageLoader, new MotionModel(), $tabs[1] ) );
    views.push( new MotionView( imageLoader, new MotionModel(), $tabs[2] ) );
    views.push( new MotionView( imageLoader, new MotionModel(), $tabs[3] ) );

    $( "#overlay" ).remove();
    if ( !useDebugDiv ) {
      $( "debugDiv" ).remove();
    }

    //Start in Tab 2 for debugging
    var appModel = new Fort.Model( {selectedTab: 1} );

    appModel.link( 'selectedTab', main, 'setSelectedTab' );

    var navigationBar = new NavigationBar( $( '.navigation-bar' ), [
      {name: "Tug of War", icon: new Image( imageLoader.getImage( 'Tug_Icon.png' ) )},
      {name: "Friction", icon: new Image( imageLoader.getImage( 'Motion_icon.png' ) )},
      {name: "Friction", icon: new Image( imageLoader.getImage( 'Friction_Icon.png' ) )},
      {name: "Acceleration", icon: new Image( imageLoader.getImage( 'Acceleration_Icon.png' ) )}
    ], appModel.property( 'selectedTab' ) );

    //http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // place the rAF *before* the render() to assure as close to
    // 60fps with the setTimeout fallback.
    (function animationLoop() {
      requestAnimationFrame( animationLoop );
      navigationBar.updateScene();
      if ( typeof views[selectedTabIndex] !== 'undefined' ) {
        views[selectedTabIndex].step();
      }
    })();
  } );
} );