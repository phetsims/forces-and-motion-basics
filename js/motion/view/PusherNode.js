// Copyright 2013-2021, University of Colorado Boulder

/**
 * Shows the draggable pusher, which applies force to the objects in the center of the screen and falls down if he exceeds the maximum velocity.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import SimpleDragHandler from '../../../../scenery/js/input/SimpleDragHandler.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import pusherImage0 from '../../../images/pusher_0_png.js';
import pusherImage10 from '../../../images/pusher_10_png.js';
import pusherImage11 from '../../../images/pusher_11_png.js';
import pusherImage12 from '../../../images/pusher_12_png.js';
import pusherImage13 from '../../../images/pusher_13_png.js';
import pusherImage14 from '../../../images/pusher_14_png.js';
import pusherImage15 from '../../../images/pusher_15_png.js';
import pusherImage16 from '../../../images/pusher_16_png.js';
import pusherImage17 from '../../../images/pusher_17_png.js';
import pusherImage18 from '../../../images/pusher_18_png.js';
import pusherImage19 from '../../../images/pusher_19_png.js';
import pusherImage1 from '../../../images/pusher_1_png.js';
import pusherImage20 from '../../../images/pusher_20_png.js';
import pusherImage21 from '../../../images/pusher_21_png.js';
import pusherImage22 from '../../../images/pusher_22_png.js';
import pusherImage23 from '../../../images/pusher_23_png.js';
import pusherImage24 from '../../../images/pusher_24_png.js';
import pusherImage25 from '../../../images/pusher_25_png.js';
import pusherImage26 from '../../../images/pusher_26_png.js';
import pusherImage27 from '../../../images/pusher_27_png.js';
import pusherImage28 from '../../../images/pusher_28_png.js';
import pusherImage29 from '../../../images/pusher_29_png.js';
import pusherImage2 from '../../../images/pusher_2_png.js';
import pusherImage30 from '../../../images/pusher_30_png.js';
import pusherImage3 from '../../../images/pusher_3_png.js';
import pusherImage4 from '../../../images/pusher_4_png.js';
import pusherImage5 from '../../../images/pusher_5_png.js';
import pusherImage6 from '../../../images/pusher_6_png.js';
import pusherImage7 from '../../../images/pusher_7_png.js';
import pusherImage8 from '../../../images/pusher_8_png.js';
import pusherImage9 from '../../../images/pusher_9_png.js';
import pusherFallDownImage from '../../../images/pusher_fall_down_png.js';
import pusherStraightImage from '../../../images/pusher_straight_on_png.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import MotionConstants from '../MotionConstants.js';

class PusherNode extends Node {
  /**
   * Constructor for PusherNode
   *
   * @param {MotionModel} model the model for the entire 'motion', 'friction' or 'acceleration' screen
   * @param {number} layoutWidth width for the layout for purposes of centering the character when pushing
   * @param {Tandem} tandem
   */
  constructor( model, layoutWidth, tandem ) {
    const scale = 0.95;

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
        tandem: tandem.createTandem( `rightImageNode${i}` )
      } );
      const leftImageNode = new Image( image, {
        visible: false,
        pickable: false,
        scale: new Vector2( -scale, scale ),
        tandem: tandem.createTandem( `leftImageNode${i}` )
      } );
      pushingRightNodes.push( rightImageNode );
      pushingLeftNodes.push( leftImageNode );
      children.push( rightImageNode );
      children.push( leftImageNode );
    }

    const setVisibleNode = node => {
      if ( node !== visibleNode ) {
        visibleNode.visible = false;
        visibleNode.pickable = false;
        node.visible = true;
        node.pickable = true;
        visibleNode = node;
      }
    };

    super( {
      children: children,
      tandem: tandem
    } );

    // @private - if there are no items on the stack, the node is not interactive and the
    // drag handler will not do anything
    this.interactive = true;

    // Update the position when the pusher is not applying force (fallen or standing)
    const updateZeroForcePosition = x => {
      const pusherY = 362 - visibleNode.height;
      visibleNode.translate( x, pusherY - visibleNode.y, true );
    };

    /**
     * Reset the zero force position so that the pusher is at the correct place when the pusher falls over or when
     * applied force is set to zero after.  Dependent on the width of the item stack, direction the pusher fell, or the
     * direction the pusher was applying a force before the force was set to zero.
     *
     * @param {string} direction description
     */
    const resetZeroForcePosition = direction => {
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
     */
    const updateAppliedForcePosition = () => {
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
    };

    // get new position for the pusher node when he falls so that he falls back from
    // the item stack when it is moving too quickly
    // @returns {number}
    const getPusherNodeDeltaX = () => {
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
    const pusherLetGo = ( newVisibleNode, direction ) => {
      // update the visible node and place it in a position dependent on the direction
      // of falling or the applied force
      setVisibleNode( newVisibleNode );
      resetZeroForcePosition( direction );

      // get the translation delta from the transformed model delta and translate
      const x = getPusherNodeDeltaX();
      updateZeroForcePosition( x );
    };

    model.fallenProperty.link( fallen => {
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

    model.appliedForceProperty.link( ( appliedForce, previousAppliedForce ) => {
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

    const initializePusherNode = () => {
      // makd sure that the standing node is visible, and place in initial position
      setVisibleNode( standingUp );
      visibleNode.centerX = layoutWidth / 2 + ( model.pusherPositionProperty.get() - model.positionProperty.get() ) * MotionConstants.POSITION_SCALE;
    };

    // on reset all, the model should set the node to the initial pusher position
    model.resetAllEmitter.addListener( () => {
      initializePusherNode();
    } );

    // when the stack composition changes, we want to update the applied force position
    // model.stackSize does not need a dispose function since it persists for the duration of the simulation
    model.stackSizeProperty.link( stackSize => {
      if ( stackSize > 0 ) {
        // only do this if the pusher is standing and there is non zero applied force
        if ( !model.fallenProperty.get() && model.appliedForceProperty.get() !== 0 ) {
          updateAppliedForcePosition();
        }
      }
    } );

    //Update the rightImage and position when the model changes
    model.positionProperty.link( () => {
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
      translate: options => {
        if ( this.interactive ) {
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

      start: () => {
        if ( this.interactive ) {

          // if the user interacts with the pusher, resume model 'playing' so that the sim does not seem broken
          if ( !model.playProperty.value ) {
            model.playProperty.set( true );
          }
        }
      },

      end: () => {
        if ( this.interactive ) {

          // if the model is paused, the applied force should remain the same
          if ( model.playProperty.value ) {
            model.appliedForceProperty.set( 0 );
          }
        }
      }
    } );
    this.addInputListener( listener );

    //Make it so you cannot drag the pusher until one ItemNode is in the play area
    model.stack.lengthProperty.link( length => {
      if ( length === 0 ) {
        this.cursor = 'default';
        this.interactive = false;
      }
      else {
        this.cursor = 'pointer';
        this.interactive = true;
      }
    } );

    // place the pusher in the correct position initially
    initializePusherNode();
  }
}

forcesAndMotionBasics.register( 'PusherNode', PusherNode );

export default PusherNode;