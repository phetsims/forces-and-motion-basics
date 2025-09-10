// Copyright 2025, University of Colorado Boulder

/**
 * NetForceKeyboardHelpContent is the content for the keyboard-help dialog in the 'Net Force' screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import TextKeyNode from '../../../../scenery-phet/js/keyboard/TextKeyNode.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';
import NetForceHotkeyData from '../NetForceHotkeyData.js';

export default class NetForceKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor() {

    // Create the "From Anywhere in Sim" section
    const fromAnywhereInSimSection = new KeyboardHelpSection( ForcesAndMotionBasicsStrings.keyboardHelpDialog.fromAnywhereInSimStringProperty, [
      KeyboardHelpSectionRow.fromHotkeyData( NetForceHotkeyData.GO_HOTKEY_DATA, {
        pdomLabelStringProperty: ForcesAndMotionBasicsFluent.a11y.keyboardHelpDialog.fromAnywhereInSim.startGameDescription.createProperty( {
          altOrOptionKey: TextKeyNode.getAltKeyString()
        } )
      } ),
      KeyboardHelpSectionRow.fromHotkeyData( NetForceHotkeyData.PAUSE_HOTKEY_DATA, {
        pdomLabelStringProperty: ForcesAndMotionBasicsFluent.a11y.keyboardHelpDialog.fromAnywhereInSim.pauseGameDescription.createProperty( {
          altOrOptionKey: TextKeyNode.getAltKeyString()
        } )
      } ),
      KeyboardHelpSectionRow.fromHotkeyData( NetForceHotkeyData.RETURN_CART_HOTKEY_DATA, {
        pdomLabelStringProperty: ForcesAndMotionBasicsFluent.a11y.keyboardHelpDialog.fromAnywhereInSim.returnCartToCenterDescription.createProperty( {
          altOrOptionKey: TextKeyNode.getAltKeyString()
        } )
      } )
    ] );

    // Create the puller navigation section
    const pullerNavigationSection = new KeyboardHelpSection( ForcesAndMotionBasicsStrings.keyboardHelpDialog.pullerNavigationStringProperty, [
      KeyboardHelpSectionRow.labelWithIcon(
        ForcesAndMotionBasicsStrings.keyboardHelpDialog.selectPullerStringProperty,
        KeyboardHelpIconFactory.leftRightArrowKeysRowIcon(),
        {
          labelOptions: { lineWrap: 200 },
          labelInnerContent: ForcesAndMotionBasicsStrings.a11y.keyboardHelpDialog.pullerNavigation.selectPullerDescriptionStringProperty
        }
      ),
      KeyboardHelpSectionRow.labelWithIcon(
        ForcesAndMotionBasicsStrings.keyboardHelpDialog.grabPullerStringProperty,
        KeyboardHelpIconFactory.spaceOrEnter(),
        {
          labelOptions: { lineWrap: 200 },
          labelInnerContent: ForcesAndMotionBasicsStrings.a11y.keyboardHelpDialog.pullerNavigation.grabPullerDescriptionStringProperty
        }
      ),
      KeyboardHelpSectionRow.labelWithIcon(
        ForcesAndMotionBasicsStrings.keyboardHelpDialog.moveGrabbedPullerStringProperty,
        KeyboardHelpIconFactory.leftRightArrowKeysRowIcon(),
        {
          labelOptions: { lineWrap: 200 },
          labelInnerContent: ForcesAndMotionBasicsStrings.a11y.keyboardHelpDialog.pullerNavigation.moveGrabbedPullerDescriptionStringProperty
        }
      ),
      KeyboardHelpSectionRow.labelWithIcon(
        ForcesAndMotionBasicsStrings.keyboardHelpDialog.dropPullerStringProperty,
        KeyboardHelpIconFactory.spaceOrEnter(),
        {
          labelOptions: { lineWrap: 200 },
          labelInnerContent: ForcesAndMotionBasicsStrings.a11y.keyboardHelpDialog.pullerNavigation.dropPullerDescriptionStringProperty
        }
      ),
      KeyboardHelpSectionRow.fromHotkeyData( NetForceHotkeyData.pullerNode.returnToToolbox, {
        pdomLabelStringProperty: ForcesAndMotionBasicsStrings.a11y.keyboardHelpDialog.pullerNavigation.returnToToolboxDescriptionStringProperty
      } ),
      KeyboardHelpSectionRow.fromHotkeyData( NetForceHotkeyData.pullerNode.cancelInteraction, {
        pdomLabelStringProperty: ForcesAndMotionBasicsStrings.a11y.keyboardHelpDialog.pullerNavigation.cancelMovementStringProperty
      } )
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