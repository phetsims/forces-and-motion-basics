// Copyright 2024, University of Colorado Boulder

/**
 * Enumeration of puller color sets used in the Forces and Motion: Basics simulation.
 *
 * @author Luisa Vargas
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

export default class PullerColors extends EnumerationValue {
  public static readonly BLUE_AND_RED = new PullerColors();
  public static readonly PURPLE_AND_ORANGE = new PullerColors();

  // Gets a list of keys, values and mapping between them.  For use in EnumerationProperty
  private static readonly enumeration = new Enumeration( PullerColors );
}

forcesAndMotionBasics.register( 'PullerColors', PullerColors );