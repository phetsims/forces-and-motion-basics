/*Thin wrapper around WatchJS to obtain the two following features:
 //1. Instant callback to the listener with initial value.  Useful for syncing a view on init.
 //2. Callback has new value as 1st arg.  WatchJS leaves this as 3rd value, it is mainly a convenience to move it to first, since it is often exactly and all we want in a callback.

 The name 'swatch' can mean any of the following: 'superwatch', 'syncwatch' or 'swatch'.

 TODO: add support for remove listeners, handle arrays and functions, etc.
 add support for watching any, with this form:
 watch(model,function(){});
 */
define( function( require ) {
  "use strict";
  var WatchJS = require( 'watch' );
  var watch = WatchJS.watch;

  return {
    swatch: function( model, attribute, listener ) {
      watch( model, attribute, function( prop, action, newValue, oldValue ) {
        listener( newValue, prop, action, oldValue );
      } );
      listener( model[attribute], attribute, 'init', model[attribute] );//todo: 2nd arg may be wrong
    }
  };
} );