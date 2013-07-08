// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the 8 knots that appear on the rope.
 */
define( function( require ) {
  'use strict';

  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * Constructor for the 8 knots that appear along the rope.
   *
   * @param x the horizontal position (in meters) of the knot
   * @param type whether the knot is for red or blue pullers
   * @constructor
   */
  function Knot( x, type ) {
    this.initX = x;
    this.type = type;
    PropertySet.call( this, {x: x, visible: false} );
  }

  return inherit( PropertySet, Knot, { y: 275 } );
} );