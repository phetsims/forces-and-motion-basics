// Copyright 2025, University of Colorado Boulder

/**
 * Enumeration for whether a puller is 'red' or 'blue'. Note the ultimate view setting is also controlled by a user preference.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

export const redOrBlueValues = [ 'red', 'blue' ] as const;
type RedOrBlue = ( typeof redOrBlueValues )[ number ];

export default RedOrBlue;