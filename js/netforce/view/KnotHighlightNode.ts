// Copyright 2013-2017, University of Colorado Boulder

/**
 * Shows the highlight graphic for a knot.  The knots are always visible as part of the image, but when the visible flag is set,
 * the highlight is shown.
 *
 * @author Sam Reid
 */

import { Path } from '../../../../scenery/js/imports.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import { Shape } from '../../../../kite/js/imports.js';
import Knot from '../model/Knot.js';
import Tandem from '../../../../tandem/js/Tandem.js';

const knotWidth = 20;

export default class KnotHighlightNode extends Path {

  public constructor( knot: Knot, tandem: Tandem ) {

    super( Shape.circle( 0, 0, knotWidth ), {
      stroke: '#FFFF00',
      lineWidth: 4,
      visibleProperty: knot.visibleProperty,
      x: knot.xProperty.get(),
      y: knot.y,
      tandem: tandem
    } );

    knot.xProperty.link( x => {
      this.x = x;
    } );
  }
}

forcesAndMotionBasics.register( 'KnotHighlightNode', KnotHighlightNode );