define( function( require ) {
  "use strict";

  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );

  function Knot( x, type ) {
    PropertySet.call( this, {x: x, visible: false} );
    this.initX = x;
    this.y = 275;
    this.type = type;
  }

  inherit( Knot, PropertySet );

  return Knot;
} );