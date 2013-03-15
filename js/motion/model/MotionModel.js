define( function( require ) {
  "use strict";
  var Vector2 = require( "DOT/Vector2" );
  var Item = require( 'motion/model/Item' );

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

    //Note, using this as an es5 getter requires changes to watch.js so the getter is not overriden.
    get topOfStack() {
      return 350 - this.stack.length * 100;
    },
    items: [
      new Item( 'fridge.png', 100, 41, 476 ),
      new Item( 'crate.png', 100, 195, 495 ),
      new Item( 'crate.png', 100, 114, 495 ),
      new Item( 'girl-standing.png', 100, 632, 450 ),
      new Item( 'man-standing.png', 100, 719, 365 ),
      new Item( 'trash-can.png', 100, 851, 511 ),
      new Item( 'mystery-object-01.png', 100, 800, 590 )
    ], step: function() {
      var dt = 1;
      this.velocity = 1;
      for ( var i = 0; i < this.items.length; i++ ) {
        this.items[i].step();
      }
//      this.position = this.position + this.velocity * dt;
    }
  };
} )
;