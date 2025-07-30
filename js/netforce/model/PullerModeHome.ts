// Copyright 2013-2025, University of Colorado Boulder

/**
 * Home puller mode - puller is in the toolbox/home position
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import PullerMode from './PullerMode.js';

export default class PullerModeHome extends PullerMode {
  public readonly type = 'home';

  public isPointerGrabbed(): boolean {
    return false;
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
    return 'home';
  }
}

forcesAndMotionBasics.register( 'PullerModeHome', PullerModeHome );