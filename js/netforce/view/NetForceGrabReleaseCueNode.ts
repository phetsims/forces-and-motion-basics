// Copyright 2025, University of Colorado Boulder

//REVIEW This may at one time have been "a specialized GrabReleaseCueNode" but it now extends FocusDrivenGrabReleaseCueNode.
//REVIEW I don't understand what "It shows over the appropriate side" means.
/**
 * NetForceGrabReleaseCueNode is a specialized GrabReleaseCueNode for the NetForce screen.
 * It shows over the appropriate side that has focus and hides after interaction.
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