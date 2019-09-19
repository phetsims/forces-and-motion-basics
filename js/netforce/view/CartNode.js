// Copyright 2015-2019, University of Colorado Boulder

/**
 * Node representation of the movable cart in Forces and Motion: Basics net force screen.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  const GaugeNode = require( 'SCENERY_PHET/GaugeNode' );
  const Image = require( 'SCENERY/nodes/Image' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Range = require( 'DOT/Range' );

  // images
  const cartImage = require( 'image!FORCES_AND_MOTION_BASICS/cart.png' );

  // strings
  const speedString = require( 'string!FORCES_AND_MOTION_BASICS/speed' );

  /**
   * Constructor.
   *
   * @param {Cart} cart
   * @param {NumberProperty} speedProperty
   * @param {Property.<Boolean>} showSpeedProperty
   * @param {Tandem} tandem
   * @constructor
   */
  function CartNode( cart, speedProperty, showSpeedProperty, tandem ) {

    // super constructor
    Image.call( this, cartImage, {
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

  forcesAndMotionBasics.register( 'CartNode', CartNode );

  return inherit( Image, CartNode );
} );