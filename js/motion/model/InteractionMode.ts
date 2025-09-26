// Copyright 2025, University of Colorado Boulder

/**
 * Each Item has a mode that represents its current type of interaction/animation/placement.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export const InteractionModes = [
  'inToolbox',
  'onStack',

  // Keep track of where it was grabbed from, for when escape is pressed, and it returns to its origin
  'keyboardGrabbedFromToolbox',
  'keyboardGrabbedFromStack',

  // Always return to the closest point, and hence does not need to know whether it came from toolbox or stack
  'pointerGrabbed',

  'animatingToToolbox',
  'animatingToStack'
] as const;

type ItemMode = ( typeof InteractionModes )[number];

export default ItemMode;