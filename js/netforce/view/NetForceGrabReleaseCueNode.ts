// Copyright 2025, University of Colorado Boulder

/**
 * NetForceGrabReleaseCueNode is a specialized GrabReleaseCueNode for the NetForce screen.
 * It shows over the appropriate side that has focus and hides after interaction.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import GrabReleaseCueNode from '../../../../scenery-phet/js/accessibility/nodes/GrabReleaseCueNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import PullerNode from './PullerNode.js';

export default class NetForceGrabReleaseCueNode extends GrabReleaseCueNode {

  public readonly hasInteractedProperty: BooleanProperty;
  private readonly pullerNodes: PullerNode[];
  private readonly layoutBounds: Bounds2;
  private readonly anyPullerHasFocusProperty: TReadOnlyProperty<boolean>;

  public constructor( pullerNodes: PullerNode[], layoutBounds: Bounds2, tandem?: Tandem ) {

    super( {
      tandem: tandem
    } );

    this.hasInteractedProperty = new BooleanProperty( false );
    this.pullerNodes = pullerNodes;
    this.layoutBounds = layoutBounds;

    // Create a property that tracks if any puller has focus
    // TODO: assign on creation, see https://github.com/phetsims/forces-and-motion-basics/issues/431
    const anyPullerHasFocusProperty = new BooleanProperty( false );
    this.anyPullerHasFocusProperty = anyPullerHasFocusProperty;

    // Update the anyPullerHasFocusProperty when any puller's focus changes
    const updateAnyPullerHasFocus = () => {
      const anyHasFocus = this.pullerNodes.some( pullerNode => pullerNode.focusedProperty.value );
      anyPullerHasFocusProperty.value = anyHasFocus;
    };

    // Listen to all puller focus changes
    this.pullerNodes.forEach( pullerNode => {
      pullerNode.focusedProperty.link( updateAnyPullerHasFocus );
    } );

    // Visibility: only show if NOT interacted AND a puller has focus
    Multilink.multilink(
      [ this.hasInteractedProperty, this.anyPullerHasFocusProperty ],

      // TODO: Remove types, see https://github.com/phetsims/forces-and-motion-basics/issues/431
      ( hasInteracted: boolean, anyPullerHasFocus: boolean ) => {
        this.visible = !hasInteracted && anyPullerHasFocus;
      }
    );

    // Listen to focus changes to update position when a puller gains focus
    this.pullerNodes.forEach( pullerNode => {
      pullerNode.focusedProperty.link( focused => {
        if ( focused && !this.hasInteractedProperty.value ) {
          this.updatePosition( pullerNode );
        }
      } );
    } );
  }

  private updatePosition( focusedPullerNode: PullerNode ): void {

    // Position the cue node over the appropriate side based on the focused puller
    const isLeftSide = focusedPullerNode.puller.type === 'blue';

    if ( isLeftSide ) {

      // Position over left side
      this.centerX = this.layoutBounds.width * 0.25;
    }
    else {

      // Position over right side  
      this.centerX = this.layoutBounds.width * 0.75;
    }

    this.top = 200;
  }

  public reset(): void {
    this.hasInteractedProperty.reset();
  }
}

forcesAndMotionBasics.register( 'NetForceGrabReleaseCueNode', NetForceGrabReleaseCueNode );