// Copyright 2002-2013, University of Colorado Boulder

/**
 * Shows a button that allows the user to "return" the cart after a match has completed.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var returnString = require( 'string!FORCES_AND_MOTION_BASICS/return' );

  /**
   * @param {NetForceModel} model
   * @param {Object} [options]
   * @constructor
   */
  function ReturnButton( model, options ) {
    Node.call( this );

    var button = new TextPushButton( returnString, {
      listener: model.returnCart.bind( model ),
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      baseColor: 'rgb( 254, 192, 0 )'
    } );
    this.addChild( button );
    this.mutate( options );

    model.startedProperty.linkAttribute( button, 'enabled' );
    model.startedProperty.link( function( enabled ) {
      button.textDescription = 'Return Button' + (enabled ? '' : ' (disabled)');
    } );
  }

  return inherit( Node, ReturnButton );
} );
