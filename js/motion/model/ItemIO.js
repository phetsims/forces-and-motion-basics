// Copyright 2017-2019, University of Colorado Boulder

/**
 * IO type for Item
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  const ObjectIO = require( 'TANDEM/types/ObjectIO' );
  const validate = require( 'AXON/validate' );

  class ItemIO extends ObjectIO {

    /**
     * @param {Item} item
     * @returns {string}
     * @override
     */
    static toStateObject( item ) {
      validate( item, this.validator );
      return item.tandem.phetioID;
    }

    /**
     * @param {Object} stateObject
     * @returns {string}
     * @override
     */
    static fromStateObject( stateObject ) {
      return stateObject.name;
    }
  }

  ItemIO.documentation = 'An Item that can be placed dragged into the play area.';
  ItemIO.validator = { isValidValue: v => v instanceof phet.forcesAndMotionBasics.Item };
  ItemIO.typeName = 'ItemIO';
  ObjectIO.validateSubtype( ItemIO );

  return forcesAndMotionBasics.register( 'ItemIO', ItemIO );
} );

