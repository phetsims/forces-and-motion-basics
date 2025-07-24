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
import NetForceModel from '../model/NetForceModel.js';
import PullerNode from './PullerNode.js';

type SelfOptions = {
  // Which side this group represents
  side: 'left' | 'right';
};

type PullerGroupNodeOptions = SelfOptions & NodeOptions;

export default class PullerGroupNode extends Node {
  private readonly pullerNodes: PullerNode[] = [];
  private selectedIndex = 0;
  private myGroupFocusHighlight: GroupHighlightPath;
  private readonly createSelectListener: ( targetPullerNode: PullerNode ) => KeyboardListener<( 'enter' | 'space' )[]>;
  private readonly navigationListener: KeyboardListener<( 'arrowLeft' | 'arrowRight' | 'arrowUp' | 'arrowDown' )[]>;

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

    // Keyboard listener for navigating between pullers
    this.navigationListener = new KeyboardListener( {
      keys: [ 'arrowLeft', 'arrowRight', 'arrowUp', 'arrowDown' ],
      fire: ( event, keysPressed ) => {

        const priorPullerNode = this.pullerNodes[ this.selectedIndex ];

        console.log( 'navigationListener fired with keys:', keysPressed );
        const delta = ( keysPressed === 'arrowLeft' || keysPressed === 'arrowUp' ) ? -1 : 1;
        const newIndex = this.selectedIndex + delta;

        // Keep selection within bounds
        if ( newIndex >= 0 && newIndex < this.pullerNodes.length ) {
          this.selectedIndex = newIndex;

          // make the prior PullerNode non-focusable
          priorPullerNode.focusable = false;

          // make the new PullerNode focusable
          const newPullerNode = this.pullerNodes[ this.selectedIndex ];
          newPullerNode.focusable = true;
          newPullerNode.focus();

        }
      }
    } );

    // Create a factory function that creates a select listener for a specific puller
    this.createSelectListener = ( targetPullerNode: PullerNode ) => {
      return new KeyboardListener( {
        keys: [ 'enter', 'space', 'arrowLeft', 'arrowRight' ],
        fireOnDown: false,
        fire: ( event, keysPressed ) => {
          console.log( 'selectListener fired for puller:', targetPullerNode.puller, 'key:', keysPressed );
          const puller = targetPullerNode.puller;

          // Handle arrow keys for knot selection when puller is grabbed
          if ( ( keysPressed === 'arrowLeft' || keysPressed === 'arrowRight' ) && puller.userControlledProperty.get() ) {
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
            return;
          }

          // Handle Enter/Space for grab/drop
          if ( keysPressed === 'enter' || keysPressed === 'space' ) {
            // Two-phase interaction: grab -> show yellow circles -> drop
            if ( puller.userControlledProperty.get() ) {
              // Second press: Drop the puller (complete the interaction)
              puller.userControlledProperty.set( false );
              puller.droppedEmitter.emit();
              targetPullerNode.updateImage( puller, model );
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

    pullerNode.addInputListener( this.createSelectListener( pullerNode ) );
    pullerNode.addInputListener( this.navigationListener );
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
}

forcesAndMotionBasics.register( 'PullerGroupNode', PullerGroupNode );