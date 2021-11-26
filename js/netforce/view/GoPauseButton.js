// Copyright 2013-2021, University of Colorado Boulder

/**
 * A big round Go/Pause button that appears when the user has attached any nonzero number of pullers to the rope
 * which can be used to start/pause the animation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import Property from '../../../../axon/js/Property.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Rectangle } from '../../../../scenery/js/imports.js';
import { Text } from '../../../../scenery/js/imports.js';
import BooleanToggleNode from '../../../../sun/js/BooleanToggleNode.js';
import RoundPushButton from '../../../../sun/js/buttons/RoundPushButton.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import forcesAndMotionBasicsStrings from '../../forcesAndMotionBasicsStrings.js';

const goString = forcesAndMotionBasicsStrings.go;
const pauseString = forcesAndMotionBasicsStrings.pause;

//Given nodes that have possibly different sizes, wrap the specified node in a parent empty Rectangle node so the bounds will match up
//If the node is already the largest, don't wrap it.
//Centers all the nodes in the parent wrappers
//TODO: Would be good to factor this out or provide better library support
/**
 * Given nodes that have possibly different sizes, wrap the specified node in a parent empty Rectangle node so the
 * bounds will match up.  If the node is already the largest, don't wrap it.
 * Centers all the nodes in the parent wrappers.
 * @param  {Node} node
 * @param  {number} padX
 * @param  {number} padY
 * @param  {Array.<Node>} nodes
 * @returns {Rectangle}
 */
const wrap = ( node, padX, padY, nodes ) => {
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

class GoPauseButton extends BooleanToggleNode {

  /**
   * Create a GoPauseButton that appears below the candy cart when a puller has been attached to the rope.
   *
   * @param {NetForceModel} model the NetForceModel
   * @param {number} layoutWidth the layout width for centering the button
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( model, layoutWidth, tandem, options ) {

    options = merge( {
      top: 400
    }, options );
    const padX = 15;
    const padY = 10;
    const goTextNode = new Text( goString, {
      font: new PhetFont( 42 ),
      tandem: tandem.createTandem( 'goTextNode' )
    } );
    const pauseTextNode = new Text( pauseString, {
      font: new PhetFont( 30 ),
      tandem: tandem.createTandem( 'pauseTextNode' )
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
      goButtonPressedEmitter.emit( model.netForceProperty.get(), JSON.stringify( model.getKnotDescription() ) );
      model.runningProperty.set( true );
    };
    const goButton = new RoundPushButton( {
      content: wrap( goTextNode, padX, padY, [ goTextNode, pauseTextNode ] ),
      baseColor: '#94b830',
      listener: goListener,
      tandem: tandem.createTandem( 'goButton' )
    } );//green

    const pauseListener = () => {
      model.runningProperty.set( false );
    };
    const pauseButton = new RoundPushButton( {
      content: wrap( pauseTextNode, padX, padY, [ goTextNode, pauseTextNode ] ),
      baseColor: '#df1a22',
      listener: pauseListener,
      tandem: tandem.createTandem( 'pauseButton' )
    } );//red

    const showGoButtonProperty = new DerivedProperty( [ model.runningProperty ], running => !running );

    super( goButton, pauseButton, showGoButtonProperty, options );

    //Show the go/pause button if any pullers are attached or if the cart got started moving, and if it hasn't already finished a match, see #61
    Property.multilink( [ model.runningProperty, model.stateProperty, model.numberPullersAttachedProperty ], () => {
      const enabled = isGoButtonEnabled();
      goButton.enabled = enabled;
      pauseButton.enabled = enabled;
    } );

    this.centerX = layoutWidth / 2;
  }
}

forcesAndMotionBasics.register( 'GoPauseButton', GoPauseButton );
export default GoPauseButton;