// Copyright 2025, University of Colorado Boulder

/**
 * MotionScreensSpeedDescription provides an accessible description of the current stack speed
 * for the Motion, Friction, and Acceleration screens. It mirrors the Net Force screen's
 * SpeedDescription but uses MotionModel properties.
 *
 * The description appears under a "Speed" heading and is intended for use as the
 * accessibleContextResponse when the Speed checkbox is checked.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import { toFixed } from '../../../../dot/js/util/toFixed.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import MotionModel from '../model/MotionModel.js';

export default class MotionScreensSpeedDescription extends Node {
  public readonly speedDescriptionProperty: TReadOnlyProperty<string>;

  public constructor( model: MotionModel ) {

    // Qualitative descriptor backed by Fluent strings
    const qualitativeDescriptorProperty = new DerivedProperty( [
      model.speedProperty,
      ForcesAndMotionBasicsFluent.a11y.speed.qualitativeDescriptions.stationaryStringProperty,
      ForcesAndMotionBasicsFluent.a11y.speed.qualitativeDescriptions.verySlowStringProperty,
      ForcesAndMotionBasicsFluent.a11y.speed.qualitativeDescriptions.slowStringProperty,
      ForcesAndMotionBasicsFluent.a11y.speed.qualitativeDescriptions.mediumStringProperty,
      ForcesAndMotionBasicsFluent.a11y.speed.qualitativeDescriptions.fastStringProperty,
      ForcesAndMotionBasicsFluent.a11y.speed.qualitativeDescriptions.veryFastStringProperty,
      ForcesAndMotionBasicsFluent.a11y.speed.qualitativeDescriptions.extremelyFastStringProperty
    ], (
      speed,
      stationaryString,
      verySlowString,
      slowString,
      mediumString,
      fastString,
      veryFastString,
      extremelyFastString
    ) => {
      const absSpeed = Math.abs( speed );
      if ( absSpeed === 0 ) { return stationaryString; }
      if ( absSpeed < 2 ) { return verySlowString; }
      if ( absSpeed < 5 ) { return slowString; }
      if ( absSpeed < 10 ) { return mediumString; }
      if ( absSpeed < 20 ) { return fastString; }
      if ( absSpeed < 30 ) { return veryFastString; }
      return extremelyFastString;
    } );

    // Numeric value (1 decimal place) as string
    const speedMetersPerSecondTextProperty = new DerivedProperty( [ model.speedProperty ], speed => toFixed( Math.abs( speed ), 1 ) );

    const withoutValueProperty = ForcesAndMotionBasicsFluent.a11y.speed.speedOnly.createProperty( {
      speedDescription: qualitativeDescriptorProperty
    } );

    // Build an acceleration description: '' when effectively zero or velocity ~ 0,
    // otherwise 'speeding up' or 'slowing down' based on sign agreement
    const accelerationDescriptionProperty = new DerivedProperty( [
      model.accelerationProperty,
      model.velocityProperty,
      ForcesAndMotionBasicsFluent.a11y.acceleration.accelerationDescriptions.speedingUpStringProperty,
      ForcesAndMotionBasicsFluent.a11y.acceleration.accelerationDescriptions.slowingDownStringProperty
    ], ( acceleration, velocity, speedingUpString, slowingDownString ) => {
      const ACCEL_EPS = 0.1;
      const VEL_EPS = 0.1;
      if ( Math.abs( acceleration ) < ACCEL_EPS || Math.abs( velocity ) < VEL_EPS ) {
        return '';
      }
      const sameDirection = ( acceleration > 0 && velocity > 0 ) || ( acceleration < 0 && velocity < 0 );
      return sameDirection ? speedingUpString : slowingDownString;
    } );

    const withoutValueWithAccelerationProperty = ForcesAndMotionBasicsFluent.a11y.speed.speedOnlyWithAcceleration.createProperty( {
      speedDescription: qualitativeDescriptorProperty,
      accelerationDescription: accelerationDescriptionProperty
    } );
    const withValueProperty = ForcesAndMotionBasicsFluent.a11y.speed.speedWithValue.createProperty( {
      speedDescription: qualitativeDescriptorProperty,
      speedMetersPerSecond: speedMetersPerSecondTextProperty
    } );

    // Pattern with acceleration phrase and numeric value
    const withValueAndAccelerationProperty = ForcesAndMotionBasicsFluent.a11y.speed.speedWithValueAndAcceleration.createProperty( {
      speedDescription: qualitativeDescriptorProperty,
      speedMetersPerSecond: speedMetersPerSecondTextProperty,
      accelerationDescription: accelerationDescriptionProperty
    } );

    // Derived property for the final paragraph, empty when 'Speed' is unchecked
    const speedDescriptionProperty = new DerivedProperty( [
      model.showSpeedProperty,
      model.showValuesProperty,
      withoutValueProperty,
      withoutValueWithAccelerationProperty,
      withValueProperty,
      accelerationDescriptionProperty,
      withValueAndAccelerationProperty,
      qualitativeDescriptorProperty,
      speedMetersPerSecondTextProperty
    ], ( showSpeed, showValues, withoutValue, withoutValueWithAcceleration, withValue, accelerationDescription, withValueAndAcceleration ) => {
      if ( !showSpeed ) { return ''; }
      if ( showValues ) {
        return accelerationDescription ? withValueAndAcceleration : withValue;
      }
      return accelerationDescription ? withoutValueWithAcceleration : withoutValue;
    } );

    super( {
      tagName: 'div',
      accessibleHeading: ForcesAndMotionBasicsFluent.a11y.speed.headingStringProperty,
      accessibleParagraph: speedDescriptionProperty,
      visibleProperty: model.showSpeedProperty
    } );

    this.speedDescriptionProperty = speedDescriptionProperty;
  }

  // No helper methods needed; description is built inline to avoid cart-specific phrasing.
}

forcesAndMotionBasics.register( 'MotionScreensSpeedDescription', MotionScreensSpeedDescription );