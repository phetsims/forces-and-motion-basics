define( function( require ) {
  "use strict";

  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var inherit = require( 'PHET_CORE/inherit' );

  var knotWidth = 20;

  function KnotNode( knot ) {
    var knotNode = this;
    Path.call( this, {shape: Shape.circle( 0, 0, knotWidth ), stroke: '#FFFF00', lineWidth: 4, visible: false, x: knot.x, y: knot.y} );
    knot.visibleProperty.link( function( visible ) { knotNode.visible = visible; } );
    knot.xProperty.link( function( x ) { knotNode.x = x; } );//TODO: Candidate for simplified link
  }

  inherit( KnotNode, Path );

  return KnotNode;
} );