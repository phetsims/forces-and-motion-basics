// Copyright 2025, University of Colorado Boulder

/**
 * ItemNodeDragListener is a drag listener for dragging ItemNodes.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import ItemDescriber from './ItemDescriber.js';
import ItemNode from './ItemNode.js';

export default class ItemNodeDragListener extends SoundDragListener {

  public constructor( itemNode: ItemNode, tandem: Tandem ) {

    const item = itemNode.item;
    const model = itemNode.model;

    super( {
        tandem: tandem,
        positionProperty: item.positionProperty,

        // When picking up an object, remove it from the stack.
        start: () => {

          // Track original state for keyboard escape functionality
          itemNode.wasOriginallyOnStack = item.inStackProperty.value;
          itemNode.originalPosition = item.positionProperty.value.copy();

          // Move it to front (z-order)
          itemNode.moveToFront();

          // move the parent toolbox to the front so that items of one toolbox are not in front of another
          // itemToolbox is in a container so it should not occlude other items in the screen view
          itemNode.itemToolbox.moveToFront();

          // Set mode to mouseGrabbed when dragging with mouse
          item.modeProperty.value = 'pointerGrabbed';
          const index = model.stackedItems.indexOf( item );
          if ( index >= 0 ) {
            model.spliceStack( index );
          }

          // Don't allow the user to translate the object while it is animating
          item.cancelAnimation();
        },

        // End the drag
        end: event => {

          // Reset mode based on where the item ends up (let setupModeCalculation handle it)

          // If the user drops it above the ground, move to the top of the stack on the skateboard, otherwise go back to the original position.
          const droppedOnStack = itemNode.isOverStackArea();

          if ( droppedOnStack ) {

            // Place on stack and announce
            const priorLength = itemNode.placeItemOnStack();
            itemNode.addAccessibleContextResponse( ItemDescriber.getDroppedOnStackResponse( itemNode.model, priorLength ) );
          }
          else {

            // send the item home and make sure that the label is centered
            itemNode.returnItemToToolbox();

            // Announce return to toolbox
            itemNode.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.motionScreen.objectResponses.returnedToToolboxStringProperty );
          }
          // Clear any locked pointer highlight before changing focus to another item
          itemNode.unlockHighlight();
        }
      }
    );

  }
}

forcesAndMotionBasics.register( 'ItemNodeDragListener', ItemNodeDragListener );