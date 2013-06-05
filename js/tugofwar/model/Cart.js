define( function( require ) {
  "use strict";

  var PropertySetB = require( 'PHETCOMMON/model/property/PropertySetB' );
  var inherit = require( 'PHET_CORE/inherit' );

  function Cart() {
    PropertySetB.call( this, {x: 0, v: 0} );
  }

  inherit( Cart, PropertySetB );

  return Cart;
} );