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

    watch( state.compositeItems[0].position, 'x', function( a, b, x ) {
      console.log( "position changed :", x );
    } );

    state.compositeItems[0].position.x = 3;
    state.compositeItems[0].position = {x: 99, y: 101};

    //Deep copy the initial model
    //See http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-a-javascript-object
    var m = jQuery.extend( true, {}, state );

    var log = [];
    watch( state, function( property, action, newValue, oldValue, path ) {
      console.log( "something changed", arguments, JSON.stringify( path ) );

      log.push( {path: path === undefined ? "root" : path, property: property, action: action, newValue: newValue, oldValue: oldValue } );
      console.log( JSON.stringify( log ) );
    } );

    state.appliedForce = 3;
    state.userInfo.name = "Moe";
    state.animal.species = "anteater";
    state.items[4].weight = state.items[4].weight * 2;
    state.items[3].weight = state.items[3].weight * 2;

    watch( m, function() {
      console.log( "new model changed!!!!!!!", arguments );
    } );
    for ( var i = 0; i < log.length; i++ ) {
      var obj = log[i];
      console.log( "procesing log element ", i );
      console.log( " start model = ", JSON.stringify( m ) );
      console.log( "log item :", JSON.stringify( obj ) );
      var path = obj.path;
      if ( path === "root" ) {
        m[obj.property] = obj.newValue;
      }
      else {
        var item = m;
        for ( var k = 0; k < path.length; k++ ) {
          var pathElement = path[k];
          item = item[pathElement];
        }
        item[obj.property] = obj.newValue;
      }
      console.log( "Updated model", JSON.stringify( m ) );
    }
  };
} );