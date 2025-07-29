// Copyright 2025, University of Colorado Boulder

/**
 * ItemStackGroupNode manages keyboard navigation for items that are stacked on the skateboard,
 * making them feel like a cohesive group while maintaining individual focus.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Shape from '../../../../kite/js/Shape.js';
import optionize from '../../../../phet-core/js/optionize.js';
import GroupHighlightPath from '../../../../scenery/js/accessibility/GroupHighlightPath.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import ForcesAndMotionBasicsQueryParameters from '../../common/ForcesAndMotionBasicsQueryParameters.js';
import ForcesAndMotionBasicsLayoutBounds from '../../common/view/ForcesAndMotionBasicsLayoutBounds.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import MotionModel from '../model/MotionModel.js';
import ItemNode, { type ItemKeyboardStrategy } from './ItemNode.js';

type SelfOptions = {
  // No specific options for now
};

type ItemStackGroupNodeOptions = SelfOptions & NodeOptions;

export default class ItemStackGroupNode extends Node {
  public readonly stackItemNodes: ItemNode[] = [];

  // Track focus listeners so we can remove them when items leave the group  
  private readonly focusListeners = new Map();

  public constructor( model: MotionModel, providedOptions?: ItemStackGroupNodeOptions ) {

    const options = optionize<ItemStackGroupNodeOptions, SelfOptions, NodeOptions>()( {
      tagName: 'div',

      // ARIA attributes for the group
      ariaRole: 'group',
      accessibleName: ForcesAndMotionBasicsFluent.a11y.motionScreen.itemStackGroup.accessibleNameStringProperty,
      descriptionContent: ForcesAndMotionBasicsFluent.a11y.motionScreen.itemStackGroup.descriptionContentStringProperty
    }, providedOptions );

    super( options );

    // Create a constant highlight rectangle in the center of the play area
    // Based on the skateboard position and typical object sizes
    const highlightWidth = 200;
    const highlightHeight = 340;
    const highlightX = ForcesAndMotionBasicsLayoutBounds.centerX - highlightWidth / 2; // Center around x=400 (layoutBounds.width/2)
    const highlightY = 10; // Above the skateboard to encompass stacked items

    this.groupFocusHighlight = new GroupHighlightPath(
      Shape.rectangle( highlightX, highlightY, highlightWidth, highlightHeight ),
      {
        innerLineWidth: 5
      }
    );
  }

  /**
   * Add an item node to the stack group (transferring from another parent if needed)
   */
  public addItemNode( itemNode: ItemNode, model: MotionModel ): void {
    // Remove from current parent if it has one
    if ( itemNode.parent ) {
      itemNode.parent.removeChild( itemNode );
    }

    this.stackItemNodes.push( itemNode );
    this.addChild( itemNode );

    // Sort items by their stack position (bottom to top)
    this.sortItems( model );

    // Create and store the focus listener for this item
    const focusListener = ( focused: boolean ) => {
      if ( focused ) {
        this.stackItemNodes.forEach( node => {
          if ( node !== itemNode ) {
            node.focusable = false; // Make other stack items non-focusable
          }
        } );
      }
      else {
        // When this item loses focus, restore focusability to all stack items
        this.stackItemNodes.forEach( node => {
          node.focusable = true;
        } );
      }
    };

    this.focusListeners.set( itemNode, focusListener );
    itemNode.focusedProperty.lazyLink( focusListener );

    // Set the keyboard strategy for stack items
    itemNode.setKeyboardStrategy( new StackKeyboardStrategy( this, model ) );
  }

  /**
   * Remove an item node from the stack group (when it returns to toolbox)
   */
  public removeItemNode( itemNode: ItemNode ): void {
    const index = this.stackItemNodes.indexOf( itemNode );
    if ( index !== -1 ) {
      this.stackItemNodes.splice( index, 1 );
      this.removeChild( itemNode );

      // Clean up the focus listener for this item
      const focusListener = this.focusListeners.get( itemNode );
      if ( focusListener ) {
        itemNode.focusedProperty.unlink( focusListener );
        this.focusListeners.delete( itemNode );
        ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Cleaned up focus listener for item:', itemNode.item.name );
      }

      ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Removed item from stack group:', itemNode.item.name );
    }
  }

  /**
   * Sort items by their stack position (bottom to top based on model's stacked items order)
   */
  private sortItems( model: MotionModel ): void {
    this.stackItemNodes.sort( ( a, b ) => {
      const aIndex = model.stackedItems.indexOf( a.item );
      const bIndex = model.stackedItems.indexOf( b.item );

      // Items in the stacked items array should be ordered bottom to top
      return aIndex - bIndex;
    } );
  }


  /**
   * Reset the focus state of all items in this stack group to ensure proper tab navigation after reset
   */
  public reset(): void {
    // Restore focusability to all stack items
    this.stackItemNodes.forEach( itemNode => {
      itemNode.focusable = true;
    } );

    // If there are items on the stack, make the first one focusable but don't focus it
    if ( this.stackItemNodes.length > 0 ) {
      // Reset focus state - make first item focusable, others non-focusable initially
      this.stackItemNodes.forEach( ( itemNode, index ) => {
        itemNode.focusable = index === 0;
      } );
    }
  }
}

/**
 * Keyboard strategy for items on the stack.
 * Handles navigation between stack items with up/down navigation.
 */
export class StackKeyboardStrategy implements ItemKeyboardStrategy {
  public constructor( private readonly groupNode: ItemStackGroupNode, private readonly model: MotionModel ) {}

  public navigateToItem( currentItem: ItemNode, direction: 'left' | 'right' | 'up' | 'down' ): ItemNode | null {
    const stackItems = this.groupNode.stackItemNodes;
    const currentIndex = stackItems.indexOf( currentItem );
    if ( currentIndex === -1 ) { return null; }

    ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Stack navigation - from item at index:', currentIndex );

    // Up/Left moves to higher index (towards top of stack), Down/Right moves to lower index (towards bottom)
    const delta = ( direction === 'up' || direction === 'left' ) ? 1 :
                  ( direction === 'down' || direction === 'right' ) ? -1 : 0;
    const newIndex = currentIndex + delta;

    // Keep selection within bounds
    if ( newIndex >= 0 && newIndex < stackItems.length ) {
      ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Navigated from stack index', currentIndex, 'to stack index', newIndex );
      return stackItems[ newIndex ];
    }
    return null;
  }

  public onDropComplete( item: ItemNode, droppedOnStack: boolean, wasAlreadyOnStack?: boolean ): void {
    // Stack items don't need special focus behavior after drops
    // The automatic transfer system in MotionScreenView will handle group transfers
    // based on inStackProperty changes, so we don't manually remove items here
    if ( !droppedOnStack ) {
      ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Returned stack item to toolbox - transfer system will handle group changes' );
    }
    else if ( droppedOnStack && wasAlreadyOnStack ) {
      // Item was dropped back onto stack - ensure other stack items are non-focusable
      ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Item dropped back on stack, managing focus within stack group' );
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

forcesAndMotionBasics.register( 'ItemStackGroupNode', ItemStackGroupNode );