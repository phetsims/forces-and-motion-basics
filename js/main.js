require( [ "view/View" ], function ( View ) {
  //Don't load the view until all images available.  Maybe future versions could optimize this by making the image loading dependencies more granular.
  $( 'body' ).imagesLoaded( function ( $images, $proper, $broken ) {
    var view = new View( $images );
  } );
} );