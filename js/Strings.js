//The string plugin loader has problems if you try to load the strings from different relative paths
//So just load them once and make them easily available
define( function( require ) {
  "use strict";
  var Strings = require( "i18n!../nls/forces-and-motion-basics-strings" );

  //Only the strings specified in the config file get loaded unless you explicitly require them,
  // see https://github.com/phetsims/ohms-law/issues/16
  require( "i18n!../nls/ca/forces-and-motion-basics-strings" );
  require( "i18n!../nls/da/forces-and-motion-basics-strings" );
  require( "i18n!../nls/de/forces-and-motion-basics-strings" );
  require( "i18n!../nls/el/forces-and-motion-basics-strings" );
  require( "i18n!../nls/es/forces-and-motion-basics-strings" );
  require( "i18n!../nls/es-es/forces-and-motion-basics-strings" );
  require( "i18n!../nls/es-pe/forces-and-motion-basics-strings" );
  require( "i18n!../nls/eu/forces-and-motion-basics-strings" );
  require( "i18n!../nls/fa/forces-and-motion-basics-strings" );
  require( "i18n!../nls/fr/forces-and-motion-basics-strings" );
  require( "i18n!../nls/gl/forces-and-motion-basics-strings" );
  require( "i18n!../nls/hu/forces-and-motion-basics-strings" );
  require( "i18n!../nls/it/forces-and-motion-basics-strings" );
  require( "i18n!../nls/iw/forces-and-motion-basics-strings" );
  require( "i18n!../nls/mk/forces-and-motion-basics-strings" );
  require( "i18n!../nls/nl/forces-and-motion-basics-strings" );
  require( "i18n!../nls/pl/forces-and-motion-basics-strings" );
  require( "i18n!../nls/pt-br/forces-and-motion-basics-strings" );
  require( "i18n!../nls/sk/forces-and-motion-basics-strings" );
  require( "i18n!../nls/sr/forces-and-motion-basics-strings" );
  require( "i18n!../nls/sv/forces-and-motion-basics-strings" );
  require( "i18n!../nls/ta/forces-and-motion-basics-strings" );
  require( "i18n!../nls/tr/forces-and-motion-basics-strings" );
  require( "i18n!../nls/vi/forces-and-motion-basics-strings" );
  require( "i18n!../nls/zh-tw/forces-and-motion-basics-strings" );

  return Strings;
} );