// Copyright 2025, University of Colorado Boulder

/**
 * Utility function to get qualitative force descriptions based on magnitude. This is one of the few parts where the
 * values and descriptions from the netforce screen is shared with the motion screens.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';

/**
 * Returns a qualitative description string for a force magnitude.
 * Uses threshold-based descriptors that work for both netforce (quantized) and motion (continuous) values.
 */
export default function getQualitativeForceDescription( forceMagnitude: number ): string {
  if ( forceMagnitude < 75 ) {
    return ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.verySmallStringProperty.value;
  }
  else if ( forceMagnitude < 125 ) {
    return ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.smallStringProperty.value;
  }
  else if ( forceMagnitude < 175 ) {
    return ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.mediumStringProperty.value;
  }
  else if ( forceMagnitude < 225 ) {
    return ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.somewhatLargeStringProperty.value;
  }
  else if ( forceMagnitude < 275 ) {
    return ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.largeStringProperty.value;
  }
  else if ( forceMagnitude < 325 ) {
    return ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.veryLargeStringProperty.value;
  }
  else {
    return ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.extremelyLargeStringProperty.value;
  }
}