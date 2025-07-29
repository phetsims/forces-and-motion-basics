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

  /**
   * @param model - The MotionModel for the screen
   */
  public constructor( model: MotionModel ) {

    // Play area content includes screen-specific description and guiding question
    const getPlayAreaDescription = () => {
      switch( model.screen ) {
        case 'motion':
          return ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.playArea.descriptionStringProperty;
        case 'friction':
          return ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.playArea.frictionDescriptionStringProperty;
        case 'acceleration':
          return ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.playArea.accelerationDescriptionStringProperty;
        default:
          return ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.playArea.descriptionStringProperty;
      }
    };

    const playAreaContent = [
      getPlayAreaDescription(),
      ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.playArea.guidingQuestionStringProperty
    ];

    // Control area content
    const controlAreaContent = ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.controlArea.descriptionStringProperty;

    // Dynamic current details based on objects on skateboard/ground and motion state
    const objectsDescriptionStringProperty = new DerivedProperty(
      [ model.stackedItems.lengthProperty ],
      ( stackLength: number ) => {
        if ( stackLength === 0 ) {
          return model.screen === 'motion' ?
                 ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.currentDetails.noObjectsOnSkateboardStringProperty.value :
                 ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.currentDetails.noObjectsOnGroundStringProperty.value;
        }
 else {
          return model.screen === 'motion' ?
                 ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.currentDetails.objectsOnSkateboard.format( { count: stackLength } ) :
                 ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.currentDetails.objectsOnGround.format( { count: stackLength } );
        }
      }
    );

    // Motion state description based on velocity
    const motionStateStringProperty = new DerivedProperty(
      [ model.velocityProperty ],
      ( velocity: number ) => {
        const threshold = 0.01; // Small threshold to avoid flickering between states
        if ( Math.abs( velocity ) < threshold ) {
          return ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.currentDetails.motionState.stationaryStringProperty.value;
        }
        else if ( velocity > 0 ) {
          return ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.currentDetails.motionState.movingRightStringProperty.value;
        }
        else {
          return ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.currentDetails.motionState.movingLeftStringProperty.value;
        }
      }
    );

    // Applied force description
    const forceDescriptionStringProperty = new DerivedProperty(
      [ model.appliedForceProperty ],
      ( appliedForce: number ) => {
        const threshold = 1; // Small threshold to avoid flickering
        if ( Math.abs( appliedForce ) < threshold ) {
          return ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.currentDetails.forceDescription.noForceStringProperty.value;
        }
        else if ( appliedForce > 0 ) {
          return ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.currentDetails.forceDescription.appliedForceRightStringProperty.value;
        }
        else {
          return ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.currentDetails.forceDescription.appliedForceLeftStringProperty.value;
        }
      }
    );

    // Combine all current details into a single string
    const currentDetailsStringProperty = DerivedProperty.deriveAny(
      [ objectsDescriptionStringProperty, motionStateStringProperty, forceDescriptionStringProperty ],
      () => {
        const parts = [
          objectsDescriptionStringProperty.value,
          motionStateStringProperty.value,
          forceDescriptionStringProperty.value
        ].filter( text => text.length > 0 );
        return parts.join( ' ' );
      }
    );

    // Current details node
    const currentDetailsNode = new Node( {
      children: [
        new Node( {
          tagName: 'p',
          accessibleName: currentDetailsStringProperty
        } )
      ]
    } );

    // Dynamic interaction hint based on whether objects are on the skateboard/ground
    const interactionHintContentProperty = new DerivedProperty(
      [ model.stackedItems.lengthProperty ],
      ( stackLength: number ) => {
        if ( stackLength === 0 ) {
          return model.screen === 'motion' ?
                 ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.interactionHint.noObjectsStringProperty.value :
                 ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.interactionHint.noObjectsOnGroundStringProperty.value;
        }
 else {
          return ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.interactionHint.withObjectsStringProperty.value;
        }
      }
    );

    super( {
      playAreaContent: playAreaContent,
      controlAreaContent: controlAreaContent,
      currentDetailsContent: {
        node: currentDetailsNode
      },
      interactionHintContent: interactionHintContentProperty
    } );
  }
}

forcesAndMotionBasics.register( 'MotionScreenSummaryContent', MotionScreenSummaryContent );