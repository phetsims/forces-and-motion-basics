// Copyright 2025, University of Colorado Boulder

/**
 * PullerKeyboardSupport centralizes all keyboard interaction logic for pullers.
 * This class handles keyboard navigation, grab/drop operations, and state transitions,
 * using modeProperty as the single source of truth.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import Knot from '../model/Knot.js';
import NetForceModel from '../model/NetForceModel.js';
import Puller, { PullerMode } from '../model/Puller.js';
import NetForceHotkeyData from '../NetForceHotkeyData.js';
import PullerNode from './PullerNode.js';

/**
 * Represents the result of a keyboard action
 */
type KeyboardActionResult = {
  handled: boolean;
  accessibilityResponse?: string;
  shouldUpdatePosition?: boolean;
  shouldUpdateImage?: boolean;
  shouldFocus?: boolean;
};

export default class PullerKeyboardSupport {
  
  /**
   * Handle keyboard input for a puller
   */
  public static handleKeyboardInput(
    pullerNode: PullerNode,
    model: NetForceModel,
    keysPressed: string
  ): KeyboardActionResult {
    
    const puller = pullerNode.puller;
    const isGrabbed = puller.isGrabbed();
    
    // NAVIGATION (Arrow Keys)
    if ( NetForceHotkeyData.pullerNode.navigation.hasKeyStroke( keysPressed as OneKeyStroke ) ) {
      if ( isGrabbed ) {
        return this.handleGrabbedNavigation( pullerNode, model, keysPressed );
      }
 else {
        return this.handleNormalNavigation( pullerNode, model, keysPressed );
      }
    }
    
    // GRAB/DROP (Enter/Space)
    if ( NetForceHotkeyData.pullerNode.grabOrDrop.hasKeyStroke( keysPressed as OneKeyStroke ) ) {
      if ( isGrabbed ) {
        return this.handleDrop( pullerNode, model );
      }
 else {
        return this.handleGrab( pullerNode, model );
      }
    }
    
    // CANCEL (Escape)
    if ( NetForceHotkeyData.pullerNode.cancelInteraction.hasKeyStroke( keysPressed as OneKeyStroke ) ) {
      if ( isGrabbed ) {
        return this.handleCancel( pullerNode, model );
      }
    }
    
    // RETURN TO TOOLBOX (Delete/Backspace)
    if ( NetForceHotkeyData.pullerNode.returnToToolbox.hasKeyStroke( keysPressed as OneKeyStroke ) ) {
      if ( isGrabbed ) {
        return this.handleReturnToToolbox( pullerNode, model );
      }
    }
    
    return { handled: false };
  }
  
  /**
   * Handle navigation when puller is grabbed - cycle through knots and home position
   */
  private static handleGrabbedNavigation(
    pullerNode: PullerNode,
    model: NetForceModel,
    keysPressed: string
  ): KeyboardActionResult {
    
    // Only left/right keys navigate when grabbed
    if ( keysPressed !== 'arrowLeft' && keysPressed !== 'arrowRight' ) {
      return { handled: true }; // Handled but no action for up/down
    }
    
    const puller = pullerNode.puller;
    const direction = keysPressed === 'arrowLeft' ? -1 : 1;
    
    // Get available knots for this puller's type
    const availableKnots = model.knots.filter( knot =>
      knot.type === puller.type && model.getPuller( knot ) === null
    );
    
    // Create navigation waypoints: [knot1, knot2, ..., knotN, HOME]
    const waypoints: ( Knot | null )[] = [ ...availableKnots, null ]; // null = home position
    
    if ( waypoints.length <= 1 ) {
      return { handled: true }; // No navigation possible
    }
    
    // Find current waypoint index based on current mode
    const currentMode = puller.modeProperty.get();
    let currentWaypointIndex = 0;
    
    if ( currentMode === 'keyboardGrabbedOverHome' ) {
      currentWaypointIndex = waypoints.length - 1; // Home is last waypoint
    }
 else {
      // Find knot from current mode
      const currentKnot = this.getKnotFromMode( currentMode, model );
      currentWaypointIndex = currentKnot ? availableKnots.indexOf( currentKnot ) : 0;
      if ( currentWaypointIndex === -1 ) {
        currentWaypointIndex = 0; // Default to first knot
      }
    }
    
    // Navigate to next/previous waypoint
    const nextIndex = ( currentWaypointIndex + direction + waypoints.length ) % waypoints.length;
    const targetWaypoint = waypoints[ nextIndex ];
    
    // Update puller mode based on target waypoint
    const newMode = this.getModeForWaypoint( targetWaypoint, puller, model );
    puller.modeProperty.set( newMode );
    
    // Generate accessibility response
    const accessibilityResponse = targetWaypoint === null
      ? 'Over return to toolbox position'
      : `Over ${this.getKnotDescription( targetWaypoint, model )}`;
    
    return {
      handled: true,
      accessibilityResponse: accessibilityResponse,
      shouldUpdatePosition: true,
      shouldUpdateImage: true
    };
  }
  
  /**
   * Handle navigation when puller is not grabbed - navigate between pullers in same group
   */
  private static handleNormalNavigation(
    pullerNode: PullerNode,
    model: NetForceModel,
    keysPressed: string
  ): KeyboardActionResult {
    
    // This will be handled by the focus manager system
    // For now, just indicate it's handled
    return { handled: true };
  }
  
