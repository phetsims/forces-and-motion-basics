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
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';
import NetForceModel from '../model/NetForceModel.js';
import NetForceHotkeyData from '../NetForceHotkeyData.js';

export default class ReturnButton extends TextPushButton {

  public constructor( model: NetForceModel, tandem: Tandem, options: TextPushButtonOptions ) {

    super( ForcesAndMotionBasicsFluent.returnStringProperty, {
      listener: () => {
        model.returnCart();
        this.addAccessibleContextResponse( ForcesAndMotionBasicsStrings.a11y.returnButton.cartReturnedToCenterStringProperty );
      },
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      baseColor: 'rgb( 254, 192, 0 )',
      tandem: tandem,
      enabledPropertyOptions: {
        phetioReadOnly: true
      },
      accessibleName: ForcesAndMotionBasicsFluent.a11y.returnButton.accessibleNameStringProperty,
      accessibleHelpText: ForcesAndMotionBasicsFluent.a11y.returnButton.accessibleHelpTextStringProperty
    } );

    this.mutate( options );

    // Ensure return button is horizontally centered.
    ForcesAndMotionBasicsFluent.returnStringProperty.link( () => {
      if ( options.centerX !== undefined ) {
        this.centerX = options.centerX;
      }
    } );

    model.hasStartedProperty.linkAttribute( this, 'enabled' );

    // Create global keyboard listener for Return (alt+r)
    KeyboardListener.createGlobal( this, {
      keyStringProperties: NetForceHotkeyData.RETURN_CART_HOTKEY_DATA.keyStringProperties,
      fire: () => {
        if ( this.enabled ) {
          model.returnCart();
          this.addAccessibleContextResponse( ForcesAndMotionBasicsStrings.a11y.returnButton.cartReturnedToCenterStringProperty );
        }
      }
    } );
  }
}

forcesAndMotionBasics.register( 'ReturnButton', ReturnButton );