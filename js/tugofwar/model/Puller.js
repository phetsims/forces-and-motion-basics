define( function( require ) {
  "use strict";
  var PropertySet = require( 'AXON/PropertySet' );
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
    var updateX = function( knotX ) { puller.x = knotX; };

    //When the knot changes, wire up as a listener to the new knot
    this.knotProperty.link( function( newKnot, oldKnot ) {
      if ( oldKnot ) {
        oldKnot.xProperty.unlink( updateX );
      }

      //Synchronize our location with the knot.
      if ( newKnot ) {
        newKnot.xProperty.link( updateX );
      }
    } );
  }

  inherit( PropertySet, Puller, {
    disconnect: function() {this.knot = null;}
  } );

  return Puller;
} );