// Copyright 2025, University of Colorado Boulder

/**
 * Shared helpers for deriving localized item names and accessible item names (optionally including mass).
 * Used by ItemNode and MotionStackListDescription to avoid duplication.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import Item from '../../motion/model/Item.js';

/**
 * Returns the localized name Property for a given Item, based on its name key.
 */
export function getLocalizedItemNameProperty( item: Item ): TReadOnlyProperty<string> {
  return item.name === 'fridge' ? ForcesAndMotionBasicsFluent.a11y.motionScreen.objects.names.fridgeStringProperty :
         item.name === 'crate1' ? ForcesAndMotionBasicsFluent.a11y.motionScreen.objects.names.crate1StringProperty :
         item.name === 'crate2' ? ForcesAndMotionBasicsFluent.a11y.motionScreen.objects.names.crate2StringProperty :
         item.name === 'girl' ? ForcesAndMotionBasicsFluent.a11y.motionScreen.objects.names.girlStringProperty :
         item.name === 'man' ? ForcesAndMotionBasicsFluent.a11y.motionScreen.objects.names.manStringProperty :
         item.name === 'trash' ? ForcesAndMotionBasicsFluent.a11y.motionScreen.objects.names.trashStringProperty :
         item.name === 'mystery' ? ForcesAndMotionBasicsFluent.a11y.motionScreen.objects.names.mysteryStringProperty :
         item.name === 'bucket' ? ForcesAndMotionBasicsFluent.a11y.motionScreen.objects.names.bucketStringProperty :
         ( () => { throw new Error( `Unhandled name: ${item.name}` ); } )();
}

/**
 * Returns a Property for the accessible item name that includes mass when known.
 * This mirrors the formatting used within ItemNode.
 */
export function createItemAccessibleNameWithMassProperty( item: Item ): TReadOnlyProperty<string> {
  const pattern0MassUnitsKilogramsStringProperty = new PatternStringProperty(
    ForcesAndMotionBasicsFluent.pattern[ '0massUnitsKilogramsStringProperty' ],
    { mass: item.massProperty },
    { formatNames: [ 'mass' ] }
  );

  const localizedItemNameProperty = getLocalizedItemNameProperty( item );
  const massUnknownStringProperty = ForcesAndMotionBasicsFluent.a11y.motionScreen.objects.massUnknownStringProperty;

  return ForcesAndMotionBasicsFluent.a11y.motionScreen.objects.objectAccessibleNameWithMass.createProperty( {
    objectName: localizedItemNameProperty,
    mass: item.mystery ? massUnknownStringProperty : pattern0MassUnitsKilogramsStringProperty
  } );
}

/**
 * Returns the accessible item name (including mass when known) as a formatted string without creating Properties.
 * This is appropriate for transient uses to avoid leaking listeners. For long-lived values, prefer
 * createItemAccessibleNameWithMassProperty above.
 */
export function formatItemAccessibleNameWithMass( item: Item ): string {
  const itemName = getLocalizedItemNameProperty( item ).value;

  // Mass as a plain string: either unknown or formatted with the current mass value
  const massString = item.mystery ?
                     ForcesAndMotionBasicsFluent.a11y.motionScreen.objects.massUnknownStringProperty.value :
                     StringUtils.format( ForcesAndMotionBasicsFluent.pattern[ '0massUnitsKilogramsStringProperty' ].value, item.massProperty.value );

  return ForcesAndMotionBasicsFluent.a11y.motionScreen.objects.objectAccessibleNameWithMass.format( {
    objectName: itemName,
    mass: massString
  } );
}