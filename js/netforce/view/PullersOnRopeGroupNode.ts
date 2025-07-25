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
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import ForcesAndMotionBasicsQueryParameters from '../../common/ForcesAndMotionBasicsQueryParameters.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import NetForceModel from '../model/NetForceModel.js';
import PullerNode from './PullerNode.js';

type SelfOptions = {
  // Which side this group represents
  side: 'left' | 'right';
};

type PullersOnRopeGroupNodeOptions = SelfOptions & NodeOptions;

export default class PullersOnRopeGroupNode extends Node {
  private readonly ropePullerNodes: PullerNode[] = [];
  private myGroupFocusHighlight: GroupHighlightPath;
  private readonly createRopeKeyboardListener: ( targetPullerNode: PullerNode ) => KeyboardListener<( 'enter' | 'space' | 'arrowLeft' | 'arrowRight' | 'arrowUp' | 'arrowDown' )[]>;

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

    // Create a unified keyboard listener that handles rope puller navigation and actions
    this.createRopeKeyboardListener = ( targetPullerNode: PullerNode ) => {
      return new KeyboardListener( {
        keys: [ 'enter', 'space', 'arrowLeft', 'arrowRight', 'arrowUp', 'arrowDown' ],
        fireOnDown: false,
        fire: ( event, keysPressed ) => {
          ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'ropeKeyboardListener fired for puller:', targetPullerNode.puller, 'key:', keysPressed );
          const puller = targetPullerNode.puller;
          const isGrabbed = puller.userControlledProperty.get();

          // ARROW KEY HANDLING - depends on mode
          if ( keysPressed === 'arrowLeft' || keysPressed === 'arrowRight' || keysPressed === 'arrowUp' || keysPressed === 'arrowDown' ) {

            if ( isGrabbed ) {
              // GRABBED MODE: Arrow keys cycle through knots + home position (same as toolbox behavior)
              if ( keysPressed === 'arrowLeft' || keysPressed === 'arrowRight' ) {
                // Get available knots for this puller's type (blue/red) and side
                const availableKnots = model.knots.filter( knot =>
                  knot.type === puller.type && model.getPuller( knot ) === null
                );

                // Create waypoints array: [knot1, knot2, ..., knotN, HOME]
                const waypoints = [ ...availableKnots, null ]; // null = home position

                if ( waypoints.length > 0 ) {
                  // Find current waypoint index
                  const currentTarget = model.getTargetKnot( puller );
                  let currentIndex;

                  if ( currentTarget === null ) {
                    // Currently at home position
                    currentIndex = waypoints.length - 1; // Home is last waypoint
                  }
                  else {
                    // Currently at a knot
                    currentIndex = availableKnots.indexOf( currentTarget );
                    if ( currentIndex === -1 ) {
                      currentIndex = 0; // Default to first waypoint if not found
                    }
                  }

                  // Navigate to next/previous waypoint
                  const delta = keysPressed === 'arrowLeft' ? -1 : 1;
                  const nextIndex = ( currentIndex + delta + waypoints.length ) % waypoints.length;
                  const targetWaypoint = waypoints[ nextIndex ];

                  if ( targetWaypoint === null ) {
                    // Move to home position (original position in toolbox)
                    puller.positionProperty.reset(); // Reset to original toolbox coordinates
                    targetPullerNode.updatePosition( puller, model );
                    ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Moved puller to HOME position' );
                  }
                  else {
                    // Move to knot position
                    targetPullerNode.updatePositionKnotted( puller, model, targetWaypoint );
                    ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Moved puller to knot:', targetWaypoint.positionProperty.get() );
                  }
                }
              }
              // Ignore up/down arrows when grabbed (only left/right navigate knots)
            }
            else {
              // NORMAL MODE: Arrow keys navigate between rope pullers
              const currentIndex = this.ropePullerNodes.indexOf( targetPullerNode );
              if ( currentIndex === -1 ) {return;}

              ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Rope navigation mode - from puller at index:', currentIndex );
              const delta = ( keysPressed === 'arrowLeft' || keysPressed === 'arrowUp' ) ? -1 : 1;
              const newIndex = currentIndex + delta;

              // Keep selection within bounds
              if ( newIndex >= 0 && newIndex < this.ropePullerNodes.length ) {
                // Make current puller non-focusable
                targetPullerNode.focusable = false;

                // Make new puller focusable and focus it
                const newPullerNode = this.ropePullerNodes[ newIndex ];
                newPullerNode.focusable = true;
                newPullerNode.focus();

                ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Navigated from rope index', currentIndex, 'to rope index', newIndex );
              }
            }
            return; // Don't process Enter/Space if we handled arrow keys
          }

          // ENTER/SPACE HANDLING - grab/drop logic (same as toolbox behavior)
          if ( keysPressed === 'enter' || keysPressed === 'space' ) {
            if ( isGrabbed ) {
              // Second press: Drop the puller (complete the interaction)
              const targetKnot = model.getTargetKnot( puller );

              // Check if puller is at HOME waypoint (no target knot)
              if ( targetKnot === null ) {
                // Puller is at HOME - return to toolbox
                puller.userControlledProperty.set( false );
                puller.reset(); // This returns puller to its original toolbox position
                targetPullerNode.updateImage( puller, model );
                ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Returned rope puller to toolbox' );

                // Remove from rope group since it went back to toolbox
                this.removePullerNode( targetPullerNode );
              }
              else {
                // Puller is at a knot - normal drop behavior
                puller.userControlledProperty.set( false );
                puller.droppedEmitter.emit();
                targetPullerNode.updateImage( puller, model );
              }

              // No special focus behavior for rope pullers (unlike toolbox PHASE I)
            }
            else {
              // First press: Grab the puller (start showing yellow circles)
              const knot = puller.knotProperty.get();
              ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'First press - rope puller at position:', puller.positionProperty.get(), 'knot:', knot );

              ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'BEFORE disconnect - userControlled:', puller.userControlledProperty.get(), 'knotProperty:', puller.knotProperty.get() );

              // Set user controlled FIRST to prevent transfer during disconnect
              puller.userControlledProperty.set( true );
              ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Set userControlled = true' );

              // Disconnect from current knot if attached
              puller.disconnect();
              ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'AFTER disconnect - userControlled:', puller.userControlledProperty.get(), 'knotProperty:', puller.knotProperty.get() );

              targetPullerNode.updateImage( puller, model );

              // Move to front and emit
              targetPullerNode.moveToFront();
              puller.userControlledEmitter.emit();

              // If puller was knotted, position it at the knot location for better UX
              if ( knot ) {
                ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Moving rope puller to knot position:', knot.positionProperty.get(), knot.y );
                targetPullerNode.updatePositionKnotted( puller, model, knot );
                ForcesAndMotionBasicsQueryParameters.debugAltInput && console.log( 'Rope puller position after move:', puller.positionProperty.get() );
              }
            }
          }
        }
      } );
    };
  }

  /**
   * Add a puller node to the rope group
   */
  public addPullerNode( pullerNode: PullerNode ): void {
    this.ropePullerNodes.push( pullerNode );
    this.addChild( pullerNode );

    // Sort pullers by position for consistent navigation order
    this.sortPullers();

    // Update group highlight now that we have children
    this.updateGroupHighlight();

    pullerNode.focusedProperty.lazyLink( focused => {
      if ( focused ) {
        this.ropePullerNodes.forEach( node => {
          if ( node !== pullerNode ) {
            node.focusable = false; // Make other rope pullers non-focusable
          }
        } );
      }
      else {
        // When this puller loses focus, restore focusability to all rope pullers
        this.ropePullerNodes.forEach( node => {
          node.focusable = true;
        } );
      }
    } );

    // Replace the puller's existing keyboard listener with the rope-specific one
    // First remove any existing listeners (this is safe even if there are none)
    pullerNode.inputListeners.forEach( listener => {
      if ( listener instanceof KeyboardListener ) {
        pullerNode.removeInputListener( listener );
      }
    } );

    // Add the rope-specific keyboard listener
    pullerNode.addInputListener( this.createRopeKeyboardListener( pullerNode ) );
  }

  /**
   * Remove a puller node from the rope group (when it returns to toolbox)
   */
  public removePullerNode( pullerNode: PullerNode ): void {
    const index = this.ropePullerNodes.indexOf( pullerNode );
    if ( index !== -1 ) {
      this.ropePullerNodes.splice( index, 1 );
      this.removeChild( pullerNode );

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

forcesAndMotionBasics.register( 'PullersOnRopeGroupNode', PullersOnRopeGroupNode );