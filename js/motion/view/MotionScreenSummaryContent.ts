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

    // Play area content includes screen-specific description
    const getPlayAreaDescription = () => {
      switch( model.screen ) {
        case 'motion':
          return ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.playArea.motionDescriptionStringProperty;
        case 'friction':
          return ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.playArea.frictionDescriptionStringProperty;
        case 'acceleration':
          return ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.playArea.accelerationDescriptionStringProperty;
        default:
          throw new Error( `Unknown screen: ${model.screen}` );
      }
    };

    const playAreaContent = [
      getPlayAreaDescription()
    ];

    // Control area content
    const controlAreaContent = model.screen === 'motion' ? ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.controlArea.motionDescriptionStringProperty :
                               model.screen === 'friction' ? ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.controlArea.frictionDescriptionStringProperty :
                               ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.controlArea.accelerationDescriptionStringProperty;

    const onSkateboardProperty = ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.currentDetails.objectsOnSkateboard.createProperty( { count: model.stackedItems.lengthProperty } );
    const onGroundProperty = ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.currentDetails.objectsOnGround.createProperty( { count: model.stackedItems.lengthProperty } );

    // Dynamic current details based on objects on skateboard/ground and motion state
    const objectsDescriptionStringProperty = new DerivedProperty(
      [ model.stackedItems.lengthProperty,
        ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.currentDetails.noObjectsOnSkateboardStringProperty,
        ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.currentDetails.noObjectsOnGroundStringProperty,
        onSkateboardProperty,
        onGroundProperty
      ],
      ( stackLength, noObjectsOnSkateboardString, noObjectsOnGroundString, onSkateboard, onGround ) => {
        if ( stackLength === 0 ) {
          return model.screen === 'motion' ? noObjectsOnSkateboardString : noObjectsOnGroundString;
        }
        else {
          return model.screen === 'motion' ? onSkateboard : onGround;
        }
      }
    );

    // Motion state description based on velocity
    const motionStateStringProperty = new DerivedProperty(
      [
        model.velocityProperty,
        ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.currentDetails.motionState.stationaryStringProperty,
        ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.currentDetails.motionState.movingRightStringProperty,
        ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.currentDetails.motionState.movingLeftStringProperty
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

    // Applied force description
    const forceDescriptionStringProperty = new DerivedProperty(
      [ model.appliedForceProperty,
        ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.currentDetails.forceDescription.noForceStringProperty,
        ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.currentDetails.forceDescription.appliedForceRightStringProperty,
        ForcesAndMotionBasicsFluent.a11y.motionScreen.screenSummary.currentDetails.forceDescription.appliedForceLeftStringProperty
      ],
      ( appliedForce, noForceString, appliedForceRightString, appliedForceLeftString ) => {
        const threshold = 1; // Small threshold to avoid flickering
        if ( Math.abs( appliedForce ) < threshold ) {
          return noForceString;
        }
        else if ( appliedForce > 0 ) {
          return appliedForceRightString;
        }
        else {
          return appliedForceLeftString;
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