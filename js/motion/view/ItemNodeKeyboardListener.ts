// Copyright 2025, University of Colorado Boulder

/**
 * Keyboard listener that delegates to ItemNode.handleKeyboardInput.
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';

import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

export default class ItemNodeKeyboardListener extends KeyboardListener<OneKeyStroke[]> {
  public constructor( fire: ( keysPressed: OneKeyStroke ) => void ) {
    super( {
      keys: [

        // TODO: support wasd? See https://github.com/phetsims/forces-and-motion-basics/issues/466
        'arrowLeft', 'arrowRight', 'arrowUp', 'arrowDown',
        'enter', 'space', 'escape', 'delete', 'backspace'
      ],
      fireOnDown: false,
      fire: ( event, keysPressed ) => fire( keysPressed )
    } );
  }
}

forcesAndMotionBasics.register( 'ItemNodeKeyboardListener', ItemNodeKeyboardListener );