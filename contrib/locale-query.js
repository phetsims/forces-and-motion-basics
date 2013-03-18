// Copyright 2002-2013, University of Colorado

/**
 * Reads the query parameters from browser window's URL and parses as locale.
 *
 * 1. Use the i18n.js plugin for requirejs.
 * 2. Add a reference to locale-query.js in your HTML file.
 * 3. Add this code to your config.js:
 *
 *     config: {
 *       i18n: {
 *         locale: window.phet.getLocaleQuery()  //Specify the locale using a query parameter
 *       }
 *     }
 * 4. Specify the locale in your URL like this: "http://path/to/my/sim.html?locale=fr
 * 5. Note: this file must be loaded before requirejs is started up, and this file cannot be loaded as an AMD module
 *
 * @author: Sam Reid, PhET
 */
if ( !window.phet ) {
  window.phet = {};
}
window.phet.getLocaleQuery = (function() {
  var locale = "en_US";
  if ( typeof window != 'undefined' && window.location.search ) {
    // look for first occurrence of "locale" query parameter
    var params = window.location.search.slice( 1 ).split( "&" );
    for ( var i = 0; i < params.length; i++ ) {
      var nameValuePair = params[i].split( "=" );
      if ( nameValuePair[0] === 'locale' ) {
        locale = decodeURI( nameValuePair[1] ).toLowerCase();
        break;
      }
    }
  }
  return locale;
});