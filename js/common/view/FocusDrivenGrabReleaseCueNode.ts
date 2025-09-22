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
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

export default class FocusDrivenGrabReleaseCueNode<T extends Node> extends GrabReleaseCueNode {

  public readonly hasInteractedProperty = new BooleanProperty( false );
  private readonly anyHasFocusProperty = new BooleanProperty( false );

  public constructor( private readonly nodes: T[],
                      private readonly layoutBounds: Bounds2,
                      private readonly positioner: ( self: GrabReleaseCueNode, focusedNode: T, layoutBounds: Bounds2 ) => void,
                      tandem?: Tandem ) {
    super( { tandem: tandem } );

    // Track if any node has focus
    this.nodes.forEach( n => n.focusedProperty.link( () => {
      this.anyHasFocusProperty.value = this.nodes.some( n => n.focusedProperty.value );
    } ) );

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