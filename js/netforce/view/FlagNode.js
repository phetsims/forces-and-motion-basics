// Copyright 2013-2022, University of Colorado Boulder

/**
 * Node that shows the waving flag when the net force game is complete.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { Shape } from '../../../../kite/js/imports.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Path, Text } from '../../../../scenery/js/imports.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';

const blueWinsString = ForcesAndMotionBasicsStrings.blueWins;
const redWinsString = ForcesAndMotionBasicsStrings.redWins;

class FlagNode extends Node {

  /**
   * Constructor for FlagNode
   *
   * @param {MotionModel} model the model for the entire 'motion', 'friction' or 'acceleration' screen
   * @param {number} centerX center for layout
   * @param {number} top top for layout
   * @param {Tandem} tandem
   */
  constructor( model, centerX, top, tandem ) {
    super();
    this.model = model;

    const textNode = new Text( model.cart.xProperty.get() < 0 ? blueWinsString : redWinsString, {
      font: new PhetFont( 24 ),
      fill: 'white'
    } );
    this.path = new Path( null, {
      fill: model.cart.xProperty.get() < 0 ? 'blue' : 'red',
      stroke: 'black',
      lineWidth: 2
    } );
    this.addChild( this.path );

    //Shrink the text to fit on the flag if necessary
    if ( textNode.width > 220 ) {
      textNode.scale( 220 / textNode.width );
    }
    this.addChild( textNode );

    const update = this.updateFlagShape.bind( this );

    // listeners that will dispose the flag node when model is reset or cart is returned -
    // these must also be disposed

    this.disposeFlagNode = () => {
      this.detach();
      model.timeProperty.unlink( update );
      textNode.dispose();
      this.path.dispose();
    };

    //When the clock ticks, wave the flag
    model.timeProperty.link( update );
    textNode.centerX = this.path.centerX;
    textNode.centerY = this.path.centerY;
    this.centerX = centerX;
    this.top = top;
  }

  // @public
  dispose() {
    this.disposeFlagNode();
    super.dispose();
  }

  // @public - Update the flag shape, copied from the Java version
  updateFlagShape() {
    const shape = new Shape();
    const maxX = 220;
    const maxY = 55;
    const dy = ( 7 * Math.sin( this.model.timeProperty.get() * 6 ) );
    const dx = ( 2 * Math.sin( this.model.timeProperty.get() * 5 ) ) + 10;
    shape.moveTo( 0, 0 );
    shape.cubicCurveTo( maxX / 3 + dx, 25 + dy, 2 * maxX / 3 + dx, -25 - dy, maxX + dx, dy / 2 );
    shape.lineTo( maxX + dx, maxY + dy / 2 );
    shape.cubicCurveTo( 2 * maxX / 3 + dx, -25 + maxY - dy, maxX / 3 + dx, 25 + maxY + dy, 0, maxY );
    shape.lineTo( 0, 0 );
    shape.close();
    this.path.shape = shape;
  }
}

forcesAndMotionBasics.register( 'FlagNode', FlagNode );

export default FlagNode;