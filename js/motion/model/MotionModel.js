define( function( require ) {
  "use strict";
  var Vector2 = require( "DOT/Vector2" );
  var Item = require( 'motion/model/Item' );
  var Fort = require( 'FORT/Fort' );
  var assert = require( 'ASSERT/assert' )( 'forces-and-motion-basics' );
  var Layout = require( 'Layout' );

  function sign( value ) {
    return value < 0 ? 'negative' :
           value > 0 ? 'positive' :
           'zero';
  }

  var MotionModel = Fort.Model.extend(
      {defaults: {
        //TODO: Turn stack into a backbone collection
        stack: null, //Array: Initialized in the constructor so that stack instance will not be shared across MotionModel instances.
        appliedForce: 0,
        frictionForce: 0,
        pusherX: 0,
        friction: 0,

        //Velocity is a 1-d vector, where the direction (right or left) is indicated by the sign
        velocity: 0,
        sumOfForces: 0,
        skateboard: false,

        position: 0,
        showForce: true,
        showValues: false,
        showSumOfForces: false,
        showSpeed: false,
        showMasses: false,
        showAcceleration: false,
        running: true,
        speedValue: 'WITHIN_ALLOWED_RANGE',
        _speedValue: 'WITHIN_ALLOWED_RANGE',
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
              this.stack[i].animateTo( Layout.width / 2 - size.width / 2, 380 - 42 - 3 - sumHeight, 'stack' );//TODO: factor out this code for layout, which is duplicated in MotionTab.topOfStack
            }
          }
          this.trigger( 'stackChanged' );
        },
        getSign: function( value ) { return value > 0 ? 1 : value < 0 ? -1 : 0; },

        //TODO: Test this
        getFrictionForce: function( appliedForce ) {
          var g = 10.0;
          var mass = 5;
          if ( this.friction === 0.0 ) { return 0.0; }
          var frictionForce = Math.abs( this.friction ) * this.getSign( this.friction ) * mass * g;

          //Friction force only applies above this velocity
          var velocityThreshold = 1E-12;
          if ( Math.abs( this.velocity ) <= velocityThreshold && Math.abs( frictionForce ) > Math.abs( appliedForce ) ) {
            frictionForce = appliedForce;
          }
          else if ( Math.abs( this.velocity ) > velocityThreshold ) {
            frictionForce = this.getSign( this.velocity ) * this.friction * mass * g;
          }
          return -frictionForce;
        },

        //TODO: Test this
        updateForces: function() {
          //The first part of stepInTime is to compute and set the forces.  But this is factored out because the forces must also be updated
          //When the user changes the friction force or mass while the sim is paused.
          var frictionForce = this.getFrictionForce( this.appliedForce );
          this.frictionForce = frictionForce;
          this.sumOfForces = frictionForce + this.appliedForce;
        },
        getStackMass: function() {
          var sum = 0;
          for ( var i = 0; i < this.stack.length; i++ ) {
            sum += this.stack[i].mass;
          }
          return sum;
        },
        changedDirection: function( a, b ) {
          return sign( a ) === 'negative' && sign( b ) === 'positive'
              || sign( b ) === 'negative' && sign( a ) === 'positive';
        },
        step: function( dt ) {
          dt = dt * 20;//TODO: Remove this.
          var MAX_SPEED = 20;
          this.updateForces();

          var mass = this.getStackMass();
          this.acceleration = mass != 0 ? this.sumOfForces / mass : 0.0;

          var newVelocity = this.velocity + this.acceleration * dt;

          //friction force should not be able to make the object move backwards
          //Also make sure velocity goes exactly to zero when the pusher is pushing so that the friction force will be correctly computed
          //Without this logic, it was causing flickering arrows because the velocity was flipping sign and the friction force was flipping direction
          if ( this.changedDirection( newVelocity, this.velocity ) ) {
            newVelocity = 0.0;
          }

          //Cap at strobe speed.  This is necessary so that a reverse applied force will take effect immediately, without these lines of code the pusher will stutter.
          if ( newVelocity > MAX_SPEED ) { newVelocity = MAX_SPEED; }
          if ( newVelocity < -MAX_SPEED ) { newVelocity = -MAX_SPEED; }

//        System.out.println( "sumOfForces = " + sumOfForces + ", ff = " + frictionForce.get() + ", af = " + appliedForce.get() + ", accel = " + acceleration + ", newVelocity = " + newVelocity );

          this.velocity = newVelocity;
          this.position = this.position + this.velocity * dt;
          this.speed = Math.abs( this.velocity );
          this.speedValue = this.velocity >= MAX_SPEED ? 'RIGHT_SPEED_EXCEEDED' :
                            this.velocity <= -MAX_SPEED ? 'LEFT_SPEED_EXCEEDED' :
                            'WITHIN_ALLOWED_RANGE';

          if ( this._speedValue != 'WITHIN_ALLOWED_RANGE' ) {
            this.lastOutOfRange = {time: Date.now(), speedValue: this._speedValue};
            this.speedValue = this._speedValue;
          }

          for ( var i = 0; i < this.items.length; i++ ) {
            this.items[i].step();
          }
        },
        isItemStackedAbove: function( item ) {
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

          //Initialize the stack array in the constructor rather than in the defaults so that stack instance will not be shared across MotionModel instances.
          this.stack = [];

          //Motion models must be constructed with a tab, which indicates 'motion'|'friction'|'acceleration'
          assert && assert( this.has( 'tab' ) );
          var motionModel = this;
          //TODO: Switch to backbone collection.
          var dy = -39;
          this.items = [
            new Item( {context: this, image: 'fridge.png', mass: 200, x: 25, y: 478 + dy, imageScale: 0.8} ),
            new Item( {context: this, image: 'crate.png', mass: 50, x: 126, y: 550 - 18 + 2 + dy, imageScale: 0.5} ),
            new Item( {context: this, image: 'crate.png', mass: 50, x: 218, y: 550 - 18 + 2 + dy, imageScale: 0.5} ),
            new Item( {context: this, image: 'girl-standing.png', imageSitting: "girl-sitting.png", imageHolding: "girl-holding.png", mass: 40, x: 684, y: 510 + dy, imageScale: 0.6, pusherInset: 16} ),
            new Item( {context: this, image: 'man-standing.png', imageSitting: "man-sitting.png", imageHolding: "man-holding.png", mass: 80, x: 747, y: 460 + dy, imageScale: 0.6, pusherInset: 10} ),
            new Item( {context: this, image: 'trash-can.png', mass: 100, x: 826 - 10, y: 518 + 11 + 12 + dy, imageScale: 0.7} ),
            new Item( {context: this, image: 'mystery-object-01.png', mass: 50, x: 880 + 10 - 2, y: 580 + 2 + dy, imageScale: 1.1} )
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

  window.MotionModel = MotionModel;
  return MotionModel;
} );