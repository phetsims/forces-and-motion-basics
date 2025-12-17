// Copyright 2025, University of Colorado Boulder

/**
 * ObjectNavigationKeyboardHelpSection encapsulates the keyboard help rows for navigating, grabbing, and dropping objects.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import { RichTextOptions } from '../../../../scenery/js/nodes/RichText.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import MotionHotkeyData from './MotionHotkeyData.js';

const LABEL_OPTIONS: RichTextOptions = { lineWrap: 200 };

export default class ObjectNavigationKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {
    super( ForcesAndMotionBasicsFluent.keyboardHelpDialog.objectNavigationStringProperty, [
      KeyboardHelpSectionRow.labelWithIconList(
        ForcesAndMotionBasicsFluent.keyboardHelpDialog.selectObjectStringProperty,
        [
          KeyboardHelpIconFactory.leftRightOrADKeysRowIcon()
        ], {
          labelOptions: LABEL_OPTIONS,
          labelInnerContent: ForcesAndMotionBasicsFluent.a11y.keyboardHelpDialog.objectNavigation.selectObjectDescriptionStringProperty
        }
      ),
      KeyboardHelpSectionRow.labelWithIcon(
        ForcesAndMotionBasicsFluent.keyboardHelpDialog.grabObjectStringProperty,
        KeyboardHelpIconFactory.spaceOrEnter(), {
          labelOptions: LABEL_OPTIONS,
          labelInnerContent: ForcesAndMotionBasicsFluent.a11y.keyboardHelpDialog.objectNavigation.grabObjectDescriptionStringProperty
        }
      ),
      KeyboardHelpSectionRow.labelWithIconList(
        ForcesAndMotionBasicsFluent.keyboardHelpDialog.moveGrabbedObjectStringProperty,
        [
          KeyboardHelpIconFactory.leftRightOrADKeysRowIcon()
        ], {
          labelOptions: LABEL_OPTIONS,
          labelInnerContent: ForcesAndMotionBasicsFluent.a11y.keyboardHelpDialog.objectNavigation.moveGrabbedObjectDescriptionStringProperty
        }
      ),
      KeyboardHelpSectionRow.labelWithIcon(
        ForcesAndMotionBasicsFluent.keyboardHelpDialog.dropObjectStringProperty,
        KeyboardHelpIconFactory.spaceOrEnter(), {
          labelOptions: LABEL_OPTIONS,
          labelInnerContent: ForcesAndMotionBasicsFluent.a11y.keyboardHelpDialog.objectNavigation.dropObjectDescriptionStringProperty
        }
      ),
      KeyboardHelpSectionRow.fromHotkeyData( MotionHotkeyData.RETURN_ITEM_TO_TOOLBOX_HOTKEY_DATA, {
        pdomLabelStringProperty: ForcesAndMotionBasicsFluent.a11y.keyboardHelpDialog.objectNavigation.returnToToolboxDescriptionStringProperty
      } ),
      KeyboardHelpSectionRow.fromHotkeyData( MotionHotkeyData.CANCEL_AND_RETURN_ITEM_TO_ORIGIN_HOTKEY_DATA, {
        pdomLabelStringProperty: ForcesAndMotionBasicsFluent.a11y.keyboardHelpDialog.objectNavigation.cancelMovementStringProperty
      } )
    ] );
  }
}

forcesAndMotionBasics.register( 'ObjectNavigationKeyboardHelpSection', ObjectNavigationKeyboardHelpSection );
