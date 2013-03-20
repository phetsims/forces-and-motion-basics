define( function( require ) {
  "use strict";
  var Vector2 = require( "DOT/Vector2" );
  var Item = Backbone.Model.extend(
      {
        defaults: {
          dragging: false,
          animating: {enabled: false, x: 0, y: 0, end: null}
        },

        initialize: function( parameters ) {

          //TODO: Stringify for immutability?
          this.initX = parameters.x;
          this.initY = parameters.y;
        },
        reset: function() {
          this.set( this.defaults );
          this.animateHome();
        },
        animateTo: function( x, y, end ) { this.animating = {enabled: true, x: x, y: y, end: end}; },
        animateHome: function() {
          this.animateTo( this.initX, this.initY );
        },
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

  function propit( name ) {
    Object.defineProperty( Item.prototype, name, {
      // Getter proxies to Model#get()...
      get: function() { return this.get( name ); },
      // Setter proxies to Model#set(attributes)
      set: function( value ) {
        var data = {};
        data[name] = value;
        this.set( data );
      },
      // Make it configurable and enumerable so it's easy to override...
      configurable: true,
      enumerable: true
    } );
  }

  Object.defineProperty( Item.prototype, "position", {get: function() {
    return {x: this.x, y: this.y};
  }, set: function( value ) {
    this.set( {x: value.x, y: value.y} );
  }, configurable: true, enumerable: true} );

  propit( 'x' );
  propit( 'y' );
  propit( 'image' );
  propit( 'animating' );

  return Item;
} );