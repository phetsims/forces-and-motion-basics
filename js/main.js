require( [ "view/View" ], function ( View ) {
  "use strict";

  var useDebugDiv = false;
  if ( useDebugDiv ) {
    if ( typeof console != "undefined" ) {
      if ( typeof console.log != 'undefined' ) {
        console.olog = console.log;
      }
      else {
        console.olog = function () {};
      }
    }

    console.log = function ( message ) {
      console.olog( message );
      $( '#debugDiv' ).append( '<p>' + message + '</p>' );
    };
  }

  //Don't load the view until all images available.  Maybe future versions could optimize this by making the image loading dependencies more granular.
  $( 'body' ).imagesLoaded( function ( $images, $proper, $broken ) {
    var view = new View( $images );
    $( "#overlay" ).remove();
    if ( !useDebugDiv ) {
      $( "debugDiv" ).remove();
    }
  } );
} );