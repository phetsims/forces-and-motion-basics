define( function( require ) {
  "use strict";
  var Vector2 = require( "DOT/Vector2" );
  var Item = require( 'motion/model/Item' );

  var MotionModel = Backbone.Model.extend(
      {defaults: { stack: [],
        appliedForce: 0,
        pusherX: 0,
        friction: 0,
        velocity: 0,
        position: 0,
        showForce: true,
        showValues: false,
        showSumOfForces: false,
        showSpeed: false,
        showMasses: false,
        showAcceleration: false,
        running: true,

        //Note, using this as an es5 getter requires changes to watch.js so the getter is not overriden.
        get topOfStack() {
          return 350 - this.stack.length * 100;
        },
        items: [
          new Item( {image: 'fridge.png', weight: 100, x: 41, y: 476} ),
          new Item( {image: 'crate.png', weight: 100, x: 195, y: 495} ),
          new Item( {image: 'crate.png', weight: 100, x: 114, y: 495 } ),
          new Item( {image: 'girl-standing.png', weight: 100, x: 632, y: 450} ),
          new Item( {image: 'man-standing.png', weight: 100, x: 719, y: 365} ),
          new Item( {image: 'trash-can.png', weight: 100, x: 851, y: 511 } ), //TODO: can we bring back hashless constructor?
          new Item( {image: 'mystery-object-01.png', weight: 100, x: 800, y: 590 } )
        ] },
        initialize: function() {

          function propit( name ) {
            Object.defineProperty( MotionModel.prototype, name, {
              // Getter proxies to Model#get()...
              get: function() { return this.get( name ); },
              // Setter proxies to Model#set(attributes)
              set: function( value ) {
                var data = {};
                data[name] = value;
                this.set( data );
              },
              // Make it configurable and enumerable so it's easy to override...
              configurable: true,
              enumerable: true
            } );
          }

          //TODO: Factor this out
          propit( 'pusherX' );
          propit( 'items' );
          propit( 'appliedForce' );
          propit( 'friction' );
          propit( 'velocity' );
          propit( 'position' );
          propit( 'showForce' );
          propit( 'showValues' );
          propit( 'showSumOfForces' );
          propit( 'showSpeed' );
          propit( 'showMasses' );
          propit( 'showAcceleration' );
          propit( 'running' );
          propit( 'stack' );
        },

        //Upper items should fall if an item removed from beneath
        //Uses the view to get item dimensions.
        //TODO: use backbone collection to watch for removal, etc.
        spliceStack: function( index ) {
          this.stack.splice( index, 1 );
          if ( this.stack.length > 0 ) {
            var sumHeight = 0;
            for ( var i = 0; i < this.stack.length; i++ ) {
              var size = this.getSize( this.stack[i] );
              sumHeight += size.height;
              this.stack[i].animateTo( 480 - size.width / 2, 350 - sumHeight );
            }
          }
        },
        step: function() {
          var dt = 1;
          var mass = 1000;
          var acceleration = this.appliedForce / mass;
          this.velocity = this.velocity + acceleration * dt;
          this.position = this.position + this.velocity * dt;
          for ( var i = 0; i < this.items.length; i++ ) {
            this.items[i].step();
          }
        },
        reset: function() {
//          this.clear().set( this.defaults );//see http://stackoverflow.com/questions/6889457/easiest-way-to-reset-backbones-model-to-initial-defaults
          this.set( this.defaults );   //TODO: may need to clear values or handle initialize parameters if they are introduced
          for ( var i = 0; i < this.items.length; i++ ) {
            this.items[i].reset();
          }
          this.stack = [];
        },

        //Add a listener and automatically call it back
        sync: function( key, listener, thisRef ) {
          this.on( 'change:' + key, listener, thisRef );
          if ( typeof thisRef === "undefined" ) {listener( this, this[key] );}
          else {listener.call( thisRef, this, this[key] );} //Follow backbone pattern of passing the this instead of calling bind  
        },

        //Get a property for one of the backbone model attributes
        property: function( key ) {
          var model = this;
          return {
            get: function() { return model[key]; },
            set: function( newValue ) { model[key] = newValue; },
            addListener: function( listener ) { model.sync( key, listener ); }
          };
        }
      } );

  return MotionModel;
} );