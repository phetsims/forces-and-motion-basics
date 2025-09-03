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
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';
import MotionHotkeyData from '../MotionHotkeyData.js';

export default class MotionKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor() {

    // Create the item navigation section
    const itemNavigationSection = new KeyboardHelpSection( ForcesAndMotionBasicsStrings.keyboardHelpDialog.itemNavigationStringProperty, [
      KeyboardHelpSectionRow.labelWithIcon(
        ForcesAndMotionBasicsStrings.keyboardHelpDialog.selectItemStringProperty,
        KeyboardHelpIconFactory.leftRightArrowKeysRowIcon(),
        {
          labelOptions: { lineWrap: 200 },
          labelInnerContent: ForcesAndMotionBasicsStrings.a11y.keyboardHelpDialog.itemNavigation.selectItemDescriptionStringProperty
        }
      ),
      KeyboardHelpSectionRow.labelWithIcon(
        ForcesAndMotionBasicsStrings.keyboardHelpDialog.grabItemStringProperty,
        KeyboardHelpIconFactory.spaceOrEnter(),
        {
          labelOptions: { lineWrap: 200 },
          labelInnerContent: ForcesAndMotionBasicsStrings.a11y.keyboardHelpDialog.itemNavigation.grabItemDescriptionStringProperty
        }
      ),
      KeyboardHelpSectionRow.labelWithIcon(
        ForcesAndMotionBasicsStrings.keyboardHelpDialog.moveGrabbedItemStringProperty,
        KeyboardHelpIconFactory.leftRightArrowKeysRowIcon(),
        {
          labelOptions: { lineWrap: 200 },
          labelInnerContent: ForcesAndMotionBasicsStrings.a11y.keyboardHelpDialog.itemNavigation.moveGrabbedItemDescriptionStringProperty
        }
      ),
      KeyboardHelpSectionRow.labelWithIcon(
        ForcesAndMotionBasicsStrings.keyboardHelpDialog.dropItemStringProperty,
        KeyboardHelpIconFactory.spaceOrEnter(),
        {
          labelOptions: { lineWrap: 200 },
          labelInnerContent: ForcesAndMotionBasicsStrings.a11y.keyboardHelpDialog.itemNavigation.dropItemDescriptionStringProperty
        }
      )
    ] );

    // Sections in the left column.
    const adjustAppliedForceSection = new SliderControlsKeyboardHelpSection( {
      headingStringProperty: ForcesAndMotionBasicsStrings.keyboardHelpDialog.adjustAppliedForceStringProperty,
      includeLargerStepsRow: true,
      arrowKeyIconDisplay: SliderControlsKeyboardHelpSection.ArrowKeyIconDisplay.LEFT_RIGHT,
      additionalRows: [
        KeyboardHelpSectionRow.fromHotkeyData( MotionHotkeyData.ZERO_APPLIED_FORCE_HOTKEY_DATA, {
          pdomLabelStringProperty: ForcesAndMotionBasicsStrings.a11y.keyboardHelpDialog.appliedForceControls.zeroAppliedForceDescriptionStringProperty
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