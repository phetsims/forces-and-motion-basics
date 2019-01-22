// Copyright 2013-2018, University of Colorado Boulder

/**
 * Shows the graphic for the puller, which can be dragged from the toolbox to the rope to apply force.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * Create a PullerNode for the specified puller
   *
   * @param {Puller} puller
   * @param {NetForceModel} model
   * @param {Image} image image of the puller standing upright
   * @param {Image} pullImage image of the puller exerting a force
   * @param {PullerToolboxNode} pullerToolboxNode
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function PullerNode( puller, model, image, pullImage, pullerToolboxNode, tandem, options ) {
    this.puller = puller;
    var self = this;
    this.puller.node = this; //Wire up so node can be looked up by model element.
    this.standImage = image; // @private
    this.pullImage = pullImage; // @private
    var x = puller.positionProperty.get().x;
    var y = puller.positionProperty.get().y;

    Image.call( this, this.standImage, {
      tandem: tandem,
      x: x,
      y: y,
      cursor: 'pointer',
      scale: 0.86
    } );

    model.startedProperty.link( function() {
      self.updateImage( puller, model );
      self.updateLocation( puller, model );
    } );
    puller.positionProperty.link( function() {
      self.updateImage( puller, model );
      self.updateLocation( puller, model );
    } );

    puller.hoverKnotProperty.link( function( hoverKnot ) {
      if ( hoverKnot ) {
        var pullingOffset = puller.standOffsetX;
        var blueOffset = self.puller.type === 'blue' ? -60 + 10 + self.width / 2 : -self.width / 2;
        self.setTranslation( hoverKnot.xProperty.get() + pullingOffset + blueOffset, hoverKnot.y - self.height + 90 - 120 );
      }
    } );

    model.startedProperty.link( function() {
      self.updateImage( puller, model );
      self.updateLocation( puller, model );
    } );
    model.runningProperty.link( function() {
      self.updateImage( puller, model );
      self.updateLocation( puller, model );
    } );
    model.stateProperty.link( function() {
      self.updateImage( puller, model );
      self.updateLocation( puller, model );
    } );

    var dragHandler = new SimpleDragHandler( {
      tandem: tandem.createTandem( 'dragHandler' ),
        allowTouchSnag: true,
        start: function( event ) {

          // check to see if a puller is knotted - if it is, store the knot
          var knot = puller.knotProperty.get();

          // disconnect the puller from the knot and update the image
          puller.disconnect();
          self.updateImage( puller, model );

          // fire updates
          puller.draggingProperty.set( true );
          self.moveToFront();
          puller.draggedEmitter.emit();

          // if the puller was knotted, update the image location so that it is centered on the knot it was previously
          // grabbing
          if ( knot ) {
            self.updateLocationKnotted( puller, model, knot );
          }
        },
        end: function() {
          self.updateLocation( puller, model );
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
      self.updateLocation( puller, model );

      // cancel the drag
      if ( puller.draggingProperty.get() ) {
        dragHandler.interrupt();

        puller.reset();
      }
    } );

    this.mutate( options );
  }

  forcesAndMotionBasics.register( 'PullerNode', PullerNode );

  return inherit( Image, PullerNode, {

    /**
     * Update the location of the puller immediately after it has been clicked on after being removed from a knot
     * position.  Sets the translation of the puller relative to its previous knot position.  This knot position is
     * lost in updateLocation because the puller has already been disconnected from the knot by the time those functions
     * are called.
     *
     * @param {Puller} puller
     * @param {NetForceModel} model
     * @param {Knot} knot - the last knot that the puller was holding on to
     */
    updateLocationKnotted: function( puller, model, knot ) {
      var blueOffset = this.puller.type === 'blue' ? -60 : 0;
      puller.positionProperty.set( new Vector2( knot.xProperty.get() + blueOffset, knot.y - this.height + 90 ) );
    },

    /**
     * Update the image puller image depending on whether the puller is knotted and pulling
     *
     * @param  {Puller} puller
     * @param  {NetForceModel} model
     */
    updateImage: function( puller, model ) {
      var knotted = puller.knotProperty.get();
      var pulling = model.startedProperty.get() && knotted && model.stateProperty.get() !== 'completed';
      this.image = pulling ? this.pullImage : this.standImage;
    },

    /**
     * Update the location of a puller depending on whether it is knotted and pulling.
     *
     * @param  {Puller} puller
     * @param  {NetForceModel} model
     */
    updateLocation: function( puller, model ) {
      var knotted = puller.knotProperty.get();
      var pulling = model.startedProperty.get() && knotted && model.stateProperty.get() !== 'completed';
      if ( knotted ) {
        var pullingOffset = pulling ? -puller.dragOffsetX : puller.standOffsetX;
        var blueOffset = this.puller.type === 'blue' ? -60 + 10 : 0;
        this.setTranslation( puller.knotProperty.get().xProperty.get() + pullingOffset + blueOffset, puller.knotProperty.get().y - this.height + 90 );
      }
      else {
        this.setTranslation( puller.positionProperty.get() );
      }
    }
  } );
} );