  /**
   * Handle grab action
   */
  private static handleGrab(
    pullerNode: PullerNode,
    model: NetForceModel
  ): KeyboardActionResult {
    
    const puller = pullerNode.puller;
    
    // Store current state for potential cancel operation
    puller.storeGrabOrigin();
    
    // Determine initial grabbed mode based on current position
    const currentMode = puller.modeProperty.get();
    let newMode: PullerMode;
    
    if ( currentMode.startsWith( 'attachedTo' ) ) {
      // Convert attached mode to keyboard grabbed mode
      const knotPart = currentMode.replace( 'attachedTo', '' );
      newMode = `keyboardGrabbedOver${knotPart}` as PullerMode;
    }
 else {
      // Was in toolbox - start with first available knot or home
      const availableKnots = model.knots.filter( knot =>
        knot.type === puller.type && model.getPuller( knot ) === null
      );
      
      if ( availableKnots.length > 0 ) {
        newMode = this.getModeForWaypoint( availableKnots[ 0 ], puller, model );
      }
 else {
        newMode = 'keyboardGrabbedOverHome';
      }
    }
    
    puller.modeProperty.set( newMode );
    
    return {
      handled: true,
      accessibilityResponse: 'Grabbed',
      shouldUpdatePosition: true,
      shouldUpdateImage: true,
      shouldFocus: true
    };
  }
  
  /**
   * Handle drop action
   */
  private static handleDrop(
    pullerNode: PullerNode,
    model: NetForceModel
  ): KeyboardActionResult {
    
    const puller = pullerNode.puller;
    const currentMode = puller.modeProperty.get();
    
    // Determine where to drop based on current mode
    let newMode: PullerMode;
    let accessibilityResponse: string;
    
    if ( currentMode === 'keyboardGrabbedOverHome' ) {
      // Drop at home (toolbox)
      newMode = 'home';
      accessibilityResponse = `${puller.size} ${puller.type} puller returned to toolbox.`;
    }
 else {
      // Drop at knot - convert keyboardGrabbedOverXKnotY to attachedToXKnotY
      const knotPart = currentMode.replace( 'keyboardGrabbedOver', '' );
      newMode = `attachedTo${knotPart}` as PullerMode;
      
      const knot = this.getKnotFromMode( currentMode, model );
      const knotDescription = knot ? this.getKnotDescription( knot, model ) : 'knot';
      accessibilityResponse = `${puller.size} ${puller.type} puller attached to ${knotDescription}.`;
    }
    
    // Clear grab origin
    puller.clearGrabOrigin();
    
    // Update mode
    puller.modeProperty.set( newMode );
    
    // Emit dropped event
    puller.droppedEmitter.emit( 'keyboard' );
    
    return {
      handled: true,
      accessibilityResponse: accessibilityResponse,
      shouldUpdatePosition: true,
      shouldUpdateImage: true
    };
  }
  
  /**
   * Handle cancel action - return to original position
   */
  private static handleCancel(
    pullerNode: PullerNode,
    model: NetForceModel
  ): KeyboardActionResult {
    
    const puller = pullerNode.puller;
    
    // Restore to grab origin
    puller.cancelGrab();
    
    return {
      handled: true,
      accessibilityResponse: `Cancelled. ${puller.size} ${puller.type} puller returned to original position.`,
      shouldUpdatePosition: true,
      shouldUpdateImage: true
    };
  }
  
  /**
   * Handle return to toolbox action
   */
  private static handleReturnToToolbox(
    pullerNode: PullerNode,
    model: NetForceModel
  ): KeyboardActionResult {
    
    const puller = pullerNode.puller;
    
    // Return to toolbox
    puller.modeProperty.set( 'keyboardGrabbedOverHome' );
    
    return {
      handled: true,
      accessibilityResponse: `${puller.size} ${puller.type} puller returned to toolbox.`,
      shouldUpdatePosition: true,
      shouldUpdateImage: true
    };
  }
  
  /**
   * Get knot from a mode string that contains knot information
   */
  private static getKnotFromMode( mode: PullerMode, model: NetForceModel ): Knot | null {
    // Extract knot info from mode (e.g., 'keyboardGrabbedOverLeftKnot1' -> left, index 0)
    const match = mode.match( /(Left|Right)Knot(\d+)/i );
    if ( !match ) {return null;}
    
    const isLeft = match[ 1 ].toLowerCase() === 'left';
    const knotIndex = parseInt( match[ 2 ], 10 ) - 1; // Convert 1-based to 0-based
    
    const filteredKnots = model.knots.filter( knot =>
      knot.type === ( isLeft ? 'blue' : 'red' )
    );
    
    return filteredKnots[ knotIndex ] || null;
  }
  
  /**
   * Get mode for a specific waypoint (knot or home)
   */
  private static getModeForWaypoint( waypoint: Knot | null, puller: Puller, model: NetForceModel ): PullerMode {
    if ( waypoint === null ) {
      return 'keyboardGrabbedOverHome';
    }
    
    // Get the knot index from the model knots array
    const sameTypeKnots = model.knots.filter( k => k.type === waypoint.type );
    const knotIndex = sameTypeKnots.indexOf( waypoint );
    const knotNumber = knotIndex + 1; // Convert to 1-based indexing
    
    const isLeft = waypoint.type === 'blue';
    const side = isLeft ? 'Left' : 'Right';
    
    return `keyboardGrabbedOver${side}Knot${knotNumber}` as PullerMode;
  }
  
  /**
   * Get human-readable description of a knot's position
   */
  private static getKnotDescription( knot: Knot, model: NetForceModel ): string {
    const sameTypeKnots = model.knots.filter( k => k.type === knot.type );
    const index = sameTypeKnots.indexOf( knot );
    const side = knot.type === 'blue' ? 'left' : 'right';
    return `${side} knot ${index + 1}`;
  }
}

forcesAndMotionBasics.register( 'PullerKeyboardSupport', PullerKeyboardSupport );