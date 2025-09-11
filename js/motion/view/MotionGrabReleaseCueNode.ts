// Copyright 2025, University of Colorado Boulder

/**
 * Show the "grab and release" cue when an item is focused but the user hasn't interacted yet.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ItemNode from './ItemNode.js';
import FocusDrivenGrabReleaseCueNode from '../../common/view/FocusDrivenGrabReleaseCueNode.js';

export default class MotionGrabReleaseCueNode extends FocusDrivenGrabReleaseCueNode<ItemNode> {
  public constructor( itemNodes: ItemNode[], layoutBounds: Bounds2, tandem?: Tandem ) {
    super(
      itemNodes,
      layoutBounds,
      ( self, focusedItemNode, bounds ) => {
        const item = focusedItemNode.item;
        const side = item.modeProperty.value === 'onStack' ? 'stack' : item.getToolboxSide();
        self.centerX = side === 'stack' ? bounds.centerX : ( side === 'left' ? bounds.width * 0.25 : bounds.width * 0.75 );
        self.top = 200;
      },
      tandem
    );
  }
}

forcesAndMotionBasics.register( 'MotionGrabReleaseCueNode', MotionGrabReleaseCueNode );