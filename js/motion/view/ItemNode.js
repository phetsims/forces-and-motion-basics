// Copyright 2002-2013, University of Colorado Boulder

/**
 * Shows the draggable node for any of the items in the Motion, Friction and Acceleration tabs.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var inherit = require( 'PHET_CORE/inherit' );
  var FAMBFont = require( 'common/view/FAMBFont' );

  /**
   * Constructor for ItemNode
   * @param {MotionModel} model the entire model for the containing tab
   * @param {MotionTabView} motionTabView the entire view for the containing tab
   * @param {Item} item the corresponding to this ItemNode
   * @param {Image} image the scenery.Image to show for this node
   * @param {Image} imageSitting optional image for when the person is sitting down
   * @param {Image} imageHolding optional image for when the person is holding an object
   * @param {Property<Boolean>} showMassesProperty property for whether the mass value should be shown
   * @constructor
   */
  function ItemNode( model, motionTabView, item, image, imageSitting, imageHolding, showMassesProperty ) {
    var itemNode = this;
    this.item = item;
    Node.call( this, {x: item.position.x, y: item.position.y, scale: item.imageScale, cursor: 'pointer', renderer: 'svg'} );

    //Create the node for the main graphic
    var imageNode = new Image( image );

    //When the model changes, update the image location as well as which image is shown
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

    //When the user drags the object
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

      //End the drag
      end: function() {
        item.dragging = false;
        //If the user drops it above the ground, move to the top of the stack on the skateboard, otherwise go back to the original position.
        if ( item.position.y < 350 ) {
          item.onBoard = true;
          item.animateTo( motionTabView.layoutBounds.width / 2 - itemNode.width / 2, motionTabView.topOfStack - itemNode.height, 'stack' );
          model.stack.add( item );
          if ( model.stack.length > 3 ) {
            model.spliceStackBottom();
          }
        }
        else {
          item.animateHome();
        }
      }
    } );
    this.addInputListener( dragHandler );

    //Label for the mass (if it is shown)
    var massLabel = new Text( item.mass + ' kg', {font: new FAMBFont( 15, 'bold' )} );
    var roundRect = new Rectangle( 0, 0, massLabel.width + 10, massLabel.height + 10, 10, 10, {fill: 'white', stroke: 'gray'} ).mutate( {centerX: massLabel.centerX, centerY: massLabel.centerY} );
    var labelNode = new Node( {children: [roundRect, massLabel ], scale: 1.0 / item.imageScale, renderer: 'svg', rendererOptions: {cssTransform: true}} );
    this.labelNode = labelNode;

    item.multilink( ['position', 'interactionScale', 'direction'], function( position, interactionScale, direction ) {

      itemNode.setTranslation( position );
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
    //TODO: Isolate and fix that scenery bug.  Still a problem as of 7/16/2013
    var node = new Node();
    itemNode.addChild( imageNode );
    itemNode.addChild( node );

//    showMassesProperty.link( function( showMasses ) { labelNode.visible = showMasses; } );
    showMassesProperty.link( function( showMasses ) { node.children = showMasses ? [labelNode] : []; } );
  }

  return inherit( Node, ItemNode );
} );