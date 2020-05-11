// Copyright 2013-2020, University of Colorado Boulder

/**
 * Shows the graphic for the puller, which can be dragged from the toolbox to the rope to apply force.
 *
 * @author Sam Reid
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import inherit from '../../../../phet-core/js/inherit.js';
import SimpleDragHandler from '../../../../scenery/js/input/SimpleDragHandler.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

/**
 * Create a PullerNode for the specified puller
 *
 * @param {Puller} puller
 * @param {NetForceModel} model
 * @param {Image} image image of the puller standing upright
 * @param {Image} pullImage image of the puller exerting a force
 * @param {PullerToolboxNode} pullerToolboxNode
 * @param {Tandem} tandem
 * @param {Object} [options]
 * @constructor
 */
function PullerNode( puller, model, image, pullImage, pullerToolboxNode, tandem, options ) {
  this.puller = puller;
  const self = this;
  this.puller.node = this; //Wire up so node can be looked up by model element.
  this.standImage = image; // @private
  this.pullImage = pullImage; // @private
  const x = puller.positionProperty.get().x;
  const y = puller.positionProperty.get().y;

  Image.call( this, this.standImage, {
    tandem: tandem,
    x: x,
    y: y,
    cursor: 'pointer',
    scale: 0.86
  } );

  model.startedProperty.link( function() {
    self.updateImage( puller, model );
    self.updatePosition( puller, model );
  } );
  puller.positionProperty.link( function() {
    self.updateImage( puller, model );
    self.updatePosition( puller, model );
  } );

  model.startedProperty.link( function() {
    self.updateImage( puller, model );
    self.updatePosition( puller, model );
  } );
  model.runningProperty.link( function() {
    self.updateImage( puller, model );
    self.updatePosition( puller, model );
  } );
  model.stateProperty.link( function() {
    self.updateImage( puller, model );
    self.updatePosition( puller, model );
  } );

  const dragHandler = new SimpleDragHandler( {
      tandem: tandem.createTandem( 'dragHandler' ),
      allowTouchSnag: true,
      start: function( event ) {

        // check to see if a puller is knotted - if it is, store the knot
        const knot = puller.knotProperty.get();

        // disconnect the puller from the knot and update the image
        puller.disconnect();
        self.updateImage( puller, model );

        // fire updates
        puller.draggingProperty.set( true );
        self.moveToFront();
        puller.draggedEmitter.emit();

        // if the puller was knotted, update the image position so that it is centered on the knot it was previously
        // grabbing
        if ( knot ) {
          self.updatePositionKnotted( puller, model, knot );
        }
      },
      end: function() {
        self.updatePosition( puller, model );
        puller.draggingProperty.set( false );
        puller.droppedEmitter.emit();
        self.updateImage( puller, model );
      },
      translate: function( event ) {
        self.updateImage( puller, model );
        self.puller.positionProperty.set( event.position );
      }
    }
  );
  self.addInputListener( dragHandler );

  model.resetAllEmitter.addListener( function() {
    self.updatePosition( puller, model );

    // cancel the drag
    if ( puller.draggingProperty.get() ) {
      dragHandler.interrupt();

      puller.reset();
    }
  } );

  this.mutate( options );
}

forcesAndMotionBasics.register( 'PullerNode', PullerNode );

inherit( Image, PullerNode, {

  /**
   * Update the position of the puller immediately after it has been clicked on after being removed from a knot
   * position.  Sets the translation of the puller relative to its previous knot position.  This knot position is
   * lost in updatePosition because the puller has already been disconnected from the knot by the time those functions
   * are called.
   *
   * @param {Puller} puller
   * @param {NetForceModel} model
   * @param {Knot} knot - the last knot that the puller was holding on to
   */
  updatePositionKnotted: function(puller, model, knot ) {
    const blueOffset = this.puller.type === 'blue' ? -60 : 0;
    puller.positionProperty.set( new Vector2( knot.xProperty.get() + blueOffset, knot.y - this.height + 90 ) );
  },

  /**
   * Update the image puller image depending on whether the puller is knotted and pulling
   *
   * @param  {Puller} puller
   * @param  {NetForceModel} model
   */
  updateImage: function( puller, model ) {
    const knotted = puller.knotProperty.get();
    const pulling = model.startedProperty.get() && knotted && model.stateProperty.get() !== 'completed';
    this.image = pulling ? this.pullImage : this.standImage;
  },

  /**
   * Update the position of a puller depending on whether it is knotted and pulling.
   *
   * @param  {Puller} puller
   * @param  {NetForceModel} model
   */
  updatePosition: function(puller, model ) {
    const knotted = puller.knotProperty.get();
    const pulling = model.startedProperty.get() && knotted && model.stateProperty.get() !== 'completed';
    if ( knotted ) {
      const pullingOffset = pulling ? -puller.dragOffsetX : puller.standOffsetX;
      const blueOffset = this.puller.type === 'blue' ? -60 + 10 : 0;
      this.setTranslation( puller.knotProperty.get().xProperty.get() + pullingOffset + blueOffset, puller.knotProperty.get().y - this.height + 90 );
    }
    else {
      this.setTranslation( puller.positionProperty.get() );
    }
  }
} );

export default PullerNode;
