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

  function ItemNode( model, scenery, item, image, imageSitting, imageHolding ) {
    var itemNode = this;
    this.item = item;
    Node.call( this, {x: item.x, y: item.y, cursor: 'pointer', scale: item.scale} );
    var imageNode = new Image( image );
    this.addChild( imageNode );
    var listener = function() {
      var onBoard = item.onBoard;
      if ( (typeof imageHolding !== 'undefined') && (item.armsUp() && onBoard) ) {
        imageNode.image = imageHolding;
      }
      else if ( onBoard && typeof imageSitting !== 'undefined' ) {
        imageNode.image = imageSitting;
      }
      else {
        imageNode.image = image;
      }
    };
    item.on( 'change:onBoard', listener );
    model.on( 'draggingItemsChanged', listener );
    model.on( 'stackChanged', listener );

    this.addInputListener( new SimpleDragHandler(
        {
          translate: function( options ) {
            item.onBoard = false;

            //Don't allow the user to translate the object while it is animating
            if ( !item.animating.enabled ) {//todo is this calling es5 getter?
              item.position = options.position;//es5 setter
            }
          },

          //When picking up an object, remove it from the stack.
          start: function() {
            item.dragging = true;
            var index = model.stack.indexOf( item );
            if ( index >= 0 ) {
              model.spliceStack( index );
            }
          },
          end: function() {
            item.dragging = false;
            //If the user drops it above the ground, move to the top of the stack on the skateboard, otherwise go back to the original position.
            if ( item.y < 350 ) {
              item.onBoard = true;
              item.animateTo( scenery.WIDTH / 2 - itemNode.width / 2, scenery.topOfStack - itemNode.height );
              model.stack.push( item );
              model.trigger( 'stackChanged' );
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