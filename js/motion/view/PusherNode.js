// Copyright 2013-2019, University of Colorado Boulder

/**
 * Shows the draggable pusher, which applies force to the objects in the center of the screen and falls down if he exceeds the maximum velocity.
 *
 * @author Sam Reid
 */
define( require => {
  'use strict';

  // modules
  const forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  const Image = require( 'SCENERY/nodes/Image' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MotionConstants = require( 'FORCES_AND_MOTION_BASICS/motion/MotionConstants' );
  const Node = require( 'SCENERY/nodes/Node' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  const Utils = require( 'DOT/Utils' );
  const Vector2 = require( 'DOT/Vector2' );

  // images
  const pusherFallDownImage = require( 'image!FORCES_AND_MOTION_BASICS/pusher_fall_down.png' );
  const pusherImage0 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_0.png' );
  const pusherImage1 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_1.png' );
  const pusherImage10 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_10.png' );
  const pusherImage11 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_11.png' );
  const pusherImage12 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_12.png' );
  const pusherImage13 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_13.png' );
  const pusherImage14 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_14.png' );
  const pusherImage15 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_15.png' );
  const pusherImage16 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_16.png' );
  const pusherImage17 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_17.png' );
  const pusherImage18 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_18.png' );
  const pusherImage19 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_19.png' );
  const pusherImage2 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_2.png' );
  const pusherImage20 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_20.png' );
  const pusherImage21 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_21.png' );
  const pusherImage22 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_22.png' );
  const pusherImage23 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_23.png' );
  const pusherImage24 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_24.png' );
  const pusherImage25 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_25.png' );
  const pusherImage26 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_26.png' );
  const pusherImage27 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_27.png' );
  const pusherImage28 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_28.png' );
  const pusherImage29 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_29.png' );
  const pusherImage3 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_3.png' );
  const pusherImage30 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_30.png' );
  const pusherImage4 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_4.png' );
  const pusherImage5 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_5.png' );
  const pusherImage6 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_6.png' );
  const pusherImage7 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_7.png' );
  const pusherImage8 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_8.png' );
  const pusherImage9 = require( 'image!FORCES_AND_MOTION_BASICS/pusher_9.png' );
  const pusherStraightImage = require( 'image!FORCES_AND_MOTION_BASICS/pusher_straight_on.png' );

  /**
   * Constructor for PusherNode
   *
   * @param {MotionModel} model the model for the entire 'motion', 'friction' or 'acceleration' screen
   * @param {number} layoutWidth width for the layout for purposes of centering the character when pushing
   * @param {Tandem} tandem
   * @constructor
   */
  function PusherNode( model, layoutWidth, tandem ) {
    const self = this;
    const scale = 0.95;

    // @private - if there are no items on the stack, the node is not interactive and the
    // drag handler will not do anything
    this.interactive = true;

    // Create all the images up front, add as children and toggle their visible for performance and reduced garbage collection
    const pushingRightNodes = [];
    const pushingLeftNodes = [];
    const children = [];
    const standingUp = new Image( pusherStraightImage, {
      visible: true,
      pickable: true,
      scale: scale,
      tandem: tandem.createTandem( 'standingUpImageNode' )
    } );
    const fallLeft = new Image( pusherFallDownImage, {
      visible: false,
      pickable: false,
      scale: scale,
      tandem: tandem.createTandem( 'fallLeftImage' )
    } );
    const fallRight = new Image( pusherFallDownImage, {
      visible: false,
      pickable: false,
      scale: new Vector2( -scale, scale ),
      tandem: tandem.createTandem( 'fallRightImage' )
    } );
    let visibleNode = standingUp;

    children.push( standingUp );
    children.push( fallLeft );
    children.push( fallRight );
    for ( let i = 0; i <= 30; i++ ) {
      const image = i === 0 ? pusherImage0 :
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
      const rightImageNode = new Image( image, {
        visible: false,
        pickable: false,
        scale: scale,
        tandem: tandem.createTandem( 'rightImageNode' + i )
      } );
      const leftImageNode = new Image( image, {
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

    Node.call( this, {
      children: children,
      tandem: tandem
    } );

    // Update the position when the pusher is not applying force (fallen or standing)
    function updateZeroForcePosition( x ) {
      const pusherY = 362 - visibleNode.height;
      visibleNode.translate( x, pusherY - visibleNode.y, true );
    }

    /**
     * Reset the zero force position so that the pusher is at the correct place when the pusher falls over or when
     * applied force is set to zero after.  Dependent on the width of the item stack, direction the pusher fell, or the
     * direction the pusher was applying a force before the force was set to zero.
     *
     * @param {string} direction description
     */
    const resetZeroForcePosition = function( direction ) {
      if ( model.stack.length > 0 ) {

        const item = model.stack.get( 0 );

        // get the scaled width of the first image on the stack
        const scaledWidth = item.view.getScaledWidth();

        // add a little more space (10) so the pusher isn't exactly touching the stack
        const delta = scaledWidth / 2 - item.pusherInsetProperty.get() + 10;

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
     * @returns {type}  description
     */
    function updateAppliedForcePosition() {
      assert && assert( model.stack.length > 0 );
      const pusherY = 362 - visibleNode.height;
      const item = model.stack.get( 0 );

      // get the scaled width of the first item in the stack
      const scaledWidth = item.view.getScaledWidth();

      const delta = scaledWidth / 2 - item.pusherInsetProperty.get();
      if ( model.appliedForceProperty.get() > 0 ) {
        visibleNode.setTranslation( ( layoutWidth / 2 - visibleNode.width - delta ), pusherY );
      }
      else {
        visibleNode.setTranslation( ( layoutWidth / 2 + visibleNode.width + delta ), pusherY );
      }

      // if the user empties the stack, the standing image should be where the applied force position was
      standingUp.centerX = visibleNode.centerX;
    }

    // get new position for the pusher node when he falls so that he falls back from
    // the item stack when it is moving too quickly
    // @returns {number}
    const getPusherNodeDeltaX = function() {
      // the change in position for the model
      const modelDelta = -( model.positionProperty.get() - model.previousModelPosition );

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
    const pusherLetGo = function( newVisibleNode, direction ) {
      // update the visible node and place it in a position dependent on the direction
      // of falling or the applied force
      setVisibleNode( newVisibleNode );
      resetZeroForcePosition( direction );

      // get the translation delta from the transformed model delta and translate
      const x = getPusherNodeDeltaX();
      updateZeroForcePosition( x );
    };

    model.fallenProperty.link( function( fallen ) {
      if ( fallen ) {
        const newVisibleNode = model.fallenDirectionProperty.get() === 'left' ? fallLeft : fallRight;
        pusherLetGo( newVisibleNode, model.fallenDirectionProperty.get() );
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
        const index = Math.min( 30, Utils.roundSymmetric( Math.abs( appliedForce / 500 * 30 ) ) );
        if ( appliedForce > 0 ) {
          setVisibleNode( pushingRightNodes[ index ] );
        }
        else {
          setVisibleNode( pushingLeftNodes[ index ] );
        }
        updateAppliedForcePosition();
      }
    } );

    const initializePusherNode = function() {
      // makd sure that the standing node is visible, and place in initial position
      setVisibleNode( standingUp );
      visibleNode.centerX = layoutWidth / 2 + ( model.pusherPositionProperty.get() - model.positionProperty.get() ) * MotionConstants.POSITION_SCALE;
    };

    // on reset all, the model should set the node to the initial pusher position
    model.resetAllEmitter.addListener( function() {
      initializePusherNode();
    } );

    // when the stack composition changes, we want to update the applied force position
    // model.stackSize does not need a dispose function since it persists for the duration of the simulation
    model.stackSizeProperty.link( function( stackSize ) {
      if ( stackSize > 0 ) {
        // only do this if the pusher is standing and there is non zero applied force
        if ( !model.fallenProperty.get() && model.appliedForceProperty.get() !== 0 ) {
          updateAppliedForcePosition();
        }
      }
    } );

    //Update the rightImage and position when the model changes
    model.positionProperty.link( function() {
      if ( model.appliedForceProperty.get() === 0 || model.fallenProperty.get() ) {
        const x = getPusherNodeDeltaX();
        // to save processor time, don't update if the pusher is too far off screen
        if ( Math.abs( x ) < 2000 ) {
          updateZeroForcePosition( x );
        }
      }
    } );

    const listener = new SimpleDragHandler( {
      tandem: tandem.createTandem( 'dragHandler' ),
      allowTouchSnag: true,
      translate: function( options ) {
        if ( self.interactive ) {
          const newAppliedForce = model.appliedForceProperty.get() + options.delta.x;
          const clampedAppliedForce = Math.max( -500, Math.min( 500, newAppliedForce ) );

          // the new force should be rounded so that applied force is not
          // more precise than friction force, see https://github.com/phetsims/forces-and-motion-basics/issues/197
          const roundedForce = Utils.roundSymmetric( clampedAppliedForce );

          //Only apply a force if the pusher is not fallen, see #48
          if ( !model.fallenProperty.get() ) {
            model.appliedForceProperty.set( roundedForce );
          }
        }
      },

      start: function() {
        if ( self.interactive ) {

          // if the user interacts with the pusher, resume model 'playing' so that the sim does not seem broken
          if ( !model.playProperty.value ) {
            model.playProperty.set( true );
          }
        }
      },

      end: function() {
        if ( self.interactive ) {

          // if the model is paused, the applied force should remain the same
          if ( model.playProperty.value ) {
            model.appliedForceProperty.set( 0 );
          }
        }
      }
    } );
    this.addInputListener( listener );

    //Make it so you cannot drag the pusher until one ItemNode is in the play area
    model.stack.lengthProperty.link( function( length ) {
      if ( length === 0 ) {
        self.cursor = 'default';
        self.interactive = false;
      }
      else {
        self.cursor = 'pointer';
        self.interactive = true;
      }
    } );

    // place the pusher in the correct position initially
    initializePusherNode();
  }

  forcesAndMotionBasics.register( 'PusherNode', PusherNode );

  return inherit( Node, PusherNode );
} );
