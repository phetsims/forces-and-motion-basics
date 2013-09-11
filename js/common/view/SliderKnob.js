// Copyright 2002-2013, University of Colorado Boulder

/**
 * A rounded slider knob that shows with grip 'dots' to indicate that it is grabbable.  Based on artwork by Noah Podolefsky.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );

  function SliderKnob( options ) {

    options = _.extend( { enabled: true }, options );
    this.enabled = options.enabled;

    Node.call( this );

    //Add the rounded rectangle background
    var scale = 0.8;
    var width = 20 * scale;
    var height = 50 * scale;
    var gradient = new LinearGradient( 0, 0, width, 0 ).addColorStop( 0, '#2FB0E4' ).addColorStop( 0.5, '#B8E4FB' ).addColorStop( 1, '#2FB0E4' );
    this.addChild( new Rectangle( 0, 0, width, height, 10 * scale, 10 * scale, {fill: this.enabled ? gradient : 'gray', stroke: this.enabled ? 'black' : 'gray', lineWidth: 2} ) );

    //add a grid of grip dots
    var dx = width / 5;
    var dy = height / 6;
    this.addGripDot( width / 2 - dx, height / 2 - dy );
    this.addGripDot( width / 2 + dx, height / 2 - dy );
    this.addGripDot( width / 2 - dx, height / 2 );
    this.addGripDot( width / 2 + dx, height / 2 );
    this.addGripDot( width / 2 - dx, height / 2 + dy );
    this.addGripDot( width / 2 + dx, height / 2 + dy );

    //Make sure the slider knob is perfectly centered on the tick marks.  Not sure why this workaround is necessary, but it seems to perfectly center the knob.
    this.translate( 1, 0 );
  }

  return inherit( Node, SliderKnob, {
    addGripDot: function( x, y ) {
      var radius = 1.8;
      var stroke = new LinearGradient( -radius, -radius, radius * 2, radius * 2 ).
        addColorStop( 0, 'black' ).addColorStop( 0.5, '#56889F' ).addColorStop( 1, 'white' );
      this.addChild( new Circle( radius, {x: x, y: y, fill: this.enabled ? '#56889F' : 'gray', stroke: this.enabled ? stroke : 'gray', lineWidth: 1} ) );
    }
  } );
} );