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
        ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.currentDetails.accessibleNameInProgressStringProperty,
        ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.currentDetails.accessibleNameNotStartedStringProperty
      ],
      ( isRunning, inProgress, notStarted ) => isRunning ? inProgress : notStarted
    );

    // Team-specific puller information with dynamic team names
    const leftTeamCountProperty = ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.currentDetails.teamAttached.createProperty( {
      count: model.numberBluePullersAttachedProperty,
      teamName: model.leftTeamColorProperty
    } );

    const rightTeamCountProperty = ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.currentDetails.teamAttached.createProperty( {
      count: model.numberRedPullersAttachedProperty,
      teamName: model.rightTeamColorProperty
    } );

    // Combine team information for additional details
    const teamDetailsStringProperty = DerivedProperty.deriveAny(
      [ leftTeamCountProperty, rightTeamCountProperty ],
      () => {
        const leftText = leftTeamCountProperty.value;
        const rightText = rightTeamCountProperty.value;
        const parts = [ leftText, rightText ].filter( text => text.length > 0 );
        return parts.length > 0 ? parts.join( ' ' ) : '';
      }
    );

    // Current details node that combines all the dynamic information
    const currentDetailsNode = new Node( {
      children: [
        new Node( {
          tagName: 'p',
          accessibleName: currentDetailsStringProperty
        } ),
        new Node( {
          tagName: 'p',
          accessibleName: teamDetailsStringProperty,
          visibleProperty: DerivedProperty.valueNotEqualsConstant( teamDetailsStringProperty, '' )
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