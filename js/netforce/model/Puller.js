// Copyright 2013-2020, University of Colorado Boulder

/**
 * Model for the red/blue pullers which can be dragged to the rope, and exert a force on the rope.
 *
 * @author Sam Reid
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import Property from '../../../../axon/js/Property.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import merge from '../../../../phet-core/js/merge.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import Knot from './Knot.js';

class Puller {

  /**
   * @param x initial x-coordinate (in meters)
   * @param y initial y-coordinate (in meters)
   * @param type 'red'|'blue'
   * @param size 'small'|'medium'|'large'
   * @param dragOffsetX horizontal offset (in stage coordinates) to offset the puller image when pulling
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( x, y, type, size, dragOffsetX, tandem, options ) {
    assert && assert( [ 'small', 'medium', 'large' ].indexOf( size ) >= 0 );

    // @public - to synchronize tandem names with the view
    this.pullerTandem = tandem;

    options = merge( { standOffsetX: 0, other: '' }, options );

    this.dragOffsetX = dragOffsetX;
    this.standOffsetX = options.standOffsetX;
    this.type = type;
    this.size = size;
    this.force = this.size === 'small' ? 10 * 5 :
                 this.size === 'medium' ? 20 * 5 :
                 this.size === 'large' ? 30 * 5 :
                 NaN;

    // @public {boolean} - whether or not the puller is currently being dragged
    this.draggingProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'draggingProperty' )
    } );

    // @public {Knot|null} - the knot that this puller is attached to
    this.knotProperty = new Property( null, {
      tandem: tandem.createTandem( 'knotProperty' ),
      phetioType: Property.PropertyIO( NullableIO( Knot.KnotIO ) )
    } );

    // @public {Vector2} - the position of this puller
    this.positionProperty = new Vector2Property( new Vector2( x, y ), {
      tandem: tandem.createTandem( 'positionProperty' )
    } );

    // @public {string} - a classified position in the play area
    // TODO: What are the valid values for this Property?
    // TODO: Why not an enum?
    this.lastPlacementProperty = new StringProperty( 'home', {
      tandem: tandem.createTandem( 'lastPlacementProperty' )
    } );

    // @public - emits an event when the puller is dropped
    this.droppedEmitter = new Emitter();

    // @public - emits an event when the puller is dragged
    this.draggedEmitter = new Emitter();

    this.other = options.other;

    //Move with the knot
    const updatePosition = knotX => {
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
   * @public
   */
  reset() {
    this.draggingProperty.reset();
    this.knotProperty.reset();
    this.positionProperty.reset();
    this.lastPlacementProperty.reset();
  }

  // @public - Detach the puller from the knot.
  disconnect() {
    this.knotProperty.set( null );
  }
}

forcesAndMotionBasics.register( 'Puller', Puller );

export default Puller;
