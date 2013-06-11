define( function( require ) {
  "use strict";
  var Vector2 = require( "DOT/Vector2" );
  var Item = require( 'motion/model/Item' );
  var assert = require( 'ASSERT/assert' )( 'forces-and-motion-basics' );
  var Layout = require( 'Layout' );
  var Property = require( 'AXON/Property' );
  var PropertySet = require( 'AXON/PropertySet' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MotionConstants = require( 'motion/MotionConstants' );

  function sign( value ) {
    return value < 0 ? 'negative' :
           value > 0 ? 'positive' :
           'zero';
  }

  function MotionModel( tab, skateboard, accelerometer, friction ) {
    this.tab = tab;
    this.skateboard = skateboard;
    this.accelerometer = accelerometer;
    PropertySet.call( this, {
      appliedForce: 0,
      frictionForce: 0,
      friction: friction,

      sumOfForces: 0,

      position: 0,
      speed: 0,
      //Velocity is a 1-d vector, where the direction (right or left) is indicated by the sign
      velocity: 0,
      acceleration: 0,
      pusherPosition: 1000 / MotionConstants.positionScale, //Start to the right of the box by this many pixels
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

    this.stack = new ObservableArray();
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
          var size = this.getSize( this.stack.at( i ) );
          sumHeight += size.height;
          this.stack.at( i ).animateTo( Layout.width / 2 - size.width / 2, (this.skateboard ? 335 : 360) - sumHeight, 'stack' );//TODO: factor out this code for layout, which is duplicated in MotionTab.topOfStack
        }
      }
    },
    getSign: function( value ) { return value > 0 ? 1 : value < 0 ? -1 : 0; },

    //TODO: Test this
    getFrictionForce: function( appliedForce ) {
      var g = 10.0;
      var sum = function( a, b ) {return a + b;};
      var toMass = function( item ) {return item.mass;};
      var mass = this.stack.map( toMass ).foldLeft( 0, sum );
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
        sum += this.stack.at( i ).mass;
      }
      return sum;
    },
    changedDirection: function( a, b ) {
      return sign( a ) === 'negative' && sign( b ) === 'positive' ||
             sign( b ) === 'negative' && sign( a ) === 'positive';
    },
    step: function( dt ) {

      //There are more than 2x as many frames on html as we were getting on Java, so have to decrease the dt to compensate
      dt = dt / 2.3;
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

//      console.log('sum of forces',this.sumOfForces, 'accel',this.acceleration,'speed',this.speed,'position',this.position);
//      this.count = this.count || 0;
//      this.count++;
//      console.log(this.count);
    },
    isInStack: function( item ) { return this.stack.contains( item ); },
    isItemStackedAbove: function( item ) { return this.isInStack( item ) && this.stack.indexOf( item ) < this.stack.length - 1;},
    reset: function() {
      PropertySet.prototype.reset.call( this );
      for ( var i = 0; i < this.items.length; i++ ) {
        this.items[i].reset();
      }
      this.stack.clear();
    },

    /**
     * After the view is constructed, move one of the blocks to the top of the stack.
     * It would be better if more of this could be done in the model constructor, but it would be difficult with the way things are currently set up.
     * @param view
     */
    viewInitialized: function( view ) {
      var item = this.items[1];
      item.onBoard = true;
      var itemNode = view.itemNodes[1];
      item.x = Layout.width / 2 - itemNode.width / 2;
      item.y = view.topOfStack - itemNode.height;
      this.stack.add( item );
    }
  } );
} );