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
    this.highlightColor = highlightColor;
    this.uniqueId = side + '-pullerToolbox';
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
  }

  forcesAndMotionBasics.register( 'PullerToolboxNode', PullerToolboxNode );

  return inherit( Rectangle, PullerToolboxNode );
} )
;