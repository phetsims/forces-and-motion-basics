// Copyright 2013-2022, University of Colorado Boulder

/**
 * In the 'Acceleration' screen, this horizontal indicator shows the amount of acceleration (like a moving bubble).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { Shape } from '../../../../kite/js/imports.js';
import { LinearGradient, Node, Path, Rectangle } from '../../../../scenery/js/imports.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import Tandem from '../../../../tandem/js/Tandem.js';

class AccelerometerNode extends Node {
  private readonly ticks: Node[];

  public constructor( accelerationProperty: TReadOnlyProperty<number>, tandem: Tandem, options?: IntentionalAny ) {
    options = options || {};
    super( {
      tandem: tandem
    } );
    this.ticks = [];
    const height = 15;
    const barWidth = 170;
    const barSideInset = 7;
    const gradient = new LinearGradient( 0, 4, 0, height ).addColorStop( 0, 'white' ).addColorStop( 1, 'rgb( 207, 208, 210 )' );
    const background = new Rectangle( 0 - barSideInset, 0, barWidth + barSideInset * 2, height, 10, 10, { fill: gradient } );

    this.addChild( background );

    //Tweaked to get 10m/s/s to line up with 1st tick.
    const scale = 4.22;

    //The bar that gets bigger or smaller based on the acceleration.
    const bar = new Rectangle( barWidth / 2, 0, 25, height, { fill: new LinearGradient( 0, 5, 0, height ).addColorStop( 0, 'rgb(218,140,180)' ).addColorStop( 1, 'rgb(130,80,100)' ) } );
    accelerationProperty.link( acceleration => {
      const scaled = acceleration * scale;
      if ( acceleration > 0 ) {
        bar.setRect( barWidth / 2, 0, scaled, height );
      }
      else {
        const scaledValue = Math.abs( scaled );
        bar.setRect( barWidth / 2 - scaledValue, 0, scaledValue, height );
      }
    } );
    this.addChild( bar );

    //Show the knob, which just covers the edge of the bar
    const knobThickness = 1;
    const knob = new Rectangle( barWidth / 2, 0, knobThickness, height, { fill: new LinearGradient( 0, 5, 0, height ).addColorStop( 0, 'rgb(248,194,216)' ).addColorStop( 1, 'rgb(154,105,127)' ) } );
    accelerationProperty.link( acceleration => {
      const scaled = acceleration * scale;
      knob.setRect( barWidth / 2 + scaled - knobThickness / 2, 0, knobThickness, height );
    } );
    this.addChild( knob );

    //Outline
    this.addChild( new Rectangle( 0 - barSideInset, 0, barWidth + barSideInset * 2, height, 10, 10, { stroke: 'black' } ) );

    //Tick marks
    const majorTickInset = 6;
    const minorTickInset = 7;
    const line = Shape.lineSegment;
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

  /**
   * Add a the child line as a tick to the accelerometer node
   * @param child - Line segment to add as a tick
   */
  public addTick( child: Node ): void {
    this.addChild( child );
    this.ticks.push( child );
  }
}

forcesAndMotionBasics.register( 'AccelerometerNode', AccelerometerNode );

export default AccelerometerNode;