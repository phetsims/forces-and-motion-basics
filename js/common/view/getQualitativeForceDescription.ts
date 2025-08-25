// Copyright 2025, University of Colorado Boulder

/**
 * Utility function to get qualitative force descriptions based on magnitude.
 * Uses the same thresholds as ReadoutArrow for consistency across the simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';

/**
 * Returns a qualitative description string for a force magnitude.
 * Uses threshold-based descriptors that work for both netforce (quantized) and motion (continuous) values.
 * @param magnitude - The absolute value of the force
 * @returns A qualitative description string (e.g., "small", "medium", "large")
 */
export default function getQualitativeForceDescription( magnitude: number ): string {
  if ( magnitude < 75 ) {
    return ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.smallStringProperty.value;
  }
  else if ( magnitude < 125 ) {
    return ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.mediumSmallStringProperty.value;
  }
  else if ( magnitude < 175 ) {
    return ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.mediumStringProperty.value;
  }
  else if ( magnitude < 225 ) {
    return ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.mediumLargeStringProperty.value;
  }
  else if ( magnitude < 275 ) {
    return ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.largeStringProperty.value;
  }
  else if ( magnitude < 325 ) {
    return ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.veryLargeStringProperty.value;
  }
  else {
    return ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.extremelyLargeStringProperty.value;
  }
}