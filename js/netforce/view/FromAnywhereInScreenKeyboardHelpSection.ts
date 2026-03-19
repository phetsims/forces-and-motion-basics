// Copyright 2025-2026, University of Colorado Boulder

/**
 * FromAnywhereInScreenKeyboardHelpSection covers hotkeys available regardless of focus in the Net Force screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import NetForceHotkeyData from './NetForceHotkeyData.js';

export default class FromAnywhereInScreenKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {
    super( ForcesAndMotionBasicsFluent.keyboardHelpDialog.fromAnywhereInScreenStringProperty, [
      KeyboardHelpSectionRow.fromHotkeyData( NetForceHotkeyData.GO_HOTKEY_DATA ),
      KeyboardHelpSectionRow.fromHotkeyData( NetForceHotkeyData.PAUSE_HOTKEY_DATA ),
      KeyboardHelpSectionRow.fromHotkeyData( NetForceHotkeyData.RETURN_CART_HOTKEY_DATA )
    ] );
  }
}
