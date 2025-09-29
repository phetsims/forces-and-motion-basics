// Copyright 2025, University of Colorado Boulder

/**
 * Suffix for the pullers
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export const pullerSuffixValues = [ '1', '2', '' ] as const;
type PullerSuffix = ( typeof pullerSuffixValues )[ number ];

export default PullerSuffix;