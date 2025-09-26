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
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import { roundSymmetric } from '../../../../dot/js/util/roundSymmetric.js';
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
  public readonly frictionCoefficientProperty: NumberProperty;

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

  public readonly stackedItems: ObservableArray<Item>;

  // whether forces are visible
  public readonly showForceProperty: BooleanProperty;

  // whether values are visible
  public readonly showValuesProperty: BooleanProperty;

  // whether sum of forces is visible
  public readonly showSumOfForcesProperty: BooleanProperty;

  // whether speedometer is visible
  public readonly showSpeedProperty: BooleanProperty;

  // whether mass values are visible
  public readonly showMassesProperty: BooleanProperty;

  // whether acceleration meter is visible
  public readonly showAccelerationProperty: BooleanProperty;
  public readonly speedClassificationProperty: StringUnionProperty<'WITHIN_ALLOWED_RANGE' | 'LEFT_SPEED_EXCEEDED' | 'RIGHT_SPEED_EXCEEDED'>;
  private readonly previousSpeedClassificationProperty: StringUnionProperty<'WITHIN_ALLOWED_RANGE' | 'LEFT_SPEED_EXCEEDED' | 'RIGHT_SPEED_EXCEEDED'>;

  // 'right'|'left'|none, direction of movement of the stack of items
  public readonly directionProperty: StringUnionProperty<'left' | 'right' | 'none'>;

  // time since pusher has fallen over, in seconds
  private readonly timeSinceFallenProperty: NumberProperty;

  // whether the pusher has fallen over
  public readonly fallenProperty: BooleanProperty;

  // 'left'|'right', direction pusher facing when it falls over
  public readonly fallenDirectionProperty: StringProperty;

  // how long the simulation has been running
  public readonly timeProperty: NumberProperty;

  // is the sim running or paused?
  public readonly isPlayingProperty: BooleanProperty;

  // to observe whether the friction is zero
  public readonly frictionZeroProperty: TReadOnlyProperty<boolean>;

  // to observe whether the friction is zero
  public readonly frictionNonZeroProperty: TReadOnlyProperty<boolean>;

  // broadcast messages on step and reset all
  public readonly resetAllEmitter = new Emitter();
  public readonly stepEmitter = new Emitter();

  public readonly items: Item[];

  public readonly stopwatch: Stopwatch;
  private view!: MotionScreenView;
  private cart!: Cart;

  /**
   * @param screen String that indicates which of the 3 screens this model represents
   * @param tandem
   */
  public constructor( public readonly screen: 'motion' | 'friction' | 'acceleration', tandem: Tandem ) {

    // Constants
    this.skateboard = screen === 'motion';
    this.accelerometer = screen === 'acceleration';
    const frictionValue = screen === 'motion' ? 0 : MotionConstants.MAX_FRICTION / 2;

    this.stackedItems = createObservableArray( {
      tandem: tandem.createTandem( 'stackedItems' ),
      phetioType: createObservableArray.ObservableArrayIO( ReferenceIO( IOType.ObjectIO ) ),
      phetioFeatured: true,
      lengthPropertyOptions: {
        phetioFeatured: true,
        phetioDocumentation: 'Number of stacked items'
      }
    } );

    const forcesTandem = tandem.createTandem( 'forces' );
    this.appliedForceProperty = new NumberProperty( 0, {
      tandem: forcesTandem.createTandem( 'appliedForceProperty' ),
      phetioFeatured: true,
      units: 'N',
      range: new Range( -500, 500 )
    } );

    this.frictionForceProperty = new NumberProperty( 0, {
      tandem: forcesTandem.createTandem( 'frictionForceProperty' ),
      phetioReadOnly: true,
      phetioFeatured: true,
      units: 'N'
    } );

    this.frictionCoefficientProperty = new NumberProperty( frictionValue, {
      tandem: forcesTandem.createTandem( 'frictionStaticCoefficientProperty' ),
      phetioDocumentation: 'Coefficient of static friction',
      phetioReadOnly: screen === 'motion',
      phetioFeatured: true,
      range: new Range( 0, MotionConstants.MAX_FRICTION )
    } );

    this.sumOfForcesProperty = new NumberProperty( 0, {
      tandem: forcesTandem.createTandem( 'sumOfForcesProperty' ),
      phetioReadOnly: true,
      phetioFeatured: true,
      units: 'N'
    } );

    this.positionProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'positionProperty' ),
      phetioReadOnly: true,
      units: 'm'
    } );

    this.speedProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'speedProperty' ),
      phetioFeatured: true,
      units: 'm/s',
      phetioReadOnly: true
    } );

    this.velocityProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'velocityProperty' ),
      phetioFeatured: true,
      units: 'm/s',
      phetioReadOnly: true
    } );

    this.accelerationProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'accelerationProperty' ),
      phetioReadOnly: true,
      phetioFeatured: true,
      units: 'm/s/s'
    } );

    const pusherTandem = tandem.createTandem( 'pusher' );

    this.pusherPositionProperty = new NumberProperty( -16, {
      tandem: pusherTandem.createTandem( 'positionProperty' ),
      phetioReadOnly: true,
      units: 'm'
    } );

    this.pusherInteractionsEnabledProperty = new BooleanProperty( this.stackedItems.length > 0 );

    const visiblePropertiesTandem = tandem.createTandem( 'visibleProperties' );

    this.showForceProperty = new BooleanProperty( true, {
      tandem: visiblePropertiesTandem.createTandem( 'showForceProperty' ),
      phetioFeatured: true
    } );

    this.showValuesProperty = new BooleanProperty( false, {
      tandem: visiblePropertiesTandem.createTandem( 'showValuesProperty' ),
      phetioFeatured: true
    } );

    this.showSumOfForcesProperty = new BooleanProperty( false, {
      tandem: screen === 'motion' ? Tandem.OPT_OUT : visiblePropertiesTandem.createTandem( 'showSumOfForcesProperty' ),
      phetioFeatured: true
    } );

    this.showSpeedProperty = new BooleanProperty( false, {
      tandem: visiblePropertiesTandem.createTandem( 'showSpeedProperty' ),
      phetioFeatured: true
    } );

    this.showMassesProperty = new BooleanProperty( false, {
      tandem: visiblePropertiesTandem.createTandem( 'showMassesProperty' ),
      phetioFeatured: true
    } );

    this.showAccelerationProperty = new BooleanProperty( false, {
      tandem: screen === 'motion' || screen === 'friction' ? Tandem.OPT_OUT : visiblePropertiesTandem.createTandem( 'showAccelerationProperty' ),
      phetioFeatured: true
    } );

    //  Keep track of whether the speed is classified as:
    // 'RIGHT_SPEED_EXCEEDED', 'LEFT_SPEED_EXCEEDED' or 'WITHIN_ALLOWED_RANGE'
    // so that the Applied Force can be stopped if the speed goes out of range.
    this.speedClassificationProperty = new StringUnionProperty( 'WITHIN_ALLOWED_RANGE', {
      validValues: [ 'WITHIN_ALLOWED_RANGE', 'LEFT_SPEED_EXCEEDED', 'RIGHT_SPEED_EXCEEDED' ],
      tandem: tandem.createTandem( 'speedClassificationProperty' ),
      phetioReadOnly: true,
      phetioDocumentation: 'For PhET-iO internal use only for state'
    } );

    // See speedClassification
    this.previousSpeedClassificationProperty = new StringUnionProperty( 'WITHIN_ALLOWED_RANGE', {
      validValues: [ 'WITHIN_ALLOWED_RANGE', 'LEFT_SPEED_EXCEEDED', 'RIGHT_SPEED_EXCEEDED' ],
      tandem: tandem.createTandem( 'previousSpeedClassificationProperty' ),
      phetioReadOnly: true,
      phetioDocumentation: 'For PhET-iO internal use only for state'
    } );

    this.directionProperty = new StringUnionProperty( 'none', {
      phetioDocumentation: 'Direction of the applied force',
      validValues: [ 'right', 'left', 'none' ],
      tandem: pusherTandem.createTandem( 'directionProperty' )
    } );

    // Start at a value larger than the threshold so the pusher doesn't immediately fall
    this.timeSinceFallenProperty = new NumberProperty( 10, {
      units: 's'
    } );

    this.fallenProperty = new BooleanProperty( false, {
      tandem: pusherTandem.createTandem( 'fallenProperty' ),
      phetioFeatured: true,
      phetioReadOnly: true
    } );

    this.fallenDirectionProperty = new StringUnionProperty( 'left', {
      validValues: [ 'left', 'right' ],
      phetioReadOnly: true,
      phetioDocumentation: 'For PhET-iO internal use only, the direction of the pusher if fallen',
      tandem: pusherTandem.createTandem( 'fallenDirectionProperty' )
    } );

    this.timeProperty = new NumberProperty( 0, {
      units: 's'
    } );

    this.isPlayingProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'isPlayingProperty' ),
      phetioFeatured: true
    } );

    this.frictionZeroProperty = new DerivedProperty( [ this.frictionCoefficientProperty ], friction => friction === 0 );

    this.frictionNonZeroProperty = new DerivedProperty( [ this.frictionCoefficientProperty ], friction => friction !== 0 );

    // Zero out the applied force when the last object is removed.  Necessary to remove the force applied with the slider tweaker buttons.  See #37
    this.stackedItems.lengthProperty.link( length => { if ( length === 0 ) { this.appliedForceProperty.value = 0; } } );

    this.stackedItems.lengthProperty.link( length => {
      this.pusherInteractionsEnabledProperty.value = length > 0;
    } );

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
    const fridge = new Item( this, 'fridge', itemsTandem.createTandem( 'fridge' ), fridge_svg, 200, leftmostItemXLeft, 443, 0.5, false, 1.1, 4 );
    const crate1 = new Item( this, 'crate1', itemsTandem.createTandem( 'crate1' ), crate_svg, 50, leftmostItemXLeft + crate1Spacing, 507, 0.5, false );
    const crate2 = new Item( this, 'crate2', itemsTandem.createTandem( 'crate2' ), crate_svg, 50, leftmostItemXLeft + crate1Spacing + crate2Spacing, 507, 0.5, false );
    const girl = new Item( this, HumanTypeEnum.GIRL, itemsTandem.createTandem( 'girl' ), undefined, 40, leftmostItemXRight, 465, 0.6, false, 1.0, 8.2 );
    const man = new Item( this, HumanTypeEnum.MAN, itemsTandem.createTandem( 'man' ), undefined, 80, leftmostItemXRight + manSpacing, 428, 0.6, false, 0.92, 9.75 );
    if ( isTrashCanPresent ) {
      trashCan = new Item( this, 'trash', itemsTandem.createTandem( 'trash' ), trashCan_svg, 100, leftmostItemXRight + manSpacing + trashSpacing, 496, 0.5, false, 1.0, 5 );
    }
    const mysteryBox = new Item( this, 'mystery', itemsTandem.createTandem( 'mystery' ), mysteryObject01_svg, 50, leftmostItemXRight + manSpacing + trashSpacing + mysterySpacing, 513, 0.5, false, 1.0, undefined, undefined, undefined, true );
    const bucket = new Item(
      this,
      'bucket',
      screen === 'acceleration' ? itemsTandem.createTandem( 'bucket' ) : Tandem.OPT_OUT,
      waterBucket_svg, 100, leftmostItemXRight + manSpacing + trashSpacing + mysterySpacing + bucketSpacing, 548 + -35, 0.5, true, 1.0, 2 );

    const itemsToAdd = this.accelerometer ? [ bucket ] : [];
    this.items = [ fridge, crate1, crate2, girl, man, mysteryBox, ...itemsToAdd ];

    // add the trash can after the man
    isTrashCanPresent && this.items.splice( this.items.indexOf( man ), 0, ...( trashCan ? [ trashCan ] : [] ) );

    this.appliedForceProperty.link( appliedForce => {
      this.directionProperty.value = appliedForce > 0 ? 'right' :
                                     appliedForce < 0 ? 'left' :
                                     'none';

      // if the applied force changes and the pusher is fallen, stand up to push immediately
      if ( this.fallenProperty.value && appliedForce !== 0 ) {
        this.fallenProperty.value = !this.fallenProperty.value;
      }
    } );

    // Applied force should drop to zero if max speed reached
    this.speedClassificationProperty.link( speedClassification => {
      if ( speedClassification !== 'WITHIN_ALLOWED_RANGE' ) {
        this.appliedForceProperty.value = 0;
      }
    } );

    // when we fall down, we want the applied force to immediately be zero
    // see https://github.com/phetsims/forces-and-motion-basics/issues/180
    this.fallenProperty.link( fallen => {
      if ( fallen ) {
        this.appliedForceProperty.value = 0;
      }
    } );

    this.stopwatch = new Stopwatch( {
      tandem: tandem.createTandem( 'stopwatch' ),
      phetioFeatured: true,
      timePropertyOptions: {
        range: new Range( 0, 3599.99 )
      }
    } );
    this.stopwatch.isVisibleProperty.link( () => {
      this.stopwatch.timeProperty.value = 0;
      this.stopwatch.isRunningProperty.value = false;
    } );
  }

  /**
   * Get an array representing the items that are being user controlled.
   */
  public userControlledItems(): Item[] {
    return this.items.filter( item => item.userControlledProperty.value );
  }

  /**
   * Upper items should fall if an item removed from beneath
   * Uses the view to get item dimensions.
   *
   * @param index - index of item in the stack array
   */
  public spliceStack( index: number ): Item {
    const item = this.stackedItems.get( index );
    this.stackedItems.remove( item );
    if ( this.stackedItems.length > 0 ) {
      let sumHeight = 0;
      for ( let i = 0; i < this.stackedItems.length; i++ ) {
        const size = this.view.getSize( this.stackedItems.get( i ) );
        sumHeight += size.height;

        // NOTE: similar code in ItemNode's moveToStack closure function
        this.stackedItems.get( i ).animateTo( this.view.layoutBounds.width / 2 - size.width / 2, ( this.skateboard ? 334 : 360 ) - sumHeight, 'stack' );
      }
    }

    // If the stack is emptied, stop the motion
    if ( this.stackedItems.length === 0 ) {
      this.velocityProperty.value = 0;
      this.accelerationProperty.value = 0;
    }
    return item;
  }

  // When a 4th item is placed on the stack, move the bottom item home and have the stack fall
  public spliceStackBottom(): void {
    const bottom = this.spliceStack( 0 );
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

    const g = 9.8;

    const mass = this.getStackMass();

    const frictionForceMagnitude = Math.abs( this.frictionCoefficientProperty.value * mass * g );

    // Friction force only applies above this velocity
    const velocityThreshold = 1E-12;

    // Object is motionless, friction should oppose the applied force
    if ( Math.abs( this.velocityProperty.value ) <= velocityThreshold ) {

      // the friction is higher than the applied force, so don't allow the friction force to be higher than the applied force
      frictionForce = frictionForceMagnitude >= Math.abs( appliedForce ) ? -appliedForce :

        // Oppose the applied force
                      -this.getSign( this.appliedForceProperty.value ) * frictionForceMagnitude;
    }

    // Object is moving, so friction should oppose the velocity
    else {
      frictionForce = -this.getSign( this.velocityProperty.value ) * frictionForceMagnitude * 0.75;
    }

    // round the friction force so that one force is not more precise than another
    return roundSymmetric( frictionForce );
  }

  // Compute the mass of the entire stack, for purposes of momentum computation
  private getStackMass(): number {
    let mass = 0;
    for ( let i = 0; i < this.stackedItems.length; i++ ) {
      mass += this.stackedItems.get( i ).massProperty.value;
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
    return this.view.layoutBounds.width / 2 + ( this.pusherPositionProperty.value - this.positionProperty.value ) * MotionConstants.POSITION_SCALE;
  }

  /**
   * Step function for this model, function of the time step.  Called by step and manualStep functions below.
   *
   * @param dt - time step
   */
  private stepModel( dt: number ): void {

    // update the tracked time which is used by the WaterBucketNode and the Accelerometer
    this.timeProperty.value = this.timeProperty.value + dt;

    this.stopwatch.step( dt );

    // update the acceleration values
    const mass = this.getStackMass();
    this.accelerationProperty.value = mass !== 0 ? this.sumOfForcesProperty.value / mass : 0.0;

    let newVelocity = this.velocityProperty.value + this.accelerationProperty.value * dt;

    // friction force should not be able to make the object move backwards
    // Also make sure velocity goes exactly to zero when the pusher is pushing so that the friction force will be correctly computed
    // Without this logic, it was causing flickering arrows because the velocity was flipping sign and the friction force was flipping direction
    if ( this.changedDirection( newVelocity, this.velocityProperty.value ) ) {
      newVelocity = 0.0;
    }

    // Cap at strobe speed.  This is necessary so that a reverse applied force will take effect immediately, without these lines of code the pusher will stutter.
    if ( newVelocity > MotionConstants.MAX_SPEED ) { newVelocity = MotionConstants.MAX_SPEED; }
    if ( newVelocity < -MotionConstants.MAX_SPEED ) { newVelocity = -MotionConstants.MAX_SPEED; }

    this.velocityProperty.value = newVelocity;
    this.positionProperty.value = this.positionProperty.value + this.velocityProperty.value * dt;

    this.speedProperty.value = Math.abs( this.velocityProperty.value );
    this.speedClassificationProperty.value = this.velocityProperty.value >= MotionConstants.MAX_SPEED ? 'RIGHT_SPEED_EXCEEDED' :
                                             this.velocityProperty.value <= -MotionConstants.MAX_SPEED ? 'LEFT_SPEED_EXCEEDED' :
                                             'WITHIN_ALLOWED_RANGE';

    if ( this.speedClassificationProperty.value !== 'WITHIN_ALLOWED_RANGE' ) {
      this.timeSinceFallenProperty.value = 0;
      this.fallenDirectionProperty.value = this.speedClassificationProperty.value === 'RIGHT_SPEED_EXCEEDED' ? 'right' : 'left';
      this.fallenProperty.value = true;
    }
    else {

      // if the pusher is very far off screen, stand up immediately
      // based on width of the background image, determined by visual inspection
      const relativePosition = this.getRelativePusherPosition();
      if ( relativePosition > 1600 || relativePosition < -600 ) {
        this.fallenProperty.value = false;
      }
      this.timeSinceFallenProperty.value = this.timeSinceFallenProperty.value + dt;

      // Stand up after 2 seconds
      if ( this.timeSinceFallenProperty.value > 2 ) {
        this.fallenProperty.value = false;
      }
    }

    // Stand up if applying a force in the opposite direction that you fell
    if ( this.fallenProperty.value && this.fallenDirectionProperty.value === 'left' && this.appliedForceProperty.value > 0 ) {
      this.fallenProperty.value = false;
    }
    if ( this.fallenProperty.value && this.fallenDirectionProperty.value === 'right' && this.appliedForceProperty.value < 0 ) {
      this.fallenProperty.value = false;
    }

    if ( this.previousSpeedClassificationProperty.value !== 'WITHIN_ALLOWED_RANGE' ) {
      this.speedClassificationProperty.value = this.previousSpeedClassificationProperty.value;
    }

    // Don't show the pusher as fallen while applying a force, see https://github.com/phetsims/forces-and-motion-basics/issues/66
    if ( this.appliedForceProperty.value !== 0 && this.speedClassificationProperty.value === 'WITHIN_ALLOWED_RANGE' ) {
      this.fallenProperty.value = false;
    }

  }

  /**
   * Update the physics.
   */
  public step( dt: number ): void {

    // Computes the new forces and sets them to the corresponding properties
    // The first part of stepInTime is to compute and set the forces.  This is factored out because the forces must
    // also be updated when the user changes the friction force or mass while the sim is paused.
    this.frictionForceProperty.value = this.getFrictionForce( this.appliedForceProperty.value );
    this.sumOfForcesProperty.value = this.frictionForceProperty.value + this.appliedForceProperty.value;

    if ( this.isPlayingProperty.value ) {
      this.stepModel( dt );
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
  public isInStack( item: Item ): boolean { return this.stackedItems.includes( item ); }

  /**
   * Determine whether an item is stacked above another item, so that the arms can be raised for humans.
   */
  public isItemStackedAbove( item: Item ): boolean { return this.isInStack( item ) && this.stackedItems.indexOf( item ) < this.stackedItems.length - 1;}

  public reset(): void {

    // reset all Properties of this model.
    this.appliedForceProperty.reset();
    this.frictionForceProperty.reset();
    this.frictionCoefficientProperty.reset();
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
    this.directionProperty.reset();
    this.timeSinceFallenProperty.reset();
    this.fallenProperty.reset();
    this.fallenDirectionProperty.reset();
    this.timeProperty.reset();
    this.isPlayingProperty.reset();
    this.stopwatch.reset();

    for ( let i = 0; i < this.items.length; i++ ) {
      // if the item is being user controlled we need to cancel the drag in ItemNode
      if ( !this.items[ i ].userControlledProperty.value ) {
        this.items[ i ].reset();
      }
    }

    // notify that a reset was triggered
    this.resetAllEmitter.emit();

    this.stackedItems.clear();

    // Move the initial crate to the play area, since it resets to the toolbox, not its initial position.
    this.viewInitialized( this.view );

  }

  /**
   * After the view is constructed, move one of the blocks to the top of the stack.
   * It would be better if more of this could be done in the model constructor, but it would be difficult with the way things are currently set up.
   */
  public viewInitialized( view: MotionScreenView ): void {
    const item = this.items[ 1 ];
    // only move item to the top of the stack if it is not being user controlled
    if ( !item.userControlledProperty.value ) {
      this.view = view;
      item.cancelAnimation();
      item.modeProperty.value = 'onStack';
      const itemNode = view.itemNodes[ 1 ];
      const scaledWidth = this.view.getSize( item ).width;

      item.positionProperty.value = new Vector2( view.layoutBounds.width / 2 - scaledWidth / 2, view.topOfStack - itemNode.height );
      this.stackedItems.add( item );
    }
  }
}

forcesAndMotionBasics.register( 'MotionModel', MotionModel );