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

  var pusherStraightImage = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_straight_on.png,level=2' );
  var pusherFallDownImage = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_fall_down.png,level=2' );
  var pusherImage0 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_0.png,level=2' );
  var pusherImage1 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_1.png,level=2' );
  var pusherImage2 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_2.png,level=2' );
  var pusherImage3 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_3.png,level=2' );
  var pusherImage4 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_4.png,level=2' );
  var pusherImage5 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_5.png,level=2' );
  var pusherImage6 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_6.png,level=2' );
  var pusherImage7 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_7.png,level=2' );
  var pusherImage8 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_8.png,level=2' );
  var pusherImage9 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_9.png,level=2' );
  var pusherImage10 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_10.png,level=2' );
  var pusherImage11 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_11.png,level=2' );
  var pusherImage12 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_12.png,level=2' );
  var pusherImage13 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_13.png,level=2' );
  var pusherImage14 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_14.png,level=2' );
  var pusherImage15 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_15.png,level=2' );
  var pusherImage16 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_16.png,level=2' );
  var pusherImage17 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_17.png,level=2' );
  var pusherImage18 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_18.png,level=2' );
  var pusherImage19 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_19.png,level=2' );
  var pusherImage20 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_20.png,level=2' );
  var pusherImage21 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_21.png,level=2' );
  var pusherImage22 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_22.png,level=2' );
  var pusherImage23 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_23.png,level=2' );
  var pusherImage24 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_24.png,level=2' );
  var pusherImage25 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_25.png,level=2' );
  var pusherImage26 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_26.png,level=2' );
  var pusherImage27 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_27.png,level=2' );
  var pusherImage28 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_28.png,level=2' );
  var pusherImage29 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_29.png,level=2' );
  var pusherImage30 = require( 'mipmap!FORCES_AND_MOTION_BASICS/pusher_30.png,level=2' );

  var MotionConstants = require( 'FORCES_AND_MOTION_BASICS/motion/MotionConstants' );
  var Vector2 = require( 'DOT/Vector2' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  /**
   * Constructor for PusherNode
   *
   * @param {MotionModel} model the model for the entire 'motion', 'friction' or 'acceleration' screen
   * @param layoutWidth width for the layout for purposes of centering the character when pushing
   * @constructor
   */
  function PusherNode( model, layoutWidth ) {
    var pusherNode = this;
    var scale = 0.95;

    //Create all the images up front, add as children and toggle their visible for performance and reduced garbage collection
    var pushingRightNodes = [];
    var pushingLeftNodes = [];
    var children = [];
    var standingUp = new Image( pusherStraightImage[2].img, { visible: true, pickable: true, scale: scale } );
    var fallLeft = new Image( pusherFallDownImage[2].img, { visible: false, pickable: false, scale: scale } );
    var fallRight = new Image( pusherFallDownImage[2].img, {
      visible: false,
      pickable: false,
      scale: new Vector2( -scale, scale )
    } );
    var visibleNode = standingUp;

    children.push( standingUp );
    children.push( fallLeft );
    children.push( fallRight );
    for ( var i = 0; i <= 30; i++ ) {
      var image = i === 0 ? pusherImage0[2].img :
                  i === 1 ? pusherImage1[2].img :
                  i === 2 ? pusherImage2[2].img :
                  i === 3 ? pusherImage3[2].img :
                  i === 4 ? pusherImage4[2].img :
                  i === 5 ? pusherImage5[2].img :
                  i === 6 ? pusherImage6[2].img :
                  i === 7 ? pusherImage7[2].img :
                  i === 8 ? pusherImage8[2].img :
                  i === 9 ? pusherImage9[2].img :
                  i === 10 ? pusherImage10[2].img :
                  i === 11 ? pusherImage11[2].img :
                  i === 12 ? pusherImage12[2].img :
                  i === 13 ? pusherImage13[2].img :
                  i === 14 ? pusherImage14[2].img :
                  i === 15 ? pusherImage15[2].img :
                  i === 16 ? pusherImage16[2].img :
                  i === 17 ? pusherImage17[2].img :
                  i === 18 ? pusherImage18[2].img :
                  i === 19 ? pusherImage19[2].img :
                  i === 20 ? pusherImage20[2].img :
                  i === 21 ? pusherImage21[2].img :
                  i === 22 ? pusherImage22[2].img :
                  i === 23 ? pusherImage23[2].img :
                  i === 24 ? pusherImage24[2].img :
                  i === 25 ? pusherImage25[2].img :
                  i === 26 ? pusherImage26[2].img :
                  i === 27 ? pusherImage27[2].img :
                  i === 28 ? pusherImage28[2].img :
                  i === 29 ? pusherImage29[2].img :
                  i === 30 ? pusherImage30[2].img :
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
      var scaledWidth = item.view.normalImageNode.width * item.getCurrentScale();
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

      // to save processor time, don't update if the pusher is too far off screen
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
      if( !fallen && appliedForce !== 0 ) {
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

    //Update the rightImage and position when the model changes
    model.multilink( [ 'position', 'pusherPosition' ], function() {
      if ( model.appliedForce === 0 || model.fallen ) {
        var x = getPusherNodePosition();
        if( Math.abs( x ) < 2000 ) {
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

      start: function() {},
      end: function() {
        // if the model is paused, the applied force should remain the same
        if( model.playProperty.value ) {
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