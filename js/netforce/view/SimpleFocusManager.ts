// Copyright 2025, University of Colorado Boulder

/**
 * SimpleFocusManager provides basic focus management for pullers.
 * This replaces the complex PullerFocusManager with a much simpler system
 * that works with the new modeProperty-based state management.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import NetForceModel from '../model/NetForceModel.js';
import PullerNode from './PullerNode.js';

export default class SimpleFocusManager {
  private readonly allPullers: PullerNode[] = [];

  /**
   * Register a puller for focus management
   */
  public registerPuller( pullerNode: PullerNode ): void {
    this.allPullers.push( pullerNode );
  }

  /**
   * Handle auto-focus after a puller is dropped
   */
  public handlePullerDrop( droppedPuller: PullerNode, model: NetForceModel ): void {
    const droppedPullerAttached = droppedPuller.puller.getKnot() !== null;
    
    if ( !droppedPullerAttached ) {
      // Puller was dropped in toolbox - maintain focus on it
      droppedPuller.focusable = true;
      droppedPuller.focus();
    }
 else {
      // Puller was dropped on rope - focus next available puller in same type toolbox
      this.focusNextInToolbox( droppedPuller, model );
    }
  }

  /**
   * Focus the next available puller in the toolbox of the same type
   */
  private focusNextInToolbox( droppedPuller: PullerNode, model: NetForceModel ): void {
    // Find pullers of the same type that are still in the toolbox
    const availablePullers = this.allPullers.filter( pullerNode =>
      pullerNode.puller.type === droppedPuller.puller.type &&
      pullerNode.puller.getKnot() === null &&
      pullerNode !== droppedPuller
    );

    if ( availablePullers.length > 0 ) {
      // Sort by position for consistent order
      availablePullers.sort( ( a, b ) =>
        a.puller.positionProperty.value.x - b.puller.positionProperty.value.x
      );
      
      const nextPuller = availablePullers[ 0 ];
      nextPuller.focusable = true;
      nextPuller.focus();
    }
  }

  /**
   * Handle arrow navigation between pullers (simple implementation)
   */
  public handleArrowNavigation( currentPuller: PullerNode, direction: 'left' | 'right' | 'up' | 'down' ): void {
    // Only handle navigation when not grabbed
    if ( currentPuller.puller.isGrabbed() ) {
      return; // Keyboard support handles knot cycling
    }

    // Get pullers in the same logical group (toolbox vs rope, same type)
    const currentAttached = currentPuller.puller.getKnot() !== null;
    const currentType = currentPuller.puller.type;
    
    const groupPullers = this.allPullers.filter( pullerNode =>
      pullerNode.puller.type === currentType &&
      ( pullerNode.puller.getKnot() !== null ) === currentAttached
    );

    if ( groupPullers.length <= 1 ) {
      return; // No navigation possible
    }

    // Sort by position
    groupPullers.sort( ( a, b ) =>
      a.puller.positionProperty.value.x - b.puller.positionProperty.value.x
    );

    const currentIndex = groupPullers.indexOf( currentPuller );
    if ( currentIndex === -1 ) {return;}

    const delta = ( direction === 'left' || direction === 'up' ) ? -1 : 1;
    const newIndex = ( currentIndex + delta + groupPullers.length ) % groupPullers.length;
    const nextPuller = groupPullers[ newIndex ];

    // Update focus
    currentPuller.focusable = false;
    nextPuller.focusable = true;
    nextPuller.focus();
  }

  /**
   * Reset focus management (e.g., after model reset)
   */
  public reset(): void {
    // Make all pullers in toolbox focusable, others not focusable
    this.allPullers.forEach( pullerNode => {
      pullerNode.focusable = pullerNode.puller.getKnot() === null;
    } );
  }
}

forcesAndMotionBasics.register( 'SimpleFocusManager', SimpleFocusManager );