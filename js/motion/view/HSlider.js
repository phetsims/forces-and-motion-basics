// Copyright 2002-2013, University of Colorado Boulder

/**
 * Horizontal slider for the friction/applied force.
 * Not generalizable enough to be reused elsewhere, but has custom behaviors like being half grayed out when acceleration is maxed
 * out in one direction.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Vector2 = require( 'DOT/Vector2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var linear = require( 'DOT/Util' ).linear;
  var imageLoader = require( 'imageLoader' );
  var Property = require( 'AXON/Property' );
  var SliderKnob = require( 'common/view/SliderKnob' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  /**
   * Constructor for HSlider
   * @param {Number} min
   * @param {Number} max
   * @param {Number} width
   * @param {Property<Number>} property the numeric value for the slider
   * @param {Property<Number>} speedClassificationProperty
   * @param {Property<Boolean>} disableLeftProperty
   * @param {Property<Boolean>} disableRightProperty
   * @param {Object} options
   * @constructor
   */
  function HSlider( min, max, width, property, speedClassificationProperty, disableLeftProperty, disableRightProperty, options ) {
    var slider = this;
    this.enabledProperty = new Property( true );
    this.options = _.extend( {renderer: 'svg', zeroOnRelease: false}, options || {} );

    speedClassificationProperty.link( function( speedClassification ) {
      if ( speedClassification !== 'WITHIN_ALLOWED_RANGE' ) {

        //The speed could have been exceeded by another means than the HSlider (such as dragging the character or pushing the tweaker arrow buttons)
        //So only end the drag if it originated here
        if ( dragHandler.dragging ) {
          dragHandler.endDrag();//drop the mouse
        }
      }
    } );
    this.min = min;
    this.max = max;
    this.sliderWidth = width;
    this.trackHeight = 6;

    Node.call( this, this.options );

    this.ticksLayer = new Node();
    this.addChild( this.ticksLayer );

    //The track
    var track = new Rectangle( 0, 0, width, this.trackHeight, {stroke: 'black', lineWidth: 1, fill: 'white'} );
    this.addChild( track );
    this.enabledProperty.link( function( enabled ) {
      track.stroke = enabled ? 'black' : 'gray';
      track.fill = enabled ? 'white' : 'gray';
    } );

    //Gray out left side or right side if the maximum speed has been reached in that direction
    if ( disableLeftProperty && disableRightProperty ) {
      //Bars to show either side of the slider disabled when max is reached in that direction
      var rightDisableBar = new Rectangle( width / 2, 0, width / 2, this.trackHeight, {stroke: 'gray', lineWidth: 1, fill: 'gray'} );
      this.addChild( rightDisableBar );
      disableRightProperty.linkAttribute( rightDisableBar, 'visible' );

      var leftDisableBar = new Rectangle( 0, 0, width / 2, this.trackHeight, {stroke: 'gray', lineWidth: 1, fill: 'gray'} );
      this.addChild( leftDisableBar );
      disableLeftProperty.linkAttribute( leftDisableBar, 'visible' );
    }

    //Lookup the new item and append to the scenery
    var enabledKnob = new SliderKnob();
    var disabledKnob = new SliderKnob( {enabled: false} );
    var knob = new Node( {children: [ enabledKnob]} );

    //Increase the hit region
    var hitRegionExpansion = 20;
    knob.touchArea = new Shape.rectangle( knob.bounds.minX - hitRegionExpansion, knob.bounds.minY - hitRegionExpansion, knob.bounds.width + hitRegionExpansion * 2, knob.bounds.height + hitRegionExpansion * 2 );
    knob.y = -knob.height / 2;

    //For unknown reasons, the slider knob isn't perfectly centered.  This offset workaround makes sure it is aligned with the tick marks precisely.
    //see https://github.com/phetsims/forces-and-motion-basics/issues/2
    var sliderOffsetX = 1.2;

    var dragHandler = new SimpleDragHandler( {
        allowTouchSnag: true,
        translate: function( options ) {
          var x = Math.min( Math.max( options.position.x, -knob.width / 2 + sliderOffsetX ), width - knob.width / 2 ) + knob.width / 2 - sliderOffsetX;
          var result = linear( 0, width, min, max, x );

          //Don't drag into the gray part of the slider if speed exceeded
          if ( disableRightProperty && disableRightProperty.value ) {
            result = Math.min( 0, result );
          }
          if ( disableLeftProperty && disableLeftProperty.value ) {
            result = Math.max( 0, result );
          }
          property.value = result;
        },
        end: function() {
          if ( slider.options.zeroOnRelease ) {
            property.value = 0;
          }
        }}
    );
    knob.addInputListener( dragHandler );
    this.addChild( knob );

    //Show the knob as enabled or disabled
    this.enabledProperty.link( function( enabled ) {
      knob.children = [enabled ? enabledKnob : disabledKnob];
      knob.cursor = enabled ? 'pointer' : 'default';
      if ( enabled ) {
        knob.addInputListener( dragHandler );
      }
      else {
        knob.removeInputListener( dragHandler );
      }
    } );

    //Link to the property value so that when the model value changes the knob will change location.
    property.link( function( value ) { knob.x = linear( min, max, 0, width, value ) - knob.width / 2 + sliderOffsetX; } );

    //Update layout and settings for Node
    this.mutate( options );
  }

  return inherit( Node, HSlider, {

    //Add ticks at regular intervals in 8 divisions
    addNormalTicks: function() {

      //Constants and functions for creating the ticks
      var slider = this;
      var numDivisions = 8; //e.g. divide the ruler into 1/8ths
      var numTicks = numDivisions + 1; //ticks on the end
      var isMajor = function( tickIndex ) { return tickIndex % 2 === 0; };
      var hasLabel = function( tickIndex ) { return tickIndex % 4 === 0; };

      //Generate each of the ticks and add to the parent
      _.range( numTicks ).forEach( function( i ) {

        var x1 = linear( slider.min, slider.max, 0, slider.sliderWidth, i / (numTicks - 1) * (slider.max - slider.min) + slider.min );
        var tick = new Path( {shape: Shape.lineSegment( new Vector2( x1, 0 ), new Vector2( x1, isMajor( i ) ? -30 : -15 ) ), stroke: 'black', lineWidth: 1} );
        slider.enabledProperty.link( function( enabled ) {tick.stroke = enabled ? 'black' : 'gray';} );
        slider.ticksLayer.addChild( tick );
        if ( hasLabel( i ) ) {
          var label = new Text( linear( 0, 1, slider.min, slider.max, i / (numTicks - 1) ).toFixed( 0 ), {centerX: tick.centerX, bottom: tick.top, font: new PhetFont( 16 )} );
          slider.enabledProperty.link( function( enabled ) {label.fill = enabled ? 'black' : 'gray';} );
          slider.ticksLayer.addChild( label );
        }
      } );

      //Return this for chaining
      return this;
    },

    //Add the tick for the specified value, so that the node will be centered on the location specified and just at the edge of the track.
    addTick: function( value, tickAndLabelNode ) {
      tickAndLabelNode.centerX = linear( 0, 1, 0, this.sliderWidth, value );
      tickAndLabelNode.bottom = 0;
      this.ticksLayer.addChild( tickAndLabelNode );
      return this;
    },

    //Set the entire slider to be enabled or disabled
    set enabled( value ) { this.enabledProperty.set( value ); },

    //Determine whether the slider is enabled or not
    get enabled() { return this.enabledProperty.get(); }
  } );
} );