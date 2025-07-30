// Copyright 2013-2025, University of Colorado Boulder

/**
 * Keyboard grabbed over home puller mode - puller is being keyboard controlled and hovering over home
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import PullerMode from './PullerMode.js';

export default class PullerModeKeyboardGrabbedOverHome extends PullerMode {
  public readonly type = 'grabbed';
  public readonly method = 'keyboard';
  public readonly target = 'home';

  public isPointerGrabbed(): boolean {
    return false;
  }

  public isKeyboardGrabbed(): boolean {
    return true;
  }

  public getKnotIndex(): number | null {
    return null;
  }

  public isKeyboardGrabbedOverHome(): boolean {
    return true;
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
    return 'keyboardGrabbedOverHome';
  }
}

forcesAndMotionBasics.register( 'PullerModeKeyboardGrabbedOverHome', PullerModeKeyboardGrabbedOverHome );