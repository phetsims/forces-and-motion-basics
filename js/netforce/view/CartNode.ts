// Copyright 2015-2024, University of Colorado Boulder

/**
 * Node representation of the movable cart in Forces and Motion: Basics net force screen.
 *
 * @author Jesse Greenberg
 */

import Range from '../../../../dot/js/Range.js';
import GaugeNode from '../../../../scenery-phet/js/GaugeNode.js';
import { Image } from '../../../../scenery/js/imports.js';
import cart_svg from '../../../images/cart_svg.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';
import Cart from '../model/Cart.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';

const speedStringProperty = ForcesAndMotionBasicsStrings.speedStringProperty;

class CartNode extends Image {
  public readonly xPosition: number;

  public constructor( public readonly cart: Cart, speedProperty: NumberProperty, showSpeedProperty: TReadOnlyProperty<boolean>, tandem: Tandem ) {
    super( cart_svg, {
      y: 221,
      tandem: tandem
    } );

    this.xPosition = this.cart.xProperty.get();

    // add a speedometer to the cart
    const speedRange = new Range( 0, 6 ); // speed range of the cart in m/s
    const speedometerNode = new GaugeNode( speedProperty, speedStringProperty, speedRange, {
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