// Copyright 2013-2025, University of Colorado Boulder

/**
 * A big round Go/Pause button that appears when the user has attached any nonzero number of pullers to the rope
 * which can be used to start/pause the animation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import { BooleanToggleNodeOptions } from '../../../../sun/js/BooleanToggleNode.js';
import BooleanRoundToggleButton from '../../../../sun/js/buttons/BooleanRoundToggleButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import NetForceModel from '../model/NetForceModel.js';
import NetForceHotkeyData from '../NetForceHotkeyData.js';

//Given nodes that have possibly different sizes, wrap the specified node in a parent empty Rectangle node so the bounds will match up
//If the node is already the largest, don't wrap it.
//Centers all the nodes in the parent wrappers

type SelfOptions = EmptySelfOptions;
type GoPauseButtonOptions = BooleanToggleNodeOptions & SelfOptions;
export default class GoPauseButton extends BooleanRoundToggleButton {

  /**
   * Create a GoPauseButton that appears below the candy cart when a puller has been attached to the rope.
   *
   * @param model the NetForceModel
   * @param layoutWidth the layout width for centering the button
   * @param tandem
   * @param providedOptions
   */
  public constructor( model: NetForceModel, layoutWidth: number, tandem: Tandem, providedOptions?: GoPauseButtonOptions ) {

    // Create a derived property for the accessible name that updates based on the button state
    const dynamicAccessibleNameProperty = new DerivedProperty( [
        model.isRunningProperty,
        ForcesAndMotionBasicsFluent.goStringProperty,
        ForcesAndMotionBasicsFluent.pauseStringProperty ],
      ( isRunning, goString, pauseString ) => isRunning ? pauseString : goString );

    // Create a derived property for the help text that updates based on the button state
    const dynamicAccessibleHelpTextProperty = new DerivedProperty( [ model.isRunningProperty,
        ForcesAndMotionBasicsFluent.a11y.netForceScreen.goPauseButton.accessibleHelpTextPauseStringProperty,
        ForcesAndMotionBasicsFluent.a11y.netForceScreen.goPauseButton.accessibleHelpTextGoStringProperty
      ], ( isRunning, accessibleHelpTextPauseString, accessibleHelpTextGoString ) =>
        isRunning ? accessibleHelpTextPauseString : accessibleHelpTextGoString
    );

    const options = optionize<GoPauseButtonOptions, SelfOptions, BooleanToggleNodeOptions>()( {
      top: 400,
      enabledPropertyOptions: {
        phetioReadOnly: true
      },
      accessibleName: dynamicAccessibleNameProperty,
      accessibleHelpText: dynamicAccessibleHelpTextProperty
    }, providedOptions );
    const goText = new Text( ForcesAndMotionBasicsFluent.goStringProperty, {
      font: new PhetFont( 42 ),
      maxWidth: 85
    } );
    const pauseText = new Text( ForcesAndMotionBasicsFluent.pauseStringProperty, {
      font: new PhetFont( 30 ),
      maxWidth: 85
    } );

    // boolean function to determine if the go button should be enabled based on model state.
    const isGoButtonEnabled = () => model.stateProperty.get() !== 'completed' && ( model.numberPullersAttachedProperty.get() > 0 || model.isRunningProperty.get() );

    super( model.isRunningProperty, pauseText, goText, options );

    model.isRunningProperty.link( isRunning => {
      this.baseColor = isRunning ? '#df1a22' : '#94b830';

      // Add accessible context response when Go is pressed
      if ( isRunning ) {
        const velocity = model.cart.velocityProperty.value;
        let movementMessage: string;

        if ( Math.abs( velocity ) < 1E-6 ) {
          // If velocity is essentially zero, check net force to predict movement
          const netForce = model.netForceProperty.value;
          if ( Math.abs( netForce ) < 1E-6 ) {
            movementMessage = ForcesAndMotionBasicsFluent.a11y.netForceScreen.goPauseButton.cartStationaryStringProperty.value;
          }
          else if ( netForce > 0 ) {
            movementMessage = ForcesAndMotionBasicsFluent.a11y.netForceScreen.goPauseButton.cartMovingRightStringProperty.value;
          }
          else {
            movementMessage = ForcesAndMotionBasicsFluent.a11y.netForceScreen.goPauseButton.cartMovingLeftStringProperty.value;
          }
        }
        else if ( velocity > 0 ) {
          movementMessage = ForcesAndMotionBasicsFluent.a11y.netForceScreen.goPauseButton.cartMovingRightStringProperty.value;
        }
        else {
          movementMessage = ForcesAndMotionBasicsFluent.a11y.netForceScreen.goPauseButton.cartMovingLeftStringProperty.value;
        }

        this.addAccessibleContextResponse( movementMessage );
      }
      else {
        this.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.netForceScreen.goPauseButton.cartPausedStringProperty.value );
      }
    } );

    //Show the go/pause button if any pullers are attached or if the cart got started moving, and if it hasn't already finished a match, see #61
    Multilink.multilink( [ model.isRunningProperty, model.stateProperty, model.numberPullersAttachedProperty ], () => {
      this.enabled = isGoButtonEnabled();
    } );

    this.centerX = layoutWidth / 2;

    // Create global keyboard listeners for Go (alt+g) and Pause (alt+p)
    KeyboardListener.createGlobal( this, {
      keyStringProperties: NetForceHotkeyData.GO_HOTKEY_DATA.keyStringProperties,
      fire: () => {
        if ( this.enabled && !model.isRunningProperty.get() ) {
          model.isRunningProperty.set( true );
        }
      }
    } );

    KeyboardListener.createGlobal( this, {
      keyStringProperties: NetForceHotkeyData.PAUSE_HOTKEY_DATA.keyStringProperties,
      fire: () => {
        if ( this.enabled && model.isRunningProperty.get() ) {
          model.isRunningProperty.set( false );
        }
      }
    } );
  }
}

forcesAndMotionBasics.register( 'GoPauseButton', GoPauseButton );