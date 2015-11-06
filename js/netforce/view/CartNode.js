// Copyright 2015, University of Colorado Boulder

/**
 * Node representation of the movable cart in Forces and Motion: Basics net force screen.  The node is an image with
 * accessible content that uses an aria-live region to notify accessible technologies of position updates.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var AccessiblePeer = require( 'SCENERY/accessibility/AccessiblePeer' );

  // images
  var cartImage = require( 'image!FORCES_AND_MOTION_BASICS/cart.png' );

  /**
   * Constructor.
   *
   * @constructor
   */
  function CartNode( cart ) {

    // super constructor
    Image.call( this, cartImage, { y: 221 } );
    var thisNode = this;

    this.cart = cart;
    this.xPosition = this.cart.x;

    // outfit with accessible content
    this.accessibleContent = {
      createPeer: function( accessibleInstance ) {
        /* parallel DOM element should look like:
         *
         * <div id="cart" tabIndex="-1" aria-live="polite" aria-describedby="descriptionID" aria-busy="false">
         *   <p>The cart is stationary</p>
         *</div>
         */
        var domElement = document.createElement( 'div' );
        domElement.tabIndex = '-1';
        domElement.setAttribute( 'aria-live', 'polite' );
        domElement.setAttribute( 'role', 'alert' );


        var descriptionElement = document.createElement( 'p' );
        descriptionElement.innerText = 'The cart is stationary';

        domElement.appendChild( descriptionElement );

        thisNode.cart.xProperty.link( function( x ) {
          if ( Math.abs( thisNode.xPosition - x ) > 150 ) {
            thisNode.xPosition = x;
            thisNode.updateLiveCartRegion( descriptionElement );
          }
        } );

        return new AccessiblePeer( accessibleInstance, domElement );
      }
    };
  }

  return inherit( Image, CartNode, {

    updateLiveCartRegion: function( descriptionElement ) {
      // update
      console.log( 'here' );
      descriptionElement.innerText = 'The cart is moving to the left';
    }
  } );
} );