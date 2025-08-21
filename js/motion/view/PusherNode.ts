// Copyright 2013-2025, University of Colorado Boulder

/**
 * Shows the draggable pusher, which applies force to the objects in the center of the screen and falls down if he exceeds the maximum velocity.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { roundSymmetric } from '../../../../dot/js/util/roundSymmetric.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import SceneryEvent from '../../../../scenery/js/input/SceneryEvent.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import phetioStateSetEmitter from '../../../../tandem/js/phetioStateSetEmitter.js';
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

  private interactive: boolean;
  private visibleNode: Node;
  private readonly standingUpImageNode: Node;
  private readonly fallLeftImage: Node;
  private readonly fallRightImage: Node;
  private readonly pushingRightNodes: Node[];
  private readonly pushingLeftNodes: Node[];
  private readonly layoutWidth: number;
  private readonly model: MotionModel;
  private readonly itemModelToNodeMap: Map<Item, ItemNode>;

  /**
   * @param model the model for the entire 'motion', 'friction' or 'acceleration' screen
   * @param layoutWidth width for the layout for purposes of centering the character when pushing
   * @param itemModelToNodeMap
   * @param tandem
   */
  public constructor( model: MotionModel, layoutWidth: number, itemModelToNodeMap: Map<Item, ItemNode>, tandem: Tandem ) {
    const scale = 0.95;

    // Create all the images up front, add as children and toggle their visible for performance and reduced garbage collection
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

    children.push( standingUpImageNode );
    children.push( fallLeftImage );
    children.push( fallRightImage );

    const pushingRightNodes: Node[] = [];
    const pushingLeftNodes: Node[] = [];

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

    super( {
      children: children,
      tandem: tandem,
      phetioInputEnabledPropertyInstrumented: true,
      phetioVisiblePropertyInstrumented: false
    } );

    this.interactive = true;
    this.visibleNode = standingUpImageNode;
    this.standingUpImageNode = standingUpImageNode;
    this.fallLeftImage = fallLeftImage;
    this.fallRightImage = fallRightImage;
    this.pushingRightNodes = pushingRightNodes;
    this.pushingLeftNodes = pushingLeftNodes;
    this.layoutWidth = layoutWidth;
    this.model = model;
    this.itemModelToNodeMap = itemModelToNodeMap;

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
          const roundedForce = roundSymmetric( clampedAppliedForce );

          // Only apply a force if the pusher is not fallen, see #48
          if ( !model.fallenProperty.get() ) {
            model.appliedForceProperty.value = roundedForce;
          }
        }
      },

      start: () => {
        if ( this.interactive ) {

          // if the user interacts with the pusher, resume model 'playing' so that the sim does not seem broken
          if ( !model.isPlayingProperty.value ) {
            model.isPlayingProperty.value = true;
          }
        }
      },

      end: () => {
        if ( this.interactive ) {

          // if the model is paused, the applied force should remain the same
          if ( model.isPlayingProperty.value ) {
            model.appliedForceProperty.value = 0;
          }
        }
      }
    } );
    this.addInputListener( dragListener );

    model.fallenProperty.link( () => this.updateView() );
    model.appliedForceProperty.link( () => this.updateView() );
    model.resetAllEmitter.addListener( () => this.updateView() ); // on reset all, the model should set the node to the initial pusher position
    model.stackedItems.lengthProperty.link( () => this.updateView() ); // when the stack composition changes, update the view
    model.positionProperty.link( () => this.updateView() ); // Update position when the model position changes
    phetioStateSetEmitter.addListener( () => this.updateView() );

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
    this.updateView();
  }

  /**
   * Updates all aspects of the pusher's visual representation based on the current model state.
   * This includes the image, position, scale, etc.
   */
  private updateView(): void {
    const appliedForce = this.model.appliedForceProperty.get();
    const fallen = this.model.fallenProperty.get();

    const baseX = this.layoutWidth / 2 + ( this.model.pusherPositionProperty.get() - this.model.positionProperty.get() ) * MotionConstants.POSITION_SCALE;

    // Case 1: Pusher has fallen over
    const FLOOR_VIEW_Y = 362;
    if ( fallen ) {
      const newVisibleNode = this.model.fallenDirectionProperty.get() === 'left' ? this.fallLeftImage : this.fallRightImage;
      this.setVisibleNode( newVisibleNode );

      // Position the fallen pusher directly based on stack width and direction
      if ( this.model.stackedItems.length > 0 ) {
        const item = this.model.stackedItems.get( 0 );
        const itemNode = this.itemModelToNodeMap.get( item );
        assert && assert( itemNode, 'itemNode is null for itemModel, item.name = ' + item.name );

        const scaledWidth = itemNode!.getScaledWidth();
        const delta = scaledWidth / 2 - item.pusherInsetProperty.get() + 10;

        // Set position based on model position to move with ground
        const posX = baseX;

        // Add offset based on fall direction
        if ( this.model.fallenDirectionProperty.get() === 'right' ) {
          this.visibleNode.centerX = posX - delta;
        }
        else {
          this.visibleNode.centerX = posX + delta;
        }
      }
      else {
        // If no stack, position based on model position
        this.visibleNode.centerX = baseX;
      }

      // Set Y position directly
      this.visibleNode.y = FLOOR_VIEW_Y - this.visibleNode.height;
    }
    // Case 2: Pusher is applying force
    else if ( appliedForce !== 0 ) {
      // Select the correct image based on force magnitude and direction
      const index = Math.min( 30, roundSymmetric( Math.abs( appliedForce / 500 * 30 ) ) );

      if ( appliedForce > 0 ) {
        this.setVisibleNode( this.pushingRightNodes[ index ] );
      }
      else {
        this.setVisibleNode( this.pushingLeftNodes[ index ] );
      }

      // Update position based on stack width and force direction
      if ( this.model.stackedItems.length > 0 ) {
        const item = this.model.stackedItems.get( 0 );
        const itemNode = this.itemModelToNodeMap.get( item );
        assert && assert( itemNode, 'itemNode is null for itemModel, item.name = ' + item.name );

        const scaledWidth = itemNode!.getScaledWidth();
        const delta = scaledWidth / 2 - item.pusherInsetProperty.get();

        // Set absolute position directly
        const offset = appliedForce > 0 ? -delta : delta;
        this.visibleNode.setTranslation( ( this.layoutWidth / 2 + ( appliedForce > 0 ? -this.visibleNode.width : this.visibleNode.width ) + offset ), FLOOR_VIEW_Y - this.visibleNode.height );
        this.model.pusherPositionProperty.value = this.model.positionProperty.value + ( appliedForce > 0 ? -10 : 10 ); // For when the pusher is not dragging
      }
      else {
        // If no stack, position based on model position
        this.visibleNode.centerX = baseX;
        this.visibleNode.y = FLOOR_VIEW_Y - this.visibleNode.height;
      }
    }
    // Case 3: Pusher is standing (zero force)
    else {
      this.setVisibleNode( this.standingUpImageNode );

      // Set position directly based on model position without any deltas
      this.visibleNode.centerX = baseX;
      this.visibleNode.y = FLOOR_VIEW_Y - this.visibleNode.height;
    }
  }

  /**
   * Switches which image is currently visible
   */
  private setVisibleNode( node: Node ): void {
    if ( node !== this.visibleNode ) {
      this.visibleNode.visible = false;
      this.visibleNode.pickable = false;
      node.visible = true;
      node.pickable = true;
      this.visibleNode = node;
    }
  }
}

forcesAndMotionBasics.register( 'PusherNode', PusherNode );