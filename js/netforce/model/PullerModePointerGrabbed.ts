// Copyright 2013-2025, University of Colorado Boulder

/**
 * Pointer grabbed puller mode - puller is being dragged by mouse/touch
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import PullerMode from './PullerMode.js';

export default class PullerModePointerGrabbed extends PullerMode {
  public readonly type = 'grabbed';
  public readonly method = 'pointer';

  public isPointerGrabbed(): boolean {
    return true;
  }

  public isKeyboardGrabbed(): boolean {
    return false;
  }

  public getKnotIndex(): number | null {
    return null;
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
    return null;
  }

  public getAttachedKnotIndex(): number | null {
    return null;
  }

  public toString(): string {
    return 'pointerGrabbed';
  }
}

forcesAndMotionBasics.register( 'PullerModePointerGrabbed', PullerModePointerGrabbed );