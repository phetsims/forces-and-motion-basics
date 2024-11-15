// Copyright 2013-2024, University of Colorado Boulder

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
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import VoidIO from '../../../../tandem/js/types/VoidIO.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import Cart from './Cart.js';
import Knot from './Knot.js';
import Puller from './Puller.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';

// spacing for the knots
const KNOT_SPACING = 80;
const BLUE_KNOT_OFFSET = 62;
const RED_KNOT_OFFSET = 680;

export default class NetForceModel extends PhetioObject {

  // puller game will extend to +/- this value - when the cart wheel hits this length, the game is over
  public static readonly GAME_LENGTH = 458;

  public readonly startedProperty: BooleanProperty;
  public readonly runningProperty: BooleanProperty;
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
  public readonly volumeOnProperty: BooleanProperty;
  private readonly cartReturnedEmitter: Emitter;
  public readonly resetAllEmitter: Emitter;
  public readonly cart: Cart;
  private readonly knots: Knot[];
  public readonly pullers: Puller[];

  public constructor( tandem: Tandem ) {

    super( {
      tandem: tandem,
      phetioType: NetForceModel.NetForceModelIO,
      phetioState: false
    } );

    this.startedProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'startedProperty' )
    } );

    this.runningProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'runningProperty' )
    } );

    this.numberPullersAttachedProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'numberPullersAttachedProperty' ),
      range: new Range( 0, 8 )
    } );

    // TODO what are the valid values? https://github.com/phetsims/tasks/issues/1129
    // TODO: Why not an enum? https://github.com/phetsims/tasks/issues/1129
    this.stateProperty = new StringProperty( 'experimenting', {
      tandem: tandem.createTandem( 'stateProperty' )
    } );

    this.timeProperty = new Property( 0, {
      // TODO: Removed this property for phet-io spam https://github.com/phetsims/tasks/issues/1129
      // tandem: tandem.createTandem( 'timeProperty' )
      // phetioValueType: NumberIO,
      // units: 'seconds'
    } );

    this.netForceProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'netForceProperty' ),
      units: 'N',
      range: new Range( -350, 350 )
    } );

    this.leftForceProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'leftForceProperty' ),
      units: 'N',
      range: new Range( -350, 0 )
    } );

    this.rightForceProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'rightForceProperty' ),
      units: 'N',
      range: new Range( 0, 350 )
    } );

    this.speedProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'speedProperty' ),
      units: 'm/s',
      range: new Range( 0, 6 )
    } );

    this.durationProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'durationProperty' ),
      units: 's',
      range: new Range( 0, Number.POSITIVE_INFINITY )
    } );

    // User settings
    this.showSumOfForcesProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'showSumOfForcesProperty' )
    } );
    this.showValuesProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'showValuesProperty' )
    } );
    this.showSpeedProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'showSpeedProperty' )
    } );
    this.volumeOnProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'volumeOnProperty' )
    } );

    this.cartReturnedEmitter = new Emitter();
    this.resetAllEmitter = new Emitter();

    this.cart = new Cart( tandem.createTandem( 'cart' ) );

    //Create a knot given a color and index (0-3)
    const createKnot = ( color: string, index: number, tandem: Tandem ) => {
      const xPosition = ( color === 'blue' ? BLUE_KNOT_OFFSET : RED_KNOT_OFFSET ) + index * KNOT_SPACING;
      return new Knot( xPosition, color, BLUE_KNOT_OFFSET, this.getRopeLength(), { tandem: tandem } );
    };

    // Create the knots
    // To support PhET-iO, the knots should be created before the pullers.
    // This allows the pullers to be attached to the knots using the PhET-iO API
    this.knots = [
      createKnot( 'blue', 0, tandem.createTandem( 'blueKnot0' ) ),
      createKnot( 'blue', 1, tandem.createTandem( 'blueKnot1' ) ),
      createKnot( 'blue', 2, tandem.createTandem( 'blueKnot2' ) ),
      createKnot( 'blue', 3, tandem.createTandem( 'blueKnot3' ) ),
      createKnot( 'red', 0, tandem.createTandem( 'redKnot0' ) ),
      createKnot( 'red', 1, tandem.createTandem( 'redKnot1' ) ),
      createKnot( 'red', 2, tandem.createTandem( 'redKnot2' ) ),
      createKnot( 'red', 3, tandem.createTandem( 'redKnot3' ) )
    ];

    // create the pullers
    const bigPullerY = 473;
    const mediumPullerY = 426;
    const smallPullerY = 394;

    this.pullers = [
      new Puller( 208, bigPullerY, 'blue', 'small', 10, tandem.createTandem( 'smallBluePuller1' ) ),
      new Puller( 278, bigPullerY, 'blue', 'small', 10, tandem.createTandem( 'smallBluePuller2' ), { other: 'other' } ),
      new Puller( 127, mediumPullerY, 'blue', 'medium', 50, tandem.createTandem( 'mediumBluePuller' ), { standOffsetX: -5 } ),
      new Puller( 38, smallPullerY, 'blue', 'large', 70, tandem.createTandem( 'largeBluePuller' ), { standOffsetX: -18 } ),
      new Puller( 648, bigPullerY, 'red', 'small', 10, tandem.createTandem( 'smallRedPuller1' ) ),
      new Puller( 717, bigPullerY, 'red', 'small', 10, tandem.createTandem( 'smallRedPuller2' ), { other: 'other' } ),
      new Puller( 789, mediumPullerY, 'red', 'medium', 20, tandem.createTandem( 'mediumRedPuller' ) ),
      new Puller( 860, smallPullerY, 'red', 'large', 30, tandem.createTandem( 'largeRedPuller' ) )
    ];


    // When any puller is dragged or moved with phet-io, update the closest knots to be visible
    // and change the numberPullersAttached
    this.pullers.forEach( puller => {

      puller.positionProperty.link( this.updateVisibleKnots.bind( this ) );
      puller.draggedEmitter.addListener( () => {
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
    this.runningProperty.link( running => { if ( running ) { this.startedProperty.set( true ); }} );

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
  public movePullerToKnot( puller: Puller, knot: Knot ): void {

    //try to snap to a knot
    if ( knot ) {

      puller.positionProperty.set( new Vector2( knot.xProperty.get(), knot.y ) );
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

  /**
   * Shift the puller to the left.
   */
  public shiftPullerLeft( puller: Puller ): void {
    this.shiftPuller( puller, 0, 4, -1 );
  }

  /**
   * Shift a puller to the right.
   */
  public shiftPullerRight( puller: Puller ): void {
    this.shiftPuller( puller, 3, 7, 1 );
  }

  /**
   * Shift a puller by some delta, restricted by the desired bounds
   */
  public shiftPuller( puller: Puller, leftBoundIndex: number, rightBoundIndex: number, delta: number ): void {
    if ( puller.knotProperty.get() ) {
      const currentIndex = this.knots.indexOf( puller.knotProperty.get()! );
      if ( currentIndex !== leftBoundIndex && currentIndex !== rightBoundIndex ) {
        const nextIndex = currentIndex + delta;

        const currentKnot = this.knots[ currentIndex ];
        const nextKnot = this.knots[ nextIndex ];

        const otherPuller = this.getPuller( nextKnot );

        // @ts-expect-error
        puller.setValues( { position: new Vector2( nextKnot.xProperty.get(), nextKnot.y ), knot: nextKnot } );

        // @ts-expect-error
        otherPuller && otherPuller.setValues( {
          position: new Vector2( currentKnot.xProperty.get(), currentKnot.y ),
          knot: currentKnot
        } );
      }
    }
  }

  // Count the number of pullers attached to the rope
  public countAttachedPullers(): number {
    let count = 0;
    for ( let i = 0; i < this.pullers.length; i++ ) {
      if ( this.pullers[ i ].knotProperty.get() ) {
        count++;
      }
    }
    return count;
  }

  // Change knot visibility (halo highlight) when the pullers are dragged
  public updateVisibleKnots(): void {
    this.knots.forEach( knot => { knot.visibleProperty.set( false ); } );
    this.pullers.forEach( puller => {
      if ( puller.draggingProperty.get() ) {
        const knot = this.getTargetKnot( puller );
        if ( knot ) {
          knot.visibleProperty.set( true );
        }
      }
    } );
  }

  /**
   * Gets the puller attached to a knot, or null if none attached to that knot.
   */
  public getPuller( knot: Knot ): Puller | null {
    const find = _.find( this.pullers, puller => puller.knotProperty.get() === knot );
    return typeof ( find ) !== 'undefined' ? find : null;
  }

  /**
   * Given a puller, returns a function that computes the distance between that puller and any knot.
   */
  public getKnotPullerDistance( puller: Puller ): ( knot: Knot ) => number {

    // the blue pullers face to the right, so add a small correction so the distance feels more 'natural' when
    // placing the blue pullers
    const dx = puller.type === 'red' ? 0 : -40;
    return knot => Math.sqrt( Math.pow( knot.xProperty.get() - puller.positionProperty.get().x + dx, 2 ) + Math.pow( knot.y - puller.positionProperty.get().y, 2 ) );
  }

  /**
   * Gets the closest unoccupied knot to the given puller, which is being dragged.
   */
  public getClosestOpenKnot( puller: Puller ): Knot {
    const filter = this.knots.filter( knot => knot.type === puller.type && this.getPuller( knot ) === null );

    // @ts-expect-error
    return _.minBy( filter, this.getKnotPullerDistance( puller ) );
  }

  /**
   * Gets the closest unoccupied knot to the given puller, which is being dragged.
   */
  public getClosestOpenKnotFromCart( puller: Puller ): Knot {
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
  public getTargetKnot( puller: Puller ): Knot | null {
    const target = this.getClosestOpenKnot( puller );
    const distanceToTarget = this.getKnotPullerDistance( puller )( target );

    //Only accept a target knot if the puller's head is close enough to the knot
    const threshold = puller.lastPlacementProperty.get() === 'home' ? 370 : 300;
    return distanceToTarget < 220 && puller.positionProperty.get().y < threshold ? target : null;
  }

  // Return the cart and prepare the model for another "go" run
  public returnCart(): void {
    this.cart.reset();
    this.knots.forEach( knot => {knot.reset();} );
    this.runningProperty.set( false );
    this.stateProperty.set( 'experimenting' );

    // broadcast a message that the cart was returned
    this.cartReturnedEmitter.emit();

    this.startedProperty.set( false );
    this.durationProperty.set( 0 ); // Reset tug-of-war timer
    this.speedProperty.reset();
  }

  // Reset the entire model when "reset all" is pressed
  public reset(): void {

    // reset all Properties associated with this model
    this.startedProperty.reset();
    this.runningProperty.reset();
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
    this.volumeOnProperty.reset();

    //Unset the knots before calling reset since the change of the number of attached pullers causes the force arrows to update
    this.pullers.forEach( puller => {puller.disconnect();} );

    this.cart.reset();
    this.pullers.forEach( puller => {
      // if the puller is being dragged, we will need to cancel the drag in PullerNode
      if ( !puller.draggingProperty.get() ) {
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
  public getRopeLength(): number {
    return 6 * KNOT_SPACING + RED_KNOT_OFFSET - ( BLUE_KNOT_OFFSET + 3 * KNOT_SPACING );
  }

  /**
   * Update the physics when the clock ticks
   */
  public step( dt: number ): void {

    if ( this.runningProperty.get() ) {

      // Increment tug-of-war timer
      this.durationProperty.set( this.durationProperty.get() + dt );

      // Make the simulation run about as fast as the Java version
      const newV = this.cart.vProperty.get() + this.getNetForce() * dt * 0.003;
      this.speedProperty.set( Math.abs( newV ) );

      // calculate new position from velocity
      const newX = this.cart.xProperty.get() + newV * dt * 60.0;

      //If the cart made it to the end, then stop and signify completion
      const gameLength = NetForceModel.GAME_LENGTH - this.cart.widthToWheel;
      if ( newX > gameLength || newX < -gameLength ) {
        this.runningProperty.set( false );
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
    this.cart.vProperty.set( newV );
    this.cart.xProperty.set( newX );

    // move the knots and the pullers on those knots
    this.knots.forEach( knot => { knot.xProperty.set( knot.initX + newX ); } );
  }

  // Gets the net force on the cart, applied by both left and right pullers
  public getNetForce(): number {
    return this.getLeftForce() + this.getRightForce();
  }

  /**
   * Get an array of pullers of the specified type (color string)
   */
  public getPullers( type: 'red' | 'blue' ): Puller[] {

    // @ts-expect-error
    return _.filter( this.pullers, p => p.type === type && p.knotProperty.get() );
  }

  /**
   * Function for internal use that helps to sum forces in _.reduce, see getLeftForce, getRightForce
   */
  public sumForces( memo: number, puller: Puller ): number {
    return memo + puller.force;
  }

  // Gets the left force on the cart, applied by left pullers
  public getLeftForce(): number {
    return -_.reduce( this.getPullers( 'blue' ), this.sumForces, 0 );
  }

  // Gets the right force on the cart, applied by right pullers
  public getRightForce(): number {
    return _.reduce( this.getPullers( 'red' ), this.sumForces, 0 );
  }

  /**
   * Gets the closest unoccupied knot to the given puller, which is being dragged.
   */
  public getClosestOpenKnotInDirection( puller: Puller, delta: number ): Knot | null {
    const isInRightDirection = ( sourceKnot: Knot, destinationKnot: Knot, delta: number ) => {
      assert && assert( delta < 0 || delta > 0 );
      return delta < 0 ? destinationKnot.xProperty.get() < sourceKnot.xProperty.get() :
             delta > 0 ? destinationKnot.xProperty.get() > sourceKnot.xProperty.get() :
             'error';
    };
    const filter = this.knots.filter( knot => knot.type === puller.type &&
                                              this.getPuller( knot ) === null &&
                                              isInRightDirection( puller.knotProperty.get()!, knot, delta ) );
    let result = _.minBy( filter, this.getKnotPullerDistance( puller ) );
    // @ts-expect-error
    if ( result === Infinity || result === -Infinity ) {

      // @ts-expect-error
      result = null;
    }
    return result || null;
  }

  /**
   * Get the next open knot in a given direction.  Very similar to the function above, but with a resultant knot
   * is a function of the distance to the next knot, not of the distance to the puller.  This is necessary because
   * when dragging, the puller does not yet have an associated knot.
   */
  public getNextOpenKnotInDirection( sourceKnot: Knot, puller: Puller, delta: number ): Knot | null {
    const isInRightDirection = ( destinationKnot: Knot, delta: number ) => {
      assert && assert( delta < 0 || delta > 0 );
      return delta < 0 ? destinationKnot.xProperty.get() < sourceKnot.xProperty.get() :
             delta > 0 ? destinationKnot.xProperty.get() > sourceKnot.xProperty.get() :
             'error';
    };
    const filter = this.knots.filter( knot => knot.type === puller.type &&
                                              this.getPuller( knot ) === null &&
                                              isInRightDirection( knot, delta ) );
    let result = _.minBy( filter, knot => Math.abs( sourceKnot.xProperty.get() - knot.xProperty.get() ) );

    // we have reached the end of the knots.  Return either the first or last knot to loop the choice.
    // @ts-expect-error
    if ( result === Infinity || result === -Infinity ) {
      // @ts-expect-error
      result = null;
    }
    return result || null;
  }

  /**
   * For phet-io, describe what pullers are on what knots
   */
  public getKnotDescription(): IntentionalAny {
    return this.pullers.map( puller => ( {
      id: puller.pullerTandem.phetioID, // TODO: addInstance for Puller https://github.com/phetsims/tasks/issues/1129
      knot: puller.knotProperty.get() && puller.knotProperty.get()!.phetioID
    } ) );
  }

  /**
   * Move a puller to an adjacent open knot in a direction specified by delta.
   */
  public movePullerToAdjacentOpenKnot( puller: Puller, delta: number ): void {
    const closestOpenKnot = this.getClosestOpenKnotInDirection( puller, delta );
    if ( closestOpenKnot ) {
      this.movePullerToKnot( puller, closestOpenKnot );
    }
  }

  public static readonly NetForceModelIO = new IOType( 'NetForceModelIO', {
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