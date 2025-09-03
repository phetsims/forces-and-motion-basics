// Copyright 2025, University of Colorado Boulder

/**
 * SpeedDescription provides an accessible description of the current cart speed in the Net Force screen.
 * This appears under a "Speed" heading and shows only when the speed checkbox is checked.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import NetForceModel from '../model/NetForceModel.js';

export default class SpeedDescription extends Node {

  public constructor( model: NetForceModel ) {

    const qualitativeSpeedProperty = new DerivedProperty(
      [ model.speedProperty ],
      speed => this.getQualitativeSpeedDescription( Math.abs( speed ) )
    );

    const accelerationDescriptionProperty = new DerivedProperty(
      [ model.netForceProperty, model.cart.velocityProperty ],
      ( netForce, velocity ) => this.getAccelerationDescription( netForce, velocity )
    );

    const cartSpeedWithAccelerationProperty = ForcesAndMotionBasicsFluent.a11y.speed.cartSpeedWithAcceleration.createProperty( {
      speedDescription: qualitativeSpeedProperty,
      accelerationDescription: accelerationDescriptionProperty
    } );

    const cartSpeedProperty = ForcesAndMotionBasicsFluent.a11y.speed.cartSpeed.createProperty( {
      speedDescription: qualitativeSpeedProperty
    } );

    // Create a derived property for the speed description paragraph
    const speedDescriptionProperty = new DerivedProperty(
      [

        model.showSpeedProperty,

        accelerationDescriptionProperty,

        cartSpeedWithAccelerationProperty,
        cartSpeedProperty,
        model.speedProperty,

        model.netForceProperty,
        model.cart.velocityProperty,

        qualitativeSpeedProperty,

        // String dependencies from getQualitativeSpeedDescription
        ForcesAndMotionBasicsFluent.a11y.speed.qualitativeDescriptions.stationaryStringProperty,
        ForcesAndMotionBasicsFluent.a11y.speed.qualitativeDescriptions.verySlowStringProperty,
        ForcesAndMotionBasicsFluent.a11y.speed.qualitativeDescriptions.slowStringProperty,
        ForcesAndMotionBasicsFluent.a11y.speed.qualitativeDescriptions.mediumStringProperty,
        ForcesAndMotionBasicsFluent.a11y.speed.qualitativeDescriptions.fastStringProperty,

        // String dependencies from getAccelerationDescription
        ForcesAndMotionBasicsFluent.a11y.speed.accelerationDescriptions.speedingUpStringProperty,
        ForcesAndMotionBasicsFluent.a11y.speed.accelerationDescriptions.slowingDownStringProperty
      ],
      ( showSpeed, accelerationDescription, cartSpeedWithAcceleration, cartSpeed ) => {
        if ( showSpeed ) {

          // Use different strings based on whether there's acceleration
          if ( accelerationDescription ) {
            return cartSpeedWithAcceleration;
          }
          else {
            return cartSpeed;
          }
        }
        else {
          return '';
        }
      }
    );

    super( {
      tagName: 'div',
      accessibleHeading: ForcesAndMotionBasicsFluent.a11y.speed.headingStringProperty,
      accessibleParagraph: speedDescriptionProperty
    } );

    // Update visibility based on showSpeedProperty
    model.showSpeedProperty.link( showSpeed => {
      this.visible = showSpeed;
    } );
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

  /**
   * Gets the appropriate acceleration description based on net force and velocity direction
   * If there is no net force, no acceleration description is added.
   * If net force is in the same direction as velocity, the cart is speeding up.
   * If net force is opposite to velocity, the cart is slowing down.
   */
  private getAccelerationDescription( netForce: number, velocity: number ): string {
    // No net force means no acceleration
    if ( Math.abs( netForce ) < 0.1 ) {
      return '';
    }

    // If velocity is very small, don't add acceleration description (cart is essentially stationary)
    if ( Math.abs( velocity ) < 0.1 ) {
      return '';
    }

    // Check if force and velocity are in the same direction
    const sameDirection = ( netForce > 0 && velocity > 0 ) || ( netForce < 0 && velocity < 0 );

    if ( sameDirection ) {
      return ForcesAndMotionBasicsFluent.a11y.speed.accelerationDescriptions.speedingUpStringProperty.value;
    }
    else {
      return ForcesAndMotionBasicsFluent.a11y.speed.accelerationDescriptions.slowingDownStringProperty.value;
    }
  }
}

forcesAndMotionBasics.register( 'SpeedDescription', SpeedDescription );