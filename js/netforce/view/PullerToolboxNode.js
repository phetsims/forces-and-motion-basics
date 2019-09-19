// Copyright 2014-2019, University of Colorado Boulder

/**
 *
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // constants
  const defaultStroke = 'black';
  const defaultLineWidth = 1;

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
   */
  function PullerToolboxNode( model, netForceScreenView, x, side, activePullerIndex, minIndex, maxIndex, highlightColor ) {
    this.highlightColor = highlightColor;
    this.uniqueId = side + '-pullerToolbox';
    const toolboxHeight = 216;

    const toolboxOptions = {
      fill: '#e7e8e9',
      stroke: defaultStroke,
      lineWidth: defaultLineWidth
    };

    const toolboxY = netForceScreenView.layoutBounds.height - toolboxHeight - 4;
    const toolboxWidth = 324;
    const toolboxArcWidth = 10;
    Rectangle.call( this, x, toolboxY, toolboxWidth, toolboxHeight, toolboxArcWidth, toolboxArcWidth, toolboxOptions );
  }

  forcesAndMotionBasics.register( 'PullerToolboxNode', PullerToolboxNode );

  return inherit( Rectangle, PullerToolboxNode );
} )
;