// Copyright 2013-2017, University of Colorado Boulder

/**
 * Shows a button that allows the user to "return" the cart after a match has completed.
 *
 * @author Sam Reid
 */
define( require => {
  'use strict';

  // modules
  const forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  const inherit = require( 'PHET_CORE/inherit' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const TextPushButton = require( 'SUN/buttons/TextPushButton' );

  // strings
  const returnString = require( 'string!FORCES_AND_MOTION_BASICS/return' );

  /**
   * @param {NetForceModel} model
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function ReturnButton( model, tandem, options ) {

    // TODO: this method bound the model. Why?
    const returnCart = function() {
      model.returnCart();
    };
    TextPushButton.call( this, returnString, {
      listener: returnCart,
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      baseColor: 'rgb( 254, 192, 0 )',
      tandem: tandem
    } );
    this.mutate( options );

    model.startedProperty.linkAttribute( this, 'enabled' );
  }

  forcesAndMotionBasics.register( 'ReturnButton', ReturnButton );

  return inherit( TextPushButton, ReturnButton );
} );
