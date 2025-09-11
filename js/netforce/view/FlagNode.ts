// Copyright 2013-2025, University of Colorado Boulder

/**
 * Node that shows the waving flag when the net force game is complete.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Shape from '../../../../kite/js/Shape.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import AlignBox from '../../../../scenery/js/layout/nodes/AlignBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import ForcesAndMotionBasicsPreferences from '../model/ForcesAndMotionBasicsPreferences.js';
import NetForceModel from '../model/NetForceModel.js';

export default class FlagNode extends Node {
  private readonly path: Path;
  private readonly colorWinsStringProperty: TReadOnlyProperty<string>;
  private readonly disposeFlagNode: () => void;

  public constructor(
    private readonly model: NetForceModel
  ) {
    super();

    this.path = new Path( null, {
      stroke: 'black',
      lineWidth: 2
    } );
    this.addChild( this.path );

    // Return the string of the winning color and set the fill color of the flag.
    this.colorWinsStringProperty = new DerivedStringProperty(
      [ ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty, model.cart.positionProperty,
        ForcesAndMotionBasicsFluent.blueWinsStringProperty, ForcesAndMotionBasicsFluent.redWinsStringProperty,
        ForcesAndMotionBasicsFluent.purpleWinsStringProperty, ForcesAndMotionBasicsFluent.orangeWinsStringProperty ],
      ( pullerColor, x, blueWinsString, redWinsString, purpleWinsString, orangeWinsString ) => {
        if ( pullerColor === 'purpleOrange' ) {
          this.path.fill = x < 0 ? '#8a2be2' : '#ff5500'; // purple or orange
          return x < 0 ? purpleWinsString : orangeWinsString;
        }
        else {
          this.path.fill = x < 0 ? 'blue' : 'red';
          return x < 0 ? blueWinsString : redWinsString;
        }
      }
    );

    const textNode = new Text( this.colorWinsStringProperty, {
      maxWidth: 220, // empirically determined to fit within the flag
      font: new PhetFont( 24 ),
      fill: 'white'
    } );

    const update = this.updateFlagShape.bind( this );

    // listeners that will dispose the flag node when model is reset or cart is returned -
    // these must also be disposed
    this.disposeFlagNode = () => {
      this.detach();
      model.timeProperty.unlink( update );
      textNode.dispose();
      this.path.dispose();
      this.colorWinsStringProperty.dispose();
    };

    // When the clock ticks, wave the flag
    model.timeProperty.link( update );

    const textNodeAlignBox = new AlignBox( textNode, {
      alignBounds: this.path.bounds
    } );
    this.addChild( textNodeAlignBox );
  }

  public override dispose(): void {
    this.disposeFlagNode();
    super.dispose();
  }

  // Update the flag shape, copied from the Java version
  private updateFlagShape(): void {
    const shape = new Shape();
    const maxX = 220;
    const maxY = 55;
    const dy = ( 7 * Math.sin( this.model.timeProperty.value * 6 ) );
    const dx = ( 2 * Math.sin( this.model.timeProperty.value * 5 ) ) + 10;
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