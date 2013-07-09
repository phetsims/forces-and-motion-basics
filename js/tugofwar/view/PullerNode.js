// Copyright 2002-2013, University of Colorado Boulder

/**
 * Shows the graphic for the puller, which can be dragged from the toolbox to the rope to apply force.
 */
define( function( require ) {
  'use strict';

  var Image = require( 'SCENERY/nodes/Image' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * Create a PullerNode for the specified puller
   * @param {Puller} puller
   * @param {TugOfWarModel} model
   * @param {Image} image image of the puller standing upright
   * @param {Image} pullImage image of the puller exerting a force
   * @constructor
   */
  function PullerNode( puller, model, image, pullImage ) {
    this.puller = puller;
    var pullerNode = this;
    this.puller.node = this;//Wire up so node can be looked up by model element.
    var x = puller.x;
    var y = puller.y;

    Image.call( this, image, {x: x, y: y, fontSize: 42, cursor: 'pointer', scale: 0.86} );

    var updateLocation = function() {
      var knotted = puller.knot;
      var pulling = model.running && knotted;
      if ( knotted ) {
        pullerNode.setTranslation( puller.knot.x + (pulling ? -puller.dragOffsetX : 0) + (pullerNode.puller.type === 'blue' ? -60 : 0),
          puller.knot.y - pullerNode.height + 100 );
      }
      else {
        pullerNode.setTranslation( puller.x, puller.y );
      }
    };

    //TODO: Make x & y part of the same position property
    puller.xProperty.link( updateLocation );
    puller.yProperty.link( updateLocation );

    var updateImage = function() {
      var knotted = puller.knot;
      var pulling = model.running && knotted;
      pullerNode.image = pulling ? pullImage : image;

      //Reshape the focus rect when image changes
      updateLocation();
    };
    model.runningProperty.link( updateImage );

    pullerNode.addInputListener( new SimpleDragHandler(
      {
        allowTouchSnag: true,
        start: function() {
          puller.disconnect();
          puller.dragging = true;
          pullerNode.moveToFront();
        },
        end: function( event ) {
          updateLocation();
          puller.dragging = false;
          puller.trigger( 'dropped' );
          updateImage();
        },
        translate: function( event ) {
          //TODO: join into one setter to improve speed, by using vector2?
          pullerNode.puller.x = event.position.x;
          pullerNode.puller.y = event.position.y;
        }
      } ) );

    //Add accessibility peer
    this.addPeer( '<input type="button" aria-label="' + puller.name + '">', {click: function() {
      if ( puller.knot ) {
        puller.disconnect();
        puller.xProperty.reset();
        puller.yProperty.reset();
        model.numberPullersAttached = model.countAttachedPullers();
      }
      else {
        puller.disconnect();
        var knot = model.getClosestOpenKnot( puller );
        puller.set( {x: knot.x, y: knot.y, knot: knot} );
        model.numberPullersAttached = model.countAttachedPullers();
        puller.dragging = false;
        puller.trigger( 'dropped' );
        updateImage();
      }
    }} );
  }

  return inherit( Image, PullerNode );
} );