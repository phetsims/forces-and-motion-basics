// Copyright 2002-2013, University of Colorado Boulder

/**
 * Shows the highlight graphic for a knot.  The knots are always visible as part of the image, but when the visible flag is set,
 * the highlight is shown.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var inherit = require( 'PHET_CORE/inherit' );

  var knotWidth = 20;

  function KnotHighlightNode( knot ) {
    Path.call( this, {shape: Shape.circle( 0, 0, knotWidth ), stroke: '#FFFF00', lineWidth: 4, visible: false, x: knot.x, y: knot.y} );
    knot.visibleProperty.linkAttribute( this, 'visible' );
    knot.xProperty.linkAttribute( this, 'x' );
  }

  return inherit( Path, KnotHighlightNode );
} );