define( function( require ) {
  "use strict";

  var Image = require( 'SCENERY/nodes/Image' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var linear = require( 'DOT/Util' ).linear;

  var ANGLE_PER_TICK = Math.PI * 2 / 4 / 8;
  var NUM_TICKS = ( 8 + 2 ) * 2 + 1;

  function SpeedometerNode( velocityProperty, options ) {
    this.isCentered = true;
    Node.call( this, options );
    var radius = 100;
    this.addChild( new Circle( radius, {fill: 'white', stroke: '#555555', lineWidth: 2} ) );

    var needle = new Path( {shape: Shape.lineSegment( 0, 0, radius, 0 ), stroke: 'red', lineWidth: 3} );
    this.addChild( needle );

    this.label = new Text( "Speed", {fontSize: 28} ).mutate( {centerX: 0, centerY: -radius / 3} );
    this.addChild( this.label );

    var pin = new Circle( 2, {fill: 'black'} );
    this.addChild( pin );

    var totalAngle = (NUM_TICKS - 1) * ANGLE_PER_TICK;
    var startAngle = -1 / 2 * Math.PI - totalAngle / 2;
    var endAngle = startAngle + totalAngle;

    velocityProperty.link( function( velocity ) {
      needle.resetTransform();

      //TODO: factor out max speed constant
      var needleAngle = linear( 0, startAngle, 20, endAngle, Math.abs( velocity ) );
      needle.rotateAround( {x: 0, y: 0}, needleAngle );
    } );

    for ( var i = 0; i < NUM_TICKS; i++ ) {
      var tickAngle = i * ANGLE_PER_TICK + startAngle;
      var tickLength = i % 2 === 0 ? 20 : 10;
      var lineWidth = i % 2 === 0 ? 2 : 1;
      var tick = new Path( {shape: Shape.lineSegment( (radius - tickLength) * Math.cos( tickAngle ), (radius - tickLength) * Math.sin( tickAngle ), radius * Math.cos( tickAngle ), radius * Math.sin( tickAngle ) ), stroke: 'gray', lineWidth: lineWidth} );
      this.addChild( tick );
    }
  }

  inherit( SpeedometerNode, Node );

  return SpeedometerNode;
} );