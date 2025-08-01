// Copyright 2025, University of Colorado Boulder

/**
 * ItemToolboxGroupNode manages keyboard navigation for items in the toolboxes, treating both
 * left and right toolboxes as one unified group for keyboard navigation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Shape from '../../../../kite/js/Shape.js';
import optionize from '../../../../phet-core/js/optionize.js';
import GroupHighlightPath from '../../../../scenery/js/accessibility/GroupHighlightPath.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import MotionModel from '../model/MotionModel.js';
import ItemNode, { type ItemKeyboardStrategy } from './ItemNode.js';

type SelfOptions = {
  // No specific options for now
};

type ItemToolboxGroupNodeOptions = SelfOptions & NodeOptions;

export default class ItemToolboxGroupNode extends Node {
  public readonly itemNodes: ItemNode[] = [];

  // Track focus listeners so we can remove them when items leave the group
  private readonly focusListeners = new Map();

  public constructor( model: MotionModel, leftToolboxBounds: Bounds2, rightToolboxBounds: Bounds2, providedOptions?: ItemToolboxGroupNodeOptions ) {

    const options = optionize<ItemToolboxGroupNodeOptions, SelfOptions, NodeOptions>()( {
      tagName: 'div',

      // ARIA attributes for the group
      ariaRole: 'group',
      accessibleName: ForcesAndMotionBasicsFluent.a11y.motionScreen.itemToolbox.accessibleNameStringProperty,
      descriptionContent: ForcesAndMotionBasicsFluent.a11y.motionScreen.itemToolbox.descriptionContentStringProperty
    }, providedOptions );

    super( options );

    // Create a constant highlight region from the union of both toolbox bounds
    const unionBounds = leftToolboxBounds.union( rightToolboxBounds );
    const dilatedBounds = unionBounds.dilated( 10 );
    this.groupFocusHighlight = new GroupHighlightPath( Shape.bounds( dilatedBounds ), {
      innerLineWidth: 5
    } );
  }

  /**
   * Add an item node to this group (transferring from another parent if needed)
   */
  public addItemNode( itemNode: ItemNode, model: MotionModel ): void {
    // Remove from current parent if it has one
    if ( itemNode.parent ) {
      itemNode.parent.removeChild( itemNode );
    }

    this.itemNodes.push( itemNode );
    this.addChild( itemNode );

    // Sort items by side and then by position for consistent navigation order
    this.sortItems();

    // Create and store the focus listener for this item
    const focusListener = ( focused: boolean ) => {
      if ( focused ) {
        this.itemNodes.forEach( node => {
          if ( node !== itemNode ) {
            node.focusable = false; // Make other items non-focusable
          }
        } );
      }
      else {
        // When this item loses focus, restore focusability to all items in the toolboxes
        // (only those not on the stack)
        this.itemNodes.forEach( node => {
          if ( !node.item.inStackProperty.get() ) {
            node.focusable = true;
          }
        } );
      }
    };

    this.focusListeners.set( itemNode, focusListener );
    itemNode.focusedProperty.lazyLink( focusListener );

    // Set the keyboard strategy for toolbox items and pass reference to this group
    itemNode.setKeyboardStrategy( new ToolboxKeyboardStrategy( this, model ), this );

    // Ensure items added to toolbox are properly focusable for arrow navigation
    // Only make focusable if it's not on the stack
    if ( !itemNode.item.inStackProperty.get() ) {
      itemNode.focusable = true;
    }
  }

  /**
   * Remove an item node from this group (when it moves to stack)
   */
  public removeItemNode( itemNode: ItemNode ): void {
    const index = this.itemNodes.indexOf( itemNode );
    if ( index !== -1 ) {
      this.itemNodes.splice( index, 1 );
      this.removeChild( itemNode );

      // Clean up the focus listener for this item
      const focusListener = this.focusListeners.get( itemNode );
      if ( focusListener ) {
        itemNode.focusedProperty.unlink( focusListener );
        this.focusListeners.delete( itemNode );
      }
    }
  }

  /**
   * Sort items by their side (left items first) and then by position for consistent navigation
   */
  private sortItems(): void {
    this.itemNodes.sort( ( a, b ) => {
      // Get item side (left vs right toolbox)
      const getSide = ( item: ItemNode ) => {
        // fridge and crates go in left toolbox, others go in right
        return ( item.item.name === 'fridge' || item.item.name === 'crate1' || item.item.name === 'crate2' ) ? 'left' : 'right';
      };

      const aSide = getSide( a );
      const bSide = getSide( b );

      // Left items come first
      if ( aSide !== bSide ) {
        return aSide === 'left' ? -1 : 1;
      }

      // Within same side, sort by x position
      return a.item.positionProperty.value.x - b.item.positionProperty.value.x;
    } );
  }


  /**
   * After an item is successfully dropped from toolbox to stack,
   * focus the next available item in the same toolbox
   */
  public focusNextItemInToolbox( droppedItemNode: ItemNode ): void {

    // Find items still in the toolboxes (not on stack)
    const itemsInToolbox = this.itemNodes.filter( itemNode =>
      !itemNode.item.inStackProperty.get() && itemNode !== droppedItemNode
    );

    if ( itemsInToolbox.length > 0 ) {
      // Focus the first available item in the toolboxes
      const nextItem = itemsInToolbox[ 0 ];

      // Make sure the next item is focusable and focus it
      nextItem.focusable = true;
      nextItem.focus();
    }
  }

  /**
   * Reset the focus state of all items in this group to ensure proper tab navigation after reset
   */
  public reset(): void {
    // Sort items by position to ensure consistent order after reset
    this.sortItems();

    // Restore focusability to all items in the toolboxes (not on stack)
    this.itemNodes.forEach( itemNode => {
      if ( !itemNode.item.inStackProperty.get() ) {
        itemNode.focusable = true;
      }
    } );

    // If there are items in the toolboxes, make the first one focusable but don't focus it
    const itemsInToolbox = this.itemNodes.filter( itemNode =>
      !itemNode.item.inStackProperty.get()
    );

    if ( itemsInToolbox.length > 0 ) {
      // Reset focus state - make first item focusable, others non-focusable initially
      itemsInToolbox.forEach( ( itemNode, index ) => {
        itemNode.focusable = index === 0;
      } );
    }
  }
}

/**
 * Keyboard strategy for items in the toolboxes.
 * Handles navigation between toolbox items and focus management after drops.
 */
export class ToolboxKeyboardStrategy implements ItemKeyboardStrategy {
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
      return 'Grabbed';
    }
    else {
      return location === 'stack' ? 'Item moved to skateboard' : 'Item returned to toolbox';
    }
  }
}

forcesAndMotionBasics.register( 'ItemToolboxGroupNode', ItemToolboxGroupNode );