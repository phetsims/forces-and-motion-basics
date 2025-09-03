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
    ], speed => {
      const absSpeed = Math.abs( speed );
      if ( absSpeed === 0 ) { return ForcesAndMotionBasicsFluent.a11y.speed.qualitativeDescriptions.stationaryStringProperty.value; }
      if ( absSpeed < 2 ) { return ForcesAndMotionBasicsFluent.a11y.speed.qualitativeDescriptions.verySlowStringProperty.value; }
      if ( absSpeed < 5 ) { return ForcesAndMotionBasicsFluent.a11y.speed.qualitativeDescriptions.slowStringProperty.value; }
      if ( absSpeed < 10 ) { return ForcesAndMotionBasicsFluent.a11y.speed.qualitativeDescriptions.mediumStringProperty.value; }
      if ( absSpeed < 20 ) { return ForcesAndMotionBasicsFluent.a11y.speed.qualitativeDescriptions.fastStringProperty.value; }
      if ( absSpeed < 30 ) { return ForcesAndMotionBasicsFluent.a11y.speed.qualitativeDescriptions.veryFastStringProperty.value; }
      return ForcesAndMotionBasicsFluent.a11y.speed.qualitativeDescriptions.extremelyFastStringProperty.value;
    } );

    // Numeric value (1 decimal place) as string
    const speedMetersPerSecondTextProperty = new DerivedProperty( [ model.speedProperty ], speed => toFixed( Math.abs( speed ), 1 ) );

    const withoutValueProperty = ForcesAndMotionBasicsFluent.a11y.speed.speedOnly.createProperty( {
      speedDescription: qualitativeDescriptorProperty
    } );
    const withValueProperty = ForcesAndMotionBasicsFluent.a11y.speed.speedWithValue.createProperty( {
      speedDescription: qualitativeDescriptorProperty,
      speedMetersPerSecond: speedMetersPerSecondTextProperty
    } );

    // Derived property for the final paragraph, empty when 'Speed' is unchecked
    const speedDescriptionProperty = new DerivedProperty( [
      model.showSpeedProperty,
      model.showValuesProperty,
      qualitativeDescriptorProperty,
      speedMetersPerSecondTextProperty,
      withoutValueProperty,
      withValueProperty
    ], ( showSpeed, showValues, _q, _n, withoutValue, withValue ) => {
      if ( !showSpeed ) { return ''; }
      return showValues ? withValue : withoutValue;
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