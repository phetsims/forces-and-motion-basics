// Copyright 2016-2025, University of Colorado Boulder

/**
 * Applied Force Slider of the Motion screens.  If the model velocity is larger than the max allowed value,
 * one half of the slider will become disabled depending on the direction of velocity.  The slider is also disabled
 * when the pusher has fallen over and there is no friction in the model.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import HSlider from '../../../../sun/js/HSlider.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import MotionModel from '../model/MotionModel.js';

const NUMBER_OF_DIVISIONS = 10; // e.g. divide the ruler into 1/8ths
const NUMBER_OF_TICKS = NUMBER_OF_DIVISIONS + 1; // ticks on the end

export default class AppliedForceSlider extends HSlider {

  /**
   * @param model
   * @param range - the range of values for the slider
   * @param tandem
   * @param providedOptions
   */
  public constructor( model: MotionModel, range: Range, tandem: Tandem ) {

    const enabledRangeProperty = new Property( range );

    super( model.appliedForceProperty, range, {
      trackSize: new Dimension2( 300, 6 ),
      majorTickLength: 30,
      minorTickLength: 22,
      tickLabelSpacing: 3,
      enabledRangeProperty: enabledRangeProperty,
      enabledPropertyOptions: {
        phetioReadOnly: true
      },
      valueChangeSoundGeneratorOptions: {
        numberOfMiddleThresholds: NUMBER_OF_DIVISIONS - 1
      },
      tandem: tandem,

      // Remove the slider from the tab order, the alt-input controls the number control above it, see https://github.com/phetsims/forces-and-motion-basics/issues/378
      pdomVisible: false,

      // round so that applied force is not more precise than friction force
      constrainValue: ( value: number ) => Utils.roundSymmetric( value ),

      // snap to zero on release - when the model is paused, the slider should not snap to a value so the user can set
      // up a state of forces
      endDrag: () => {
        if ( model.isPlayingProperty.get() ) {
          model.appliedForceProperty.value = 0;
        }
      }
    } );

    // Note: I do not like this method of canceling, it relies on the assumption that the slider will end drag
    // when thisSlider.enabled is set to false. This solution should be fine until we have general support for
    // this kind of thing in scenery
    const cancelDrag = () => {
      this.enabled = false;
      this.enabled = true;
    };

    Multilink.multilink(
      [ model.speedClassificationProperty, model.frictionCoefficientProperty ],
      ( speedClassification, friction ) => {
        if ( friction > 0 ) {
          // if we have any friction, all we want to do is cancel the drag so the pusher does not
          // rapidly stand up again
          if ( speedClassification !== 'WITHIN_ALLOWED_RANGE' ) {
            cancelDrag();
          }
          else {
            enabledRangeProperty.value = new Range( range.min, range.max );
          }
        }
        else {

          // otherwise, we will want to disable a portion of the slider depending on the direciton of the stacks
          if ( speedClassification === 'RIGHT_SPEED_EXCEEDED' ) {
            enabledRangeProperty.value = new Range( range.min, 0 );
          }
          else if ( speedClassification === 'LEFT_SPEED_EXCEEDED' ) {
            enabledRangeProperty.value = new Range( 0, range.max );
          }
          else {
            enabledRangeProperty.value = new Range( range.min, range.max );
          }
        }
      } );

    // when the slider is disabled, the thumb should be disabled as well
    // no need for dispose, slider exist for lifetime of sim
    this.enabledProperty.link( enabled => {
      this.enabledProperty.value = enabled;
    } );

    // Add ticks at regular intervals in 8 divisions
    const initialTickValue = range.min;

    // Constants and functions for creating the ticks
    const delta = ( range.max - range.min ) / NUMBER_OF_DIVISIONS;
    const isMajor = ( tickIndex: number ) => ( tickIndex % 5 === 0 );

    // Generate each of the ticks and add to the parent
    _.times( NUMBER_OF_TICKS, i => {

      const position = initialTickValue + i * delta;
      if ( isMajor( i ) ) {
        const label = new Text( position, {
          font: new PhetFont( 16 )
        } );
        this.addMajorTick( position, label );
      }
      else {
        this.addMinorTick( position );
      }
    } );
  }
}

forcesAndMotionBasics.register( 'AppliedForceSlider', AppliedForceSlider );