// Copyright 2025, University of Colorado Boulder

/**
 * FocusDrivenGrabReleaseCueNode factors the common logic for showing a Grab/Release cue
 * whenever one of a set of focusable nodes gains focus and the user hasn't interacted yet.
 *
 * It manages:
 * - A public hasInteractedProperty shared by screens to hide the cue after first interaction
 * - Tracking whether any provided node currently has focus
 * - Visibility based on (!hasInteracted && anyHasFocus)
 * - Invoking a positioning callback when a node gains focus so the cue is placed correctly
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import GrabReleaseCueNode from '../../../../scenery-phet/js/accessibility/nodes/GrabReleaseCueNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

// Minimal shape for things that expose a focus state like scenery Nodes
type HasFocused = {
  focusedProperty: { value: boolean; link: ( listener: ( value: boolean ) => void ) => void };
};

export default class FocusDrivenGrabReleaseCueNode<T extends HasFocused> extends GrabReleaseCueNode {

  public readonly hasInteractedProperty = new BooleanProperty( false );
  private readonly anyHasFocusProperty = new BooleanProperty( false );

  public constructor( private readonly nodes: T[],
                      private readonly layoutBounds: Bounds2,
                      private readonly positioner: ( self: GrabReleaseCueNode, focusedNode: T, layoutBounds: Bounds2 ) => void,
                      tandem?: Tandem ) {
    super( { tandem: tandem } );

    // Track if any node has focus
    const updateAnyFocus = () => {
      this.anyHasFocusProperty.value = this.nodes.some( n => n.focusedProperty.value );
    };
    this.nodes.forEach( n => n.focusedProperty.link( updateAnyFocus ) );

    // Visible only until the first interaction and while something is focused
    Multilink.multilink( [ this.hasInteractedProperty, this.anyHasFocusProperty ], ( hasInteracted, anyFocus ) => {
      this.visible = !hasInteracted && anyFocus;
    } );

    // Position when a node gains focus
    this.nodes.forEach( node => {
      node.focusedProperty.link( isFocused => {
        if ( isFocused && !this.hasInteractedProperty.value ) {
          this.positioner( this, node, this.layoutBounds );
        }
      } );
    } );
  }

  public reset(): void {
    this.hasInteractedProperty.reset();
  }
}

forcesAndMotionBasics.register( 'FocusDrivenGrabReleaseCueNode', FocusDrivenGrabReleaseCueNode );