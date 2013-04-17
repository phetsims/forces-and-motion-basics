//The string plugin loader has problems if you try to load the strings from different relative paths
//So just load them once and make them easily available
define( function( require ) {
  "use strict";
  var Strings = require( "i18n!../nls/forces-and-motion-basics-strings" );
  return Strings;
} );