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
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var inherit = require( 'PHET_CORE/inherit' );
  var imageLoader = require( 'imageLoader' );
  var MotionConstants = require( 'motion/MotionConstants' );
  var platform = require( 'PHET_CORE/platform' );
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
    var standingUp = new Image( imageLoader.getImage( 'pusher_straight_on.png' ), {visible: true, pickable: true, scale: scale} );
    var fallLeft = new Image( imageLoader.getImage( 'pusher_fall_down.png' ), {visible: false, pickable: false, scale: scale} );
    var fallRight = new Image( imageLoader.getImage( 'pusher_fall_down.png' ), {visible: false, pickable: false, scale: new Vector2( -scale, scale )} );
    var visibleNode = standingUp;

    children.push( standingUp );
    children.push( fallLeft );
    children.push( fallRight );
    for ( var i = 0; i <= 14; i++ ) {
      var rightImage = new Image( imageLoader.getImage( 'pusher_' + i + '.png' ), {visible: false, pickable: false, scale: scale} );
      var leftImage = new Image( imageLoader.getImage( 'pusher_' + i + '.png' ), {visible: false, pickable: false, scale: new Vector2( -scale, scale )} );
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
      var pusherY = 362 - visibleNode.height;
      var delta = model.stack.length > 0 ? (model.stack.at( 0 ).view.width / 2 - model.stack.at( 0 ).pusherInset) : 100;
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