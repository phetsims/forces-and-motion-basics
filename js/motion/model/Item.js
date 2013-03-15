define( function( require ) {
  "use strict";
  var Vector2 = require( "DOT/Vector2" );

  function Item( image, weight, x, y ) {
    this.image = image;
    this.weight = weight;
    this.position = {x: x, y: y};
    this.dragging = false;
    this.animating = {enabled: false, x: 0, y: 0};
  }

  Item.prototype = {
    animateTo: function( x, y ) { this.animating = {enabled: true, x: x, y: y}; },
    step: function() {
      if ( this.animating.enabled ) {
        var current = new Vector2( this.position.x, this.position.y );
        var destination = new Vector2( this.animating.x, this.animating.y );
        this.position = current.blend( destination, 0.1 );
        if ( this.position.distance( destination ) < 1 ) {
          this.animating = {enabled: false, x: 0, y: 0};
        }
      }
    }
  };
  return Item;
} );