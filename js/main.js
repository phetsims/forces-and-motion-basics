require( [ "tugofwar/view/TugOfWarView", "tugofwar/model/TugOfWarModel",
           "motion/view/MotionView", "motion/model/MotionModel",
           "motion/model/Model", "motion/model/testModel", "motion/model/testWatchJSWrapper"], function( TugOfWarView, TugOfWarModel, MotionView, motionModel, Model, testModel, testWatchJSWrapper ) {
  "use strict";

//  testModel();
  testWatchJSWrapper();

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

  var useDebugDiv = false;
  if ( useDebugDiv ) {
    if ( typeof console !== "undefined" ) {
      if ( typeof console.log !== 'undefined' ) {
        console.olog = console.log;
      }
      else {
        console.olog = function() {};
      }
    }

    console.log = function( message ) {
      console.olog( message );
      $( '#debugDiv' ).append( '<p>' + message + '</p>' );
    };
  }

  var views = [];
  var $tab2;

  //Don't load the view until all images available.  Maybe future versions could optimize this by making the image loading dependencies more granular.
  $( 'body' ).imagesLoaded( function( $images, $proper, $broken ) {
    views.push( new TugOfWarView( $images, new TugOfWarModel(), $( '.tab1' ) ) );
    views.push( new MotionView( $images, new Model( null, motionModel ), $( '.tab2' ) ) );

    $tab2 = $( '.tab2' ).detach();
    $( "#overlay" ).remove();
    if ( !useDebugDiv ) {
      $( "debugDiv" ).remove();
    }
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