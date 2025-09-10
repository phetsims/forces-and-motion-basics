// Copyright 2025, University of Colorado Boulder

/**
 * Show the "grab and release" cue when an item is focused but the user hasn't interacted yet.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import GrabReleaseCueNode from '../../../../scenery-phet/js/accessibility/nodes/GrabReleaseCueNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ItemNode from './ItemNode.js';

export default class MotionGrabReleaseCueNode extends GrabReleaseCueNode {
  public readonly hasInteractedProperty = new BooleanProperty( false );
  private readonly anyItemHasFocusProperty = new BooleanProperty( false );

  public constructor( private readonly itemNodes: ItemNode[], private readonly layoutBounds: Bounds2, tandem?: Tandem ) {
    super();
    const updateAnyFocus = () => {
      this.anyItemHasFocusProperty.value = this.itemNodes.some( n => n.focusedProperty.value );
    };
    this.itemNodes.forEach( n => n.focusedProperty.link( updateAnyFocus ) );
    Multilink.multilink( [ this.hasInteractedProperty, this.anyItemHasFocusProperty ], ( hasInteracted, anyFocus ) => {
      this.visible = !hasInteracted && anyFocus;
    } );
    this.itemNodes.forEach( itemNode => {
      itemNode.focusedProperty.link( isFocused => {
        if ( isFocused && !this.hasInteractedProperty.value ) {
          this.updatePosition( itemNode );
        }
      } );
    } );
  }

  private updatePosition( focusedItemNode: ItemNode ): void {
    const item = focusedItemNode.item;
    const side = item.modeProperty.value === 'onStack' ? 'stack' : item.getToolboxSide();
    this.centerX = side === 'stack' ? this.layoutBounds.centerX : ( side === 'left' ? this.layoutBounds.width * 0.25 : this.layoutBounds.width * 0.75 );
    this.top = 200;
  }

  public reset(): void { this.hasInteractedProperty.reset(); }
}

forcesAndMotionBasics.register( 'MotionGrabReleaseCueNode', MotionGrabReleaseCueNode );