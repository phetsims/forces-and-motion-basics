// Copyright 2013-2015, University of Colorado Boulder

/**
 * Shows the draggable pusher, which applies force to the objects in the center of the screen and falls down if he exceeds the maximum velocity.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var TandemImage = require( 'TANDEM/scenery/nodes/TandemImage' );
  var TandemNode = require( 'TANDEM/scenery/nodes/TandemNode' );
  var TandemDragHandler = require( 'TANDEM/scenery/input/TandemDragHandler' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Util = require( 'DOT/Util' );

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
   * @param {Tandem} tandem
   * @constructor
   */
  function PusherNode( model, layoutWidth, tandem ) {
    var pusherNode = this;
    var scale = 0.95;

    //Create all the images up front, add as children and toggle their visible for performance and reduced garbage collection
    var pushingRightNodes = [];
    var pushingLeftNodes = [];
    var children = [];
    var standingUp = new TandemImage( pusherStraightImage, {
      visible: true,
      pickable: true,
      scale: scale,
      tandem: tandem.createTandem( 'standingUpImageNode' )
    } );
    var fallLeft = new TandemImage( pusherFallDownImage, {
      visible: false,
      pickable: false,
      scale: scale,
      tandem: tandem.createTandem( 'fallLeftImage' )
    } );
    var fallRight = new TandemImage( pusherFallDownImage, {
      visible: false,
      pickable: false,
      scale: new Vector2( -scale, scale ),
      tandem: tandem.createTandem( 'fallRightImage' )
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
      var rightImageNode = new TandemImage( image, {
        visible: false,
        pickable: false,
        scale: scale,
        tandem: tandem.createTandem( 'rightImageNode' + i )
      } );
      var leftImageNode = new TandemImage( image, {
        visible: false,
        pickable: false,
        scale: new Vector2( -scale, scale ),
        tandem: tandem.createTandem( 'leftImageNode' + i )
      } );
      pushingRightNodes.push( rightImageNode );
      pushingLeftNodes.push( leftImageNode );
      children.push( rightImageNode );
      children.push( leftImageNode );
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

    TandemNode.call( this, {
      children: children,
      tandem: tandem
    } );

    // Update the position when the pusher is not applying force (fallen or standing)
    function updateZeroForcePosition( x ) {
      var pusherY = 362 - visibleNode.height;
      visibleNode.translate( x, pusherY - visibleNode.y, true );
    }

    /**
     * Reset the zero force position so that the pusher is at the correct place when the
     * pusher falls over or when applied force is set to zero after.  Dependent
     * on the width of the item stack, direction the pusher fell, or the direction
     * the pusher was applying a force before the force was set to zero.
     *
     * @param  {string} direction description
     */
    var resetZeroForcePosition = function( direction ) {
      var item = model.stack.get( 0 );
      if ( item ) {

        // get the scaled width of the first image on tthe stack
        var scaledWidth = item.view.getScaledWidth();

        // add a little more space (10) so the pusher isn't exactly touching the stack
        var delta = scaledWidth / 2 - item.pusherInset + 10;

        if ( direction === 'right' ) {
          visibleNode.centerX = layoutWidth / 2 - visibleNode.width / 2 - delta;
        }
         else {
          visibleNode.centerX = layoutWidth / 2 + visibleNode.width / 2 + delta;
        }
      }
    };

    /**
     * Update the position of the visible node when force is being applied to the stack.
     * Dependent on the width of the stack, the width of the visible node, and direction
     * of the applied force
     *
     * @return {type}  description
     */
    function updateAppliedForcePosition() {
      assert && assert( model.stack.length > 0 );
      var pusherY = 362 - visibleNode.height;
      var item = model.stack.get( 0 );

      // get the scaled width of the first item in the stack
      var scaledWidth = item.view.getScaledWidth();

      var delta = scaledWidth / 2 - item.pusherInset;
      if ( model.appliedForce > 0 ) {
        visibleNode.setTranslation( (layoutWidth / 2 - visibleNode.width - delta), pusherY );
      }
      else {
        visibleNode.setTranslation( (layoutWidth / 2 + visibleNode.width + delta), pusherY );
      }

      // if the user empties the stack, the standing image should be where the applied force position was
      standingUp.centerX = visibleNode.centerX;
    }

    // get new position for the pusher node when he falls so that he falls back from
    // the item stack when it is moving too quickly
    // @return {number}
    var getPusherNodeDeltaX = function() {
      // the change in position for the model
      var modelDelta = -( model.position - model.previousModelPosition );

      // return, transformed by the view scale
      return modelDelta * MotionConstants.POSITION_SCALE;
    };


    /**
     * Called when the pusher has let go, either from falling or from setting the
     * applied force to zero.
     *
     * @param  {Node} newVisibleNode - visibleNode, should be either falling or standing images of the pusher
     * @param  {string} direction      description
     */
    var pusherLetGo = function( newVisibleNode, direction ) {
      // update the visible node and place it in a position dependent on the direction
      // of falling or the applied force
      setVisibleNode( newVisibleNode );
      resetZeroForcePosition( direction );

      // get the translation delta from the transformed model delta and translate
      var x = getPusherNodeDeltaX();
      updateZeroForcePosition( x );
    };

     model.fallenProperty.link( function( fallen ) {
      if ( fallen ) {
        var newVisibleNode = model.fallenDirection === 'left' ? fallLeft : fallRight;
        pusherLetGo( newVisibleNode, model.fallenDirection );
      }
      else {
        // the pusher just stood up after falling, set center standing image at the current
        // fallen position
        standingUp.centerX = visibleNode.centerX;
        setVisibleNode( standingUp );
      }
    } );

    model.appliedForceProperty.link( function( appliedForce, previousAppliedForce ) {
      if ( appliedForce === 0 ) {
        pusherLetGo( standingUp, previousAppliedForce > 0 ? 'right' : 'left' );
      }

      // update visibility and position if pusher is on screen and is still able to push
      else {
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

    var initializePusherNode = function() {
      // makd sure that the standing node is visible, and place in initial position
      setVisibleNode( standingUp );
      visibleNode.centerX = layoutWidth / 2 + ( model.pusherPosition - model.position ) * MotionConstants.POSITION_SCALE;
    };

    // on reset all, the model should set the node to the initial pusher position
    model.on( 'reset-all', function() {
      initializePusherNode();
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
    model.multilink( [ 'position' ], function() {
      if ( model.appliedForce === 0 || model.fallen ) {
        var x = getPusherNodeDeltaX();
        // to save processor time, don't update if the pusher is too far off screen
        if ( Math.abs( x ) < 2000 ) {
          updateZeroForcePosition( x );
        }
      }
    } );

    var listener = new TandemDragHandler( {
      tandem: tandem.createTandem( 'dragHandler' ),
      allowTouchSnag: true,
      translate: function( options ) {
        var newAppliedForce = model.appliedForce + options.delta.x;
        var clampedAppliedForce = Math.max( -500, Math.min( 500, newAppliedForce ) );

        // the new force should be rounded so that applied force is not
        // more precise than friction force, see https://github.com/phetsims/forces-and-motion-basics/issues/197
        var roundedForce = Util.roundSymmetric( clampedAppliedForce );

        //Only apply a force if the pusher is not fallen, see #48
        if ( !model.fallen ) {
          model.appliedForce = roundedForce;
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

    // place the pusher in the correct position initially
    initializePusherNode();
  }

  forcesAndMotionBasics.register( 'PusherNode', PusherNode );

  return inherit( TandemNode, PusherNode );
} );
