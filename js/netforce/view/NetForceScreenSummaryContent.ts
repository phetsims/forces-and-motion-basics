// Copyright 2025, University of Colorado Boulder

/**
 * Implements the screen summary for the Net Force screen in Forces and Motion: Basics.
 * This follows the pattern established in Center and Variability with dynamic content and proper structure.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import NetForceModel from '../model/NetForceModel.js';

export default class NetForceScreenSummaryContent extends ScreenSummaryContent {

  /**
   * @param model - The NetForceModel for the screen
   */
  public constructor( model: NetForceModel ) {

    // Play area content includes description and guiding question, similar to Center and Variability
    const playAreaContent = [
      ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.playArea.descriptionStringProperty,
      ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.playArea.guidingQuestionStringProperty
    ];

    // Control area content
    const controlAreaContent = ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.controlArea.descriptionStringProperty;

    // Dynamic current details based on cart position and puller attachments
    const currentDetailsStringProperty = new DerivedProperty(
      [ model.cart.positionProperty, model.numberPullersAttachedProperty ],
      ( cartPosition: number, numberAttached: number ) => {
        const cartStatus = Math.abs( cartPosition ) < 0.1 ?
                           ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.currentDetails.cartCenteredStringProperty.value :
                           ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.currentDetails.cartMovingStringProperty.value;

        const pullerStatus = numberAttached === 0 ?
                             ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.currentDetails.noPullersAttachedStringProperty.value :
                             StringUtils.fillIn( ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.currentDetails.pullersAttachedStringProperty.value, {
                               0: numberAttached
                             } );

        return `${cartStatus} ${pullerStatus}`;
      }
    );

    // Team-specific puller information
    const blueTeamCountProperty = new DerivedProperty(
      [ model.numberBluePullersAttachedProperty ],
      ( count: number ) => {
        return count > 0 ? StringUtils.fillIn( ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.currentDetails.blueTeamAttachedStringProperty.value, {
          0: count
        } ) : '';
      }
    );

    const redTeamCountProperty = new DerivedProperty(
      [ model.numberRedPullersAttachedProperty ],
      ( count: number ) => {
        return count > 0 ? StringUtils.fillIn( ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.currentDetails.redTeamAttachedStringProperty.value, {
          0: count
        } ) : '';
      }
    );

    // Combine team information for additional details
    const teamDetailsStringProperty = DerivedProperty.deriveAny(
      [ blueTeamCountProperty, redTeamCountProperty ],
      () => {
        const blueText = blueTeamCountProperty.value;
        const redText = redTeamCountProperty.value;
        const parts = [ blueText, redText ].filter( text => text.length > 0 );
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

    // Dynamic interaction hint based on whether pullers are attached
    const interactionHintContentProperty = new DerivedProperty(
      [ model.numberPullersAttachedProperty ],
      ( numberAttached: number ) => {
        return numberAttached === 0 ?
               ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.interactionHint.noPullersStringProperty.value :
               ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.interactionHint.withPullersStringProperty.value;
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

forcesAndMotionBasics.register( 'NetForceScreenSummaryContent', NetForceScreenSummaryContent );