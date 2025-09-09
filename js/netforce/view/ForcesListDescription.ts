// Copyright 2025, University of Colorado Boulder

/**
 * ForcesListDescription provides an accessible list of the current force arrow values in the Net Force screen.
 * This appears under a "Forces" heading and shows left, right, and sum of forces when applicable.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import AccessibleListNode from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import getQualitativeForceDescription from '../../common/view/getQualitativeForceDescription.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import NetForceModel from '../model/NetForceModel.js';

export default class ForcesListDescription extends Node {
  private readonly forcesList: AccessibleListNode | null = null;
  public readonly netForceDescriptionProperty: TReadOnlyProperty<string>;

  public constructor( private readonly model: NetForceModel ) {

    const THRESHOLD = 1e-6;

    // Visibility: show this container only if any section is visible.
    const leftVisibleProperty = new DerivedProperty( [ model.leftForceProperty ], left => Math.abs( left ) > THRESHOLD );
    const rightVisibleProperty = new DerivedProperty( [ model.rightForceProperty ], right => Math.abs( right ) > THRESHOLD );
    const anyVisibleProperty = DerivedProperty.or( [ leftVisibleProperty, rightVisibleProperty, model.showSumOfForcesProperty ] );

    super( {
      tagName: 'div',
      accessibleHeading: ForcesAndMotionBasicsFluent.a11y.forces.headingStringProperty,
      visibleProperty: anyVisibleProperty
    } );

    // Keep disposables tied to this Node lifecycle

    // Dependencies for qualitative descriptions so language changes recompute values.
    const qualitativeStringDependencies = [
      ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.smallStringProperty,
      ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.mediumSmallStringProperty,
      ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.mediumStringProperty,
      ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.mediumLargeStringProperty,
      ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.largeStringProperty,
      ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.veryLargeStringProperty,
      ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.extremelyLargeStringProperty
    ];

    // LEFT item description text (without the "left force" wrapper)
    const leftDescriptionProperty = DerivedProperty.deriveAny( [
      model.leftForceProperty,
      model.showValuesProperty,
      ...ForcesAndMotionBasicsFluent.a11y.forces.quantitativeDescription.getDependentProperties(),
      ...qualitativeStringDependencies
    ], () => this.getForceDescription( model.leftForceProperty.value, model.showValuesProperty.value ) );

    // RIGHT item description text
    const rightDescriptionProperty = DerivedProperty.deriveAny( [
      model.rightForceProperty,
      model.showValuesProperty,
      ...ForcesAndMotionBasicsFluent.a11y.forces.quantitativeDescription.getDependentProperties(),
      ...qualitativeStringDependencies
    ], () => this.getForceDescription( model.rightForceProperty.value, model.showValuesProperty.value ) );

    // SUM item description text (magnitude only)
    const sumMagnitudeDescriptionProperty = DerivedProperty.deriveAny( [
      model.netForceProperty,
      model.showValuesProperty,
      ...ForcesAndMotionBasicsFluent.a11y.forces.quantitativeDescription.getDependentProperties(),
      ...qualitativeStringDependencies
    ], () => this.getForceDescription( model.netForceProperty.value, model.showValuesProperty.value ) );

    // SUM item direction string (localized left/right)
    const sumDirectionProperty = DerivedProperty.deriveAny( [
      model.netForceProperty,
      ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.leftStringProperty,
      ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.rightStringProperty
    ], () => model.netForceProperty.value >= 0 ?
             ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.rightStringProperty.value :
             ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.leftStringProperty.value );

    // Wrap LEFT/RIGHT descriptions with arrow labels.
    const leftItemStringProperty = ForcesAndMotionBasicsFluent.a11y.forces.leftForceArrow.createProperty( {
      description: leftDescriptionProperty
    } );
    const rightItemStringProperty = ForcesAndMotionBasicsFluent.a11y.forces.rightForceArrow.createProperty( {
      description: rightDescriptionProperty
    } );

    // SUM item: choose between zero text and arrow text based on net force value, but always controlled by checkbox visibility
    const sumIsZeroProperty = new DerivedProperty( [ model.netForceProperty ], net => Math.abs( net ) < THRESHOLD );

    const sumArrowStringProperty = ForcesAndMotionBasicsFluent.a11y.forces.sumOfForcesArrow.createProperty( {
      description: sumMagnitudeDescriptionProperty,
      direction: sumDirectionProperty
    } );

    this.netForceDescriptionProperty = new DerivedProperty(
      [ sumIsZeroProperty, ForcesAndMotionBasicsFluent.a11y.forces.sumOfForcesZeroStringProperty, sumArrowStringProperty ],
      ( sumIsZero, sumZeroString, sumArrowString ) => sumIsZero ? sumZeroString : sumArrowString
    );

    // Build the AccessibleListNode once with three potential items, each with its own visibility
    this.forcesList = new AccessibleListNode( [
      { stringProperty: leftItemStringProperty, visibleProperty: leftVisibleProperty },
      { stringProperty: rightItemStringProperty, visibleProperty: rightVisibleProperty },
      { stringProperty: this.netForceDescriptionProperty, visibleProperty: model.showSumOfForcesProperty }
    ] );

    this.addChild( this.forcesList );
  }

  /**
   * Gets the appropriate description for a force value based on whether values are shown
   * TODO: This looks like memory leaks, see https://github.com/phetsims/forces-and-motion-basics/issues/431
   */
  private getForceDescription( force: number, showValues: boolean ): string {
    const magnitude = Math.abs( force );

    if ( showValues ) {
      // Quantitative description with newtons using Fluent pattern
      return ForcesAndMotionBasicsFluent.a11y.forces.quantitativeDescription.format( {
        forceMagnitude: magnitude.toString()
      } );
    }
    else {
      // Qualitative description using same thresholds as ReadoutArrow
      return getQualitativeForceDescription( magnitude );
    }
  }
}

forcesAndMotionBasics.register( 'ForcesListDescription', ForcesListDescription );