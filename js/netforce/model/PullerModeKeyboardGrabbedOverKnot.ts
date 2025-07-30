// Copyright 2013-2025, University of Colorado Boulder

/**
 * Keyboard grabbed over knot puller mode - puller is being keyboard controlled and hovering over a knot
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import PullerMode from './PullerMode.js';

export default class PullerModeKeyboardGrabbedOverKnot extends PullerMode {
  public readonly type = 'grabbed';
  public readonly method = 'keyboard';
  public readonly target: { side: 'left' | 'right'; knot: number };

  public constructor( side: 'left' | 'right', knot: number ) {
    super();
    this.target = { side: side, knot: knot };
  }

  public isPointerGrabbed(): boolean {
    return false;
  }

  public isKeyboardGrabbed(): boolean {
    return true;
  }

  public getKnotIndex(): number | null {
    return this.target.side === 'left' ? this.target.knot : this.target.knot + 4;
  }

  public isKeyboardGrabbedOverHome(): boolean {
    return false;
  }

  public isKeyboardGrabbedOverKnot(): boolean {
    return true;
  }

  public getKeyboardGrabbedKnotSide(): 'left' | 'right' | null {
    return this.target.side;
  }

  public getKeyboardGrabbedKnotIndex(): number | null {
    return this.target.knot;
  }

  public getAttachedSide(): 'left' | 'right' | null {
    return null;
  }

  public getAttachedKnotIndex(): number | null {
    return null;
  }

  public toString(): string {
    return `keyboardGrabbedOver${this.target.side === 'left' ? 'Left' : 'Right'}Knot${this.target.knot}`;
  }
}

forcesAndMotionBasics.register( 'PullerModeKeyboardGrabbedOverKnot', PullerModeKeyboardGrabbedOverKnot );