define( function( require ) {
  "use strict";
  var Vector2 = require( "DOT/Vector2" );
  var Item = require( 'motion/model/Item' );
  var assert = require( 'ASSERT/assert' )( 'forces-and-motion-basics' );
  var Layout = require( 'Layout' );
  var Property = require( 'AXON/Property' );
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );

  function sign( value ) {
    return value < 0 ? 'negative' :
           value > 0 ? 'positive' :
           'zero';
  }

  function MotionModel( tab, skateboard, accelerometer ) {
    this.tab = tab;
    this.skateboard = skateboard;
    this.accelerometer = accelerometer;
    PropertySet.call( this, {
      appliedForce: 0,
      frictionForce: 0,
      friction: 0,

      sumOfForces: 0,

      position: 0,
      speed: 0,
      //Velocity is a 1-d vector, where the direction (right or left) is indicated by the sign
      velocity: 0,
      acceleration: 0,
      pusherPosition: 100 / 40, //Start to the right of the box by this many pixels
      showForce: true,
      showValues: false,
      showSumOfForces: false,
      showSpeed: false,
      showMasses: false,
      showAcceleration: false,
      speedValue: 'WITHIN_ALLOWED_RANGE',
      _speedValue: 'WITHIN_ALLOWED_RANGE',
      movingRight: true,
      direction: 'none',
      time: 0
    } );

    this.stack = [];//TODO: Could put this is the property list and use immutable array ops.  Would provide notifications (and we could stop using trigger('stackChanged') for it.)
    //Motion models must be constructed with a tab, which indicates 'motion'|'friction'|'acceleration'
    assert && assert( this.tab );
    var motionModel = this;
    //TODO: Switch to backbone collection.
    var dy = -39;
    var bucket = new Item( this, 'water-bucket.png', 100, 845, 547 + dy, 0.78 );
    bucket.bucket = true;
    this.items = accelerometer ?
                 [
                   new Item( this, 'fridge.png', 200, 25, 478 + dy, 0.8 ),
                   new Item( this, 'crate.png', 50, 126, 550 - 18 + 2 + dy, 0.5 ),
                   new Item( this, 'crate.png', 50, 218, 550 - 18 + 2 + dy, 0.5 ),
                   new Item( this, 'girl-standing.png', 40, 684, 510 + dy, 0.6, 16, "girl-sitting.png", "girl-holding.png" ),
                   new Item( this, 'man-standing.png', 80, 747, 460 + dy, 0.6, 10, "man-sitting.png", "man-holding.png" ),
                   bucket
                 ] :
                 [ new Item( this, 'fridge.png', 200, 25, 478 + dy, 0.8 ),
                   new Item( this, 'crate.png', 50, 126, 550 - 18 + 2 + dy, 0.5 ),
                   new Item( this, 'crate.png', 50, 218, 550 - 18 + 2 + dy, 0.5 ),
                   new Item( this, 'girl-standing.png', 40, 684, 510 + dy, 0.6, 16, "girl-sitting.png", "girl-holding.png" ),
                   new Item( this, 'man-standing.png', 80, 747, 460 + dy, 0.6, 10, "man-sitting.png", "man-holding.png" ),
                   new Item( this, 'trash-can.png', 100, 826 - 10, 518 + 11 + 12 + dy, 0.7 ),
                   new Item( this, 'mystery-object-01.png', 50, 880 + 10 - 2, 580 + 2 + dy, 1.1 )
                 ];

    //Mix in backbone events for trigger, on, once, etc.
    _.extend( this, Backbone.Events );

    var f = function() {
      motionModel.trigger( 'draggingItemsChanged' );
    };

    for ( var i = 0; i < this.items.length; i++ ) {
      this.items[i].draggingProperty.link( f );
    }

    this.velocityProperty.link( function( velocity ) {
      motionModel.direction = velocity > 0 ? 'right' :
                              velocity < 0 ? 'left' :
                              'none';
    } );

    //Applied force should drop to zero if max speed reached
    this.speedValueProperty.link( function( speedValue ) {
      if ( speedValue !== 'WITHIN_ALLOWED_RANGE' ) {
        motionModel.appliedForce = 0;
      }
    } );
  }

  return inherit( PropertySet, MotionModel, {

    draggingItems: function() {
      var draggingItems = [];
      for ( var i = 0; i < this.items.length; i++ ) {
        var item = this.items[i];
        if ( item.dragging ) {
          draggingItems.push( item );
        }
      }
      return draggingItems;
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
          this.stack[i].animateTo( Layout.width / 2 - size.width / 2, (this.skateboard ? 335 : 360) - sumHeight, 'stack' );//TODO: factor out this code for layout, which is duplicated in MotionTab.topOfStack
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
      return sign( a ) === 'negative' && sign( b ) === 'positive' ||
             sign( b ) === 'negative' && sign( a ) === 'positive';
    },
    step: function( dt ) {
      this.time = this.time + dt;
      var MAX_SPEED = 20;
      this.updateForces();

      var mass = this.getStackMass();
      this.acceleration = mass !== 0 ? this.sumOfForces / mass : 0.0;

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

      if ( this._speedValue !== 'WITHIN_ALLOWED_RANGE' ) {
        this.lastOutOfRange = {time: Date.now(), speedValue: this._speedValue };
        this.speedValue = this._speedValue;
      }

      for ( var i = 0; i < this.items.length; i++ ) {
        this.items[i].step();
      }
    },
    isInStack: function( item ) { return _.indexOf( this.stack, item ) >= 0; },
    isItemStackedAbove: function( item ) {
      var index = _.indexOf( this.stack, item );
      if ( index === -1 ) {
        return false;
      }
      return index < this.stack.length - 1;
    },
    reset: function() {
      PropertySet.prototype.reset.call( this );
      for ( var i = 0; i < this.items.length; i++ ) {
        this.items[i].reset();
      }
      this.stack = [];
      this.trigger( 'stackChanged' );
    }
  } );
} );