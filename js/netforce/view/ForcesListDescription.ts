// Copyright 2025, University of Colorado Boulder

/**
 * ForcesListDescription provides an accessible list of the current force arrow values in the Net Force screen.
 * This appears under a "Forces" heading and shows left, right, and sum of forces when applicable.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import AccessibleListNode from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import getQualitativeForceDescription from '../../common/view/getQualitativeForceDescription.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import NetForceModel from '../model/NetForceModel.js';

export default class ForcesListDescription extends Node {

  private forcesList: AccessibleListNode | null = null;

  public constructor( private readonly model: NetForceModel ) {
    super( {
      tagName: 'div',
      accessibleHeading: ForcesAndMotionBasicsFluent.a11y.forces.headingStringProperty
    } );

    // Update the forces list when any relevant property changes
    const updateListener = () => this.updateForcesList();

    this.model.leftForceProperty.link( updateListener );
    this.model.rightForceProperty.link( updateListener );
    this.model.netForceProperty.link( updateListener );
    this.model.showValuesProperty.link( updateListener );
    this.model.showSumOfForcesProperty.link( updateListener );

    // Initial update
    this.updateForcesList();
  }

  /**
   * Updates the forces list content based on current force values and checkbox states
   */
  private updateForcesList(): void {
    // Remove existing list
    this.removeAllChildren();

    const forceDescriptions: TReadOnlyProperty<string>[] = [];
    const leftForce = this.model.leftForceProperty.value;
    const rightForce = this.model.rightForceProperty.value;
    const netForce = this.model.netForceProperty.value;
    const showValues = this.model.showValuesProperty.value;
    const showSumOfForces = this.model.showSumOfForcesProperty.value;

    // Add left force if non-zero
    if ( Math.abs( leftForce ) > 1E-6 ) {
      const description = this.getForceDescription( leftForce, showValues );
      const leftForceProperty = ForcesAndMotionBasicsFluent.a11y.forces.leftForceArrow.createProperty( {
        description: description
      } );
      forceDescriptions.push( leftForceProperty );
    }

    // Add right force if non-zero
    if ( Math.abs( rightForce ) > 1E-6 ) {
      const description = this.getForceDescription( rightForce, showValues );
      const rightForceProperty = ForcesAndMotionBasicsFluent.a11y.forces.rightForceArrow.createProperty( {
        description: description
      } );
      forceDescriptions.push( rightForceProperty );
    }

    // Add sum of forces if checkbox is checked
    if ( showSumOfForces ) {
      if ( Math.abs( netForce ) < 1E-6 ) {
        // Special case: sum = 0
        forceDescriptions.push( ForcesAndMotionBasicsFluent.a11y.forces.sumOfForcesZeroStringProperty );
      }
      else {
        const description = this.getForceDescription( netForce, showValues );
        const direction = netForce > 0 ?
                          ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.rightStringProperty.value :
                          ForcesAndMotionBasicsFluent.a11y.forces.qualitativeDescriptions.leftStringProperty.value;

        const sumForceProperty = ForcesAndMotionBasicsFluent.a11y.forces.sumOfForcesArrow.createProperty( {
          description: description,
          direction: direction
        } );
        forceDescriptions.push( sumForceProperty );
      }
    }

    // Create the list if we have any items, otherwise hide the component
    if ( forceDescriptions.length > 0 ) {
      this.forcesList = new AccessibleListNode( forceDescriptions );
      this.addChild( this.forcesList );
      this.visible = true;
    }
    else {
      this.visible = false;
    }
  }

  /**
   * Gets the appropriate description for a force value based on whether values are shown
   */
  private getForceDescription( force: number, showValues: boolean ): string {
    const magnitude = Math.abs( force );

    if ( showValues ) {
      // Quantitative description with newtons using Fluent pattern
      return ForcesAndMotionBasicsFluent.a11y.forces.quantitativeDescription.createProperty( {
        forceMagnitude: magnitude.toString()
      } ).value;
    }
    else {
      // Qualitative description using same thresholds as ReadoutArrow
      return getQualitativeForceDescription( magnitude );
    }
  }
}

forcesAndMotionBasics.register( 'ForcesListDescription', ForcesListDescription );