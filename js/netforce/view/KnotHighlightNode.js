// Copyright 2013-2015, University of Colorado Boulder

/**
 * Shows the highlight graphic for a knot.  The knots are always visible as part of the image, but when the visible flag is set,
 * the highlight is shown.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  // constants
  var knotWidth = 20;

  /**
   * Constructor
   * @param {Knot} knot
   * @param {Array<PullerNode>} pullerNodes
   * @param {KnotFocusRegion} focusRegionNode
   * @param {pullerToolboxNode} pullerToolboxNode
   * @param {NetForceModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function KnotHighlightNode( knot, pullerNodes, focusRegionNode, pullerToolboxNode, model, tandem ) {

    Path.call( this, Shape.circle( 0, 0, knotWidth ), {
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

  forcesAndMotionBasics.register( 'KnotHighlightNode', KnotHighlightNode );

  return inherit( Path, KnotHighlightNode, {

    /**
     * Move the puller that is being dragged to the knot that is currently being focused.
     *
     * @param {Puller} pullerNode
     * @param {Knot} knot
     * @param {NetForceModel} model
     */
    movePullerToSelectedKnot: function( pullerNode, knot, model ) {
      var grabbedPuller = pullerNode.puller;
      grabbedPuller.setValues( { position: new Vector2( knot.xProperty.get(), knot.y ) } );
      model.numberPullersAttachedProperty.set( model.countAttachedPullers() );
      grabbedPuller.dragging = false;
      grabbedPuller.trigger0( 'dropped' );
      pullerNode.updateImage( grabbedPuller, model );
      pullerNode.updateLocation( grabbedPuller, model );
    }
  } );
} );