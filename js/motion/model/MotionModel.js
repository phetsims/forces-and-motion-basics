// Copyright 2013-2024, University of Colorado Boulder

/**
 * Model for the Motion, Friction and Acceleration screens
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import createObservableArray from '../../../../axon/js/createObservableArray.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import ReferenceIO from '../../../../tandem/js/types/ReferenceIO.js';
import crate_png from '../../../images/crate_png.js';
import fridge_png from '../../../images/fridge_png.js';
import mysteryObject01_png from '../../../images/mysteryObject01_png.js';
import waterBucket_png from '../../../images/waterBucket_png.js';
import trashCan_png from '../../../mipmaps/trashCan_png.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import MotionConstants from '../MotionConstants.js';
import HumanTypeEnum from './HumanTypeEnum.js';
import Item from './Item.js';

class MotionModel {

  /**
   * Constructor for the motion model
   *
   * @param {string} screen String that indicates which of the 3 screens this model represents
   * @param {Tandem} tandem
   */
  constructor( screen, tandem ) {

    //Motion models must be constructed with a screen, which indicates 'motion'|'friction'|'acceleration'
    assert && assert( screen );

    //Constants
    this.screen = screen;
    this.skateboard = screen === 'motion';
    this.accelerometer = screen === 'acceleration';
    const frictionValue = screen === 'motion' ? 0 : MotionConstants.MAX_FRICTION / 2;
    this.stackObservableArray = createObservableArray( {
      tandem: tandem.createTandem( 'stackObservableArray' ),
      phetioType: createObservableArray.ObservableArrayIO( ReferenceIO( IOType.ObjectIO ) )
    } );

    // @public - force applied to the stack of items by the pusher
    this.appliedForceProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'appliedForceProperty' ),
      units: 'N',
      range: new Range( -500, 500 )
    } );

    // @public - force applied to the stack of items by friction
    this.frictionForceProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'frictionForceProperty' ),
      units: 'N'
    } );

    // @public - friction of the ground
    this.frictionProperty = new NumberProperty( frictionValue, {
      tandem: tandem.createTandem( 'frictionProperty' )
    } );

    // @public - sum of all forces acting on the stack of items
    this.sumOfForcesProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'sumOfForcesProperty' ),
      units: 'N'
    } );

    // @public - 1-D position of the stack of items
    this.positionProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'positionProperty' ),
      units: 'm'
    } );

    // @public - speed of the stack of items, in the x direction
    this.speedProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'speedProperty' ),
      units: 'm/s'
    } );

    // @public - elocity is a 1-d vector, where the direction (right or left) is indicated by the sign
    this.velocityProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'velocityProperty' ),
      units: 'm/s'
    } );

    // @public - 1-d acceleration of the stack of items
    this.accelerationProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'accelerationProperty' ),
      units: 'm/s/s'
    } );

    // @public {number} - initially to the left of the box by this many meters
    this.pusherPositionProperty = new NumberProperty( -16, {
      tandem: tandem.createTandem( 'pusherPositionProperty' ),
      units: 'm'
    } );

    // @public {boolean} - whether or not forces are visible
    this.showForceProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'showForceProperty' )
    } );

    // @public {boolean} - whether or not values are visible
    this.showValuesProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'showValuesProperty' )
    } );

    // @public {boolean} - whether or not sum of forces is visible
    this.showSumOfForcesProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'showSumOfForcesProperty' )
    } );

    // @public {boolean} - whether or not speedometer is visible
    this.showSpeedProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'showSpeedProperty' )
    } );

    // @public {boolean} - whether or not mass values are visible
    this.showMassesProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'showMassesProperty' )
    } );

    // @public {boolean} - whether or not acceleration meter is visible
    this.showAccelerationProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'showAccelerationProperty' )
    } );

    //  @public Keep track of whether the speed is classified as:
    // 'RIGHT_SPEED_EXCEEDED', 'LEFT_SPEED_EXCEEDED' or 'WITHIN_ALLOWED_RANGE'
    // so that the Applied Force can be stopped if the speed goes out of range.
    // TODO: Why not an enum? https://github.com/phetsims/tasks/issues/1129
    this.speedClassificationProperty = new StringProperty( 'WITHIN_ALLOWED_RANGE', {
      tandem: tandem.createTandem( 'speedClassificationProperty' )
    } );

    // @public {string} See speedClassification
    // TODO: Why not an enum? https://github.com/phetsims/tasks/issues/1129
    this.previousSpeedClassificationProperty = new StringProperty( 'WITHIN_ALLOWED_RANGE', {
      tandem: tandem.createTandem( 'previousSpeedClassificationProperty' )
    } );

    // @public {boolean} - whether or not the stack of items is moving to the right
    this.movingRightProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'movingRightProperty' )
    } );

    // @public {string} - 'right'|'left'|none, direction of movement of the stack of items
    // TODO: Why not an enum? https://github.com/phetsims/tasks/issues/1129
    this.directionProperty = new StringProperty( 'none', {
      tandem: tandem.createTandem( 'directionProperty' )
    } );

    // @public {number} - time since pusher has fallen over, in seconds
    // TODO: Should we this have a tandem? It spams the data stream. https://github.com/phetsims/tasks/issues/1129
    // TODO: Why is default value 10? https://github.com/phetsims/tasks/issues/1129
    this.timeSinceFallenProperty = new NumberProperty( 10, {
      units: 's'
    } );

    // @public {boolean} - whether or not the pusher has fallen over
    this.fallenProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'fallenProperty' )
    } );

    // @public {string} - 'left'|'right', direction pusher facing when it falls over
    this.fallenDirectionProperty = new StringProperty( 'left', {
      tandem: tandem.createTandem( 'fallenDirectionProperty' )
    } );

    // @public {number} - how long the simulation has been running
    // TODO: Should we this have a tandem? It spams the data stream. https://github.com/phetsims/tasks/issues/1129
    this.timeProperty = new NumberProperty( 0, {
      units: 's'
    } );

    //stack.length is already a property, but mirror it here to easily multilink with it, see usage in MotionScreenView.js
    //TODO: Perhaps a DerivedProperty would be more suitable instead of duplicating/synchronizing this value https://github.com/phetsims/tasks/issues/1129
    this.stackSizeProperty = new NumberProperty( 1, {
      tandem: tandem.createTandem( 'stackSizeProperty' )
    } );

    // @public {boolean} - is the sim running or paused?
    this.playProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'playProperty' )
    } );

    // @public DerivedProperty to observe whether or not the friction is zero
    this.frictionZeroProperty = new DerivedProperty( [ this.frictionProperty ], friction => friction === 0 );

    // @public DerivedProperty to observe whether or not the friction is zero
    this.frictionNonZeroProperty = new DerivedProperty( [ this.frictionProperty ], friction => friction !== 0 );

    // @public - broadcast messages on step and reset all
    this.resetAllEmitter = new Emitter();
    this.stepEmitter = new Emitter();

    //Zero out the applied force when the last object is removed.  Necessary to remove the force applied with the slider tweaker buttons.  See #37
    this.stackObservableArray.lengthProperty.link( length => { if ( length === 0 ) { this.appliedForceProperty.set( 0 ); } } );

    // TODO: Should stacksize Property be removed? https://github.com/phetsims/tasks/issues/1129
    this.stackObservableArray.lengthProperty.link( length => {
      this.stackSizeProperty.set( length );
    } );

    // track the previous model position when model position changes
    // animation for the pusher and background nodes is based off of
    // the change in model position (this.position - this.previousModelPosition )
    this.previousModelPosition = this.positionProperty.value;

    const leftmostItemXLeft = 23; // x-position of the refrigerator
    const crate1Spacing = 106; // distance between the refrigerator and the middle crate
    const crate2Spacing = 90; // distance between the crates

    const leftmostItemXRight = this.accelerometer ? 678 : 689; // x-position of the girl
    const manSpacing = this.accelerometer ? 47 : 61; // distance between the girl and the man
    const trashSpacing = this.accelerometer ? 53 : 66; // distance between the man and the trash can
    const mysterySpacing = this.accelerometer ? 51 : 72; // distance between the trash can and the mystery box
    const bucketSpacing = 63; // distance between the mystery box and the water bucket

    // create the items - Initial positions determined empirically
    const fridge = new Item( this, 'fridge', tandem.createTandem( 'fridge' ), fridge_png, 200, leftmostItemXLeft, 437, 0.8, 1.1, 4 );
    const crate1 = new Item( this, 'crate1', tandem.createTandem( 'crate1' ), crate_png, 50, leftmostItemXLeft + crate1Spacing, 507, 0.5 );
    const crate2 = new Item( this, 'crate2', tandem.createTandem( 'crate2' ), crate_png, 50, leftmostItemXLeft + crate1Spacing + crate2Spacing, 507, 0.5 );
    const girl = new Item( this, HumanTypeEnum.GIRL, tandem.createTandem( 'girl' ), undefined, 40, leftmostItemXRight, 465, 0.6, 1.0, 4.2 );
    const man = new Item( this, HumanTypeEnum.MAN, tandem.createTandem( 'man' ), undefined, 80, leftmostItemXRight + manSpacing, 428, 0.6, 0.92, 5 );
    const trashCan = new Item( this, 'trash', tandem.createTandem( 'trash' ), trashCan_png, 100, leftmostItemXRight + manSpacing + trashSpacing, 496, 0.7, 1.0, 5 );
    const mysteryBox = new Item( this, 'mystery', tandem.createTandem( 'mystery' ), mysteryObject01_png, 50, leftmostItemXRight + manSpacing + trashSpacing + mysterySpacing, 513, 0.3, 1.0, undefined, undefined, undefined, true );
    const bucket = new Item( this, 'bucket', tandem.createTandem( 'bucket' ), waterBucket_png, 100, leftmostItemXRight + manSpacing + trashSpacing + mysterySpacing + bucketSpacing, 547 + -35, 0.68, 1.0, 8 );
    bucket.bucket = true;

    const itemsToAdd = this.accelerometer ? [ bucket ] : [];
    this.items = [ fridge, crate1, crate2, girl, man, trashCan, mysteryBox, ...itemsToAdd ];

    this.appliedForceProperty.link( appliedForce => {
      this.directionProperty.set( appliedForce > 0 ? 'right' :
                                  appliedForce < 0 ? 'left' :
                                  'none' );

      // if the applied force changes and the pusher is fallen, stand up to push immediately
      if ( this.fallenProperty.get() && appliedForce !== 0 ) {
        this.fallenProperty.set( !this.fallenProperty.get() );
      }
    } );

    //Applied force should drop to zero if max speed reached
    this.speedClassificationProperty.link( speedClassification => {
      if ( speedClassification !== 'WITHIN_ALLOWED_RANGE' ) {
        this.appliedForceProperty.set( 0 );
      }
    } );

    // when we fall down, we want the applied force to immediately be zero
    // see https://github.com/phetsims/forces-and-motion-basics/issues/180
    this.fallenProperty.link( fallen => {
      if ( fallen ) {
        this.appliedForceProperty.set( 0 );
      }
    } );

    // update the previous model position for computations based on the delta
    // linked lazily so that oldPosition is always defined
    this.positionProperty.lazyLink( ( position, oldPosition ) => {
      this.previousModelPosition = oldPosition;
    } );

  }


  /**
   * Get an array representing the items that are being dragged.
   *
   * @returns {Array.<Item>}
   * @public
   */
  draggingItems() {
    const draggingItems = [];
    for ( let i = 0; i < this.items.length; i++ ) {
      const item = this.items[ i ];
      if ( item.draggingProperty.get() ) {
        draggingItems.push( item );
      }
    }
    return draggingItems;
  }

  /**
   * Upper items should fall if an item removed from beneath
   * Uses the view to get item dimensions.
   *
   * @param {number} index - index of item in the stack array
   * @public
   */
  spliceStack( index ) {
    const item = this.stackObservableArray.get( index );
    this.stackObservableArray.remove( item );
    if ( this.stackObservableArray.length > 0 ) {
      let sumHeight = 0;
      for ( let i = 0; i < this.stackObservableArray.length; i++ ) {
        const size = this.view.getSize( this.stackObservableArray.get( i ) );
        sumHeight += size.height;
        this.stackObservableArray.get( i ).animateTo( this.view.layoutBounds.width / 2 - size.width / 2, ( this.skateboard ? 334 : 360 ) - sumHeight, 'stack' );//TODO: factor out this code for layout, which is duplicated in MotionTab.topOfStack https://github.com/phetsims/tasks/issues/1129
      }
    }

    //If the stack is emptied, stop the motion
    if ( this.stackObservableArray.length === 0 ) {
      this.velocityProperty.set( 0 );
      this.accelerationProperty.set( 0 );
    }
    return item;
  }

  // @public - When a 4th item is placed on the stack, move the bottom item home and have the stack fall
  spliceStackBottom() {
    const bottom = this.spliceStack( 0 );
    bottom.onBoardProperty.set( false );
    bottom.animateHome();
  }

  /**
   * Determine whether a value is positive, negative, or zero for the physics computations.
   *
   * @param  {number} value
   * @returns {number}
   * @public
   */
  getSign( value ) {
    return value > 0 ? 1 : value < 0 ? -1 : 0;
  }

  /**
   * Returns the friction force on an object given the applied force.  The friction and applied
   * forces are rounded so that they have the same precision. If one force is more precise,
   * a system with seemingly equal forces can lose energy.
   * See https://github.com/phetsims/forces-and-motion-basics/issues/197
   *
   * @param  {number} appliedForce
   * @returns {number}
   * @public
   */
  getFrictionForce( appliedForce ) {

    let frictionForce;

    // Why does g=10.0?  See https://github.com/phetsims/forces-and-motion-basics/issues/132
    // We decide to keep it as it is, even though 9.8 may be more realistic.
    const g = 10.0;

    const mass = this.getStackMass();

    const frictionForceMagnitude = Math.abs( this.frictionProperty.get() * mass * g );

    //Friction force only applies above this velocity
    const velocityThreshold = 1E-12;

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
    return Utils.roundSymmetric( frictionForce );
  }

  // @public - Compute the mass of the entire stack, for purposes of momentum computation
  getStackMass() {
    let mass = 0;
    for ( let i = 0; i < this.stackObservableArray.length; i++ ) {
      mass += this.stackObservableArray.get( i ).mass;
    }
    return mass;
  }

  /**
   * Determine whether a value is positive, negative or zero to determine wheter the object changed directions.
   * @param  {number} value
   * @returns {number}
   * @public
   */
  sign( value ) {
    return value < 0 ? 'negative' :
           value > 0 ? 'positive' :
           'zero';
  }

  /**
   * Determine whether a velocity value changed direction.
   * @param  {number} a - initial value
   * @param  {number} b - second value
   * @returns {boolean}
   * @public
   */
  changedDirection( a, b ) {
    return this.sign( a ) === 'negative' && this.sign( b ) === 'positive' ||
           this.sign( b ) === 'negative' && this.sign( a ) === 'positive';
  }

  // @public - get the pusher position relative to the center and layout bounds of the view
  getRelativePusherPosition() {
    return this.view.layoutBounds.width / 2 + ( this.pusherPositionProperty.get() - this.positionProperty.get() ) * MotionConstants.POSITION_SCALE;
  }

  /**
   * Step function for this model, function of the time step.  Called by step and manualStep functions below.
   *
   * @param {number} dt - time step
   * @public
   */
  stepModel( dt ) {

    // update the tracked time which is used by the WaterBucketNode and the Accelerometer
    this.timeProperty.set( this.timeProperty.get() + dt );

    // update the acceleration values
    const mass = this.getStackMass();
    this.accelerationProperty.set( mass !== 0 ? this.sumOfForcesProperty.get() / mass : 0.0 );

    let newVelocity = this.velocityProperty.get() + this.accelerationProperty.get() * dt;

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
      const relativePosition = this.getRelativePusherPosition();
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

  }

  /**
   * Update the physics.
   *
   * @param {number} dt
   * @public
   */
  step( dt ) {

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
    for ( let i = 0; i < this.items.length; i++ ) {
      this.items[ i ].step( dt );
    }

    // notify that the sim has stepped to calculate forces.  This needs to update even when the sim is paused.
    this.stepEmitter.emit();
  }

  /**
   * Manually step the model by a small time step.  This function is used by the 'step' button under
   * the control panel.  Assumes 60 frames per second.
   * @public
   */
  manualStep() {
    this.stepModel( 1 / 60 );
  }

  /**
   * Determine whether an item is in the stack.
   * @param  {Item} item
   * @returns {boolean}
   * @public
   */
  isInStack( item ) { return this.stackObservableArray.includes( item ); }

  /**
   * Determine whether an item is stacked above another item, so that the arms can be raised for humans.
   *
   * @param  {Item}
   * @returns {boolean}
   * @public
   */
  isItemStackedAbove( item ) { return this.isInStack( item ) && this.stackObservableArray.indexOf( item ) < this.stackObservableArray.length - 1;}

  // @public - Reset the model
  reset() {

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

    for ( let i = 0; i < this.items.length; i++ ) {
      // if the item is being dragged we need to cancel the drag in ItemNode
      if ( !this.items[ i ].draggingProperty.get() ) {
        this.items[ i ].reset();
      }
    }

    // also reset the previous model position, used by the pusher to track translations
    this.previousModelPosition = this.positionProperty.initialValue;

    // notify that a reset was triggered
    this.resetAllEmitter.emit();

    this.stackObservableArray.clear();

    //Move the initial crate to the play area, since it resets to the toolbox, not its initial position.
    this.viewInitialized( this.view );

  }

  /**
   * After the view is constructed, move one of the blocks to the top of the stack.
   * It would be better if more of this could be done in the model constructor, but it would be difficult with the way things are currently set up.
   * @param {ScreenView} view
   * @public
   */
  viewInitialized( view ) {
    const item = this.items[ 1 ];
    // only move item to the top of the stack if it is not being dragged
    if ( !item.draggingProperty.get() ) {
      this.view = view;
      item.onBoardProperty.set( true );
      const itemNode = view.itemNodes[ 1 ];
      item.animationStateProperty.set( { enabled: false, x: 0, y: 0, end: null } );
      item.interactionScaleProperty.set( 1.3 );
      const scaledWidth = this.view.getSize( item ).width;
      item.positionProperty.set( new Vector2( view.layoutBounds.width / 2 - scaledWidth / 2, view.topOfStack - itemNode.height ) );
      this.stackObservableArray.add( item );
    }
  }

  /**
   * Get the state of the simulation, for persistence.
   * @returns {{properties: *, stack: Array}}
   * @public
   */
  getState() {
    return {
      properties: this.getValues(),
      stack: this.stackObservableArray.getArray().map( item => item.get().name ).join( ',' )
    };
  }
}

forcesAndMotionBasics.register( 'MotionModel', MotionModel );

export default MotionModel;
