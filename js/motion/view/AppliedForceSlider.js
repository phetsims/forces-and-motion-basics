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
   * @param {Property<Number>} appliedForceProperty - the numeric value for the slider
   * @param {Object} range - the range of values for the slider 
   * @param {Property<string>} speedClassificationProperty - 'RIGHT_SPEED_EXCEEDED', 'LEFT_SPEED_EXCEEDED' or 'WITHIN_ALLOWED_RANGE'
   * @param {Property<Boolean>} disableLeftProperty
   * @param {Property<Boolean>} disableRightProperty
   * @param {Object} [options]
   * @constructor
   */
  function AppliedForceSlider( appliedForceProperty, range, speedClassificationProperty, disableLeftProperty, disableRightProperty, options ) {
    
    var thisSlider = this;
    this.range = range;
    HSlider.call( this, appliedForceProperty, range, _.extend( { 
      trackSize: new Dimension2( 300, 6 ),
      snapValue: 0,
      majorTickLength: 30,
      minorTickLength: 22,
      tickLabelSpacing: 3,
      thumbNode: new SliderKnob()
    }, options ) );

    // when the left is disabled, disable that section of the range
    disableLeftProperty.link( function( disableLeft ) {
      thisSlider.enabledRange = disableLeft ? { min: 0, max: range.max } : range;
    } );

    // when the right is disabled, disable that section of the range
    disableRightProperty.link( function( disableRight ) {
      thisSlider.enabledRange = disableRight ? { min: range.min, max: 0 } : range;
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
        // var x1 = linear( range.min, range.max, 0, slider.sliderWidth, i / ( numTicks - 1 ) * (slider.max - slider.min) + slider.min );
        if( isMajor( i ) ) {
          var label = new Text( location, { font: new PhetFont( 16 ) } );
          thisSlider.addMajorTick( location, label );
        }
        else {
          thisSlider.addMinorTick( location );
        }
        // var tick = new Path( Shape.lineSegment( new Vector2( x1, 0 ), new Vector2( x1, isMajor( i ) ? -30 : -22 ) ), {
        //   pickable: false,
        //   stroke: 'black',
        //   lineWidth: 1
        // } );
        // slider.enabledProperty.link( function( enabled ) {tick.stroke = enabled ? 'black' : 'gray';} );
        // slider.ticksLayer.addChild( tick );
        // if ( hasLabel( i ) ) {
        //   var label = new Text( linear( 0, 1, slider.min, slider.max, i / Util.toFixed( (numTicks - 1), 0 ) ), {
        //     pickable: false,
        //     centerX: tick.centerX,
        //     bottom: tick.top,
        //     font: new PhetFont( 16 )
        //   } );
        //   slider.enabledProperty.link( function( enabled ) {label.fill = enabled ? 'black' : 'gray';} );
        //   slider.ticksLayer.addChild( label );
        // }
      } );

      //Return this for chaining
      // return this;
    },

    // //Add the tick for the specified value, so that the node will be centered on the location specified and just at the edge of the track.
    // addTick: function( value, tickAndLabelNode ) {
    //   tickAndLabelNode.centerX = linear( 0, 1, 0, this.sliderWidth, value );
    //   tickAndLabelNode.bottom = 0;
    //   this.ticksLayer.addChild( tickAndLabelNode );
    //   return this;
    // },

    //Set the entire slider to be enabled or disabled
    set enabled( value ) { this.enabledProperty.set( value ); },

    //Determine whether the slider is enabled or not
    get enabled() { return this.enabledProperty.get(); }
  } );
} );
