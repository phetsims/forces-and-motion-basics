// Copyright 2002-2013, University of Colorado Boulder

define( function( require ) {
  'use strict';

  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );

  function Cart() {
    PropertySet.call( this, {x: 0, v: 0} );
  }

  inherit( PropertySet, Cart );

  return Cart;
} );