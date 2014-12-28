//  Copyright 2002-2014, University of Colorado Boulder

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
  var Property = require( 'AXON/Property' );

  // constants
  var defaultStroke = 'black';
  var defaultLineWidth = 1;

  /**
   * Create toolbox backgrounds for the pullers
   * @param {number} x - the screen coordinate for the location of the toolbox
   * @param {string} side - left/right
   * @returns {Rectangle}
   */
  function PullerToolboxNode( model, netForceScreenView, x, side, activePullerIndex, minIndex, maxIndex, highlightColor ) {
    this.highlightColor = highlightColor;
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

    // Model this with an axon property, and sync the DOM and view with that
    var activePullerIndexProperty = new Property( activePullerIndex );

    this.addPeer( '<input type="button" aria-label="Return">', {

      // When clicked, move the active puller to the rope.
      click: function() {
        var puller = netForceScreenView.model.pullers[activePullerIndexProperty.value];
        model.activatePuller( puller, netForceScreenView.pullerNodes[activePullerIndexProperty.value] );
      },
      tabIndex: 0
    } );

    this.addInputListener( {
      keydown: function( event, trail ) {
        console.log( 'key down on toolbox' );
//        if ( event.domEvent.keyCode === 37 ) { // left
//          activePullerIndexProperty.value = Math.max( minIndex, activePullerIndexProperty.value - 1 );
//        }
//        else if ( event.domEvent.keyCode === 39 ) { // right
//          activePullerIndexProperty.value = Math.min( maxIndex, activePullerIndexProperty.value + 1 );
//        }
      }
    } );
  }

  return inherit( Rectangle, PullerToolboxNode,
    {

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
} );