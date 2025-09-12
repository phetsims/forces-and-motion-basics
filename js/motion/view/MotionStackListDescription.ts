// Copyright 2025, University of Colorado Boulder

/**
 * MotionStackListDescription shows an accessible list of stacked items under the Skateboard/Stack heading.
 *
 * Behavior:
 * - When the stack is empty: show "No objects on {surface}."
 * - When the stack has items: show a leading line "Stacked on {surface}:" then list
 *   the accessible names of items from top to bottom (top, middle if present, bottom).
 * - Uses item accessible naming consistent with ItemNode, including masses when enabled.
 * - Uses "skateboard" for the Motion screen and "ground" for Friction/Acceleration.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import AccessibleListNode from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import { createItemAccessibleNameWithMassProperty, getLocalizedItemNameProperty } from '../../common/view/getItemNameProperties.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import Item from '../model/Item.js';
import MotionModel from '../model/MotionModel.js';

export default class MotionStackListDescription extends Node {

  public constructor( private readonly model: MotionModel ) {
    // Surface label used within strings
    const surfaceStringProperty = new DerivedProperty(
      [
        ForcesAndMotionBasicsFluent.a11y.motionScreen.surface.skateboardStringProperty,
        ForcesAndMotionBasicsFluent.a11y.motionScreen.surface.groundStringProperty
      ],
      ( skateboard, ground ) => model.skateboard ? skateboard : ground
    );

    // Empty/Non-empty visibility
    const lengthProperty = model.stackedItems.lengthProperty;
    const hasItemsProperty = new DerivedProperty( [ lengthProperty ], length => length > 0 );
    const noItemsProperty = new DerivedProperty( [ lengthProperty ], length => length === 0 );

    // Leading description for the list when items exist
    const leadingParagraphStringProperty = ForcesAndMotionBasicsFluent.a11y.motionScreen.stackList.stackedOnSurface.createProperty( {
      surface: surfaceStringProperty
    } );

    // Empty message when no stacked items
    const noObjectsStringProperty = ForcesAndMotionBasicsFluent.a11y.motionScreen.stackList.noObjectsOnSurface.createProperty( {
      surface: surfaceStringProperty
    } );

    super( {
      tagName: 'div',
      pickable: false
    } );

    // Build three list entries (top, middle, bottom) with visibility based on stack length
    const topVisibleProperty = new DerivedProperty( [ lengthProperty ], length => length >= 3 );
    const middleVisibleProperty = new DerivedProperty( [ lengthProperty ], length => length >= 2 );
    const bottomVisibleProperty = new DerivedProperty( [ lengthProperty ], length => length >= 1 );

    // Dependencies that cover all possible item name/mass strings so language changes recompute correctly
    const allItemNameStringDependencies = [
      ForcesAndMotionBasicsFluent.a11y.motionScreen.items.names.fridgeStringProperty,
      ForcesAndMotionBasicsFluent.a11y.motionScreen.items.names.crate1StringProperty,
      ForcesAndMotionBasicsFluent.a11y.motionScreen.items.names.crate2StringProperty,
      ForcesAndMotionBasicsFluent.a11y.motionScreen.items.names.girlStringProperty,
      ForcesAndMotionBasicsFluent.a11y.motionScreen.items.names.manStringProperty,
      ForcesAndMotionBasicsFluent.a11y.motionScreen.items.names.trashStringProperty,
      ForcesAndMotionBasicsFluent.a11y.motionScreen.items.names.mysteryStringProperty,
      ForcesAndMotionBasicsFluent.a11y.motionScreen.items.names.bucketStringProperty
    ];

    // All item mass Properties so PhET-iO changes recompute
    const allItemMassProperties = model.items.map( item => item.massProperty );

    // Helper to get the accessible name (with or without mass) consistent with ItemNode
    const getAccessibleName = ( item: Item ): string => {

      const localizedItemNameProperty = getLocalizedItemNameProperty( item );
      const itemAccessibleNameWithMassProperty = createItemAccessibleNameWithMassProperty( item );

      // Show mass if enabled, otherwise just the name
      return model.showMassesProperty.value ? itemAccessibleNameWithMassProperty.value : localizedItemNameProperty.value;
    };

    const dependencies = [ model.showMassesProperty, ...allItemNameStringDependencies, ...allItemMassProperties ];

    // Top/middle/bottom string properties derived from stack contents
    const topStringProperty = DerivedProperty.deriveAny( [ lengthProperty, ...dependencies ], () => {
      const item = model.stackedItems.get( 2 );
      return item ? getAccessibleName( item ) : ''; // top of stack, if present
    } );

    const middleStringProperty = DerivedProperty.deriveAny( [ lengthProperty, ...dependencies ], () => {
      const item = model.stackedItems.get( 1 );
      return item ? getAccessibleName( item ) : ''; // middle of stack, if present
    } );

    const bottomStringProperty = DerivedProperty.deriveAny( [ lengthProperty, ...dependencies ], () => {
      const item = model.stackedItems.get( 0 );
      return item ? getAccessibleName( item ) : ''; // bottom of stack, if present
    } );

    // The list node with leading paragraph, shown only when there are items
    const listNode = new AccessibleListNode( [
      { stringProperty: topStringProperty, visibleProperty: topVisibleProperty },
      { stringProperty: middleStringProperty, visibleProperty: middleVisibleProperty },
      { stringProperty: bottomStringProperty, visibleProperty: bottomVisibleProperty }
    ], {
      leadingParagraphStringProperty: leadingParagraphStringProperty,
      visibleProperty: hasItemsProperty
    } );

    // The empty message when there are no items
    const emptyNode = new Node( {
      tagName: 'p',
      innerContent: noObjectsStringProperty,
      visibleProperty: noItemsProperty
    } );

    this.addChild( emptyNode );
    this.addChild( listNode );
  }
}

forcesAndMotionBasics.register( 'MotionStackListDescription', MotionStackListDescription );