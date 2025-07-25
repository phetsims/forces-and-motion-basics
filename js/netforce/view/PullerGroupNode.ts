// Copyright 2025, University of Colorado Boulder

/**
 * PullerGroupNode manages keyboard navigation for a group of pullers, allowing them to be a single tab stop
 * with arrow key navigation between individual pullers.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Shape from '../../../../kite/js/Shape.js';
import optionize from '../../../../phet-core/js/optionize.js';
import GroupHighlightPath from '../../../../scenery/js/accessibility/GroupHighlightPath.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import ForcesAndMotionBasicsQueryParameters from '../../common/ForcesAndMotionBasicsQueryParameters.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import NetForceModel from '../model/NetForceModel.js';
import PullerNode, { type PullerKeyboardStrategy } from './PullerNode.js';

type SelfOptions = {
  // Which side this group represents
  side: 'left' | 'right';
};

type PullerGroupNodeOptions = SelfOptions & NodeOptions;

export default class PullerGroupNode extends Node {
  public readonly pullerNodes: PullerNode[] = [];
  private myGroupFocusHighlight: GroupHighlightPath;

  public constructor( model: NetForceModel, providedOptions: PullerGroupNodeOptions ) {

    const options = optionize<PullerGroupNodeOptions, SelfOptions, NodeOptions>()( {
      tagName: 'div',

      // ARIA attributes for the group
      ariaRole: 'group',
      accessibleName: providedOptions.side === 'left' ? 'Blue Team Pullers' : 'Red Team Pullers',
      descriptionContent: 'Use arrow keys to select a puller, then press Space or Enter to grab'
    }, providedOptions );

    super( options );

    // Initialize with a minimal highlight that will be updated when pullers are added
    const groupHighlightPath = new GroupHighlightPath( Shape.rectangle( 0, 0, 1, 1 ), {
      innerLineWidth: 5
    } );
    this.groupFocusHighlight = groupHighlightPath;
    this.myGroupFocusHighlight = groupHighlightPath;
  }

  /**
   * Add a puller node to this group
   */
  public addPullerNode( pullerNode: PullerNode, model: NetForceModel ): void {
    this.pullerNodes.push( pullerNode );
    this.addChild( pullerNode );

    // Sort pullers by position for consistent navigation order
    this.sortPullers();

    // Update group highlight now that we have children
    this.updateGroupHighlight();

    pullerNode.focusedProperty.lazyLink( focused => {
      if ( focused ) {
        this.pullerNodes.forEach( node => {
          if ( node !== pullerNode ) {
            node.focusable = false; // Make other pullers non-focusable
          }
        } );
      }
      else {
        // When this puller loses focus, restore focusability to all pullers in the toolbox
        // (only those not attached to knots)
        this.pullerNodes.forEach( node => {
          if ( node.puller.knotProperty.get() === null ) {
            node.focusable = true;
          }
        } );
      }
    } );

    // Set the keyboard strategy for toolbox pullers
    pullerNode.setKeyboardStrategy( new ToolboxKeyboardStrategy( this, model ) );
  }

  /**
   * Remove a puller node from this group (when it moves to rope)
   */
  public removePullerNode( pullerNode: PullerNode ): void {
    const index = this.pullerNodes.indexOf( pullerNode );
    if ( index !== -1 ) {
      this.pullerNodes.splice( index, 1 );
      this.removeChild( pullerNode );

      // Update group highlight after removal
      this.updateGroupHighlight();

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
   * Update the group highlight to surround all pullers
   */
  private updateGroupHighlight(): void {
    if ( this.pullerNodes.length > 0 && this.localBounds.isFinite() ) {
      this.myGroupFocusHighlight.shape = Shape.bounds( this.localBounds.dilated( 15 ) );
    }
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

/**
 * Keyboard strategy for pullers in the toolbox.
 * Handles navigation between toolbox pullers and focus management after drops.
 */
class ToolboxKeyboardStrategy implements PullerKeyboardStrategy {
  public constructor( private readonly groupNode: PullerGroupNode, private readonly model: NetForceModel ) {}
  
  public navigateToPuller( currentPuller: PullerNode, direction: 'left' | 'right' | 'up' | 'down' ): PullerNode | null {
    const pullers = this.groupNode.pullerNodes;
    const currentIndex = pullers.indexOf( currentPuller );
    if ( currentIndex === -1 ) { return null; }
    
    ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Navigation mode - from puller at index:', currentIndex );
    const delta = ( direction === 'left' || direction === 'up' ) ? -1 : 1;
    const newIndex = currentIndex + delta;
    
    // Keep selection within bounds
    if ( newIndex >= 0 && newIndex < pullers.length ) {
      ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Navigated from index', currentIndex, 'to index', newIndex );
      return pullers[ newIndex ];
    }
    return null;
  }
  
  public onDropComplete( puller: PullerNode, droppedOnKnot: boolean, wasAlreadyOnRope?: boolean ): void {
    ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'ToolboxKeyboardStrategy.onDropComplete called:', { puller: puller.puller, droppedOnKnot: droppedOnKnot, wasAlreadyOnRope: wasAlreadyOnRope } );
    
    if ( droppedOnKnot ) {
      // PHASE I: Puller was successfully dropped from toolbox to rope
      // Focus the next available puller in the toolbox
      ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'PHASE I: Focusing next puller in toolbox after successful rope drop' );
      this.groupNode.focusNextPullerInToolbox( puller );
    }
    else {
      // Returned to toolbox (HOME drop)
      // For ALL HOME drops (regardless of origin), keep focus on the same puller
      // since the user cycled through all knots and returned to toolbox intentionally
      ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'HOME drop: Keeping focus on same puller (wasAlreadyOnRope:', wasAlreadyOnRope, ')' );
      // Keep focus on the current puller (don't change focus)
    }
  }
  
  public getPullerGroup(): PullerNode[] {
    return this.groupNode.pullerNodes;
  }
  
  public getAccessibilityMessage( action: 'grabbed' | 'dropped', location: 'knot' | 'toolbox' ): string {
    if ( action === 'grabbed' ) {
      return 'Grabbed';
    }
    else {
      return location === 'knot' ? 'Puller attached to rope' : 'Puller returned to toolbox';
    }
  }
}

forcesAndMotionBasics.register( 'PullerGroupNode', PullerGroupNode );