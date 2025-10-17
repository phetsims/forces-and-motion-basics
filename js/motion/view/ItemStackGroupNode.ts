// Copyright 2025, University of Colorado Boulder

/**
 * ItemStackGroupNode manages keyboard navigation for items that are stacked on the skateboard,
 * making them feel like a cohesive group while maintaining individual focus.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import Shape from '../../../../kite/js/Shape.js';
import GroupHighlightPath from '../../../../scenery/js/accessibility/GroupHighlightPath.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import ForcesAndMotionBasicsLayoutBounds from '../../common/view/ForcesAndMotionBasicsLayoutBounds.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import Item from '../model/Item.js';
import ItemNode from './ItemNode.js';

export default class ItemStackGroupNode extends Node {
  public readonly stackItemNodes: ItemNode[] = [];

  public constructor( public readonly screen: 'motion' | 'friction' | 'acceleration' ) {

    const highlightWidth = 200;
    const highlightX = ForcesAndMotionBasicsLayoutBounds.centerX - highlightWidth / 2;

    // margin from the dev bounds.
    const highlightY = 10;

    // around 10px underground
    const highlightHeight = 360;

    const defaultHighlight = new GroupHighlightPath( Shape.rectangle( highlightX, highlightY, highlightWidth, highlightHeight ), {
      innerLineWidth: 5
    } );

    super( {
      tagName: 'div',

      // ARIA attributes for the group
      ariaRole: 'application',
      accessibleRoleDescription: ForcesAndMotionBasicsFluent.a11y.motionScreen.objectStackGroup.accessibleRoleDescriptionStringProperty,

      accessibleName: screen === 'motion' ?
                      ForcesAndMotionBasicsFluent.a11y.motionScreen.objectStackGroup.onSkateboard.accessibleNameStringProperty :
                      ForcesAndMotionBasicsFluent.a11y.motionScreen.objectStackGroup.onGround.accessibleNameStringProperty,
      descriptionContent: ForcesAndMotionBasicsFluent.a11y.motionScreen.objectStackGroup.descriptionContentStringProperty,
      groupFocusHighlight: defaultHighlight
    } );
  }

  /**
   * Add an item node to the stack group (transferring from another parent if needed)
   */
  public addItemNode( itemNode: ItemNode, stackedItems: ObservableArray<Item>, focusItem: boolean ): void {

    // Remove from current parent if it has one
    if ( itemNode.parent ) {
      itemNode.parent.removeChild( itemNode );
    }

    this.stackItemNodes.push( itemNode );
    this.addChild( itemNode );

    // Sort items by their stack position (bottom to top)
    this.sortItems( stackedItems );

    if ( focusItem ) {
      itemNode.focusable = true;
      itemNode.focus();
    }
  }

  /**
   * Remove an item node from the stack group (when it returns to toolbox)
   */
  public removeItemNode( itemNode: ItemNode ): void {
    const index = this.stackItemNodes.indexOf( itemNode );
    if ( index !== -1 ) {
      this.stackItemNodes.splice( index, 1 );
      this.removeChild( itemNode );
    }
  }

  /**
   * Sort items by their stack position (bottom to top based on model's stacked items order)
   */
  private sortItems( stackedItems: { indexOf: ( item: Item ) => number } ): void {
    this.stackItemNodes.sort( ( a, b ) => {
      const aIndex = stackedItems.indexOf( a.item );
      const bIndex = stackedItems.indexOf( b.item );

      // Items in the stacked items array should be ordered bottom to top
      return aIndex - bIndex;
    } );
  }

  public reset(): void {
    this.stackItemNodes.forEach( ( itemNode, index ) => {
      itemNode.focusable = index === 0 && itemNode.visibleProperty.value && itemNode.inputEnabled;
    } );
  }
}

forcesAndMotionBasics.register( 'ItemStackGroupNode', ItemStackGroupNode );
