// Copyright 2025, University of Colorado Boulder

/**
 * Implements the screen summary for the Motion, Friction, and Acceleration screens in Forces and Motion: Basics.
 * This follows the pattern established in the Net Force screen with dynamic content and proper structure.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import MotionModel from '../model/MotionModel.js';

export default class MotionScreenSummaryContent extends ScreenSummaryContent {

  public constructor( model: MotionModel ) {

    const playAreaContent = model.screen === 'motion' ? ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.playArea.motionDescriptionStringProperty :
                            model.screen === 'friction' ? ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.playArea.frictionDescriptionStringProperty :
                            ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.playArea.accelerationDescriptionStringProperty;

    // Control area content
    const controlAreaContent = model.screen === 'motion' ? ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.controlArea.motionDescriptionStringProperty :
                               model.screen === 'friction' ? ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.controlArea.frictionDescriptionStringProperty :
                               ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.controlArea.accelerationDescriptionStringProperty;

    // Determine surface label based on screen
    const surfaceStringProperty = model.screen === 'motion' ?
                                  ForcesAndMotionBasicsFluent.a11y.motionScreen.surface.skateboardStringProperty :
                                  ForcesAndMotionBasicsFluent.a11y.motionScreen.surface.groundStringProperty;

    // Motion state adjectives ("moving left", "moving right", "stationary") based on velocity
    const stackStateStringProperty = new DerivedProperty(
      [
        model.velocityProperty,
        ForcesAndMotionBasicsFluent.a11y.motionScreen.stackState.stationaryStringProperty,
        ForcesAndMotionBasicsFluent.a11y.motionScreen.stackState.movingRightStringProperty,
        ForcesAndMotionBasicsFluent.a11y.motionScreen.stackState.movingLeftStringProperty
      ],
      ( velocity, stationaryString, movingRightString, movingLeftString ) => {
        const threshold = 0.01; // Small threshold to avoid flickering between states
        if ( Math.abs( velocity ) < threshold ) {
          return stationaryString;
        }
        else if ( velocity > 0 ) {
          return movingRightString;
        }
        else {
          return movingLeftString;
        }
      }
    );

    // "Currently, N objects on the SURFACE. Stack is STATE." (omit second sentence when N=0)
    const currentDetailsStringProperty = ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.currentDetails.summary.createProperty( {
      count: model.stackedItems.lengthProperty,
      surface: surfaceStringProperty,
      motionState: stackStateStringProperty
    } );

    // Current details node
    const currentDetailsNode = new Node( {
      children: [
        new Node( {
          tagName: 'p',
          accessibleName: currentDetailsStringProperty
        } )
      ]
    } );

    super( {
      playAreaContent: playAreaContent,
      controlAreaContent: controlAreaContent,
      currentDetailsContent: {
        node: currentDetailsNode
      },
      interactionHintContent: ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.interactionHintStringProperty
    } );
  }
}

forcesAndMotionBasics.register( 'MotionScreenSummaryContent', MotionScreenSummaryContent );