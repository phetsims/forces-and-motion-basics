// Copyright 2013-2020, University of Colorado Boulder

/**
 * Model for the cart, which has a position (x) and velocity (v).
 *
 * @author Sam Reid
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Range from '../../../../dot/js/Range.js';
import inherit from '../../../../phet-core/js/inherit.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

/**
 * @param {Tandem} tandem
 * @constructor
 */
function Cart( tandem ) {

  // @public {number} - 1-D x position of the cart
  this.xProperty = new NumberProperty( 0, {
    tandem: tandem.createTandem( 'xProperty' ),
    units: 'meters',
    range: new Range( -403, 403 )
  } );

  // @public {number} - 1-D velocity in MKS
  this.vProperty = new NumberProperty( 0, {
    tandem: tandem.createTandem( 'vProperty' ),
    units: 'meters/second',
    range: new Range( -6, 6 )
  } );

  // @public (read-only) - width from the center of the cart to the wheels, used to determine when a wheel touches
  // a game stopper in meters
  this.widthToWheel = 55;
}

forcesAndMotionBasics.register( 'Cart', Cart );

inherit( Object, Cart, {

  /**
   * Reset the Properties associated with this model.
   * @public
   */
  reset: function() {
    this.xProperty.reset();
    this.vProperty.reset();
  }
} );

export default Cart;
