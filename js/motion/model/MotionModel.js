define( function( require ) {
  "use strict";
  var Vector2 = require( "DOT/Vector2" );
  var Item = require( 'motion/model/Item' );
  var Fort = require( 'FORT/Fort' );
  var assert = require( 'ASSERT/assert' )( 'forces-and-motion-basics' );

  var MotionModel = Fort.Model.extend(
      {defaults: {
        //TODO: Turn stack into a backbone collection
        stack: [],
        appliedForce: 0,
        pusherX: 0,
        friction: 0,

        //Velocity is a 1-d vector, where the direction (right or left) is indicated by the sign
        velocity: 0,

        position: 0,
        showForce: true,
        showValues: false,
        showSumOfForces: false,
        showSpeed: false,
        showMasses: false,
        showAcceleration: false,
        running: true,
        get topOfStack() { return 350 - this.stack.length * 100; },
        draggingItems: function() {
          var draggingItems = [];
          for ( var i = 0; i < this.items.length; i++ ) {
            var item = this.items[i];
            if ( item.dragging ) {
              draggingItems.push( item );
            }
          }
          return draggingItems;
        }
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
              this.stack[i].animateTo( 480 - size.width / 2, 350 - sumHeight, 'stack' );
            }
          }
          this.trigger( 'stackChanged' );
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
        isItemStackedAbove: function( item ) {
//          return true;
          var index = _.indexOf( this.stack, item );
          if ( index === -1 ) {
            return false;
          }
          return index < this.stack.length - 1;
        },
        reset: function() {
          this.set( this.defaults );   //TODO: may need to clear values or handle initialize parameters if they are introduced, see http://stackoverflow.com/questions/6889457/easiest-way-to-reset-backbones-model-to-initial-defaults
          for ( var i = 0; i < this.items.length; i++ ) {
            this.items[i].reset();
          }
          this.stack = [];
          this.trigger( 'stackChanged' );
        },
        init: function() {
          //Motion models must be constructed with a tab, which indicates 'motion'|'friction'|'acceleration'
          assert && assert( this.has( 'tab' ) );
          var motionModel = this;
          //TODO: Switch to backbone collection.
          this.items = [
            new Item( {context: this, image: 'fridge.png', weight: 200, x: 25, y: 478, imageScale: 0.8} ),
            new Item( {context: this, image: 'crate.png', weight: 50, x: 126, y: 550 - 18 + 2, imageScale: 0.5} ),
            new Item( {context: this, image: 'crate.png', weight: 50, x: 218, y: 550 - 18 + 2, imageScale: 0.5} ),
            new Item( {context: this, image: 'girl-standing.png', imageSitting: "girl-sitting.png", imageHolding: "girl-holding.png", weight: 40, x: 684, y: 510, imageScale: 0.6} ),
            new Item( {context: this, image: 'man-standing.png', imageSitting: "man-sitting.png", imageHolding: "man-holding.png", weight: 80, x: 747, y: 460, imageScale: 0.6} ),
            new Item( {context: this, image: 'trash-can.png', weight: 100, x: 826 - 10, y: 518 + 11 + 12, imageScale: 0.7} ),
            new Item( {context: this, image: 'mystery-object-01.png', weight: 50, x: 880 + 10 - 2, y: 580 + 2, imageScale: 1.1} )

          ];

          var f = function() {
            motionModel.trigger( 'draggingItemsChanged' );
          };

          for ( var i = 0; i < this.items.length; i++ ) {
            var item = this.items[i];
            item.on( 'change:dragging', f );
          }
        }
      } );

  return MotionModel;
} );