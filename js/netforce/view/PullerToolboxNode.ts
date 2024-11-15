// Copyright 2014-2024, University of Colorado Boulder

/**
 *
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { Rectangle } from '../../../../scenery/js/imports.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import NetForceModel from '../model/NetForceModel.js';
import NetForceScreenView from './NetForceScreenView.js';

// constants
const defaultStroke = 'black';
const defaultLineWidth = 1;

class PullerToolboxNode extends Rectangle {
  private readonly uniqueId: string;

  /**
   * Create toolbox backgrounds for the pullers
   * @param model
   * @param netForceScreenView
   * @param x - the screen coordinate for the position of the toolbox
   * @param side - 'left' | 'right'
   * @param activePullerIndex
   * @param minIndex
   * @param maxIndex
   * @param highlightColor
   */
  public constructor( model: NetForceModel, netForceScreenView: NetForceScreenView, x: number, side: string, activePullerIndex: number, minIndex: number, maxIndex: number,
                      private readonly highlightColor: string ) {

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

    this.uniqueId = `${side}-pullerToolbox`;
  }
}

forcesAndMotionBasics.register( 'PullerToolboxNode', PullerToolboxNode );

export default PullerToolboxNode;