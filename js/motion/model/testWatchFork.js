define( function( require ) {
  "use strict";
  var WatchJS = require( 'watch' );
  var watch = WatchJS.watch;

  return function() {
    console.log( "Testing model" );

    function Animal( name, age, species ) {
      this.name = name;
      this.age = age;
      this.species = species;
      this.type = "Animal";
    }

    Animal.prototype = {
      toJSON: function() {
        var replacement = {};
        replacement.type = 'Animal';
        replacement.name = this.name;
        replacement.age = this.age;
        replacement.species = this.species;
        return replacement;
      },
      makeSound: function() {
        console.log( "ANIMAL SOUND" );
      }
    };

    var state = {
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
      ],
      compositeItems: [
        {image: 'fridge.png', weight: 100, position: {x: 100, y: 100}, dragging: false}
      ],
      animal: new Animal( 'bongo', 23, 'bear' )
    };

    watch( state, function() {
      console.log( "something changed", arguments );
    } );

    state.appliedForce = 3;
    state.userInfo.name = "Moe";
    state.animal.species = "anteater";
    state.items[4].weight = state.items[4].weight * 2;
  };
} );