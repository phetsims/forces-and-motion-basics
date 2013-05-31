define( function( require ) {
  "use strict";

  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var inherit = require( 'PHET_CORE/inherit' );

  var knotWidth = 20;

  function KnotNode( knot ) {
    var knotNode = this;
    Path.call( this, {shape: Shape.circle( 0, 0, knotWidth ), stroke: '#FFFF00', lineWidth: 4, visible: false, x: knot.x.value, y: knot.y} );
    knot.visible.link( function( visible ) { knotNode.visible = visible; } );
    knot.x.link( function( x ) { knotNode.x = x; } );
  }

  inherit( KnotNode, Path );

  return KnotNode;
} );