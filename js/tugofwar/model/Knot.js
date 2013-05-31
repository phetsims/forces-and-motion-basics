define( function( require ) {
  "use strict";
  var Fort = require( 'FORT/Fort' );
  var Property = require( 'PHETCOMMON/model/property/Property' );
  var PropertySet = require( 'PHETCOMMON/model/property/PropertySet' );
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