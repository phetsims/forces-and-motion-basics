require( [ "tugofwar/view/TugOfWarView", "tugofwar/model/TugOfWarModel",
           "motion/view/MotionView", "motion/model/MotionModel",
           'PHETCOMMON/util/ImagesLoader', "i18n!../nls/forces-and-motion-basics-strings", 'FORT/examples',
           'SCENERY/util/Util'], function( TugOfWarView, TugOfWarModel, MotionView, MotionModel, ImagesLoader, Strings, fortExamples, Util ) {
  "use strict";
//  fortExamples();
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
  var $tab2;

  var selectedTabIndex = 0;

  //Wait until images are loaded, then launch the sim and show the initial tab
  new ImagesLoader( function( imageLoader ) {

    views.push( new TugOfWarView( imageLoader, new TugOfWarModel(), $( '.tab1' ) ) );
    views.push( new MotionView( imageLoader, new MotionModel(), $( '.tab2' ) ) );

    $tab2 = $( '.tab2' ).detach();
    $( "#overlay" ).remove();
    if ( !useDebugDiv ) {
      $( "debugDiv" ).remove();
    }

    //Start in Tab 2 for debugging
    setSelectedTab( 2 );

    //http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // place the rAF *before* the render() to assure as close to
    // 60fps with the setTimeout fallback.
    (function animationLoop() {
      requestAnimationFrame( animationLoop );
      if ( typeof views[selectedTabIndex] !== 'undefined' ) {
        views[selectedTabIndex].step();
      }
    })();
  } );

  function setSelectedTab( tabName ) {
    var $tabs = $( '.tabs' );
    $tabs.children().hide();
    $tabs.children( '.tab' + tabName ).show();
    if ( tabName === 2 ) {
      $tab2.appendTo( $tabs );
    }
    selectedTabIndex = tabName - 1;
  }

  _.each( [1, 2, 3, 4], function( index ) {
    var selector = '#tab' + index + '-icon';
    var handleClick = function() {
      $( '.tab-icons' ).children().removeClass( 'selected' ).addClass( 'unselected' );
      $( selector ).removeClass( 'unselected' ).addClass( 'selected' );
      setSelectedTab( index );
    };
    $( selector ).bind( 'click', handleClick );
    $( selector ).bind( 'touchstart', handleClick );
  } );
} );