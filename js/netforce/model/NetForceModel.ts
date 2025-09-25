// Copyright 2013-2025, University of Colorado Boulder

/**
 * Model for the Net Force screen, in which Pullers can pull on a rope with different forces.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import Multilink from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import VoidIO from '../../../../tandem/js/types/VoidIO.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import Cart from './Cart.js';
import ForcesAndMotionBasicsPreferences from './ForcesAndMotionBasicsPreferences.js';
import Knot, { KnotType } from './Knot.js';
import Puller from './Puller.js';

// spacing for the knots
const KNOT_SPACING = 80;
const BLUE_KNOT_OFFSET = 62;
const RED_KNOT_OFFSET = 680;

export type LeftTeamColor = 'blue' | 'purple';
export type RightTeamColor = 'red' | 'orange';

export default class NetForceModel extends PhetioObject {

  // puller game will extend to +/- this value - when the cart's wheel hits this length, the game is over
  public static readonly GAME_LENGTH = 458;

  public readonly hasStartedProperty: BooleanProperty;
  public readonly isRunningProperty: BooleanProperty;
  public readonly numberPullersAttachedProperty: NumberProperty;
  public readonly numberBluePullersAttachedProperty: NumberProperty;
  public readonly numberRedPullersAttachedProperty: NumberProperty;
  public readonly stateProperty: StringUnionProperty<'experimenting' | 'completed'>;
  public readonly timeProperty: Property<number>;
  public readonly netForceProperty: NumberProperty;
  public readonly leftForceProperty: NumberProperty;
  public readonly rightForceProperty: NumberProperty;
  public readonly speedProperty: NumberProperty;
  private readonly durationProperty: NumberProperty;
  public readonly showSumOfForcesProperty: BooleanProperty;
  public readonly showValuesProperty: BooleanProperty;
  public readonly showSpeedProperty: BooleanProperty;
  private readonly cartReturnedEmitter: Emitter;
  public readonly resetAllEmitter: Emitter;
  public readonly cart: Cart;
  public readonly knots: Knot[];
  public readonly pullers: Puller[];
  public readonly leftTeamColorProperty: TReadOnlyProperty<LeftTeamColor>;
  public readonly rightTeamColorProperty: TReadOnlyProperty<RightTeamColor>;

  public constructor( tandem: Tandem ) {

    super( {
      tandem: tandem,
      phetioType: NetForceModel.NetForceModelIO,
      phetioState: false
    } );

    this.leftTeamColorProperty = new DerivedProperty( [ ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty ], pullerColor => {
      return pullerColor === 'purpleOrange' ? 'purple' : 'blue';
    } );

    this.rightTeamColorProperty = new DerivedProperty( [ ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty ], pullerColor => {
      return pullerColor === 'purpleOrange' ? 'orange' : 'red';
    } );

    this.hasStartedProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'hasStartedProperty' ),
      phetioDocumentation: 'Indicates the tug-of-war has started.',
      phetioReadOnly: true,
      phetioFeatured: true
    } );

    this.isRunningProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'isRunningProperty' ),
      phetioFeatured: true
    } );

    this.numberPullersAttachedProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'numberPullersAttachedProperty' ),
      phetioReadOnly: true,
      range: new Range( 0, 8 ),
      numberType: 'Integer'
    } );

    this.numberBluePullersAttachedProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'numberBluePullersAttachedProperty' ),
      phetioReadOnly: true,
      range: new Range( 0, 4 ),
      numberType: 'Integer'
    } );

    this.numberRedPullersAttachedProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'numberRedPullersAttachedProperty' ),
      phetioReadOnly: true,
      range: new Range( 0, 4 ),
      numberType: 'Integer'
    } );

    this.stateProperty = new StringUnionProperty( 'experimenting', {
      validValues: [ 'experimenting', 'completed' ],
      tandem: tandem.createTandem( 'stateProperty' ),
      phetioReadOnly: true
    } );

    this.timeProperty = new Property( 0 );

    const forcesTandem = tandem.createTandem( 'forces' );
    this.netForceProperty = new NumberProperty( 0, {
      tandem: forcesTandem.createTandem( 'netForceProperty' ),
      phetioReadOnly: true,
      phetioFeatured: true,
      units: 'N',
      range: new Range( -350, 350 )
    } );

    this.leftForceProperty = new NumberProperty( 0, {
      tandem: forcesTandem.createTandem( 'leftForceProperty' ),
      phetioReadOnly: true,
      phetioFeatured: true,
      units: 'N',
      range: new Range( -350, 0 )
    } );

    this.rightForceProperty = new NumberProperty( 0, {
      tandem: forcesTandem.createTandem( 'rightForceProperty' ),
      phetioReadOnly: true,
      phetioFeatured: true,
      units: 'N',
      range: new Range( 0, 350 )
    } );

    this.speedProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'speedProperty' ),
      phetioReadOnly: true,
      phetioFeatured: true,
      units: 'm/s',
      range: new Range( 0, 6 )
    } );

    this.durationProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'durationProperty' ),
      phetioDocumentation: 'Duration of the tug-of-war.',
      phetioReadOnly: true,
      units: 's',
      range: new Range( 0, Number.POSITIVE_INFINITY )
    } );

    const visiblePropertyTandem = tandem.createTandem( 'visibleProperties' );

    // User settings
    this.showSumOfForcesProperty = new BooleanProperty( false, {
      tandem: visiblePropertyTandem.createTandem( 'showSumOfForcesProperty' ),
      phetioFeatured: true
    } );
    this.showValuesProperty = new BooleanProperty( false, {
      tandem: visiblePropertyTandem.createTandem( 'showValuesProperty' ),
      phetioFeatured: true
    } );
    this.showSpeedProperty = new BooleanProperty( false, {
      tandem: visiblePropertyTandem.createTandem( 'showSpeedProperty' ),
      phetioFeatured: true
    } );
    this.cartReturnedEmitter = new Emitter();
    this.resetAllEmitter = new Emitter();

    this.cart = new Cart( tandem.createTandem( 'cart' ) );

    // Create a knot given a color and index (0-3)
    const createKnot = ( color: KnotType, index: number, tandem: Tandem ) => {
      const xPosition = ( color === 'blue' ? BLUE_KNOT_OFFSET : RED_KNOT_OFFSET ) + index * KNOT_SPACING;
      return new Knot( xPosition, color, { tandem: tandem } );
    };

    const knotsTandem = tandem.createTandem( 'knots' );
    // Create the knots
    // To support PhET-iO, the knots should be created before the pullers.
    // This allows the pullers to be attached to the knots using the PhET-iO API
    this.knots = [
      createKnot( 'blue', 0, knotsTandem.createTandem( 'leftKnot0' ) ),
      createKnot( 'blue', 1, knotsTandem.createTandem( 'leftKnot1' ) ),
      createKnot( 'blue', 2, knotsTandem.createTandem( 'leftKnot2' ) ),
      createKnot( 'blue', 3, knotsTandem.createTandem( 'leftKnot3' ) ),
      createKnot( 'red', 0, knotsTandem.createTandem( 'rightKnot0' ) ),
      createKnot( 'red', 1, knotsTandem.createTandem( 'rightKnot1' ) ),
      createKnot( 'red', 2, knotsTandem.createTandem( 'rightKnot2' ) ),
      createKnot( 'red', 3, knotsTandem.createTandem( 'rightKnot3' ) )
    ];

    // create the pullers
    const smallPullerY = 473;
    const mediumPullerY = 426;
    const largePullerY = 394;

    const pullersTandem = tandem.createTandem( 'pullers' );
    this.pullers = [
      new Puller( this, 38, largePullerY, 'blue', 'large', 70, pullersTandem.createTandem( 'largeLeftPuller' ), { standOffsetX: -18 } ),
      new Puller( this, 127, mediumPullerY, 'blue', 'medium', 50, pullersTandem.createTandem( 'mediumLeftPuller' ), { standOffsetX: -5 } ),
      new Puller( this, 208, smallPullerY, 'blue', 'small', 10, pullersTandem.createTandem( 'smallLeftPuller1' ) ),
      new Puller( this, 278, smallPullerY, 'blue', 'small', 10, pullersTandem.createTandem( 'smallLeftPuller2' ), { other: 'other' } ),

      new Puller( this, 648, smallPullerY, 'red', 'small', 10, pullersTandem.createTandem( 'smallRightPuller1' ) ),
      new Puller( this, 717, smallPullerY, 'red', 'small', 10, pullersTandem.createTandem( 'smallRightPuller2' ), { other: 'other' } ),
      new Puller( this, 789, mediumPullerY, 'red', 'medium', 20, pullersTandem.createTandem( 'mediumRightPuller' ) ),
      new Puller( this, 860, largePullerY, 'red', 'large', 30, pullersTandem.createTandem( 'largeRightPuller' ) )
    ];

    // When any puller is dragged or moved with phet-io, update the closest knots to be visible
    // and change the numberPullersAttached
    this.pullers.forEach( puller => {

      puller.positionProperty.link( () => this.updateKnotHighlights() );
      puller.modeProperty.link( () => {
        this.updateKnotHighlights();
        const knot = puller.getKnot();
        if ( knot ) {
          this.movePullerToKnot( puller, knot );
        }
      } );
      puller.modeProperty.link( () => {
        this.numberPullersAttachedProperty.value = this.countAttachedPullers();
        this.numberBluePullersAttachedProperty.value = this.countBluePullersAttached();
        this.numberRedPullersAttachedProperty.value = this.countRedPullersAttached();
      } );
    } );

    // Update the started flag
    this.isRunningProperty.link( running => { if ( running ) { this.hasStartedProperty.value = true; }} );

    // Update the forces when the number of attached pullers changes, or their forces change (PhET-iO)
    Multilink.multilinkAny( [ ...this.pullers.map( puller => puller.forceProperty ), this.numberPullersAttachedProperty ], () => {
      this.netForceProperty.value = this.getNetForce();
      this.leftForceProperty.value = this.getLeftForce();
      this.rightForceProperty.value = this.getRightForce();
    } );
  }


  /**
   * Move a puller to a knot.  If no knot is specified, puller is moved to its original position in the Puller
   * toolbox.
   *
   * @param puller
   * @param [knot] - optional knot where the puller should be moved.
   */
  private movePullerToKnot( puller: Puller, knot: Knot ): void {

    // try to snap to a knot
    if ( knot ) {

      puller.positionProperty.value = new Vector2( knot.positionProperty.value, knot.y );
    }

    // Or go back home
    else {
      puller.positionProperty.reset();
    }

    // Keep track of their position to change the attachment/detach thresholds, see NetForceModel.getTargetKnot
    puller.lastPlacementProperty.value = knot ? 'knot' : 'home';
  }

  // Count the number of pullers attached to the rope
  private countAttachedPullers(): number {
    let count = 0;
    for ( let i = 0; i < this.pullers.length; i++ ) {
      if ( this.pullers[ i ].modeProperty.value.isAttached() ) {
        count++;
      }
    }
    return count;
  }

  // Count the number of blue team pullers attached to the rope
  private countBluePullersAttached(): number {
    let count = 0;
    for ( let i = 0; i < this.pullers.length; i++ ) {
      if ( this.pullers[ i ].modeProperty.value.isAttached() && this.pullers[ i ].type === 'blue' ) {
        count++;
      }
    }
    return count;
  }

  // Count the number of red team pullers attached to the rope
  private countRedPullersAttached(): number {
    let count = 0;
    for ( let i = 0; i < this.pullers.length; i++ ) {
      if ( this.pullers[ i ].modeProperty.value.isAttached() && this.pullers[ i ].type === 'red' ) {
        count++;
      }
    }
    return count;
  }

  // Change the knot visibility (halo highlight) when the pullers are dragged
  private updateKnotHighlights(): void {

    if ( this.knots ) {
      this.knots.forEach( knot => {

        let isHighlighted = false;

        // iterate through the pullers and see if any are grabbing or referencing this knot
        this.pullers.forEach( puller => {

          if ( puller.modeProperty.value.isPointerGrabbed() ) {
            const targetKnot = this.getTargetKnot( puller );
            if ( targetKnot && targetKnot === knot ) {
              isHighlighted = true;
            }
          }

          //REVIEW If puller grab has already set isHighlighted to true, why check keyboard grab?
          // check if the keyboard grab is hovering over the knot
          if ( puller.modeProperty.value.isKeyboardGrabbedOverSpecificKnot( knot, this ) ) {
            isHighlighted = true;
          }
        } );

        knot.isHighlightedProperty.value = isHighlighted;
      } );
    }
  }

  /**
   * Gets the puller attached to a knot, or null if none attached to that knot.
   */
  public getPuller( knot: Knot ): Puller | null {
    const find = _.find( this.pullers, puller => puller.getKnot() === knot );
    return typeof ( find ) !== 'undefined' ? find : null;
  }

  /**
   * Given a puller, returns a function that computes the distance between that puller and any knot.
   */
  private getKnotPullerDistance( puller: Puller ): ( knot: Knot ) => number {

    // the blue pullers face to the right, so add a small correction so the distance feels more 'natural' when
    // placing the blue pullers
    const dx = puller.type === 'red' ? 0 : -40;
    return knot => Math.sqrt( Math.pow( knot.positionProperty.value - puller.positionProperty.value.x + dx, 2 ) + Math.pow( knot.y - puller.positionProperty.value.y, 2 ) );
  }

  /**
   * Gets the closest unoccupied knot to the given puller, which is being dragged.
   */
  private getClosestOpenKnot( puller: Puller ): Knot {
    const filter = this.knots.filter( knot => knot.type === puller.type && this.getPuller( knot ) === null );

    const knot = _.minBy( filter, this.getKnotPullerDistance( puller ) );
    affirm( knot, 'There should always be an open knot' );
    return knot;
  }

  /**
   * Gets the closest unoccupied knot to the given puller if it is close enough to grab.
   */
  public getTargetKnot( puller: Puller ): Knot | null {
    const target = this.getClosestOpenKnot( puller );
    const distanceToTarget = this.getKnotPullerDistance( puller )( target );

    // Only accept a target knot if the puller's head is close enough to the knot
    const threshold = puller.lastPlacementProperty.value === 'home' ? 370 : 300;
    return distanceToTarget < 220 && puller.positionProperty.value.y < threshold ? target : null;
  }

  // Return the cart and prepare the model for another "go" run
  public returnCart(): void {
    this.cart.reset();
    this.knots.forEach( knot => knot.reset() );
    this.isRunningProperty.value = false;
    this.stateProperty.value = 'experimenting';

    // broadcast a message that the cart was returned
    this.cartReturnedEmitter.emit();

    this.hasStartedProperty.value = false;
    this.durationProperty.value = 0; // Reset tug-of-war timer
    this.speedProperty.reset();
  }

  // Reset the entire model when "reset all" is pressed
  public reset(): void {

    // reset all Properties associated with this model
    this.hasStartedProperty.reset();
    this.isRunningProperty.reset();
    this.numberPullersAttachedProperty.reset();
    this.numberBluePullersAttachedProperty.reset();
    this.numberRedPullersAttachedProperty.reset();
    this.stateProperty.reset();
    this.timeProperty.reset();
    this.netForceProperty.reset();
    this.leftForceProperty.reset();
    this.rightForceProperty.reset();
    this.speedProperty.reset();
    this.durationProperty.reset();
    this.showSumOfForcesProperty.reset();
    this.showValuesProperty.reset();
    this.showSpeedProperty.reset();

    this.cart.reset();
    this.pullers.forEach( puller => {
      // if the puller is being dragged, we will need to cancel the drag in PullerNode
      if ( !puller.modeProperty.value.isUserControlled() ) {
        puller.reset();
      }
    } );
    this.knots.forEach( knot => {knot.reset();} );

    // notify that the model was reset
    this.resetAllEmitter.emit();
  }

  public get gameLength(): number {
    return NetForceModel.GAME_LENGTH - this.cart.widthToWheel;
  }

  /**
   * Update the physics when the clock ticks
   */
  public step( dt: number ): void {

    if ( this.isRunningProperty.value ) {

      // Increment tug-of-war timer
      this.durationProperty.value = this.durationProperty.value + dt;

      // Make the simulation run about as fast as the Java version
      const newV = this.cart.velocityProperty.value + this.getNetForce() * dt * 0.003;
      this.speedProperty.value = Math.abs( newV );

      // calculate new position from velocity
      const newX = this.cart.positionProperty.value + newV * dt * 60.0;

      // If the cart made it to the end, then stop and signify completion
      const gameLength = this.gameLength;
      if ( newX > gameLength || newX < -gameLength ) {

        // zero out the velocity
        this.speedProperty.value = 0;

        // set cart and pullers back the to max position
        const maxLength = newX > gameLength ? gameLength : -gameLength;
        this.updateCartAndPullers( this.speedProperty.value, maxLength );

        // Do this after updating the cart position, since in GoPauseButton we check the cart position for the description
        this.isRunningProperty.value = false;
        this.stateProperty.value = 'completed';
      }
      else {

        // if the game isn't over yet, update cart and puller
        this.updateCartAndPullers( newV, newX );
      }
    }

    this.timeProperty.value = this.timeProperty.value + dt;
  }

  /**
   * Update the velocity and position of the cart and the pullers.
   */
  private updateCartAndPullers( newV: number, newX: number ): void {

    // move the cart, and update its velocity
    this.cart.velocityProperty.value = newV;
    this.cart.positionProperty.value = newX;

    // move the knots and the pullers on those knots
    this.knots.forEach( knot => { knot.positionProperty.value = knot.initX + newX; } );

    this.pullers.forEach( puller => puller.step() );
  }

  // Gets the net force on the cart, applied by both left and right pullers
  private getNetForce(): number {
    return this.getLeftForce() + this.getRightForce();
  }

  /**
   * Get an array of pullers of the specified type (color string)
   */
  private getPullers( type: 'red' | 'blue' ): Puller[] {
    return _.filter( this.pullers, ( puller: Puller ) => puller.type === type && puller.modeProperty.value.isAttached() );
  }

  /**
   * Function for internal use that helps to sum forces in _.reduce, see getLeftForce, getRightForce
   */
  private sumForces( memo: number, puller: Puller ): number {
    return memo + puller.forceProperty.value;
  }

  // Gets the left force on the cart, applied by left pullers
  private getLeftForce(): number {
    return -_.reduce( this.getPullers( 'blue' ), this.sumForces, 0 );
  }

  // Gets the right force on the cart, applied by right pullers
  private getRightForce(): number {
    return _.reduce( this.getPullers( 'red' ), this.sumForces, 0 );
  }

  private static readonly NetForceModelIO = new IOType<IntentionalAny, IntentionalAny>( 'NetForceModelIO', {
    valueType: NetForceModel,
    methods: {
      reset: {
        returnType: VoidIO,
        parameterTypes: [],
        implementation( this: NetForceModel ) {this.reset();},
        documentation: 'Resets the model',
        invocableForReadOnlyElements: false
      }
    }
  } );
}

forcesAndMotionBasics.register( 'NetForceModel', NetForceModel );