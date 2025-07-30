// Copyright 2013-2025, University of Colorado Boulder

/**
 * Factory class for creating puller modes safely
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import PullerModeHome from './PullerModeHome.js';
import PullerModePointerGrabbed from './PullerModePointerGrabbed.js';
import PullerModeKeyboardGrabbedOverHome from './PullerModeKeyboardGrabbedOverHome.js';
import PullerModeKeyboardGrabbedOverKnot from './PullerModeKeyboardGrabbedOverKnot.js';
import PullerModeAttached from './PullerModeAttached.js';

export default class PullerModeFactory {
  public static home(): PullerModeHome {
    return new PullerModeHome();
  }

  public static pointerGrabbed(): PullerModePointerGrabbed {
    return new PullerModePointerGrabbed();
  }

  public static keyboardGrabbedOverHome(): PullerModeKeyboardGrabbedOverHome {
    return new PullerModeKeyboardGrabbedOverHome();
  }

  public static keyboardGrabbedOverKnot( side: 'left' | 'right', knot: number ): PullerModeKeyboardGrabbedOverKnot {
    return new PullerModeKeyboardGrabbedOverKnot( side, knot );
  }

  public static attachedToKnot( side: 'left' | 'right', knot: number ): PullerModeAttached {
    return new PullerModeAttached( side, knot );
  }
}

forcesAndMotionBasics.register( 'PullerModeFactory', PullerModeFactory );