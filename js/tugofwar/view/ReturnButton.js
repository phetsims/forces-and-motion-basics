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
  var RectangleButton = require( 'SUN/RectangleButton' );
  var FAMBFont = require( 'common/view/FAMBFont' );

  function ReturnButton( model, options ) {
    Node.call( this );

    var button = new RectangleButton( new Text( 'Return', {font: new FAMBFont( 16, 'bold' )} ), model.returnCart.bind( model ), {rectangleFill: '#ffd438'} );
    this.addChild( button );
    this.mutate( options );

    model.startedProperty.linkAttribute( this, 'visible' );
  }

  return inherit( Node, ReturnButton );
} );
