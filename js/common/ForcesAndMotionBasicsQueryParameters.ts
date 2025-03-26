// Copyright 2016-2025, University of Colorado Boulder

/**
 * Query parameters used in sim-specific code.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { QueryStringMachine } from '../../../query-string-machine/js/QueryStringMachineModule.js';
import forcesAndMotionBasics from '../forcesAndMotionBasics.js';

const ForcesAndMotionBasicsQueryParameters = QueryStringMachine.getAll( {

  // Allow hiding the item toolboxes, see https://github.com/phetsims/forces-and-motion-basics/issues/215
  showItemToolboxes: {
    type: 'boolean',
    defaultValue: true
  },

  // The puller / pusher colors to use in the Net Force screen on startup and after a reset.
  // The valid values represent the color sets Blue and Red, and Purple and Orange.
  pullerColor: {
    type: 'string',
    validValues: [ 'blueRed', 'purpleOrange' ],
    defaultValue: 'blueRed',
    public: true
  },

  // For internal use. Screen icons are taken from screenshots in this sim. It is helpful to hide label text
  // that should not be part of the screenshot.
  // See https://github.com/phetsims/forces-and-motion-basics/issues/101
  showForceArrowLabels: {
    type: 'boolean',
    defaultValue: true
  }
} );

forcesAndMotionBasics.register( 'ForcesAndMotionBasicsQueryParameters', ForcesAndMotionBasicsQueryParameters );

export default ForcesAndMotionBasicsQueryParameters;