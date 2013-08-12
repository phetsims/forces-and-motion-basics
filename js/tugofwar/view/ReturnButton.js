// Copyright 2002-2013, University of Colorado Boulder

/**
 * Shows a button that allows the user to "return" the cart after a match has completed.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var Text = require( 'SCENERY/nodes/Text' );
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var TextButton = require( 'SUN/TextButton' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Color = require( 'SCENERY/util/Color' );

  /**
   * @param {TugOfWarModel} model
   * @param options
   * @constructor
   */
  function ReturnButton( model, options ) {
    Node.call( this, {} );

    var button = new TextButton( 'Return', model.returnCart.bind( model ),
      {font: new PhetFont( 16, 'bold' ), rectangleFillUp: new Color( 254, 192, 0 )} );
    this.addChild( button );
    this.mutate( options );

    model.startedProperty.linkAttribute( this, 'visible' );
  }

  return inherit( Node, ReturnButton );
} );
