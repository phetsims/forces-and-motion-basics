// Copyright 2025, University of Colorado Boulder

/**
 * Keyboard strategy for items in the toolboxes.
 * Handles navigation between toolbox items and focus management after drops.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import type MotionModel from '../model/MotionModel.js';
import type ItemNode from './ItemNode.js';
import { ItemNodeKeyboardStrategy } from './ItemNodeKeyboardStrategy.js';
import type ItemToolboxGroupNode from './ItemToolboxGroupNode.js';

export default class ToolboxKeyboardStrategy implements ItemNodeKeyboardStrategy {
  public constructor( private readonly groupNode: ItemToolboxGroupNode, private readonly model: MotionModel ) {}

  public navigateToItem( currentItem: ItemNode, direction: 'left' | 'right' | 'up' | 'down' ): ItemNode | null {

    // Only left/right navigation in toolboxes (unified left/right toolbox navigation)
    if ( direction === 'up' || direction === 'down' ) {
      return null;
    }

    // Get items currently in toolboxes (not on stack)
    const itemsInToolbox = this.groupNode.itemNodes.filter( item => !item.item.inStackProperty.get() );
    const currentIndex = itemsInToolbox.indexOf( currentItem );
    if ( currentIndex === -1 ) { return null; }

    const delta = ( direction === 'left' ) ? -1 : 1;
    const newIndex = currentIndex + delta;

    // Keep selection within bounds
    if ( newIndex >= 0 && newIndex < itemsInToolbox.length ) {
      return itemsInToolbox[ newIndex ];
    }
    return null;
  }

  public onDropComplete( item: ItemNode, droppedOnStack: boolean, wasAlreadyOnStack?: boolean ): void {

    if ( droppedOnStack && !wasAlreadyOnStack ) {
      // Item was successfully dropped from toolbox to stack
      // Focus the next available item in the toolbox
      this.groupNode.focusNextItemInToolbox( item );
    }
    else {
      // Returned to toolbox (HOME drop) or was already on stack
      // For ALL HOME drops (regardless of origin), keep focus on the same item
      // since the user cycled through all positions and returned to toolbox intentionally
      // Keep focus on the current item (don't change focus)
    }
  }

  public getItemGroup(): ItemNode[] {
    return this.groupNode.itemNodes.filter( item => !item.item.inStackProperty.get() );
  }

  public getAccessibilityMessage( action: 'grabbed' | 'dropped', location: 'stack' | 'toolbox' ): string {
    if ( action === 'grabbed' ) {
      return ForcesAndMotionBasicsFluent.a11y.motionScreen.itemResponses.grabbedStringProperty.value;
    }
    else {
      return location === 'stack' ?
             ForcesAndMotionBasicsFluent.a11y.motionScreen.itemResponses.droppedOnSkateboardStringProperty.value :
             ForcesAndMotionBasicsFluent.a11y.motionScreen.itemResponses.returnedToToolboxStringProperty.value;
    }
  }
}

forcesAndMotionBasics.register( 'ToolboxKeyboardStrategy', ToolboxKeyboardStrategy );