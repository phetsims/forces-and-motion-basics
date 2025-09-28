// Copyright 2025, University of Colorado Boulder

/**
 * NetForceGrabReleaseCueNode extends FocusDrivenGrabReleaseCueNode to position the cue used during grab/release
 * interactions. It tracks the focused puller and places the cue above the corresponding side of the rope, hiding it
 * once interaction completes.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import PullerNode from './PullerNode.js';
import FocusDrivenGrabReleaseCueNode from '../../common/view/FocusDrivenGrabReleaseCueNode.js';

export default class NetForceGrabReleaseCueNode extends FocusDrivenGrabReleaseCueNode<PullerNode> {
  public constructor( pullerNodes: PullerNode[], layoutBounds: Bounds2, tandem?: Tandem ) {
    super(
      pullerNodes,
      layoutBounds,
      ( self, focusedPullerNode, bounds ) => {
        const isLeftSide = focusedPullerNode.puller.type === 'blue';
        self.centerX = isLeftSide ? bounds.width * 0.25 : bounds.width * 0.75;
        self.top = 200;
      },
      tandem
    );
  }
}

forcesAndMotionBasics.register( 'NetForceGrabReleaseCueNode', NetForceGrabReleaseCueNode );
