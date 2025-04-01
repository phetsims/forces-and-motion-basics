// Copyright 2025, University of Colorado Boulder

import Multilink from '../../../../axon/js/Multilink.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import FineCoarseSpinner from '../../../../scenery-phet/js/FineCoarseSpinner.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';
import MotionModel from '../model/MotionModel.js';
import AppliedForceSlider from './AppliedForceSlider.js';

const pattern0ValueUnitsNewtonsStringProperty = ForcesAndMotionBasicsStrings.pattern[ '0valueUnitsNewtonsStringProperty' ];
const appliedForceStringProperty = ForcesAndMotionBasicsStrings.appliedForceStringProperty;

/**
 * Container for all labels and titles for the applied force control.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class AppliedForceControl extends VBox {
  public constructor( tandem: Tandem, maxTextWidth: number, model: MotionModel ) {

    //Create the slider
    const disableText = ( node: Text ) => ( length: number ) => {node.fill = length === 0 ? 'gray' : 'black';};

    const appliedForceTitle = new Text( appliedForceStringProperty, {
      font: new PhetFont( 22 ),
      maxWidth: maxTextWidth,
      layoutOptions: {
        bottomMargin: 15
      }
    } );
    const appliedForceSlider = new AppliedForceSlider( model, new Range( -500, 500 ), tandem.createTandem( 'slider' ) );

    // Do not allow the user to apply a force that would take the object beyond its maximum velocity
    // The appliedForce range will change depending on whether the stack has exceeded maximum speed. This will
    // most often be in cases where there is no friction, because the speed will remain at maximum values and we
    // do not want to allow additional applied force at that time
    Multilink.lazyMultilink( [ model.appliedForceProperty, model.speedClassificationProperty, model.stackSizeProperty ],
      ( appliedForce, speedClassification, stackSize ) => {
        const enableRightButtons = ( stackSize > 0 && ( speedClassification !== 'RIGHT_SPEED_EXCEEDED' ) );
        const enableLeftButtons = ( stackSize > 0 && ( speedClassification !== 'LEFT_SPEED_EXCEEDED' ) );

        const rangeMax = enableRightButtons ? 500 : 0;
        const rangeMin = enableLeftButtons ? -500 : 0;
        const range = new Range( rangeMin, rangeMax );

        // The applied force Property has a dynamic range that changes depending on whether the max speed has been
        // reached or not. Therefore, we need to ensure that the applied force value is clamped within range
        // when the range changes.
        model.appliedForceProperty.value = Utils.clamp( model.appliedForceProperty.value, range.min, range.max );
        model.appliedForceProperty.range = range;
      } );

    const spinner = new FineCoarseSpinner( model.appliedForceProperty, {
      numberDisplayOptions: {
        valuePattern: pattern0ValueUnitsNewtonsStringProperty,
        align: 'center',
        xMargin: 20,
        yMargin: 4,
        textOptions: {
          font: new PhetFont( 22 ),
          maxWidth: maxTextWidth / 3,
          tandem: Tandem.OPT_OUT
        }
      },
      deltaFine: 1,
      deltaCoarse: 50,
      spacing: 6,
      visiblePropertyOptions: { phetioFeatured: true },
      tandem: tandem.createTandem( 'spinner' )
    } );
    model.fallenProperty.link( fallen => {
      fallen && spinner.interruptSubtreeInput();
    } );
    // children.push( appliedForceSpinner );

    // force cannot be applied when there is nothing on the stack
    model.stackSizeProperty.link( size => {
      spinner.enabled = size > 0;
    } );

    model.stackedItems.lengthProperty.link( disableText( appliedForceTitle ) );
    model.stackedItems.lengthProperty.link( length => { appliedForceSlider.enabled = length > 0; } );

    super( {
      phetioFeatured: true,
      spacing: 12,
      children: [
        appliedForceTitle,
        spinner,
        appliedForceSlider
      ],
      phetioEnabledPropertyInstrumented: true,
      visiblePropertyOptions: {
        phetioFeatured: true
      },
      tandem: tandem
    } );

    this.addLinkedElement( model.appliedForceProperty );
  }
}

forcesAndMotionBasics.register( 'AppliedForceControl', AppliedForceControl );