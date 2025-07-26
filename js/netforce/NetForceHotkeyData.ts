// Copyright 2025, University of Colorado Boulder

/**
 * HotkeyData for the KeyboardListeners in the Net Force screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import StringProperty from '../../../axon/js/StringProperty.js';
import TReadOnlyProperty from '../../../axon/js/TReadOnlyProperty.js';
import HotkeyData from '../../../scenery/js/input/HotkeyData.js';
import { OneKeyStroke } from '../../../scenery/js/input/KeyDescriptor.js';
import forcesAndMotionBasics from '../forcesAndMotionBasics.js';

function createHotkeyData( keys: OneKeyStroke[],
                           keyboardHelpDialogLabelStringProperty: TReadOnlyProperty<string> ): HotkeyData {
  return new HotkeyData( {
    keys: keys,
    repoName: forcesAndMotionBasics.name,
    keyboardHelpDialogLabelStringProperty: keyboardHelpDialogLabelStringProperty
  } );
}

export default class NetForceHotkeyData {
  // Navigation keys for moving between elements
  public static readonly NAVIGATE_LEFT: OneKeyStroke[] = [ 'arrowLeft' ];
  public static readonly NAVIGATE_RIGHT: OneKeyStroke[] = [ 'arrowRight' ];
  public static readonly NAVIGATE_UP: OneKeyStroke[] = [ 'arrowUp' ];
  public static readonly NAVIGATE_DOWN: OneKeyStroke[] = [ 'arrowDown' ];

  public static readonly pullerNode = {
    // Navigation between pullers and knots
    navigation: createHotkeyData( [
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
      new StringProperty( 'Cancel and return puller to original position' )
    )
  };
}

forcesAndMotionBasics.register( 'NetForceHotkeyData', NetForceHotkeyData );