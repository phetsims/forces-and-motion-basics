// Copyright 2025, University of Colorado Boulder

/**
 * TugOfWarDescription provides an accessible overview of the current state of the tug-of-war rope,
 * showing which pullers are attached to which knots.
 *
 * TODO: Check all author annotations, see https://github.com/phetsims/forces-and-motion-basics/issues/431
 * @author Claude (Anthropic)
 */

import StringProperty from '../../../../axon/js/StringProperty.js';
import AccessibleListNode from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import ForcesAndMotionBasicsPreferences from '../model/ForcesAndMotionBasicsPreferences.js';
import NetForceModel from '../model/NetForceModel.js';
import PullerNode from './PullerNode.js';

export default class TugOfWarDescription extends Node {

  private ropeOverviewContent: Node | null = null;

  public constructor( private readonly model: NetForceModel, private readonly pullerNodes: PullerNode[] ) {
    super( {
      tagName: 'div',
      accessibleHeading: ForcesAndMotionBasicsFluent.a11y.tugOfWar.headingStringProperty
    } );

    // Update overview when pullers change position
    this.model.pullers.forEach( puller => {
      puller.modeProperty.link( () => this.updateRopeOverview() );
    } );

    // Update overview when puller colors change
    ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty.link( () => this.updateRopeOverview() );

    // Initial update
    this.updateRopeOverview();
  }

  /**
   * Updates the rope overview content based on current puller positions
   */
  private updateRopeOverview(): void {

    this.removeAllChildren();

    // Get all pullers attached to knots, sorted by position
    const attachedPullers = this.model.pullers.filter( puller => puller.modeProperty.value.isAttached() );

    if ( attachedPullers.length === 0 ) {
      // Create simple text node for empty rope
      this.ropeOverviewContent = new Node( {
        tagName: 'div',
        innerContent: ForcesAndMotionBasicsFluent.a11y.tugOfWar.noPullersOnRopeStringProperty.value
      } );
      this.addChild( this.ropeOverviewContent );
    }
    else {
      // Sort pullers by their knot positions (left to right)
      const sortedPullers = attachedPullers.sort( ( a, b ) => {
        const aKnot = a.getKnot()!;
        const bKnot = b.getKnot()!;
        return this.model.knots.indexOf( aKnot ) - this.model.knots.indexOf( bKnot );
      } );

      // Build list of occupied knots
      const knotDescriptions = sortedPullers.map( puller => {
        const knot = puller.getKnot()!;
        const sameTypeKnots = this.model.knots.filter( k => k.type === knot.type );
        const index = sameTypeKnots.indexOf( knot );
        const side = knot.type === 'blue' ?
                     ForcesAndMotionBasicsFluent.a11y.pullers.leftSideStringProperty.value :
                     ForcesAndMotionBasicsFluent.a11y.pullers.rightSideStringProperty.value;

        // Find the corresponding puller node to get its accessible name
        const pullerNode = this.pullerNodes.find( node => node.puller === puller );
        const pullerName = pullerNode ? pullerNode.accessibleName! : `${puller.size} ${puller.type} puller`;

        // Use Fluent pattern to create knot description
        const knotOccupiedProperty = ForcesAndMotionBasicsFluent.a11y.tugOfWar.knotOccupied.createProperty( {
          side: side,
          number: ( index + 1 ).toString(),
          pullerName: pullerName
        } );
        return knotOccupiedProperty.value;
      } );

      // Create AccessibleListNode for the occupied knots
      // Convert strings to StringProperties as required by AccessibleListNode
      const knotDescriptionProperties = knotDescriptions.map( description => new StringProperty( description ) );
      this.ropeOverviewContent = new AccessibleListNode( knotDescriptionProperties );
      this.addChild( this.ropeOverviewContent );
    }
  }
}

forcesAndMotionBasics.register( 'TugOfWarDescription', TugOfWarDescription );