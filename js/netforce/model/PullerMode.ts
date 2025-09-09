// Copyright 2025, University of Colorado Boulder

/**
 * PullerMode represents the various states a puller can be in during the simulation.
 * This includes home position, being grabbed (by pointer or keyboard), and being attached to a knot.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import Knot from './Knot.js';
import NetForceModel from './NetForceModel.js';

type PullerModeType = 'home' | 'grabbed' | 'attached';
type GrabMethod = 'pointer' | 'keyboard';

export default class PullerMode {
  public readonly type: PullerModeType;
  private readonly method?: GrabMethod;
  private readonly knotIndex?: number;
  private readonly overHome?: boolean;

  private constructor(
    type: PullerModeType,

    // TODO: Options type, see https://github.com/phetsims/forces-and-motion-basics/issues/431
    options?: {
      method?: GrabMethod;
      knotIndex?: number;
      overHome?: boolean;
    }
  ) {
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

  public getKeyboardGrabbedKnotSide(): 'left' | 'right' | null {
    if ( this.type === 'grabbed' && this.method === 'keyboard' && this.knotIndex !== undefined ) {
      return this.knotIndex <= 3 ? 'left' : 'right';
    }
    return null;
  }

  public getKeyboardGrabbedKnotIndex(): number | null {
    if ( this.type === 'grabbed' && this.method === 'keyboard' && this.knotIndex !== undefined ) {
      return this.knotIndex;
    }
    return null;
  }

  public getAttachedSide(): 'left' | 'right' | null {
    if ( this.type === 'attached' && this.knotIndex !== undefined ) {
      return this.knotIndex <= 3 ? 'left' : 'right';
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

  // TODO: https://github.com/phetsims/forces-and-motion-basics/issues/431 describe how this is used
  public toString(): string {
    if ( this.type === 'home' ) {
      return 'home';
    }
    else if ( this.type === 'grabbed' && this.method === 'pointer' ) {
      return 'pointerGrabbed';
    }
    else if ( this.type === 'grabbed' && this.method === 'keyboard' && this.overHome ) {
      return 'keyboardGrabbedOverHome';
    }
    else if ( this.type === 'grabbed' && this.method === 'keyboard' && this.knotIndex !== undefined ) {
      const side = this.knotIndex <= 3 ? 'Left' : 'Right';
      return `keyboardGrabbedOver${side}Knot${this.knotIndex}`;
    }
    else if ( this.type === 'attached' && this.knotIndex !== undefined ) {
      const side = this.knotIndex <= 3 ? 'Left' : 'Right';
      return `attachedTo${side}Knot${this.knotIndex}`;
    }
    return 'unknown';
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
}

forcesAndMotionBasics.register( 'PullerMode', PullerMode );