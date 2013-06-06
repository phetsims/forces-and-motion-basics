define( function( require ) {
  "use strict";

  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );

  function Cart() {
    PropertySet.call( this, {x: 0, v: 0} );
  }

  inherit( Cart, PropertySet );

  return Cart;
} );