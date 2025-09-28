// Copyright 2013-2025, University of Colorado Boulder

/**
 * Shows a button that allows the user to "return" the cart after a match has completed.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import TextPushButton, { TextPushButtonOptions } from '../../../../sun/js/buttons/TextPushButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import NetForceModel from '../model/NetForceModel.js';
import NetForceHotkeyData from '../NetForceHotkeyData.js';

type SelfOptions = EmptySelfOptions;
type ReturnButtonOptions = TextPushButtonOptions & SelfOptions;

export default class ReturnButton extends TextPushButton {

  public constructor( model: NetForceModel, providedOptions?: ReturnButtonOptions ) {

    const options = optionize<ReturnButtonOptions, SelfOptions, TextPushButtonOptions>()( {
      listener: () => {
        model.returnCart();
        this.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.netForceScreen.returnButton.cartReturnedToCenterStringProperty.value );
      },
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      baseColor: 'rgb( 254, 192, 0 )',
      tandem: Tandem.OPTIONAL,
      enabledPropertyOptions: {
        phetioReadOnly: true
      },
      accessibleName: ForcesAndMotionBasicsFluent.a11y.netForceScreen.returnButton.accessibleNameStringProperty,
      accessibleHelpText: ForcesAndMotionBasicsFluent.a11y.netForceScreen.returnButton.accessibleHelpTextStringProperty
    }, providedOptions );

    super( ForcesAndMotionBasicsFluent.returnStringProperty, options );

    const centerX = options.centerX;

    // Ensure return button is horizontally centered.
    ForcesAndMotionBasicsFluent.returnStringProperty.link( () => {
      if ( centerX !== undefined ) {
        this.centerX = centerX;
      }
    } );

    model.hasStartedProperty.linkAttribute( this, 'enabled' );

    // Create global keyboard listener that mirrors RETURN_CART_HOTKEY_DATA
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
