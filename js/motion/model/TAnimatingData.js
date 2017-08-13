// Copyright 2017, University of Colorado Boulder

/**
 * Data object
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertions/assertInstanceOf' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );
  var TObject = require( 'ifphetio!PHET_IO/types/TObject' );

  /**
   * TODO: TObject should be able to handle this, since it is just a json that needs to be serialized, see https://github.com/phetsims/forces-and-motion-basics/issues/232
   * Stores the data from the Item.animating Property.
   * @param instance
   * @param phetioID
   * @constructor
   */
  function TAnimatingData( instance, phetioID ) {
    assert && assert( !!instance, 'instance should exist' );
    assertInstanceOf( instance, Object);
    TObject.call( this, instance, phetioID );
  }

  phetioInherit( TObject, 'TAnimatingData', TAnimatingData, {}, {
    documentation: 'Data that is stored in the "Item.animating" Property. Type to serialize the data object across the iframe',

    toStateObject: function( instance ) {
      return instance;
    },

    fromStateObject: function( stateObject ) {
      return stateObject;
    }
  } );

  forcesAndMotionBasics.register( 'TAnimatingData', TAnimatingData );

  return TAnimatingData;
} );

