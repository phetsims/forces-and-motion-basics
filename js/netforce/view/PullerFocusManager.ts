// Copyright 2025, University of Colorado Boulder

/**
 * Simplified PullerFocusManager that uses the new state system and handles auto-focus.
 * Responsibilities:
 * 1. Maintain single tab stop per logical group
 * 2. Handle auto-focus after drops
 * 3. React to state changes
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import ForcesAndMotionBasicsQueryParameters from '../../common/ForcesAndMotionBasicsQueryParameters.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import type PullerNode from './PullerNode.js';
import type PullerGroupNode from './PullerGroupNode.js';
import type PullersOnRopeGroupNode from './PullersOnRopeGroupNode.js';

/**
 * Represents the logical grouping of pullers for focus management
 */
type LogicalGroup = 'blue-toolbox' | 'red-toolbox' | 'blue-rope' | 'red-rope' | 'dragging';

export default class PullerFocusManager {
  private readonly allPullers: PullerNode[] = [];
  private isNavigating = false; // Flag to prevent interference during arrow navigation
  private isGrabbing = false; // Flag to prevent interference during grab operations
  
  // Groups that need their highlights updated after focusability changes
  private readonly groups: ( PullerGroupNode | PullersOnRopeGroupNode )[] = [];

  /**
   * Register a group for highlight updates
   */
  public registerGroup( group: PullerGroupNode | PullersOnRopeGroupNode ): void {
    this.groups.push( group );
  }

  /**
   * Register a puller for focus management
   */
  public registerPuller( pullerNode: PullerNode ): void {
    this.allPullers.push( pullerNode );

    // Listen for focus changes on this puller
    pullerNode.focusedProperty.link( focused => {
      if ( focused ) {
        // This puller gained focus - recompute everyone's focusability
        // But don't interfere if this puller is being grabbed
        if ( !( pullerNode.puller.isGrabbed() && pullerNode.puller.state.dragType === 'keyboard' ) ) {
          this.recomputeAllFocusability();
        }
      }
    } );

    // Listen for state changes (simpler than mode property)
    // Use lazyLink to avoid immediate firing during grab transitions
    pullerNode.puller.modeProperty.lazyLink( () => {
      // State changed - might affect which group this puller is in
      this.recomputeAllFocusability();
    } );
  }

  /**
   * Determine which logical group a puller belongs to using the new state system
   */
  private getLogicalGroup( pullerNode: PullerNode ): LogicalGroup {
    // Use the new simplified method from the puller
    return pullerNode.puller.getLogicalGroup();
  }

  /**
   * Set navigation flag to prevent interference during arrow navigation
   */
  public setNavigating( navigating: boolean ): void {
    this.isNavigating = navigating;
  }

  /**
   * Set grabbing flag to prevent interference during grab operations
   */
  public setGrabbing( grabbing: boolean ): void {
    this.isGrabbing = grabbing;
  }

  /**
   * Recompute focusability for all pullers based on current focus state
   */
  private recomputeAllFocusability(): void {
    // Don't interfere during arrow navigation
    if ( this.isNavigating ) {
      ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Skipping focus recomputation during navigation' );
      return;
    }

    // Don't interfere during grab operations
    if ( this.isGrabbing ) {
      ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Skipping focus recomputation during grab operation' );
      return;
    }

    // Don't interfere with keyboard-grabbed pullers that still have focus
    // This prevents losing focus during the grab-to-drop transition
    const keyboardGrabbedPuller = this.allPullers.find( puller =>
      puller.puller.isGrabbed() &&
      puller.puller.state.dragType === 'keyboard' &&
      puller.isFocused
    );
    
    if ( keyboardGrabbedPuller ) {
      ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Skipping focus recomputation - keyboard grabbed puller has focus:', keyboardGrabbedPuller.puller.size, keyboardGrabbedPuller.puller.type );
      return;
    }

    // ADDITIONAL GUARD: Don't interfere during the grab operation itself
    // Check if any puller is in the middle of a keyboard grab transition
    const pullerInGrabTransition = this.allPullers.find( puller =>
      puller.puller.state.dragType === 'keyboard' &&
      puller.puller.userControlledProperty.get()
    );
    
    if ( pullerInGrabTransition ) {
      ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Skipping focus recomputation - puller in grab transition:', pullerInGrabTransition.puller.size, pullerInGrabTransition.puller.type );
      return;
    }

    // Find which puller (if any) currently has focus
    const focusedPuller = this.allPullers.find( puller => puller.isFocused );

    ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Recomputing focusability. Focused puller:', focusedPuller?.puller || 'none' );

    if ( !focusedPuller ) {
      // No puller has focus - make first puller in each group focusable
      this.setInitialFocusability();
      return;
    }

    const focusedGroup = this.getLogicalGroup( focusedPuller );

    // Update focusability for all pullers
    this.allPullers.forEach( puller => {
      const pullerGroup = this.getLogicalGroup( puller );

      // SPECIAL CASE: Keyboard-grabbed pullers should always remain focusable and focused
      if ( puller.puller.isGrabbed() && puller.puller.state.dragType === 'keyboard' && puller === focusedPuller ) {
        puller.focusable = true;
        return; // Skip normal group logic for keyboard-grabbed focused pullers
      }

      if ( pullerGroup === 'dragging' ) {
        // Mouse/touch dragging pullers are not focusable via tab, but keyboard-grabbed pullers should remain focusable
        const dragType = puller.puller.state.dragType;
        puller.focusable = ( dragType === 'keyboard' );
      }
      else if ( pullerGroup === focusedGroup ) {
        // Same group as focused puller - only the focused one should be focusable
        puller.focusable = ( puller === focusedPuller );
      }
      else {
        // Different group - make focusable (this allows tabbing between groups)
        puller.focusable = this.isFirstInGroup( puller, pullerGroup );
      }
    } );

    ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Focusability updated. Focused group:', focusedGroup );
    
    // Group highlights are now static - no need to update them
  }

