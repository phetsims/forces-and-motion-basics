// Copyright 2025, University of Colorado Boulder

/**
 * ObjectNavigationKeyboardHelpSection encapsulates the keyboard help rows for navigating, grabbing, and dropping objects.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import GrabDragInteraction from '../../../../scenery-phet/js/accessibility/grab-drag/GrabDragInteraction.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import KeyboardDragListener from '../../../../scenery/js/listeners/KeyboardDragListener.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import MotionHotkeyData from './MotionHotkeyData.js';

const LABEL_WITH_ICON_OPTIONS = {
  labelOptions: { lineWrap: 200 }
};

export default class ObjectNavigationKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {
    super( ForcesAndMotionBasicsFluent.keyboardHelpDialog.objectNavigationStringProperty, [
      KeyboardHelpSectionRow.fromHotkeyData( KeyboardDragListener.MOVE_LEFT_RIGHT_HOTKEY_DATA, {
        labelStringProperty: ForcesAndMotionBasicsFluent.keyboardHelpDialog.selectObjectStringProperty,
        labelWithIconOptions: LABEL_WITH_ICON_OPTIONS
      } ),
      KeyboardHelpSectionRow.fromHotkeyData( GrabDragInteraction.GRAB_RELEASE_HOTKEY_DATA, {
        labelStringProperty: ForcesAndMotionBasicsFluent.keyboardHelpDialog.grabObjectStringProperty,
        labelWithIconOptions: LABEL_WITH_ICON_OPTIONS
      } ),
      KeyboardHelpSectionRow.fromHotkeyData( KeyboardDragListener.MOVE_LEFT_RIGHT_HOTKEY_DATA, {
        labelStringProperty: ForcesAndMotionBasicsFluent.keyboardHelpDialog.moveGrabbedObjectStringProperty,
        labelWithIconOptions: LABEL_WITH_ICON_OPTIONS
      } ),
      KeyboardHelpSectionRow.fromHotkeyData( GrabDragInteraction.GRAB_RELEASE_HOTKEY_DATA, {
        labelStringProperty: ForcesAndMotionBasicsFluent.keyboardHelpDialog.dropObjectStringProperty,
        labelWithIconOptions: LABEL_WITH_ICON_OPTIONS
      } ),
      KeyboardHelpSectionRow.fromHotkeyData( MotionHotkeyData.RETURN_ITEM_TO_TOOLBOX_HOTKEY_DATA, {
        labelWithIconOptions: LABEL_WITH_ICON_OPTIONS
      } ),
      KeyboardHelpSectionRow.fromHotkeyData( MotionHotkeyData.CANCEL_AND_RETURN_ITEM_TO_ORIGIN_HOTKEY_DATA, {
        labelWithIconOptions: LABEL_WITH_ICON_OPTIONS
      } )
    ] );
  }
}

forcesAndMotionBasics.register( 'ObjectNavigationKeyboardHelpSection', ObjectNavigationKeyboardHelpSection );
