// Copyright 2002-2013, University of Colorado Boulder

/**
 * Shows the draggable pusher, which applies force to the objects in the center of the screen and falls down if he exceeds the maximum velocity.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var inherit = require( 'PHET_CORE/inherit' );
  var imageLoader = require( 'imageLoader' );
  var MotionConstants = require( 'motion/MotionConstants' );

  function PusherNode( model, layoutWidth ) {
    var pusherNode = this;
    var scale = 0.85;
    Node.call( this, {scale: scale} );
    var imageNode = new Image( imageLoader.getImage( 'pusher_straight_on.png' ) );
    this.addChild( imageNode );

    //Update the image and position when the model changes
    model.multilink( ['appliedForce', 'position', 'pusherPosition', 'fallen'], function( appliedForce, position, pusherPosition, fallen ) {

      //Flag to keep track of whether the pusher has fallen while pushing the crate left; in that case the image must be shifted because it is scaled by (-1,1)
      var fallingLeft = false;

      var index = Math.min( 14, Math.round( Math.abs( (appliedForce / 100 * 14) ) ) );
      if ( !fallen ) {
        imageNode.image = imageLoader.getImage( appliedForce === 0 ? 'pusher_straight_on.png' : ('pusher_' + index + '.png') );
      }
      else {
        imageNode.image = imageLoader.getImage( 'pusher_fall_down.png' );
        if ( pusherNode.lastAppliedForce > 0 ) {
          imageNode.setMatrix( Matrix3.scaling( -1, 1 ) );
        }
        else {
          imageNode.setMatrix( Matrix3.scaling( 1, 1 ) );
          fallingLeft = true;
        }
      }

      var delta = model.stack.length > 0 ? (model.stack.at( 0 ).view.width / 2 - model.stack.at( 0 ).pusherInset) : 100;

      //Pushing to the right
      if ( appliedForce > 0 && !fallen ) {
        imageNode.setMatrix( Matrix3.scaling( 1, 1 ) );
        pusherNode.x = layoutWidth / 2 - imageNode.width * scale - delta;
        model.pusherPosition = -delta + position * MotionConstants.positionScale - imageNode.width;
      }

      //Pushing to the left
      else if ( appliedForce < 0 && !fallen ) {
        imageNode.setMatrix( Matrix3.scaling( -1, 1 ) );
        pusherNode.x = layoutWidth / 2 + imageNode.width * scale + delta;
        model.pusherPosition = delta + position * MotionConstants.positionScale;
      }

      //Standing still
      else {
        pusherNode.x = layoutWidth / 2 + imageNode.width * scale - position * MotionConstants.positionScale + pusherPosition + (fallingLeft ? -imageNode.width : 0);
      }

      //Keep the feet on the ground
      pusherNode.y = 362 - pusherNode.height;

      //Track the direction of the last nonzero applied force for showing the fallen pusher
      if ( appliedForce !== 0 ) {
        pusherNode.lastAppliedForce = appliedForce;
      }
    } );

    var listener = new SimpleDragHandler( {
      allowTouchSnag: true,
      translate: function( options ) {
        var newAppliedForce = model.appliedForce + options.delta.x;
        model.appliedForce = Math.max( -500, Math.min( 500, newAppliedForce ) );
      },

      start: function() {},
      end: function() { model.appliedForce = 0; }
    } );
    this.addInputListener( listener );

    //Make it so you cannot drag the pusher until one ItemNode is in the play area
    model.stack.lengthProperty.link( function( length ) {
      pusherNode.cursor = length === 0 ? 'default' : 'pointer';
      if ( length === 0 ) {
        pusherNode.removeInputListener( listener );
      }
      else {
        pusherNode.addInputListener( listener );
      }
    } );
  }

  return inherit( Node, PusherNode );
} );