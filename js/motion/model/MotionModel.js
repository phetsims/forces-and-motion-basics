define( function( require ) {
  "use strict";
  var Vector2 = require( "DOT/Vector2" );
  var Item = require( 'motion/model/Item' );

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
      new Item( 'fridge.png', 100, 41, 476 ),
      new Item( 'crate.png', 100, 195, 495 ),
      new Item( 'crate.png', 100, 114, 495 ),
      new Item( 'girl-standing.png', 100, 632, 450 ),
      new Item( 'man-standing.png', 100, 719, 365 ),
      new Item( 'trash-can.png', 100, 851, 511 ),
      new Item( 'mystery-object-01.png', 100, 796, 586 )
    ], step: function() {
      var dt = 1;
      this.velocity = 1;
      for ( var i = 0; i < this.items.length; i++ ) {
        var item = this.items[i];
        if ( item.animating.enabled ) {
          var current = new Vector2( item.position.x, item.position.y );
          var destination = new Vector2( item.animating.x, item.animating.y );
          item.position = current.blend( destination, 0.1 );
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