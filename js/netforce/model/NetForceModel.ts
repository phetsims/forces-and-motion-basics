// Copyright 2013-2025, University of Colorado Boulder

/**
 * Model for the Net Force screen, in which Pullers can pull on a rope with different forces.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import VoidIO from '../../../../tandem/js/types/VoidIO.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import Cart from './Cart.js';
import Knot, { KnotType } from './Knot.js';
import Puller from './Puller.js';

// spacing for the knots
const KNOT_SPACING = 80;
const BLUE_KNOT_OFFSET = 62;
const RED_KNOT_OFFSET = 680;

type KnotDescription = {
  id: string;
  knot: string | null;
};
export default class NetForceModel extends PhetioObject {

  // puller game will extend to +/- this value - when the cart wheel hits this length, the game is over
  public static readonly GAME_LENGTH = 458;

  public readonly hasStartedProperty: BooleanProperty;
  public readonly isRunningProperty: BooleanProperty;
  public readonly numberPullersAttachedProperty: NumberProperty;
  public readonly stateProperty: StringProperty;
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

  public constructor( tandem: Tandem ) {

    super( {
      tandem: tandem,
      phetioType: NetForceModel.NetForceModelIO,
      phetioState: false
    } );

    this.hasStartedProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'hasStartedProperty' ),
      phetioDocumentation: 'Indicates the tug-of-war has started.',
      phetioReadOnly: true
    } );

    this.isRunningProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'isRunningProperty' )
    } );

    this.numberPullersAttachedProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'numberPullersAttachedProperty' ),
      phetioReadOnly: true,
      range: new Range( 0, 8 )
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
      units: 'N',
      range: new Range( -350, 350 )
    } );

    this.leftForceProperty = new NumberProperty( 0, {
      tandem: forcesTandem.createTandem( 'leftForceProperty' ),
      phetioReadOnly: true,
      units: 'N',
      range: new Range( -350, 0 )
    } );

    this.rightForceProperty = new NumberProperty( 0, {
      tandem: forcesTandem.createTandem( 'rightForceProperty' ),
      phetioReadOnly: true,
      units: 'N',
      range: new Range( 0, 350 )
    } );

    this.speedProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'speedProperty' ),
      phetioReadOnly: true,
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
      tandem: visiblePropertyTandem.createTandem( 'showSumOfForcesProperty' )
    } );
    this.showValuesProperty = new BooleanProperty( false, {
      tandem: visiblePropertyTandem.createTandem( 'showValuesProperty' )
    } );
    this.showSpeedProperty = new BooleanProperty( false, {
      tandem: visiblePropertyTandem.createTandem( 'showSpeedProperty' )
    } );
    this.cartReturnedEmitter = new Emitter();
    this.resetAllEmitter = new Emitter();

    this.cart = new Cart( tandem.createTandem( 'cart' ) );

    //Create a knot given a color and index (0-3)
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
    const bigPullerY = 473;
    const mediumPullerY = 426;
    const smallPullerY = 394;

    const pullersTandem = tandem.createTandem( 'pullers' );
    this.pullers = [
      new Puller( 208, bigPullerY, 'blue', 'small', 10, pullersTandem.createTandem( 'smallLeftPuller1' ) ),
      new Puller( 278, bigPullerY, 'blue', 'small', 10, pullersTandem.createTandem( 'smallLeftPuller2' ), { other: 'other' } ),
      new Puller( 127, mediumPullerY, 'blue', 'medium', 50, pullersTandem.createTandem( 'mediumLeftPuller' ), { standOffsetX: -5 } ),
      new Puller( 38, smallPullerY, 'blue', 'large', 70, pullersTandem.createTandem( 'largeLeftPuller' ), { standOffsetX: -18 } ),
      new Puller( 648, bigPullerY, 'red', 'small', 10, pullersTandem.createTandem( 'smallRightPuller1' ) ),
      new Puller( 717, bigPullerY, 'red', 'small', 10, pullersTandem.createTandem( 'smallRightPuller2' ), { other: 'other' } ),
      new Puller( 789, mediumPullerY, 'red', 'medium', 20, pullersTandem.createTandem( 'mediumRightPuller' ) ),
      new Puller( 860, smallPullerY, 'red', 'large', 30, pullersTandem.createTandem( 'largeRightPuller' ) )
    ];


    // When any puller is dragged or moved with phet-io, update the closest knots to be visible
    // and change the numberPullersAttached
    this.pullers.forEach( puller => {

      puller.positionProperty.link( this.updateVisibleKnots.bind( this ) );
      puller.userControlledEmitter.addListener( () => {
        this.numberPullersAttachedProperty.set( this.countAttachedPullers() );
      } );
      puller.droppedEmitter.addListener( () => {
        const knot = this.getTargetKnot( puller )!;
        this.movePullerToKnot( puller, knot );
      } );
      puller.knotProperty.link( () => {
        this.numberPullersAttachedProperty.set( this.countAttachedPullers() );
      } );
    } );

    //Update the started flag
    this.isRunningProperty.link( running => { if ( running ) { this.hasStartedProperty.set( true ); }} );

    //Update the forces when the number of attached pullers changes
    this.numberPullersAttachedProperty.link( () => { this.netForceProperty.set( this.getNetForce() ); } );
    this.numberPullersAttachedProperty.link( () => { this.leftForceProperty.set( this.getLeftForce() ); } );
    this.numberPullersAttachedProperty.link( () => { this.rightForceProperty.set( this.getRightForce() ); } );
  }


  /**
   * Move a puller to a knot.  If no knot is specified, puller is moved to its original position in the Puller
   * toolbox.
   *
   * @param puller
   * @param [knot] - optional knot where the puller should be moved.
   */
  private movePullerToKnot( puller: Puller, knot: Knot ): void {

    //try to snap to a knot
    if ( knot ) {

      puller.positionProperty.set( new Vector2( knot.positionProperty.get(), knot.y ) );
      puller.knotProperty.set( knot );
    }

    //Or go back home
    else {
      puller.positionProperty.reset();
    }

    //Keep track of their position to change the attach/detach thresholds, see NetForceModel.getTargetKnot
    const newPosition = knot ? 'knot' : 'home';
    puller.lastPlacementProperty.set( newPosition );
  }

  // Count the number of pullers attached to the rope
  private countAttachedPullers(): number {
    let count = 0;
    for ( let i = 0; i < this.pullers.length; i++ ) {
      if ( this.pullers[ i ].knotProperty.get() ) {
        count++;
      }
    }
    return count;
  }

  // Change knot visibility (halo highlight) when the pullers are dragged
  private updateVisibleKnots(): void {
    this.knots.forEach( knot => { knot.isHighlightedProperty.set( false ); } );
    this.pullers.forEach( puller => {
      if ( puller.userControlledProperty.get() ) {
        const knot = this.getTargetKnot( puller );
        if ( knot ) {
          knot.isHighlightedProperty.set( true );
        }
      }
    } );
  }

  /**
   * Gets the puller attached to a knot, or null if none attached to that knot.
   */
  private getPuller( knot: Knot ): Puller | null {
    const find = _.find( this.pullers, puller => puller.knotProperty.get() === knot );
    return typeof ( find ) !== 'undefined' ? find : null;
  }

  /**
   * Given a puller, returns a function that computes the distance between that puller and any knot.
   */
  private getKnotPullerDistance( puller: Puller ): ( knot: Knot ) => number {

    // the blue pullers face to the right, so add a small correction so the distance feels more 'natural' when
    // placing the blue pullers
    const dx = puller.type === 'red' ? 0 : -40;
    return knot => Math.sqrt( Math.pow( knot.positionProperty.get() - puller.positionProperty.get().x + dx, 2 ) + Math.pow( knot.y - puller.positionProperty.get().y, 2 ) );
  }

  /**
   * Gets the closest unoccupied knot to the given puller, which is being dragged.
   */
  private getClosestOpenKnot( puller: Puller ): Knot {
    const filter = this.knots.filter( knot => knot.type === puller.type && this.getPuller( knot ) === null );

    const knot = _.minBy( filter, this.getKnotPullerDistance( puller ) );
    assert && assert( knot, 'There should always be an open knot' );
    return knot!;
  }

  /**
   * Gets the closest unoccupied knot to the given puller, which is being dragged.
   */
  private getClosestOpenKnotFromCart( puller: Puller ): Knot {
    let idx = puller.type === 'red' ? 4 : 3;
    const delta = puller.type === 'red' ? 1 : -1;
    while ( this.getPuller( this.knots[ idx ] ) !== null ) {
      idx += delta;
    }
    return this.knots[ idx ];
  }

  /**
   * Gets the closest unoccupied knot to the given puller if it is close enough to grab.
   */
  private getTargetKnot( puller: Puller ): Knot | null {
    const target = this.getClosestOpenKnot( puller );
    const distanceToTarget = this.getKnotPullerDistance( puller )( target );

    // Only accept a target knot if the puller's head is close enough to the knot
    const threshold = puller.lastPlacementProperty.get() === 'home' ? 370 : 300;
    return distanceToTarget < 220 && puller.positionProperty.get().y < threshold ? target : null;
  }

  // Return the cart and prepare the model for another "go" run
  public returnCart(): void {
    this.cart.reset();
    this.knots.forEach( knot => {knot.reset();} );
    this.isRunningProperty.set( false );
    this.stateProperty.set( 'experimenting' );

    // broadcast a message that the cart was returned
    this.cartReturnedEmitter.emit();

    this.hasStartedProperty.set( false );
    this.durationProperty.set( 0 ); // Reset tug-of-war timer
    this.speedProperty.reset();
  }

  // Reset the entire model when "reset all" is pressed
  public reset(): void {

    // reset all Properties associated with this model
    this.hasStartedProperty.reset();
    this.isRunningProperty.reset();
    this.numberPullersAttachedProperty.reset();
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

    //Unset the knots before calling reset since the change of the number of attached pullers causes the force arrows to update
    this.pullers.forEach( puller => {puller.disconnect();} );

    this.cart.reset();
    this.pullers.forEach( puller => {
      // if the puller is being dragged, we will need to cancel the drag in PullerNode
      if ( !puller.userControlledProperty.get() ) {
        puller.reset();
      }
    } );
    this.knots.forEach( knot => {knot.reset();} );

    // notify that the model was reset
    this.resetAllEmitter.emit();
  }

  /**
   * The length of the rope is the spacing between knots times the number of knots plus the difference between
   * the red and blue starting offsets.
   */
  private getRopeLength(): number {
    return 6 * KNOT_SPACING + RED_KNOT_OFFSET - ( BLUE_KNOT_OFFSET + 3 * KNOT_SPACING );
  }

  /**
   * Update the physics when the clock ticks
   */
  public step( dt: number ): void {

    if ( this.isRunningProperty.get() ) {

      // Increment tug-of-war timer
      this.durationProperty.set( this.durationProperty.get() + dt );

      // Make the simulation run about as fast as the Java version
      const newV = this.cart.velocityProperty.get() + this.getNetForce() * dt * 0.003;
      this.speedProperty.set( Math.abs( newV ) );

      // calculate new position from velocity
      const newX = this.cart.positionProperty.get() + newV * dt * 60.0;

      //If the cart made it to the end, then stop and signify completion
      const gameLength = NetForceModel.GAME_LENGTH - this.cart.widthToWheel;
      if ( newX > gameLength || newX < -gameLength ) {
        this.isRunningProperty.set( false );
        this.stateProperty.set( 'completed' );

        // zero out the velocity
        this.speedProperty.set( 0 );

        // set cart and pullers back the to max position
        const maxLength = newX > gameLength ? gameLength : -gameLength;
        this.updateCartAndPullers( this.speedProperty.get(), maxLength );
      }
      else {

        // if the game isn't over yet, update cart and puller
        this.updateCartAndPullers( newV, newX );
      }
    }

    this.timeProperty.set( this.timeProperty.get() + dt );
  }

  /**
   * Update the velocity and position of the cart and the pullers.
   */
  private updateCartAndPullers( newV: number, newX: number ): void {

    // move the cart, and update its velocity
    this.cart.velocityProperty.set( newV );
    this.cart.positionProperty.set( newX );

    // move the knots and the pullers on those knots
    this.knots.forEach( knot => { knot.positionProperty.set( knot.initX + newX ); } );
  }

  // Gets the net force on the cart, applied by both left and right pullers
  private getNetForce(): number {
    return this.getLeftForce() + this.getRightForce();
  }

  /**
   * Get an array of pullers of the specified type (color string)
   */
  private getPullers( type: 'red' | 'blue' ): Puller[] {
    return _.filter( this.pullers, ( puller: Puller ) => puller.type === type && puller.knotProperty.value !== null );
  }

  /**
   * Function for internal use that helps to sum forces in _.reduce, see getLeftForce, getRightForce
   */
  private sumForces( memo: number, puller: Puller ): number {
    return memo + puller.force;
  }

  // Gets the left force on the cart, applied by left pullers
  private getLeftForce(): number {
    return -_.reduce( this.getPullers( 'blue' ), this.sumForces, 0 );
  }

  // Gets the right force on the cart, applied by right pullers
  private getRightForce(): number {
    return _.reduce( this.getPullers( 'red' ), this.sumForces, 0 );
  }

  /**
   * Gets the closest unoccupied knot to the given puller, which is being dragged.
   */
  private getClosestOpenKnotInDirection( puller: Puller, delta: number ): Knot | null {
    const isInRightDirection = ( sourceKnot: Knot, destinationKnot: Knot, delta: number ) => {
      assert && assert( delta < 0 || delta > 0 );
      return delta < 0 ? destinationKnot.positionProperty.get() < sourceKnot.positionProperty.get() :
             delta > 0 ? destinationKnot.positionProperty.get() > sourceKnot.positionProperty.get() :
             'error';
    };
    const filter = this.knots.filter( knot => knot.type === puller.type &&
                                              this.getPuller( knot ) === null &&
                                              isInRightDirection( puller.knotProperty.get()!, knot, delta ) );
    let result: Knot | null = _.minBy( filter, this.getKnotPullerDistance( puller ) ) || null;
    if ( result && ( this.getKnotPullerDistance( puller )( result ) === Infinity || this.getKnotPullerDistance( puller )( result ) === -Infinity ) ) {
      result = null;
    }
    return result;
  }

  /**
   * For phet-io, describe what pullers are on what knots
   */
  public getKnotDescription(): KnotDescription[] {
    return this.pullers.map( puller => ( {
      id: puller.tandem.phetioID, // TODO: addInstance for Puller https://github.com/phetsims/forces-and-motion-basics/issues/319
      knot: puller.knotProperty.get() && puller.knotProperty.get()!.phetioID
    } ) );
  }

  /**
   * Move a puller to an adjacent open knot in a direction specified by delta.
   */
  private movePullerToAdjacentOpenKnot( puller: Puller, delta: number ): void {
    const closestOpenKnot = this.getClosestOpenKnotInDirection( puller, delta );
    if ( closestOpenKnot ) {
      this.movePullerToKnot( puller, closestOpenKnot );
    }
  }

  private static readonly NetForceModelIO = new IOType( 'NetForceModelIO', {
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