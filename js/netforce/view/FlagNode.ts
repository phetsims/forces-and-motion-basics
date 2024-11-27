// Copyright 2013-2024, University of Colorado Boulder

/**
 * Node that shows the waving flag when the net force game is complete.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { Shape } from '../../../../kite/js/imports.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Path, Text } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';
import ForcesAndMotionBasicsPreferences from '../model/ForcesAndMotionBasicsPreferences.js';
import NetForceModel from '../model/NetForceModel.js';
import PullerColors from '../model/PullerColors.js';

export default class FlagNode extends Node {
  private readonly path: Path;
  private readonly colorWinsStringProperty: TReadOnlyProperty<string>;
  private readonly disposeFlagNode: () => void;
  private readonly centerTextNodeMultilink: IntentionalAny;

  /**
   * Constructor for FlagNode
   *
   * @param model the model for the entire 'motion', 'friction' or 'acceleration' screen
   * @param centerX center for layout
   * @param top top for layout
   * @param tandem
   */
  public constructor(
    private readonly model: NetForceModel,
    centerX: number,
    top: number,
    tandem: Tandem
  ) {
    super();

    this.path = new Path( null, {
      stroke: 'black',
      lineWidth: 2
    } );
    this.addChild( this.path );

    // Return the string of the winning color and set the fill color of the flag.
    this.colorWinsStringProperty = new DerivedStringProperty(
      [ ForcesAndMotionBasicsPreferences.pullerColorProperty, model.cart.xProperty,
        ForcesAndMotionBasicsStrings.blueWinsStringProperty, ForcesAndMotionBasicsStrings.redWinsStringProperty,
        ForcesAndMotionBasicsStrings.purpleWinsStringProperty, ForcesAndMotionBasicsStrings.orangeWinsStringProperty ],
      ( pullerColor, x, blueWinsString, redWinsString, purpleWinsString, orangeWinsString ) => {
        if ( pullerColor === PullerColors.PURPLE_AND_ORANGE ) {
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
    this.addChild( textNode );

    const update = this.updateFlagShape.bind( this );

    // listeners that will dispose the flag node when model is reset or cart is returned -
    // these must also be disposed
    this.disposeFlagNode = () => {
      this.detach();
      model.timeProperty.unlink( update );
      textNode.dispose();
      this.centerTextNodeMultilink.dispose();
      this.path.dispose();
      this.colorWinsStringProperty.dispose();
    };

    //When the clock ticks, wave the flag
    model.timeProperty.link( update );
    this.centerX = centerX;
    this.top = top;

    // Ensure the text is centered on the flag.
    this.centerTextNodeMultilink = Multilink.multilink( [ ForcesAndMotionBasicsStrings.blueWinsStringProperty,
      ForcesAndMotionBasicsStrings.redWinsStringProperty, ForcesAndMotionBasicsStrings.purpleWinsStringProperty,
      ForcesAndMotionBasicsStrings.orangeWinsStringProperty, ForcesAndMotionBasicsPreferences.pullerColorProperty ], () => {
      textNode.centerX = this.path.centerX;
      textNode.centerY = this.path.centerY;
    } );
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