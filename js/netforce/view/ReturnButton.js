// Copyright 2013-2015, University of Colorado Boulder

/**
 * Shows a button that allows the user to "return" the cart after a match has completed.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var AccessiblePeer = require( 'SCENERY/accessibility/AccessiblePeer' );
  var inherit = require( 'PHET_CORE/inherit' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  // strings
  var returnString = require( 'string!FORCES_AND_MOTION_BASICS/return' );
  var returnButtonDescriptionString = require( 'string!FORCES_AND_MOTION_BASICS/returnButton.description' );

  /**
   * @param {NetForceModel} model
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function ReturnButton( model, tandem, options ) {

    // TODO: this method bound the model. Why?
    var returnCart = function() {
      model.returnCart();
    };
    TextPushButton.call( this, returnString, {
      listener: returnCart,
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      baseColor: 'rgb( 254, 192, 0 )',
      tandem: tandem.createSupertypeTandem() // TODO: this class should extend TextPushButton, not wrap it.
    } );
    this.mutate( options );
    var self = this;

    model.startedProperty.linkAttribute( this, 'enabled' );
    model.startedProperty.link( function( enabled ) {
      self.textDescription = 'Reset Cart button' + (enabled ? '' : ' (disabled)');
    } );

    this.accessibleContent = {
      createPeer: function( accessibleInstance ) {
        // will look like:  <input value="Return" type="button" tabindex="0">
        var domElement = document.createElement( 'input' );
        domElement.value = returnString;
        domElement.type = 'button';

        // create an aria element that describes the button.
        var descriptionElement = document.createElement( 'p' );
        descriptionElement.innerText = returnButtonDescriptionString;
        descriptionElement.id = 'return-description';
        domElement.appendChild( descriptionElement );
        domElement.setAttribute( 'aria-describedby', descriptionElement.id );

        domElement.setAttribute( 'aria-disabled', 'true' );

        model.startedProperty.link( function( enabled ) {
          domElement.setAttribute( 'aria-disabled', !enabled );
        } );

        domElement.tabIndex = '0';

        domElement.addEventListener( 'click', function() {
          // toggle the button property
          returnCart();

          // make sure the bause button cannot be focused now that the pullers have returned
          document.getElementsByClassName( 'GoButton' )[ 0 ].tabIndex = 0;
          document.getElementsByClassName( 'PauseButton' )[ 0 ].tabIndex = -1;
        } );

        return new AccessiblePeer( accessibleInstance, domElement );
      }
    };

    this.mutate({tandem: tandem});
  }

  forcesAndMotionBasics.register( 'ReturnButton', ReturnButton );

  return inherit( TextPushButton, ReturnButton );
} );
