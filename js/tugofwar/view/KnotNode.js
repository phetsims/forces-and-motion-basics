define( function( require ) {
  "use strict";

  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'SCENERY/Shape' );
  var Inheritance = require( 'PHETCOMMON/util/Inheritance' );

  var knotWidth = 20;

  function KnotNode( knot ) {
    var knotNode = this;
    Path.call( this, {shape: Shape.circle( knot.get( 'x' ), knot.get( 'y' ), knotWidth ), stroke: '#FFFF00', lineWidth: 4, visible: false} );
    knot.on( 'change:visible', function( m, visible ) { knotNode.visible = visible; } );
    knot.on( 'change:x', function( m, x ) { knotNode.x = x; } );
  }

  Inheritance.inheritPrototype( KnotNode, Path );

  return KnotNode;
} );