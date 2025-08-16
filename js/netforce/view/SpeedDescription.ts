// Copyright 2025, University of Colorado Boulder

/**
 * SpeedDescription provides an accessible description of the current cart speed in the Net Force screen.
 * This appears under a "Speed" heading and shows only when the speed checkbox is checked.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import AccessibleListNode from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import NetForceModel from '../model/NetForceModel.js';

export default class SpeedDescription extends Node {

  private speedList: AccessibleListNode | null = null;

  public constructor( private readonly model: NetForceModel ) {
    super( {
      tagName: 'div',
      accessibleHeading: ForcesAndMotionBasicsFluent.a11y.speed.headingStringProperty
    } );

    // Update the speed list when relevant properties change
    const updateListener = () => this.updateSpeedList();
    
    this.model.speedProperty.link( updateListener );
    this.model.showSpeedProperty.link( updateListener );

    // Initial update
    this.updateSpeedList();
  }

  /**
   * Updates the speed list content based on current speed and visibility
   */
  private updateSpeedList(): void {
    // Remove existing list
    this.removeAllChildren();

    const showSpeed = this.model.showSpeedProperty.value;
    
    // Only show the component if speed checkbox is checked
    if ( showSpeed ) {
      const speed = Math.abs( this.model.speedProperty.value );
      const speedDescription = this.getQualitativeSpeedDescription( speed );
      
      const speedProperty = ForcesAndMotionBasicsFluent.a11y.speed.cartSpeed.createProperty( {
        speedDescription: speedDescription
      } );
      
      this.speedList = new AccessibleListNode( [ speedProperty ] );
      this.addChild( this.speedList );
      this.visible = true;
    }
    else {
      this.visible = false;
    }
  }

  /**
   * Gets the appropriate qualitative description for a speed value
   * Speed range is 0 to ~3.76215, divided into 5 gradations
   */
  private getQualitativeSpeedDescription( speed: number ): string {
    if ( speed < 0.1 ) {
      return ForcesAndMotionBasicsFluent.a11y.speed.qualitativeDescriptions.stationaryStringProperty.value;
    }
    else if ( speed < 0.75 ) {
      return ForcesAndMotionBasicsFluent.a11y.speed.qualitativeDescriptions.verySlowStringProperty.value;
    }
    else if ( speed < 1.5 ) {
      return ForcesAndMotionBasicsFluent.a11y.speed.qualitativeDescriptions.slowStringProperty.value;
    }
    else if ( speed < 2.5 ) {
      return ForcesAndMotionBasicsFluent.a11y.speed.qualitativeDescriptions.mediumStringProperty.value;
    }
    else {
      return ForcesAndMotionBasicsFluent.a11y.speed.qualitativeDescriptions.fastStringProperty.value;
    }
  }
}

forcesAndMotionBasics.register( 'SpeedDescription', SpeedDescription );