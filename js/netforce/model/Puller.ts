// Copyright 2013-2025, University of Colorado Boulder

/**
 * Model for the red/blue pullers which can be dragged to the rope, and exert a force on the rope.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

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
import IOType from '../../../../tandem/js/types/IOType.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import Knot from './Knot.js';
import NetForceModel from './NetForceModel.js';

import PullerMode from './PullerMode.js';

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
  public readonly modeProperty: Property<PullerMode>;

  // the position of this puller
  public readonly positionProperty: Vector2Property;

  // a classified position in the play area
  public readonly lastPlacementProperty: StringUnionProperty<'home' | 'knot'>;

  /**
   * @param model the NetForceModel that this puller is associated with, for context
   * @param x initial x-coordinate (in meters)
   * @param y initial y-coordinate (in meters)
   * @param type 'red'|'blue'
   * @param size 'small'|'medium'|'large'
   * @param dragOffsetX horizontal offset (in stage coordinates) to offset the puller image when pulling
   * @param tandem
   * @param providedOptions
   */
  public constructor( public readonly model: NetForceModel,
                      x: number, y: number,
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
    this.modeProperty = new Property<PullerMode>( PullerMode.home(), {
      valueType: PullerMode,
      tandem: tandem.createTandem( 'modeProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'The current mode/state of the puller - authoritative source of truth',
      phetioValueType: PullerModeIO,
      valueComparisonStrategy: 'equalsFunction'
    } );

    this.positionProperty = new Vector2Property( new Vector2( x, y ), {
      tandem: tandem.createTandem( 'positionProperty' ),
      phetioReadOnly: true,
      valueComparisonStrategy: 'equalsFunction',
      reentrant: true
    } );

    this.lastPlacementProperty = new StringUnionProperty( 'home', {
      validValues: [ 'home', 'knot' ],
      tandem: tandem.createTandem( 'lastPlacementProperty' ),
      phetioDocumentation: 'For PhET-iO internal use only, tracks the last placement of the puller for purposes of determining thresholds for where it should drop',
      phetioReadOnly: true
    } );

    // When the knot changes, wire up as a listener to the new knot
    this.modeProperty.link( ( mode, oldMode ) => {
      console.log( 'puller mode: ' + this.modeProperty.value.toString() );

      const knot = mode.getKnot( model );

      // Synchronize our position with the knot.
      if ( knot ) {
        this.positionProperty.value = new Vector2( knot.positionProperty.get(), knot.y );
      }

      if ( mode.isHome() ) {
        this.positionProperty.reset();
      }
    } );
  }

  public step(): void {
    if ( this.getKnot() ) {
      // If attached to a knot, update position to match the knot's position
      const knot = this.getKnot();
      if ( knot ) {
        this.positionProperty.set( new Vector2( knot.positionProperty.get(), knot.y ) );
      }
    }
  }

  /**
   * Get the mode for attachment to a given knot
   */
  public getModeForKnot( knot: Knot | null ): PullerMode {
    if ( knot === null ) {
      return PullerMode.home();
    }

    const sameTypeKnots = this.model.knots.filter( k => this.type === knot.type ) || [];
    const knotIndex = sameTypeKnots.indexOf( knot );
    const side = knot.type === 'blue' ? 'left' : 'right';

    return PullerMode.attachedToKnot( side, knotIndex );
  }

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
      this.modeProperty.set( PullerMode.pointerGrabbed() );

      // The disconnect will happen in the drag listener
    }
    // For keyboard grabs, the mode transition is handled by PullerKeyboardSupport
  }

  /**
   * Drop method - determine final position based on current position
   */
  public drop(): void {
    const currentMode = this.modeProperty.get();

    if ( currentMode.isPointerGrabbed() ) {
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
    const newMode = this.getModeForKnot( knot );
    this.modeProperty.set( newMode );
    this.lastPlacementProperty.set( 'knot' );
    this.clearGrabOrigin();
  }

  /**
   * Drop at home/toolbox (called by mouse/touch drag listener)
   */
  public dropAtHome(): void {
    this.modeProperty.set( PullerMode.home() );
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
    return this.modeProperty.value.isGrabbed();
  }

  public getKnot(): Knot | null {
    return this.modeProperty.value.getKnot( this.model );
  }
}

type PullerModeState = {
  knot: number | null;
};

const PullerModeIO = new IOType<PullerMode, PullerModeState>( 'PullerModeIO', {
  valueType: PullerMode,
  stateSchema: {
    knot: NullableIO( NumberIO )
  },
  toStateObject: pullerMode => {
    return {
      knot: pullerMode.getAttachedKnotIndex()
    };
  },
  fromStateObject: stateObject => {
    if ( stateObject.knot === null ) {
      return PullerMode.home();
    }
    else {
      return PullerMode.attachedToKnot( stateObject.knot <= 3 ? 'left' : 'right', stateObject.knot );
    }
  }
} );

forcesAndMotionBasics.register( 'Puller', Puller );