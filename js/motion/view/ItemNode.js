// Copyright 2002-2013, University of Colorado Boulder

/**
 * Shows the draggable node for any of the items in the Motion, Friction and Acceleration screens.
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
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var massDisplayPattern = require( 'string!FORCES_AND_MOTION_BASICS/massDisplay.pattern' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var platform = require( 'PHET_CORE/platform' );

  //Workaround for https://github.com/phetsims/scenery/issues/108
  var IDENTITY = Matrix3.scaling( 1, 1 );

  /**
   * Constructor for ItemNode
   * @param {MotionModel} model the entire model for the containing screen
   * @param {MotionView} motionView the entire view for the containing screen
   * @param {Item} item the corresponding to this ItemNode
   * @param {Image} normalImage the scenery.Image to show for this node
   * @param {Image} sittingImage optional image for when the person is sitting down
   * @param {Image} holdingImage optional image for when the person is holding an object
   * @param {Property} showMassesProperty property for whether the mass value should be shown
   * @constructor
   */
  function ItemNode( model, motionView, item, normalImage, sittingImage, holdingImage, showMassesProperty ) {
    var itemNode = this;
    this.item = item;
    Node.call( this, {x: item.position.x, y: item.position.y, scale: item.imageScale, cursor: 'pointer', rendererOptions: { cssTransform: true } } );

    //Work around issue where the images are getting corrupted in Firefox, see #38
    if ( platform.firefox ) {
      this.renderer = 'canvas';
    }

    //Create the node for the main graphic
    var normalImageNode = new Image( normalImage );

    //When the model changes, update the image location as well as which image is shown
    var updateImage = function() {
      if ( (typeof holdingImage !== 'undefined') && (item.armsUp() && item.onBoard) ) {
        normalImageNode.image = holdingImage;
      }
      else if ( item.onBoard && typeof sittingImage !== 'undefined' ) {
        normalImageNode.image = sittingImage;
      }
      else {
        normalImageNode.image = normalImage;
      }
      if ( itemNode.labelNode ) {
        itemNode.labelNode.bottom = normalImageNode.height - 2;
        itemNode.labelNode.centerX = normalImageNode.width / 2;
      }
    };

    for ( var i = 0; i < model.items.length; i++ ) {
      model.items[i].draggingProperty.link( updateImage );
    }

    model.stack.lengthProperty.link( updateImage );

    //When the user drags the object
    var dragHandler = new SimpleDragHandler( {
      translate: function( options ) {
        item.position = options.position;//es5 setter
      },

      //When picking up an object, remove it from the stack.
      start: function() {
        item.dragging = true;
        var index = model.stack.indexOf( item );
        if ( index >= 0 ) {
          model.spliceStack( index );
        }
        item.onBoard = false;

        //Don't allow the user to translate the object while it is animating
        item.cancelAnimation();
      },

      //End the drag
      end: function() {
        item.dragging = false;
        //If the user drops it above the ground, move to the top of the stack on the skateboard, otherwise go back to the original position.
        if ( item.position.y < 350 ) {
          item.onBoard = true;
          item.animateTo( motionView.layoutBounds.width / 2 - itemNode.width / 2 + item.centeringOffset, motionView.topOfStack - itemNode.height, 'stack' );
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
    var massLabel = new Text( StringUtils.format( massDisplayPattern, item.mass ), {font: new PhetFont( { size: 15, weight: 'bold' } )} );
    var roundRect = new Rectangle( 0, 0, massLabel.width + 10, massLabel.height + 10, 10, 10, {fill: 'white', stroke: 'gray'} ).mutate( {centerX: massLabel.centerX, centerY: massLabel.centerY} );
    var labelNode = new Node( {children: [roundRect, massLabel ], scale: 1.0 / item.imageScale} );
    this.labelNode = labelNode;

    //Update the position of the item
    item.positionProperty.link( function( position ) { itemNode.setTranslation( position ); } );

    //When the object is scaled or change direction, update the image part
    item.multilink( ['interactionScale', 'direction'], function( interactionScale, direction ) {
      var scale = item.imageScale * interactionScale;
      itemNode.setScaleMagnitude( scale );

      normalImageNode.setMatrix( IDENTITY );
      if ( direction === 'right' ) {
        normalImageNode.scale( -1, 1 );

        //TODO: I'm not sure why there is an extra 16 pixels in this direction, but it seems necessary to center the images
        normalImageNode.translate( -itemNode.width * scale + 16, 0 );
      }
    } );
    item.onBoardProperty.link( updateImage );

    itemNode.addChild( normalImageNode );
    itemNode.addChild( labelNode );

    showMassesProperty.link( function( showMasses ) { labelNode.visible = showMasses; } );
  }

  return inherit( Node, ItemNode );
} );
