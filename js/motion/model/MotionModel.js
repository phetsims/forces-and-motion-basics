define( function( require ) {
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
      {image: 'fridge.png', weight: 100, x: 100, y: 100, dragging: false},
      {image: 'crate.png', weight: 100, x: 200, y: 100, dragging: false},
      {image: 'crate.png', weight: 100, x: 300, y: 100, dragging: false},
      {image: 'girl.png', weight: 100, x: 300, y: 100, dragging: false},
      {image: 'man.png', weight: 100, x: 300, y: 100, dragging: false},
      {image: 'trash.png', weight: 100, x: 300, y: 100, dragging: false},
      {image: 'gift.png', weight: 100, x: 300, y: 100, dragging: false}
    ], step: function() {
      var dt = 1;
      this.velocity = 1;
      this.position = this.position + this.velocity * dt;
//      console.log( "p = " + this.position );
    }, on: function() {}
  };
} )
;