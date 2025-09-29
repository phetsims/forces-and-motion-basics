// Copyright 2017-2025, University of Colorado Boulder

/**
 * Constructs a shape that looks like trapezoid.  This shape is to be placed in the screen view at a place that
 * makes it look like this is the item that is stopping motion when the game of tug of war is over.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Shape from '../../../../kite/js/Shape.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Path, { PathOptions } from '../../../../scenery/js/nodes/Path.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import LeftOrRight, { leftOrRightValues } from '../model/LeftOrRight.js';

type SelfOptions = {
  direction?: LeftOrRight;
};
type CartStopperNodeOptions = StrictOmit<PathOptions, 'fill'> & SelfOptions;
export default class CartStopperNode extends Path {
  public constructor( topWidth: number, bottomWidth: number, height: number, providedOptions?: CartStopperNodeOptions ) {

    const options = optionize<CartStopperNodeOptions, SelfOptions, PathOptions>()( {
      direction: 'left',
      fill: 'grey'
    }, providedOptions );

    const stopperShape = new Shape().moveTo( 0, 0 ).lineTo( bottomWidth, 0 ).lineTo( topWidth, -height ).lineTo( 0, -height );
    super( stopperShape );

    // flip around the y-axis
    affirm( _.includes( leftOrRightValues, options.direction ), 'stopper can only have direction "left" or "right"' );
    if ( options.direction === 'right' ) {
      this.scale( -1, 1 );
    }

    // mutate after scaling so that positioning is correct
    this.mutate( options );
  }
}

forcesAndMotionBasics.register( 'CartStopperNode', CartStopperNode );