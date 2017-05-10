// Copyright 2013-2015, University of Colorado Boulder

/**
 * Shows a button that allows the user to "return" the cart after a match has completed.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  // strings
  var returnString = require( 'string!FORCES_AND_MOTION_BASICS/return' );

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

    model.startedProperty.linkAttribute( this, 'enabled' );

    this.mutate( { tandem: tandem } );
  }

  forcesAndMotionBasics.register( 'ReturnButton', ReturnButton );

  return inherit( TextPushButton, ReturnButton );
} );
