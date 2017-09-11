// Copyright 2013-2015, University of Colorado Boulder

/**
 * Model for the Motion, Friction and Acceleration screens
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var Emitter = require( 'AXON/Emitter' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var Item = require( 'FORCES_AND_MOTION_BASICS/motion/model/Item' );
  var MotionConstants = require( 'FORCES_AND_MOTION_BASICS/motion/MotionConstants' );
  var crateImage = require( 'image!FORCES_AND_MOTION_BASICS/crate.png' );
  var fridgeImage = require( 'image!FORCES_AND_MOTION_BASICS/fridge.png' );
  var mysteryObjectImage = require( 'image!FORCES_AND_MOTION_BASICS/mystery-object-01.png' );
  var waterBucketImage = require( 'image!FORCES_AND_MOTION_BASICS/water-bucket.png' );
  var girlHoldingImage = require( 'mipmap!FORCES_AND_MOTION_BASICS/girl-holding.png,level=1' );
  var girlSittingImage = require( 'mipmap!FORCES_AND_MOTION_BASICS/girl-sitting.png' );
  var girlStandingImage = require( 'mipmap!FORCES_AND_MOTION_BASICS/girl-standing.png' );
  var manHoldingImage = require( 'mipmap!FORCES_AND_MOTION_BASICS/man-holding.png' );
  var manSittingImage = require( 'mipmap!FORCES_AND_MOTION_BASICS/man-sitting.png' );
  var manStandingImage = require( 'mipmap!FORCES_AND_MOTION_BASICS/man-standing.png' );
  var trashCanImage = require( 'mipmap!FORCES_AND_MOTION_BASICS/trash-can.png' );
  var inherit = require( 'PHET_CORE/inherit' );

  // phet-io modules
  var TItem = require( 'FORCES_AND_MOTION_BASICS/motion/model/TItem' );
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );
  var TString = require( 'ifphetio!PHET_IO/types/TString' );

  /**
   * Constructor for the motion model
   *
   * @param {string} screen String that indicates which of the 3 screens this model represents
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
    var frictionValue = screen === 'motion' ? 0 : MotionConstants.MAX_FRICTION / 2;
    this.stack = new ObservableArray( {
      tandem: tandem.createTandem( 'stackObservableArray' ),
      phetioValueType: TItem,

      // Workaround for Observable array's in state objects, see https://github.com/phetsims/forces-and-motion-basics/issues/232
      phetioIncludeInState: true
    } );

    // @public - force applied to the stack of items by the pusher
    this.appliedForceProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'appliedForceProperty' ),
      units: 'newtons',
      range: new Range( -500, 500 )
    } );

    // @public - force applied to the stack of items by friction
    this.frictionForceProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'frictionForceProperty' ),
      units: 'newtons'
    } );

    // @public - friction of the ground
    this.frictionProperty = new NumberProperty( frictionValue, {
      tandem: tandem.createTandem( 'frictionProperty' )
    } );

    // @public - sum of all forces acting on the stack of items
    this.sumOfForcesProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'sumOfForcesProperty' ),
      units: 'newtons'
    } );

    // @public - 1-D position of the stack of items
    this.positionProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'positionProperty' ),
      units: 'meters'
    } );

    // @public - speed of the stack of items, in the x direction
    this.speedProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'speedProperty' ),
      units: 'meters/second'
    } );

    // @public - elocity is a 1-d vector, where the direction (right or left) is indicated by the sign
    this.velocityProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'velocityProperty' ),
      units: 'meters/second'
    } );

    // @public - 1-d acceleration of the stack of items
    this.accelerationProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'accelerationProperty' ),
      units: 'meters/second/second'
    } );

    // @public {number} - initially to the left of the box by this many meters
    this.pusherPositionProperty = new NumberProperty( -16, {
      tandem: tandem.createTandem( 'pusherPositionProperty' ),
      units: 'meters'
    } );

    // @public {boolean} - whether or not forces are visible
    this.showForceProperty = new Property( true, {
      tandem: tandem.createTandem( 'showForceProperty' ),
      phetioValueType: TBoolean
    } );

    // @public {boolean} - whether or not values are visible
    this.showValuesProperty = new Property( false, {
      tandem: tandem.createTandem( 'showValuesProperty' ),
      phetioValueType: TBoolean
    } );

    // @public {boolean} - whether or not sum of forces is visible
    this.showSumOfForcesProperty = new Property( false, {
      tandem: tandem.createTandem( 'showSumOfForcesProperty' ),
      phetioValueType: TBoolean
    } );

    // @public {boolean} - whether or not speedometer is visible
    this.showSpeedProperty = new Property( false, {
      tandem: tandem.createTandem( 'showSpeedProperty' ),
      phetioValueType: TBoolean
    } );

    // @public {boolean} - whether or not mass values are visible
    this.showMassesProperty = new Property( false, {
      tandem: tandem.createTandem( 'showMassesProperty' ),
      phetioValueType: TBoolean
    } );

    // @public {boolean} - whether or not acceleration meter is visible
    this.showAccelerationProperty = new Property( false, {
      tandem: tandem.createTandem( 'showAccelerationProperty' ),
      phetioValueType: TBoolean
    } );

    //  @public Keep track of whether the speed is classified as:
    // 'RIGHT_SPEED_EXCEEDED', 'LEFT_SPEED_EXCEEDED' or 'WITHIN_ALLOWED_RANGE'
    // so that the Applied Force can be stopped if the speed goes out of range.
    this.speedClassificationProperty = new Property( 'WITHIN_ALLOWED_RANGE', {
      tandem: tandem.createTandem( 'speedClassificationProperty' ),
      phetioValueType: TString
    } );

    // @public {string} See speedClassification
    this.previousSpeedClassificationProperty = new Property( 'WITHIN_ALLOWED_RANGE', {
      tandem: tandem.createTandem( 'previousSpeedClassificationProperty' ),
      phetioValueType: TString
    } );

    // @public {boolean} - whether or not the stack of items is moving to the right
    this.movingRightProperty = new Property( true, {
      tandem: tandem.createTandem( 'movingRightProperty' ),
      phetioValueType: TBoolean
    } );

    // @public {string} - 'right'|'left'|none, direction of movement of the stack of items
    this.directionProperty = new Property( 'none', {
      tandem: tandem.createTandem( 'directionProperty' ),
      phetioValueType: TString
    } );

    // @public {number} - time since pusher has fallen over, in seconds
    // TODO: Should we this have a tandem? It spams the data stream.
    // TODO: Why is default value 10?
    this.timeSinceFallenProperty = new NumberProperty( 10, {
      units: 'seconds'
    } );

    // @public {boolean} - whether or not the pusher has fallen over
    this.fallenProperty = new Property( false, {
      tandem: tandem.createTandem( 'fallenProperty' ),
      phetioValueType: TBoolean
    } );

    // @public {string} - 'left'|'right', direction pusher facing when it falls over
    this.fallenDirectionProperty = new Property( 'left', {
      tandem: tandem.createTandem( 'fallenDirectionProperty' ),
      phetioValueType: TString
    } );

    // @public {number} - how long the simulation has been running
    // TODO: Should we this have a tandem? It spams the data stream.
    this.timeProperty = new NumberProperty( 0, {
      units: 'seconds'
    } );

    //stack.length is already a property, but mirror it here to easily multilink with it, see usage in MotionScreenView.js
    //TODO: Perhaps a DerivedProperty would be more suitable instead of duplicating/synchronizing this value
    this.stackSizeProperty = new NumberProperty( 1, {
      tandem: tandem.createTandem( 'stackSizeProperty' )
    } );

    // @public {boolean} - is the sim running or paused?
    this.playProperty = new Property( true, {
      tandem: tandem.createTandem( 'playProperty' ),
      phetioValueType: TBoolean
    } );

    // @public DerivedProperty to observe whether or not the friction is zero
    this.frictionZeroProperty = new DerivedProperty( [ this.frictionProperty ], function( friction ) {
      return friction === 0;
    } );

    // @public DerivedProperty to observe whether or not the friction is zero
    this.frictionNonZeroProperty = new DerivedProperty( [ this.frictionProperty ], function( friction ) {
      return friction !== 0;
    } );

    // @ublic - broadcast messages on step and reset all
    this.resetAllEmitter = new Emitter();
    this.stepEmitter = new Emitter();

    //Zero out the applied force when the last object is removed.  Necessary to remove the force applied with the slider tweaker buttons.  See #37
    this.stack.lengthProperty.link( function( length ) { if ( length === 0 ) { self.appliedForceProperty.set( 0 ); } } );

    // TODO: Should stacksize Property be removed?
    this.stack.lengthProperty.link( function( length ) {
      self.stackSizeProperty.set( length );
    } );

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
      self.directionProperty.set( appliedForce > 0 ? 'right' :
                                  appliedForce < 0 ? 'left' :
                                  'none' );

      // if the applied force changes and the pusher is fallen, stand up to push immediately
      if ( self.fallenProperty.get() && appliedForce !== 0 ) {
        self.fallenProperty.set( !self.fallenProperty.get() );
      }
    } );

    //Applied force should drop to zero if max speed reached
    this.speedClassificationProperty.link( function( speedClassification ) {
      if ( speedClassification !== 'WITHIN_ALLOWED_RANGE' ) {
        self.appliedForceProperty.set( 0 );
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

  return inherit( Object, MotionModel, {

    /**
     * Get an array representing the items that are being dragged.
     *
     * @returns {Array<Item>}
     */
    draggingItems: function() {
      var draggingItems = [];
      for ( var i = 0; i < this.items.length; i++ ) {
        var item = this.items[ i ];
        if ( item.draggingProperty.get() ) {
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
        this.velocityProperty.set( 0 );
        this.accelerationProperty.set( 0 );
      }
      return item;
    },

    //When a 4th item is placed on the stack, move the bottom item home and have the stack fall
    spliceStackBottom: function() {
      var bottom = this.spliceStack( 0 );
      bottom.onBoardProperty.set( false );
      bottom.animateHome();
    },

    /**
     * Determine whether a value is positive, negative, or zero for the physics computations.
     *
     * @param  {number} value
     * @returns {number}
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
     * @returns {number}
     */
    getFrictionForce: function( appliedForce ) {

      var frictionForce;

      // Why does g=10.0?  See https://github.com/phetsims/forces-and-motion-basics/issues/132
      // We decide to keep it as it is, even though 9.8 may be more realistic.
      var g = 10.0;

      var mass = this.getStackMass();

      var frictionForceMagnitude = Math.abs( this.frictionProperty.get() * mass * g );

      //Friction force only applies above this velocity
      var velocityThreshold = 1E-12;

      //Object is motionless, friction should oppose the applied force
      if ( Math.abs( this.velocityProperty.get() ) <= velocityThreshold ) {

        //the friction is higher than the applied force, so don't allow the friction force to be higher than the applied force
        frictionForce = frictionForceMagnitude >= Math.abs( appliedForce ) ? -appliedForce :

          //Oppose the applied force
                        -this.getSign( this.appliedForceProperty.get() ) * frictionForceMagnitude;
      }

      //Object is moving, so friction should oppose the velocity
      else {
        frictionForce = -this.getSign( this.velocityProperty.get() ) * frictionForceMagnitude * 0.75;
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
     * @returns {number}
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
     * @returns {boolean}
     */
    changedDirection: function( a, b ) {
      return this.sign( a ) === 'negative' && this.sign( b ) === 'positive' ||
             this.sign( b ) === 'negative' && this.sign( a ) === 'positive';
    },

    // get the pusher position relative to the center and layout bounds of the view
    getRelativePusherPosition: function() {
      return this.view.layoutBounds.width / 2 + ( this.pusherPositionProperty.get() - this.positionProperty.get() ) * MotionConstants.POSITION_SCALE;
    },

    /**
     * Step function for this model, function of the time step.  Called by step and manualStep functions below.
     *
     * @param {number} dt - time step
     */
    stepModel: function( dt ) {

      // update the tracked time which is used by the WaterBucketNode and the Accelerometer
      this.timeProperty.set( this.timeProperty.get() + dt );

      // update the acceleration values
      var mass = this.getStackMass();
      this.accelerationProperty.set( mass !== 0 ? this.sumOfForcesProperty.get() / mass : 0.0 );

      var newVelocity = this.velocityProperty.get() + this.accelerationProperty.get() * dt;

      //friction force should not be able to make the object move backwards
      //Also make sure velocity goes exactly to zero when the pusher is pushing so that the friction force will be correctly computed
      //Without this logic, it was causing flickering arrows because the velocity was flipping sign and the friction force was flipping direction
      if ( this.changedDirection( newVelocity, this.velocityProperty.get() ) ) {
        newVelocity = 0.0;
      }

      //Cap at strobe speed.  This is necessary so that a reverse applied force will take effect immediately, without these lines of code the pusher will stutter.
      if ( newVelocity > MotionConstants.MAX_SPEED ) { newVelocity = MotionConstants.MAX_SPEED; }
      if ( newVelocity < -MotionConstants.MAX_SPEED ) { newVelocity = -MotionConstants.MAX_SPEED; }

      this.velocityProperty.set( newVelocity );
      this.positionProperty.set( this.positionProperty.get() + this.velocityProperty.get() * dt );

      this.speedProperty.set( Math.abs( this.velocityProperty.get() ) );
      this.speedClassificationProperty.set( this.velocityProperty.get() >= MotionConstants.MAX_SPEED ? 'RIGHT_SPEED_EXCEEDED' :
                                 this.velocityProperty.get() <= -MotionConstants.MAX_SPEED ? 'LEFT_SPEED_EXCEEDED' :
                                 'WITHIN_ALLOWED_RANGE' );

      if ( this.speedClassificationProperty.get() !== 'WITHIN_ALLOWED_RANGE' ) {
        this.timeSinceFallenProperty.set( 0 );
        this.fallenDirectionProperty.set( this.speedClassificationProperty.get() === 'RIGHT_SPEED_EXCEEDED' ? 'right' : 'left' );
        this.fallenProperty.set( true );
      }
      else {

        // if the pusher is very far off screen, stand up immediately
        // based on width of the background image, determined by visual inspection
        var relativePosition = this.getRelativePusherPosition();
        if ( relativePosition > 1600 || relativePosition < -600 ) {
          this.fallenProperty.set( false );
        }
        this.timeSinceFallenProperty.set( this.timeSinceFallenProperty.get() + dt );

        //Stand up after 2 seconds
        if ( this.timeSinceFallenProperty.get() > 2 ) {
          this.fallenProperty.set( false );
        }
      }

      //Stand up if applying a force in the opposite direction that you fell
      if ( this.fallenProperty.get() && this.fallenDirectionProperty.get() === 'left' && this.appliedForceProperty.get() > 0 ) {
        this.fallenProperty.set( false );
      }
      if ( this.fallenProperty.get() && this.fallenDirectionProperty.get() === 'right' && this.appliedForceProperty.get() < 0 ) {
        this.fallenProperty.set( false );
      }

      if ( this.previousSpeedClassificationProperty.get() !== 'WITHIN_ALLOWED_RANGE' ) {
        this.speedClassificationProperty.set( this.previousSpeedClassificationProperty.get() );
      }

      //Don't show the pusher as fallen while applying a force, see https://github.com/phetsims/forces-and-motion-basics/issues/66
      if ( this.appliedForceProperty.get() !== 0 && this.speedClassificationProperty.get() === 'WITHIN_ALLOWED_RANGE' ) {
        this.fallenProperty.set( false );
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
      this.frictionForceProperty.set( this.getFrictionForce( this.appliedForceProperty.get() ) );
      this.sumOfForcesProperty.set( this.frictionForceProperty.get() + this.appliedForceProperty.get() );

      if ( this.playProperty.get() ) {
        this.stepModel( dt );
      }

      // update the pusher position every time step, even if the sim is paused
      if ( this.appliedForceProperty.get() !== 0 ) {
        this.pusherPositionProperty.set( this.positionProperty.get() + 2 * ( this.appliedForceProperty.get() > 0 ? -1 : 1 ) );
      }

      // step all model items so that they are interactive while paused
      for ( var i = 0; i < this.items.length; i++ ) {
        this.items[ i ].step( dt );
      }

      // notify that the sim has stepped to calculate forces.  This needs to update even when the sim is paused.
      this.stepEmitter.emit();
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
     * @returns {boolean}
     */
    isInStack: function( item ) { return this.stack.contains( item ); },

    /**
     * Determine whether an item is stacked above another item, so that the arms can be raised for humans.
     *
     * @param  {Item}
     * @returns {boolean}
     */
    isItemStackedAbove: function( item ) { return this.isInStack( item ) && this.stack.indexOf( item ) < this.stack.length - 1;},

    //Reset the model
    reset: function() {

      // reset all Properties of this model.
      this.appliedForceProperty.reset();
      this.frictionForceProperty.reset();
      this.frictionProperty.reset();
      this.sumOfForcesProperty.reset();
      this.positionProperty.reset();
      this.speedProperty.reset();
      this.velocityProperty.reset();
      this.accelerationProperty.reset();
      this.pusherPositionProperty.reset();
      this.showForceProperty.reset();
      this.showValuesProperty.reset();
      this.showSumOfForcesProperty.reset();
      this.showSpeedProperty.reset();
      this.showMassesProperty.reset();
      this.showAccelerationProperty.reset();
      this.speedClassificationProperty.reset();
      this.previousSpeedClassificationProperty.reset();
      this.movingRightProperty.reset();
      this.directionProperty.reset();
      this.timeSinceFallenProperty.reset();
      this.fallenProperty.reset();
      this.fallenDirectionProperty.reset();
      this.timeProperty.reset();
      this.stackSizeProperty.reset();
      this.playProperty.reset();

      for ( var i = 0; i < this.items.length; i++ ) {
        // if the item is being dragged we need to cancel the drag in ItemNode
        if ( !this.items[ i ].draggingProperty.get() ) {
          this.items[ i ].reset();
        }
      }

      // also reset the previous model position, used by the pusher to track translations
      this.previousModelPosition = this.positionProperty.initialValue;

      // notify that a reset was triggered
      this.resetAllEmitter.emit();

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
      if ( !item.draggingProperty.get() ) {
        this.view = view;
        item.onBoardProperty.set( true );
        var itemNode = view.itemNodes[ 1 ];
        item.animationStateProperty.set( { enabled: false, x: 0, y: 0, end: null } );
        item.interactionScaleProperty.set( 1.3 );
        var scaledWidth = this.view.getSize( item ).width;
        item.positionProperty.set( new Vector2( view.layoutBounds.width / 2 - scaledWidth / 2, view.topOfStack - itemNode.height ) );
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
