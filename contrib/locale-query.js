/**
 * Read the query parameters from the browser address bar and parse as locale.
 * To be used in conjunction with the requirejs config.js file to specify language.  See forces-and-motion-basics for an example.
 * Author: Sam Reid, PhET
 */
if ( !window.phet ) {
  window.phet = {};
}
window.phet.getLocaleQuery = (function() {
  var value = "en_US";
  if ( typeof window != 'undefined' && window.location.search ) {
    // look for first occurrence of "locale" query parameter
    var params = window.location.search.slice( 1 ).split( "&" );
    for ( var i = 0; i < params.length; i++ ) {
      var nameValuePair = params[i].split( "=" );
      if ( nameValuePair[0] === 'locale' ) {
        value = decodeURI( nameValuePair[1] ).toLowerCase();
        break;
      }
    }
  }
  return value;
});