// Copyright 2014-2015, University of Colorado Boulder

/**
 *
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var AccessiblePeer = require( 'SCENERY/accessibility/AccessiblePeer' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

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
    this.accessibleId = side + '-pullerToolbox';
    this._highlighted = false;
    var toolboxHeight = 216;
    var toolboxOptions = {
      fill: '#e7e8e9',
      stroke: defaultStroke,
      lineWidth: defaultLineWidth
    };
    var toolboxY = netForceScreenView.layoutBounds.height - toolboxHeight - 4;
    var toolboxWidth = 324;
    var toolboxArcWidth = 10;
    Rectangle.call( this, x, toolboxY, toolboxWidth, toolboxHeight, toolboxArcWidth, toolboxArcWidth, toolboxOptions );

    // outfit for accessibility
    this.accessibleContent = {
      createPeer: function( accessibleInstance ) {
        /* will look like:
         * <div tabindex="0" role="group" id="bluePullerGroup" class="pullerGroup" aria-describedby=description_id
         * aria-activedescendant="bluePuller1">
         * ...( puller children )
         * </div
         */
        var domElement = document.createElement( 'div' );
        domElement.setAttribute( 'aria-label', pullerGroupDescriptionString );
        domElement.tabIndex = '0';

        // enter the puller group on 'enter' or 'space bar'.
        domElement.addEventListener( 'keydown', function( event ) {
          // prevent the the event from bubbling.
          if ( domElement !== event.target ) { return; }
          // on enter or spacebar, step in to the selected group.
          if ( event.keyCode === 13 || event.keyCode === 32 ) {
            self.enterGroup( event, domElement );
          }
        } );

        // exit the group on 'escape'
        domElement.addEventListener( 'keydown', function( event ) {
          // we want exit event bubbling - event fired in children should notify parent.
          if ( event.keyCode === 27 ) {
            self.exitGroup( domElement );
          }
        } );

        var accessiblePeer = new AccessiblePeer( accessibleInstance, domElement );

        // TODO: Why is domElement.children empty here?
        // provide the puller group with a unique ID.
        domElement.id = self.accessibleId;
        return accessiblePeer;
      }
    };
  }

  forcesAndMotionBasics.register( 'PullerToolboxNode', PullerToolboxNode );

  return inherit( Rectangle, PullerToolboxNode, {

    /**
     * Group behavior for accessibility.  On 'enter' or 'spacebar' enter the group by setting all child indices
     * to 0 and set focus to the first child.
     *
     * @param {event} event
     * @param {domElement} parent
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
} )
;