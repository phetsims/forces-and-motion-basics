define( function( require ) {
  "use strict";

  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Inheritance = require( 'PHETCOMMON/util/Inheritance' );
  var Strings = require( "i18n!../../../nls/forces-and-motion-basics-strings" );

  function ItemNode( model, item, image ) {
    var itemNode = this;
    Node.call( this, {x: item.x, y: item.y, cursor: 'pointer'} );
    this.addChild( new Image( image ) );

    //add listener to assist in initial layout
    this.addInputListener( new SimpleDragHandler( {drag: function() {
//      console.log( "{x:" + itemNode.x.toFixed( 0 ) + ", y: " + itemNode.y.toFixed( 0 ) + "}" );
    }} ) );
  }

  Inheritance.inheritPrototype( ItemNode, Node );

  return ItemNode;
} );