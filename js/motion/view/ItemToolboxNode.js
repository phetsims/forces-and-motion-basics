// Copyright 2014-2015, University of Colorado Boulder

/**
 * Toolbox for items in the Motion screen of Forces and Motion: Basics.  This is a simple background rectangle, but
 * modularized for accessibility since the toolbox needs to be outfitted with accessible drag and drop behavior for
 * each of the items in the toolbox.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // constants
  var defaultStroke = 'black';
  var defaultLineWidth = 1;

  /**
   * Constructor.
   *
   * @param {number} toolboxX
   * @param {number} toolboxY
   * @param {number} toolboxWidth
   * @param {number} toolboxHeight
   * @param {number} toolboxArcWidthX
   * @param {number} toolboxArcWidthY
   * @param {number} sideString - string description for which side the toolbox is on
   * @param {Object} toolboxOptions
   */
  function ItemToolboxNode( toolboxX, toolboxY, toolboxWidth, toolboxHeight, toolboxArcWidthX, toolboxArcWidthY, sideString, toolboxOptions ) {

    var self = this;
    Rectangle.call( this, toolboxX, toolboxY, toolboxWidth, toolboxHeight, toolboxArcWidthX, toolboxArcWidthY, toolboxOptions );

    // unique id to quickly get the element in the accessible equivalent of this item in the parallel DOM.
    this.uniqueId = sideString + '-itemToolbox' + this.id;

    // a11y
    this.tagName = 'div';
    this.focusable = true;
    this.accessibleLabel = toolboxOptions.accessibleDescription;
    this.useAriaLabel = true;

    this.addAccessibleInputListener( {
      keydown: function( event ) {
        // prevent the the event from bubbling.
        if ( self.domElement !== event.target ) { return; }

        // on enter or spacebar, step in to the selected group.
        if ( event.keyCode === 13 || event.keyCode === 32 ) {
          self.enterGroup( event, self.domElement );
        }

        // we want exit event bubbling - event fired in children should notify parent.
        if ( event.keyCode === 27 ) {
          self.exitGroup( self.domElement );
        }
      }
    } );
  }

  forcesAndMotionBasics.register( 'ItemToolboxNode', ItemToolboxNode );

  return inherit( Rectangle, ItemToolboxNode, {

    /**
     * Group behavior for accessibility.  On 'enter' or 'spacebar' enter the group by setting all child indices
     * to 0 and set focus to the first child.
     *
     * @param {event} event
     * @param {domElement} parent
     * @private (accessibility)
     */
    enterGroup: function( event, parent ) {
      // add listeners to the children that apply the correct behavior for looping through children.
      _.each( parent.children, function( child ) {
          // add the child to the tab order.
          child.tabIndex = '0';

          // Add event listeners to children for   key navigation.
          var numberOfChildren = parent.children.length;
          child.addEventListener( 'keydown', function( event ) {
            var childIndex = _.indexOf( parent.children, child );
            var nextIndex = ( childIndex + 1 ) % numberOfChildren;
            var previousIndex = ( childIndex - 1 );
            // if previous index is -1, set focus to the last element
            previousIndex = previousIndex === -1 ? ( numberOfChildren - 1 ) : previousIndex;

            if ( event.keyCode === 39 ) {
              //right arrow pressed
              parent.children[ nextIndex ].focus();
            }
            if ( event.keyCode === 37 ) {
              //left arrow pressed
              parent.children[ previousIndex ].focus();
            }
          } );
        }
      );

      // set focus to the first child
      document.getElementById( parent.firstChild.id ).focus();
    },

    /**
     * Exit the group.  This is called on 'escape' key.
     *
     * @param {domElement} parent
     */
    exitGroup: function( parent ) {
      // set focus to the parent form
      parent.focus();

      // make sure that first element is the new aria-activedescendant
      parent.setAttribute( 'aria-activedescendant', parent.firstChild.id );

      // pull all children out of the tab order
      for ( var i = 0; i < parent.children.length; i++ ) {
        parent.children[ i ].tabIndex = '-1';
      }
    },

    // Show a highlight around the toolbox when one of the items inside has focus
    set
      highlighted( h ) {
      this._highlighted = h;
      this.stroke = h ? this.highlightColor : defaultStroke;
      this.lineWidth = h ? 4 : defaultLineWidth;
    },
    get
      highlighted() {
      return this._highlighted;
    }
  } );
} );