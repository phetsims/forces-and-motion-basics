// Copyright 2025, University of Colorado Boulder

//REVIEW Documentation of hasInteractedProperty is misleading, makes it sound like interacting on one screen will hide cue on all screens.
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
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import GrabReleaseCueNode from '../../../../scenery-phet/js/accessibility/nodes/GrabReleaseCueNode.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

export default class FocusDrivenGrabReleaseCueNode<T extends Node> extends GrabReleaseCueNode {

  public readonly hasInteractedProperty = new BooleanProperty( false );

  protected constructor( nodes: T[],
                         layoutBounds: Bounds2,
                         positionCueNode: ( self: GrabReleaseCueNode, focusedNode: T, layoutBounds: Bounds2 ) => void,
                         tandem?: Tandem ) {
    super( { tandem: tandem } );

    const anyHasFocusProperty = DerivedProperty.or( nodes.map( n => n.focusedProperty ) );

    // Visible only until the first interaction and while something is focused
    Multilink.multilink( [ this.hasInteractedProperty, anyHasFocusProperty ], ( hasInteracted, anyFocus ) => {
      this.visible = !hasInteracted && anyFocus;
    } );

    // Position when a node gains focus
    nodes.forEach( node => {
      node.focusedProperty.link( isFocused => {
        if ( isFocused && !this.hasInteractedProperty.value ) {
          positionCueNode( this, node, layoutBounds );
        }
      } );
    } );
  }

  public reset(): void {
    this.hasInteractedProperty.reset();
  }
}

forcesAndMotionBasics.register( 'FocusDrivenGrabReleaseCueNode', FocusDrivenGrabReleaseCueNode );