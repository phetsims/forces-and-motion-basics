define( function( require ) {
  "use strict";
  var PropertySet = require( 'PHETCOMMON/model/property/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );

  function Puller( x, y, type, size, dragOffsetX ) {
    var puller = this;

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

    //Move with the knot
    var updateX = function( knotX ) { puller.x.value = knotX; };

    //When the knot changes, wire up as a listener to the new knot
    this.knot.link( function( newKnot, oldKnot ) {
      if ( oldKnot ) {
        oldKnot.x.unlink( updateX );
      }

      //Synchronize our location with the knot.
      if ( newKnot ) {
        newKnot.x.link( updateX );
      }
    } );
  }

  inherit( Puller, PropertySet, {
    disconnect: function() {this.knot.value = null;}
  } );

  return Puller;
} );