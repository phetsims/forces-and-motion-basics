// Copyright 2013-2025, University of Colorado Boulder

/**
 * Model for the red/blue pullers which can be dragged to the rope, and exert a force on the rope.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
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
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import Knot from './Knot.js';

// Legacy mode type for backward compatibility during transition
export type PullerMode =
  | 'home'                           // In toolbox, not grabbed
  | 'pointerGrabbed'                 // Being dragged by mouse
  | 'keyboardGrabbedOverHome'        // Keyboard grabbed and positioned over home/toolbox
  | 'keyboardGrabbedOverLeftKnot1'   // Keyboard grabbed and positioned over left knot 1
  | 'keyboardGrabbedOverLeftKnot2'   // Keyboard grabbed and positioned over left knot 2
  | 'keyboardGrabbedOverLeftKnot3'   // Keyboard grabbed and positioned over left knot 3
  | 'keyboardGrabbedOverLeftKnot4'   // Keyboard grabbed and positioned over left knot 4
  | 'keyboardGrabbedOverRightKnot1'  // Keyboard grabbed and positioned over right knot 1
  | 'keyboardGrabbedOverRightKnot2'  // Keyboard grabbed and positioned over right knot 2
  | 'keyboardGrabbedOverRightKnot3'  // Keyboard grabbed and positioned over right knot 3
  | 'keyboardGrabbedOverRightKnot4'  // Keyboard grabbed and positioned over right knot 4
  | 'attachedToLeftKnot1'            // Attached to left knot 1
  | 'attachedToLeftKnot2'            // Attached to left knot 2
  | 'attachedToLeftKnot3'            // Attached to left knot 3
  | 'attachedToLeftKnot4'            // Attached to left knot 4
  | 'attachedToRightKnot1'           // Attached to right knot 1
  | 'attachedToRightKnot2'           // Attached to right knot 2
  | 'attachedToRightKnot3'           // Attached to right knot 3
  | 'attachedToRightKnot4';          // Attached to right knot 4

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
  public readonly userControlledProperty: TReadOnlyProperty<boolean>;

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
        'home', 'pointerGrabbed', 'keyboardGrabbedOverHome',
        'keyboardGrabbedOverLeftKnot1', 'keyboardGrabbedOverLeftKnot2', 'keyboardGrabbedOverLeftKnot3', 'keyboardGrabbedOverLeftKnot4',
        'keyboardGrabbedOverRightKnot1', 'keyboardGrabbedOverRightKnot2', 'keyboardGrabbedOverRightKnot3', 'keyboardGrabbedOverRightKnot4',
        'attachedToLeftKnot1', 'attachedToLeftKnot2', 'attachedToLeftKnot3', 'attachedToLeftKnot4',
        'attachedToRightKnot1', 'attachedToRightKnot2', 'attachedToRightKnot3', 'attachedToRightKnot4'
      ],
      tandem: tandem.createTandem( 'modeProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'The current mode/state of the puller - authoritative source of truth'
    } );

    // Derived property: userControlled is true when mode starts with 'grabbedOver'
    this.userControlledProperty = new DerivedProperty( [ this.modeProperty ], mode => {
      return mode.startsWith( 'keyboardGrabbedOver' ) || mode === 'pointerGrabbed';
    }, {
      tandem: tandem.createTandem( 'userControlledProperty' ),
      phetioValueType: BooleanIO
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
      phetioReadOnly: true,
      valueComparisonStrategy: 'equalsFunction'
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
      if ( mode === 'home' || mode.startsWith( 'keyboardGrabbedOver' ) || mode === 'pointerGrabbed' ) {
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
      return grabbed ? 'keyboardGrabbedOverHome' : 'home';
    }

    // Get the knot index from the stored knots array (set up during setupKnotMapping)
    const sameTypeKnots = this.knots?.filter( k => k.type === knot.type ) || [];
    const knotIndex = sameTypeKnots.indexOf( knot );
    const knotNumber = knotIndex + 1; // Convert to 1-based indexing

    const isLeft = knot.type === 'blue';
    const side = isLeft ? 'left' : 'right';

    if ( grabbed ) {
      return `keyboardGrabbedOver${side.charAt( 0 ).toUpperCase()}${side.slice( 1 )}Knot${knotNumber}` as PullerMode;
    }
    else {
      return `attachedTo${side.charAt( 0 ).toUpperCase()}${side.slice( 1 )}Knot${knotNumber}` as PullerMode;
    }
  }

  // Store reference to knots for mode conversion
  private knots: Knot[] | null = null;

  // Grab origin storage for cancel functionality
  private grabOrigin: {
    mode: PullerMode;
    position: Vector2;
  } | null = null;

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
   * Disconnect from the current knot (used during mouse/touch grab)
   */
  public disconnect(): void {
    // For mouse/touch grabs, the mode is already set to 'pointerGrabbed'
    // No additional action needed - the knotProperty will be derived as null
  }

  /**
   * Parse knot identifier from mode string
   */
  private parseKnotFromMode( mode: string ): { side: 'left' | 'right'; index: number } | null {
    const match = mode.match( /(left|right)Knot(\d+)/i );
    if ( match ) {
      return {
        side: match[ 1 ].toLowerCase() as 'left' | 'right',
        index: parseInt( match[ 2 ], 10 ) - 1 // Convert to 0-based
      };
    }
    return null;
  }

  /**
   * Get knot by its identifier
   */
  private getKnotById( id: { side: 'left' | 'right'; index: number } ): Knot | null {
    if ( !this.knots ) { return null; }

    const sideKnots = this.knots.filter( k =>
      k.type === ( id.side === 'left' ? 'blue' : 'red' )
    );
    return sideKnots[ id.index ] || null;
  }

  /**
   * Store current state as grab origin for potential cancel operation
   */
  public storeGrabOrigin(): void {
    this.grabOrigin = {
      mode: this.modeProperty.get(),
      position: this.positionProperty.get().copy()
    };
  }

  /**
   * Clear grab origin after successful drop
   */
  public clearGrabOrigin(): void {
    this.grabOrigin = null;
  }

  /**
   * Grab method for mouse/touch interactions
   */
  public grab( dragType: 'mouse' | 'touch' | 'keyboard' ): void {
    // Store origin for potential cancel
    this.storeGrabOrigin();

    if ( dragType === 'mouse' || dragType === 'touch' ) {
      // For mouse/touch, set to pointerGrabbed and disconnect from knot
      this.modeProperty.set( 'pointerGrabbed' );

      // The disconnect will happen in the drag listener
    }
    // For keyboard grabs, the mode transition is handled by PullerKeyboardSupport
  }

  /**
   * Drop method - determine final position based on current position
   */
  public drop(): void {
    const currentMode = this.modeProperty.get();

    if ( currentMode === 'pointerGrabbed' ) {
      // For mouse/touch drops, determine destination based on position
      // This will be handled by the drag listener in PullerNode
      // The drag listener will call dropAtKnot() or dropAtHome()
      return;
    }

    // For keyboard drops, the mode is already set by PullerKeyboardSupport
    this.clearGrabOrigin();
  }

  /**
   * Drop at a specific knot (called by mouse/touch drag listener)
   */
  public dropAtKnot( knot: Knot ): void {
    const newMode = this.getModeForKnot( knot, false );
    this.modeProperty.set( newMode );
    this.lastPlacementProperty.set( 'knot' );
    this.clearGrabOrigin();
  }

  /**
   * Drop at home/toolbox (called by mouse/touch drag listener)
   */
  public dropAtHome(): void {
    this.modeProperty.set( 'home' );
    this.lastPlacementProperty.set( 'home' );
    this.clearGrabOrigin();
  }

  /**
   * Cancel grab and return to origin
   */
  public cancelGrab(): void {
    if ( this.grabOrigin ) {
      // Restore original state
      this.modeProperty.set( this.grabOrigin.mode );
      this.positionProperty.set( this.grabOrigin.position );

      // Clear grab origin
      this.grabOrigin = null;
    }
  }

  /**
   * Check if puller is currently grabbed/dragged
   */
  public isGrabbed(): boolean {
    return this.modeProperty.value.includes( 'Grabbed' );
  }
}

forcesAndMotionBasics.register( 'Puller', Puller );