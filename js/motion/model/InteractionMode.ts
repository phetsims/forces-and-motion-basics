// Copyright 2025, University of Colorado Boulder

/**
 * Each Item has a mode that represents its current type of interaction/animation/placement.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export const InteractionModes = [
  'inToolbox',
  'onStack',

  //REVIEW Why do we only need to know 'mouseGrabbed' (sic) for pointer input, but toolbox vs stack for keyboard grab?
  'pointerGrabbed',
  'keyboardGrabbedFromToolbox',
  'keyboardGrabbedFromStack',
  'animatingToToolbox',
  'animatingToStack'
] as const;

type ItemMode = ( typeof InteractionModes )[number];

export default ItemMode;