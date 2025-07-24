// Copyright 2025, University of Colorado Boulder

/**
 * PullerGroupNode manages keyboard navigation for a group of pullers, allowing them to be a single tab stop
 * with arrow key navigation between individual pullers.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import optionize from '../../../../phet-core/js/optionize.js';
import GroupHighlightPath from '../../../../scenery/js/accessibility/GroupHighlightPath.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import Knot from '../model/Knot.js';
import NetForceModel from '../model/NetForceModel.js';
import PullerNode from './PullerNode.js';

type SelfOptions = {
  // Which side this group represents
  side: 'left' | 'right';
};

type PullerGroupNodeOptions = SelfOptions & NodeOptions;

export default class PullerGroupNode extends Node {
  private readonly pullerNodes: PullerNode[] = [];
  private myGroupFocusHighlight: GroupHighlightPath;
  private readonly createKeyboardListener: ( targetPullerNode: PullerNode ) => KeyboardListener<( 'enter' | 'space' | 'arrowLeft' | 'arrowRight' | 'arrowUp' | 'arrowDown' )[]>;

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

    // Create a unified keyboard listener that handles both navigation and selection based on mode
    this.createKeyboardListener = ( targetPullerNode: PullerNode ) => {
      return new KeyboardListener( {
        keys: [ 'enter', 'space', 'arrowLeft', 'arrowRight', 'arrowUp', 'arrowDown' ],
        fireOnDown: false,
        fire: ( event, keysPressed ) => {
          console.log( 'keyboardListener fired for puller:', targetPullerNode.puller, 'key:', keysPressed );
          const puller = targetPullerNode.puller;
          const isGrabbed = puller.userControlledProperty.get();

          // ARROW KEY HANDLING - depends on mode
          if ( keysPressed === 'arrowLeft' || keysPressed === 'arrowRight' || keysPressed === 'arrowUp' || keysPressed === 'arrowDown' ) {

            if ( isGrabbed ) {
              // GRABBED MODE: Arrow keys select knots
              if ( keysPressed === 'arrowLeft' || keysPressed === 'arrowRight' ) {
                // Get available knots for this puller's type (blue/red) and side
                const availableKnots = model.knots.filter( knot =>
                  knot.type === puller.type && model.getPuller( knot ) === null
                );

                if ( availableKnots.length > 0 ) {
                  // Find current target knot or start with first available
                  const currentTarget = model.getTargetKnot( puller );
                  const currentIndex = currentTarget ? availableKnots.indexOf( currentTarget ) : -1;

                  // Navigate to next/previous knot
                  const delta = keysPressed === 'arrowLeft' ? -1 : 1;
                  const nextIndex = ( currentIndex + delta + availableKnots.length ) % availableKnots.length;
                  const targetKnot = availableKnots[ nextIndex ];

                  // Position puller at the selected knot
                  targetPullerNode.updatePositionKnotted( puller, model, targetKnot );
                  console.log( 'Moved puller to knot:', targetKnot.positionProperty.get() );
                }
              }
              // Ignore up/down arrows when grabbed (only left/right navigate knots)
            }
            else {
              // NORMAL MODE: Arrow keys navigate between pullers in toolbox
              const currentIndex = this.pullerNodes.indexOf( targetPullerNode );
              if ( currentIndex === -1 ) {return;}

              console.log( 'Navigation mode - from puller at index:', currentIndex );
              const delta = ( keysPressed === 'arrowLeft' || keysPressed === 'arrowUp' ) ? -1 : 1;
              const newIndex = currentIndex + delta;

              // Keep selection within bounds
              if ( newIndex >= 0 && newIndex < this.pullerNodes.length ) {
                // Make current puller non-focusable
                targetPullerNode.focusable = false;

                // Make new puller focusable and focus it
                const newPullerNode = this.pullerNodes[ newIndex ];
                newPullerNode.focusable = true;
                newPullerNode.focus();

                console.log( 'Navigated from index', currentIndex, 'to index', newIndex );
              }
            }
            return; // Don't process Enter/Space if we handled arrow keys
          }

          // ENTER/SPACE HANDLING - grab/drop logic
          if ( keysPressed === 'enter' || keysPressed === 'space' ) {
            // Two-phase interaction: grab -> show yellow circles -> drop
            if ( puller.userControlledProperty.get() ) {
              // Second press: Drop the puller (complete the interaction)
              const wasFromToolbox = puller.knotProperty.get() === null; // Track if puller came from toolbox

              puller.userControlledProperty.set( false );
              puller.droppedEmitter.emit();
              targetPullerNode.updateImage( puller, model );

              // PHASE I: If puller was from toolbox, listen for successful attachment to rope
              if ( wasFromToolbox ) {
                // Listen for knot attachment change - if it becomes non-null, puller was successfully dropped
                const knotListener = ( newKnot: Knot | null ) => {
                  if ( newKnot !== null ) {
                    // Successfully dropped on rope, focus next puller in toolbox
                    this.focusNextPullerInToolbox( targetPullerNode );
                    // Remove the listener since we only need it once
                    puller.knotProperty.unlink( knotListener );
                  }
                };

                // Add the listener temporarily to detect successful drop
                puller.knotProperty.link( knotListener );
              }
            }
            else {
              // First press: Grab the puller (start showing yellow circles)
              const knot = puller.knotProperty.get();
              console.log( 'First press - puller at position:', puller.positionProperty.get(), 'knot:', knot );

              // Disconnect from current knot if attached
              puller.disconnect();
              targetPullerNode.updateImage( puller, model );

              // Set user controlled to show yellow circles on potential drop targets
              puller.userControlledProperty.set( true );
              targetPullerNode.moveToFront();
              puller.userControlledEmitter.emit();

              // If puller was knotted, position it at the knot location for better UX
              if ( knot ) {
                console.log( 'Moving puller to knot position:', knot.positionProperty.get(), knot.y );
                targetPullerNode.updatePositionKnotted( puller, model, knot );
                console.log( 'Puller position after move:', puller.positionProperty.get() );
              }
              else {
                // For pullers not yet on the rope, move to first available knot position
                const availableKnots = model.knots.filter( knot =>
                  knot.type === puller.type && model.getPuller( knot ) === null
                );
                if ( availableKnots.length > 0 ) {
                  const firstKnot = availableKnots[ 0 ];
                  targetPullerNode.updatePositionKnotted( puller, model, firstKnot );
                  console.log( 'Moving puller from toolbox to first available knot:', firstKnot.positionProperty.get() );
                }
                else {
                  // Fallback to neutral position if no knots available
                  const neutralY = 350;
                  const currentPosition = puller.positionProperty.get();
                  puller.positionProperty.set( new Vector2( currentPosition.x, neutralY ) );
                  console.log( 'No available knots, moving to neutral position:', puller.positionProperty.get() );
                }
              }
            }
          }
        }
      } );
    };
  }

  /**
   * Add a puller node to this group
   */
  public addPullerNode( pullerNode: PullerNode ): void {
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
    } );

    pullerNode.addInputListener( this.createKeyboardListener( pullerNode ) );
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
  private focusNextPullerInToolbox( droppedPullerNode: PullerNode ): void {
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

      console.log( 'Focused next puller in toolbox:', nextPuller.puller );
    }
    else {
      console.log( 'No more pullers in toolbox to focus' );
    }
  }
}

forcesAndMotionBasics.register( 'PullerGroupNode', PullerGroupNode );