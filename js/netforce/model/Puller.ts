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

// Define the puller state interface
export type PullerState = {
  location: 'toolbox' | 'rope';
  dragType: 'none' | 'mouse' | 'touch' | 'keyboard';
  attachedKnot: Knot | null;
  targetKnot: Knot | null; // For keyboard navigation during grab
  
  // Store origin for escape key functionality
  grabOrigin?: {
    location: 'toolbox' | 'rope';
    attachedKnot: Knot | null;
    position: Vector2;
  };
};

// Legacy mode type for backward compatibility during transition
export type PullerMode =
  | 'home'                           // In toolbox, not grabbed
  | 'mouseDragging'                  // Being dragged by mouse
  | 'touchDragging'                  // Being dragged by touch
  | 'keyboardGrabbedOverHome'        // Keyboard grabbed and positioned over home/toolbox
  | 'keyboardGrabbedOverLeftKnot1'   // Keyboard grabbed and positioned over left knot 1
  | 'keyboardGrabbedOverLeftKnot2'   // Keyboard grabbed and positioned over left knot 2
  | 'keyboardGrabbedOverLeftKnot3'   // Keyboard grabbed and positioned over left knot 3
  | 'keyboardGrabbedOverLeftKnot4'   // Keyboard grabbed and positioned over left knot 4
  | 'keyboardGrabbedOverRightKnot1'  // Keyboard grabbed and positioned over right knot 1
  | 'keyboardGrabbedOverRightKnot2'  // Keyboard grabbed and positioned over right knot 2
  | 'keyboardGrabbedOverRightKnot3'  // Keyboard grabbed and positioned over right knot 3
  | 'keyboardGrabbedOverRightKnot4'  // Keyboard grabbed and positioned over right knot 4
  | 'leftKnot1'                      // Attached to left knot 1
  | 'leftKnot2'                      // Attached to left knot 2
  | 'leftKnot3'                      // Attached to left knot 3
  | 'leftKnot4'                      // Attached to left knot 4
  | 'rightKnot1'                     // Attached to right knot 1
  | 'rightKnot2'                     // Attached to right knot 2
  | 'rightKnot3'                     // Attached to right knot 3
  | 'rightKnot4';                    // Attached to right knot 4

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
  
  // NEW: The simplified state representation
  // TODO: This is redundant, make it transient. see https://github.com/phetsims/forces-and-motion-basics/issues/379
  public readonly state: PullerState;

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
        'home', 'mouseDragging', 'touchDragging', 'keyboardGrabbedOverHome',
        'keyboardGrabbedOverLeftKnot1', 'keyboardGrabbedOverLeftKnot2', 'keyboardGrabbedOverLeftKnot3', 'keyboardGrabbedOverLeftKnot4',
        'keyboardGrabbedOverRightKnot1', 'keyboardGrabbedOverRightKnot2', 'keyboardGrabbedOverRightKnot3', 'keyboardGrabbedOverRightKnot4',
        'leftKnot1', 'leftKnot2', 'leftKnot3', 'leftKnot4',
        'rightKnot1', 'rightKnot2', 'rightKnot3', 'rightKnot4'
      ],
      tandem: tandem.createTandem( 'modeProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'The current mode/state of the puller - authoritative source of truth'
    } );
    
    // Initialize the simplified state
    this.state = {
      location: 'toolbox',
      dragType: 'none',
      attachedKnot: null,
      targetKnot: null
    };

    // Derived property: userControlled is true when mode starts with 'grabbedOver'
    this.userControlledProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'userControlledProperty' ),
      phetioReadOnly: true
    } );

    // Keep userControlled in sync with mode
    this.modeProperty.link( mode => {
      this.userControlledProperty.set( mode.startsWith( 'keyboardGrabbedOver' ) || mode === 'mouseDragging' || mode === 'touchDragging' );
      
      // Also update the new state object when mode changes
      this.updateStateFromMode( mode );
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
      if ( mode === 'home' || mode.startsWith( 'keyboardGrabbedOver' ) || mode === 'mouseDragging' || mode === 'touchDragging' ) {
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
      // Convert attached mode to keyboard grabbed mode
      const grabbedMode = `keyboardGrabbedOver${currentMode.charAt( 0 ).toUpperCase()}${currentMode.slice( 1 )}` as PullerMode;
      this.modeProperty.set( grabbedMode );
    }
    else if ( currentMode === 'home' ) {
      this.modeProperty.set( 'keyboardGrabbedOverHome' );
    }
  }

  /**
   * Update the new state object based on the legacy mode
   */
  private updateStateFromMode( mode: PullerMode ): void {
    // Parse the mode string to update state
    if ( mode === 'home' ) {
      this.state.location = 'toolbox';
      this.state.dragType = 'none';
      this.state.attachedKnot = null;
      this.state.targetKnot = null;
    }
    else if ( mode === 'mouseDragging' ) {
      this.state.dragType = 'mouse';
      // Don't change location - it stays whatever it was
    }
    else if ( mode === 'touchDragging' ) {
      this.state.dragType = 'touch';
      // Don't change location - it stays whatever it was
    }
    else if ( mode.startsWith( 'keyboardGrabbedOver' ) ) {
      this.state.dragType = 'keyboard';
      
      // Parse the target from the mode string
      if ( mode === 'keyboardGrabbedOverHome' ) {
        this.state.location = 'toolbox';
        this.state.targetKnot = null;
      }
      else {
        this.state.location = 'rope';
        // Extract knot info from mode (e.g., 'keyboardGrabbedOverLeftKnot1')
        const knotId = this.parseKnotFromMode( mode );
        this.state.targetKnot = knotId ? this.getKnotById( knotId ) : null;
      }
    }
    else if ( mode.startsWith( 'left' ) || mode.startsWith( 'right' ) ) {
      // Attached to a knot
      this.state.location = 'rope';
      this.state.dragType = 'none';
      const knotId = this.parseKnotFromMode( mode );
      this.state.attachedKnot = knotId ? this.getKnotById( knotId ) : null;
      this.state.targetKnot = null;
    }
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
   * Convert current state to legacy mode string (for backward compatibility)
   */
  public getModeFromState(): PullerMode {
    const { location, dragType, attachedKnot, targetKnot } = this.state;
    
    if ( dragType === 'mouse' ) { return 'mouseDragging'; }
    if ( dragType === 'touch' ) { return 'touchDragging'; }
    
    if ( location === 'toolbox' && dragType === 'none' ) { return 'home'; }
    
    if ( dragType === 'keyboard' ) {
      if ( location === 'toolbox' ) { return 'keyboardGrabbedOverHome'; }
      if ( targetKnot ) {
        return this.getModeForKnot( targetKnot, true );
      }
    }
    
    if ( location === 'rope' && attachedKnot && dragType === 'none' ) {
      return this.getModeForKnot( attachedKnot, false );
    }
    
    // Fallback
    return 'home';
  }

  /**
   * Simplified grab method using new state
   */
  public grab( dragType: 'mouse' | 'touch' | 'keyboard' ): void {
    // Store origin for escape functionality
    this.state.grabOrigin = {
      location: this.state.location,
      attachedKnot: this.state.attachedKnot,
      position: this.positionProperty.get().copy()
    };
    
    // Update state
    this.state.dragType = dragType;
    if ( this.state.attachedKnot ) {
      this.state.targetKnot = this.state.attachedKnot;
      this.state.attachedKnot = null;
    }
    
    // Sync to legacy mode
    this.modeProperty.set( this.getModeFromState() );
  }

  /**
   * Simplified drop method using new state
   */
  public drop(): void {
    // Clear drag state
    this.state.dragType = 'none';
    
    // If we have a target knot, attach to it
    if ( this.state.targetKnot ) {
      this.state.attachedKnot = this.state.targetKnot;
      this.state.location = 'rope';
      this.state.targetKnot = null;
    }
    else {
      // Return to toolbox
      this.state.location = 'toolbox';
      this.state.attachedKnot = null;
    }
    
    // Clear grab origin
    this.state.grabOrigin = undefined;
    
    // Sync to legacy mode
    this.modeProperty.set( this.getModeFromState() );
  }

  /**
   * Cancel grab and return to origin
   */
  public cancelGrab(): void {
    if ( this.state.grabOrigin ) {
      // Restore original state
      this.state.location = this.state.grabOrigin.location;
      this.state.attachedKnot = this.state.grabOrigin.attachedKnot;
      this.state.dragType = 'none';
      this.state.targetKnot = null;
      this.positionProperty.set( this.state.grabOrigin.position );
      
      // Clear grab origin
      this.state.grabOrigin = undefined;
      
      // Sync to legacy mode
      this.modeProperty.set( this.getModeFromState() );
    }
  }

  /**
   * Check if puller is currently grabbed/dragged
   */
  public isGrabbed(): boolean {
    return this.state.dragType !== 'none';
  }

  /**
   * Get the logical group this puller belongs to (for focus management)
   */
  public getLogicalGroup(): 'blue-toolbox' | 'red-toolbox' | 'blue-rope' | 'red-rope' | 'dragging' {
    // Only mouse/touch dragging should be in 'dragging' group
    // Keyboard grabbed pullers should remain in their logical location group for focus management
    if ( this.state.dragType === 'mouse' || this.state.dragType === 'touch' ) {
      return 'dragging';
    }
    
    const colorPrefix = this.type === 'blue' ? 'blue' : 'red';
    const locationSuffix = this.state.location === 'toolbox' ? 'toolbox' : 'rope';
    
    return `${colorPrefix}-${locationSuffix}`;
  }
}

forcesAndMotionBasics.register( 'Puller', Puller );