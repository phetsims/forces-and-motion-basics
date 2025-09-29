// Copyright 2025, University of Colorado Boulder

/**
 * ItemStackGroupNode manages keyboard navigation for items that are stacked on the skateboard,
 * making them feel like a cohesive group while maintaining individual focus.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Shape from '../../../../kite/js/Shape.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import GroupHighlightPath from '../../../../scenery/js/accessibility/GroupHighlightPath.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import ForcesAndMotionBasicsLayoutBounds from '../../common/view/ForcesAndMotionBasicsLayoutBounds.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import ItemNode from './ItemNode.js';
import Item from '../model/Item.js';
import MotionModel from '../model/MotionModel.js';

type SelfOptions = EmptySelfOptions;

//REVIEW Why include NodeOptions, or even bother with ItemStackGroupNode, when instantiation sites only need to provide tandem?
type ItemStackGroupNodeOptions = SelfOptions & NodeOptions;

export default class ItemStackGroupNode extends Node {
  public readonly stackItemNodes: ItemNode[] = [];

  public constructor( public readonly screen: 'motion' | 'friction' | 'acceleration', providedOptions?: ItemStackGroupNodeOptions ) {

    const highlightWidth = 200;
    const highlightHeight = 340;
    const highlightX = ForcesAndMotionBasicsLayoutBounds.centerX - highlightWidth / 2;
    const highlightY = 10;
    const defaultHighlight = new GroupHighlightPath( Shape.rectangle( highlightX, highlightY, highlightWidth, highlightHeight ), {
      innerLineWidth: 5
    } );

    const options = optionize<ItemStackGroupNodeOptions, SelfOptions, NodeOptions>()( {
      tagName: 'div',

      // ARIA attributes for the group
      ariaRole: 'application',
      accessibleRoleDescription: ForcesAndMotionBasicsFluent.a11y.motionScreen.objectStackGroup.accessibleRoleDescriptionStringProperty,

      accessibleName: screen === 'motion' ?
                      ForcesAndMotionBasicsFluent.a11y.motionScreen.objectStackGroup.onSkateboard.accessibleNameStringProperty :
                      ForcesAndMotionBasicsFluent.a11y.motionScreen.objectStackGroup.onGround.accessibleNameStringProperty,
      descriptionContent: ForcesAndMotionBasicsFluent.a11y.motionScreen.objectStackGroup.descriptionContentStringProperty,
      groupFocusHighlight: defaultHighlight
    }, providedOptions );

    super( options );
  }

  /**
   * Add an item node to the stack group (transferring from another parent if needed)
   */
  //REVIEW Excessive coupling to MotionModel, this.sortItems only needs stackedItems.
  public addItemNode( itemNode: ItemNode, model: MotionModel ): void {

    // Remove from current parent if it has one
    if ( itemNode.parent ) {
      itemNode.parent.removeChild( itemNode );
    }

    this.stackItemNodes.push( itemNode );
    this.addChild( itemNode );

    // Sort items by their stack position (bottom to top)
    this.sortItems( model.stackedItems );

    itemNode.focusable = true;
    itemNode.focus();
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
}

forcesAndMotionBasics.register( 'ItemStackGroupNode', ItemStackGroupNode );
