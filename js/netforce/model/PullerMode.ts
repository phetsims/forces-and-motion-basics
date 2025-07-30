// Copyright 2013-2025, University of Colorado Boulder

/**
 * Abstract base class for puller modes
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import Knot from './Knot.js';
import NetForceModel from './NetForceModel.js';

export default abstract class PullerMode {
  public abstract readonly type: string;

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

  public abstract isPointerGrabbed(): boolean;

  public abstract isKeyboardGrabbed(): boolean;

  public abstract getKnotIndex(): number | null;

  public abstract isKeyboardGrabbedOverHome(): boolean;

  public abstract isKeyboardGrabbedOverKnot(): boolean;

  public abstract getKeyboardGrabbedKnotSide(): 'left' | 'right' | null;

  public abstract getKeyboardGrabbedKnotIndex(): number | null;

  public abstract getAttachedSide(): 'left' | 'right' | null;

  public abstract getAttachedKnotIndex(): number | null;

  public equals( other: PullerMode ): boolean {
    return JSON.stringify( this ) === JSON.stringify( other );
  }

  public abstract toString(): string;

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