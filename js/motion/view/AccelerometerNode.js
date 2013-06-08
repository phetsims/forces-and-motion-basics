define( function( require ) {
  "use strict";

  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Layout = require( 'Layout' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );

  function AccelerometerNode( accelerationProperty, options ) {

    Node.call( this );
    var height = 15;
    var barWidth = 170;
    var barSideInset = 7;
    var gradient = new LinearGradient( 0, 4, 0, height ).addColorStop( 0, 'white' ).addColorStop( 1, 'rgb( 207, 208, 210 )' );
    var background = new Rectangle( 0 - barSideInset, 0, barWidth + barSideInset * 2, height, 10, 10, { fill: gradient} );

    this.addChild( background );

    //In Java: Tweaked to get 10m/s/s to line up with 1st tick
    var scale = 4.22 * 10;//TODO: Remove the factor of 20

    var bar = new Rectangle( barWidth / 2, 0, 25, height, {fill: new LinearGradient( 0, 5, 0, height ).addColorStop( 0, 'rgb(248,194,216)' ).addColorStop( 1, 'rgb(154,105,127)' )} );
    accelerationProperty.link( function( acceleration ) {
      var scaled = acceleration * scale;
      console.log( scaled );
      if ( acceleration > 0 ) {
        bar.setRect( barWidth / 2, 0, scaled, height );
      }
      else {
        var scaledValue = Math.abs( scaled );
        bar.setRect( barWidth / 2 - scaledValue, 0, scaledValue, height );
      }
    } );
    this.addChild( bar );

    var knobThickness = 1;
    var knob = new Rectangle( barWidth / 2, 0, knobThickness, height, {fill: new LinearGradient( 0, 5, 0, height ).addColorStop( 0, 'rgb(248,194,216)' ).addColorStop( 1, 'rgb(154,105,127)' )} );
    accelerationProperty.link( function( acceleration ) {
      var scaled = acceleration * scale;
      knob.setRect( barWidth / 2 + scaled - knobThickness / 2, 0, knobThickness, height );
    } );
    this.addChild( knob );

    this.addChild( new Rectangle( 0 - barSideInset, 0, barWidth + barSideInset * 2, height, 10, 10, {stroke: 'black'} ) );//todo: copied from background

    var majorTickInset = 6;
    var minorTickInset = 7;
    var line = Shape.lineSegment;
    this.addChild( new Path( {shape: line( 0, majorTickInset, 0, height - majorTickInset ), stroke: 'black'} ) );
    this.addChild( new Path( {shape: line( barWidth / 4, minorTickInset, barWidth / 4, height - minorTickInset ), stroke: 'black' } ) );
    this.addChild( new Path( {shape: line( barWidth / 2, majorTickInset, barWidth / 2, height - majorTickInset ), stroke: 'black' } ) );
    this.addChild( new Path( {shape: line( 3 * barWidth / 4, minorTickInset, 3 * barWidth / 4, height - minorTickInset ), stroke: 'black' } ) );
    this.addChild( new Path( {shape: line( barWidth, majorTickInset, barWidth, height - majorTickInset ), stroke: 'black' } ) );

    this.mutate( options );
  }

  inherit( Node, AccelerometerNode );

  return AccelerometerNode;
} );