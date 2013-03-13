define( function( require ) {
  "use strict";
  var SwatchJS = require( 'motion/model/SwatchJS' );
  var WatchJS = require( 'watch' );
  var watch = WatchJS.watch;
  var swatch = SwatchJS.swatch;

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

    //Combine the properties.
    //This reminds me of bacon.js
    function AndProperty( a, b ) {
      var andProperty = this;
      this.a = a;
      this.b = b;
      this.listeners = [];
      var cachedValue = this.get();
      var listener = function( x ) {
        var newValue = andProperty.get();
        if ( newValue !== cachedValue ) {
          for ( var i = 0; i < andProperty.listeners.length; i++ ) {
            var listener = andProperty.listeners[i];
            listener( newValue );
          }
        }
      };
      this.a.addListener( listener );
      this.b.addListener( listener );
    }

    AndProperty.prototype = {
      get: function() {return this.a.get() && this.b.get();},
      //Set not defined since funciton non-invertiable
      addListener: function( listener ) {
        this.listeners.push( listener );
        listener( this.get() );
      }
    };

    //Create a property abstraction around a model for the given key
    function property( model, key ) {
      return {
        get: function() { return model[key]; },
        set: function( newValue ) { model[key] = newValue; },
        addListener: function( listener ) { swatch( model, key, listener ); },

        //Boolean 'and' this with another boolean property
        and: function( other ) { return new AndProperty( this, other ); }
      };
    }

    swatch( state, 'appliedForce', function( prop, action, oldValue, newValue ) {
      console.log( "new applied force: " + newValue );
    } );

    state.appliedForce = 3;
    state.userInfo.name = "Moe";
    state.animal.species = "anteater";

    var json = JSON.stringify( state );
    console.log( json );

    var userInfo = state.userInfo;
    userInfo.corners = 100;

    //Test composition
    swatch( userInfo, 'hair', function( newHair ) {
      console.log( "new hair = " + newHair );
    } );
    userInfo.hair = "yellow";

    //Demonstrate how to parse a state back into the model
    var reviver = function( k, v ) {
      if ( k === "" ) {
        return v;
      }
      else {
//        console.log( "k/v", k, v );
        if ( typeof v.type !== 'undefined' ) {
          console.log( "it has type" );
          var c = v.type;
          console.log( "type = ", c );
          if ( c === "Animal" ) {
            return new Animal( v.name, v.age, v.species );
          }
        }
        return v;
      }
    };
    var revived = JSON.parse( json, reviver );
    console.log( revived );
    revived.animal.makeSound();

    var appliedForceProperty = property( state, 'appliedForce' );
    appliedForceProperty.addListener( function( newAppliedForce ) { console.log( "APPLIED FORCE CHANGED: " + newAppliedForce ); } );
    appliedForceProperty.set( 222 );
    var setAppliedForce = appliedForceProperty.set;
    setAppliedForce( 987 );

    var node = {visible: false};

    var visibilityState = {
      showRedObjects: false,
      showCircles: false
    };

    var composite = property( visibilityState, 'showRedObjects' ).and( property( visibilityState, 'showCircles' ) );
    composite.addListener( function( show ) {
      console.log( 'show it: ' + show );
    } );
    visibilityState.showCircles = false;
    visibilityState.showRedObjects = false;
    visibilityState.showRedObjects = true;
    visibilityState.showCircles = true;
    visibilityState.showRedObjects = true;

    console.log( "==========" );

    //Define a class for something that will be in the model
    function Electron( moving, velocity ) {
      this.moving = moving;
      this.velocity = velocity;
    }

    Electron.prototype = {
      maximizeVelocity: function() {
        this.velocity = 2.9979E8;
      }
    };

    //Define the entire model
    var model = {
      paused: true,
      electron: new Electron( true, 100.0 ),
      user: {name: "Larry", age: 47}
    };

    //Demonstrate watching simple values, with no duplicate messages
    swatch( model, 'paused', function( paused ) {console.log( "Paused: " + paused );} );
    model.paused = false;
    model.paused = false;

    //Demonstrate watching a sub-component of the model, without having to know the root of the model
    swatch( model.user, 'name', function( name ) {console.log( "The name is: " + name );} );
    model.user.name = "Larrison";

    //Demonstrate the ability to watch user-defined classes (instead of just object literals)
    //And to integrate with object specific setters
    swatch( model.electron, 'velocity', function( velocity ) {console.log( "velocity = " + velocity );} );
    model.electron.maximizeVelocity();

    //Demonstrate property interface
    var ageProperty = property( model.user, 'age' );
    ageProperty.addListener( function( age ) {console.log( "age is now: " + age );} );
    ageProperty.set( 48 );
    console.log( "getting the age: " + ageProperty.get() );
    var setAge = ageProperty.set;
    var getAge = ageProperty.get;
    setAge( 49 );
    console.log( "using the simplified getter: " + getAge() );

    console.log( "*************" );
    var person = {name: 'Meg', age: '99'};
    swatch( person, 'age', function( age ) {
      console.log( "person's age: " + age );
    } );
    person.age = 100;
    person.age = 100;
    person.age = 101;

    //Notice that 2 events are fired, one for x and one for y.  I do not know how such things could be "batched".  They are batched by default in Backbone if you use the set({}) method style.
    console.log( "###########" );
    swatch( state.items[0], ['x', 'y'], function() {
      console.log( "x/y changed, x = " + state.items[0].x + ", y = " + state.items[0].y );
    } );
    state.items[0].x = state.items[0].x + 1;
    state.items[0].y = state.items[0].y + 1;

    //For our case, you can alternatively convert to non-primitive
    swatch( state.compositeItems[0], 'position', function( newPosition ) {
      console.log( "position changed, newPosition = ", newPosition.x, newPosition.y );
    } );
    state.compositeItems[0].position = {x: 999, y: 123};

    console.log( "????????????" );
    watch( state, function() {
      console.log( "any changes" );
    } );
    state.compositeItems[0].position = {x: 3, y: 4};
  };

} )
;