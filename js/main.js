require( [ "tugofwar/view/TugOfWarView", "tugofwar/model/TugOfWarModel",
           "motion/view/MotionView", "motion/model/MotionModel",
           'SCENERY/nodes/Image',
           'PHETCOMMON/util/ImagesLoader', "i18n!../nls/forces-and-motion-basics-strings", 'FORT/examples', 'FORT/Fort',
           'SCENERY/util/Util', 'SCENERY_PHET/NavigationBar'], function( TugOfWarView, TugOfWarModel, MotionView, MotionModel, Image, ImagesLoader, Strings, fortExamples, Fort, Util, NavigationBar ) {
  "use strict";
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
  var $tab = [];

  var selectedTabIndex = 0;

  //Wait until images are loaded, then launch the sim and show the initial tab
  new ImagesLoader( function( imageLoader ) {

    $tab.push( $( '.tab1' ).detach() );
    $tab.push( $( '.tab2' ).detach() );
    $tab.push( $( '.tab3' ).detach() );
    $tab.push( $( '.tab4' ).detach() );

    views.push( new TugOfWarView( imageLoader, new TugOfWarModel(), $tab[0] ) );
    views.push( new MotionView( imageLoader, new MotionModel(), $tab[1] ) );
    views.push( new MotionView( imageLoader, new MotionModel(), $tab[2] ) );
    views.push( new MotionView( imageLoader, new MotionModel(), $tab[3] ) );

    $( "#overlay" ).remove();
    if ( !useDebugDiv ) {
      $( "debugDiv" ).remove();
    }

    //Start in Tab 2 for debugging
    var appModel = new Fort.Model( {selectedTab: 1} );

    appModel.link( 'selectedTab', function( m, value ) { setSelectedTab( value ); } );

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

  function setSelectedTab( tabIndex ) {
    for ( var i = 0; i < $tab.length; i++ ) {
      $tab[i].detach();
    }

    var tabName = tabIndex + 1;
    views[selectedTabIndex].active = false;
    var $tabs = $( '.tabs' );
    $tabs.children().hide();
    $tabs.children( '.tab' + tabName ).show();
    $tab[tabIndex].appendTo( $tabs );
    selectedTabIndex = tabName - 1;
    views[selectedTabIndex].active = true;
  }
} );