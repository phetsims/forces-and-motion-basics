// Copyright 2013-2024, University of Colorado Boulder

/**
 * Model for the cart, which has a position (x) and velocity (v).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Range from '../../../../dot/js/Range.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

class Cart {
  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    // @public {number} - 1-D x position of the cart
    this.xProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'xProperty' ),
      units: 'm',
      range: new Range( -403, 403 )
    } );

    // @public {number} - 1-D velocity in MKS
    this.vProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'vProperty' ),
      units: 'm/s',
      range: new Range( -6, 6 )
    } );

    // @public (read-only) - width from the center of the cart to the wheels, used to determine when a wheel touches
    // a game stopper in meters
    this.widthToWheel = 55;
  }


  /**
   * Reset the Properties associated with this model.
   * @public
   */
  reset() {
    this.xProperty.reset();
    this.vProperty.reset();
  }
}

forcesAndMotionBasics.register( 'Cart', Cart );

export default Cart;