// Copyright 2002-2013, University of Colorado Boulder

/**
 * Shows the draggable pusher, which applies force to the objects in the center of the screen and falls down if he exceeds the maximum velocity.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var assert = require( 'ASSERT/assert' )( 'forces-and-motion-basics' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var inherit = require( 'PHET_CORE/inherit' );
  var pusherStraightImage = require( 'image!FORCES_AND_MOTION_BASICS/../images/pusher_straight_on.png' );
  var pusherFallDownImage = require( 'image!FORCES_AND_MOTION_BASICS/../images/pusher_fall_down.png' );
  var pusherImage0 = require( 'image!FORCES_AND_MOTION_BASICS/../images/pusher_0.png' );
  var pusherImage1 = require( 'image!FORCES_AND_MOTION_BASICS/../images/pusher_1.png' );
  var pusherImage2 = require( 'image!FORCES_AND_MOTION_BASICS/../images/pusher_2.png' );
  var pusherImage3 = require( 'image!FORCES_AND_MOTION_BASICS/../images/pusher_3.png' );
  var pusherImage4 = require( 'image!FORCES_AND_MOTION_BASICS/../images/pusher_4.png' );
  var pusherImage5 = require( 'image!FORCES_AND_MOTION_BASICS/../images/pusher_5.png' );
  var pusherImage6 = require( 'image!FORCES_AND_MOTION_BASICS/../images/pusher_6.png' );
  var pusherImage7 = require( 'image!FORCES_AND_MOTION_BASICS/../images/pusher_7.png' );
  var pusherImage8 = require( 'image!FORCES_AND_MOTION_BASICS/../images/pusher_8.png' );
  var pusherImage9 = require( 'image!FORCES_AND_MOTION_BASICS/../images/pusher_9.png' );
  var pusherImage10 = require( 'image!FORCES_AND_MOTION_BASICS/../images/pusher_10.png' );
  var pusherImage11 = require( 'image!FORCES_AND_MOTION_BASICS/../images/pusher_11.png' );
  var pusherImage12 = require( 'image!FORCES_AND_MOTION_BASICS/../images/pusher_12.png' );
  var pusherImage13 = require( 'image!FORCES_AND_MOTION_BASICS/../images/pusher_13.png' );
  var pusherImage14 = require( 'image!FORCES_AND_MOTION_BASICS/../images/pusher_14.png' );
  var MotionConstants = require( 'FORCES_AND_MOTION_BASICS/motion/MotionConstants' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * Constructor for PusherNode
   *
   * @param {MotionModel} model the model for the entire 'motion', 'friction' or 'acceleration' screen
   * @param layoutWidth width for the layout for purposes of centering the character when pushing
   * @constructor
   */
  function PusherNode( model, layoutWidth ) {
    var pusherNode = this;
    var scale = 0.85;

    //Create all the images up front, add as children and toggle their visible for performance and reduced garbage collection
    var pushingRightNodes = [];
    var pushingLeftNodes = [];
    var children = [];
    var standingUp = new Image( pusherStraightImage, {visible: true, pickable: true, scale: scale} );
    var fallLeft = new Image( pusherFallDownImage, {visible: false, pickable: false, scale: scale} );
    var fallRight = new Image( pusherFallDownImage, {visible: false, pickable: false, scale: new Vector2( -scale, scale )} );
    var visibleNode = standingUp;

    children.push( standingUp );
    children.push( fallLeft );
    children.push( fallRight );
    for ( var i = 0; i <= 14; i++ ) {
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
                  null;
      var rightImage = new Image( image, {visible: false, pickable: false, scale: scale} );
      var leftImage = new Image( image, {visible: false, pickable: false, scale: new Vector2( -scale, scale )} );
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

    Node.call( this, {children: children} );

    //Update the position when the pusher is not applying force (fallen or standing)
    function updateZeroForcePosition() {
      var pusherY = 362 - visibleNode.height;
      var x = layoutWidth / 2 + (model.pusherPosition - model.position) * MotionConstants.POSITION_SCALE;

      //To save processor time, don't update the image if it is too far offscreen
      if ( x > -2000 && x < 2000 ) {
        visibleNode.translate( x - visibleNode.getCenterX(), pusherY - visibleNode.y, true );
      }
    }

    function updateAppliedForcePosition() {
      assert && assert( model.stack.length > 0 );
      var pusherY = 362 - visibleNode.height;
      var delta = model.stack.get( 0 ).view.width / 2 - model.stack.get( 0 ).pusherInset;
      if ( model.appliedForce > 0 ) {
        visibleNode.setTranslation( (layoutWidth / 2 - visibleNode.width - delta), pusherY );
      }
      else {
        visibleNode.setTranslation( (layoutWidth / 2 + visibleNode.width + delta), pusherY );
      }
    }

    //Choose the rightImage
    model.multilink( ['appliedForce', 'fallen'], function( appliedForce, fallen ) {
      if ( fallen ) {
        setVisibleNode( model.fallenDirection === 'left' ? fallLeft : fallRight );
        updateZeroForcePosition();
      }
      else if ( appliedForce === 0 ) {
        setVisibleNode( standingUp );
        updateZeroForcePosition();
      }
      else {
        var index = Math.min( 14, Math.round( Math.abs( (appliedForce / 500 * 14) ) ) );
        if ( appliedForce > 0 ) {
          setVisibleNode( pushingRightNodes[index] );
        }
        else {
          setVisibleNode( pushingLeftNodes[index] );
        }
        updateAppliedForcePosition();
      }
    } );

    //Update the rightImage and position when the model changes
    model.multilink( ['position', 'pusherPosition'], function() {
      if ( model.appliedForce === 0 || model.fallen ) {
        updateZeroForcePosition();
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