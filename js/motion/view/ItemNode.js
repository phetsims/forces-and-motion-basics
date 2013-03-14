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
  var WatchJS = require( 'watch' );
  var watch = WatchJS.watch;

  function ItemNode( model, item, image ) {
    var itemNode = this;
    Node.call( this, {x: item.position.x, y: item.position.y, cursor: 'pointer'} );
    this.addChild( new Image( image ) );
    this.addInputListener( new SimpleDragHandler( {
                                                    translate: function( options ) { item.position = options.position; },
                                                    end: function() {
                                                      item.animateTo( 480 - itemNode.width / 2, 350 - itemNode.height );
                                                    }
                                                  } ) );
    watch( item, 'position', function( a, b, p ) { itemNode.setTranslation( p ); } );
  }

  Inheritance.inheritPrototype( ItemNode, Node );

  return ItemNode;
} );