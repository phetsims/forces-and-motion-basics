// Copyright 2025, University of Colorado Boulder

/**
 * FromAnywhereInScreenKeyboardHelpSection covers hotkeys available regardless of focus in the Net Force screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import TextKeyNode from '../../../../scenery-phet/js/keyboard/TextKeyNode.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';
import NetForceHotkeyData from './NetForceHotkeyData.js';

export default class FromAnywhereInScreenKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {
    super( ForcesAndMotionBasicsStrings.keyboardHelpDialog.fromAnywhereInScreenStringProperty, [
      KeyboardHelpSectionRow.fromHotkeyData( NetForceHotkeyData.GO_HOTKEY_DATA, {
        pdomLabelStringProperty: ForcesAndMotionBasicsFluent.a11y.keyboardHelpDialog.fromAnywhereInSim.startGameDescription.createProperty( {
          altOrOptionKey: TextKeyNode.getAltKeyString()
        } )
      } ),
      KeyboardHelpSectionRow.fromHotkeyData( NetForceHotkeyData.PAUSE_HOTKEY_DATA, {
        pdomLabelStringProperty: ForcesAndMotionBasicsFluent.a11y.keyboardHelpDialog.fromAnywhereInSim.pauseGameDescription.createProperty( {
          altOrOptionKey: TextKeyNode.getAltKeyString()
        } )
      } ),
      KeyboardHelpSectionRow.fromHotkeyData( NetForceHotkeyData.RETURN_CART_HOTKEY_DATA, {
        pdomLabelStringProperty: ForcesAndMotionBasicsFluent.a11y.keyboardHelpDialog.fromAnywhereInSim.returnCartToCenterDescription.createProperty( {
          altOrOptionKey: TextKeyNode.getAltKeyString()
        } )
      } )
    ] );
  }
}

forcesAndMotionBasics.register( 'FromAnywhereInScreenKeyboardHelpSection', FromAnywhereInScreenKeyboardHelpSection );
