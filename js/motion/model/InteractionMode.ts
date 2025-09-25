// Copyright 2025, University of Colorado Boulder

//REVIEW Self-referential definition does not tell me what an 'interaction mode' is.
//REVIEW 'alt-input/mouse' should probably be 'keyboard/pointer'.
/**
 * For alt-input/mouse interaction with items on the Motion screen, keep track of the interaction mode.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export const InteractionModes = [
  'inToolbox',
  'onStack',

  //REVIEW Why do we only need to know 'mouseGrabbed' (sic) for pointer input, but toolbox vs stack for keyboard grab?
  //REVIEW If this is new code, recommended to rename 'mouseGrabbed' to 'pointerGrabbed'.
  'mouseGrabbed',
  'keyboardGrabbedFromToolbox',
  'keyboardGrabbedFromStack',
  'animatingToToolbox',
  'animatingToStack'
] as const;

type ItemMode = ( typeof InteractionModes )[number];

export default ItemMode;