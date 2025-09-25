// Copyright 2013-2025, University of Colorado Boulder

/**
 * Shows a button that allows the user to "return" the cart after a match has completed.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import TextPushButton, { TextPushButtonOptions } from '../../../../sun/js/buttons/TextPushButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import NetForceModel from '../model/NetForceModel.js';
import NetForceHotkeyData from '../NetForceHotkeyData.js';

export default class ReturnButton extends TextPushButton {

  public constructor( model: NetForceModel, tandem: Tandem, options: TextPushButtonOptions ) {

    super( ForcesAndMotionBasicsFluent.returnStringProperty, {
      listener: () => {
        model.returnCart();
        this.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.netForceScreen.returnButton.cartReturnedToCenterStringProperty.value );
      },
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      baseColor: 'rgb( 254, 192, 0 )',
      tandem: tandem,
      enabledPropertyOptions: {
        phetioReadOnly: true
      },
      accessibleName: ForcesAndMotionBasicsFluent.a11y.netForceScreen.returnButton.accessibleNameStringProperty,
      accessibleHelpText: ForcesAndMotionBasicsFluent.a11y.netForceScreen.returnButton.accessibleHelpTextStringProperty
    } );

    this.mutate( options );

    // Ensure return button is horizontally centered.
    ForcesAndMotionBasicsFluent.returnStringProperty.link( () => {
      if ( options.centerX !== undefined ) {
        this.centerX = options.centerX;
      }
    } );

    model.hasStartedProperty.linkAttribute( this, 'enabled' );

    //REVIEW Doc says "alt+r", RETURN_CART_HOTKEY_DATA is "alt+c". Which is correct?
    //REVIEW If "alt+c" is correct, I would refrain from putting the keystroke in the comment here, so it doesn't become out-of-sync with implementation.
    // Create global keyboard listener for Return (alt+r)
    KeyboardListener.createGlobal( this, {
      keyStringProperties: NetForceHotkeyData.RETURN_CART_HOTKEY_DATA.keyStringProperties,
      fire: () => {
        if ( this.enabled ) {
          model.returnCart();
          this.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.netForceScreen.returnButton.cartReturnedToCenterStringProperty.value );
        }
      }
    } );
  }
}

forcesAndMotionBasics.register( 'ReturnButton', ReturnButton );