  /**
   * Check if a puller is the first (primary) puller in its logical group
   */
  private isFirstInGroup( pullerNode: PullerNode, group: LogicalGroup ): boolean {
    const pullersInGroup = this.allPullers.filter( puller =>
      this.getLogicalGroup( puller ) === group
    );

    // Sort by position for consistent ordering
    pullersInGroup.sort( ( a, b ) => a.puller.positionProperty.value.x - b.puller.positionProperty.value.x );

    return pullersInGroup[ 0 ] === pullerNode;
  }

  /**
   * Set initial focusability when no puller has focus
   */
  private setInitialFocusability(): void {
    const groups: LogicalGroup[] = [ 'blue-toolbox', 'red-toolbox', 'blue-rope', 'red-rope' ];

    groups.forEach( group => {
      const pullersInGroup = this.allPullers.filter( puller =>
        this.getLogicalGroup( puller ) === group
      );

      if ( pullersInGroup.length > 0 ) {
        // Sort and make first puller focusable
        pullersInGroup.sort( ( a, b ) => a.puller.positionProperty.value.x - b.puller.positionProperty.value.x );

        pullersInGroup.forEach( ( puller, index ) => {
          puller.focusable = ( index === 0 );
        } );
      }
    } );

    // Dragging pullers are never focusable
    this.allPullers.forEach( puller => {
      if ( this.getLogicalGroup( puller ) === 'dragging' ) {
        puller.focusable = false;
      }
    } );
  }

  /**
   * Reset focus management (e.g., after model reset)
   */
  public reset(): void {
    this.setInitialFocusability();
  }

  /**
   * Handle auto-focus after a puller is dropped
   * This is the key new functionality for the simplified system
   */
  public handlePullerDrop( droppedPuller: PullerNode ): void {
    const droppedGroup = this.getLogicalGroup( droppedPuller );
    const grabOrigin = droppedPuller.puller.state.grabOrigin;

    ForcesAndMotionBasicsQueryParameters.debugAltInput &&
    console.log( 'handlePullerDrop CALLED for puller:', droppedPuller.puller.size, droppedPuller.puller.type, 'group:', droppedGroup, 'grabOrigin:', grabOrigin );

    // If dropped in toolbox
    if ( droppedGroup.endsWith( '-toolbox' ) ) {

      // Always maintain focus on the puller that was dropped back to toolbox
      // This provides consistent UX regardless of grab origin tracking issues
      ForcesAndMotionBasicsQueryParameters.debugAltInput &&
      console.log( 'Maintaining focus on puller dropped to toolbox, origin:', grabOrigin );

      // Set focusable and focus, then recompute to ensure consistency
      droppedPuller.focusable = true;
      droppedPuller.focus();

      // Recompute to ensure other pullers have correct focusability
      // Do this after focusing to preserve the focus we just set
      this.recomputeAllFocusability();
      return; // Early return to avoid the general recompute below
    }
    // If dropped on rope, focus next available puller in source toolbox
    else if ( droppedGroup.endsWith( '-rope' ) ) {
      const sourceToolbox = droppedGroup.replace( '-rope', '-toolbox' ) as LogicalGroup;
      this.focusNextInGroup( sourceToolbox, droppedPuller );
      
      // Recompute to ensure other pullers have correct focusability
      // Do this after focusing to preserve the focus we just set
      this.recomputeAllFocusability();
      return; // Early return to avoid the general recompute below
    }

    // Always recompute after drop to ensure consistency
    this.recomputeAllFocusability();
  }

