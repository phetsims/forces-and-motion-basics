// Copyright 2013-2024, University of Colorado Boulder

/**
 * Shows a button that allows the user to "return" the cart after a match has completed.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import TextPushButton, { TextPushButtonOptions } from '../../../../sun/js/buttons/TextPushButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';
import NetForceModel from '../model/NetForceModel.js';

export default class ReturnButton extends TextPushButton {

  public constructor( model: NetForceModel, tandem: Tandem, options: TextPushButtonOptions ) {

    // TODO: this method bound the model. Why? https://github.com/phetsims/forces-and-motion-basics/issues/319
    const returnCart = () => {
      model.returnCart();
    };

    super( ForcesAndMotionBasicsStrings.returnStringProperty, {
      listener: returnCart,
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      baseColor: 'rgb( 254, 192, 0 )',
      tandem: tandem
    } );

    this.mutate( options );

    // Ensure return button is horizontally centered.
    ForcesAndMotionBasicsStrings.returnStringProperty.link( () => {
      if ( options.centerX !== undefined ) {
        this.centerX = options.centerX;
      }
    } );

    model.startedProperty.linkAttribute( this, 'enabled' );
  }
}

forcesAndMotionBasics.register( 'ReturnButton', ReturnButton );