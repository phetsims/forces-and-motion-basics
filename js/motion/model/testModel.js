define( function( require ) {
  var Model = require( "motion/model/Model" );
  "use strict";
  return function() {
    console.log( "Testing model" );


    function Animal( name, age, species ) {
      this.name = name;
      this.age = age;
      this.species = species;
    }

    var bongo = new Animal( 'bongo', 23, 'bear' );

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
      animal: bongo
    };

    var model = new Model( null, state );

    var property = model.property( 'appliedForce' );
    var value = property.get();
    var setAppliedForce = property.set;
    var getAppliedForce = property.get;
    console.log( value );
    property.set( 123 );
    console.log( property.get() );
    setAppliedForce( 33 );
    console.log( property.get() );
    console.log( getAppliedForce() );

    property.addListener( function( newVal ) {
      console.log( "new val = " + newVal );
    } );
    setAppliedForce( 321 );

    var item0 = model.property( 'items' ).get()[0];
    console.log( item0 );

//    var item0position = model.property( 'items[0].position' );

    //Get a wrapper for a submodel, which can use property interface, etc.
    var submodel = model.get( 'userInfo' );
    console.log( submodel );
    var name = submodel.property( 'name' );

    name.addListener( function( newName ) {
      console.log( "new name = " + newName );
    } );
    console.log( name.get() );
    name.set( "Barbara" );
  };
} );