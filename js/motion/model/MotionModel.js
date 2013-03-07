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
      {image: 'fridge.png', weight: 100, x: 41.662522202486706, y: 476.3339253996446, dragging: false},
      {image: 'crate.png', weight: 100, x: 195.38099467140327, y: 495.77975133214903, dragging: false},
      {image: 'crate.png', weight: 100, x: 114.69271758436949, y: 496.923623445826, dragging: false},
      {image: 'girl-standing.png', weight: 100, x: 632.8667850799291, y: 450.0248667850796, dragging: false},
      {image: 'man-standing.png', weight: 100, x: 719.8010657193606, y: 365.37833037300175, dragging: false},
      {image: 'trash-can.png', weight: 100, x: 851.3463587921843, y: 511.79396092362316, dragging: false},
      {image: 'mystery-object-01.png', weight: 100, x: 796.4404973357015, y: 586.1456483126109, dragging: false}
    ], step: function() {
      var dt = 1;
      this.velocity = 1;
      this.position = this.position + this.velocity * dt;
//      console.log( "p = " + this.position );
    }, on: function() {}
  };
} )
;