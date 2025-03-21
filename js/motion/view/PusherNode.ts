// Copyright 2013-2025, University of Colorado Boulder

/**
 * Shows the draggable pusher, which applies force to the objects in the center of the screen and falls down if he exceeds the maximum velocity.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import SceneryEvent from '../../../../scenery/js/input/SceneryEvent.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import pusher_0_png from '../../../images/pushPullFigures/pusher_0_png.js';
import pusher_10_png from '../../../images/pushPullFigures/pusher_10_png.js';
import pusher_11_png from '../../../images/pushPullFigures/pusher_11_png.js';
import pusher_12_png from '../../../images/pushPullFigures/pusher_12_png.js';
import pusher_13_png from '../../../images/pushPullFigures/pusher_13_png.js';
import pusher_14_png from '../../../images/pushPullFigures/pusher_14_png.js';
import pusher_15_png from '../../../images/pushPullFigures/pusher_15_png.js';
import pusher_16_png from '../../../images/pushPullFigures/pusher_16_png.js';
import pusher_17_png from '../../../images/pushPullFigures/pusher_17_png.js';
import pusher_18_png from '../../../images/pushPullFigures/pusher_18_png.js';
import pusher_19_png from '../../../images/pushPullFigures/pusher_19_png.js';
import pusher_1_png from '../../../images/pushPullFigures/pusher_1_png.js';
import pusher_20_png from '../../../images/pushPullFigures/pusher_20_png.js';
import pusher_21_png from '../../../images/pushPullFigures/pusher_21_png.js';
import pusher_22_png from '../../../images/pushPullFigures/pusher_22_png.js';
import pusher_23_png from '../../../images/pushPullFigures/pusher_23_png.js';
import pusher_24_png from '../../../images/pushPullFigures/pusher_24_png.js';
import pusher_25_png from '../../../images/pushPullFigures/pusher_25_png.js';
import pusher_26_png from '../../../images/pushPullFigures/pusher_26_png.js';
import pusher_27_png from '../../../images/pushPullFigures/pusher_27_png.js';
import pusher_28_png from '../../../images/pushPullFigures/pusher_28_png.js';
import pusher_29_png from '../../../images/pushPullFigures/pusher_29_png.js';
import pusher_2_png from '../../../images/pushPullFigures/pusher_2_png.js';
import pusher_30_png from '../../../images/pushPullFigures/pusher_30_png.js';
import pusher_3_png from '../../../images/pushPullFigures/pusher_3_png.js';
import pusher_4_png from '../../../images/pushPullFigures/pusher_4_png.js';
import pusher_5_png from '../../../images/pushPullFigures/pusher_5_png.js';
import pusher_6_png from '../../../images/pushPullFigures/pusher_6_png.js';
import pusher_7_png from '../../../images/pushPullFigures/pusher_7_png.js';
import pusher_8_png from '../../../images/pushPullFigures/pusher_8_png.js';
import pusher_9_png from '../../../images/pushPullFigures/pusher_9_png.js';
import pusher_fall_down_png from '../../../images/pushPullFigures/pusher_fall_down_png.js';
import pusher_straight_on_png from '../../../images/pushPullFigures/pusher_straight_on_png.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import Item from '../model/Item.js';
import MotionModel from '../model/MotionModel.js';
import MotionConstants from '../MotionConstants.js';
import ItemNode from './ItemNode.js';

export default class PusherNode extends Node {

  // if there are no items on the stack, the node is not interactive and the drag handler will not do anything
  private interactive = true;

  /**
   * Constructor for PusherNode
   *
   * @param model the model for the entire 'motion', 'friction' or 'acceleration' screen
   * @param layoutWidth width for the layout for purposes of centering the character when pushing
   * @param itemModelToNodeMap
   * @param tandem
   */
  public constructor( model: MotionModel, layoutWidth: number, itemModelToNodeMap: Map<Item, ItemNode>, tandem: Tandem ) {
    const scale = 0.95;

    // Create all the images up front, add as children and toggle their visible for performance and reduced garbage collection
    const pushingRightNodes: Node[] = [];
    const pushingLeftNodes: Node[] = [];
    const children = [];
    const standingUpImageNode = new Image( pusher_straight_on_png, {
      visible: true,
      pickable: true,
      scale: scale
    } );
    const fallLeftImage = new Image( pusher_fall_down_png, {
      visible: false,
      pickable: false,
      scale: scale
    } );
    const fallRightImage = new Image( pusher_fall_down_png, {
      visible: false,
      pickable: false,
      scale: new Vector2( -scale, scale )
    } );
    let visibleNode: Node = standingUpImageNode;

    children.push( standingUpImageNode );
    children.push( fallLeftImage );
    children.push( fallRightImage );
    for ( let i = 0; i <= 30; i++ ) {
      const image = i === 0 ? pusher_0_png :
                    i === 1 ? pusher_1_png :
                    i === 2 ? pusher_2_png :
                    i === 3 ? pusher_3_png :
                    i === 4 ? pusher_4_png :
                    i === 5 ? pusher_5_png :
                    i === 6 ? pusher_6_png :
                    i === 7 ? pusher_7_png :
                    i === 8 ? pusher_8_png :
                    i === 9 ? pusher_9_png :
                    i === 10 ? pusher_10_png :
                    i === 11 ? pusher_11_png :
                    i === 12 ? pusher_12_png :
                    i === 13 ? pusher_13_png :
                    i === 14 ? pusher_14_png :
                    i === 15 ? pusher_15_png :
                    i === 16 ? pusher_16_png :
                    i === 17 ? pusher_17_png :
                    i === 18 ? pusher_18_png :
                    i === 19 ? pusher_19_png :
                    i === 20 ? pusher_20_png :
                    i === 21 ? pusher_21_png :
                    i === 22 ? pusher_22_png :
                    i === 23 ? pusher_23_png :
                    i === 24 ? pusher_24_png :
                    i === 25 ? pusher_25_png :
                    i === 26 ? pusher_26_png :
                    i === 27 ? pusher_27_png :
                    i === 28 ? pusher_28_png :
                    i === 29 ? pusher_29_png :
                    i === 30 ? pusher_30_png :
                    null;
      const rightImageNode = new Image( image!, {
        visible: false,
        pickable: false,
        scale: scale
      } );
      const leftImageNode = new Image( image!, {
        visible: false,
        pickable: false,
        scale: new Vector2( -scale, scale )
      } );
      pushingRightNodes.push( rightImageNode );
      pushingLeftNodes.push( leftImageNode );
      children.push( rightImageNode );
      children.push( leftImageNode );
    }

    const setVisibleNode = ( node: Node ) => {
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
      tandem: tandem,
      phetioInputEnabledPropertyInstrumented: true,
      phetioVisiblePropertyInstrumented: false
    } );

    // Update the position when the pusher is not applying force (fallen or standing)
    const updateZeroForcePosition = ( x: number ) => {
      const pusherY = 362 - visibleNode.height;
      visibleNode.translate( x, pusherY - visibleNode.y, true );
    };

    /**
     * Reset the zero force position so that the pusher is at the correct place when the pusher falls over or when
     * applied force is set to zero after.  Dependent on the width of the item stack, direction the pusher fell, or the
     * direction the pusher was applying a force before the force was set to zero.
     */
    const resetZeroForcePosition = ( direction: string ) => {
      if ( model.stackedItems.length > 0 ) {

        const item = model.stackedItems.get( 0 );
        const itemNode = itemModelToNodeMap.get( item );
        assert && assert( itemNode, 'itemNode is null for itemModel' );

        // get the scaled width of the first image on the stack
        const scaledWidth = itemNode!.getScaledWidth();

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
      assert && assert( model.stackedItems.length > 0 );
      const pusherY = 362 - visibleNode.height;
      const item = model.stackedItems.get( 0 );
      const itemNode = itemModelToNodeMap.get( item );
      assert && assert( itemNode, 'itemNode is null for itemModel' );

      // get the scaled width of the first item in the stack
      const scaledWidth = itemNode!.getScaledWidth();

      const delta = scaledWidth / 2 - item.pusherInsetProperty.get();
      if ( model.appliedForceProperty.get() > 0 ) {
        visibleNode.setTranslation( ( layoutWidth / 2 - visibleNode.width - delta ), pusherY );
      }
      else {
        visibleNode.setTranslation( ( layoutWidth / 2 + visibleNode.width + delta ), pusherY );
      }

      // if the user empties the stack, the standing image should be where the applied force position was
      standingUpImageNode.centerX = visibleNode.centerX;
    };

    // get new position for the pusher node when he falls so that he falls back from
    // the item stack when it is moving too quickly
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
    const pusherLetGo = ( newVisibleNode: Node, direction: string ) => {
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
        const newVisibleNode = model.fallenDirectionProperty.get() === 'left' ? fallLeftImage : fallRightImage;
        pusherLetGo( newVisibleNode, model.fallenDirectionProperty.get() );
      }
      else {
        // the pusher just stood up after falling, set center standing image at the current
        // fallen position
        standingUpImageNode.centerX = visibleNode.centerX;
        setVisibleNode( standingUpImageNode );
      }
    } );

    model.appliedForceProperty.link( ( appliedForce, previousAppliedForce ) => {
      if ( appliedForce === 0 ) {
        pusherLetGo( standingUpImageNode, previousAppliedForce! > 0 ? 'right' : 'left' );
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

      // make sure that the standing node is visible, and place in initial position
      setVisibleNode( standingUpImageNode );
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
        // only do this if the pusher is standing and there is non-zero applied force
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

    const dragListener = new SoundDragListener( {
      tandem: tandem.createTandem( 'dragListener' ),
      allowTouchSnag: true,
      enabledProperty: model.pusherInteractionsEnabledProperty,
      drag: ( event: SceneryEvent, listener: DragListener ) => {
        if ( this.interactive ) {
          const newAppliedForce = model.appliedForceProperty.get() + listener.modelDelta.x;
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
          if ( !model.isPlayingProperty.value ) {
            model.isPlayingProperty.set( true );
          }
        }
      },

      end: () => {
        if ( this.interactive ) {

          // if the model is paused, the applied force should remain the same
          if ( model.isPlayingProperty.value ) {
            model.appliedForceProperty.set( 0 );
          }
        }
      }
    } );
    this.addInputListener( dragListener );

    // Make it so you cannot drag the pusher until one ItemNode is in the play area
    model.pusherInteractionsEnabledProperty.link( enabled => {
      if ( enabled ) {
        this.cursor = 'pointer';
        this.interactive = true;
      }
      else {
        this.cursor = 'default';
        this.interactive = false;
      }
    } );

    // place the pusher in the correct position initially
    initializePusherNode();
  }
}

forcesAndMotionBasics.register( 'PusherNode', PusherNode );