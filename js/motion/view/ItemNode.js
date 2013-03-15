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
                                                    translate: function( options ) {

                                                      //Don't allow the user to translate the object while it is animating
                                                      if ( !item.animating.enabled ) {
                                                        item.position = options.position;
                                                      }
                                                    },
                                                    end: function() {

                                                      //If the user drops it above the ground, move to the top of the stack on the skateboard, otherwise go back to the original position.
                                                      if ( item.position.y < 350 ) {
                                                        item.animateTo( 480 - itemNode.width / 2, model.topOfStack - itemNode.height, function() {model.stack.push( item );} );
                                                      }
                                                      else {
                                                        item.animateHome();
                                                      }
                                                    }
                                                  } ) );
    watch( item, 'position', function( a, b, p ) { itemNode.setTranslation( p ); } );
  }

  Inheritance.inheritPrototype( ItemNode, Node );

  return ItemNode;
} );