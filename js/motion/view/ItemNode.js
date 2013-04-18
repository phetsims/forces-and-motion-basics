define( function( require ) {
  "use strict";

  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Layout = require( "SCENERY_PHET/Layout" );

  function ItemNode( model, scenery, item, image, imageSitting, imageHolding, showMassesProperty ) {
    var itemNode = this;
    this.item = item;
    Node.call( this, {x: item.x, y: item.y, cursor: 'pointer', scale: item.imageScale, renderer: 'svg', rendererOptions: {cssTransform: true}} );
    var imageNode = new Image( image );
    this.addChild( imageNode );
    var updateImage = function() {
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
      itemNode.labelNode.bottom = imageNode.height - 2;
      itemNode.labelNode.centerX = imageNode.width / 2;
    };
    item.on( 'change:onBoard', updateImage );
    model.on( 'draggingItemsChanged', updateImage );
    model.on( 'stackChanged', updateImage );

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
              item.animateTo( Layout.width / 2 - itemNode.width / 2, scenery.topOfStack - itemNode.height, 'stack' );
              model.stack.push( item );
              model.trigger( 'stackChanged' );
            }
            else {
              item.animateHome();
            }
          }
        } ) );
    item.on( 'change:x change:y change:interactionScale', function() {
      if ( item.x !== itemNode.x || item.y !== itemNode.y ) {
        itemNode.setTranslation( item.x, item.y );
      }
      var scale = item.imageScale * item.interactionScale;
      if ( scale !== itemNode.getScaleVector().x ) {
        itemNode.setScaleMagnitude( scale );
      }
    } );//TODO: verify the change is batched and not duplicated

    var massLabel = new Text( item.weight + ' kg', {fontSize: '18px'} );
    var roundRect = new Rectangle( 0, 0, massLabel.width + 20, massLabel.height + 20, 10, 10, {fill: 'white', stroke: 'gray'} ).mutate( {centerX: massLabel.centerX, centerY: massLabel.centerY} );
    var labelNode = new Node( {children: [roundRect, massLabel ], scale: 1.0 / item.imageScale} );
    this.addChild( labelNode );
    this.labelNode = labelNode;
    updateImage();

    //Work around a scenery bug that makes an invisible node show if its parent is added to the scene
    //TODO: Isolate and fix that scenery bug
//    showMassesProperty.link( function( showMasses ) { labelNode.visible = showMasses; } );
    showMassesProperty.link( function( showMasses ) { itemNode.children = showMasses ? [imageNode, labelNode] : [imageNode]; } );
  }

  inherit( ItemNode, Node );

  return ItemNode;
} );