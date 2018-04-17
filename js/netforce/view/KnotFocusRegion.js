// Copyright 2015-2017, University of Colorado Boulder

/**
 * An invisible, rectangular view element that tracks the left and right focus regions in the Net Force screen.  This
 * file is necessary to define accessible content for the grouping of knots along the rope in the tug of war game.
 * The knots are treated as groups so that the user can 'enter' and 'exit' them in a 'move mode' for accessible drag
 * and drop behavior.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * Constructor.
   *
   * @param {NetForceModel} netForceModel
   * @param {PullerToolboxNode} toolboxNode - toolbox object containing all of the pullers
   * @param {number} ropeHeightOffset
   * @param {string} type - string which defines whether this is the left/right region, one of {'left || 'right'}
   * @constructor
   */
  function KnotFocusRegion( netForceModel, toolboxNode, ropeHeightOffset, type ) {

    Rectangle.call( this,
      toolboxNode.rectX,
      toolboxNode.rectY - ropeHeightOffset,
      toolboxNode.rectWidth,
      toolboxNode.rectHeight + ropeHeightOffset, {
        tagName: 'div',
        focusable: false
      }
    );
    var self = this;
    this.netForceModel = netForceModel;

    // @public - id used to quickly find this element among peers in the DOM
    this.uniqueId = type === 'left' ? 'leftFocusRegion' : 'rightFocusRegion';

    this.addAccessibleInputListener( {
      click: function( event ) {
        // we want exit event bubbling - event fired in children should notify parent.
        // only on escape key
        if ( event.keyCode === 27 ) {

          // a puller was being dragged when escape was pressed - exiting this group, so make sure that all
          // pullers are dropped
          netForceModel.pullers.forEach( function( puller ) {
            puller.draggingProperty.set( false );
          } );

          // exit the group of knots
          self.exitGroup();

          // reset focus to the puller toolbox.
          toolboxNode.focus();
        }
      }
    } );
  }

  forcesAndMotionBasics.register( 'KnotFocusRegion', KnotFocusRegion );

  return inherit( Rectangle, KnotFocusRegion, {
    
    /**
     * Group behavior for accessibility.  On 'enter' or 'spacebar' enter the group by setting all child indices
     * to 0 and set focus to the first child.
     */
    enterGroup: function() {
      var self = this;

      // get the puller being dragged
      var draggedPuller = null;
      self.netForceModel.pullers.forEach( function( puller ) {
        if ( puller.draggingProperty.get() ) {
          draggedPuller = puller;
        }
      } );
      assert && assert( draggedPuller, 'The dragged puller must be defined.' );

      // add listeners to the children that apply the correct behavior for looping through children.
      _.each( this.children, function( child ) {
          // add the child to the tab order.
          child.focusable = false;

          // Add event listeners to children for   key navigation.
          child.addAccessibleInputListener( {
            keydown: function( event ) {
              // prevent default - we are testing only using arrow keys for this navigation
              event.preventDefault();
            }
          } );
      } );

      // set focus to the child, that is the closest open knot to cart.
      var closestOpenKnotToCart = self.netForceModel.getClosestOpenKnotFromCart( draggedPuller );
      document.getElementById( closestOpenKnotToCart.acessibleKnotId ).focus();
    },

    /**
     * Exit the group.  This is called on 'escape' key.
     */
    exitGroup: function() {
      this.focus();

      // pull all children out of the tab order
      for ( var i = 0; i < this.children.length; i++ ) {
        this.children[ i ].focusable = false;
      }
    }
  } );
} );