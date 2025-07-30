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
import Puller from '../model/Puller.js';
import PullerMode from '../model/PullerMode.js';
import PullerModeFactory from '../model/PullerModeFactory.js';
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

    if ( currentMode.isKeyboardGrabbedOverHome() ) {
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
    const newMode = this.getModeForWaypoint( targetWaypoint, puller );
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

    if ( currentMode.isAttached() ) {
      // Convert attached mode to keyboard grabbed mode
      const side = currentMode.getAttachedSide();
      const knot = currentMode.getAttachedKnotIndex();
      if ( side && knot !== null ) {
        newMode = PullerModeFactory.keyboardGrabbedOverKnot( side, knot );
      }
      else {
        newMode = PullerModeFactory.keyboardGrabbedOverHome();
      }
    }
    else {
      // Was in toolbox - start with first available knot or home
      const availableKnots = model.knots.filter( knot =>
        knot.type === puller.type && model.getPuller( knot ) === null
      );

      if ( availableKnots.length > 0 ) {
        newMode = this.getModeForWaypoint( availableKnots[ 0 ], puller );
      }
      else {
        newMode = PullerModeFactory.keyboardGrabbedOverHome();
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

    if ( currentMode.isKeyboardGrabbedOverHome() ) {
      // Drop at home (toolbox)
      newMode = PullerModeFactory.home();
      accessibilityResponse = `${puller.size} ${puller.type} puller returned to toolbox.`;
    }
    else if ( currentMode.isKeyboardGrabbedOverKnot() ) {
      // Drop at knot - convert keyboard grabbed to attached
      const side = currentMode.getKeyboardGrabbedKnotSide();
      const knot = currentMode.getKeyboardGrabbedKnotIndex();
      if ( side && knot !== null ) {
        newMode = PullerModeFactory.attachedToKnot( side, knot );

        const knotObject = this.getKnotFromMode( currentMode, model );
        const knotDescription = knotObject ? this.getKnotDescription( knotObject, model ) : 'knot';
        accessibilityResponse = `${puller.size} ${puller.type} puller attached to ${knotDescription}.`;
      }
      else {
        // Fallback to home
        newMode = PullerModeFactory.home();
        accessibilityResponse = `${puller.size} ${puller.type} puller returned to toolbox.`;
      }
    }
    else {
      // Fallback to home
      newMode = PullerModeFactory.home();
      accessibilityResponse = `${puller.size} ${puller.type} puller returned to toolbox.`;
    }

    // Clear grab origin
    puller.clearGrabOrigin();

    // Update mode
    puller.modeProperty.set( newMode );

    // Emit dropped event
    // puller.droppedEmitter.emit( 'keyboard' );

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
    puller.modeProperty.set( PullerModeFactory.keyboardGrabbedOverHome() );

    return {
      handled: true,
      accessibilityResponse: `${puller.size} ${puller.type} puller returned to toolbox.`,
      shouldUpdatePosition: true,
      shouldUpdateImage: true
    };
  }

  /**
   * Get knot from a structured mode that contains knot information
   */
  private static getKnotFromMode( mode: PullerMode, model: NetForceModel ): Knot | null {
    if ( mode.isAttached() ) {
      const side = mode.getAttachedSide();
      const knot = mode.getAttachedKnotIndex();
      if ( side && knot !== null ) {
        const filteredKnots = model.knots.filter( k =>
          k.type === ( side === 'left' ? 'blue' : 'red' )
        );
        return filteredKnots[ knot ] || null;
      }
    }

    if ( mode.isKeyboardGrabbedOverKnot() ) {
      const side = mode.getKeyboardGrabbedKnotSide();
      const knot = mode.getKeyboardGrabbedKnotIndex();
      if ( side && knot !== null ) {
        const filteredKnots = model.knots.filter( k =>
          k.type === ( side === 'left' ? 'blue' : 'red' )
        );
        return filteredKnots[ knot ] || null;
      }
    }

    return null;
  }

  /**
   * Get mode for a specific waypoint (knot or home)
   */
  private static getModeForWaypoint( waypoint: Knot | null, puller: Puller ): PullerMode {
    if ( waypoint === null ) {
      return PullerModeFactory.keyboardGrabbedOverHome();
    }

    // Get the knot index from the model knots array
    const sameTypeKnots = puller.model.knots.filter( k => k.type === waypoint.type );
    const knotIndex = sameTypeKnots.indexOf( waypoint );

    const side = waypoint.type === 'blue' ? 'left' : 'right';

    return PullerModeFactory.keyboardGrabbedOverKnot( side, knotIndex );
  }

  /**
   * Get human-readable description of a knot's position
   */
  private static getKnotDescription( knot: Knot, model: NetForceModel ): string {
    const sameTypeKnots = model.knots.filter( k => k.type === knot.type );
    const index = sameTypeKnots.indexOf( knot );
    const side = knot.type === 'blue' ? 'left' : 'right';
    return `${side} knot ${index}`;
  }
}

forcesAndMotionBasics.register( 'PullerKeyboardSupport', PullerKeyboardSupport );