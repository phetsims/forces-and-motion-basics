/*Property interface that uses WatchJS and provides get/set/addListener*/
define( function( require ) {
  "use strict";
  var swatch = require( 'motion/util/SwatchJS' ).swatch;

  //Create a property abstraction around a model for the given key
  function property( model, key ) {
    return {
      get: function() { return model[key]; },
      set: function( newValue ) { model[key] = newValue; },
      addListener: function( listener ) { swatch( model, key, listener ); }

      //Boolean 'and' this with another boolean property
//      and: function( other ) { return new AndProperty( this, other ); }
    };
  }

  return property;
} );