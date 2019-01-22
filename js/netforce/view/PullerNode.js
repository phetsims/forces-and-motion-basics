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
  var KeyboardUtil = require( 'SCENERY/accessibility/KeyboardUtil' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * Create a PullerNode for the specified puller
   *
   * @param {Puller} puller
   * @param {NetForceModel} model
   * @param {Image} image image of the puller standing upright
   * @param {Image} pullImage image of the puller exerting a force
   * @param {KnotFocusRegion} knotRegionNode
   * @param {PullerToolboxNode} pullerToolboxNode
   * @param {string} accessibleDescription
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function PullerNode( puller, model, image, pullImage, knotRegionNode, pullerToolboxNode, accessibleDescription, tandem, options ) {
    this.puller = puller;
    var self = this;
    this.puller.node = this; //Wire up so node can be looked up by model element.
    this.standImage = image; // @private
    this.pullImage = pullImage; // @private
    this.description = accessibleDescription;
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

    this.addInputListener( {
      keydown: function( event ) {
        var domEvent = event.domEvent;

        // experimenting with restricting choice control to arrow keys.  Come back to this line and discuss with others.
        //event.preventDefault();

        // get the live action element that notifies the user of how their actions effect the screen layout
        var actionElement = document.getElementById( 'netForceActionElement' );

        // on tab, exit the group and focus the next element in the navigation order
        if ( domEvent.keyCode === KeyboardUtil.KEY_TAB ) {
          pullerToolboxNode.exitGroup( document.getElementById( pullerToolboxNode.uniqueId ) );
        }

        // if the puller is not grabbed, grab it for drag and drop
        if ( domEvent.keyCode === KeyboardUtil.KEY_ENTER || domEvent.keyCode === KeyboardUtil.KEY_SPACE ) {
          // the puller is already on a rope on the knot.  Place it right back in the toolbox.
          // TODO: This behavior is a placeholder, I am not sure how this should behave.
          if ( self.puller.knotProperty.get() !== null ) {
            self.puller.knotProperty.set( null );

            var grabbedPuller = self.puller;
            grabbedPuller.reset();
            model.numberPullersAttachedProperty.set( model.countAttachedPullers() );
            grabbedPuller.draggingProperty.set( false );
            self.updateImage( grabbedPuller, model );
            self.updateLocation( grabbedPuller, model );

            // reset the puller's alt text to describe it in the toolbox
            self.setAccessibleAttribute( 'alt', accessibleDescription );

            // update live action element to tell user that the puller was moved back to the toolbox
            actionElement.innerText = accessibleDescription + ' placed in toolbox';

          }
          else {
            // notify AT that the puller is in a 'grabbed' state
            self.grabbed = true;
            self.puller.draggingProperty.set( true );

            // update the live description for the net force screen
            var actionString = 'Selected ' + accessibleDescription;
            actionElement.innerText = actionString;

            // enter 'move mode' by exiting this group, and entering the group of knots
            pullerToolboxNode.exitGroup();

            var knotRegionType = puller.type === 'red' ? 'rightFocusRegion' : 'leftFocusRegion';
            var knotRegionElement = document.getElementById( knotRegionType );
            knotRegionNode.enterGroup( knotRegionElement );
          }
        }
      }
          
    } );

    this.mutate( _.extend( { 

      // a11y options
      tagName: 'img',
      focusable: false,
      innerContent: accessibleDescription
    }, options ) );
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