define( function( require ) {
  "use strict";
  var Vector2 = require( "DOT/Vector2" );
  var Item = require( 'motion/model/Item' );
  var assert = require( 'ASSERT/assert' )( 'forces-and-motion-basics' );
  var Layout = require( 'Layout' );
  var Property = require( 'PHETCOMMON/model/property/Property' );
  var PropertySet = require( 'PHETCOMMON/model/property/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );

  function sign( value ) {
    return value < 0 ? 'negative' :
           value > 0 ? 'positive' :
           'zero';
  }

  function MotionModel( tab, skateboard ) {
    this.tab = tab;
    this.skateboard = skateboard;
    PropertySet.call( this, {
      appliedForce: 0,
      frictionForce: 0,
      friction: 0,

      sumOfForces: 0,

      position: 0,
      speed: 0,
      //Velocity is a 1-d vector, where the direction (right or left) is indicated by the sign
      velocity: 0,
      pusherPosition: 100, //Start to the right of the box by this many pixels
      showForce: true,
      showValues: false,
      showSumOfForces: false,
      showSpeed: false,
      showMasses: false,
      showAcceleration: false,
      speedValue: 'WITHIN_ALLOWED_RANGE',
      _speedValue: 'WITHIN_ALLOWED_RANGE'} );

    this.stack = [];//TODO: Could put this is the property list and use immutable array ops.  Would provide notifications (and we could stop using trigger('stackChanged') for it.)
    //Motion models must be constructed with a tab, which indicates 'motion'|'friction'|'acceleration'
    assert && assert( this.tab );
    var motionModel = this;
    //TODO: Switch to backbone collection.
    var dy = -39;
    this.items = [
      new Item( this, 'fridge.png', 200, 25, 478 + dy, 0.8 ),
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
      this.items[i].dragging.link( f );
    }
  }

  return inherit( MotionModel, PropertySet, {

    draggingItems: function() {
      var draggingItems = [];
      for ( var i = 0; i < this.items.length; i++ ) {
        var item = this.items[i];
        if ( item.dragging.value ) {
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
      if ( this.friction.value === 0.0 ) { return 0.0; }
      var frictionForce = Math.abs( this.friction.value ) * this.getSign( this.friction.value ) * mass * g;

      //Friction force only applies above this velocity
      var velocityThreshold = 1E-12;
      if ( Math.abs( this.velocity.value ) <= velocityThreshold && Math.abs( frictionForce ) > Math.abs( appliedForce ) ) {
        frictionForce = appliedForce;
      }
      else if ( Math.abs( this.velocity.value ) > velocityThreshold ) {
        frictionForce = this.getSign( this.velocity.value ) * this.friction.value * mass * g;
      }
      return -frictionForce;
    },

    //TODO: Test this
    updateForces: function() {
      //The first part of stepInTime is to compute and set the forces.  But this is factored out because the forces must also be updated
      //When the user changes the friction force or mass while the sim is paused.
      var frictionForce = this.getFrictionForce( this.appliedForce.value );
      this.frictionForce.value = frictionForce;
      this.sumOfForces.value = frictionForce + this.appliedForce.value;
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
      this.acceleration = mass != 0 ? this.sumOfForces.value / mass : 0.0;

      var newVelocity = this.velocity.value + this.acceleration * dt;

      //friction force should not be able to make the object move backwards
      //Also make sure velocity goes exactly to zero when the pusher is pushing so that the friction force will be correctly computed
      //Without this logic, it was causing flickering arrows because the velocity was flipping sign and the friction force was flipping direction
      if ( this.changedDirection( newVelocity, this.velocity.value ) ) {
        newVelocity = 0.0;
      }

      //Cap at strobe speed.  This is necessary so that a reverse applied force will take effect immediately, without these lines of code the pusher will stutter.
      if ( newVelocity > MAX_SPEED ) { newVelocity = MAX_SPEED; }
      if ( newVelocity < -MAX_SPEED ) { newVelocity = -MAX_SPEED; }

//        System.out.println( "sumOfForces = " + sumOfForces + ", ff = " + frictionForce.get() + ", af = " + appliedForce.get() + ", accel = " + acceleration + ", newVelocity = " + newVelocity );

      this.velocity.value = newVelocity;
      this.position.value = this.position.value + this.velocity.value * dt;
      this.speed.value = Math.abs( this.velocity.value );
      this.speedValue.value = this.velocity.value >= MAX_SPEED ? 'RIGHT_SPEED_EXCEEDED' :
                              this.velocity.value <= -MAX_SPEED ? 'LEFT_SPEED_EXCEEDED' :
                              'WITHIN_ALLOWED_RANGE';

      if ( this._speedValue.value != 'WITHIN_ALLOWED_RANGE' ) {
        this.lastOutOfRange = {time: Date.now(), speedValue: this._speedValue.value};
        this.speedValue.value = this._speedValue.value;
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
    }
  } );
} );