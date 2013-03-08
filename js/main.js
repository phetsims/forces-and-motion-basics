require( [ "tugofwar/view/TugOfWarView", "tugofwar/model/TugOfWarModel",
           "motion/view/MotionView", "motion/model/MotionModel",
           "motion/model/testSwatch", 'PHETCOMMON/util/ImagesLoader'], function( TugOfWarView, TugOfWarModel, MotionView, motionModel, testSwatch, ImagesLoader ) {
  "use strict";

  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           function( callback ) {
             window.setTimeout( callback, 1000 / 60 );
           };
  })();

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

  var simModel = {selectedTabIndex: 0};

  //Wait until images are loaded, then launch the sim and show the initial tab
  new ImagesLoader( function( imageLoader ) {

    views.push( new TugOfWarView( imageLoader, new TugOfWarModel(), $( '.tab1' ) ) );
    views.push( new MotionView( imageLoader, motionModel, $( '.tab2' ) ) );

    $tab2 = $( '.tab2' ).detach();
    $( "#overlay" ).remove();
    if ( !useDebugDiv ) {
      $( "debugDiv" ).remove();
    }

    //Start in Tab 2 for debugging
//    setSelectedTab( 2 );
  } );

  function setSelectedTab( index ) {
    var $tabs = $( '.tabs' );
    $tabs.children().hide();
    $tabs.children( '.tab' + index ).show();
    if ( index == 2 ) {
      $tab2.appendTo( $tabs );
    }
  }

  for ( var i = 1; i <= 4; i++ ) {
    //Function scope to capture index
    (function( index ) {
      var selector = '#tab' + index + '-icon';
      var handleClick = function() {
        $( '.tab-icons' ).children().removeClass( 'selected' ).addClass( 'unselected' );
        $( selector ).removeClass( 'unselected' ).addClass( 'selected' );
        setSelectedTab( index );
      };
      $( selector ).bind( 'click', handleClick );
      $( selector ).bind( 'touchstart', handleClick );
    })( i );
  }
} );