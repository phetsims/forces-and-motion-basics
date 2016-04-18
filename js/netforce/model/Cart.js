// Copyright 2013-2015, University of Colorado Boulder

/**
 * Model for the cart, which has a position (x) and velocity (v).
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  /**
   * Constructor.
   */
  function Cart() {
    PropertySet.call( this, { x: 0, v: 0 } );//Position and velocity are in MKS
  }

  forcesAndMotionBasics.register( 'Cart', Cart );

  return inherit( PropertySet, Cart );
} );