define( function( require ) {
  "use strict";
  var Vector2 = require( "DOT/Vector2" );
  var Item = require( 'motion/model/Item' );
  var WatchJS = require( 'watch' );
  var watch = WatchJS.watch;

  var model = {
    stack: [],
    appliedForce: 0,
    pusherX: 0,
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
      var mass = 1000;
      var acceleration = this.appliedForce / mass;
      this.velocity = this.velocity + acceleration * dt;
      this.position = this.position + this.velocity * dt;
      for ( var i = 0; i < this.items.length; i++ ) {
        this.items[i].step();
      }
    }, reset: function() {setModel( initialModel, this );}
  };

  //Update the model by setting values from the specified model
  function setModel( src, dst ) {

    //set initial model to model
    for ( var obj in src ) {

      var oldVal = dst[obj];
      if ( typeof oldVal === 'number' || typeof oldVal === 'string' || typeof oldVal === 'number' ) {
        //Make sure it has a setter
        var d = Object.getOwnPropertyDescriptor( dst, obj );
        if ( d && d.set ) {
          dst[obj] = src[obj];
          callWatchers( dst, obj, "set", src[obj], oldVal );
        }
      }

      if ( typeof src[obj] === 'object' ) {
        var oldVal = dst[obj];
        setModel( src[obj], dst[obj] );

        //Support composite strategy like position:{x:100,y:100} so that it looks like we called model.position = {};
        callWatchers( dst, obj, "set", src[obj], oldVal );
      }
    }
  }

  //Make a deep copy of the initial model to get the initial values.  I tried using jQuery.extend( true, {}, view.model ); but it copied references and they were changing
  var initialModel = JSON.parse( JSON.stringify( model ) );
  return {model: model, initialModel: initialModel};
} );