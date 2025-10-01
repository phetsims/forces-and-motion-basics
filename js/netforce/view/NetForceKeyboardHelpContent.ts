// Copyright 2025, University of Colorado Boulder

/**
 * NetForceKeyboardHelpContent is the content for the keyboard-help dialog in the 'Net Force' screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import FromAnywhereInScreenKeyboardHelpSection from './FromAnywhereInScreenKeyboardHelpSection.js';
import PullerNavigationKeyboardHelpSection from './PullerNavigationKeyboardHelpSection.js';

export default class NetForceKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor() {

    // Sections in the left column.
    const leftSections = [
      new FromAnywhereInScreenKeyboardHelpSection(),
      new PullerNavigationKeyboardHelpSection()
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
