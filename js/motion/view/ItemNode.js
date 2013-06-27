// Copyright 2002-2013, University of Colorado Boulder

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
  var Matrix3 = require( 'DOT/Matrix3' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Layout = require( 'Layout' );
  var FAMBFont = require( 'common/view/FAMBFont' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );

  function ItemNode( model, motionTabView, item, image, imageSitting, imageHolding, showMassesProperty ) {
    var itemNode = this;
    this.item = item;
    Node.call( this, {x: item.x, y: item.y, scale: item.imageScale, cursor: 'pointer', renderer: 'svg'} );
    var imageNode = new Image( image );
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
      if ( itemNode.labelNode ) {
        itemNode.labelNode.bottom = imageNode.height - 2;
        itemNode.labelNode.centerX = imageNode.width / 2;
      }
    };

    for ( var i = 0; i < model.items.length; i++ ) {
      model.items[i].draggingProperty.link( updateImage );
    }

    model.stack.lengthProperty.link( updateImage );

    var dragHandler = new SimpleDragHandler( {
      translate: function( options ) {
        item.onBoard = false;

        //Don't allow the user to translate the object while it is animating
        item.cancelAnimation();
        item.position = options.position;//es5 setter
      },

      //When picking up an object, remove it from the stack.
      start: function() {
        item.direction = 'left';
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
          item.animateTo( Layout.width / 2 - itemNode.width / 2, motionTabView.topOfStack - itemNode.height, 'stack' );
          model.stack.add( item );
          if ( model.stack.length > 3 ) {
            console.log( 'hello' );
            model.spliceStackBottom();
          }
        }
        else {
          item.animateHome();
        }
      }
    } );
    this.addInputListener( dragHandler );

    var massLabel = new Text( item.mass + ' kg', {font: new FAMBFont( 15, 'bold' )} );
    var roundRect = new Rectangle( 0, 0, massLabel.width + 10, massLabel.height + 10, 10, 10, {fill: 'white', stroke: 'gray'} ).mutate( {centerX: massLabel.centerX, centerY: massLabel.centerY} );
    var labelNode = new Node( {children: [roundRect, massLabel ], scale: 1.0 / item.imageScale, renderer: 'svg', rendererOptions: {cssTransform: true}} );
    this.labelNode = labelNode;

    //TODO: batch x & y as a Vector2
    item.multilink( ['x', 'y', 'interactionScale', 'direction'], function( x, y, interactionScale, direction ) {

      //TODO: this will probably be much faster if we can just apply the change in one step
      itemNode.setTranslation( item.x, item.y );
      var scale = item.imageScale * interactionScale;
      itemNode.setScaleMagnitude( scale );

      imageNode.resetTransform();
      if ( direction === 'right' ) {
        imageNode.scale( -1, 1 );
        imageNode.translate( -imageNode.width / scale, 0 );
      }
    } );
    item.onBoardProperty.link( updateImage );

    //Work around a scenery bug that makes an invisible node show if its parent is added to the scene
    //TODO: Isolate and fix that scenery bug
    var node = new Node();
    itemNode.addChild( imageNode );
    itemNode.addChild( node );

//    showMassesProperty.link( function( showMasses ) { labelNode.visible = showMasses; } );
    showMassesProperty.link( function( showMasses ) { node.children = showMasses ? [labelNode] : []; } );
  }

  inherit( Node, ItemNode );

  return ItemNode;
} );