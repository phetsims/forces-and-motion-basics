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
import ForcesAndMotionBasicsPreferences from '../model/ForcesAndMotionBasicsPreferences.js';
import NetForceModel from '../model/NetForceModel.js';

export default class NetForceScreenSummaryContent extends ScreenSummaryContent {

  /**
   * @param model - The NetForceModel for the screen
   */
  public constructor( model: NetForceModel ) {

    // Play area content includes description and guiding question, similar to Center and Variability
    // Note: description is now a dynamic property that needs team names, so we'll create a derived property
    const playAreaDescriptionProperty = new DerivedProperty(
      [ ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty,
        ForcesAndMotionBasicsFluent.a11y.colors.blueStringProperty,
        ForcesAndMotionBasicsFluent.a11y.colors.redStringProperty,
        ForcesAndMotionBasicsFluent.a11y.colors.purpleStringProperty,
        ForcesAndMotionBasicsFluent.a11y.colors.orangeStringProperty ],
      ( pullerColor, blueString, redString, purpleString, orangeString ) => {
        const leftTeamName = pullerColor === 'purpleOrange' ? purpleString : blueString;
        const rightTeamName = pullerColor === 'purpleOrange' ? orangeString : redString;
        return ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.playArea.description.createProperty( {
          leftTeamName: leftTeamName,
          rightTeamName: rightTeamName
        } ).value;
      }
    );

    const playAreaContent = [
      playAreaDescriptionProperty,
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

        return cartStatus;
      }
    );

    // Team-specific puller information with dynamic team names
    const leftTeamCountProperty = new DerivedProperty(
      [ model.numberBluePullersAttachedProperty, ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty,
        ForcesAndMotionBasicsFluent.a11y.colors.blueStringProperty, ForcesAndMotionBasicsFluent.a11y.colors.purpleStringProperty ],
      ( count: number, pullerColor, blueString, purpleString ) => {
        const teamName = pullerColor === 'purpleOrange' ? purpleString : blueString;
        return ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.currentDetails.leftTeamAttached.createProperty( {
          count: count,
          leftTeamName: teamName
        } ).value;
      }
    );

    const rightTeamCountProperty = new DerivedProperty(
      [ model.numberRedPullersAttachedProperty, ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty,
        ForcesAndMotionBasicsFluent.a11y.colors.redStringProperty, ForcesAndMotionBasicsFluent.a11y.colors.orangeStringProperty ],
      ( count: number, pullerColor, redString, orangeString ) => {
        const teamName = pullerColor === 'purpleOrange' ? orangeString : redString;
        return ForcesAndMotionBasicsFluent.a11y.netForceScreen.screenSummary.currentDetails.rightTeamAttached.createProperty( {
          count: count,
          rightTeamName: teamName
        } ).value;
      }
    );

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