// Copyright 2025, University of Colorado Boulder

/**
 * HotkeyData for the KeyboardListeners in the Net Force screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';

export default class NetForceHotkeyData {

  // Navigation keys for moving between elements
  private static readonly NAVIGATE_LEFT_KEYS: OneKeyStroke[] = [ 'arrowLeft', 'a' ];
  private static readonly NAVIGATE_RIGHT_KEYS: OneKeyStroke[] = [ 'arrowRight', 'd' ];

  public static readonly PULLER_NODE = {

    // Navigation between pullers and knots
    navigation: new HotkeyData( {
      keys: [
        ...NetForceHotkeyData.NAVIGATE_LEFT_KEYS,
        ...NetForceHotkeyData.NAVIGATE_RIGHT_KEYS
      ],
      repoName: forcesAndMotionBasics.name,
      binderName: 'Puller Navigation'
    } ),

    // Grab/drop interaction
    grabOrDrop: new HotkeyData( {
      keys: [ 'enter', 'space' ],
      repoName: forcesAndMotionBasics.name,
      binderName: 'Grab/Drop Puller'
    } ),

    // Cancel interaction
    cancelInteraction: new HotkeyData( {
      keys: [ 'escape' ],
      repoName: forcesAndMotionBasics.name,
      keyboardHelpDialogLabelStringProperty: ForcesAndMotionBasicsStrings.keyboardHelpDialog.cancelMovementStringProperty
    } ),

    // Return to toolbox
    returnToToolbox: new HotkeyData( {
      keys: [ 'delete', 'backspace' ],
      repoName: forcesAndMotionBasics.name,
      keyboardHelpDialogLabelStringProperty: ForcesAndMotionBasicsStrings.keyboardHelpDialog.returnToToolboxStringProperty
    } )
  };

  // Global hotkeys
  public static readonly GO_HOTKEY_DATA = new HotkeyData( {
    keys: [ 'alt+g' ],
    repoName: forcesAndMotionBasics.name,
    keyboardHelpDialogLabelStringProperty: ForcesAndMotionBasicsStrings.keyboardHelpDialog.startGameStringProperty,
    global: true
  } );

  public static readonly PAUSE_HOTKEY_DATA = new HotkeyData( {
    keys: [ 'alt+p' ],
    repoName: forcesAndMotionBasics.name,
    keyboardHelpDialogLabelStringProperty: ForcesAndMotionBasicsStrings.keyboardHelpDialog.pauseGameStringProperty,
    global: true
  } );

  public static readonly RETURN_CART_HOTKEY_DATA = new HotkeyData( {
    keys: [ 'alt+c' ],
    repoName: forcesAndMotionBasics.name,
    keyboardHelpDialogLabelStringProperty: ForcesAndMotionBasicsStrings.keyboardHelpDialog.returnCartToCenterStringProperty,
    global: true
  } );
}

forcesAndMotionBasics.register( 'NetForceHotkeyData', NetForceHotkeyData );
