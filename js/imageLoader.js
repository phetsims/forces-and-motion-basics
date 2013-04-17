define( function( require ) {
  "use strict";

  //Will be added lazily after image loader complete.
  //Makes it possible to load through the module system rather than passed as parameter everywhere or used as global. 

  var imageLoader = {};

  return imageLoader;
} );