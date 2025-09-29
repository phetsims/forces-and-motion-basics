// Copyright 2025, University of Colorado Boulder

/**
 * Enumeration for whether a puller is on the 'left' or 'right' side of the screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export const leftOrRightValues = [ 'left', 'right' ] as const;
type LeftOrRight = ( typeof leftOrRightValues )[ number ];

export default LeftOrRight;