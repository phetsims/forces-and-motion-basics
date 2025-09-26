// Copyright 2025, University of Colorado Boulder

/**
 * MotionForcesListDescription provides an accessible list of the current force arrow values in the Motion screens.
 * This appears under a "Forces" heading and shows applied force, friction force, and sum of forces when applicable.
 *
 * General behavior:
 * - Uses qualitative descriptions when Values is unchecked; quantitative otherwise.
 * - Applied/Friction items are omitted if zero or if the Forces checkbox is unchecked.
 * - Sum of Forces item is omitted when its checkbox is unchecked.
 * - When Sum of Forces equals zero, always reads "Sum of forces is 0" regardless of Values state.
 * - If no items are shown, the Forces heading is hidden.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import { roundSymmetric } from '../../../../dot/js/util/roundSymmetric.js';
import AccessibleListNode from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import getQualitativeForceDescription from '../../common/view/getQualitativeForceDescription.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import MotionModel from '../model/MotionModel.js';

const THRESHOLD = 1e-6;

export default class MotionForcesDescriptionNode extends Node {
  private readonly forcesList: AccessibleListNode | null = null;
  public readonly netForceDescriptionProperty: TReadOnlyProperty<string>;

  public constructor( model: MotionModel ) {

    // Rounded values to match on-screen arrow labels (see MotionScreenView implementation)
    const roundedAppliedForceProperty = new DerivedProperty( [ model.appliedForceProperty ], f => roundSymmetric( f ) );
    const roundedFrictionForceProperty = new DerivedProperty( [ model.frictionForceProperty ], f => roundSymmetric( f ) );
    const roundedSumProperty = new DerivedProperty( [ roundedAppliedForceProperty, roundedFrictionForceProperty ],
      ( a, b ) => a + b );

    // Visibility for each list item
    const appliedVisibleProperty = new DerivedProperty( [ model.showForceProperty, roundedAppliedForceProperty ], ( show, f ) => show && Math.abs( f ) > THRESHOLD );
    const frictionVisibleProperty = new DerivedProperty( [ model.showForceProperty, roundedFrictionForceProperty ], ( show, f ) => show && Math.abs( f ) > THRESHOLD );
    const anyVisibleProperty = DerivedProperty.or( [ appliedVisibleProperty, frictionVisibleProperty, model.showSumOfForcesProperty ] );

    super( {
      tagName: 'div',
      accessibleHeading: ForcesAndMotionBasicsFluent.a11y.forces.headingStringProperty,
      visibleProperty: anyVisibleProperty
    } );

    // Dependencies for qualitative descriptions so language changes recompute values
    const qualitativeStringDependencies = [
      ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.verySmallStringProperty,
      ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.smallStringProperty,
      ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.mediumStringProperty,
      ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.somewhatLargeStringProperty,
      ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.largeStringProperty,
      ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.veryLargeStringProperty,
      ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.extremelyLargeStringProperty
    ];

    // Applied item description (magnitude only)
    const appliedMagnitudeDescriptionProperty = DerivedProperty.deriveAny( [
      roundedAppliedForceProperty,
      model.showValuesProperty,
      ...ForcesAndMotionBasicsFluent.a11y.forces.quantitativeDescription.getDependentProperties(),
      ...qualitativeStringDependencies
    ], () => this.getForceDescription( roundedAppliedForceProperty.value, model.showValuesProperty.value ) );

    // Applied item direction string
    const appliedDirectionProperty = DerivedProperty.deriveAny( [
      roundedAppliedForceProperty,
      ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.leftStringProperty,
      ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.rightStringProperty
    ], () => roundedAppliedForceProperty.value >= 0 ?
             ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.rightStringProperty.value :
             ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.leftStringProperty.value );

    // Wrap into full "Applied force arrow ..." string
    const appliedItemStringProperty = ForcesAndMotionBasicsFluent.a11y.forces.appliedForceArrow.createProperty( {
      description: appliedMagnitudeDescriptionProperty,
      direction: appliedDirectionProperty
    } );

    // Friction item description (magnitude only)
    const frictionMagnitudeDescriptionProperty = DerivedProperty.deriveAny( [
      roundedFrictionForceProperty,
      model.showValuesProperty,
      ...ForcesAndMotionBasicsFluent.a11y.forces.quantitativeDescription.getDependentProperties(),
      ...qualitativeStringDependencies
    ], () => this.getForceDescription( roundedFrictionForceProperty.value, model.showValuesProperty.value ) );

    // Friction item direction string
    const frictionDirectionProperty = DerivedProperty.deriveAny( [
      roundedFrictionForceProperty,
      ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.leftStringProperty,
      ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.rightStringProperty
    ], () => roundedFrictionForceProperty.value >= 0 ?
             ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.rightStringProperty.value :
             ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.leftStringProperty.value );

    const frictionItemStringProperty = ForcesAndMotionBasicsFluent.a11y.forces.frictionForceArrow.createProperty( {
      description: frictionMagnitudeDescriptionProperty,
      direction: frictionDirectionProperty
    } );

    // Sum item description and direction
    const sumMagnitudeDescriptionProperty = DerivedProperty.deriveAny( [
      roundedSumProperty,
      model.showValuesProperty,
      ...ForcesAndMotionBasicsFluent.a11y.forces.quantitativeDescription.getDependentProperties(),
      ...qualitativeStringDependencies
    ], () => this.getForceDescription( roundedSumProperty.value, model.showValuesProperty.value ) );

    const sumDirectionProperty = DerivedProperty.deriveAny( [
      roundedSumProperty,
      ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.leftStringProperty,
      ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.rightStringProperty
    ], () => roundedSumProperty.value >= 0 ?
             ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.rightStringProperty.value :
             ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.leftStringProperty.value );

    const sumArrowStringProperty = ForcesAndMotionBasicsFluent.a11y.forces.sumOfForcesArrow.createProperty( {
      description: sumMagnitudeDescriptionProperty,
      direction: sumDirectionProperty
    } );

    const sumZeroStringProperty = ForcesAndMotionBasicsFluent.a11y.forces.sumOfForcesZeroStringProperty;
    const sumIsZeroProperty = new DerivedProperty( [ roundedSumProperty ], sum => Math.abs( sum ) < THRESHOLD );
    this.netForceDescriptionProperty = new DerivedProperty(
      [ sumIsZeroProperty, sumZeroStringProperty, sumArrowStringProperty ],
      ( sumIsZero, sumZeroString, sumArrowString ) => sumIsZero ? sumZeroString : sumArrowString
    );

    this.forcesList = new AccessibleListNode( [
      { stringProperty: appliedItemStringProperty, visibleProperty: appliedVisibleProperty },
      { stringProperty: frictionItemStringProperty, visibleProperty: frictionVisibleProperty },
      { stringProperty: this.netForceDescriptionProperty, visibleProperty: model.showSumOfForcesProperty }
    ] );

    this.addChild( this.forcesList );
  }

  private getForceDescription( force: number, showValues: boolean ): string {
    const magnitude = Math.abs( force );
    if ( showValues ) {
      return ForcesAndMotionBasicsFluent.a11y.forces.quantitativeDescription.format( {
        forceMagnitude: magnitude.toString()
      } );
    }
    else {
      return getQualitativeForceDescription( magnitude );
    }
  }
}

forcesAndMotionBasics.register( 'MotionForcesDescriptionNode', MotionForcesDescriptionNode );