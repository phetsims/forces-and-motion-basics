// Copyright 2025, University of Colorado Boulder

/**
 * MotionKeyboardHelpContent is the content for the keyboard-help dialog in the Motion screens.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import SliderControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/SliderControlsKeyboardHelpSection.js';
import SpinnerControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/SpinnerControlsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import { RichTextOptions } from '../../../../scenery/js/nodes/RichText.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';
import MotionHotkeyData from '../MotionHotkeyData.js';

const LABEL_OPTIONS: RichTextOptions = { lineWrap: 200 };

export default class MotionKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor() {

    //REVIEW Factor out ObjectNavigationKeyboardHelpSection extends KeyboardHelpSection.
    //REVIEW Rename itemNavigationSection to objectNavigationSection to match visual UI.
    // Create the item navigation section
    const itemNavigationSection = new KeyboardHelpSection( ForcesAndMotionBasicsStrings.keyboardHelpDialog.objectNavigationStringProperty, [
      KeyboardHelpSectionRow.labelWithIcon(
        ForcesAndMotionBasicsStrings.keyboardHelpDialog.selectObjectStringProperty,
        KeyboardHelpIconFactory.leftRightArrowKeysRowIcon(), {
          labelOptions: LABEL_OPTIONS,
          labelInnerContent: ForcesAndMotionBasicsStrings.a11y.keyboardHelpDialog.objectNavigation.selectObjectDescriptionStringProperty
        }
      ),
      KeyboardHelpSectionRow.labelWithIcon(
        ForcesAndMotionBasicsStrings.keyboardHelpDialog.grabObjectStringProperty,
        KeyboardHelpIconFactory.spaceOrEnter(), {
          labelOptions: LABEL_OPTIONS,
          labelInnerContent: ForcesAndMotionBasicsStrings.a11y.keyboardHelpDialog.objectNavigation.grabObjectDescriptionStringProperty
        }
      ),
      KeyboardHelpSectionRow.labelWithIcon(
        ForcesAndMotionBasicsStrings.keyboardHelpDialog.moveGrabbedObjectStringProperty,
        KeyboardHelpIconFactory.leftRightArrowKeysRowIcon(), {
          labelOptions: LABEL_OPTIONS,
          labelInnerContent: ForcesAndMotionBasicsStrings.a11y.keyboardHelpDialog.objectNavigation.moveGrabbedObjectDescriptionStringProperty
        }
      ),
      KeyboardHelpSectionRow.labelWithIcon(
        ForcesAndMotionBasicsStrings.keyboardHelpDialog.dropObjectStringProperty,
        KeyboardHelpIconFactory.spaceOrEnter(), {
          labelOptions: LABEL_OPTIONS,
          labelInnerContent: ForcesAndMotionBasicsStrings.a11y.keyboardHelpDialog.objectNavigation.dropObjectDescriptionStringProperty
        }
      ),
      KeyboardHelpSectionRow.fromHotkeyData( MotionHotkeyData.RETURN_ITEM_TO_TOOLBOX_HOTKEY_DATA, {
        pdomLabelStringProperty: ForcesAndMotionBasicsStrings.a11y.keyboardHelpDialog.objectNavigation.returnToToolboxDescriptionStringProperty
      } ),
      KeyboardHelpSectionRow.fromHotkeyData( MotionHotkeyData.CANCEL_AND_RETURN_ITEM_TO_ORIGIN_HOTKEY_DATA, {
        pdomLabelStringProperty: ForcesAndMotionBasicsStrings.a11y.keyboardHelpDialog.objectNavigation.cancelMovementStringProperty
      } )
    ] );

    // Sections in the left column.
    const adjustAppliedForceSection = new SpinnerControlsKeyboardHelpSection( {
      headingStringProperty: ForcesAndMotionBasicsStrings.keyboardHelpDialog.adjustAppliedForceStringProperty,
      includeLargerStepsRow: false,
      arrowKeyIconDisplay: SliderControlsKeyboardHelpSection.ArrowKeyIconDisplay.LEFT_RIGHT,
      additionalRows: [
        KeyboardHelpSectionRow.fromHotkeyData( MotionHotkeyData.ZERO_APPLIED_FORCE_HOTKEY_DATA, {
          pdomLabelStringProperty: ForcesAndMotionBasicsStrings.a11y.keyboardHelpDialog.adjustAppliedForce.zeroAppliedForceDescriptionStringProperty
        } )
      ]
    } );

    const leftSections = [
      itemNavigationSection,
      adjustAppliedForceSection
    ];

    // Sections in the right column.
    const rightSections = [
      new BasicActionsKeyboardHelpSection( {
        withCheckboxContent: true
      } )
    ];

    super( leftSections, rightSections, {
      isDisposable: false
    } );
  }
}

forcesAndMotionBasics.register( 'MotionKeyboardHelpContent', MotionKeyboardHelpContent );