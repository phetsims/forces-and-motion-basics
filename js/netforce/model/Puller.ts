// Copyright 2013-2024, University of Colorado Boulder

/**
 * Model for the red/blue pullers which can be dragged to the rope, and exert a force on the rope.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import Property from '../../../../axon/js/Property.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import Knot from './Knot.js';
import Tandem from '../../../../tandem/js/Tandem.js';

// eslint-disable-next-line phet/no-view-imported-from-model
import PullerNode from '../view/PullerNode.js';
import optionize from '../../../../phet-core/js/optionize.js';

type PullerOptions = {
  standOffsetX?: number;
  other?: string;
};
export default class Puller {

  // to synchronize tandem names with the view
  public readonly pullerTandem: Tandem;
  public readonly standOffsetX: number;
  public readonly force: number;

  // whether or not the puller is currently being dragged
  public readonly draggingProperty: BooleanProperty;

  // the knot that this puller is attached to
  public readonly knotProperty: Property<Knot | null>;

  // the position of this puller
  public readonly positionProperty: Vector2Property;

  // a classified position in the play area
  // TODO: What are the valid values for this Property? https://github.com/phetsims/forces-and-motion-basics/issues/319
  // TODO: Why not an enum? https://github.com/phetsims/forces-and-motion-basics/issues/319
  public readonly lastPlacementProperty: StringProperty;

  // emits an event when the puller is dropped
  public readonly droppedEmitter = new Emitter();

  // emits an event when the puller is dragged
  public readonly draggedEmitter = new Emitter();

  public node: PullerNode | null = null;

  /**
   * @param x initial x-coordinate (in meters)
   * @param y initial y-coordinate (in meters)
   * @param type 'red'|'blue'
   * @param size 'small'|'medium'|'large'
   * @param dragOffsetX horizontal offset (in stage coordinates) to offset the puller image when pulling
   * @param tandem
   * @param providedOptions
   */
  public constructor( x: number, y: number,
                      public readonly type: 'red' | 'blue',
                      public readonly size: 'small' | 'medium' | 'large',
                      public readonly dragOffsetX: number, tandem: Tandem, providedOptions?: PullerOptions ) {

    this.pullerTandem = tandem;

    const options = optionize<PullerOptions>()( { standOffsetX: 0, other: '' }, providedOptions );

    this.standOffsetX = options.standOffsetX;
    this.force = this.size === 'small' ? 10 * 5 :
                 this.size === 'medium' ? 20 * 5 :
                 this.size === 'large' ? 30 * 5 :
                 NaN;

    this.draggingProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'draggingProperty' )
    } );

    this.knotProperty = new Property<Knot | null>( null, {
      tandem: tandem.createTandem( 'knotProperty' ),
      phetioValueType: NullableIO( Knot.KnotIO )
    } );

    this.positionProperty = new Vector2Property( new Vector2( x, y ), {
      tandem: tandem.createTandem( 'positionProperty' )
    } );

    this.lastPlacementProperty = new StringProperty( 'home', {
      tandem: tandem.createTandem( 'lastPlacementProperty' )
    } );


    //Move with the knot
    const updatePosition = ( knotX: number ) => {
      this.positionProperty.set( new Vector2( knotX, this.positionProperty.get().y ) );
    };

    //When the knot changes, wire up as a listener to the new knot
    this.knotProperty.link( ( newKnot, oldKnot ) => {

      //Unlink from the previous knot if there was one
      if ( oldKnot ) {
        oldKnot.xProperty.unlink( updatePosition );
      }

      //Synchronize our position with the knot.
      if ( newKnot ) {
        newKnot.xProperty.link( updatePosition );
      }
    } );
  }


  /**
   * Reset the model by resetting all associated Properties.
   */
  public reset(): void {
    this.draggingProperty.reset();
    this.knotProperty.reset();
    this.positionProperty.reset();
    this.lastPlacementProperty.reset();
  }

  // Detach the puller from the knot.
  public disconnect(): void {
    this.knotProperty.set( null );
  }
}

forcesAndMotionBasics.register( 'Puller', Puller );