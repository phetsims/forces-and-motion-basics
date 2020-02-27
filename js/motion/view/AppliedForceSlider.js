// Copyright 2016-2019, University of Colorado Boulder

/**
 * Applied Force Slider of the Motion screens.  If the model velocity is larger than the max allowed value,
 * one half of the slider will become disabled depending on the direction of velocity.  The slider is also disabled
 * when the pusher has fallen over and there is no friction in the model.
 *
 * @author Sam Reid
 * @author Jesse Greenberg
 */

import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import HSlider from '../../../../sun/js/HSlider.js';
import SliderKnob from '../../common/view/SliderKnob.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

/**
 * Constructor.
 *
 * @param {MotionModel} model
 * @param {Object} range - the range of values for the slider
 * @param {Tandem} tandem
 * @param {Object} [options]
 * @constructor
 */
function AppliedForceSlider( model, range, tandem, options ) {

  const self = this;
  this.range = range;

  const sliderKnob = new SliderKnob( tandem.createTandem( 'sliderKnob' ) );
  HSlider.call( this, model.appliedForceProperty, range, merge( {
    trackSize: new Dimension2( 300, 6 ),
    majorTickLength: 30,
    minorTickLength: 22,
    tickLabelSpacing: 3,
    thumbNode: sliderKnob,
    tandem: tandem,

    // round so that applied force is not more precise than friction force
    constrainValue: function( value ) { return Utils.roundSymmetric( value ); },

    // snap to zero on release - when the model is paused, the slider should not snap to a value so the user can set
    // up a state of forces
    endDrag: function() {
      if ( model.playProperty.get() ) {
        model.appliedForceProperty.set( 0 );
      }
    }
  }, options ) );

  // Note: I do not like this method of canceling, it relies on the assumption that the slider will end drag
  // when thisSlider.enabled is set to false. This solution should be fine until we have general support for
  // this kind of thing in scenery
  const cancelDrag = function() {
    self.enabled = false;
    self.enabled = true;
  };

  Property.multilink( [ model.speedClassificationProperty, model.frictionProperty ], function( speedClassification, friction ) {
    if ( friction > 0 ) {
      // if we have any friction, all we want to do is cancel the drag so the pusher does not
      // rapidly stand up again
      if ( speedClassification !== 'WITHIN_ALLOWED_RANGE' ) {
        cancelDrag();
      }
      else {
        self.enabledRange = new Range( range.min, range.max );
      }
    }
    else {

      // otherwise, we will want to disable a portion of the slider depending on the direciton of the stacks
      if ( speedClassification === 'RIGHT_SPEED_EXCEEDED' ) {
        self.enabledRange = new Range( range.min, 0 );
      }
      else if ( speedClassification === 'LEFT_SPEED_EXCEEDED' ) {
        self.enabledRange = new Range( 0, range.max );
      }
      else {
        self.enabledRange = new Range( range.min, range.max );
      }
    }
  } );

  // when the slider is disabled, the thumb should be disabled as well
  // no need for dispose, slider exist for lifetime of sim
  this.enabledProperty.link( function( enabled ) {
    sliderKnob.enabledProperty.value = enabled;
  } );

  //Add ticks at regular intervals in 8 divisions
  const initialTickValue = range.min;

  //Constants and functions for creating the ticks
  const numDivisions = 10; //e.g. divide the ruler into 1/8ths
  const numTicks = numDivisions + 1; //ticks on the end
  const delta = ( range.max - range.min ) / numDivisions;

  const isMajor = function( tickIndex ) { return tickIndex % 5 === 0; };

  //Generate each of the ticks and add to the parent
  _.range( numTicks ).forEach( function( i ) {

    const location = initialTickValue + i * delta;
    if ( isMajor( i ) ) {
      const label = new Text( location, {
        font: new PhetFont( 16 ),
        tandem: tandem.createTandem( 'tick' + i )
      } );
      self.addMajorTick( location, label );
    }
    else {
      self.addMinorTick( location );
    }
  } );
}

forcesAndMotionBasics.register( 'AppliedForceSlider', AppliedForceSlider );

inherit( HSlider, AppliedForceSlider );
export default AppliedForceSlider;