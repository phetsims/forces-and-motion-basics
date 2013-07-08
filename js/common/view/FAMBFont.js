// Copyright 2002-2013, University of Colorado Boulder

/**
 * Encapsulation of the font used in this simulation.
 * Enforces a specific font family (with fallback) and limited options.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid
 */
define( function( require ) {
  "use strict";

  var Font = require( "SCENERY/util/Font" );
  var inherit = require( "PHET_CORE/inherit" );

  return inherit( Font,

    /**
     * @param {Number} size in pixels
     * @param {String} weight normal | bold | bolder | lighter
     * @constructor
     */
      function FAMBFont( size, weight ) {
      Font.call( this, {
        family: '"Arial", sans-serif',
        size: size + "px",
        weight: weight || "normal"
      } );
    }
  );
} );