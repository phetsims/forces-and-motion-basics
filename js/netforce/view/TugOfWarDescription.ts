// Copyright 2025, University of Colorado Boulder

/**
 * TugOfWarDescription provides an accessible overview of the current state of the tug-of-war rope,
 * showing which pullers are attached to which knots.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import AccessibleListNode from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import ForcesAndMotionBasicsPreferences from '../model/ForcesAndMotionBasicsPreferences.js';
import NetForceModel from '../model/NetForceModel.js';
import PullerNode from './PullerNode.js';

export default class TugOfWarDescription extends Node {

  public constructor( private readonly model: NetForceModel, private readonly pullerNodes: PullerNode[] ) {
    super( {
      tagName: 'div',
      accessibleHeading: ForcesAndMotionBasicsFluent.a11y.tugOfWar.headingStringProperty
    } );

    // Build a single AccessibleListNode that persists for the lifetime of this view.
    // Each knot gets a list item whose visibility reflects whether a puller is attached to that knot.

    const listItems = this.model.knots.map( knot => {
      const sameTypeKnots = this.model.knots.filter( k => k.type === knot.type );
      const indexWithinSide = sameTypeKnots.indexOf( knot );
      const numberString = ( indexWithinSide + 1 ).toString();

      // Visible when a puller is attached to this knot
      const visibleProperty = DerivedProperty.deriveAny( [ ...this.model.pullers.map( p => p.modeProperty ) ], () =>
        this.model.getPuller( knot ) !== null
      ) as TReadOnlyProperty<boolean>;

      // Content depends on locale side strings, color preference and which puller is attached
      const contentProperty = DerivedProperty.deriveAny( [
        ForcesAndMotionBasicsFluent.a11y.pullers.leftSideStringProperty,
        ForcesAndMotionBasicsFluent.a11y.pullers.rightSideStringProperty,
        ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty,
        ...this.model.pullers.map( p => p.modeProperty )
      ], () => {
        const puller = this.model.getPuller( knot );
        if ( !puller ) { return ''; }

        const side = knot.type === 'blue' ?
                     ForcesAndMotionBasicsFluent.a11y.pullers.leftSideStringProperty.value :
                     ForcesAndMotionBasicsFluent.a11y.pullers.rightSideStringProperty.value;

        // Match PullerNode's accessibleName mapping for color
        const pullerColorPref = ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty.value;
        const displayColor = pullerColorPref === 'purpleOrange' ? ( puller.type === 'blue' ? 'purple' : 'orange' ) : puller.type;
        const pullerName = `${puller.size} ${displayColor} puller`;

        return ForcesAndMotionBasicsFluent.a11y.tugOfWar.knotOccupied.format( {
          side: side,
          number: numberString,
          pullerName: pullerName
        } );
      } ) as TReadOnlyProperty<string>;

      return { stringProperty: contentProperty, visibleProperty: visibleProperty };
    } );

    const hasItemsProperty = new DerivedProperty( [ this.model.numberPullersAttachedProperty ], n => n > 0 );

    const listNode = new AccessibleListNode( listItems, {
      visibleProperty: hasItemsProperty
    } );

    const emptyNode = new Node( {
      tagName: 'div',
      innerContent: ForcesAndMotionBasicsFluent.a11y.tugOfWar.noPullersOnRopeStringProperty,
      visibleProperty: DerivedProperty.deriveAny( [ hasItemsProperty ], () => !hasItemsProperty.value ) as TReadOnlyProperty<boolean>
    } );

    this.addChild( emptyNode );
    this.addChild( listNode );
  }
}

forcesAndMotionBasics.register( 'TugOfWarDescription', TugOfWarDescription );