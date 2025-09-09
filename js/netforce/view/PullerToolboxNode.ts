// Copyright 2014-2025, University of Colorado Boulder

/**
 * PullerToolboxNode is the background/container/panel for the pullers in the Net Force screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Rectangle, { RectangleOptions } from '../../../../scenery/js/nodes/Rectangle.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import NetForceScreenView from './NetForceScreenView.js';

// constants
const defaultStroke = 'black';
const defaultLineWidth = 1;

type SelfOptions = EmptySelfOptions;
type PullerToolboxNodeOptions = RectangleOptions & SelfOptions;

export default class PullerToolboxNode extends Rectangle {

  /**
   * Create toolbox backgrounds for the pullers
   * @param netForceScreenView
   * @param x - the screen coordinate for the position of the toolbox
   * @param providedOptions
   */
  public constructor( netForceScreenView: NetForceScreenView, x: number, providedOptions?: PullerToolboxNodeOptions ) {

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
  }
}

forcesAndMotionBasics.register( 'PullerToolboxNode', PullerToolboxNode );