// Copyright 2013-2017, University of Colorado Boulder

/**
 * Shows the highlight graphic for a knot.  The knots are always visible as part of the image, but when the visible flag is set,
 * the highlight is shown.
 *
 * @author Sam Reid
 */

import { Path } from '../../../../scenery/js/imports.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { Shape } from '../../../../kite/js/imports.js';

const knotWidth = 20;

export default class KnotHighlightNode extends Path {

  constructor( knot, pullerNodes, focusRegionNode, pullerToolboxNode, model, tandem ) {

   super( Shape.circle( 0, 0, knotWidth ), {
     stroke: '#FFFF00',
     lineWidth: 4,
     visible: false,
     x: knot.xProperty.get(),
     y: knot.y,
     tandem: tandem
   } );

    knot.visibleProperty.linkAttribute( this, 'visible' );
    knot.xProperty.linkAttribute( this, 'x' );
  }

  /**
   * Move the puller that is being dragged to the knot that is currently being focused.
   *
   * @param {Puller} pullerNode
   * @param {Knot} knot
   * @param {NetForceModel} model
   * @public
   */
  movePullerToSelectedKnot( pullerNode, knot, model ) {
    const grabbedPuller = pullerNode.puller;
    grabbedPuller.setValues( { position: new Vector2( knot.xProperty.get(), knot.y ) } );
    model.numberPullersAttachedProperty.set( model.countAttachedPullers() );
    grabbedPuller.draggingProperty.set( false );
    grabbedPuller.droppedEmitter.emit();
    pullerNode.updateImage( grabbedPuller, model );
    pullerNode.updateLocation( grabbedPuller, model );
  }
}

forcesAndMotionBasics.register( 'KnotHighlightNode', KnotHighlightNode );