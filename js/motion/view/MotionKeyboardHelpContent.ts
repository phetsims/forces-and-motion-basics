// Copyright 2025, University of Colorado Boulder

/**
 * MotionKeyboardHelpContent is the content for the keyboard-help dialog in the Motion screens.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import SliderControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/SliderControlsKeyboardHelpSection.js';
import SpinnerControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/SpinnerControlsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import MotionHotkeyData from './MotionHotkeyData.js';
import ObjectNavigationKeyboardHelpSection from './ObjectNavigationKeyboardHelpSection.js';

export default class MotionKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor() {

    // Sections in the left column.
    const adjustAppliedForceSection = new SpinnerControlsKeyboardHelpSection( {
      headingStringProperty: ForcesAndMotionBasicsFluent.keyboardHelpDialog.adjustAppliedForceStringProperty,
      includeLargerStepsRow: false,
      arrowKeyIconDisplay: SliderControlsKeyboardHelpSection.ArrowKeyIconDisplay.LEFT_RIGHT,
      additionalRows: [
        KeyboardHelpSectionRow.fromHotkeyData( MotionHotkeyData.ZERO_APPLIED_FORCE_HOTKEY_DATA, {
          pdomLabelStringProperty: ForcesAndMotionBasicsFluent.a11y.keyboardHelpDialog.adjustAppliedForce.zeroAppliedForceDescriptionStringProperty
        } )
      ]
    } );

    const leftSections = [
      new ObjectNavigationKeyboardHelpSection(),
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
