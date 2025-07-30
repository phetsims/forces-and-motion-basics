// Copyright 2025, University of Colorado Boulder

/**
 * PullerGroupNode manages keyboard navigation for a group of pullers, allowing them to be a single tab stop
 * with arrow key navigation between individual pullers.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Shape from '../../../../kite/js/Shape.js';
import optionize from '../../../../phet-core/js/optionize.js';
import GroupHighlightPath from '../../../../scenery/js/accessibility/GroupHighlightPath.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import ForcesAndMotionBasicsQueryParameters from '../../common/ForcesAndMotionBasicsQueryParameters.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import NetForceModel from '../model/NetForceModel.js';
import PullerNode from './PullerNode.js';

type SelfOptions = {
  // Which side this group represents
  side: 'left' | 'right';
};

type PullerGroupNodeOptions = SelfOptions & NodeOptions;

type Created = ( focused: boolean ) => void;

export default class PullerGroupNode extends Node {
  public readonly pullerNodes: PullerNode[] = [];

  // Store listener references for cleanup
  private readonly focusListeners = new Map<PullerNode, Created>();

  public constructor( model: NetForceModel, toolboxBounds: Bounds2, providedOptions: PullerGroupNodeOptions ) {

    const options = optionize<PullerGroupNodeOptions, SelfOptions, NodeOptions>()( {
      tagName: 'div',

      // ARIA attributes for the group
      ariaRole: 'group'
      // accessibleName will be passed through providedOptions
    }, providedOptions );

    super( options );

    this.groupFocusHighlight = new GroupHighlightPath(
      Shape.bounds( new Bounds2( toolboxBounds.minX, toolboxBounds.minY, toolboxBounds.maxX, toolboxBounds.maxY ).dilated( 10 ) ), {
        innerLineWidth: 5
      } );
  }

  /**
   * Add a puller node to this group
   */
  public addPullerNode( pullerNode: PullerNode, model: NetForceModel ): void {
    this.pullerNodes.push( pullerNode );
    this.addChild( pullerNode );

    // Sort pullers by position for consistent navigation order
    this.sortPullers();

    // Ensure the puller is focusable when added to toolbox group (if not attached to knot)
    if ( pullerNode.puller.knotProperty.get() === null ) {
      pullerNode.focusable = true;
    }

  }

  /**
   * Remove a puller node from this group (when it moves to rope)
   */
  public removePullerNode( pullerNode: PullerNode ): void {
    const index = this.pullerNodes.indexOf( pullerNode );
    if ( index !== -1 ) {
      this.pullerNodes.splice( index, 1 );
      this.removeChild( pullerNode );

      // CRITICAL: Unlink the focus listener to prevent conflicts
      const focusListener = this.focusListeners.get( pullerNode );
      if ( focusListener ) {
        pullerNode.focusedProperty.unlink( focusListener );
        this.focusListeners.delete( pullerNode );
        ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Unlinked focus listener for puller:', pullerNode.puller );
      }

      ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Removed puller from toolbox group:', pullerNode.puller );
    }
  }

  /**
   * Sort pullers by their x position for consistent left-to-right navigation
   */
  private sortPullers(): void {
    this.pullerNodes.sort( ( a, b ) => a.puller.positionProperty.value.x - b.puller.positionProperty.value.x );
  }


  /**
   * PHASE I: After a puller is successfully dropped from toolbox to rope,
   * focus the next available puller in the same toolbox
   */
  public focusNextPullerInToolbox( droppedPullerNode: PullerNode ): void {
    // Find pullers still in the toolbox (not attached to knots)
    const pullersInToolbox = this.pullerNodes.filter( pullerNode =>
      pullerNode.puller.knotProperty.get() === null && pullerNode !== droppedPullerNode
    );

    if ( pullersInToolbox.length > 0 ) {
      // Focus the first available puller in the toolbox
      const nextPuller = pullersInToolbox[ 0 ];

      // Make sure the next puller is focusable and focus it
      nextPuller.focusable = true;
      nextPuller.focus();

      ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Focused next puller in toolbox:', nextPuller.puller );
    }
    else {
      ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'No more pullers in toolbox to focus' );
    }
  }

  /**
   * Reset the focus state of all pullers in this group to ensure proper tab navigation after reset
   */
  public reset(): void {
    // Sort pullers by position to ensure consistent order after reset
    this.sortPullers();

    // Restore focusability to all pullers in the toolbox (not attached to knots)
    this.pullerNodes.forEach( pullerNode => {
      if ( pullerNode.puller.knotProperty.get() === null ) {
        pullerNode.focusable = true;
      }
    } );

    // If there are pullers in the toolbox, make the first one focusable but don't focus it
    const pullersInToolbox = this.pullerNodes.filter( pullerNode =>
      pullerNode.puller.knotProperty.get() === null
    );

    if ( pullersInToolbox.length > 0 ) {
      // Reset focus state - make first puller focusable, others non-focusable initially
      pullersInToolbox.forEach( ( pullerNode, index ) => {
        pullerNode.focusable = index === 0;
      } );
    }
  }
}


forcesAndMotionBasics.register( 'PullerGroupNode', PullerGroupNode );