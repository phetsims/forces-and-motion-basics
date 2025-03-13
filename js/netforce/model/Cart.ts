// Copyright 2013-2024, University of Colorado Boulder

/**
 * Model for the cart, which has a position (x) and velocity (v).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Range from '../../../../dot/js/Range.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

export default class Cart {

  // 1-D x position of the cart
  public readonly xProperty: NumberProperty;

  // 1-D velocity in MKS
  public readonly vProperty: NumberProperty;

  // width from the center of the cart to the wheels, used to determine when a wheel touches a game stopper in meters
  public readonly widthToWheel = 55;

  public constructor( tandem: Tandem ) {
    this.xProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'xProperty' ),
      phetioReadOnly: true,
      units: 'm',
      range: new Range( -403, 403 )
    } );

    this.vProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'vProperty' ),
      phetioReadOnly: true,
      units: 'm/s',
      range: new Range( -6, 6 )
    } );
  }

  /**
   * Reset the Properties associated with this model.
   */
  public reset(): void {
    this.xProperty.reset();
    this.vProperty.reset();
  }
}

forcesAndMotionBasics.register( 'Cart', Cart );