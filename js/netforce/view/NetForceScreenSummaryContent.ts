// Copyright 2025, University of Colorado Boulder

/**
 * Implements the screen summary for the Net Force screen in Forces and Motion: Basics.
 * This follows the pattern established in Center and Variability with dynamic content and proper structure.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import NetForceModel from '../model/NetForceModel.js';

export default class NetForceScreenSummaryContent extends ScreenSummaryContent {

  /**
   * @param model - The NetForceModel for the screen
   */
  public constructor( model: NetForceModel ) {

    // Control area content
    const controlAreaContent = ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.controlArea.descriptionStringProperty;

    // Dynamic current details based on cart position and puller attachments
    const currentDetailsStringProperty = new DerivedProperty( [
        model.isRunningProperty,
        model.stateProperty,
        ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.currentDetails.accessibleNameInProgressStringProperty,
        ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.currentDetails.accessibleNameNotStartedStringProperty,
        ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.currentDetails.accessibleNameCompletedStringProperty
      ],
      ( isRunning, state, inProgress, notStarted, completed ) => isRunning ? inProgress :
                                                                 state === 'experimenting' ? notStarted :
                                                                 completed
    );

    // Team-specific puller information with dynamic team names
    const leftTeamCountProperty = ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.currentDetails.teamAttached.createProperty( {
      count: model.numberBluePullersAttachedProperty,
      color: model.leftTeamColorProperty
    } );

    const rightTeamCountProperty = ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.currentDetails.teamAttached.createProperty( {
      count: model.numberRedPullersAttachedProperty,
      color: model.rightTeamColorProperty
    } );

    const hasAnyPullersAttachedProperty = new DerivedProperty( [
      model.numberBluePullersAttachedProperty,
      model.numberRedPullersAttachedProperty
    ], ( leftCount, rightCount ) => leftCount + rightCount > 0 );

    const currentDetailsNode = new Node( {
      children: [
        new Node( {
          tagName: 'p',
          accessibleName: currentDetailsStringProperty
        } ),
        new Node( {
          tagName: 'p',
          accessibleName: leftTeamCountProperty,
          visibleProperty: hasAnyPullersAttachedProperty
        } ),
        new Node( {
          tagName: 'p',
          accessibleName: rightTeamCountProperty,
          visibleProperty: hasAnyPullersAttachedProperty
        } ),
        new Node( {
          tagName: 'p',
          accessibleName: ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.currentDetails.noPullersAttachedStringProperty,
          visibleProperty: DerivedProperty.not( hasAnyPullersAttachedProperty )
        } )
      ]
    } );

    super( {
      playAreaContent: ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.playArea.description.createProperty( {
        leftColor: ForcesAndMotionBasicsFluent.a11y.netForceScreen.colorName.createProperty( {
          color: model.leftTeamColorProperty
        } ),
        rightColor: ForcesAndMotionBasicsFluent.a11y.netForceScreen.colorName.createProperty( {
          color: model.rightTeamColorProperty
        } ),
        leftTeamName: ForcesAndMotionBasicsFluent.a11y.netForceScreen.teamName.createProperty( {
          color: model.leftTeamColorProperty
        } ),
        rightTeamName: ForcesAndMotionBasicsFluent.a11y.netForceScreen.teamName.createProperty( {
          color: model.rightTeamColorProperty
        } )
      } ),
      controlAreaContent: controlAreaContent,
      currentDetailsContent: {
        node: currentDetailsNode
      },
      interactionHintContent: ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.interactionHintStringProperty
    } );
  }
}

forcesAndMotionBasics.register( 'NetForceScreenSummaryContent', NetForceScreenSummaryContent );