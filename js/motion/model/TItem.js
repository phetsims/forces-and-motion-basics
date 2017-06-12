// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertions/assertInstanceOf' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );
  var TObject = require( 'ifphetio!PHET_IO/types/TObject' );

  /**
   *
   * @param instance
   * @param phetioID
   * @constructor
   */
  function TItem( instance, phetioID ) {
    assert && assert( !!instance, 'instance should exist' );
    assertInstanceOf( instance, phet.forcesAndMotionBasics.Item );
    TObject.call( this, instance, phetioID );
  }

  phetioInherit( TObject, 'TItem', TItem, {}, {
    documentation: 'An Item that can be placed dragged into the play area.',

    toStateObject: function( instance ) {
      return instance.name;
    },

    fromStateObject: function( stateObject ) {
      return stateObject;
    }
  } );

  forcesAndMotionBasics.register( 'TItem', TItem );

  return TItem;
} );

