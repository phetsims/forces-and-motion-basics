// Copyright 2014-2017, University of Colorado Boulder

/**
 *
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // constants
  var defaultStroke = 'black';
  var defaultLineWidth = 1;

  /**
   * Create toolbox backgrounds for the pullers
   * @param {NetForceModel} model
   * @param {NetForceScreenView} netForceScreenView
   * @param {number} x - the screen coordinate for the location of the toolbox
   * @param {number} side - 'left' || 'right'
   * @param {number} activePullerIndex
   * @param {number} minIndex
   * @param {number} maxIndex
   * @param {string || Color} highlightColor
   * @param {string} pullerGroupDescriptionString
   */
  function PullerToolboxNode( model, netForceScreenView, x, side, activePullerIndex, minIndex, maxIndex, highlightColor,
                              pullerGroupDescriptionString ) {
    var self = this;
    this.highlightColor = highlightColor;
    this.uniqueId = side + '-pullerToolbox';
    this._highlighted = false;
    var toolboxHeight = 216;

    var toolboxOptions = {
      fill: '#e7e8e9',
      stroke: defaultStroke,
      lineWidth: defaultLineWidth,

      // a11y
      tagName: 'div',
      focusable: true
    };

    var toolboxY = netForceScreenView.layoutBounds.height - toolboxHeight - 4;
    var toolboxWidth = 324;
    var toolboxArcWidth = 10;
    Rectangle.call( this, x, toolboxY, toolboxWidth, toolboxHeight, toolboxArcWidth, toolboxArcWidth, toolboxOptions );

    this.addAccessibleInputListener( {
      keydown: function( event ) {

        // on enter or spacebar, step in to the selected group.
        if ( event.keyCode === 13 || event.keyCode === 32 ) {
          self.enterGroup();
        }

        // we want exit event bubbling - event fired in children should notify parent.
        else if ( event.keyCode === 27 ) {
          self.exitGroup();
        }
      }
    } );
  }

  forcesAndMotionBasics.register( 'PullerToolboxNode', PullerToolboxNode );

  return inherit( Rectangle, PullerToolboxNode, {

    /**
     * Group behavior for accessibility.  On 'enter' or 'spacebar' enter the group by setting all child indices
     * to 0 and set focus to the first child.
     */
    enterGroup: function() {
      // add listeners to the children that apply the correct behavior for looping through children.
      _.each( this.children, function( child ) {
          // add the child to the tab order.
          child.focusable = true;

          // Add event listeners to children for   key navigation.
          var numberOfChildren = self.children.length;
          child.addAccessibleInputListener( {
            keydown: function( event ) {
              var childIndex = _.indexOf( self.children, child );
              var nextIndex = ( childIndex + 1 ) % numberOfChildren;
              var previousIndex = ( childIndex - 1 );
              // if previous index is -1, set focus to the last element
              previousIndex = previousIndex === -1 ? ( numberOfChildren - 1 ) : previousIndex;

              if ( event.keyCode === 39 ) {
                //right arrow pressed
                self.children[ nextIndex ].focus();
              }
              if ( event.keyCode === 37 ) {
                //left arrow pressed
                self.children[ previousIndex ].focus();
              }
            }
          } );
        }
      );

      // set focus to the first child
      document.getElementById( parent.firstChild.id ).focus();
    },

    /**
     * Exit the group.  This is called on 'escape' key.
     */
    exitGroup: function() {
      // set focus to the parent form
      this.focus();

      // pull all children out of the tab order
      for ( var i = 0; i < this.children.length; i++ ) {
        this.children[ i ].focusable = false;
      }
    },

    // Show a highlight around the toolbox when one of the items inside has focus
    set highlighted( h ) {
      this._highlighted = h;
      this.stroke = h ? this.highlightColor : defaultStroke;
      this.lineWidth = h ? 4 : defaultLineWidth;
    },
    get highlighted() {
      return this._highlighted;
    }
  } );
} )
;