// Copyright 2013-2015, University of Colorado Boulder

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
  var Util = require( 'DOT/Util' );
  var waterBucketImage = require( 'image!FORCES_AND_MOTION_BASICS/water-bucket.png' );
  var fridgeImage = require( 'image!FORCES_AND_MOTION_BASICS/fridge.png' );
  var crateImage = require( 'image!FORCES_AND_MOTION_BASICS/crate.png' );
  var girlStandingImage = require( 'mipmap!FORCES_AND_MOTION_BASICS/girl-standing.png' );
  var manStandingImage = require( 'mipmap!FORCES_AND_MOTION_BASICS/man-standing.png' );
  var girlSittingImage = require( 'mipmap!FORCES_AND_MOTION_BASICS/girl-sitting.png' );
  var manSittingImage = require( 'mipmap!FORCES_AND_MOTION_BASICS/man-sitting.png' );
  var girlHoldingImage = require( 'mipmap!FORCES_AND_MOTION_BASICS/girl-holding.png,level=1' );
  var manHoldingImage = require( 'mipmap!FORCES_AND_MOTION_BASICS/man-holding.png' );
  var trashCanImage = require( 'mipmap!FORCES_AND_MOTION_BASICS/trash-can.png' );
  var mysteryObjectImage = require( 'image!FORCES_AND_MOTION_BASICS/mystery-object-01.png' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var Range = require( 'DOT/Range' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );
  var TString = require( 'ifphetio!PHET_IO/types/TString' );
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );

  /**
   * Constructor for the motion model
   *
   * @param {String} screen String that indicates which of the 3 screens this model represents
   * @param {Tandem} tandem
   * @constructor
   */
  function MotionModel( screen, tandem ) {

    //Motion models must be constructed with a screen, which indicates 'motion'|'friction'|'acceleration'
    assert && assert( screen );
    var self = this;

    //Constants
    this.screen = screen;
    this.skateboard = screen === 'motion';
    this.accelerometer = screen === 'acceleration';
    this.friction = screen === 'motion' ? 0 : MotionConstants.MAX_FRICTION / 2;
    this.stack = new ObservableArray();

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
      pusherPosition: -16, //Start to the left of the box by this many meters
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
      stackSize: 1,

      // is the sim running or paused?
      play: true
    }, {
      tandemSet: {
        sumOfForces: tandem.createTandem( 'sumOfForcesProperty' ),
        showSumOfForces: tandem.createTandem( 'showSumOfForcesProperty' ),
        play: tandem.createTandem( 'playProperty' ),
        appliedForce: tandem.createTandem( 'appliedForceProperty' ),
        frictionForce: tandem.createTandem( 'frictionForceProperty' ),
        friction: tandem.createTandem( 'frictionProperty' ),
        position: tandem.createTandem( 'positionProperty' ),
        speed: tandem.createTandem( 'speedProperty' ),
        velocity: tandem.createTandem( 'velocityProperty' ),
        acceleration: tandem.createTandem( 'accelerationProperty' ),
        pusherPosition: tandem.createTandem( 'pusherPositionProperty' ),
        showForce: tandem.createTandem( 'showForceProperty' ),
        showValues: tandem.createTandem( 'showValuesProperty' ),
        showSpeed: tandem.createTandem( 'showSpeedProperty' ),
        showMasses: tandem.createTandem( 'showMassesProperty' ),
        showAcceleration: tandem.createTandem( 'showAccelerationProperty' ),
        speedClassification: tandem.createTandem( 'speedClassificationProperty' ),
        previousSpeedClassification: tandem.createTandem( 'previousSpeedClassificationProperty' ),
        movingRight: tandem.createTandem( 'movingRightProperty' ),
        direction: tandem.createTandem( 'directionProperty' ),
        fallen: tandem.createTandem( 'fallenProperty' ),
        fallenDirection: tandem.createTandem( 'fallenDirectionProperty' ),
        stackSize: tandem.createTandem( 'stackSizeProperty' )

        // TODO: Should we add these tandems? They spam the data stream.
        // time: tandem.createTandem( 'timeProperty' ),
        // timeSinceFallen: tandem.createTandem( 'timeSinceFallenProperty' ),
      },
      phetioValueTypeSet: {
        showSumOfForces: TBoolean,
        sumOfForces: TNumber( { units: 'newtons' } ),
        play: TBoolean,
        appliedForce: TNumber( { units: 'newtons', range: new Range( -500, 500 ) } ),
        frictionForce: TNumber( { units: 'newtons' } ),
        friction: TNumber(),
        position: TNumber( { units: 'meters' } ),
        speed: TNumber( { units: 'meters/second' } ),
        velocity: TNumber( { units: 'meters/second' } ),
        acceleration: TNumber( { units: 'meters/second/second' } ),
        pusherPosition: TNumber( { units: 'meters' } ),
        showForce: TBoolean,
        showValues: TBoolean,
        showSpeed: TBoolean,
        showMasses: TBoolean,
        showAcceleration: TBoolean,
        speedClassification: TString,
        previousSpeedClassification: TString,
        movingRight: TBoolean,
        direction: TString,
        timeSinceFallen: TNumber( { units: 'seconds' } ),
        fallen: TBoolean,
        fallenDirection: TString,
        time: TNumber( { units: 'seconds' } ),
        stackSize: TNumber()
      }
    } );

    //Zero out the applied force when the last object is removed.  Necessary to remove the force applied with the slider tweaker buttons.  See #37
    this.stack.lengthProperty.link( function( length ) { if ( length === 0 ) { self.appliedForce = 0; } } );

    this.stack.lengthProperty.linkAttribute( this, 'stackSize' );

    // track the previous model position when model position changes
    // animation for the pusher and background nodes is based off of
    // the change in model position (this.position - this.previousModelPosition )
    this.previousModelPosition = this.positionProperty.value;

    // create the items - Initial locations determined empirically
    var bucket = new Item( this, 'bucket', tandem.createTandem( 'bucket' ), waterBucketImage, 100, 840, 547 + -45, 0.78, 1.0, 8 );
    bucket.bucket = true;
    var fridge = new Item( this, 'fridge', tandem.createTandem( 'fridge' ), fridgeImage, 200, 23, 437, 0.8, 1.1, 4 );
    var crate1 = new Item( this, 'crate1', tandem.createTandem( 'crate1' ), crateImage, 50, 129, 507, 0.5 );
    var crate2 = new Item( this, 'crate2', tandem.createTandem( 'crate2' ), crateImage, 50, 219, 507, 0.5 );
    var girl = new Item( this, 'girl', tandem.createTandem( 'girl' ), girlStandingImage, 40, 689, 465, 0.6, 1.0, 4.2, girlSittingImage, girlHoldingImage[ 1 ].img );
    var man = new Item( this, 'man', tandem.createTandem( 'man' ), manStandingImage, 80, 750, 428, 0.6, 0.92, 5, manSittingImage, manHoldingImage );
    this.items = this.accelerometer ?
      [ fridge, crate1, crate2, girl, man, bucket ] :
      [ fridge, crate1, crate2, girl, man,
        new Item( this, 'trash', tandem.createTandem( 'trash' ), trashCanImage, 100, 816, 492, 0.7, 1.0, 5 ),
        new Item( this, 'mystery', tandem.createTandem( 'mystery' ), mysteryObjectImage, 50, 888, 511, 0.3, 1.0, undefined, undefined, undefined, true )
      ];

    this.appliedForceProperty.link( function( appliedForce ) {
      self.direction = appliedForce > 0 ? 'right' :
                              appliedForce < 0 ? 'left' :
                              'none';

      // if the applied force changes and the pusher is fallen, stand up to push immediately
      if ( self.fallen && appliedForce !== 0 ) {
        self.fallen = !self.fallen;
      }
    } );

    //Applied force should drop to zero if max speed reached
    this.speedClassificationProperty.link( function( speedClassification ) {
      if ( speedClassification !== 'WITHIN_ALLOWED_RANGE' ) {
        self.appliedForce = 0;
      }
    } );

    // when we fall down, we want the applied force to immediately be zero
    // see https://github.com/phetsims/forces-and-motion-basics/issues/180
    this.fallenProperty.link( function( fallen ) {
      if ( fallen ) {
        self.appliedForceProperty.set( 0 );
      }
    } );

    // update the previous model position for computations based on the delta
    // linked lazily so that oldPosition is always defined
    this.positionProperty.lazyLink( function( position, oldPosition ) {
      self.previousModelPosition = oldPosition;
    } );

  }

  forcesAndMotionBasics.register( 'MotionModel', MotionModel );

  return inherit( PropertySet, MotionModel, {

    /**
     * Get an array representing the items that are being dragged.
     *
     * @return {Array<Item>}
     */
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

    /**
     * Upper items should fall if an item removed from beneath
     * Uses the view to get item dimensions.
     *
     * @param {number} index - index of item in the stack array
     */
    spliceStack: function( index ) {
      var item = this.stack.get( index );
      this.stack.remove( item );
      if ( this.stack.length > 0 ) {
        var sumHeight = 0;
        for ( var i = 0; i < this.stack.length; i++ ) {
          var size = this.view.getSize( this.stack.get( i ) );
          sumHeight += size.height;
          this.stack.get( i ).animateTo( this.view.layoutBounds.width / 2 - size.width / 2 + this.stack.get( i ).centeringOffset, (this.skateboard ? 334 : 360) - sumHeight, 'stack' );//TODO: factor out this code for layout, which is duplicated in MotionTab.topOfStack
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

    /**
     * Determine whether a value is positive, negative, or zero for the physics computations.
     *
     * @param  {number} value
     * @return {number}
     */
    getSign: function( value ) {
      return value > 0 ? 1 : value < 0 ? -1 : 0;
    },

    /**
     * Returns the friction force on an object given the applied force.  The friction and applied
     * forces are rounded so that they have the same precision. If one force is more precise,
     * a system with seemingly equal forces can lose energy.
     * See https://github.com/phetsims/forces-and-motion-basics/issues/197
     *
     * @param  {number} appliedForce
     * @return {number}
     */
    getFrictionForce: function( appliedForce ) {

      var frictionForce;

      // Why does g=10.0?  See https://github.com/phetsims/forces-and-motion-basics/issues/132
      // We decide to keep it as it is, even though 9.8 may be more realistic.
      var g = 10.0;

      var mass = this.getStackMass();

      var frictionForceMagnitude = Math.abs( this.friction * mass * g );

      //Friction force only applies above this velocity
      var velocityThreshold = 1E-12;

      //Object is motionless, friction should oppose the applied force
      if ( Math.abs( this.velocity ) <= velocityThreshold ) {

        //the friction is higher than the applied force, so don't allow the friction force to be higher than the applied force
        frictionForce = frictionForceMagnitude >= Math.abs( appliedForce ) ? -appliedForce :

          //Oppose the applied force
               -this.getSign( this.appliedForce ) * frictionForceMagnitude;
      }

      //Object is moving, so friction should oppose the velocity
      else {
        frictionForce = -this.getSign( this.velocity ) * frictionForceMagnitude * 0.75;
      }

      // round the friction force so that one force is not more precise than another
      return Util.roundSymmetric( frictionForce );
    },

    //Compute the mass of the entire stack, for purposes of momentum computation
    getStackMass: function() {
      var mass = 0;
      for ( var i = 0; i < this.stack.length; i++ ) {
        mass += this.stack.get( i ).mass;
      }
      return mass;
    },

    /**
     * Determine whether a value is positive, negative or zero to determine wheter the object changed directions.
     * @param  {number} value
     * @return {number}
     */
    sign: function( value ) {
      return value < 0 ? 'negative' :
             value > 0 ? 'positive' :
             'zero';
    },

    /**
     * Determine whether a velocity value changed direction.
     * @param  {number} a - initial value
     * @param  {number} b - second value
     * @return {boolean}
     */
    changedDirection: function( a, b ) {
      return this.sign( a ) === 'negative' && this.sign( b ) === 'positive' ||
             this.sign( b ) === 'negative' && this.sign( a ) === 'positive';
    },

    // get the pusher position relative to the center and layout bounds of the view
    getRelativePusherPosition: function() {
      return this.view.layoutBounds.width / 2 + ( this.pusherPosition - this.position ) * MotionConstants.POSITION_SCALE;
    },

    /**
     * Step function for this model, function of the time step.  Called by step and manualStep functions below.
     *
     * @param {number} dt - time step
     */
    stepModel: function( dt ) {

      // update the tracked time which is used by the WaterBucketNode and the Accelerometer
      this.time = this.time + dt;

      // update the acceleration values
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

        // if the pusher is very far off screen, stand up immediately
        // based on width of the background image, determined by visual inspection
        var relativePosition = this.getRelativePusherPosition();
        if ( relativePosition > 1600 || relativePosition < -600 ) {
          this.fallen = false;
        }
        this.timeSinceFallen = this.timeSinceFallen + dt;

        //Stand up after 2 seconds
        if ( this.timeSinceFallen > 2 ) {
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

      //Don't show the pusher as fallen while applying a force, see https://github.com/phetsims/forces-and-motion-basics/issues/66
      if ( this.appliedForce !== 0 && this.speedClassification === 'WITHIN_ALLOWED_RANGE' ) {
        this.fallen = false;
      }

    },

    /**
     * Update the physics.
     *
     * @param {number} dt
     */
    step: function( dt ) {

      // Computes the new forces and sets them to the corresponding properties
      // The first part of stepInTime is to compute and set the forces.  This is factored out because the forces must
      // also be updated when the user changes the friction force or mass while the sim is paused.
      this.frictionForce = this.getFrictionForce( this.appliedForce );
      this.sumOfForces = this.frictionForce + this.appliedForce;

      if ( this.play ) {
        this.stepModel( dt );
      }

      // update the pusher position every time step, even if the sim is paused
      if ( this.appliedForce !== 0 ) {
        this.pusherPosition = this.position + 2 * (this.appliedForce > 0 ? -1 : 1);
      }

      // step all model items so that they are interactive while paused
      for ( var i = 0; i < this.items.length; i++ ) {
        this.items[ i ].step( dt );
      }

      // notify that the sim has stepped to calculate forces.  This needs to update even when the sim is paused.
      this.trigger0( 'stepped' );
    },

    /**
     * Manually step the model by a small time step.  This function is used by the 'step' button under
     * the control panel.  Assumes 60 frames per second.
     */
    manualStep: function() {
      this.stepModel( 1 / 60 );
    },

    /**
     * Determine whether an item is in the stack.
     * @param  {Item} item
     * @return {boolean}
     */
    isInStack: function( item ) { return this.stack.contains( item ); },

    /**
     * Determine whether an item is stacked above another item, so that the arms can be raised for humans.
     *
     * @param  {Item}
     * @return {boolean}
     */
    isItemStackedAbove: function( item ) { return this.isInStack( item ) && this.stack.indexOf( item ) < this.stack.length - 1;},

    //Reset the model
    reset: function() {
      PropertySet.prototype.reset.call( this );
      for ( var i = 0; i < this.items.length; i++ ) {
        // if the item is being dragged we need to cancel the drag in ItemNode
        if ( !this.items[ i ].dragging ) {
          this.items[ i ].reset();
        }
      }

      // notify that a reset was triggered
      this.trigger0( 'reset-all' );

      this.stack.clear();

      //Move the initial crate to the play area, since it resets to the toolbox, not its initial location.
      this.viewInitialized( this.view );

    },

    /**
     * After the view is constructed, move one of the blocks to the top of the stack.
     * It would be better if more of this could be done in the model constructor, but it would be difficult with the way things are currently set up.
     * @param {ScreenView} view
     */
    viewInitialized: function( view ) {
      var item = this.items[ 1 ];
      // only move item to the top of the stack if it is not being dragged
      if ( !item.dragging ) {
        this.view = view;
        item.onBoard = true;
        var itemNode = view.itemNodes[ 1 ];
        item.animating = { enabled: false, x: 0, y: 0, end: null };
        item.interactionScale = 1.3;
        var scaledWidth = this.view.getSize( item ).width;
        item.position = new Vector2( view.layoutBounds.width / 2 - scaledWidth / 2, view.topOfStack - itemNode.height );
        this.stack.add( item );
      }
    },

    /**
     * Get the state of the simulation, for persistence.
     * @return {{properties: *, stack: Array}}
     */
    getState: function() {
      var self = this;
      return {
        properties: this.getValues(),
        stack: self.stack.getArray().map( function( item ) {return item.get().name;} ).join( ',' )
      };
    }
  } );
} );
