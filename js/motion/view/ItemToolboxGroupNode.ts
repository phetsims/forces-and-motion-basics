// Copyright 2025, University of Colorado Boulder

/**
 * ItemToolboxGroupNode manages keyboard navigation for items in the toolboxes, treating both
 * left and right toolboxes as one unified group for keyboard navigation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Shape from '../../../../kite/js/Shape.js';
import isResettingAllProperty from '../../../../scenery-phet/js/isResettingAllProperty.js';
import GroupHighlightPath from '../../../../scenery/js/accessibility/GroupHighlightPath.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import ItemNode from './ItemNode.js';

export default class ItemToolboxGroupNode extends Node {
  public readonly itemNodes: ItemNode[] = [];

  public constructor( leftToolboxBounds: Bounds2, rightToolboxBounds: Bounds2 ) {

    const unionBounds = leftToolboxBounds.union( rightToolboxBounds ).dilated( 10 );
    const defaultHighlight = new GroupHighlightPath( Shape.bounds( unionBounds ), {
      innerLineWidth: 5
    } );

    super( {
      tagName: 'div',

      // ARIA attributes for the group
      ariaRole: 'application',
      accessibleRoleDescription: ForcesAndMotionBasicsFluent.a11y.motionScreen.objectToolbox.accessibleRoleDescriptionStringProperty,

      accessibleName: ForcesAndMotionBasicsFluent.a11y.motionScreen.objectToolbox.accessibleNameStringProperty,
      descriptionContent: ForcesAndMotionBasicsFluent.a11y.motionScreen.objectToolbox.descriptionContentStringProperty,
      accessibleHeading: ForcesAndMotionBasicsFluent.a11y.objectToolboxes.objectToolboxStringProperty,
      groupFocusHighlight: defaultHighlight
    } );
  }

  /**
   * Add an item node to this group (transferring from another parent if needed)
   */
  public addItemNode( itemNode: ItemNode, focusItem: boolean ): void {

    // Remove from current parent if it has one
    if ( itemNode.parent ) {
      itemNode.parent.removeChild( itemNode );
    }

    this.itemNodes.push( itemNode );
    this.addChild( itemNode );

    // Sort items by side and then by position for consistent navigation order
    this.sortItems();

    // Ensure items added to toolbox are properly focusable for arrow navigation
    // Only make focusable if it's not on the stack
    if ( focusItem ) {
      itemNode.focusable = true;

      // Don't steal focus from the reset all button
      if ( !isResettingAllProperty.value ) {
        itemNode.focus();
      }
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
    }
  }

  /**
   * Sort items by their side (left items first) and then by position for consistent navigation
   */
  private sortItems(): void {
    this.itemNodes.sort( ( aItemNode, bItemNode ) => {
      const aSide = this.getToolboxSide( aItemNode );
      const bSide = this.getToolboxSide( bItemNode );

      // Left items come first
      if ( aSide !== bSide ) {
        return aSide === 'left' ? -1 : 1;
      }

      // Within same side, sort by x position
      return aItemNode.item.positionProperty.value.x - bItemNode.item.positionProperty.value.x;
    } );
  }

  /**
   * Reset the focus state of all items in this group to ensure proper tab navigation after reset
   */
  public reset(): void {

    // Sort items by position to ensure consistent order after reset
    this.sortItems();

    // Reset focus state - make the first visible item focusable, and disable focus for hidden elements
    this.itemNodes.forEach( ( itemNode, index ) => {
      itemNode.focusable = index === 0 && itemNode.visibleProperty.value;
    } );
  }

  private getToolboxSide( itemNode: ItemNode ): 'left' | 'right' {
    return itemNode.item.name === 'fridge' || itemNode.item.name === 'crate1' || itemNode.item.name === 'crate2' ? 'left' : 'right';
  }
}

forcesAndMotionBasics.register( 'ItemToolboxGroupNode', ItemToolboxGroupNode );
