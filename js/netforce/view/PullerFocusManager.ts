// Copyright 2025, University of Colorado Boulder

/**
 * PullerFocusManager provides centralized focus management for puller nodes.
 * It recomputes focusability based on current state rather than maintaining complex listeners.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import ForcesAndMotionBasicsQueryParameters from '../../common/ForcesAndMotionBasicsQueryParameters.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import type PullerNode from './PullerNode.js';

/**
 * Represents the logical grouping of pullers for focus management
 */
type LogicalGroup = 'blue-toolbox' | 'red-toolbox' | 'blue-rope' | 'red-rope' | 'dragging';

export default class PullerFocusManager {
  private readonly allPullers: PullerNode[] = [];
  private isNavigating = false; // Flag to prevent interference during arrow navigation

  /**
   * Register a puller for focus management
   */
  public registerPuller( pullerNode: PullerNode ): void {
    this.allPullers.push( pullerNode );

    // Listen for focus changes on this puller
    pullerNode.focusedProperty.link( focused => {
      if ( focused ) {
        // This puller gained focus - recompute everyone's focusability
        this.recomputeAllFocusability();
      }
    } );

    // Also listen for mode changes that affect logical grouping
    pullerNode.puller.modeProperty.link( () => {
      // Mode changed - might affect which group this puller is in
      this.recomputeAllFocusability();
    } );
  }

  /**
   * Determine which logical group a puller belongs to based on its current state
   */
  private getLogicalGroup( pullerNode: PullerNode ): LogicalGroup {
    const mode = pullerNode.puller.modeProperty.get();
    const type = pullerNode.puller.type;

    // Dragging states don't participate in focus management
    if ( mode === 'mouseDragging' || mode === 'touchDragging' ) {
      return 'dragging';
    }

    // Home = toolbox
    if ( mode === 'home' ) {
      return type === 'blue' ? 'blue-toolbox' : 'red-toolbox';
    }

    // Attached to rope (leftKnot/rightKnot) or keyboard grabbed over rope
    if ( mode.startsWith( 'left' ) || mode.startsWith( 'right' ) || mode.startsWith( 'keyboardGrabbedOver' ) ) {
      return type === 'blue' ? 'blue-rope' : 'red-rope';
    }

    // Fallback
    return 'dragging';
  }

  /**
   * Set navigation flag to prevent interference during arrow navigation
   */
  public setNavigating( navigating: boolean ): void {
    this.isNavigating = navigating;
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

      if ( pullerGroup === 'dragging' ) {
        // Dragging pullers are never focusable via tab
        puller.focusable = false;
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
   * Get all pullers in a specific logical group (for debugging/testing)
   */
  public getPullersInGroup( group: LogicalGroup ): PullerNode[] {
    return this.allPullers.filter( puller => this.getLogicalGroup( puller ) === group );
  }
}

forcesAndMotionBasics.register( 'PullerFocusManager', PullerFocusManager );