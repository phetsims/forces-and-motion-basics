// Copyright 2016, University of Colorado Boulder

/**
 * Query parameters used in sim-specific code.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  var ForcesAndMotionBasicsQueryParameters = QueryStringMachine.getAll( {

    // Allow hiding the item toolboxes, see https://github.com/phetsims/forces-and-motion-basics/issues/215
    showItemToolboxes: {
      type: 'boolean',
      defaultValue: true
    }
  } );

  forcesAndMotionBasics.register( 'ForcesAndMotionBasicsQueryParameters', ForcesAndMotionBasicsQueryParameters );

  return ForcesAndMotionBasicsQueryParameters;
} );
