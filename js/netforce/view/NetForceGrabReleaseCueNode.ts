// Copyright 2025, University of Colorado Boulder

/**
 * NetForceGrabReleaseCueNode extends FocusDrivenGrabReleaseCueNode to position the cue used during grab/release
 * interactions. It tracks the focused puller and places the cue above the corresponding side of the rope, hiding it
 * once interaction completes.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import FocusDrivenGrabReleaseCueNode from '../../common/view/FocusDrivenGrabReleaseCueNode.js';
import ForcesAndMotionBasicsLayoutBounds from '../../common/view/ForcesAndMotionBasicsLayoutBounds.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import PullerNode from './PullerNode.js';

export default class NetForceGrabReleaseCueNode extends FocusDrivenGrabReleaseCueNode<PullerNode> {
  public constructor( pullerNodes: PullerNode[], layoutBounds: Bounds2 ) {
    super(
      pullerNodes,
      layoutBounds,
      ( self, focusedPullerNode, bounds ) => {

        // Center over a puller on the rope
        if ( focusedPullerNode.puller.modeProperty.value.isAttached() ) {
          self.centerX = focusedPullerNode.centerX;
          self.bottom = focusedPullerNode.top - 10;

          // But don't go out of bounds
          if ( self.left < 10 ) {
            self.left = 10;
          }
          if ( self.right > ForcesAndMotionBasicsLayoutBounds.right - 10 ) {
            self.right = ForcesAndMotionBasicsLayoutBounds.right - 10;
          }
        }
        else {

          // in the toolbox, just show a non-moving one that is in a good spot
          const isLeftSide = focusedPullerNode.puller.type === 'blue';
          self.centerX = isLeftSide ? bounds.width * 0.2 : bounds.width * 0.8;
          self.top = 325;
        }
      }
    );
  }
}

forcesAndMotionBasics.register( 'NetForceGrabReleaseCueNode', NetForceGrabReleaseCueNode );
