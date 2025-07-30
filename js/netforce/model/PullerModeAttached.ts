// Copyright 2013-2025, University of Colorado Boulder

/**
 * Attached puller mode - puller is attached to a knot on the rope
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import PullerMode from './PullerMode.js';

export default class PullerModeAttached extends PullerMode {
  public readonly type = 'attached';

  public constructor( public readonly side: 'left' | 'right', public readonly knot: number ) {
    super();
  }

  public isPointerGrabbed(): boolean {
    return false;
  }

  public isKeyboardGrabbed(): boolean {
    return false;
  }

  public getKnotIndex(): number | null {
    return this.side === 'left' ? this.knot : this.knot + 4;
  }

  public isKeyboardGrabbedOverHome(): boolean {
    return false;
  }

  public isKeyboardGrabbedOverKnot(): boolean {
    return false;
  }

  public getKeyboardGrabbedKnotSide(): 'left' | 'right' | null {
    return null;
  }

  public getKeyboardGrabbedKnotIndex(): number | null {
    return null;
  }

  public getAttachedSide(): 'left' | 'right' | null {
    return this.side;
  }

  public getAttachedKnotIndex(): number | null {
    return this.knot;
  }

  public toString(): string {
    return `attachedTo${this.side === 'left' ? 'Left' : 'Right'}Knot${this.knot}`;
  }
}

forcesAndMotionBasics.register( 'PullerModeAttached', PullerModeAttached );