  /**
   * Focus the next available puller in a specific group
   */
  private focusNextInGroup( group: LogicalGroup, excludePuller?: PullerNode ): void {
    const pullersInGroup = this.allPullers.filter( puller =>
      this.getLogicalGroup( puller ) === group && puller !== excludePuller
    );

    ForcesAndMotionBasicsQueryParameters.debugAltInput &&
    console.log( 'focusNextInGroup called for group:', group, 'found pullers:', pullersInGroup.length );
    
    ForcesAndMotionBasicsQueryParameters.debugAltInput &&
    console.log( 'All pullers and their groups:' );
    
    ForcesAndMotionBasicsQueryParameters.debugAltInput &&
    this.allPullers.forEach( puller => {
      console.log( `  ${puller.puller.size} ${puller.puller.type}: group=${this.getLogicalGroup( puller )}, excluded=${puller === excludePuller}` );
    } );

    if ( pullersInGroup.length > 0 ) {
      // Sort by position for consistent order
      pullersInGroup.sort( ( a, b ) => a.puller.positionProperty.value.x - b.puller.positionProperty.value.x );

      const nextPuller = pullersInGroup[ 0 ];
      
      ForcesAndMotionBasicsQueryParameters.debugAltInput &&
      console.log( 'Setting focusable=true and calling focus() on:', nextPuller.puller.size, nextPuller.puller.type );
      
      nextPuller.focusable = true;
      nextPuller.focus();

      ForcesAndMotionBasicsQueryParameters.debugAltInput &&
      console.log( 'Auto-focused next puller in group', group, ':', nextPuller.puller.size, nextPuller.puller.type );
    }
    else {
      ForcesAndMotionBasicsQueryParameters.debugAltInput &&
      console.log( 'No pullers found in group', group, 'to focus on' );
    }
  }

  /**
   * Handle keyboard navigation between pullers (called from PullerNode)
   */
  public handleArrowNavigation( currentPuller: PullerNode, direction: 'left' | 'right' | 'up' | 'down' ): void {
    // Only handle navigation when not grabbed
    if ( currentPuller.puller.isGrabbed() ) {
      return; // Let individual puller handle knot cycling
    }

    const currentGroup = this.getLogicalGroup( currentPuller );
    const pullersInGroup = this.allPullers.filter( puller =>
      this.getLogicalGroup( puller ) === currentGroup
    );

    // Sort by position
    pullersInGroup.sort( ( a, b ) => a.puller.positionProperty.value.x - b.puller.positionProperty.value.x );

    const currentIndex = pullersInGroup.indexOf( currentPuller );
    if ( currentIndex === -1 ) { return; }

    const delta = ( direction === 'left' || direction === 'up' ) ? -1 : 1;
    const newIndex = currentIndex + delta;

    // Keep selection within bounds
    if ( newIndex >= 0 && newIndex < pullersInGroup.length ) {
      const nextPuller = pullersInGroup[ newIndex ];

      // Prevent focus manager interference during navigation
      this.setNavigating( true );

      // Make current puller non-focusable and next puller focusable
      currentPuller.focusable = false;
      nextPuller.focusable = true;
      nextPuller.focus();

      // Re-enable focus manager
      this.setNavigating( false );

      ForcesAndMotionBasicsQueryParameters.debugAltInput &&
      console.log( `Arrow navigation: ${currentPuller.puller.size} ${currentPuller.puller.type} → ${nextPuller.puller.size} ${nextPuller.puller.type}` );
    }
  }

  /**
   * Get all pullers in a specific logical group (for debugging/testing)
   */
  public getPullersInGroup( group: LogicalGroup ): PullerNode[] {
    return this.allPullers.filter( puller => this.getLogicalGroup( puller ) === group );
  }
}

forcesAndMotionBasics.register( 'PullerFocusManager', PullerFocusManager );