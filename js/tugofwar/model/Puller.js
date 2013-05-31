define( function( require ) {
  "use strict";
  var PropertySet = require( 'PHETCOMMON/model/property/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );

  function Puller( x, y, type, size, dragOffsetX ) {

    //Create the properties and mix them in
    PropertySet.call( this, {dragging: false, knot: null, x: x, y: y} );

    //Create the constants
    this.dragOffsetX = dragOffsetX;
    this.type = type;
    this.size = size;
    this.force = this.size === 'small' ? 10 * 5 :
                 this.size === 'medium' ? 20 * 5 :
                 this.size === 'large' ? 30 * 5 :
                 NaN;
  }

  inherit( Puller, PropertySet, {
    disconnect: function() {this.knot.value = null;}
  } );

  return Puller;
} );