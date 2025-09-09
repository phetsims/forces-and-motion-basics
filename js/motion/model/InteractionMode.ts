// Copyright 2025, University of Colorado Boulder

/**
 * For alt-input/mouse interaction with items on the motion screen, keep track of the interaction mode.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export const InteractionModes = [
  'inToolbox',
  'onStack',
  'mouseGrabbed',
  'keyboardGrabbedFromToolbox',
  'keyboardGrabbedFromStack',
  'animatingToToolbox',
  'animatingToStack'
] as const;

type ItemMode = ( typeof InteractionModes )[number];

export default ItemMode;