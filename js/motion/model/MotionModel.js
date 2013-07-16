// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the Motion, Friction and Acceleration tabs
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var Item = require( 'motion/model/Item' );
  var assert = require( 'ASSERT/assert' )( 'forces-and-motion-basics' );
  var PropertySet = require( 'AXON/PropertySet' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MotionConstants = require( 'motion/MotionConstants' );

  /**
   * Constructor for the motion model
   * @param {String} tab String that indicates which of the 3 tabs this model represents
   * @param {Boolean} skateboard flag for whether there is a skateboard //TODO: replace with tab flag
   * @param {Boolean} accelerometer //TODO: replace with tab flag
   * @param {Boolean} friction //TODO: replace with tab flag
   * @constructor
   */
  function MotionModel( tab, skateboard, accelerometer, friction ) {

    //Constants
    this.tab = tab;
    this.skateboard = skateboard;
    this.accelerometer = accelerometer;
    this.stack = new ObservableArray();

    //Observable values, all values are in MKS units (meters, kg, sec, Newtons, etc.)
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

      //TODO: document or rename
      _speedValue: 'WITHIN_ALLOWED_RANGE',
      movingRight: true,
      direction: 'none',
      timeSinceFallen: 10,
      fallen: false,
      fallenDirection: 'left',
      time: 0
    } );

    //Motion models must be constructed with a tab, which indicates 'motion'|'friction'|'acceleration'
    assert && assert( this.tab );
    var motionModel = this;
    var bucket = new Item( this, 'water-bucket.png', 100, 845, 547 + -39, 0.78 );
    bucket.bucket = true;
    this.items = accelerometer ?
                 [
                   new Item( this, 'fridge.png', 200, 25, 439, 0.8 ),
                   new Item( this, 'crate.png', 50, 126, 495, 0.5 ),
                   new Item( this, 'crate.png', 50, 218, 495, 0.5 ),
                   new Item( this, 'girl-standing.png', 40, 684, 471, 0.6, 16, 'girl-sitting.png', 'girl-holding.png' ),
                   new Item( this, 'man-standing.png', 80, 747, 421, 0.6, 10, 'man-sitting.png', 'man-holding.png' ),
                   bucket
                 ] :
                 [ new Item( this, 'fridge.png', 200, 25, 439, 0.8 ),
                   new Item( this, 'crate.png', 50, 126, 495, 0.5 ),
                   new Item( this, 'crate.png', 50, 218, 495, 0.5 ),
                   new Item( this, 'girl-standing.png', 40, 684, 471, 0.6, 16, 'girl-sitting.png', 'girl-holding.png' ),
                   new Item( this, 'man-standing.png', 80, 747, 421, 0.6, 10, 'man-sitting.png', 'man-holding.png' ),
                   new Item( this, 'trash-can.png', 100, 816, 502, 0.7 ),
                   new Item( this, 'mystery-object-01.png', 50, 888, 543, 1.1 )
                 ];

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
    spliceStack: function( index ) {
      var item = this.stack.get( index );
      this.stack.splice( index, 1 );
      if ( this.stack.length > 0 ) {
        var sumHeight = 0;
        for ( var i = 0; i < this.stack.length; i++ ) {
          var size = this.getSize( this.stack.at( i ) );
          sumHeight += size.height;
          this.stack.at( i ).animateTo( this.view.layoutBounds.width / 2 - size.width / 2, (this.skateboard ? 335 : 360) - sumHeight, 'stack' );//TODO: factor out this code for layout, which is duplicated in MotionTab.topOfStack
        }
      }

      //If the stack is emptied, stop the motion
      if ( this.stack.length === 0 ) {
        this.velocity = 0;
        this.acceleration = 0;
      }
      return item;
    },

    //When a 4th item is placed on the stack, move the bottom item home and have the stack fall
    spliceStackBottom: function() {
      var bottom = this.spliceStack( 0 );
      bottom.onBoard = false;
      bottom.animateHome();
    },

    //Determine whether a value is positive, negative or zero for the physics computations
    getSign: function( value ) { return value > 0 ? 1 : value < 0 ? -1 : 0; },

    //Returns the friction force on an object given the applied force
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

    //Computes the new forces and sets them to the corresponding properties
    updateForces: function() {

      //The first part of stepInTime is to compute and set the forces.  But this is factored out because the forces must also be updated
      //When the user changes the friction force or mass while the sim is paused.
      this.frictionForce = this.getFrictionForce( this.appliedForce );
      this.sumOfForces = this.frictionForce + this.appliedForce;
    },

    //Compute the mass of the entire stack, for purposes of momentum computation
    //TODO: Replace with fold left or _.reduce
    getStackMass: function() {
      var sum = 0;
      for ( var i = 0; i < this.stack.length; i++ ) {
        sum += this.stack.at( i ).mass;
      }
      return sum;
    },

    //Determine whether a value is positive, negative or zero, to determine whether the object changed directions.
    sign: function( value ) {
      return value < 0 ? 'negative' :
             value > 0 ? 'positive' :
             'zero';
    },

    //Determine whether a velocity value changed direction
    changedDirection: function( a, b ) {
      return this.sign( a ) === 'negative' && this.sign( b ) === 'positive' ||
             this.sign( b ) === 'negative' && this.sign( a ) === 'positive';
    },

    //Update the physics
    step: function( dt ) {

      //There are more than 2x as many frames on html as we were getting on Java, so have to decrease the dt to compensate
      dt = dt / 2.3;
      this.time = this.time + dt;
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
      if ( newVelocity > MotionConstants.maxSpeed ) { newVelocity = MotionConstants.maxSpeed; }
      if ( newVelocity < -MotionConstants.maxSpeed ) { newVelocity = -MotionConstants.maxSpeed; }

      this.velocity = newVelocity;
      this.position = this.position + this.velocity * dt;
      this.speed = Math.abs( this.velocity );
      this.speedValue = this.velocity >= MotionConstants.maxSpeed ? 'RIGHT_SPEED_EXCEEDED' :
                        this.velocity <= -MotionConstants.maxSpeed ? 'LEFT_SPEED_EXCEEDED' :
                        'WITHIN_ALLOWED_RANGE';

      if ( this.speedValue !== 'WITHIN_ALLOWED_RANGE' ) {
        this.timeSinceFallen = 0;
        this.fallen = true;
        this.fallenDirection = this.speedValue === 'RIGHT_SPEED_EXCEEDED' ? 'right' : 'left';
      }
      else {
        this.timeSinceFallen = this.timeSinceFallen + dt;

        //Stand up after 1 second
        if ( this.timeSinceFallen > 1 ) {
          this.fallen = false;
        }
      }

      //Stand up if applying a force in the opposite direction that you fell
      if ( this.fallen && this.fallenDirection === 'left' && this.appliedForce > 0 ) {
        this.fallen = false;
      }
      if ( this.fallen && this.fallenDirection === 'right' && this.appliedForce < 0 ) {
        this.fallen = false;
      }

      if ( this._speedValue !== 'WITHIN_ALLOWED_RANGE' ) {
        this.speedValue = this._speedValue;
      }

      for ( var i = 0; i < this.items.length; i++ ) {
        this.items[i].step();
      }
    },

    //Determine whether an item is in the stack.
    isInStack: function( item ) { return this.stack.contains( item ); },

    //Determine whether an item is stacked above another item, so that the arms can be raised for humans
    isItemStackedAbove: function( item ) { return this.isInStack( item ) && this.stack.indexOf( item ) < this.stack.length - 1;},

    //Reset the model
    reset: function() {
      PropertySet.prototype.reset.call( this );
      for ( var i = 0; i < this.items.length; i++ ) {
        this.items[i].reset();
      }
      this.stack.clear();

      //Move the initial crate to the play area, since it resets to the toolbox, not its initial location.
      this.viewInitialized( this.view );
    },

    /**
     * After the view is constructed, move one of the blocks to the top of the stack.
     * It would be better if more of this could be done in the model constructor, but it would be difficult with the way things are currently set up.
     * @param view
     */
    viewInitialized: function( view ) {
      this.view = view;
      var item = this.items[1];
      item.onBoard = true;
      var itemNode = view.itemNodes[1];
      item.animating = {enabled: false, x: 0, y: 0, end: null};
      item.interactionScale = 1.3;
      item.x = view.layoutBounds.width / 2 - itemNode.width / 2;
      item.y = view.topOfStack - itemNode.height;
      this.stack.add( item );
    }
  } );
} );