// Copyright 2025, University of Colorado Boulder

/**
 * Enumeration for the size of the pullers, which also determines their force.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export const pullerSizeValues = [ 'small', 'medium', 'large' ] as const;
type PullerSize = ( typeof pullerSizeValues )[ number ];

export default PullerSize;