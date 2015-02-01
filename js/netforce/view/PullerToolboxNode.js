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