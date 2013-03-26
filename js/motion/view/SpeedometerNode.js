define( function( require ) {
  "use strict";

  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Inheritance = require( 'PHETCOMMON/util/Inheritance' );

  var ANGLE_PER_TICK = Math.PI * 2 / 4 / 8;
  var NUM_TICKS = ( 8 + 2 ) * 2 + 1;

  //TODO: put in math util or dot
  function linear( min1, max1, min2, max2, value1 ) {
    return (max2 - min2) / (max1 - min1) * (value1 - min1 ) + min2;
  }

  function SpeedometerNode( velocityProperty, options ) {
    Node.call( this, options );
    var radius = 100;
    this.addChild( new Path( {shape: Shape.circle( 0, 0, radius ), fill: 'white', stroke: '#555555', lineWidth: 2} ) );

    var needle = new Path( {shape: Shape.lineSegment( 0, 0, radius, 0 ), stroke: 'red', lineWidth: 3} );
    this.addChild( needle );

    var pin = new Path( {shape: Shape.circle( 0, 0, 2 ), fill: 'black'} );
    this.addChild( pin );

    var totalAngle = (NUM_TICKS - 1) * ANGLE_PER_TICK;
    var startAngle = -Math.PI / 4 - totalAngle / 2;
    var endAngle = startAngle + totalAngle;

    velocityProperty.link( function( model, velocity ) {
      needle.resetTransform();

      var needleAngle = linear( 0, 20, startAngle, endAngle, Math.abs( velocity ) );
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

  Inheritance.inheritPrototype( SpeedometerNode, Node );

  return SpeedometerNode;
} );