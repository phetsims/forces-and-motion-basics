// Copyright 2015-2025, University of Colorado Boulder

/**
 * Node representation of the movable cart in Forces and Motion: Basics net force screen.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
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

    cart.velocityProperty.lazyLink( ( velocity, oldVelocity ) => {

      // Detect direction changes and announce them
      if ( oldVelocity < 0 && velocity > 0 ) {
        this.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.netForceScreen.goPauseButton.cartMovingRightStringProperty.value );
      }
      else if ( oldVelocity > 0 && velocity < 0 ) {
        this.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.netForceScreen.goPauseButton.cartMovingLeftStringProperty.value );
      }
    } );
  }
}

forcesAndMotionBasics.register( 'CartNode', CartNode );