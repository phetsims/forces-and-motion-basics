define( function( require ) {
  "use strict";
  var Vector2 = require( "DOT/Vector2" );
  var Fort = require( 'FORT/Fort' );
  var Item = Fort.Model.extend(
      { defaults: {
        pusherInset: 0,
        dragging: false,
        animating: {enabled: false, x: 0, y: 0, end: null, destination: 'home'},

        //Flag for whether the item is on the skateboard
        onBoard: false,

        //How much to increase/shrink the original image.  Could all be set to 1.0 if images pre-scaled in an external program
        imageScale: 1.0,

        //How much the object grows or shrinks when interacting with it
        interactionScale: 1.0
      },
        armsUp: function() {
          return this.context.draggingItems().length > 0 || this.context.isItemStackedAbove( this );
        },
        init: function( options ) {
          this.context = options.context;
          Object.defineProperty( Item.prototype, "position", {get: function() {
            return {x: this.x, y: this.y};
          }, set: function( value ) {
            this.set( {x: value.x, y: value.y} );
          }, configurable: true, enumerable: true} );
        },
        reset: function() {
          Fort.Model.prototype.reset.call( this );
        },
        animateTo: function( x, y, destination ) { this.animating = {enabled: true, x: x, y: y, destination: destination}; },
        animateHome: function() { this.animateTo( this.initialState.x, this.initialState.y, 'home' ); },
        step: function() {
          if ( this.dragging ) {
            this.interactionScale = Math.min( this.interactionScale + 0.06, 1.3 );
          }
          else {
            if ( this.animating.destination === 'home' ) {
              this.interactionScale = Math.max( this.interactionScale - 0.06, 1.0 );
            }
          }
          if ( this.animating.enabled ) {
            var current = new Vector2( this.position.x, this.position.y );
            var destination = new Vector2( this.animating.x, this.animating.y );
            var position = current.blend( destination, 0.1 );
            this.position = position;
            if ( position.distance( destination ) < 1 && this.interactionScale === 1.3 ) {
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