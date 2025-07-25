// Copyright 2013-2025, University of Colorado Boulder

/**
 * Model for the red/blue pullers which can be dragged to the rope, and exert a force on the rope.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
// eslint-disable-next-line phet/no-view-imported-from-model
import PullerNode from '../view/PullerNode.js';
import Knot from './Knot.js';

// Define the possible modes for a puller
export type PullerMode =
  | 'home'                    // In toolbox, not grabbed
  | 'grabbedOverHome'         // Grabbed and positioned over home/toolbox
  | 'grabbedOverLeftKnot1'    // Grabbed and positioned over left knot 1
  | 'grabbedOverLeftKnot2'    // Grabbed and positioned over left knot 2
  | 'grabbedOverLeftKnot3'    // Grabbed and positioned over left knot 3
  | 'grabbedOverLeftKnot4'    // Grabbed and positioned over left knot 4
  | 'grabbedOverRightKnot1'   // Grabbed and positioned over right knot 1
  | 'grabbedOverRightKnot2'   // Grabbed and positioned over right knot 2
  | 'grabbedOverRightKnot3'   // Grabbed and positioned over right knot 3
  | 'grabbedOverRightKnot4'   // Grabbed and positioned over right knot 4
  | 'leftKnot1'               // Attached to left knot 1
  | 'leftKnot2'               // Attached to left knot 2
  | 'leftKnot3'               // Attached to left knot 3
  | 'leftKnot4'               // Attached to left knot 4
  | 'rightKnot1'              // Attached to right knot 1
  | 'rightKnot2'              // Attached to right knot 2
  | 'rightKnot3'              // Attached to right knot 3
  | 'rightKnot4';             // Attached to right knot 4

type SelfOptions = {
  standOffsetX?: number;
  other?: string;
};
type PullerOptions = SelfOptions & PhetioObjectOptions;

export default class Puller extends PhetioObject {

  // to synchronize tandem names with the view
  public readonly standOffsetX: number;
  public readonly forceProperty: TReadOnlyProperty<number>;

  // The current mode of the puller - this is the authoritative state
  public readonly modeProperty: StringUnionProperty<PullerMode>;

  // whether the puller is currently being dragged (derived from mode)
  public readonly userControlledProperty: BooleanProperty;

  // the knot that this puller is attached to (derived from mode)
  public readonly knotProperty: Property<Knot | null>;

  // the position of this puller
  public readonly positionProperty: Vector2Property;

  // a classified position in the play area
  public readonly lastPlacementProperty: StringUnionProperty<'home' | 'knot'>;

  // emits an event when the puller is dropped
  public readonly droppedEmitter = new Emitter<[ 'mouse' | 'keyboard' ]>( {
    parameters: [ { valueType: 'string' } ]
  } );

  // emits an event when the puller starts being user controlled
  public readonly userControlledEmitter = new Emitter();

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

    const options = optionize<PullerOptions, SelfOptions, PhetioObjectOptions>()( {
      standOffsetX: 0,
      other: '',
      tandem: tandem,
      phetioFeatured: true,
      phetioState: false
    }, providedOptions );

    super( options );

    this.standOffsetX = options.standOffsetX;
    this.forceProperty = new NumberProperty( this.size === 'small' ? 50 :
                                             this.size === 'medium' ? 100 :
                                             150, {
      tandem: tandem.createTandem( 'forceProperty' ),
      phetioFeatured: true,
      numberType: 'FloatingPoint',
      units: 'N',
      range: this.size === 'small' ? new Range( 1, 50 ) :
             this.size === 'medium' ? new Range( 51, 100 ) :
             new Range( 101, 150 )
    } );

    // Initialize the mode property - this is the authoritative state
    this.modeProperty = new StringUnionProperty<PullerMode>( 'home', {
      validValues: [
        'home', 'grabbedOverHome',
        'grabbedOverLeftKnot1', 'grabbedOverLeftKnot2', 'grabbedOverLeftKnot3', 'grabbedOverLeftKnot4',
        'grabbedOverRightKnot1', 'grabbedOverRightKnot2', 'grabbedOverRightKnot3', 'grabbedOverRightKnot4',
        'leftKnot1', 'leftKnot2', 'leftKnot3', 'leftKnot4',
        'rightKnot1', 'rightKnot2', 'rightKnot3', 'rightKnot4'
      ],
      tandem: tandem.createTandem( 'modeProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'The current mode/state of the puller - authoritative source of truth'
    } );

    // Derived property: userControlled is true when mode starts with 'grabbedOver'
    this.userControlledProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'userControlledProperty' ),
      phetioReadOnly: true
    } );

    // Keep userControlled in sync with mode
    this.modeProperty.link( mode => {
      this.userControlledProperty.set( mode.startsWith( 'grabbedOver' ) );
    } );

    // Derived property: knotProperty is derived from mode
    this.knotProperty = new Property<Knot | null>( null, {
      tandem: tandem.createTandem( 'knotProperty' ),
      phetioValueType: NullableIO( Knot.KnotIO ),
      phetioFeatured: true
    } );

    // We'll set up the mode -> knot mapping after we have access to the model/knots

    this.positionProperty = new Vector2Property( new Vector2( x, y ), {
      tandem: tandem.createTandem( 'positionProperty' ),
      phetioReadOnly: true
    } );

    this.lastPlacementProperty = new StringUnionProperty( 'home', {
      validValues: [ 'home', 'knot' ],
      tandem: tandem.createTandem( 'lastPlacementProperty' ),
      phetioDocumentation: 'For PhET-iO internal use only, tracks the last placement of the puller for purposes of determining thresholds for where it should drop',
      phetioReadOnly: true
    } );

    // Move with the knot
    const updatePosition = ( knotX: number ) => {
      this.positionProperty.set( new Vector2( knotX, this.positionProperty.get().y ) );
    };

    // When the knot changes, wire up as a listener to the new knot
    this.knotProperty.link( ( newKnot, oldKnot ) => {

      //Unlink from the previous knot if there was one
      if ( oldKnot ) {
        oldKnot.positionProperty.unlink( updatePosition );
      }

      //Synchronize our position with the knot.
      if ( newKnot ) {
        newKnot.positionProperty.link( updatePosition );
      }
    } );
  }


  /**
   * Set up the knot mapping after the model is available.
   * This should be called from the model after all knots are created.
   */
  public setupKnotMapping( knots: Knot[] ): void {
    // Store reference for mode conversion
    this.knots = knots;
    // Create mapping from mode to knot
    const modeToKnot = ( mode: PullerMode ): Knot | null => {
      if ( mode === 'home' || mode.startsWith( 'grabbedOver' ) ) {
        return null;
      }

      // Extract knot info from mode (e.g., 'leftKnot1' -> left, index 0)
      const isLeft = mode.startsWith( 'left' );
      const knotIndex = parseInt( mode.slice( -1 ), 10 ) - 1; // Convert 1-based to 0-based

      const filteredKnots = knots.filter( knot => knot.type === ( isLeft ? 'blue' : 'red' ) );
      return filteredKnots[ knotIndex ] || null;
    };

    // Keep knotProperty in sync with mode
    this.modeProperty.link( mode => {
      this.knotProperty.set( modeToKnot( mode ) );
    } );
  }

  /**
   * Get the mode string for a given knot
   */
  public getModeForKnot( knot: Knot | null, grabbed = false ): PullerMode {
    if ( knot === null ) {
      return grabbed ? 'grabbedOverHome' : 'home';
    }

    // Get the knot index from the stored knots array (set up during setupKnotMapping)
    const sameTypeKnots = this.knots?.filter( k => k.type === knot.type ) || [];
    const knotIndex = sameTypeKnots.indexOf( knot );
    const knotNumber = knotIndex + 1; // Convert to 1-based indexing

    const isLeft = knot.type === 'blue';
    const side = isLeft ? 'left' : 'right';

    if ( grabbed ) {
      return `grabbedOver${side.charAt( 0 ).toUpperCase()}${side.slice( 1 )}Knot${knotNumber}` as PullerMode;
    }
    else {
      return `${side}Knot${knotNumber}` as PullerMode;
    }
  }

  // Store reference to knots for mode conversion
  private knots: Knot[] | null = null;

  /**
   * Reset the model by resetting all associated Properties.
   */
  public reset(): void {
    this.modeProperty.reset(); // This will trigger updates to derived properties
    this.positionProperty.reset();
    this.lastPlacementProperty.reset();
    // forceProperty is constant for each puller, no need to reset
  }

  /**
   * Disconnect from the current knot (used during grab)
   */
  public disconnect(): void {
    // In the new system, we just set mode to grabbed over current position
    const currentMode = this.modeProperty.get();
    if ( currentMode.startsWith( 'left' ) || currentMode.startsWith( 'right' ) ) {
      // Convert attached mode to grabbed mode
      const grabbedMode = `grabbedOver${currentMode.charAt( 0 ).toUpperCase()}${currentMode.slice( 1 )}` as PullerMode;
      this.modeProperty.set( grabbedMode );
    }
    else if ( currentMode === 'home' ) {
      this.modeProperty.set( 'grabbedOverHome' );
    }
  }
}

forcesAndMotionBasics.register( 'Puller', Puller );