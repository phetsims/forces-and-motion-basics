// Copyright 2013-2017, University of Colorado Boulder

/**
 * In the 'Acceleration' screen, this horizontal indicator shows the amount of acceleration (like a moving bubble).
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );

  /**
   * Constructor.
   *
   * @param {Property<number>} accelerationProperty
   * @param {Tandem} tandem
   * @param {Object} options
   */
  function AccelerometerNode( accelerationProperty, tandem, options ) {
    options = options || {};
    this.ticks = [];
    Node.call( this, {
      tandem: tandem
    } );
    var height = 15;
    var barWidth = 170;
    var barSideInset = 7;
    var gradient = new LinearGradient( 0, 4, 0, height ).addColorStop( 0, 'white' ).addColorStop( 1, 'rgb( 207, 208, 210 )' );
    var background = new Rectangle( 0 - barSideInset, 0, barWidth + barSideInset * 2, height, 10, 10, { fill: gradient } );

    this.addChild( background );

    //Tweaked to get 10m/s/s to line up with 1st tick.
    var scale = 4.22;

    //The bar that gets bigger or smaller based on the acceleration.
    var bar = new Rectangle( barWidth / 2, 0, 25, height, { fill: new LinearGradient( 0, 5, 0, height ).addColorStop( 0, 'rgb(218,140,180)' ).addColorStop( 1, 'rgb(130,80,100)' ) } );
    accelerationProperty.link( function( acceleration ) {
      var scaled = acceleration * scale;
      if ( acceleration > 0 ) {
        bar.setRect( barWidth / 2, 0, scaled, height );
      }
      else {
        var scaledValue = Math.abs( scaled );
        bar.setRect( barWidth / 2 - scaledValue, 0, scaledValue, height );
      }
    } );
    this.addChild( bar );

    //Show the knob, which just covers the edge of the bar
    var knobThickness = 1;
    var knob = new Rectangle( barWidth / 2, 0, knobThickness, height, { fill: new LinearGradient( 0, 5, 0, height ).addColorStop( 0, 'rgb(248,194,216)' ).addColorStop( 1, 'rgb(154,105,127)' ) } );
    accelerationProperty.link( function( acceleration ) {
      var scaled = acceleration * scale;
      knob.setRect( barWidth / 2 + scaled - knobThickness / 2, 0, knobThickness, height );
    } );
    this.addChild( knob );

    //Outline
    this.addChild( new Rectangle( 0 - barSideInset, 0, barWidth + barSideInset * 2, height, 10, 10, { stroke: 'black' } ) );

    //Tick marks
    var majorTickInset = 6;
    var minorTickInset = 7;
    var line = Shape.lineSegment;
    this.addTick( new Path( line( 0, majorTickInset, 0, height - majorTickInset ), {
      stroke: 'black',
      tandem: tandem.createTandem( 'tick1' )
    } ) );
    this.addTick( new Path( line( barWidth / 4, minorTickInset, barWidth / 4, height - minorTickInset ), {
      stroke: 'black',
      tandem: tandem.createTandem( 'tick2' )
    } ) );
    this.addTick( new Path( line( barWidth / 2, majorTickInset, barWidth / 2, height - majorTickInset ), {
      stroke: 'black',
      tandem: tandem.createTandem( 'tick3' )
    } ) );
    this.addTick( new Path( line( 3 * barWidth / 4, minorTickInset, 3 * barWidth / 4, height - minorTickInset ), {
      stroke: 'black',
      tandem: tandem.createTandem( 'tick4' )
    } ) );
    this.addTick( new Path( line( barWidth, majorTickInset, barWidth, height - majorTickInset ), {
      stroke: 'black',
      tandem: tandem.createTandem( 'tick5' )
    } ) );

    this.mutate( options );
  }

  forcesAndMotionBasics.register( 'AccelerometerNode', AccelerometerNode );

  return inherit( Node, AccelerometerNode, {

    /**
     * Add a the child line as a tick to the accelerometer node
     * @param {Node} child - Line segment to add as a tick
     */
    addTick: function( child ) {
      this.addChild( child );
      this.ticks.push( child );
    }
  } );
} );