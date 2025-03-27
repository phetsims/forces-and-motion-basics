// Copyright 2013-2025, University of Colorado Boulder

/**
 * A big round Go/Pause button that appears when the user has attached any nonzero number of pullers to the rope
 * which can be used to start/pause the animation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import { BooleanToggleNodeOptions } from '../../../../sun/js/BooleanToggleNode.js';
import BooleanRoundToggleButton from '../../../../sun/js/buttons/BooleanRoundToggleButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';
import NetForceModel from '../model/NetForceModel.js';

//Given nodes that have possibly different sizes, wrap the specified node in a parent empty Rectangle node so the bounds will match up
//If the node is already the largest, don't wrap it.
//Centers all the nodes in the parent wrappers

type SelfOptions = EmptySelfOptions;
type GoPauseButtonOptions = BooleanToggleNodeOptions & SelfOptions;
export default class GoPauseButton extends BooleanRoundToggleButton {

  /**
   * Create a GoPauseButton that appears below the candy cart when a puller has been attached to the rope.
   *
   * @param model the NetForceModel
   * @param layoutWidth the layout width for centering the button
   * @param tandem
   * @param providedOptions
   */
  public constructor( model: NetForceModel, layoutWidth: number, tandem: Tandem, providedOptions?: GoPauseButtonOptions ) {

    const options = optionize<GoPauseButtonOptions, SelfOptions, BooleanToggleNodeOptions>()( {
      top: 400,
      enabledPropertyOptions: {
        phetioReadOnly: true
      }
    }, providedOptions );
    const goText = new Text( ForcesAndMotionBasicsStrings.goStringProperty, {
      font: new PhetFont( 42 ),
      maxWidth: 85
    } );
    const pauseText = new Text( ForcesAndMotionBasicsStrings.pauseStringProperty, {
      font: new PhetFont( 30 ),
      maxWidth: 85
    } );

    // boolean function to determine if the go button should be enabled based on model state.
    const isGoButtonEnabled = () => model.stateProperty.get() !== 'completed' && ( model.numberPullersAttachedProperty.get() > 0 || model.isRunningProperty.get() );

    super( model.isRunningProperty, pauseText, goText, options );

    model.isRunningProperty.link( isRunning => {
      this.baseColor = isRunning ? '#df1a22' : '#94b830';
    } );

    //Show the go/pause button if any pullers are attached or if the cart got started moving, and if it hasn't already finished a match, see #61
    Multilink.multilink( [ model.isRunningProperty, model.stateProperty, model.numberPullersAttachedProperty ], () => {
      this.enabled = isGoButtonEnabled();
    } );

    this.centerX = layoutWidth / 2;
  }
}

forcesAndMotionBasics.register( 'GoPauseButton', GoPauseButton );