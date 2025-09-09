// Copyright 2025, University of Colorado Boulder

/**
 * Strategy interface for keyboard navigation behavior.
 * Different contexts (toolbox vs stack) can provide their own implementations.
 * @author Sam Reid (PhET Interactive Simulations)
 */

import ItemNode from './ItemNode.js';

export type ItemNodeKeyboardStrategy = {

  /**
   * Navigate between items in the same context
   * @param currentItem - The item currently focused
   * @param direction - The navigation direction
   * @returns The item to focus next, or null if navigation not possible
   */
  navigateToItem( currentItem: ItemNode, direction: 'left' | 'right' | 'up' | 'down' ): ItemNode | null;

  /**
   * Called after an item is successfully dropped
   * @param item - The item that was dropped
   * @param droppedOnStack - Whether the item was dropped on stack (true) or returned to toolbox (false)
   * @param wasAlreadyOnStack - Optional: For toolbox drops, whether the item originated from stack (vs toolbox)
   */
  onDropComplete( item: ItemNode, droppedOnStack: boolean, wasAlreadyOnStack?: boolean ): void;

  /**
   * Get the group of items this item belongs to
   * @returns Array of all items in the same context
   */
  getItemGroup(): ItemNode[];

  /**
   * Context-specific accessibility message
   * @param action - The action performed
   * @param location - Where the action occurred
   * @returns The accessibility message to announce
   */
  getAccessibilityMessage( action: 'grabbed' | 'dropped', location: 'stack' | 'toolbox' ): string;
};