// Copyright 2013-2025, University of Colorado Boulder

/**
 * Model for the Motion, Friction and Acceleration screens
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import createObservableArray, { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Stopwatch from '../../../../scenery-phet/js/Stopwatch.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import ReferenceIO from '../../../../tandem/js/types/ReferenceIO.js';
import crate_svg from '../../../images/crate_svg.js';
import fridge_svg from '../../../images/fridge_svg.js';
import mysteryObject01_svg from '../../../images/mysteryObject01_svg.js';
import trashCan_svg from '../../../images/trashCan_svg.js';
import waterBucket_svg from '../../../images/waterBucket_svg.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import Cart from '../../netforce/model/Cart.js';
import MotionConstants from '../MotionConstants.js';
// eslint-disable-next-line phet/no-view-imported-from-model
import MotionScreenView from '../view/MotionScreenView.js';
import HumanTypeEnum from './HumanTypeEnum.js';
import Item from './Item.js';

export default class MotionModel {

  public skateboard: boolean;
  public accelerometer: boolean;

  // force applied to the stack of items by the pusher
  public readonly appliedForceProperty: NumberProperty;

  // force applied to the stack of items by friction
  public readonly frictionForceProperty: NumberProperty;

  // friction of the ground
  public readonly frictionProperty: NumberProperty;

  // sum of all forces acting on the stack of items
  private readonly sumOfForcesProperty: NumberProperty;

  // 1-D position of the stack of items
  public readonly positionProperty: NumberProperty;

  // speed of the stack of items, in the x direction
  public readonly speedProperty: NumberProperty;

  // velocity is a 1-d vector, where the direction (right or left) is indicated by the sign
  public readonly velocityProperty: NumberProperty;

  // 1-d acceleration of the stack of items
  public readonly accelerationProperty: NumberProperty;

  // initially to the left of the box by this many meters
  public readonly pusherPositionProperty: NumberProperty;

  // When there are zero items in the stack, the pusher should not be interactive.
  public readonly pusherInteractionsEnabledProperty: Property<boolean>;

  public readonly stackObservableArray: ObservableArray<Item>;

  // whether forces are visible
  public readonly showForceProperty: BooleanProperty;

  // whether values are visible
  public readonly showValuesProperty: BooleanProperty;

  // whether sum of forces is visible
  public readonly showSumOfForcesProperty: BooleanProperty;

  // whether speedometer is visible
  public readonly showSpeedProperty: BooleanProperty;

  // whether stopwatch is visible
  public readonly showStopwatchProperty: BooleanProperty;

  // whether mass values are visible
  public readonly showMassesProperty: BooleanProperty;

  // whether acceleration meter is visible
  public readonly showAccelerationProperty: BooleanProperty;
  public readonly speedClassificationProperty: StringProperty;
  private readonly previousSpeedClassificationProperty: StringProperty;

  // whether the stack of items is moving to the right
  private readonly movingRightProperty: BooleanProperty;

  // 'right'|'left'|none, direction of movement of the stack of items
  // TODO: Why not an enum? https://github.com/phetsims/forces-and-motion-basics/issues/319
  public readonly directionProperty: StringProperty;

  // time since pusher has fallen over, in seconds
  // TODO: Should we this have a tandem? It spams the data stream. https://github.com/phetsims/forces-and-motion-basics/issues/319
  // TODO: Why is default value 10? https://github.com/phetsims/forces-and-motion-basics/issues/319
  private readonly timeSinceFallenProperty: NumberProperty;

  // whether the pusher has fallen over
  public readonly fallenProperty: BooleanProperty;

  // 'left'|'right', direction pusher facing when it falls over
  public readonly fallenDirectionProperty: StringProperty;

  // how long the simulation has been running
  // TODO: Should we this have a tandem? It spams the data stream. https://github.com/phetsims/forces-and-motion-basics/issues/319
  public readonly timeProperty: NumberProperty;

  //stack.length is already a property, but mirror it here to easily multilink with it, see usage in MotionScreenView.js
  //TODO: Perhaps a DerivedProperty would be more suitable instead of duplicating/synchronizing this value
  // https://github.com/phetsims/forces-and-motion-basics/issues/319
  public readonly stackSizeProperty: NumberProperty;

  // is the sim running or paused?
  public readonly playProperty: BooleanProperty;

  // to observe whether the friction is zero
  public readonly frictionZeroProperty: TReadOnlyProperty<boolean>;

  // to observe whether the friction is zero
  public readonly frictionNonZeroProperty: TReadOnlyProperty<boolean>;

  // broadcast messages on step and reset all
  public readonly resetAllEmitter = new Emitter();
  public readonly stepEmitter = new Emitter();

  // track the previous model position when model position changes
  // animation for the pusher and background nodes is based off of
  // the change in model position (this.position - this.previousModelPosition )
  public previousModelPosition: number;

  public readonly items: Item[];

  public readonly stopwatch: Stopwatch;
  private view!: MotionScreenView;
  private cart!: Cart;

  /**
   * @param screen String that indicates which of the 3 screens this model represents
   * @param tandem
   */
  public constructor( public readonly screen: string, tandem: Tandem ) {

    //Motion models must be constructed with a screen, which indicates 'motion'|'friction'|'acceleration'
    assert && assert( screen );

    //Constants
    this.skateboard = screen === 'motion';
    this.accelerometer = screen === 'acceleration';
    const frictionValue = screen === 'motion' ? 0 : MotionConstants.MAX_FRICTION / 2;

    this.stackObservableArray = createObservableArray( {
      tandem: tandem.createTandem( 'stackObservableArray' ),
      phetioType: createObservableArray.ObservableArrayIO( ReferenceIO( IOType.ObjectIO ) )
    } );

    const forcesTandem = tandem.createTandem( 'forces' );
    this.appliedForceProperty = new NumberProperty( 0, {
      tandem: forcesTandem.createTandem( 'appliedForceProperty' ),
      units: 'N',
      range: new Range( -500, 500 )
    } );

    this.frictionForceProperty = new NumberProperty( 0, {
      tandem: forcesTandem.createTandem( 'frictionForceProperty' ),
      units: 'N'
    } );

    this.frictionProperty = new NumberProperty( frictionValue, {
      tandem: forcesTandem.createTandem( 'frictionProperty' )
    } );

    this.sumOfForcesProperty = new NumberProperty( 0, {
      tandem: forcesTandem.createTandem( 'sumOfForcesProperty' ),
      units: 'N'
    } );

    this.positionProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'positionProperty' ),
      units: 'm'
    } );

    this.speedProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'speedProperty' ),
      units: 'm/s'
    } );

    this.velocityProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'velocityProperty' ),
      units: 'm/s'
    } );

    this.accelerationProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'accelerationProperty' ),
      units: 'm/s/s'
    } );

    this.pusherPositionProperty = new NumberProperty( -16, {
      tandem: tandem.createTandem( 'pusherPositionProperty' ),
      units: 'm'
    } );

    this.pusherInteractionsEnabledProperty = new BooleanProperty( this.stackObservableArray.length > 0, {
      tandem: tandem.createTandem( 'pusherInteractionsEnabledProperty' )
    } );

    const visiblePropertiesTandem = tandem.createTandem( 'visibleProperties' );

    this.showForceProperty = new BooleanProperty( true, {
      tandem: visiblePropertiesTandem.createTandem( 'showForceProperty' )
    } );

    this.showValuesProperty = new BooleanProperty( false, {
      tandem: visiblePropertiesTandem.createTandem( 'showValuesProperty' )
    } );

    this.showSumOfForcesProperty = new BooleanProperty( false, {
      tandem: visiblePropertiesTandem.createTandem( 'showSumOfForcesProperty' )
    } );

    this.showSpeedProperty = new BooleanProperty( false, {
      tandem: visiblePropertiesTandem.createTandem( 'showSpeedProperty' )
    } );

    this.showStopwatchProperty = new BooleanProperty( false, {
      tandem: visiblePropertiesTandem.createTandem( 'showStopwatchProperty' )
    } );

    this.showMassesProperty = new BooleanProperty( false, {
      tandem: visiblePropertiesTandem.createTandem( 'showMassesProperty' )
    } );

    this.showAccelerationProperty = new BooleanProperty( false, {
      tandem: visiblePropertiesTandem.createTandem( 'showAccelerationProperty' )
    } );

    //  Keep track of whether the speed is classified as:
    // 'RIGHT_SPEED_EXCEEDED', 'LEFT_SPEED_EXCEEDED' or 'WITHIN_ALLOWED_RANGE'
    // so that the Applied Force can be stopped if the speed goes out of range.
    // TODO: Why not an enum? https://github.com/phetsims/forces-and-motion-basics/issues/319
    this.speedClassificationProperty = new StringProperty( 'WITHIN_ALLOWED_RANGE', {
      tandem: tandem.createTandem( 'speedClassificationProperty' )
    } );

    // See speedClassification
    // TODO: Why not an enum? https://github.com/phetsims/forces-and-motion-basics/issues/319
    this.previousSpeedClassificationProperty = new StringProperty( 'WITHIN_ALLOWED_RANGE', {
      tandem: tandem.createTandem( 'previousSpeedClassificationProperty' )
    } );

    this.movingRightProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'movingRightProperty' )
    } );

    this.directionProperty = new StringProperty( 'none', {
      tandem: tandem.createTandem( 'directionProperty' )
    } );

    this.timeSinceFallenProperty = new NumberProperty( 10, {
      units: 's'
    } );

    this.fallenProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'fallenProperty' )
    } );

    this.fallenDirectionProperty = new StringProperty( 'left', {
      tandem: tandem.createTandem( 'fallenDirectionProperty' )
    } );

    this.timeProperty = new NumberProperty( 0, {
      units: 's'
    } );

    this.stackSizeProperty = new NumberProperty( 1, {
      tandem: tandem.createTandem( 'stackSizeProperty' )
    } );

    this.playProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'playProperty' )
    } );

    this.frictionZeroProperty = new DerivedProperty( [ this.frictionProperty ], friction => friction === 0 );

    this.frictionNonZeroProperty = new DerivedProperty( [ this.frictionProperty ], friction => friction !== 0 );

    //Zero out the applied force when the last object is removed.  Necessary to remove the force applied with the slider tweaker buttons.  See #37
    this.stackObservableArray.lengthProperty.link( length => { if ( length === 0 ) { this.appliedForceProperty.set( 0 ); } } );

    this.stackObservableArray.lengthProperty.link( length => {
      this.pusherInteractionsEnabledProperty.value = length > 0;
    } );

    // TODO: Should stacksize Property be removed? https://github.com/phetsims/forces-and-motion-basics/issues/319
    this.stackObservableArray.lengthProperty.link( length => {
      this.stackSizeProperty.set( length );
    } );

    this.previousModelPosition = this.positionProperty.value;

    // Create and position all the interactive items in the 'friction', 'motion', and 'acceleration' screens

    // only add the trash can on the 'friction' and 'motion' screens
    const isTrashCanPresent = screen === 'friction' || screen === 'motion';
    let trashCan = null;

    const leftmostItemXLeft = 23; // x-position of the refrigerator
    const crate1Spacing = 106; // distance between the refrigerator and the middle crate
    const crate2Spacing = 90; // distance between the crates

    const leftmostItemXRight = this.accelerometer ? ( isTrashCanPresent ? 678 : 685 ) : 689; // x-position of the girl
    const manSpacing = this.accelerometer ? ( isTrashCanPresent ? 47 : 55 ) : 61; // distance between the girl and the man
    const trashSpacing = isTrashCanPresent ? ( this.accelerometer ? 53 : 66 ) : 0; // distance between the man and the trash can
    const mysterySpacing = this.accelerometer ? ( isTrashCanPresent ? 51 : 65 ) : 72; // distance between the trash can and the mystery box
    const bucketSpacing = isTrashCanPresent ? 63 : 75; // distance between the mystery box and the water bucket

    const itemsTandem = tandem.createTandem( 'items' );

    // create the items - Initial positions determined empirically
    const fridge = new Item( this, 'fridge', itemsTandem.createTandem( 'fridge' ), fridge_svg, 200, leftmostItemXLeft, 443, 0.5, 1.1, 4 );
    const crate1 = new Item( this, 'crate1', itemsTandem.createTandem( 'crate1' ), crate_svg, 50, leftmostItemXLeft + crate1Spacing, 507, 0.5 );
    const crate2 = new Item( this, 'crate2', itemsTandem.createTandem( 'crate2' ), crate_svg, 50, leftmostItemXLeft + crate1Spacing + crate2Spacing, 507, 0.5 );
    const girl = new Item( this, HumanTypeEnum.GIRL, itemsTandem.createTandem( 'girl' ), undefined, 40, leftmostItemXRight, 465, 0.6, 1.0, 8.2 );
    const man = new Item( this, HumanTypeEnum.MAN, itemsTandem.createTandem( 'man' ), undefined, 80, leftmostItemXRight + manSpacing, 428, 0.6, 0.92, 9.75 );
    if ( isTrashCanPresent ) {
      trashCan = new Item( this, 'trash', itemsTandem.createTandem( 'trash' ), trashCan_svg, 100, leftmostItemXRight + manSpacing + trashSpacing, 496, 0.5, 1.0, 5 );
    }
    const mysteryBox = new Item( this, 'mystery', itemsTandem.createTandem( 'mystery' ), mysteryObject01_svg, 50, leftmostItemXRight + manSpacing + trashSpacing + mysterySpacing, 513, 0.5, 1.0, undefined, undefined, undefined, true );
    const bucket = new Item( this, 'bucket', itemsTandem.createTandem( 'bucket' ), waterBucket_svg, 100, leftmostItemXRight + manSpacing + trashSpacing + mysterySpacing + bucketSpacing, 548 + -35, 0.5, 1.0, 2 );
    bucket.bucket = true;

    const itemsToAdd = this.accelerometer ? [ bucket ] : [];
    this.items = [ fridge, crate1, crate2, girl, man, mysteryBox, ...itemsToAdd ];

    // add the trash can after the man
    isTrashCanPresent && this.items.splice( this.items.indexOf( man ), 0, ...( trashCan ? [ trashCan ] : [] ) );

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

    this.stopwatch = new Stopwatch( {
      timePropertyOptions: {
        range: new Range( 0, 3599.99 )
      }
    } );
    this.showStopwatchProperty.link( () => {
      this.stopwatch.timeProperty.set( 0 );
      this.stopwatch.isRunningProperty.value = false;
    } );
  }

  /**
   * Get an array representing the items that are being user controlled.
   */
  public userControlledItems(): Item[] {
    const userControlledItems = [];
    for ( let i = 0; i < this.items.length; i++ ) {
      const item = this.items[ i ];
      if ( item.userControlledProperty.get() ) {
        userControlledItems.push( item );
      }
    }
    return userControlledItems;
  }

  /**
   * Upper items should fall if an item removed from beneath
   * Uses the view to get item dimensions.
   *
   * @param index - index of item in the stack array
   */
  public spliceStack( index: number ): Item {
    const item = this.stackObservableArray.get( index );
    this.stackObservableArray.remove( item );
    if ( this.stackObservableArray.length > 0 ) {
      let sumHeight = 0;
      for ( let i = 0; i < this.stackObservableArray.length; i++ ) {
        const size = this.view.getSize( this.stackObservableArray.get( i ) );
        sumHeight += size.height;
        this.stackObservableArray.get( i ).animateTo( this.view.layoutBounds.width / 2 - size.width / 2, ( this.skateboard ? 334 : 360 ) - sumHeight, 'stack' );//TODO: factor out this code for layout, which is duplicated in MotionTab.topOfStack https://github.com/phetsims/forces-and-motion-basics/issues/319
      }
    }

    //If the stack is emptied, stop the motion
    if ( this.stackObservableArray.length === 0 ) {
      this.velocityProperty.set( 0 );
      this.accelerationProperty.set( 0 );
    }
    return item;
  }

  // When a 4th item is placed on the stack, move the bottom item home and have the stack fall
  public spliceStackBottom(): void {
    const bottom = this.spliceStack( 0 );
    bottom.onBoardProperty.set( false );
    bottom.animateHome();
  }

  /**
   * Determine whether a value is positive, negative, or zero for the physics computations.
   */
  private getSign( value: number ): number {
    return value > 0 ? 1 : value < 0 ? -1 : 0;
  }

  /**
   * Returns the friction force on an object given the applied force.  The friction and applied
   * forces are rounded so that they have the same precision. If one force is more precise,
   * a system with seemingly equal forces can lose energy.
   * See https://github.com/phetsims/forces-and-motion-basics/issues/197
   */
  private getFrictionForce( appliedForce: number ): number {

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

  // Compute the mass of the entire stack, for purposes of momentum computation
  private getStackMass(): number {
    let mass = 0;
    for ( let i = 0; i < this.stackObservableArray.length; i++ ) {
      mass += this.stackObservableArray.get( i ).mass;
    }
    return mass;
  }

  /**
   * Determine whether a value is positive, negative or zero to determine wheter the object changed directions.
   */
  private sign( value: number ): 'negative' | 'positive' | 'zero' {
    return value < 0 ? 'negative' :
           value > 0 ? 'positive' :
           'zero';
  }

  /**
   * Determine whether a velocity value changed direction.
   * @param a - initial value
   * @param b - second value
   */
  private changedDirection( a: number, b: number ): boolean {
    return this.sign( a ) === 'negative' && this.sign( b ) === 'positive' ||
           this.sign( b ) === 'negative' && this.sign( a ) === 'positive';
  }

  // get the pusher position relative to the center and layout bounds of the view
  private getRelativePusherPosition(): number {
    return this.view.layoutBounds.width / 2 + ( this.pusherPositionProperty.get() - this.positionProperty.get() ) * MotionConstants.POSITION_SCALE;
  }

  /**
   * Step function for this model, function of the time step.  Called by step and manualStep functions below.
   *
   * @param dt - time step
   */
  private stepModel( dt: number ): void {

    // update the tracked time which is used by the WaterBucketNode and the Accelerometer
    this.timeProperty.set( this.timeProperty.get() + dt );

    this.stopwatch.step( dt );

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
   */
  public step( dt: number ): void {

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
   */
  public manualStep(): void {
    this.stepModel( 1 / 60 );
  }

  /**
   * Determine whether an item is in the stack.
   */
  public isInStack( item: Item ): boolean { return this.stackObservableArray.includes( item ); }

  /**
   * Determine whether an item is stacked above another item, so that the arms can be raised for humans.
   */
  public isItemStackedAbove( item: Item ): boolean { return this.isInStack( item ) && this.stackObservableArray.indexOf( item ) < this.stackObservableArray.length - 1;}

  public reset(): void {

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
    this.showStopwatchProperty.reset();

    for ( let i = 0; i < this.items.length; i++ ) {
      // if the item is being user controlled we need to cancel the drag in ItemNode
      if ( !this.items[ i ].userControlledProperty.get() ) {
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
   */
  public viewInitialized( view: MotionScreenView ): void {
    const item = this.items[ 1 ];
    // only move item to the top of the stack if it is not being user controlled
    if ( !item.userControlledProperty.get() ) {
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
}

forcesAndMotionBasics.register( 'MotionModel', MotionModel );