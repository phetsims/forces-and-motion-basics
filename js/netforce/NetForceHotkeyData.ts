// Copyright 2025, University of Colorado Boulder

/**
 * HotkeyData for the KeyboardListeners in the Net Force screen.
 *
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import StringProperty from '../../../axon/js/StringProperty.js';
import { TReadOnlyProperty } from '../../../axon/js/TReadOnlyProperty.js';
import HotkeyData from '../../../scenery/js/input/HotkeyData.js';
import { OneKeyStroke } from '../../../scenery/js/input/KeyDescriptor.js';
import forcesAndMotionBasics from '../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../ForcesAndMotionBasicsStrings.js';

//REVIEW Yes, this should move to js/netforce/view/
/**
 * REVIEW
 * createHotkeyData is duplicated NetForceHotkeyData.ts and MotionHotkeyData. And the call sites obfuscate how the
 * args relate to HotkeyData. A better implementation would be:
 * 1. Create base class FAMBHotkeyData with protected constructor.
 * 2. FAMBHotkeyData sets default option to global:false.
 * 3. FAMBHotkeyDataOptions omits 'repoName' and sets it to repoName: forcesAndMotionBasics.name.
 * 4. NetForceHotkeyData and MotionHotkeyData extend FAMBHotkeyData, with private constructors.
 * 5. NetForceHotkeyData has public static readonly members that are instances of NetForceHotkeyData.
 * 6. MotionHotkeyData has public static readonly members that are instances of MotionHotkeyData.
 */
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

export default class NetForceHotkeyData {

  // Navigation keys for moving between elements
  //REVIEW Should these be private? They are not used outside NetForceHotkeyData.
  public static readonly NAVIGATE_LEFT: OneKeyStroke[] = [ 'arrowLeft' ];
  public static readonly NAVIGATE_RIGHT: OneKeyStroke[] = [ 'arrowRight' ];
  public static readonly NAVIGATE_UP: OneKeyStroke[] = [ 'arrowUp' ];
  public static readonly NAVIGATE_DOWN: OneKeyStroke[] = [ 'arrowDown' ];

  //REVIEW Should pullerNode be PULLER_NODE?
  public static readonly pullerNode = {
    // Navigation between pullers and knots
    navigation: createHotkeyData( [
      //REVIEW Is WASD not supported?
        ...NetForceHotkeyData.NAVIGATE_LEFT,
        ...NetForceHotkeyData.NAVIGATE_RIGHT,
        ...NetForceHotkeyData.NAVIGATE_UP,
        ...NetForceHotkeyData.NAVIGATE_DOWN
      ],
      new StringProperty( 'Navigate between pullers or knots' )
    ),
    // Grab/drop interaction
    grabOrDrop: createHotkeyData(
      [ 'enter', 'space' ],
      new StringProperty( 'Grab or drop puller' )
    ),
    // Cancel interaction
    cancelInteraction: createHotkeyData(
      [ 'escape' ],
      ForcesAndMotionBasicsStrings.keyboardHelpDialog.cancelMovementStringProperty
    ),
    // Return to toolbox
    returnToToolbox: createHotkeyData(
      [ 'delete', 'backspace' ],
      ForcesAndMotionBasicsStrings.keyboardHelpDialog.returnToToolboxStringProperty
    )
  };

  // Global hotkeys
  public static readonly GO_HOTKEY_DATA = createHotkeyData(
    [ 'alt+g' ],
    ForcesAndMotionBasicsStrings.keyboardHelpDialog.startGameStringProperty,
    true
  );

  public static readonly PAUSE_HOTKEY_DATA = createHotkeyData(
    [ 'alt+p' ],
    ForcesAndMotionBasicsStrings.keyboardHelpDialog.pauseGameStringProperty,
    true
  );

  public static readonly RETURN_CART_HOTKEY_DATA = createHotkeyData(
    [ 'alt+c' ],
    ForcesAndMotionBasicsStrings.keyboardHelpDialog.returnCartToCenterStringProperty,
    true
  );
}

forcesAndMotionBasics.register( 'NetForceHotkeyData', NetForceHotkeyData );