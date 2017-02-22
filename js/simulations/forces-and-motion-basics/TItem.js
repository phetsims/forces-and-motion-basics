// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOf = require( 'PHET_IO/assertions/assertInstanceOf' );
  var phetioNamespace = require( 'PHET_IO/phetioNamespace' );
  var phetioInherit = require( 'PHET_IO/phetioInherit' );
  var TObject = require( 'PHET_IO/types/TObject' );

  var TItem = function( instance, phetioID ) {
    assert && assert( !!instance, 'instance should exist' );
    assertInstanceOf( instance, phet.forcesAndMotionBasics.Item );
    TObject.call( this, instance, phetioID );
  };

  phetioInherit( TObject, 'TItem', TItem, {}, {

    toStateObject: function( instance ) {
      return instance.name;
    }
  } );

  phetioNamespace.register( 'TItem', TItem );

  return TItem;
} );

