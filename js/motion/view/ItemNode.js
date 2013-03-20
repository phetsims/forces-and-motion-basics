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

  function ItemNode( model, scenery, item, image ) {
    var itemNode = this;
    this.item = item;
    Node.call( this, {x: item.x, y: item.y, cursor: 'pointer'} );
    this.addChild( new Image( image, {} ) );
    this.addInputListener( new SimpleDragHandler(
        {
          translate: function( options ) {
            //Don't allow the user to translate the object while it is animating
            if ( !item.animating.enabled ) {//todo is this calling es5 getter?
              item.position = options.position;//es5 setter
            }
          },

          //When picking up an object, remove it from the stack.
          start: function() {
            var index = model.stack.indexOf( item );
            if ( index >= 0 ) {
              model.spliceStack( index );
            }
          },
          end: function() {

            //If the user drops it above the ground, move to the top of the stack on the skateboard, otherwise go back to the original position.
            if ( item.y < 350 ) {
              item.animateTo( 480 - itemNode.width / 2, scenery.topOfStack - itemNode.height );
              model.stack.push( item );
            }
            else {
              item.animateHome();
            }
          }
        } ) );
    item.on( 'change:x change:y', function() { itemNode.setTranslation( item.x, item.y ); } );//TODO: verify the change is batched and not duplicated
  }

  Inheritance.inheritPrototype( ItemNode, Node );

  return ItemNode;
} );