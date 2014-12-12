// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the 8 knots that appear on the rope.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * Constructor for the 8 knots that appear along the rope.
   *
   * @param {number} x the horizontal position (in meters) of the knot
   * @param {string} type whether the knot is for red or blue pullers
   * @constructor
   */
  function Knot( x, type ) {
    this.initX = x;
    this.type = type;
    PropertySet.call( this, {
      x: x,
      visible: false
    } );

    // Constant value for the y position (in screen coordinates)
    this.y = 285;
  }

  return inherit( PropertySet, Knot );
} );