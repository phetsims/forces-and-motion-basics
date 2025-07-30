// Copyright 2013-2025, University of Colorado Boulder

/**
 * PullerMode represents the various states a puller can be in during the simulation.
 * This includes home position, being grabbed (by pointer or keyboard), and being attached to a knot.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import Knot from './Knot.js';
import NetForceModel from './NetForceModel.js';

type PullerModeType = 'home' | 'grabbed' | 'attached';
type GrabMethod = 'pointer' | 'keyboard';

export default class PullerMode {
  public readonly type: PullerModeType;
  private readonly method?: GrabMethod;
  private readonly side?: 'left' | 'right';
  private readonly knot?: number;
  private readonly overHome?: boolean;

  private constructor(
    type: PullerModeType,
    options?: {
      method?: GrabMethod;
      side?: 'left' | 'right';
      knot?: number;
      overHome?: boolean;
    }
  ) {
    this.type = type;
    this.method = options?.method;
    this.side = options?.side;
    this.knot = options?.knot;
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

  public static keyboardGrabbedOverKnot( side: 'left' | 'right', knot: number ): PullerMode {
    return new PullerMode( 'grabbed', { method: 'keyboard', side: side, knot: knot } );
  }

  public static attachedToKnot( side: 'left' | 'right', knot: number ): PullerMode {
    return new PullerMode( 'attached', { side: side, knot: knot } );
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

  public getKnotIndex(): number | null {
    if ( this.type === 'attached' && this.side !== undefined && this.knot !== undefined ) {
      return this.side === 'left' ? this.knot : this.knot + 4;
    }
    else if ( this.type === 'grabbed' && this.method === 'keyboard' && !this.overHome && this.side !== undefined && this.knot !== undefined ) {
      return this.side === 'left' ? this.knot : this.knot + 4;
    }
    return null;
  }

  public isKeyboardGrabbedOverHome(): boolean {
    return this.type === 'grabbed' && this.method === 'keyboard' && this.overHome === true;
  }

  public isKeyboardGrabbedOverKnot(): boolean {
    return this.type === 'grabbed' && this.method === 'keyboard' && this.side !== undefined && this.knot !== undefined;
  }

  public getKeyboardGrabbedKnotSide(): 'left' | 'right' | null {
    if ( this.type === 'grabbed' && this.method === 'keyboard' && this.side !== undefined && this.knot !== undefined ) {
      return this.side;
    }
    return null;
  }

  public getKeyboardGrabbedKnotIndex(): number | null {
    if ( this.type === 'grabbed' && this.method === 'keyboard' && this.knot !== undefined && this.side !== undefined ) {
      return this.knot;
    }
    return null;
  }

  public getAttachedSide(): 'left' | 'right' | null {
    if ( this.type === 'attached' && this.side !== undefined ) {
      return this.side;
    }
    return null;
  }

  public getAttachedKnotIndex(): number | null {
    if ( this.type === 'attached' && this.knot !== undefined ) {
      return this.knot;
    }
    return null;
  }

  public equals( other: PullerMode ): boolean {
    return this.type === other.type &&
           this.method === other.method &&
           this.side === other.side &&
           this.knot === other.knot &&
           this.overHome === other.overHome;
  }

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
    else if ( this.type === 'grabbed' && this.method === 'keyboard' && this.side && this.knot !== undefined ) {
      return `keyboardGrabbedOver${this.side === 'left' ? 'Left' : 'Right'}Knot${this.knot}`;
    }
    else if ( this.type === 'attached' && this.side && this.knot !== undefined ) {
      return `attachedTo${this.side === 'left' ? 'Left' : 'Right'}Knot${this.knot}`;
    }
    return 'unknown';
  }

  public getKnot( model: NetForceModel ): Knot | null {
    const knotIndex = this.getKnotIndex();
    console.log( `PullerMode.getKnot: knotIndex=${knotIndex}` );
    if ( knotIndex !== null ) {
      return model.knots[ knotIndex ];
    }
    else {
      return null;
    }
  }
}

forcesAndMotionBasics.register( 'PullerMode', PullerMode );