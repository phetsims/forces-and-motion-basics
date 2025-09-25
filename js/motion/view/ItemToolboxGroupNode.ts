// Copyright 2025, University of Colorado Boulder

/**
 * ItemToolboxGroupNode manages keyboard navigation for items in the toolboxes, treating both
 * left and right toolboxes as one unified group for keyboard navigation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Shape from '../../../../kite/js/Shape.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import GroupHighlightPath from '../../../../scenery/js/accessibility/GroupHighlightPath.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import MotionModel from '../model/MotionModel.js';
import ItemNode from './ItemNode.js';

type SelfOptions = EmptySelfOptions;

//REVIEW Why include NodeOptions, or even bother with ItemToolboxGroupNodeOptions, when instantiation sites only need to provide tandem?
type ItemToolboxGroupNodeOptions = SelfOptions & NodeOptions;

export default class ItemToolboxGroupNode extends Node {
  public readonly itemNodes: ItemNode[] = [];

  public constructor( leftToolboxBounds: Bounds2, rightToolboxBounds: Bounds2, providedOptions?: ItemToolboxGroupNodeOptions ) {

    const options = optionize<ItemToolboxGroupNodeOptions, SelfOptions, NodeOptions>()( {
      tagName: 'div',

      // ARIA attributes for the group
      ariaRole: 'application',
      accessibleRoleDescription: ForcesAndMotionBasicsFluent.a11y.motionScreen.objectToolbox.accessibleRoleDescriptionStringProperty,

      accessibleName: ForcesAndMotionBasicsFluent.a11y.motionScreen.objectToolbox.accessibleNameStringProperty,
      descriptionContent: ForcesAndMotionBasicsFluent.a11y.motionScreen.objectToolbox.descriptionContentStringProperty
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
  public addItemNode( itemNode: ItemNode, _model: MotionModel ): void {

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
    itemNode.focusable = true;
    itemNode.focus();
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
   * Reset the focus state of all items in this group to ensure proper tab navigation after reset
   */
  public reset(): void {
    // Sort items by position to ensure consistent order after reset
    this.sortItems();

    // Restore focusability to all items in the toolboxes (not on stack)
    this.itemNodes.forEach( itemNode => {
      if ( !itemNode.item.inStackProperty.value ) {
        itemNode.focusable = true;
      }
    } );

    // If there are items in the toolboxes, make the first one focusable but don't focus it
    const itemsInToolbox = this.itemNodes.filter( itemNode =>
      !itemNode.item.inStackProperty.value
    );

    if ( itemsInToolbox.length > 0 ) {
      // Reset focus state - make first item focusable, others non-focusable initially
      itemsInToolbox.forEach( ( itemNode, index ) => {
        const focusable = index === 0;
        itemNode.focusable = focusable;
      } );
    }
  }
}

forcesAndMotionBasics.register( 'ItemToolboxGroupNode', ItemToolboxGroupNode );