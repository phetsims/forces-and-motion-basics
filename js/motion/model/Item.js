define( function( require ) {
  "use strict";
  var Vector2 = require( "DOT/Vector2" );
  var Fort = require( 'FORT/Fort' );
  var Item = Fort.Model.extend(
      { defaults: {
        dragging: false,
        animating: {enabled: false, x: 0, y: 0, end: null}
      },
        init: function( options ) {
          Object.defineProperty( Item.prototype, "position", {get: function() {
            return {x: this.x, y: this.y};
          }, set: function( value ) {
            this.set( {x: value.x, y: value.y} );
          }, configurable: true, enumerable: true} );

          //TODO: Stringify for immutability?
          this.initX = options.x;
          this.initY = options.y;
        },
        reset: function() {
          this.set( this.defaults );
          this.position = {x: this.initX, y: this.initY};
        },
        animateTo: function( x, y, end ) { this.animating = {enabled: true, x: x, y: y, end: end}; },
        animateHome: function() { this.animateTo( this.initX, this.initY ); },
        step: function() {
          if ( this.animating.enabled ) {
            var current = new Vector2( this.position.x, this.position.y );
            var destination = new Vector2( this.animating.x, this.animating.y );
            var position = current.blend( destination, 0.1 );
            this.position = position;
            if ( position.distance( destination ) < 1 ) {
              if ( this.animating.end ) {
                this.animating.end();
              }
              this.animating = {enabled: false, x: 0, y: 0, end: null};
            }
          }
        }
      } );

  return Item;
} );