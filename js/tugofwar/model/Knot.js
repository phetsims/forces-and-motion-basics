define( function( require ) {
  "use strict";

  var PropertySetB = require( 'PHETCOMMON/model/property/PropertySetB' );
  var inherit = require( 'PHET_CORE/inherit' );

  function Knot( x, type ) {
    PropertySetB.call( this, {x: x, visible: false} );
    this.initX = x;
    this.y = 275;
    this.type = type;
  }

  inherit( Knot, PropertySetB );

  return Knot;
} );