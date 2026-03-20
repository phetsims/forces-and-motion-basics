// Copyright 2025-2026, University of Colorado Boulder

/**
 * Keyboard listener that delegates to ItemNode.handleKeyboardInput.
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';

export default class ItemNodeKeyboardListener extends KeyboardListener<OneKeyStroke[]> {
  public constructor( fire: ( keysPressed: OneKeyStroke ) => void ) {
    super( {
      keys: [
        'arrowLeft', 'arrowRight', 'arrowUp', 'arrowDown',
        'a', 'd', 'w', 's',
        'enter', 'space', 'escape', 'delete', 'backspace'
      ],
      fireOnDown: false,
      fire: ( event, keysPressed ) => fire( keysPressed )
    } );
  }
}
