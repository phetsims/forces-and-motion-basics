// Copyright 2025, University of Colorado Boulder

/**
 * PullerMode represents the various states a puller can be in during the simulation.
 * This includes home position, being grabbed (by pointer or keyboard), and being attached to a knot.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import Knot from './Knot.js';
import NetForceModel from './NetForceModel.js';

type PullerModeType = 'home' | 'grabbed' | 'attached';
type GrabMethod = 'pointer' | 'keyboard';

type PullerModeOptions = {
  method?: GrabMethod;
  knotIndex?: number;
  overHome?: boolean;
};

export default class PullerMode {
  public readonly type: PullerModeType;
  private readonly method?: GrabMethod;
  private readonly knotIndex?: number;
  private readonly overHome?: boolean;

  private constructor( type: PullerModeType, options?: PullerModeOptions ) {
    this.type = type;
    this.method = options?.method;
    this.knotIndex = options?.knotIndex;
    this.overHome = options?.overHome;
  }

  public static home(): PullerMode {
    return new PullerMode( 'home' );
  }

  public static pointerGrabbed(): PullerMode {
    return new PullerMode( 'grabbed', { method: 'pointer' } );
  }

  public static keyboardGrabbedOverHome(): PullerMode {
    return new PullerMode( 'grabbed', { method: 'keyboard', overHome: true } );
  }

  public static keyboardGrabbedOverKnot( knotIndex: number ): PullerMode {
    affirm( knotIndex >= 0 && knotIndex <= 7, `knotIndex must be 0-7 for absolute indexing, got ${knotIndex}` );
    return new PullerMode( 'grabbed', { method: 'keyboard', knotIndex: knotIndex } );
  }

  public static attachedToKnot( knotIndex: number ): PullerMode {
    affirm( knotIndex >= 0 && knotIndex <= 7, `knotIndex must be 0-7 for absolute indexing, got ${knotIndex}` );
    return new PullerMode( 'attached', { knotIndex: knotIndex } );
  }

  public isHome(): boolean {
    return this.type === 'home';
  }

  public isGrabbed(): boolean {
    return this.type === 'grabbed';
  }

  public isAttached(): boolean {
    return this.type === 'attached';
  }

  public isUserControlled(): boolean {
    return this.type === 'grabbed';
  }

  public isPointerGrabbed(): boolean {
    return this.type === 'grabbed' && this.method === 'pointer';
  }

  public isKeyboardGrabbed(): boolean {
    return this.type === 'grabbed' && this.method === 'keyboard';
  }

  public isKeyboardGrabbedOverHome(): boolean {
    return this.type === 'grabbed' && this.method === 'keyboard' && this.overHome === true;
  }

  public isKeyboardGrabbedOverKnot(): boolean {
    return this.type === 'grabbed' && this.method === 'keyboard' && this.knotIndex !== undefined;
  }

  public isKeyboardGrabbedOverSpecificKnot( knot: Knot, model: NetForceModel ): boolean {
    if ( !this.isKeyboardGrabbedOverKnot() ) {
      return false;
    }

    // Get the knot from the mode's stored index
    const modeKnot = this.getKnot( model );

    // Check if it's the same knot
    return modeKnot === knot;
  }

  public getKeyboardGrabbedKnotIndex(): number | null {
    if ( this.type === 'grabbed' && this.method === 'keyboard' && this.knotIndex !== undefined ) {
      return this.knotIndex;
    }
    return null;
  }

  public getAttachedKnotIndex(): number | null {
    if ( this.type === 'attached' && this.knotIndex !== undefined ) {
      return this.knotIndex;
    }
    return null;
  }

  public equals( other: PullerMode ): boolean {
    return this.type === other.type &&
           this.method === other.method &&
           this.knotIndex === other.knotIndex &&
           this.overHome === other.overHome;
  }

  public getKnot( model: NetForceModel ): Knot | null {
    const knotIndex = this.knotIndex;

    if ( knotIndex !== null && knotIndex !== undefined ) {
      affirm( knotIndex >= 0 && knotIndex <= 7, `knotIndex must be 0-7 for absolute indexing, got ${knotIndex}` );
      const knot = model.knots[ knotIndex ];
      affirm( knot !== undefined, `Knot index ${knotIndex} is out of bounds` );
      return knot;
    }
    else {
      return null;
    }
  }

  public static readonly PullerModeIO = new IOType<PullerMode, PullerModeState>( 'PullerModeIO', {
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
        return PullerMode.attachedToKnot( stateObject.knot );
      }
    }
  } );
}

type PullerModeState = {
  knot: number | null;
};


forcesAndMotionBasics.register( 'PullerMode', PullerMode );