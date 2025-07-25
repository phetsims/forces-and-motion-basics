// Copyright 2014-2025, University of Colorado Boulder

/**
 * PullerToolboxNode is the background/container/panel for the pullers in the Net Force screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Rectangle, { RectangleOptions } from '../../../../scenery/js/nodes/Rectangle.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import NetForceModel from '../model/NetForceModel.js';
import NetForceScreenView from './NetForceScreenView.js';

// constants
const defaultStroke = 'black';
const defaultLineWidth = 1;

type SelfOptions = EmptySelfOptions;
type PullerToolboxNodeOptions = RectangleOptions & SelfOptions;

export default class PullerToolboxNode extends Rectangle {
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
   * @param providedOptions
   */
  public constructor( model: NetForceModel, netForceScreenView: NetForceScreenView, x: number, side: string, activePullerIndex: number, minIndex: number, maxIndex: number,
                      private readonly highlightColor: string, providedOptions?: PullerToolboxNodeOptions ) {

    const toolboxHeight = 216;

    const toolboxY = netForceScreenView.layoutBounds.height - toolboxHeight - 4;
    const toolboxWidth = 324;
    const toolboxArcWidth = 10;

    const options = optionize<PullerToolboxNodeOptions, SelfOptions, RectangleOptions>()( {
      fill: '#e7e8e9',
      stroke: defaultStroke,
      lineWidth: defaultLineWidth
    }, providedOptions );

    super( x, toolboxY, toolboxWidth, toolboxHeight, toolboxArcWidth, toolboxArcWidth, options );

    this.uniqueId = `${side}-pullerToolbox`;
  }
}

forcesAndMotionBasics.register( 'PullerToolboxNode', PullerToolboxNode );