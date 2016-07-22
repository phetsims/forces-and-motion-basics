// Copyright 2013-2015, University of Colorado Boulder

/**
 * A rounded slider knob that shows with grip 'dots' to indicate that it is grabbable.  Based on artwork by Noah Podolefsky.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var TandemNode = require( 'TANDEM/scenery/nodes/TandemNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var Property = require( 'AXON/Property' );

  // phet-io types
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );

  /**
   * Constructor.
   *
   * @param {object} options
   */
  function SliderKnob( tandem, options ) {

    options = _.extend( {
      enabledProperty: new Property( true, {
        tandem: tandem.createTandem( 'enabledProperty' ),
        type: TBoolean
      } )
    }, options );
    this.enabledProperty = options.enabledProperty;

    // different fill colors for when the slider is enabled or disabled
    var enabledFillColor = '#2FB0E4';
    var disabledFillColor = 'gray';
    var enabledColorStop = '#B8E4FB';
    var disabledColorStop = 'white';

    TandemNode.call( this, {
      tandem: tandem
    } );

    //Add the rounded rectangle background
    var scale = 0.8;
    var width = 20 * scale;
    var height = 50 * scale;
    var enabledGradient = new LinearGradient( -width / 2, 0, width / 2, 0 ).addColorStop( 0, enabledFillColor ).addColorStop( 0.5, enabledColorStop ).addColorStop( 1, enabledFillColor );
    var disabledGradient = new LinearGradient( -width / 2, 0, width / 2, 0 ).addColorStop( 0, disabledFillColor ).addColorStop( 0.5, disabledColorStop ).addColorStop( 1, disabledFillColor );

    var rectangle = new Rectangle( -width / 2, 0, width, height, 10 * scale, 10 * scale, {
      fill: this.enabledProperty.value ? enabledGradient : 'gray',
      stroke: this.enabledProperty.value ? 'black' : 'gray',
      lineWidth: 2
    } );
    this.addChild( rectangle );

    // link the fill to the enabled property
    // slider knob exists for lifetime of sim, no dispose necessary
    this.enabledProperty.link( function( enabled ) {
      rectangle.fill = enabled ? enabledGradient : disabledGradient;
    } );

    //add a grid of grip dots
    var dx = width / 5;
    var dy = height / 6;
    this.addGripDot( -dx, height / 2 - dy );
    this.addGripDot( dx, height / 2 - dy );
    this.addGripDot( -dx, height / 2 );
    this.addGripDot( dx, height / 2 );
    this.addGripDot( -dx, height / 2 + dy );
    this.addGripDot( dx, height / 2 + dy );

    // Make sure the slider knob is perfectly centered on the tick marks.  Not sure why this workaround is necessary,
    // but it seems to perfectly center the knob.
    this.translate( 1, 0 );
  }

  forcesAndMotionBasics.register( 'SliderKnob', SliderKnob );

  return inherit( TandemNode, SliderKnob, {
    addGripDot: function( x, y ) {
      var radius = 1.8;
      var stroke = new LinearGradient( -radius, -radius, radius * 2, radius * 2 ).addColorStop( 0, 'black' ).addColorStop( 0.5, '#56889F' ).addColorStop( 1, 'white' );
      this.addChild( new Circle( radius, {
        x: x,
        y: y,
        fill: this.enabledProperty ? '#56889F' : 'gray',
        stroke: this.enabledProperty ? stroke : 'gray',
        lineWidth: 1
      } ) );
    }
  } );
} );