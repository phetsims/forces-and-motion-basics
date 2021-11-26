// Copyright 2015-2020, University of Colorado Boulder

/**
 * Node representation of the movable cart in Forces and Motion: Basics net force screen.
 *
 * @author Jesse Greenberg
 */

import Range from '../../../../dot/js/Range.js';
import GaugeNode from '../../../../scenery-phet/js/GaugeNode.js';
import { Image } from '../../../../scenery/js/imports.js';
import cartImage from '../../../images/cart_png.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import forcesAndMotionBasicsStrings from '../../forcesAndMotionBasicsStrings.js';

const speedString = forcesAndMotionBasicsStrings.speed;

class CartNode extends Image {
  /**
   * @param {Cart} cart
   * @param {NumberProperty} speedProperty
   * @param {Property.<Boolean>} showSpeedProperty
   * @param {Tandem} tandem
   */
  constructor( cart, speedProperty, showSpeedProperty, tandem ) {
    // super constructor
    super( cartImage, {
      y: 221,
      tandem: tandem
    } );

    this.cart = cart;
    this.xPosition = this.cart.xProperty.get();

    // add a speedometer to the cart
    const speedRange = new Range( 0, 6 ); // speed range of the cart in m/s
    const speedometerNode = new GaugeNode( speedProperty, speedString, speedRange, {
      centerX: this.centerX,
      centerY: this.height / 2,
      radius: this.width * 0.25,
      majorTickLength: 8,
      minorTickLength: 4,
      majorTickLineWidth: 1,
      maxLabelWidthScale: 1.0,
      tandem: tandem.createTandem( 'speedometerNode' )
    } );

    showSpeedProperty.linkAttribute( speedometerNode, 'visible' );
    this.addChild( speedometerNode );
  }
}

forcesAndMotionBasics.register( 'CartNode', CartNode );
export default CartNode;