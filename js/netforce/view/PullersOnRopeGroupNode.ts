// Copyright 2025, University of Colorado Boulder

/**
 * PullersOnRopeGroupNode manages keyboard navigation for pullers that are attached to knots on the rope,
 * making them feel like a cohesive group while maintaining individual focus.
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
import NetForceModel from '../model/NetForceModel.js';

type SelfOptions = {
  // Which side this group represents
  side: 'left' | 'right';
};

type PullersOnRopeGroupNodeOptions = SelfOptions & NodeOptions;

export default class PullersOnRopeGroupNode extends Node {

  public constructor( model: NetForceModel, toolboxBounds: Bounds2, providedOptions: PullersOnRopeGroupNodeOptions ) {

    const options = optionize<PullersOnRopeGroupNodeOptions, SelfOptions, NodeOptions>()( {
      tagName: 'div',

      // ARIA attributes for the group - fallback names if not provided in options
      ariaRole: 'group',
      accessibleHeading: providedOptions.side === 'left' ? ForcesAndMotionBasicsFluent.a11y.pullersOnRope.blueTeamHeadingStringProperty : ForcesAndMotionBasicsFluent.a11y.pullersOnRope.redTeamHeadingStringProperty,
      descriptionContent: ForcesAndMotionBasicsFluent.a11y.pullersOnRope.descriptionContentStringProperty
    }, providedOptions );

    super( options );

    this.groupFocusHighlight = new GroupHighlightPath(
      Shape.bounds( new Bounds2( toolboxBounds.minX, toolboxBounds.minY - 230, toolboxBounds.maxX, toolboxBounds.maxY - 230 ).dilated( 10 ) ), {
        innerLineWidth: 5
      } );
  }
}


forcesAndMotionBasics.register( 'PullersOnRopeGroupNode', PullersOnRopeGroupNode );