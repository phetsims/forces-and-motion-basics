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
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  // images
  var cartImage = require( 'image!FORCES_AND_MOTION_BASICS/cart.png' );

  // strings
  var leftDescriptionString = require( 'string!FORCES_AND_MOTION_BASICS/left.description' );
  var rightDescriptionString = require( 'string!FORCES_AND_MOTION_BASICS/right.description' );

  /**
   * Constructor.
   *
   * @param {Cart} cart
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
         * <div id="cart" tabIndex="-1" aria-live="assertive" >
         *   <p>The cart is stationary</p>
         *</div>
         */
        var domElement = document.createElement( 'img' );
        domElement.tabIndex = '-1';

        var descriptionElement = document.createElement( 'p' );
        descriptionElement.innerText = 'The cart is stationary';
        descriptionElement.setAttribute( 'aria-live', 'assertive' );

        domElement.appendChild( descriptionElement );

        thisNode.cart.xProperty.link( function( x ) {
          // when the cart has moved by the value below, update the description and notify the user with aria-live
          if ( Math.abs( thisNode.xPosition - x ) > 20 ) {
            var directionString = ( thisNode.xPosition - x ) > 0 ? leftDescriptionString : rightDescriptionString;
            thisNode.updateLiveCartRegion( descriptionElement, directionString );
            thisNode.xPosition = x;
          }
        } );

        return new AccessiblePeer( accessibleInstance, domElement );
      }
    };
  }

  forcesAndMotionBasics.register( 'CartNode', CartNode );

  return inherit( Image, CartNode, {

    /**
     * Update the text content of the aria-live region describing the cart.
     * 
     * @param  {DOMElement} descriptionElement
     * @param  {string} directionString
     */
    updateLiveCartRegion: function( descriptionElement, directionString ) {
      // update the aria live region by setting its inner text.

      var newDescriptionElement = document.getElementById( 'netForceActionElement' );
      newDescriptionElement.innerText = 'Cart accelerating ' + directionString;
    }
  } );
} );