// Copyright 2015-2024, University of Colorado Boulder

/**
 * Node representation of the movable cart in Forces and Motion: Basics net force screen.
 *
 * @author Jesse Greenberg
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import GaugeNode from '../../../../scenery-phet/js/GaugeNode.js';
import { Image } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import cart_svg from '../../../images/cart_svg.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';
import Cart from '../model/Cart.js';

const speedStringProperty = ForcesAndMotionBasicsStrings.speedStringProperty;

export default class CartNode extends Image {
  private readonly xPosition: number;

  public constructor( private readonly cart: Cart, speedProperty: NumberProperty, showSpeedProperty: TReadOnlyProperty<boolean>, tandem: Tandem ) {
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
      maxLabelWidthScale: 1.0
    } );

    showSpeedProperty.linkAttribute( speedometerNode, 'visible' );
    this.addChild( speedometerNode );
  }
}

forcesAndMotionBasics.register( 'CartNode', CartNode );