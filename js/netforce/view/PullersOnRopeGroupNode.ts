// Copyright 2025, University of Colorado Boulder

/**
 * PullersOnRopeGroupNode manages keyboard navigation for pullers that are attached to knots on the rope,
 * making them feel like a cohesive group while maintaining individual focus.
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

type PullersOnRopeGroupNodeOptions = SelfOptions & NodeOptions;

type FocusListener = ( focused: boolean ) => void;

export default class PullersOnRopeGroupNode extends Node {
  public readonly ropePullerNodes: PullerNode[] = [];
  private myGroupFocusHighlight: GroupHighlightPath;
  
  // Store listener references for cleanup
  private readonly focusListeners = new Map<PullerNode, FocusListener>();

  public constructor( model: NetForceModel, providedOptions: PullersOnRopeGroupNodeOptions ) {

    const options = optionize<PullersOnRopeGroupNodeOptions, SelfOptions, NodeOptions>()( {
      tagName: 'div',

      // ARIA attributes for the group - different for each side
      ariaRole: 'group',
      accessibleName: providedOptions.side === 'left' ? 'Blue Team Pullers on Rope' : 'Red Team Pullers on Rope',
      descriptionContent: 'Use arrow keys to navigate between pullers on the rope, then press Space or Enter to grab'
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
   * Add a puller node to the rope group
   */
  public addPullerNode( pullerNode: PullerNode, model: NetForceModel ): void {
    this.ropePullerNodes.push( pullerNode );
    this.addChild( pullerNode );

    // Sort pullers by position for consistent navigation order
    this.sortPullers();

    // Update group highlight now that we have children
    this.updateGroupHighlight();

    // Ensure the puller is focusable when added to rope group
    pullerNode.focusable = true;

    // Note: Focus listeners are now handled by PullerFocusManager
    // The complex focus management logic has been centralized

    // Set the keyboard strategy for rope pullers
    pullerNode.setKeyboardStrategy( new RopeKeyboardStrategy( this, model ) );
  }

  /**
   * Remove a puller node from the rope group (when it returns to toolbox)
   */
  public removePullerNode( pullerNode: PullerNode ): void {
    const index = this.ropePullerNodes.indexOf( pullerNode );
    if ( index !== -1 ) {
      this.ropePullerNodes.splice( index, 1 );
      this.removeChild( pullerNode );
      
      // CRITICAL: Unlink the focus listener to prevent conflicts
      const focusListener = this.focusListeners.get( pullerNode );
      if ( focusListener ) {
        pullerNode.focusedProperty.unlink( focusListener );
        this.focusListeners.delete( pullerNode );
        ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Unlinked focus listener for rope puller:', pullerNode.puller );
      }

      // Update group highlight after removal
      this.updateGroupHighlight();

      ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Removed puller from rope group:', pullerNode.puller );
    }
  }

  /**
   * Sort pullers by their x position for consistent left-to-right navigation
   */
  private sortPullers(): void {
    this.ropePullerNodes.sort( ( a, b ) => a.puller.positionProperty.value.x - b.puller.positionProperty.value.x );
  }

  /**
   * Update the group highlight to surround all rope pullers
   */
  private updateGroupHighlight(): void {
    if ( this.ropePullerNodes.length > 0 && this.localBounds.isFinite() ) {
      this.myGroupFocusHighlight.shape = Shape.bounds( this.localBounds.dilated( 15 ) );
    }
  }

  /**
   * Reset the focus state of all pullers in this rope group to ensure proper tab navigation after reset
   */
  public reset(): void {
    // Sort pullers by position to ensure consistent order after reset
    this.sortPullers();
    
    // Update the group highlight bounds after reset
    this.updateGroupHighlight();

    // Restore focusability to all rope pullers
    this.ropePullerNodes.forEach( pullerNode => {
      pullerNode.focusable = true;
    } );

    // If there are pullers on the rope, make the first one focusable but don't focus it
    if ( this.ropePullerNodes.length > 0 ) {
      // Reset focus state - make first puller focusable, others non-focusable initially
      this.ropePullerNodes.forEach( ( pullerNode, index ) => {
        pullerNode.focusable = index === 0;
      } );
    }
  }
}

/**
 * Keyboard strategy for pullers on the rope.
 * Handles navigation between rope pullers without focus management after drops.
 */
class RopeKeyboardStrategy implements PullerKeyboardStrategy {
  public constructor( private readonly groupNode: PullersOnRopeGroupNode, private readonly model: NetForceModel ) {}
  
  public navigateToPuller( currentPuller: PullerNode, direction: 'left' | 'right' | 'up' | 'down' ): PullerNode | null {
    const pullers = this.groupNode.ropePullerNodes;
    const currentIndex = pullers.indexOf( currentPuller );
    if ( currentIndex === -1 ) { return null; }
    
    ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Rope navigation mode - from puller at index:', currentIndex );
    const delta = ( direction === 'left' || direction === 'up' ) ? -1 : 1;
    const newIndex = currentIndex + delta;
    
    // Keep selection within bounds
    if ( newIndex >= 0 && newIndex < pullers.length ) {
      ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Navigated from rope index', currentIndex, 'to rope index', newIndex );
      return pullers[ newIndex ];
    }
    return null;
  }
  
  public onDropComplete( puller: PullerNode, droppedOnKnot: boolean, wasAlreadyOnRope?: boolean ): void {
    // Rope pullers don't need special focus behavior after drops
    // The automatic transfer system in NetForceScreenView will handle group transfers
    // based on knotProperty changes, so we don't manually remove pullers here
    if ( !droppedOnKnot ) {
      ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Returned rope puller to toolbox - transfer system will handle group changes' );
    }
  }
  
  public getPullerGroup(): PullerNode[] {
    return this.groupNode.ropePullerNodes;
  }
  
  public getAccessibilityMessage( action: 'grabbed' | 'dropped', location: 'knot' | 'toolbox' ): string {
    if ( action === 'grabbed' ) {
      return 'Grabbed';
    }
    else {
      return location === 'knot' ? 'Puller moved on rope' : 'Puller returned to toolbox';
    }
  }
}

forcesAndMotionBasics.register( 'PullersOnRopeGroupNode', PullersOnRopeGroupNode );