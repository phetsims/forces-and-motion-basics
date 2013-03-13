define( function( require ) {
  "use strict";
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
      {image: 'fridge.png', weight: 100, x: 41, y: 476, dragging: false},
      {image: 'crate.png', weight: 100, x: 195, y: 495, dragging: false},
      {image: 'crate.png', weight: 100, x: 114, y: 496, dragging: false},
      {image: 'girl-standing.png', weight: 100, x: 632, y: 450, dragging: false},
      {image: 'man-standing.png', weight: 100, x: 719, y: 365, dragging: false},
      {image: 'trash-can.png', weight: 100, x: 851, y: 511, dragging: false},
      {image: 'mystery-object-01.png', weight: 100, x: 796, y: 586, dragging: false}
    ], step: function() {
      var dt = 1;
      this.velocity = 1;
      this.position = this.position + this.velocity * dt;
//      console.log( "p = " + this.position );
    }, on: function() {}
  };
} )
;