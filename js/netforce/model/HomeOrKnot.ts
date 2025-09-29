// Copyright 2025, University of Colorado Boulder

/**
 * Enumeration for whether a puller is at 'home' or at a 'knot'.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export const homeOrKnotValues = [ 'home', 'knot' ] as const;
type HomeOrKnot = ( typeof homeOrKnotValues )[ number ];

export default HomeOrKnot;