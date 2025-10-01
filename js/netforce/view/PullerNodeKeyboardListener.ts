// Copyright 2025, University of Colorado Boulder

/**
 * PullerNodeKeyboardListener encapsulates keyboard interactions for PullerNodes.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import PullerMode from '../model/PullerMode.js';
import NetForceHotkeyData from './NetForceHotkeyData.js';
import PullerNode from './PullerNode.js';

export default class PullerNodeKeyboardListener extends KeyboardListener<OneKeyStroke[]> {

  public constructor( pullerNode: PullerNode, tandem: Tandem ) {
    const puller = pullerNode.puller;
    const model = puller.model;

    super( {
      tandem: tandem,
      keyStringProperties: [
        ...NetForceHotkeyData.PULLER_NODE.navigation.keyStringProperties,
        ...NetForceHotkeyData.PULLER_NODE.grabOrDrop.keyStringProperties,
        ...NetForceHotkeyData.PULLER_NODE.cancelInteraction.keyStringProperties,
        ...NetForceHotkeyData.PULLER_NODE.returnToToolbox.keyStringProperties
      ],
      fireOnDown: false,

      fire: ( _event, keysPressed ) => {

        // NAVIGATION (Arrow Keys)
        if ( NetForceHotkeyData.PULLER_NODE.navigation.hasKeyStroke( keysPressed ) ) {

          // When no puller is grabbed, select between available pullers of the same type
          if ( !puller.isGrabbed() ) {

            // Find all pullers of the same type
            const availablePullers = pullerNode.view.pullerNodes.filter( otherPullerNode => otherPullerNode.puller.type === pullerNode.puller.type );

            if ( availablePullers.length > 1 ) {

              // Sort: pullers on rope first (left to right), then pullers in toolbox (left to right)
              availablePullers.sort( ( a, b ) => {
                const aOnRope = a.puller.modeProperty.value.isAttached();
                const bOnRope = b.puller.modeProperty.value.isAttached();

                // If one is on rope and the other isn't, rope puller comes first
                if ( aOnRope && !bOnRope ) {
                  return -1;
                }
                if ( !aOnRope && bOnRope ) {
                  return 1;
                }

                // If both are in same location (both on rope or both in toolbox), sort by X position
                return a.centerX - b.centerX;
              } );

              // find our index in the list
              const currentIndex = availablePullers.indexOf( pullerNode );

              const delta = keysPressed === 'arrowLeft' ? -1 : 1;

              // Wrap search
              const newIndex = ( currentIndex + delta + availablePullers.length ) % availablePullers.length;

              if ( newIndex !== currentIndex ) {
                const nextPuller = availablePullers[ newIndex ];

                nextPuller.focusable = true;
                nextPuller.focus();
                pullerNode.focusable = false;
              }
            }
          }
          else {

            const direction = keysPressed === 'arrowLeft' ? -1 : 1;

            // Get available knots for this puller's type
            const availableKnots = model.knots.filter( knot =>

              // Include the current puller's knot so we can index it, and know which is before/after
              knot.type === puller.type && ( model.getPuller( knot ) === null || model.getPuller( knot ) === puller )
            );

            // Create navigation waypoints: [knot1, knot2, ..., knotN, HOME]
            const waypoints = [ ...availableKnots, null ]; // null = home position

            if ( waypoints.length <= 1 ) {
              return; // no navigation possible
            }

            // Find current waypoint index based on current mode
            const currentMode = puller.modeProperty.value;
            let currentWaypointIndex: number;

            if ( currentMode.isKeyboardGrabbedOverHome() ) {
              currentWaypointIndex = waypoints.length - 1; // Home is last waypoint
            }
            else {
              // Find the knot from current mode
              const currentKnot = puller.getKnot();
              currentWaypointIndex = currentKnot ? availableKnots.indexOf( currentKnot ) : 0;
              if ( currentWaypointIndex === -1 ) {
                currentWaypointIndex = 0; // Default to first knot
              }
            }

            // Navigate to next/previous waypoint
            const nextIndex = ( currentWaypointIndex + direction + waypoints.length ) % waypoints.length;
            const targetWaypoint = waypoints[ nextIndex ];

            // Update puller mode based on target waypoint
            puller.modeProperty.value = PullerNode.getModeForWaypoint( targetWaypoint, puller );

            // Generate accessibility response
            pullerNode.addAccessibleContextResponse( pullerNode.getAccessibilityResponseForWaypoint( targetWaypoint ) );
          }
        }

        // GRAB/DROP (Enter/Space)
        if ( NetForceHotkeyData.PULLER_NODE.grabOrDrop.hasKeyStroke( keysPressed ) ) {

          // Pick up an ungrabbed puller
          if ( !puller.isGrabbed() ) {

            const wasInHome = puller.modeProperty.value.isHome();

            // Store current state for potential cancel operation
            puller.storeGrabOrigin();

            // Determine initial grabbed mode based on current position
            let newMode: PullerMode;

            // Was in toolbox - start with first available knot or home
            const availableKnots = model.knots.filter( knot =>
              knot.type === puller.type && model.getPuller( knot ) === null
            );

            if ( availableKnots.length > 0 && wasInHome ) {
              newMode = PullerNode.getModeForWaypoint( availableKnots[ 0 ], pullerNode.puller );
            }
            else if ( puller.modeProperty.value.isAttached() ) {
              // Puller is attached to a knot - grab it over that knot
              const currentKnot = puller.getKnot();
              newMode = PullerNode.getModeForWaypoint( currentKnot, puller );
            }
            else {
              // Fallback to keyboard grabbed over home
              newMode = PullerMode.keyboardGrabbedOverHome();
            }

            puller.modeProperty.value = newMode;

            // Announce current position when grabbed - reuse the same logic as navigation
            const currentMode = puller.modeProperty.value;
            const knotIndex = currentMode.getKeyboardGrabbedKnotIndex();
            const targetWaypoint = knotIndex !== null ? model.knots[ knotIndex ] : null;

            const grabAccessibilityResponse = pullerNode.getAccessibilityResponseForWaypoint( targetWaypoint );
            pullerNode.addAccessibleContextResponse( grabAccessibilityResponse );
          }
          else {

            // Drop the grabbed puller
            const currentMode = puller.modeProperty.value;

            // Determine where to drop based on current mode
            let newMode: PullerMode;

            if ( currentMode.isKeyboardGrabbedOverHome() ) {
              // Drop at home (toolbox)
              newMode = PullerMode.home();

              pullerNode.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.netForceScreen.pullerResponses.pullerReturnedToToolbox.format( {
                size: puller.size,
                color: puller.colorProperty,
                index: puller.descriptionIndex
              } ) );
            }
            else if ( currentMode.isKeyboardGrabbedOverKnot() ) {
              // Drop at knot - convert keyboard grabbed to attached
              const knotIndex = currentMode.getKeyboardGrabbedKnotIndex();
              if ( knotIndex !== null ) {
                newMode = PullerMode.attachedToKnot( knotIndex );

                const knot = puller.getKnot();
                const knotDescription = knot ? pullerNode.getKnotDescription( knot ) : 'knot';
                pullerNode.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.netForceScreen.pullerResponses.pullerAttachedToKnot.format( {
                  size: puller.size,
                  color: puller.colorProperty,
                  knotDescription: knotDescription,
                  index: puller.descriptionIndex
                } ) );
              }
              else {
                // Fallback to home
                newMode = PullerMode.home();
                pullerNode.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.netForceScreen.pullerResponses.pullerReturnedToToolbox.format( {
                  size: puller.size,
                  color: puller.colorProperty,
                  index: puller.descriptionIndex
                } ) );
              }
            }
            else {
              // Fallback to home
              newMode = PullerMode.home();
              pullerNode.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.netForceScreen.pullerResponses.pullerReturnedToToolbox.format( {
                size: puller.size,
                color: puller.colorProperty,
                index: puller.descriptionIndex
              } ) );
            }

            // Clear grab origin
            puller.clearGrabOrigin();

            // Update mode
            puller.modeProperty.value = newMode;
          }
        }

        // CANCEL (Escape)
        if ( NetForceHotkeyData.PULLER_NODE.cancelInteraction.hasKeyStroke( keysPressed ) ) {
          if ( puller.isGrabbed() ) {
            // Cancel the grab and return to original position
            puller.cancelGrab();

            // Add accessibility response
            pullerNode.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.netForceScreen.pullerResponses.pullerInteractionCancelled.format( {
              size: puller.size,
              color: puller.colorProperty,
              index: puller.descriptionIndex
            } ) );
          }
        }

        // RETURN TO TOOLBOX (Delete/Backspace)
        if ( NetForceHotkeyData.PULLER_NODE.returnToToolbox.hasKeyStroke( keysPressed ) ) {
          if ( puller.isGrabbed() ) {
            puller.clearGrabOrigin();

            // Move puller back to home and retain focus
            puller.modeProperty.value = PullerMode.home();

            // Add accessibility response
            pullerNode.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.netForceScreen.pullerResponses.pullerReturnedToToolbox.format( {
              size: puller.size,
              color: puller.colorProperty,
              index: puller.descriptionIndex
            } ) );
          }
        }
      }
    } );
  }
}

forcesAndMotionBasics.register( 'PullerNodeKeyboardListener', PullerNodeKeyboardListener );
