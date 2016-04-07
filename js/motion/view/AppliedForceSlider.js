// Copyright 2013-2015, University of Colorado Boulder

/**
 * 
 * 
 * @author Sam Reid
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SliderKnob = require( 'FORCES_AND_MOTION_BASICS/common/view/SliderKnob' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var HSlider = require( 'SUN/HSlider' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  /**
   * Constructor.
   * 
   * @param {MotionModel} model
   * @param {Property<Boolean>} disableLeftProperty
   * @param {Property<Boolean>} disableRightProperty
   * @param {Object} range - the range of values for the slider
   * @param {Object} [options]
   * @constructor
   */
  function AppliedForceSlider( model, disableLeftProperty, disableRightProperty, range, options ) {
    
    var thisSlider = this;
    this.range = range;

    var sliderKnob = new SliderKnob();
    HSlider.call( this, model.appliedForceProperty, range, _.extend( { 
      trackSize: new Dimension2( 300, 6 ),
      snapValue: 0,
      majorTickLength: 30,
      minorTickLength: 22,
      tickLabelSpacing: 3,
      thumbNode: sliderKnob
    }, options ) );

    // Note: I do not like this method of canceling, it relies on the assumption that the slider will end drag
    // when thisSlider.enabled is set to false. This solution should be fine until we have general support for
    // this kind of thing in scenery
    var cancelDrag = function() {
      thisSlider.enabled = false;
      thisSlider.enabled = true;
    };
    model.speedClassificationProperty.link( function( speedClassification ) {
      if( model.friction > 0 ) {
        // if we have any friction, all we want to do is cancel the drag so the pusher does not 
        // rapidly stand up again
        if( speedClassification !== 'WITHIN_ALLOWED_RANGE' ) {
          cancelDrag();
        }
      }
      else {
        // otherwise, we will want to disable a portion of the slider depending on the direciton of the stacks
        if( speedClassification === 'RIGHT_SPEED_EXCEEDED' ) {
          thisSlider.enabledRange = { min: range.min, max: 0 };
        }
        else if( speedClassification === 'LEFT_SPEED_EXCEEDED' ) {
          thisSlider.enabledRange = { min: 0, max: range.max };
        }
        else {
          thisSlider.enabledRange = { min: range.min, max: range.max };
        }
      }
    } );

    // when the model is paused, the slider should not snap to a value so the user can set up a state of forces
    model.playProperty.link( function( play ) {
      if( play ) {
        thisSlider.snapValue = 0;
      }
      else {
        thisSlider.snapValue = null;
      }
    } );

    // when the slider is disabled, the thumb should be disabled as well
    // no need for dispose, slider exist for lifetime of sim
    this.enabledProperty.link( function ( enabled ) {
      sliderKnob.enabledProperty.value = enabled;
    } );

    // add normal ticks
    this.addNormalTicks();
  }

  forcesAndMotionBasics.register( 'AppliedForceSlider', AppliedForceSlider );

  return inherit( HSlider, AppliedForceSlider, {

    //Add ticks at regular intervals in 8 divisions
    addNormalTicks: function() {

      var thisSlider = this;
      var range = thisSlider.range;

      var initialTickValue = range.min;

      //Constants and functions for creating the ticks
      var numDivisions = 10; //e.g. divide the ruler into 1/8ths
      var numTicks = numDivisions + 1; //ticks on the end
      var delta = ( range.max - range.min ) / numDivisions;

      var isMajor = function( tickIndex ) { return tickIndex % 5 === 0; };

      //Generate each of the ticks and add to the parent
      _.range( numTicks ).forEach( function( i ) {

        var location = initialTickValue + i * delta;
        if( isMajor( i ) ) {
          var label = new Text( location, { font: new PhetFont( 16 ) } );
          thisSlider.addMajorTick( location, label );
        }
        else {
          thisSlider.addMinorTick( location );
        }
      } );
    }
  } );
} );
