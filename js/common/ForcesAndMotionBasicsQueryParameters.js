// Copyright 2016-2020, University of Colorado Boulder

/**
 * Query parameters used in sim-specific code.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

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
  }
} );

forcesAndMotionBasics.register( 'ForcesAndMotionBasicsQueryParameters', ForcesAndMotionBasicsQueryParameters );

export default ForcesAndMotionBasicsQueryParameters;