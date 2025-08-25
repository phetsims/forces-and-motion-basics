// Copyright 2025, University of Colorado Boulder

/**
 * Unified mode representing the complete state of an item
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export const InteractionModes = [
  'inLeftToolbox',
  'inRightToolbox',
  'onStack',
  'mouseGrabbed',
  'keyboardGrabbedFromToolbox',
  'keyboardGrabbedFromStack',
  'animatingToToolbox',
  'animatingToStack'
] as const;

type ItemMode = ( typeof InteractionModes )[number];

export default ItemMode;