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
  }
} );

forcesAndMotionBasics.register( 'ForcesAndMotionBasicsQueryParameters', ForcesAndMotionBasicsQueryParameters );

export default ForcesAndMotionBasicsQueryParameters;