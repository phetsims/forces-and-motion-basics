// Copyright 2025, University of Colorado Boulder

/**
 * PullerNavigationKeyboardHelpSection encapsulates the keyboard help rows for selecting and manipulating pullers.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import { RichTextOptions } from '../../../../scenery/js/nodes/RichText.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';
import NetForceHotkeyData from './NetForceHotkeyData.js';

const LABEL_OPTIONS: RichTextOptions = { lineWrap: 200 };

export default class PullerNavigationKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {
    super( ForcesAndMotionBasicsStrings.keyboardHelpDialog.pullerNavigationStringProperty, [
      KeyboardHelpSectionRow.labelWithIconList(
        ForcesAndMotionBasicsStrings.keyboardHelpDialog.selectPullerStringProperty,
        [
          KeyboardHelpIconFactory.leftRightArrowKeysRowIcon(),
          KeyboardHelpIconFactory.aDKeysRowIcon()
        ],
        {
          labelOptions: LABEL_OPTIONS,
          labelInnerContent: ForcesAndMotionBasicsStrings.a11y.keyboardHelpDialog.pullerNavigation.selectPullerDescriptionStringProperty
        }
      ),
      KeyboardHelpSectionRow.labelWithIcon(
        ForcesAndMotionBasicsStrings.keyboardHelpDialog.grabPullerStringProperty,
        KeyboardHelpIconFactory.spaceOrEnter(),
        {
          labelOptions: LABEL_OPTIONS,
          labelInnerContent: ForcesAndMotionBasicsStrings.a11y.keyboardHelpDialog.pullerNavigation.grabPullerDescriptionStringProperty
        }
      ),
      KeyboardHelpSectionRow.labelWithIconList(
        ForcesAndMotionBasicsStrings.keyboardHelpDialog.moveGrabbedPullerStringProperty,
        [
          KeyboardHelpIconFactory.leftRightArrowKeysRowIcon(),
          KeyboardHelpIconFactory.aDKeysRowIcon()
        ],
        {
          labelOptions: LABEL_OPTIONS,
          labelInnerContent: ForcesAndMotionBasicsStrings.a11y.keyboardHelpDialog.pullerNavigation.moveGrabbedPullerDescriptionStringProperty
        }
      ),
      KeyboardHelpSectionRow.labelWithIcon(
        ForcesAndMotionBasicsStrings.keyboardHelpDialog.dropPullerStringProperty,
        KeyboardHelpIconFactory.spaceOrEnter(),
        {
          labelOptions: LABEL_OPTIONS,
          labelInnerContent: ForcesAndMotionBasicsStrings.a11y.keyboardHelpDialog.pullerNavigation.dropPullerDescriptionStringProperty
        }
      ),
      KeyboardHelpSectionRow.fromHotkeyData( NetForceHotkeyData.PULLER_NODE.returnToToolbox, {
        pdomLabelStringProperty: ForcesAndMotionBasicsStrings.a11y.keyboardHelpDialog.pullerNavigation.returnToToolboxDescriptionStringProperty
      } ),
      KeyboardHelpSectionRow.fromHotkeyData( NetForceHotkeyData.PULLER_NODE.cancelInteraction, {
        pdomLabelStringProperty: ForcesAndMotionBasicsStrings.a11y.keyboardHelpDialog.pullerNavigation.cancelMovementStringProperty
      } )
    ] );
  }
}

forcesAndMotionBasics.register( 'PullerNavigationKeyboardHelpSection', PullerNavigationKeyboardHelpSection );
