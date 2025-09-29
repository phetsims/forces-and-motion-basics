// Copyright 2025, University of Colorado Boulder

/**
 * PullerGroupNode manages keyboard navigation for a group of pullers, allowing them to be a single tab stop
 * with arrow key navigation between individual pullers.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Shape from '../../../../kite/js/Shape.js';
import GroupHighlightPath from '../../../../scenery/js/accessibility/GroupHighlightPath.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';

export default class PullerGroupNode extends Node {

  public constructor( toolboxBounds: Bounds2 ) {

    const highlightShape = Shape.bounds( new Bounds2( toolboxBounds.minX, toolboxBounds.minY, toolboxBounds.maxX, toolboxBounds.maxY ).dilated( 10 ) );
    const defaultGroupHighlight = new GroupHighlightPath( highlightShape, {
      innerLineWidth: 5
    } );

    super( {
      tagName: 'div',

      // ARIA attributes for the group
      ariaRole: 'application',
      accessibleRoleDescription: ForcesAndMotionBasicsFluent.a11y.netForceScreen.pullerGroup.accessibleRoleDescriptionStringProperty,
      groupFocusHighlight: defaultGroupHighlight
    } );
  }
}

forcesAndMotionBasics.register( 'PullerGroupNode', PullerGroupNode );
