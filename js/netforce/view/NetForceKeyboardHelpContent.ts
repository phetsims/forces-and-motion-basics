// Copyright 2025, University of Colorado Boulder

/**
 * NetForceKeyboardHelpContent is the content for the keyboard-help dialog in the 'Net Force' screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';
import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import NetForceHotkeyData from '../NetForceHotkeyData.js';

export default class NetForceKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor() {

    // Create the "From Anywhere in Sim" section
    const fromAnywhereInSimSection = new KeyboardHelpSection( ForcesAndMotionBasicsStrings.keyboardHelpDialog.fromAnywhereInSimStringProperty, [
      KeyboardHelpSectionRow.fromHotkeyData( NetForceHotkeyData.GO_HOTKEY_DATA ),
      KeyboardHelpSectionRow.fromHotkeyData( NetForceHotkeyData.PAUSE_HOTKEY_DATA ),
      KeyboardHelpSectionRow.fromHotkeyData( NetForceHotkeyData.RETURN_CART_HOTKEY_DATA )
    ] );

    // Create the puller navigation section
    const pullerNavigationSection = new KeyboardHelpSection( ForcesAndMotionBasicsStrings.keyboardHelpDialog.pullerNavigationStringProperty, [
      KeyboardHelpSectionRow.labelWithIcon(
        ForcesAndMotionBasicsStrings.keyboardHelpDialog.selectPullerStringProperty,
        KeyboardHelpIconFactory.leftRightArrowKeysRowIcon(),
        { labelOptions: { lineWrap: 200 } }
      ),
      KeyboardHelpSectionRow.labelWithIcon(
        ForcesAndMotionBasicsStrings.keyboardHelpDialog.grabPullerStringProperty,
        KeyboardHelpIconFactory.spaceOrEnter(),
        { labelOptions: { lineWrap: 200 } }
      ),
      KeyboardHelpSectionRow.labelWithIcon(
        ForcesAndMotionBasicsStrings.keyboardHelpDialog.moveGrabbedPullerStringProperty,
        KeyboardHelpIconFactory.leftRightArrowKeysRowIcon(),
        { labelOptions: { lineWrap: 200 } }
      ),
      KeyboardHelpSectionRow.labelWithIcon(
        ForcesAndMotionBasicsStrings.keyboardHelpDialog.dropPullerStringProperty,
        KeyboardHelpIconFactory.spaceOrEnter(),
        { labelOptions: { lineWrap: 200 } }
      )
    ] );

    // Sections in the left column.
    const leftSections = [
      fromAnywhereInSimSection,
      pullerNavigationSection
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

forcesAndMotionBasics.register( 'NetForceKeyboardHelpContent', NetForceKeyboardHelpContent );