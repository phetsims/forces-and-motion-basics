// Copyright 2025, University of Colorado Boulder

/**
 * PullerGroupNode manages keyboard navigation for a group of pullers, allowing them to be a single tab stop
 * with arrow key navigation between individual pullers.
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

type SelfOptions = {
  // Which side this group represents
  side: 'left' | 'right';
};

type PullerGroupNodeOptions = SelfOptions & NodeOptions;

export default class PullerGroupNode extends Node {

  public constructor( toolboxBounds: Bounds2, providedOptions: PullerGroupNodeOptions ) {

    const options = optionize<PullerGroupNodeOptions, SelfOptions, NodeOptions>()( {
      tagName: 'div',

      // ARIA attributes for the group
      ariaRole: 'application',
      accessibleRoleDescription: ForcesAndMotionBasicsFluent.a11y.netForceScreen.pullerGroup.accessibleRoleDescriptionStringProperty
    }, providedOptions );

    super( options );

    this.groupFocusHighlight = new GroupHighlightPath(
      Shape.bounds( new Bounds2( toolboxBounds.minX, toolboxBounds.minY, toolboxBounds.maxX, toolboxBounds.maxY ).dilated( 10 ) ), {
        innerLineWidth: 5
      } );
  }
}

forcesAndMotionBasics.register( 'PullerGroupNode', PullerGroupNode );