define( function( require ) {
  "use strict";
  var Vector2 = require( "DOT/Vector2" );

  function Item( image, weight, x, y ) {
    this.image = image;
    this.weight = weight;

    //Combine x and y into a position object so x/y can be observed as a batch using watch.js (no other reason)
    //Note that since position is set as a composite, listeners attached to individual x and y parameters may be dropped.  So do not add listeners to x & y, just observe position as a composite
    this.position = {x: x, y: y};
    this.initialPositionJSON = JSON.stringify( this.position );
    this.dragging = false;
    this.animating = {enabled: false, x: 0, y: 0, end: null};
  }

  Item.prototype = {
    animateTo: function( x, y, end ) { this.animating = {enabled: true, x: x, y: y, end: end}; },
    animateHome: function() {
      var initialPosition = JSON.parse( this.initialPositionJSON );
      this.animateTo( initialPosition.x, initialPosition.y );
    },
    step: function() {
      if ( this.animating.enabled ) {
        var current = new Vector2( this.position.x, this.position.y );
        var destination = new Vector2( this.animating.x, this.animating.y );
        this.position = current.blend( destination, 0.1 );
        if ( this.position.distance( destination ) < 1 ) {
          if ( this.animating.end ) {
            this.animating.end();
          }
          this.animating = {enabled: false, x: 0, y: 0, end: null};
        }
      }
    }
  };
  return Item;
} );