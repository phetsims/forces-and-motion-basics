// Copyright 2025, University of Colorado Boulder

/**
 * Keyboard strategy for items on the stack.
 * Handles navigation between stack items with up/down navigation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import type MotionModel from '../model/MotionModel.js';
import type ItemNode from './ItemNode.js';
import { ItemNodeKeyboardStrategy } from './ItemNodeKeyboardStrategy.js';
import type ItemStackGroupNode from './ItemStackGroupNode.js';

export default class StackKeyboardStrategy implements ItemNodeKeyboardStrategy {
  public constructor( private readonly groupNode: ItemStackGroupNode, private readonly model: MotionModel ) {}

  public navigateToItem( currentItem: ItemNode, direction: 'left' | 'right' | 'up' | 'down' ): ItemNode | null {
    const stackItems = this.groupNode.stackItemNodes;
    const currentIndex = stackItems.indexOf( currentItem );
    if ( currentIndex === -1 ) { return null; }

    // Up/Left moves to higher index (towards top of stack), Down/Right moves to lower index (towards bottom)
    const delta = ( direction === 'up' || direction === 'left' ) ? 1 :
                  ( direction === 'down' || direction === 'right' ) ? -1 : 0;
    const newIndex = currentIndex + delta;

    // Keep selection within bounds
    if ( newIndex >= 0 && newIndex < stackItems.length ) {
      return stackItems[ newIndex ];
    }
    return null;
  }

  public onDropComplete( item: ItemNode, droppedOnStack: boolean, wasAlreadyOnStack?: boolean ): void {
    // Stack items don't need special focus behavior after drops
    // The automatic transfer system in MotionScreenView will handle group transfers
    // based on inStackProperty changes, so we don't manually remove items here
    if ( !droppedOnStack ) {
      // nothing to do here
    }
    else if ( droppedOnStack && wasAlreadyOnStack ) {
      // Item was dropped back onto stack - ensure other stack items are non-focusable
      this.groupNode.stackItemNodes.forEach( node => {
        if ( node !== item ) {
          node.focusable = false;
        }
      } );
    }
  }

  public getItemGroup(): ItemNode[] {
    return this.groupNode.stackItemNodes;
  }

  public getAccessibilityMessage( action: 'grabbed' | 'dropped', location: 'stack' | 'toolbox' ): string {
    if ( action === 'grabbed' ) {
      return 'Grabbed';
    }
    else {
      return location === 'stack' ? 'Item moved on stack' : 'Item returned to toolbox';
    }
  }
}

forcesAndMotionBasics.register( 'StackKeyboardStrategy', StackKeyboardStrategy );