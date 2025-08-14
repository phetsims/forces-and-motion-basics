// Copyright 2015-2025, University of Colorado Boulder

/**
 * Node representation of the movable cart in Forces and Motion: Basics net force screen.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import GaugeNode from '../../../../scenery-phet/js/GaugeNode.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import cart_svg from '../../../images/cart_svg.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import Cart from '../model/Cart.js';

const speedStringProperty = ForcesAndMotionBasicsFluent.speedStringProperty;

export default class CartNode extends Image {
  private readonly xPosition: number;

  public constructor( private readonly cart: Cart, speedProperty: NumberProperty, showSpeedProperty: TReadOnlyProperty<boolean> ) {
    super( cart_svg, {
      y: 221
    } );

    this.xPosition = this.cart.positionProperty.get();

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

    // Speed varies between -3.76215, 3.76215
    // Position varies between -403, 403
    Multilink.multilink( [ this.cart.positionProperty, speedProperty, showSpeedProperty ], ( position, speed ) => {

      // Build the accessible paragraph description
      let description = ForcesAndMotionBasicsFluent.a11y.cart.cartDescriptionStringProperty.value;

      // Add position description
      // Position ranges from -403 to 403, with 0 being center
      const positionDescriptor = position <= -400 ? 'all the way to the left' :
                                 position < -150 ? 'to the left' :
                                 position < -50 ? 'slightly to the left' :
                                 position < 50 ? 'in the center' :
                                 position < 150 ? 'slightly to the right' :
                                 position < 400 ? 'to the right' :
                                 'all the way to the right';

      description += ` The cart is ${positionDescriptor}`;

      // Add speed description
      const absSpeed = Math.abs( speed );
      const speedDescriptor = absSpeed === 0 ? 'stopped' :
                              absSpeed < 0.5 ? 'moving slowly' :
                              absSpeed < 1.5 ? 'moving' :
                              absSpeed < 2.5 ? 'moving quickly' :
                              absSpeed < 3.5 ? 'moving very quickly' :
                              'moving extremely quickly';

      if ( absSpeed === 0 ) {
        description += ' and is stopped';
      }
      else {
        const direction = speed > 0 ? 'right' : 'left';
        description += ` and is ${speedDescriptor} to the ${direction}`;
      }

      description += '.';

      this.accessibleParagraph = description;
    } );
  }
}

forcesAndMotionBasics.register( 'CartNode', CartNode );