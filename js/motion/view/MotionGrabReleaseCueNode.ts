// Copyright 2025, University of Colorado Boulder

/**
 * Show the "grab and release" cue when an item is focused but the user hasn't interacted yet.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import FocusDrivenGrabReleaseCueNode from '../../common/view/FocusDrivenGrabReleaseCueNode.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ItemNode from './ItemNode.js';

export default class MotionGrabReleaseCueNode extends FocusDrivenGrabReleaseCueNode<ItemNode> {
  public constructor( itemNodes: ItemNode[], layoutBounds: Bounds2, tandem?: Tandem ) {
    super(
      itemNodes,
      layoutBounds,
      ( self, focusedItemNode, bounds ) => {
        const item = focusedItemNode.item;
        const side = item.modeProperty.value === 'onStack' ? 'stack' : item.getToolboxSide();

        const sideFraction = 0.165;
        self.centerX = side === 'stack' ? bounds.centerX : ( side === 'left' ? bounds.width * sideFraction : bounds.width * ( 1 - sideFraction ) );

        self.top = side === 'stack' ? 185 : 314;
      },
      tandem
    );
  }
}

forcesAndMotionBasics.register( 'MotionGrabReleaseCueNode', MotionGrabReleaseCueNode );