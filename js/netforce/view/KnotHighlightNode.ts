// Copyright 2024-2025, University of Colorado Boulder

/**
 * Shows the highlight graphic for a knot.  The knots are always visible as part of the image, but when the visible flag is set,
 * the highlight is shown.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Shape from '../../../../kite/js/Shape.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import Knot from '../model/Knot.js';

const knotWidth = 20;

export default class KnotHighlightNode extends Path {

  public constructor( knot: Knot ) {

    super( Shape.circle( 0, 0, knotWidth ), {
      stroke: '#000000',
      lineWidth: 4,
      visibleProperty: knot.isHighlightedProperty,
      x: knot.positionProperty.get(),
      y: knot.y
    } );

    knot.positionProperty.link( x => {
      this.x = x;
    } );
  }
}

forcesAndMotionBasics.register( 'KnotHighlightNode', KnotHighlightNode );
