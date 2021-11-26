// Copyright 2013-2021, University of Colorado Boulder

/**
 * A rounded slider knob that shows with grip 'dots' to indicate that it is grabbable.  Based on artwork by Noah Podolefsky.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import { Circle } from '../../../../scenery/js/imports.js';
import { Node } from '../../../../scenery/js/imports.js';
import { Rectangle } from '../../../../scenery/js/imports.js';
import { LinearGradient } from '../../../../scenery/js/imports.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

class SliderKnob extends Node {

  /**
   * Constructor.
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( tandem, options ) {

    options = merge( {
      tandem: tandem,
      phetioEnabledPropertyInstrumented: true
    }, options );

    // different fill colors for when the slider is enabled or disabled
    const enabledFillColor = '#2FB0E4';
    const disabledFillColor = 'gray';
    const enabledColorStop = '#B8E4FB';
    const disabledColorStop = 'white';

    super( options );

    //Add the rounded rectangle background
    const scale = 0.8;
    const width = 20 * scale;
    const height = 50 * scale;
    const enabledGradient = new LinearGradient( -width / 2, 0, width / 2, 0 ).addColorStop( 0, enabledFillColor ).addColorStop( 0.5, enabledColorStop ).addColorStop( 1, enabledFillColor );
    const disabledGradient = new LinearGradient( -width / 2, 0, width / 2, 0 ).addColorStop( 0, disabledFillColor ).addColorStop( 0.5, disabledColorStop ).addColorStop( 1, disabledFillColor );

    const rectangle = new Rectangle( -width / 2, 0, width, height, 10 * scale, 10 * scale, {
      fill: this.enabledProperty.value ? enabledGradient : 'gray',
      stroke: this.enabledProperty.value ? 'black' : 'gray',
      lineWidth: 2
    } );
    this.addChild( rectangle );

    // @private - link the fill to the enabled property. Slider knob exists for lifetime of sim, no dispose necessary.
    this.enabledProperty.link( enabled => {
      rectangle.fill = enabled ? enabledGradient : disabledGradient;
    } );

    //add a grid of grip dots
    const dx = width / 5;
    const dy = height / 6;
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

  /**
   * @private
   * @param {number} x
   * @param {number} y
   */
  addGripDot( x, y ) {
    const radius = 1.8;
    const stroke = new LinearGradient( -radius, -radius, radius * 2, radius * 2 ).addColorStop( 0, 'black' ).addColorStop( 0.5, '#56889F' ).addColorStop( 1, 'white' );
    this.addChild( new Circle( radius, {
      x: x,
      y: y,
      fill: this.enabledProperty ? '#56889F' : 'gray',
      stroke: this.enabledProperty ? stroke : 'gray',
      lineWidth: 1
    } ) );
  }
}

forcesAndMotionBasics.register( 'SliderKnob', SliderKnob );

export default SliderKnob;