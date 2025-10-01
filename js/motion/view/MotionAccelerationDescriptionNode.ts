// Copyright 2025, University of Colorado Boulder

/**
 * MotionAccelerationDescription provides an accessible description of acceleration
 * for the Motion Acceleration screen. Shown under a "Acceleration" heading when the
 * Acceleration checkbox is enabled. Mirrors MotionScreensSpeedDescription patterns.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import MotionModel from '../model/MotionModel.js';

export default class MotionAccelerationDescriptionNode extends Node {
  public readonly accelerationDescriptionProperty: TReadOnlyProperty<string>;

  public constructor( model: MotionModel ) {

    // Qualitative descriptor based on magnitude, using Fluent strings
    const qualitativeDescriptorProperty = new DerivedProperty( [
      model.accelerationProperty,
      ForcesAndMotionBasicsFluent.a11y.acceleration.qualitativeDescriptions.zeroStringProperty,
      ForcesAndMotionBasicsFluent.a11y.acceleration.qualitativeDescriptions.verySmallStringProperty,
      ForcesAndMotionBasicsFluent.a11y.acceleration.qualitativeDescriptions.smallStringProperty,
      ForcesAndMotionBasicsFluent.a11y.acceleration.qualitativeDescriptions.moderateStringProperty,
      ForcesAndMotionBasicsFluent.a11y.acceleration.qualitativeDescriptions.largeStringProperty,
      ForcesAndMotionBasicsFluent.a11y.acceleration.qualitativeDescriptions.veryLargeStringProperty,
      ForcesAndMotionBasicsFluent.a11y.acceleration.qualitativeDescriptions.extremelyLargeStringProperty
    ], (
      acceleration,
      zeroString,
      verySmallString,
      smallString,
      moderateString,
      largeString,
      veryLargeString,
      extremelyLargeString
    ) => {
      const a = Math.abs( acceleration );
      if ( a === 0 ) { return zeroString; }
      if ( a < 2 ) { return verySmallString; }
      if ( a < 5 ) { return smallString; }
      if ( a < 10 ) { return moderateString; }
      if ( a < 15 ) { return largeString; }
      if ( a < 20 ) { return veryLargeString; }
      return extremelyLargeString;
    } );

    // Numeric value used for pluralization and formatting
    const accelerationMetersPerSecondSquaredProperty = new DerivedProperty( [ model.accelerationProperty ], a => toFixedNumber( Math.abs( a ), 2 ) );

    // Direction string based on sign of acceleration
    const directionStringProperty = new DerivedProperty( [
      model.accelerationProperty,
      ForcesAndMotionBasicsFluent.a11y.acceleration.qualitativeDescriptions.leftStringProperty,
      ForcesAndMotionBasicsFluent.a11y.acceleration.qualitativeDescriptions.rightStringProperty
    ], ( a, leftString, rightString ) => {
      if ( a > 0 ) { return rightString; }
      if ( a < 0 ) { return leftString; }
      return '';
    } );

    // Fluent pattern with and without values
    const withoutValueProperty = ForcesAndMotionBasicsFluent.a11y.acceleration.accelerationOnly.createProperty( {
      accelerationDescription: qualitativeDescriptorProperty
    } );
    const withValueProperty = ForcesAndMotionBasicsFluent.a11y.acceleration.accelerationWithValue.createProperty( {
      accelerationDescription: qualitativeDescriptorProperty,
      accelerationMetersPerSecondSquared: accelerationMetersPerSecondSquaredProperty
    } );
    const withDirectionProperty = ForcesAndMotionBasicsFluent.a11y.acceleration.accelerationWithDirection.createProperty( {
      accelerationDescription: qualitativeDescriptorProperty,
      direction: directionStringProperty
    } );
    const withDirectionAndValueProperty = ForcesAndMotionBasicsFluent.a11y.acceleration.accelerationWithDirectionAndValue.createProperty( {
      accelerationDescription: qualitativeDescriptorProperty,
      direction: directionStringProperty,
      accelerationMetersPerSecondSquared: accelerationMetersPerSecondSquaredProperty
    } );

    // Final paragraph shown when Acceleration is enabled
    const accelerationDescriptionProperty = new DerivedProperty( [
      model.accelerationProperty,
      model.showAccelerationProperty,
      model.showValuesProperty,
      withoutValueProperty,
      withValueProperty,
      withDirectionProperty,
      withDirectionAndValueProperty,
      ForcesAndMotionBasicsFluent.a11y.acceleration.qualitativeDescriptions.zeroStringProperty,
      accelerationMetersPerSecondSquaredProperty,
      directionStringProperty
    ], ( acceleration, showAcceleration, showValues, withoutValue, withValue, withDirection, withDirectionAndValue, zeroString ) => {

      if ( !showAcceleration ) {
        return '';
      }
      else if ( acceleration === 0 ) {
        return showValues ? withValue : withoutValue;
      }
      else {
        return showValues ? withDirectionAndValue : withDirection;
      }
    } );

    super( {
      tagName: 'div',
      accessibleHeading: ForcesAndMotionBasicsFluent.a11y.acceleration.headingStringProperty,
      accessibleParagraph: accelerationDescriptionProperty,
      visibleProperty: model.showAccelerationProperty
    } );

    this.accelerationDescriptionProperty = accelerationDescriptionProperty;
  }
}

forcesAndMotionBasics.register( 'MotionAccelerationDescriptionNode', MotionAccelerationDescriptionNode );
