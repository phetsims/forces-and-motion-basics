// Copyright 2025, University of Colorado Boulder

/**
 * HotkeyData for the KeyboardListeners in the Motion screen(s).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../axon/js/TReadOnlyProperty.js';
import HotkeyData from '../../../scenery/js/input/HotkeyData.js';
import { OneKeyStroke } from '../../../scenery/js/input/KeyDescriptor.js';
import forcesAndMotionBasics from '../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../ForcesAndMotionBasicsStrings.js';

//REVIEW Yes, this should move to js/motion/view/
//REVIEW createHotkeyData is duplicated, see REVIEW comment in NetForceHotkeyData.ts
function createHotkeyData( keys: OneKeyStroke[],
                           keyboardHelpDialogLabelStringProperty: TReadOnlyProperty<string>,
                           global = false ): HotkeyData {
  return new HotkeyData( {
    keys: keys,
    repoName: forcesAndMotionBasics.name,
    keyboardHelpDialogLabelStringProperty: keyboardHelpDialogLabelStringProperty,
    global: global
  } );
}

export default class MotionHotkeyData {
  // Zero the applied force using the '0' key
  public static readonly ZERO_APPLIED_FORCE_HOTKEY_DATA = createHotkeyData(
    [ '0' ],
    ForcesAndMotionBasicsStrings.keyboardHelpDialog.zeroAppliedForceStringProperty
  );

  // Return grabbed item to toolbox with Delete/Backspace
  public static readonly RETURN_ITEM_TO_TOOLBOX_HOTKEY_DATA = createHotkeyData(
    [ 'delete', 'backspace' ],
    ForcesAndMotionBasicsStrings.keyboardHelpDialog.returnToToolboxStringProperty
  );

  // Cancel and return grabbed item to where it came from with Escape
  public static readonly CANCEL_AND_RETURN_ITEM_TO_ORIGIN_HOTKEY_DATA = createHotkeyData(
    [ 'escape' ],
    ForcesAndMotionBasicsStrings.keyboardHelpDialog.cancelMovementStringProperty
  );
}

forcesAndMotionBasics.register( 'MotionHotkeyData', MotionHotkeyData );