// Copyright 2025, University of Colorado Boulder

/**
 * Implements the screen summary for the Net Force screen in Forces and Motion: Basics.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import StringProperty from '../../../../axon/js/StringProperty.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import NetForceModel from '../model/NetForceModel.js';

export default class NetForceScreenSummaryContent extends ScreenSummaryContent {

  /**
   * @param model - The NetForceModel for the screen
   */
  public constructor( model: NetForceModel ) {

    // For now, using hardcoded strings since we're not worrying about i18n yet
    super( {
      playAreaContent: new StringProperty(
        'The play area shows a tug-of-war game. In the center is a cart on wheels with ropes attached to both sides. ' +
        'Blue team pullers are on the left, red team pullers are on the right. ' +
        'When pullers are attached to the rope and the game starts, they pull the cart. ' +
        'The team with more force wins by pulling the cart to their side.'
      ),

      controlAreaContent: new StringProperty(
        'The control area has a Go button to start the game, a Return button to reset the cart position, ' +
        'and checkboxes to show Sum of Forces, Values, and Speed.'
      ),

      currentDetailsContent: new StringProperty(
        'Currently, the cart is centered and not moving. No pullers are attached to the ropes.'
      ),

      interactionHintContent: new StringProperty(
        'Drag pullers from the toolboxes to attach them to knots on the rope. Press Go to start the tug-of-war.'
      )
    } );
  }
}

forcesAndMotionBasics.register( 'NetForceScreenSummaryContent', NetForceScreenSummaryContent );