// Copyright 2025, University of Colorado Boulder

/**
 * FrictionSlider encapsulates the friction coefficient slider UI and accessibility.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import HSlider from '../../../../sun/js/HSlider.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import MotionModel from '../model/MotionModel.js';
import MotionConstants from '../MotionConstants.js';

export default class FrictionSlider extends VBox {
  public constructor( model: MotionModel, fontSize: number, maxTextWidth: number, tandem: Tandem ) {
    super();

    const frictionRange = new Range( 0, MotionConstants.MAX_FRICTION );
    const frictionSliderTandem = tandem.createTandem( 'frictionSlider' );

    // Keep label in sync with slider position
    const frictionText = new Text( ForcesAndMotionBasicsFluent.frictionStringProperty, {
      font: new PhetFont( { size: fontSize, weight: 'bold' } ),
      maxWidth: maxTextWidth
    } );

    // Track the value at the start of the current interaction to classify the change at end
    const interactionStartValueProperty = new Property( model.frictionCoefficientProperty.value, { tandem: Tandem.OPT_OUT } );

    const numberOfMinorTicks = 3;

    let isInteracting = false;
    const frictionSlider = new HSlider( model.frictionCoefficientProperty, frictionRange, {
      trackSize: new Dimension2( 150, 6 ),
      majorTickLength: 18,
      tickLabelSpacing: 3,
      valueChangeSoundGeneratorOptions: {
        numberOfMiddleThresholds: numberOfMinorTicks
      },
      tandem: frictionSliderTandem,

      // Accessibility
      accessibleName: ForcesAndMotionBasicsFluent.frictionStringProperty,
      accessibleHelpText: ForcesAndMotionBasicsFluent.a11y.motionScreen.frictionSlider.accessibleHelpTextStringProperty,
      keyboardStep: 0.05,
      shiftKeyboardStep: 0.01,
      pageKeyboardStep: 0.10,

      // Start/end hooks for context response classification
      startDrag: () => {
        isInteracting = true;
        interactionStartValueProperty.value = model.frictionCoefficientProperty.value;
      },
      endDrag: () => {

        isInteracting = false;
      }
    } );

    model.frictionCoefficientProperty.lazyLink( ( friction, oldFriction ) => {
      if ( isInteracting ) {
        affirm( friction !== oldFriction, 'unexpected lazy link' );
        if ( friction > oldFriction ) {
          frictionSlider.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.motionScreen.frictionSlider.contextResponse.rougherStringProperty.value );
        }
        else if ( friction === 0 ) {
          frictionSlider.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.motionScreen.frictionSlider.contextResponse.icyStringProperty.value );
        }
        else {
          frictionSlider.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.motionScreen.frictionSlider.contextResponse.smootherStringProperty.value );
        }
      }
    } );

    // Keep label visibility aligned to slider, and center label over slider (i18n)
    frictionSlider.visibleProperty.linkAttribute( frictionText, 'visible' );
    ForcesAndMotionBasicsFluent.frictionStringProperty.link( () => { frictionText.centerX = frictionSlider.centerX; } );

    // Add minor/major ticks and labels
    for ( let i = 0; i < numberOfMinorTicks; i++ ) {
      frictionSlider.addMinorTick( MotionConstants.MAX_FRICTION / 4 * ( i + 1 ) );
    }
    const sliderTickOptions = { font: new PhetFont( 15 ), maxWidth: 36 };
    frictionSlider.addMajorTick( 0, new Text( ForcesAndMotionBasicsFluent.noneStringProperty, sliderTickOptions ) );
    frictionSlider.addMajorTick( MotionConstants.MAX_FRICTION, new Text( ForcesAndMotionBasicsFluent.lotsStringProperty, sliderTickOptions ) );

    this.children = [ frictionText, frictionSlider ];
  }
}

forcesAndMotionBasics.register( 'FrictionSlider', FrictionSlider );