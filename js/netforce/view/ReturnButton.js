// Copyright 2013-2019, University of Colorado Boulder

/**
 * Shows a button that allows the user to "return" the cart after a match has completed.
 *
 * @author Sam Reid
 */

import inherit from '../../../../phet-core/js/inherit.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import TextPushButton from '../../../../sun/js/buttons/TextPushButton.js';
import forcesAndMotionBasicsStrings from '../../forces-and-motion-basics-strings.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

const returnString = forcesAndMotionBasicsStrings.return;

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

inherit( TextPushButton, ReturnButton );
export default ReturnButton;