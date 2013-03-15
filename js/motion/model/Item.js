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
    animateTo: function( x, y ) {
      this.animating = {enabled: true, x: x, y: y};
    }
  };
  return Item;
} );