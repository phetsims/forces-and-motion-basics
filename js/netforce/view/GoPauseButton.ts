// Copyright 2013-2024, University of Colorado Boulder

/**
 * A big round Go/Pause button that appears when the user has attached any nonzero number of pullers to the rope
 * which can be used to start/pause the animation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import Multilink from '../../../../axon/js/Multilink.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Rectangle, Text, Node } from '../../../../scenery/js/imports.js';
import BooleanToggleNode from '../../../../sun/js/BooleanToggleNode.js';
import RoundPushButton from '../../../../sun/js/buttons/RoundPushButton.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';
import NetForceModel from '../model/NetForceModel.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

//Given nodes that have possibly different sizes, wrap the specified node in a parent empty Rectangle node so the bounds will match up
//If the node is already the largest, don't wrap it.
//Centers all the nodes in the parent wrappers
//TODO: Would be good to factor this out or provide better library support https://github.com/phetsims/tasks/issues/1129
/**
 * Given nodes that have possibly different sizes, wrap the specified node in a parent empty Rectangle node so the
 * bounds will match up.  If the node is already the largest, don't wrap it.
 * Centers all the nodes in the parent wrappers.
 */
const wrap = ( node: Node, padX: number, padY: number, nodes: Node[] ): Rectangle => {
  let maxWidth = -1;
  let maxHeight = -1;
  nodes.forEach( n => {
    if ( n.width > maxWidth ) {
      maxWidth = n.width;
    }
    if ( n.height > maxHeight ) {
      maxHeight = n.height;
    }
  } );
  maxWidth += padX;
  maxHeight += padY;
  node.centerX = maxWidth / 2;
  node.centerY = maxHeight / 2;
  return new Rectangle( 0, 0, maxWidth, maxHeight, { children: [ node ] } );
};

export default class GoPauseButton extends BooleanToggleNode {

  /**
   * Create a GoPauseButton that appears below the candy cart when a puller has been attached to the rope.
   *
   * @param model the NetForceModel
   * @param layoutWidth the layout width for centering the button
   * @param tandem
   * @param [options]
   */
  public constructor( model: NetForceModel, layoutWidth: number, tandem: Tandem, options?: IntentionalAny ) {

    // eslint-disable-next-line phet/bad-typescript-text
    options = merge( {
      top: 400
    }, options );
    const padX = 15;
    const padY = 10;
    const goText = new Text( ForcesAndMotionBasicsStrings.goStringProperty, {
      font: new PhetFont( 42 ),
      maxWidth: 85,
      tandem: tandem.createTandem( 'goText' )
    } );
    const pauseText = new Text( ForcesAndMotionBasicsStrings.pauseStringProperty, {
      font: new PhetFont( 30 ),
      maxWidth: 85,
      tandem: tandem.createTandem( 'pauseText' )
    } );

    // boolean function to determine if the go button should be enabled based on model state.
    const isGoButtonEnabled = () => model.stateProperty.get() !== 'completed' && ( model.numberPullersAttachedProperty.get() > 0 || model.runningProperty.get() );

    // When the go button is pressed, indicate which pullers are on which knots and what the net force is.
    const goButtonPressedEmitter = new Emitter( {
      tandem: tandem.createTandem( 'goButtonPressedEmitter' ),
      parameters: [
        { name: 'netForce', phetioType: NumberIO },
        { name: 'knotJSON', phetioType: StringIO }
      ]
    } );
    const goListener = () => {

      // @ts-expect-error
      goButtonPressedEmitter.emit( model.netForceProperty.get(), JSON.stringify( model.getKnotDescription() ) );
      model.runningProperty.set( true );
    };
    const pauseListener = () => {
      model.runningProperty.set( false );
    };

    // Create the buttons.
    const createButton = ( textNode: Text, baseColor: string, listener: () => void, tandemName: string, stringProperty: TReadOnlyProperty<string> ) => {
      const buttonContent = wrap( textNode, padX, padY, [ goText, pauseText ] );
      const button = new RoundPushButton( {
        content: buttonContent,
        baseColor: baseColor,
        listener: listener,
        tandem: tandem.createTandem( tandemName )
      } );

      // Keep the text centered within the button.
      stringProperty.link( () => {
        textNode.centerX = buttonContent.width / 2;
        textNode.centerY = buttonContent.height / 2;
      } );
      return button;
    };
    const goButton = createButton( goText, '#94b830', goListener, 'goButton', ForcesAndMotionBasicsStrings.goStringProperty );
    const pauseButton = createButton( pauseText, '#df1a22', pauseListener, 'pauseButton', ForcesAndMotionBasicsStrings.pauseStringProperty );

    const showGoButtonProperty = new DerivedProperty( [ model.runningProperty ], running => !running );

    super( showGoButtonProperty, goButton, pauseButton, options );

    //Show the go/pause button if any pullers are attached or if the cart got started moving, and if it hasn't already finished a match, see #61
    Multilink.multilink( [ model.runningProperty, model.stateProperty, model.numberPullersAttachedProperty ], () => {
      const enabled = isGoButtonEnabled();
      goButton.enabled = enabled;
      pauseButton.enabled = enabled;
    } );

    this.centerX = layoutWidth / 2;
  }
}

forcesAndMotionBasics.register( 'GoPauseButton', GoPauseButton );