// Copyright 2017-2018, University of Colorado Boulder

/**
 * IO type for Item
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var ObjectIO = require( 'TANDEM/types/ObjectIO' );
  var phetioInherit = require( 'TANDEM/phetioInherit' );

  // ifphetio
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertInstanceOf' );

  /**
   * @param {Item} item
   * @param {string} phetioID
   * @constructor
   */
  function ItemIO( item, phetioID ) {
    assert && assertInstanceOf( item, phet.forcesAndMotionBasics.Item );
    ObjectIO.call( this, item, phetioID );
  }

  phetioInherit( ObjectIO, 'ItemIO', ItemIO, {}, {
    documentation: 'An Item that can be placed dragged into the play area.',

    /**
     * @param {Item} item
     * @returns {string}
     * @override
     */
    toStateObject: function( item ) {
      assert && assertInstanceOf( item, phet.forcesAndMotionBasics.Item );
      return item.tandem.phetioID;
    },

    /**
     * @param {Object} stateObject
     * @returns {string}
     * @override
     */
    fromStateObject: function( stateObject ) {
      return stateObject.name;
    }
  } );

  forcesAndMotionBasics.register( 'ItemIO', ItemIO );

  return ItemIO;
} );

