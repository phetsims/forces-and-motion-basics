// Copyright 2025, University of Colorado Boulder

/**
 * HotkeyData for the KeyboardListeners in the Motion screen(s).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';

export default class MotionHotkeyData {
  // Zero the applied force using the '0' key
  public static readonly ZERO_APPLIED_FORCE_HOTKEY_DATA = new HotkeyData( {
    keys: [ '0' ],
    repoName: forcesAndMotionBasics.name,
    keyboardHelpDialogLabelStringProperty: ForcesAndMotionBasicsFluent.keyboardHelpDialog.zeroAppliedForceStringProperty
  } );

  // Return grabbed item to toolbox with Delete/Backspace
  public static readonly RETURN_ITEM_TO_TOOLBOX_HOTKEY_DATA = new HotkeyData( {
    keys: [ 'delete', 'backspace' ],
    repoName: forcesAndMotionBasics.name,
    keyboardHelpDialogLabelStringProperty: ForcesAndMotionBasicsFluent.keyboardHelpDialog.returnToToolboxStringProperty
  } );

  // Cancel and return grabbed item to where it came from with Escape
  public static readonly CANCEL_AND_RETURN_ITEM_TO_ORIGIN_HOTKEY_DATA = new HotkeyData( {
    keys: [ 'escape' ],
    repoName: forcesAndMotionBasics.name,
    keyboardHelpDialogLabelStringProperty: ForcesAndMotionBasicsFluent.keyboardHelpDialog.cancelMovementStringProperty
  } );
}

forcesAndMotionBasics.register( 'MotionHotkeyData', MotionHotkeyData );
