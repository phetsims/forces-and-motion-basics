// Copyright 2016-2017, University of Colorado Boulder

/**
 * Applied Force Slider of the Motion screens.  If the model velocity is larger than the max allowed value,
 * one half of the slider will become disabled depending on the direction of velocity.  The slider is also disabled
 * when the pusher has fallen over and there is no friction in the model.
 *
 * @author Sam Reid
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  var Dimension2 = require( 'DOT/Dimension2' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var SliderKnob = require( 'FORCES_AND_MOTION_BASICS/common/view/SliderKnob' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );

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

    var self = this;
    this.range = range;

    // for phet-io so that the slider can be disabled by wrappers
    // TODO: Remove once https://github.com/phetsims/forces-and-motion-basics/issues/242 and the associated issue
    // in sun is resolved.
    var sliderEnabledProperty = new Property( true, {
      tandem: tandem.createTandem( 'sliderEnabledProperty' ),
      phetioValueType: TBoolean
    } );

    var sliderKnob = new SliderKnob( tandem.createTandem( 'sliderKnob' ) );
    HSlider.call( this, model.appliedForceProperty, range, _.extend( {
      trackSize: new Dimension2( 300, 6 ),
      snapValue: 0,
      majorTickLength: 30,
      minorTickLength: 22,
      tickLabelSpacing: 3,
      thumbNode: sliderKnob,
      enabledProperty: sliderEnabledProperty,
      tandem: tandem,

      // round so that applied force is not more precise than friction force
      constrainValue: function( value ) { return Util.roundSymmetric( value ); }
    }, options ) );

    // Note: I do not like this method of canceling, it relies on the assumption that the slider will end drag
    // when thisSlider.enabled is set to false. This solution should be fine until we have general support for
    // this kind of thing in scenery
    var cancelDrag = function() {
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
          self.enabledRange = { min: range.min, max: range.max };
        }
      }
      else {
        // otherwise, we will want to disable a portion of the slider depending on the direciton of the stacks
        if ( speedClassification === 'RIGHT_SPEED_EXCEEDED' ) {
          self.enabledRange = { min: range.min, max: 0 };
        }
        else if ( speedClassification === 'LEFT_SPEED_EXCEEDED' ) {
          self.enabledRange = { min: 0, max: range.max };
        }
        else {
          self.enabledRange = { min: range.min, max: range.max };
        }
      }
    } );

    // when the model is paused, the slider should not snap to a value so the user can set up a state of forces
    model.playProperty.link( function( play ) {
      if ( play ) {
        self.snapValue = 0;
      }
      else {
        self.snapValue = null;
      }
    } );

    // when the slider is disabled, the thumb should be disabled as well
    // no need for dispose, slider exist for lifetime of sim
    this.enabledProperty.link( function( enabled ) {
      sliderKnob.enabledProperty.value = enabled;
    } );

    //Add ticks at regular intervals in 8 divisions
    var initialTickValue = range.min;

    //Constants and functions for creating the ticks
    var numDivisions = 10; //e.g. divide the ruler into 1/8ths
    var numTicks = numDivisions + 1; //ticks on the end
    var delta = ( range.max - range.min ) / numDivisions;

    var isMajor = function( tickIndex ) { return tickIndex % 5 === 0; };

    //Generate each of the ticks and add to the parent
    _.range( numTicks ).forEach( function( i ) {

      var location = initialTickValue + i * delta;
      if ( isMajor( i ) ) {
        var label = new Text( location, {
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

  return inherit( HSlider, AppliedForceSlider );
} );
