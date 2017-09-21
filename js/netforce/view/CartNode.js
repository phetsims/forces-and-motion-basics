// Copyright 2015-2017, University of Colorado Boulder

/**
 * Node representation of the movable cart in Forces and Motion: Basics net force screen.  The node is an image with
 * accessible content that uses an aria-live region to notify accessible technologies of position updates.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var GaugeNode = require( 'SCENERY_PHET/GaugeNode' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Range = require( 'DOT/Range' );

  // images
  var cartImage = require( 'image!FORCES_AND_MOTION_BASICS/cart.png' );

  // strings
  var speedString = require( 'string!FORCES_AND_MOTION_BASICS/speed' );


  /**
   * Constructor.
   *
   * @param {Cart} cart
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
    var speedRange = new Range( 0, 6 ); // speed range of the cart in m/s
    var speedometerNode = new GaugeNode( speedProperty, speedString, speedRange, {
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