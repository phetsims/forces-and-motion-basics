require( [ "tugofwar/view/View", "tugofwar/model/TugOfWarModel" ], function( View, TugOfWarModel ) {
  "use strict";

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

  //Don't load the view until all images available.  Maybe future versions could optimize this by making the image loading dependencies more granular.
  $( 'body' ).imagesLoaded( function( $images, $proper, $broken ) {
    var model = new TugOfWarModel();
    var view = new View( $images, model );
    $( "#overlay" ).remove();
    if ( !useDebugDiv ) {
      $( "debugDiv" ).remove();
    }
  } );

  for ( var i = 1; i <= 4; i++ ) {
    //Function scope to capture index
    (function( index ) {
      var selector = '#tab' + index + '-icon';
      var handleClick = function() {
        $( '.tab-icons' ).children().removeClass( 'selected' ).addClass( 'unselected' );
        $( selector ).removeClass( 'unselected' ).addClass( 'selected' );
      };
      $( selector ).bind( 'click', handleClick );
      $( selector ).bind( 'touchstart', handleClick );
    })( i );
  }
} );