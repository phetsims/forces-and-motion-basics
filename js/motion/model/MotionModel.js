// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the Motion, Friction and Acceleration screens
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var Item = require( 'FORCES_AND_MOTION_BASICS/motion/model/Item' );
  var PropertySet = require( 'AXON/PropertySet' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MotionConstants = require( 'FORCES_AND_MOTION_BASICS/motion/MotionConstants' );
  var Vector2 = require( 'DOT/Vector2' );
  var waterBucketImage = require( 'image!FORCES_AND_MOTION_BASICS/water-bucket.png' );
  var fridgeImage = require( 'image!FORCES_AND_MOTION_BASICS/fridge.png' );
  var crateImage = require( 'image!FORCES_AND_MOTION_BASICS/crate.png' );
  var girlStandingImage = require( 'image!FORCES_AND_MOTION_BASICS/girl-standing.png' );
  var manStandingImage = require( 'image!FORCES_AND_MOTION_BASICS/man-standing.png' );
  var girlSittingImage = require( 'image!FORCES_AND_MOTION_BASICS/girl-sitting.png' );
  var manSittingImage = require( 'image!FORCES_AND_MOTION_BASICS/man-sitting.png' );
  var girlHoldingImage = require( 'image!FORCES_AND_MOTION_BASICS/girl-holding.png' );
  var manHoldingImage = require( 'image!FORCES_AND_MOTION_BASICS/man-holding.png' );
  var trashCanImage = require( 'image!FORCES_AND_MOTION_BASICS/trash-can.png' );
  var mysteryObjectImage = require( 'image!FORCES_AND_MOTION_BASICS/mystery-object-01.png' );

  /**
   * Constructor for the motion model
   * @param {String} screen String that indicates which of the 3 screens this model represents
   * @constructor
   */
  function MotionModel( screen ) {
    //Motion models must be constructed with a screen, which indicates 'motion'|'friction'|'acceleration'
    assert && assert( screen );
    var motionModel = this;

    //Constants
    this.screen = screen;
    this.skateboard = screen === 'motion';
    this.accelerometer = screen === 'acceleration';
    this.friction = screen === 'motion' ? 0 : MotionConstants.MAX_FRICTION / 2;
    this.stack = new ObservableArray( { id: 'stack' } );

    //Observable values, all values are in MKS units (meters, kg, sec, Newtons, etc.)
    PropertySet.call( this, {
      appliedForce: 0,
      frictionForce: 0,
      friction: this.friction,

      sumOfForces: 0,

      position: 0,
      speed: 0,

      //Velocity is a 1-d vector, where the direction (right or left) is indicated by the sign
      velocity: 0,
      acceleration: 0,
      pusherPosition: -4, //Start to the left of the box by this many meters
      showForce: true,
      showValues: false,
      showSumOfForces: false,
      showSpeed: false,
      showMasses: false,
      showAcceleration: false,

      //Keep track of whether the speed is classified as: 'RIGHT_SPEED_EXCEEDED', 'LEFT_SPEED_EXCEEDED' or 'WITHIN_ALLOWED_RANGE'
      //so that the Applied Force can be stopped if the speed goes out of range
      speedClassification: 'WITHIN_ALLOWED_RANGE',
      previousSpeedClassification: 'WITHIN_ALLOWED_RANGE',
      movingRight: true,
      direction: 'none',
      timeSinceFallen: 10,
      fallen: false,
      fallenDirection: 'left',
      time: 0,

      //stack.length is already a property, but mirror it here to easily multilink with it, see usage in MotionScreenView.js
      //TODO: Perhaps a DerivedProperty would be more suitable instead of duplicating/synchronizing this value
      stackSize: 1
    } );

    //Indicate the model state when the applied force changes
    this.appliedForceProperty.link( function( appliedForce ) {
      phet.arch.trigger( 'model', 'motionModel', 'MotionModel', 'appliedForcePropertyChanged', { state: motionModel.getState() } );
    } );

    //Do not send PhET events for time changing
    this.timeProperty.setSendPhetEvents( false );
    this.timeSinceFallenProperty.setSendPhetEvents( false );
    var throttlePeriod = 0.2;//Seconds.  Send at 5Hz
    this.frictionProperty.throttle( throttlePeriod );
    this.velocityProperty.throttle( throttlePeriod );
    this.positionProperty.throttle( throttlePeriod );
    this.pusherPositionProperty.throttle( throttlePeriod );
    this.speedProperty.throttle( throttlePeriod );
    this.frictionForceProperty.throttle( throttlePeriod );
    this.accelerationProperty.throttle( throttlePeriod );
    this.appliedForceProperty.throttle( throttlePeriod );

    //Zero out the applied force when the last object is removed.  Necessary to remove the force applied with the slider tweaker buttons.  See #37
    this.stack.lengthProperty.link( function( length ) { if ( length === 0 ) { motionModel.appliedForce = 0; } } );

    this.stack.lengthProperty.linkAttribute( this, 'stackSize' );

    var bucket = new Item( this, 'bucket', waterBucketImage, 100, 845, 547 + -39, 0.78 );
    bucket.bucket = true;
    var fridge = new Item( this, 'fridge', fridgeImage, 200, 25, 439, 0.8, 4 );
    var crate1 = new Item( this, 'crate1', crateImage, 50, 126, 495, 0.5 );
    var crate2 = new Item( this, 'crate2', crateImage, 50, 218, 495, 0.5 );
    var girl = new Item( this, 'girl', girlStandingImage, 40, 684, 471, 0.6, 4, girlSittingImage, girlHoldingImage );
    var man = new Item( this, 'man', manStandingImage, 80, 747, 421, 0.6, 12, manSittingImage, manHoldingImage );
    this.items = this.accelerometer ?
                 [ fridge, crate1, crate2, girl, man, bucket ] :
                 [ fridge, crate1, crate2, girl, man,
                   new Item( this, 'trash', trashCanImage, 100, 816, 502, 0.7, 11 ),
                   new Item( this, 'mystery', mysteryObjectImage, 50, 888, 543, 1.1, undefined, undefined, undefined, true )
                 ];

    this.appliedForceProperty.link( function( appliedForce ) {
      motionModel.direction = appliedForce > 0 ? 'right' :
                              appliedForce < 0 ? 'left' :
                              'none';
    } );

    //Applied force should drop to zero if max speed reached
    this.speedClassificationProperty.link( function( speedClassification ) {
      if ( speedClassification !== 'WITHIN_ALLOWED_RANGE' ) {
        motionModel.appliedForce = 0;
      }
    } );
  }

  return inherit( PropertySet, MotionModel, {

    draggingItems: function() {
      var draggingItems = [];
      for ( var i = 0; i < this.items.length; i++ ) {
        var item = this.items[ i ];
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
      this.stack.remove( item );
      if ( this.stack.length > 0 ) {
        var sumHeight = 0;
        for ( var i = 0; i < this.stack.length; i++ ) {
          var size = this.view.getSize( this.stack.get( i ) );
          sumHeight += size.height;
          this.stack.get( i ).animateTo( this.view.layoutBounds.width / 2 - size.width / 2 + this.stack.get( i ).centeringOffset, (this.skateboard ? 335 : 360) - sumHeight, 'stack' );//TODO: factor out this code for layout, which is duplicated in MotionTab.topOfStack
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
      var mass = this.stack.map( toMass ).reduce( 0, sum );
      var frictionForceMagnitude = Math.abs( this.friction * mass * g );

      //Friction force only applies above this velocity
      var velocityThreshold = 1E-12;

      //Object is motionless, friction should oppose the applied force
      if ( Math.abs( this.velocity ) <= velocityThreshold ) {

        //the friction is higher than the applied force, so don't allow the friction force to be higher than the applied force
        return frictionForceMagnitude >= Math.abs( appliedForce ) ? -appliedForce :

          //Oppose the applied force
               -this.getSign( this.appliedForce ) * frictionForceMagnitude;
      }

      //Object is moving, so friction should oppose the velocity
      else {
        return -this.getSign( this.velocity ) * frictionForceMagnitude;
      }
    },

    //Compute the mass of the entire stack, for purposes of momentum computation
    getStackMass: function() { return this.stack.reduce( 0, function( sum, item ) { return sum + item.mass; } ); },

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

      //Computes the new forces and sets them to the corresponding properties
      //The first part of stepInTime is to compute and set the forces.  But this is factored out because the forces must also be updated
      //When the user changes the friction force or mass while the sim is paused.
      this.frictionForce = this.getFrictionForce( this.appliedForce );
      this.sumOfForces = this.frictionForce + this.appliedForce;

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
      if ( newVelocity > MotionConstants.MAX_SPEED ) { newVelocity = MotionConstants.MAX_SPEED; }
      if ( newVelocity < -MotionConstants.MAX_SPEED ) { newVelocity = -MotionConstants.MAX_SPEED; }

      this.velocity = newVelocity;
      this.position = this.position + this.velocity * dt;
      if ( this.appliedForce !== 0 ) {
        this.pusherPosition = this.position + 2 * (this.appliedForce > 0 ? -1 : 1);
      }
      this.speed = Math.abs( this.velocity );
      this.speedClassification = this.velocity >= MotionConstants.MAX_SPEED ? 'RIGHT_SPEED_EXCEEDED' :
                                 this.velocity <= -MotionConstants.MAX_SPEED ? 'LEFT_SPEED_EXCEEDED' :
                                 'WITHIN_ALLOWED_RANGE';

      if ( this.speedClassification !== 'WITHIN_ALLOWED_RANGE' ) {
        this.timeSinceFallen = 0;
        this.fallenDirection = this.speedClassification === 'RIGHT_SPEED_EXCEEDED' ? 'right' : 'left';
        this.fallen = true;
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

      if ( this.previousSpeedClassification !== 'WITHIN_ALLOWED_RANGE' ) {
        this.speedClassification = this.previousSpeedClassification;
      }

      for ( var i = 0; i < this.items.length; i++ ) {
        this.items[ i ].step( dt );
      }

      //Don't show the pusher as fallen while applying a force, see https://github.com/phetsims/forces-and-motion-basics/issues/66
      if ( this.appliedForce !== 0 ) {
        this.fallen = false;
      }

      this.trigger( 'stepped' );
    },

    //Determine whether an item is in the stack.
    isInStack: function( item ) { return this.stack.contains( item ); },

    //Determine whether an item is stacked above another item, so that the arms can be raised for humans
    isItemStackedAbove: function( item ) { return this.isInStack( item ) && this.stack.indexOf( item ) < this.stack.length - 1;},

    //Reset the model
    reset: function() {
      PropertySet.prototype.reset.call( this );
      for ( var i = 0; i < this.items.length; i++ ) {
        this.items[ i ].reset();
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
      var item = this.items[ 1 ];
      item.onBoard = true;
      var itemNode = view.itemNodes[ 1 ];
      item.animating = { enabled: false, x: 0, y: 0, end: null };
      item.interactionScale = 1.3;
      item.position = new Vector2( view.layoutBounds.width / 2 - itemNode.width / 2, view.topOfStack - itemNode.height );
      this.stack.add( item );
    },

    /**
     * Get the state of the simulation, for persistence.
     * @return {{properties: *, stack: Array}}
     */
    getState: function() {
      var motionModel = this;
      return {
        properties: this.get(),
        stack: motionModel.stack.getArray().map( function( item ) {return item.get().name;} ).join( ',' )
      };
    }
  } );
} );