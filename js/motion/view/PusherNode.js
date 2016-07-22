// Copyright 2013-2015, University of Colorado Boulder

/**
 * Shows the draggable pusher, which applies force to the objects in the center of the screen and falls down if he exceeds the maximum velocity.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var inherit = require( 'PHET_CORE/inherit' );

  var pusherStraightImage = require( 'image!FORCES_AND_MOTION_BASICS/pusher_straight_on.png' );
  var pusherFallDownImage = require( 'image!FORCES_AND_MOTION_BASICS/pusher_fall_down.png' );
  var pusherImage0 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_0.png' );
  var pusherImage1 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_1.png' );
  var pusherImage2 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_2.png' );
  var pusherImage3 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_3.png' );
  var pusherImage4 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_4.png' );
  var pusherImage5 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_5.png' );
  var pusherImage6 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_6.png' );
  var pusherImage7 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_7.png' );
  var pusherImage8 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_8.png' );
  var pusherImage9 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_9.png' );
  var pusherImage10 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_10.png' );
  var pusherImage11 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_11.png' );
  var pusherImage12 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_12.png' );
  var pusherImage13 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_13.png' );
  var pusherImage14 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_14.png' );
  var pusherImage15 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_15.png' );
  var pusherImage16 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_16.png' );
  var pusherImage17 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_17.png' );
  var pusherImage18 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_18.png' );
  var pusherImage19 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_19.png' );
  var pusherImage20 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_20.png' );
  var pusherImage21 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_21.png' );
  var pusherImage22 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_22.png' );
  var pusherImage23 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_23.png' );
  var pusherImage24 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_24.png' );
  var pusherImage25 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_25.png' );
  var pusherImage26 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_26.png' );
  var pusherImage27 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_27.png' );
  var pusherImage28 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_28.png' );
  var pusherImage29 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_29.png' );
  var pusherImage30 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_30.png' );

  var MotionConstants = require( 'FORCES_AND_MOTION_BASICS/motion/MotionConstants' );
  var Vector2 = require( 'DOT/Vector2' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  /**
   * Constructor for PusherNode
   *
   * @param {MotionModel} model the model for the entire 'motion', 'friction' or 'acceleration' screen
   * @param {number} layoutWidth width for the layout for purposes of centering the character when pushing
   * @constructor
   */
  function PusherNode( model, layoutWidth ) {
    var pusherNode = this;
    var scale = 0.95;

    //Create all the images up front, add as children and toggle their visible for performance and reduced garbage collection
    var pushingRightNodes = [];
    var pushingLeftNodes = [];
    var children = [];
    var standingUp = new Image( pusherStraightImage, { visible: true, pickable: true, scale: scale } );
    var fallLeft = new Image( pusherFallDownImage, { visible: false, pickable: false, scale: scale } );
    var fallRight = new Image( pusherFallDownImage, {
      visible: false,
      pickable: false,
      scale: new Vector2( -scale, scale )
    } );
    var visibleNode = standingUp;

    children.push( standingUp );
    children.push( fallLeft );
    children.push( fallRight );
    for ( var i = 0; i <= 30; i++ ) {
      var image = i === 0 ? pusherImage0 :
                  i === 1 ? pusherImage1 :
                  i === 2 ? pusherImage2 :
                  i === 3 ? pusherImage3 :
                  i === 4 ? pusherImage4 :
                  i === 5 ? pusherImage5 :
                  i === 6 ? pusherImage6 :
                  i === 7 ? pusherImage7 :
                  i === 8 ? pusherImage8 :
                  i === 9 ? pusherImage9 :
                  i === 10 ? pusherImage10 :
                  i === 11 ? pusherImage11 :
                  i === 12 ? pusherImage12 :
                  i === 13 ? pusherImage13 :
                  i === 14 ? pusherImage14 :
                  i === 15 ? pusherImage15 :
                  i === 16 ? pusherImage16 :
                  i === 17 ? pusherImage17 :
                  i === 18 ? pusherImage18 :
                  i === 19 ? pusherImage19 :
                  i === 20 ? pusherImage20 :
                  i === 21 ? pusherImage21 :
                  i === 22 ? pusherImage22 :
                  i === 23 ? pusherImage23 :
                  i === 24 ? pusherImage24 :
                  i === 25 ? pusherImage25 :
                  i === 26 ? pusherImage26 :
                  i === 27 ? pusherImage27 :
                  i === 28 ? pusherImage28 :
                  i === 29 ? pusherImage29 :
                  i === 30 ? pusherImage30 :
                  null;
      var rightImage = new Image( image, { visible: false, pickable: false, scale: scale } );
      var leftImage = new Image( image, { visible: false, pickable: false, scale: new Vector2( -scale, scale ) } );
      pushingRightNodes.push( rightImage );
      pushingLeftNodes.push( leftImage );
      children.push( rightImage );
      children.push( leftImage );
    }

    function setVisibleNode( node ) {
      if ( node !== visibleNode ) {
        visibleNode.visible = false;
        visibleNode.pickable = false;
        node.visible = true;
        node.pickable = true;
        visibleNode = node;
      }
    }

    Node.call( this, { children: children } );

    //Update the position when the pusher is not applying force (fallen or standing)
    function updateZeroForcePosition( x ) {
      var pusherY = 362 - visibleNode.height;
      visibleNode.translate( x - visibleNode.getCenterX(), pusherY - visibleNode.y, true );
    }

    function updateAppliedForcePosition() {
      assert && assert( model.stack.length > 0 );
      var pusherY = 362 - visibleNode.height;
      var item = model.stack.get( 0 );

      // if the item has a sitting image, use that image for the width
      var scaledWidth;
      if ( item.view.sittingImage ) {
        scaledWidth = item.view.sittingImage.width * item.getCurrentScale();
      }
      else {
        scaledWidth = item.view.normalImageNode.width * item.getCurrentScale();
      }

      var delta = scaledWidth / 2 - item.pusherInset;
      if ( model.appliedForce > 0 ) {
        visibleNode.setTranslation( (layoutWidth / 2 - visibleNode.width - delta), pusherY );
      }
      else {
        visibleNode.setTranslation( (layoutWidth / 2 + visibleNode.width + delta), pusherY );
      }
    }

    // get new position for the pusher node when he falls so that he falls back from the item stack when it is moving
    // too quickly
    var getPusherNodePosition = function() {
      return layoutWidth / 2 + ( model.pusherPosition - model.position ) * MotionConstants.POSITION_SCALE;
    };

    //Choose the right Image
    model.multilink( [ 'appliedForce', 'fallen' ], function( appliedForce, fallen ) {

      var x = getPusherNodePosition();
      if ( fallen ) {
        setVisibleNode( model.fallenDirection === 'left' ? fallLeft : fallRight );
        updateZeroForcePosition( x );
      }
      else if ( appliedForce === 0 ) {
        setVisibleNode( standingUp );
        updateZeroForcePosition( x );
      }

      // update visibility and position if pusher is on screen and is still able to push 
      if ( !fallen && appliedForce !== 0 ) {
        var index = Math.min( 30, Math.round( Math.abs( appliedForce / 500 * 30 ) ) );
        if ( appliedForce > 0 ) {
          setVisibleNode( pushingRightNodes[ index ] );
        }
        else {
          setVisibleNode( pushingLeftNodes[ index ] );
        }
        updateAppliedForcePosition();
      }
    } );

    // when the stack composition changes, we want to update the applied force position
    // model.stackSize does not need a dispose function since it persists for the duration of the simulation
    model.stackSizeProperty.link( function( stackSize ) {
      if ( model.stackSize > 0 ) {
        // only do this if the pusher is standing and there is non zero applied force
        if ( !model.fallen && model.appliedForce !== 0 ) {
          updateAppliedForcePosition();
        }
      }
    } );

    //Update the rightImage and position when the model changes
    model.multilink( [ 'position', 'pusherPosition' ], function() {
      if ( model.appliedForce === 0 || model.fallen ) {
        var x = getPusherNodePosition();
        // to save processor time, don't update if the pusher is too far off screen
        if ( Math.abs( x ) < 2000 ) {
          updateZeroForcePosition( x );
        }
      }
    } );

    var listener = new SimpleDragHandler( {
      allowTouchSnag: true,
      translate: function( options ) {
        var newAppliedForce = model.appliedForce + options.delta.x;
        var clampedAppliedForce = Math.max( -500, Math.min( 500, newAppliedForce ) );

        //Only apply a force if the pusher is not fallen, see #48
        if ( !model.fallen ) {
          model.appliedForce = clampedAppliedForce;
        }
      },

      start: function() {
        // if the user interacts with the pusher, resume model 'playing' so that the sim does not seem broken
        if ( !model.playProperty.value ) {
          model.playProperty.set( true );
        }

      },
      end: function() {
        // if the model is paused, the applied force should remain the same
        if ( model.playProperty.value ) {
          model.appliedForce = 0;
        }
      }
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

  forcesAndMotionBasics.register( 'PusherNode', PusherNode );

  return inherit( Node, PusherNode );
} );