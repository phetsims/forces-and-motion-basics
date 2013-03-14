define( function( require ) {
  "use strict";
  var Vector2 = require( "DOT/Vector2" );

  function animateTo( x, y ) {
    this.animating = {enabled: true, x: x, y: y};
  }

  return {
    stack: [],
    appliedForce: 0,
    friction: 0,
    velocity: 0,
    position: 0,
    showForce: true,
    showSumOfForces: false,
    showValues: false,
    showSpeed: true,
    showMasses: false,
    showAcceleration: false,
    running: true,
    userInfo: {name: "Larry", hair: "Curly", corners: 3},
    items: [

      //Combine x and y into a position object so x/y can be observed as a batch using watch.js (no other reason)
      //Note that since position is set as a composite, listeners attached to individual x and y parameters may be dropped.  So do not add listeners to x & y, just observe position as a composite
      {image: 'fridge.png', weight: 100, position: {x: 41, y: 476}, dragging: false, animateTo: animateTo, animating: {enabled: false, x: 0, y: 0}},
      {image: 'crate.png', weight: 100, position: {x: 195, y: 495}, dragging: false, animateTo: animateTo, animating: {enabled: false, x: 0, y: 0}},
      {image: 'crate.png', weight: 100, position: {x: 114, y: 496}, dragging: false, animateTo: animateTo, animating: {enabled: false, x: 0, y: 0}},
      {image: 'girl-standing.png', weight: 100, position: {x: 632, y: 450}, dragging: false, animateTo: animateTo, animating: {enabled: false, x: 0, y: 0}},
      {image: 'man-standing.png', weight: 100, position: {x: 719, y: 365}, dragging: false, animateTo: animateTo, animating: {enabled: false, x: 0, y: 0}},
      {image: 'trash-can.png', weight: 100, position: {x: 851, y: 511}, dragging: false, animateTo: animateTo, animating: {enabled: false, x: 0, y: 0}},
      {image: 'mystery-object-01.png', weight: 100, position: {x: 796, y: 586}, dragging: false, animateTo: animateTo, animating: {enabled: false, x: 0, y: 0}}
    ], step: function() {
      var dt = 1;
      this.velocity = 1;
      for ( var i = 0; i < this.items.length; i++ ) {
        var item = this.items[i];
        if ( item.animating.enabled ) {
          var current = new Vector2( item.position.x, item.position.y );
          var destination = new Vector2( item.animating.x, item.animating.y );
          item.position = current.blend( destination, 0.3 );
          if ( item.position.distance( destination ) < 1 ) {
            item.animating = {enabled: false, x: 0, y: 0};
          }
        }
      }
//      this.position = this.position + this.velocity * dt;
    }, on: function() {}
  };
} )
;