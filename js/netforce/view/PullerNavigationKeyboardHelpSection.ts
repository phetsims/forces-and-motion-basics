// Copyright 2025-2026, University of Colorado Boulder

/**
 * PullerNavigationKeyboardHelpSection encapsulates the keyboard help rows for selecting and manipulating pullers.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import KeyboardDragListener from '../../../../scenery/js/listeners/KeyboardDragListener.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import NetForceHotkeyData from './NetForceHotkeyData.js';

const LABEL_WITH_ICON_OPTIONS = {
  labelOptions: { lineWrap: 200 }
};

export default class PullerNavigationKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {
    super( ForcesAndMotionBasicsFluent.keyboardHelpDialog.pullerNavigationStringProperty, [

      KeyboardHelpSectionRow.fromHotkeyData( KeyboardDragListener.MOVE_LEFT_RIGHT_HOTKEY_DATA, {
        labelStringProperty: ForcesAndMotionBasicsFluent.keyboardHelpDialog.selectPullerStringProperty,
        labelWithIconOptions: LABEL_WITH_ICON_OPTIONS
      } ),

      KeyboardHelpSectionRow.fromHotkeyData( NetForceHotkeyData.PULLER_NODE.grabOrDrop, {
        labelStringProperty: ForcesAndMotionBasicsFluent.keyboardHelpDialog.grabPullerStringProperty,
        labelWithIconOptions: LABEL_WITH_ICON_OPTIONS
      } ),

      KeyboardHelpSectionRow.fromHotkeyData( NetForceHotkeyData.PULLER_NODE.navigation, {
        labelStringProperty: ForcesAndMotionBasicsFluent.keyboardHelpDialog.moveGrabbedPullerStringProperty,
        labelWithIconOptions: LABEL_WITH_ICON_OPTIONS
      } ),
      KeyboardHelpSectionRow.fromHotkeyData( NetForceHotkeyData.PULLER_NODE.grabOrDrop, {
        labelStringProperty: ForcesAndMotionBasicsFluent.keyboardHelpDialog.dropPullerStringProperty,
        labelWithIconOptions: LABEL_WITH_ICON_OPTIONS
      } ),
      KeyboardHelpSectionRow.fromHotkeyData( NetForceHotkeyData.PULLER_NODE.returnToToolbox, {
        labelWithIconOptions: LABEL_WITH_ICON_OPTIONS
      } ),
      KeyboardHelpSectionRow.fromHotkeyData( NetForceHotkeyData.PULLER_NODE.cancelInteraction, {
        labelWithIconOptions: LABEL_WITH_ICON_OPTIONS
      } )
    ] );
  }
}
