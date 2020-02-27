// Copyright 2017-2019, University of Colorado Boulder

/**
 * Constructs a shape that looks like trapezoid.  This shape is to be placed in the screen view at a place that
 * makes it look like this is the item that is stopping motion when the game of tug of war is over.
 *
 * @author Jesse Greenberg
 */

import Shape from '../../../../kite/js/Shape.js';
import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

// constants
const DIRECTIONS = [ 'left', 'right' ];

/**
 * @constructor
 */
function CartStopperNode( topWidth, bottomWidth, height, tandem, options ) {
  options = merge( {
    direction: 'left',
    tandem: tandem,
    fill: 'grey'
  }, options );

  const stopperShape = new Shape().moveTo( 0, 0 ).lineTo( bottomWidth, 0 ).lineTo( topWidth, -height ).lineTo( 0, -height );
  Path.call( this, stopperShape );

  // flip around the y axis
  assert && assert( _.includes( DIRECTIONS, options.direction ), 'stopper can only have directon "left" or "right"' );
  if ( options.direction === 'right' ) {
    this.scale( -1, 1 );
  }

  // mutate after scaling so that positioning is correct
  this.mutate( options );
}

forcesAndMotionBasics.register( 'CartStopperNode', CartStopperNode );

inherit( Path, CartStopperNode );
export default CartStopperNode;