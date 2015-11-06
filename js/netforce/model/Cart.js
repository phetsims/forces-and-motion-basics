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

  //Cart constructor
  function Cart() {
    PropertySet.call( this, { x: 0, v: 0 } );//Position and velocity are in MKS
  }

  return inherit( PropertySet, Cart );
} );