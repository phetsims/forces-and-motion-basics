// Copyright 2014-2021, University of Colorado Boulder

/**
 *
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

// constants
const defaultStroke = 'black';
const defaultLineWidth = 1;

class PullerToolboxNode extends Rectangle {

  /**
   * Create toolbox backgrounds for the pullers
   * @param {NetForceModel} model
   * @param {NetForceScreenView} netForceScreenView
   * @param {number} x - the screen coordinate for the position of the toolbox
   * @param {number} side - 'left' || 'right'
   * @param {number} activePullerIndex
   * @param {number} minIndex
   * @param {number} maxIndex
   * @param {string || Color} highlightColor
   */
  constructor( model, netForceScreenView, x, side, activePullerIndex, minIndex, maxIndex, highlightColor ) {

    const toolboxHeight = 216;

    const toolboxOptions = {
      fill: '#e7e8e9',
      stroke: defaultStroke,
      lineWidth: defaultLineWidth
    };

    const toolboxY = netForceScreenView.layoutBounds.height - toolboxHeight - 4;
    const toolboxWidth = 324;
    const toolboxArcWidth = 10;
    super( x, toolboxY, toolboxWidth, toolboxHeight, toolboxArcWidth, toolboxArcWidth, toolboxOptions );

    this.highlightColor = highlightColor;
    this.uniqueId = `${side}-pullerToolbox`;
  }
}

forcesAndMotionBasics.register( 'PullerToolboxNode', PullerToolboxNode );

export default PullerToolboxNode;
