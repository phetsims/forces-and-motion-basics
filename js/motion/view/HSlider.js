// Copyright 2013-2015, University of Colorado Boulder

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
  var Property = require( 'AXON/Property' );
  var SliderKnob = require( 'FORCES_AND_MOTION_BASICS/common/view/SliderKnob' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Input = require( 'SCENERY/input/Input' );
  var Util = require( 'DOT/Util' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  /**
   * Constructor for HSlider
   * @param {Number} min
   * @param {Number} max
   * @param {Number} width
   * @param {Property<Number>} property the numeric value for the slider
   * @param {Property<Number>} speedClassificationProperty
   * @param {Property<Boolean>} disableLeftProperty
   * @param {Property<Boolean>} disableRightProperty
   * @param {Object} [options]
   * @constructor
   */
  function HSlider( min, max, width, property, speedClassificationProperty, disableLeftProperty, disableRightProperty, options ) {
    var slider = this;
    this.enabledProperty = new Property( true );
    options = _.extend( {
      zeroOnRelease: false
    }, options || {} );
    slider.zeroOnRelease = options.zeroOnRelease; // @private

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

    Node.call( this, options );

    this.ticksLayer = new Node( { pickable: false } );
    this.addChild( this.ticksLayer );

    //The track
    var track = new Rectangle( 0, 0, width, this.trackHeight, { stroke: 'black', lineWidth: 1, fill: 'white' } );
    this.addChild( track );
    this.enabledProperty.link( function( enabled ) {
      track.stroke = enabled ? 'black' : 'gray';
      track.fill = enabled ? 'white' : 'gray';
    } );

    //Gray out left side or right side if the maximum speed has been reached in that direction
    if ( disableLeftProperty && disableRightProperty ) {
      //Bars to show either side of the slider disabled when max is reached in that direction
      var rightDisableBar = new Rectangle( width / 2, 0, width / 2, this.trackHeight, {
        stroke: 'gray',
        lineWidth: 1,
        fill: 'gray'
      } );
      this.addChild( rightDisableBar );
      disableRightProperty.linkAttribute( rightDisableBar, 'visible' );

      var leftDisableBar = new Rectangle( 0, 0, width / 2, this.trackHeight, {
        stroke: 'gray',
        lineWidth: 1,
        fill: 'gray'
      } );
      this.addChild( leftDisableBar );
      disableLeftProperty.linkAttribute( leftDisableBar, 'visible' );
    }

    //Lookup the new item and append to the scenery
    var enabledKnob = new SliderKnob();
    var disabledKnob = new SliderKnob( { enabled: false } );
    var knob = new Node( {
      children: [ enabledKnob ],
      focusable: true
    } );
    var range = Math.abs( max - min );
    knob.addInputListener( {
      keydown: function( event, trail ) {
        var keyCode = event.domEvent.keyCode;
        var delta = keyCode === Input.KEY_LEFT_ARROW || keyCode === Input.KEY_DOWN_ARROW ? -1 :
                    keyCode === Input.KEY_RIGHT_ARROW || keyCode === Input.KEY_UP_ARROW ? +1 :
                    0;
        property.set( Util.clamp( property.get() + range * 0.1 * delta, min, max ) );
      }
    } );
    knob.y = -knob.height / 2 + 4;

    // touch area
    var touchAreaDilation = 20;
    knob.touchArea = Shape.rectangle( knob.bounds.minX - touchAreaDilation, knob.bounds.minY - touchAreaDilation, knob.bounds.width + touchAreaDilation * 2, knob.bounds.height + touchAreaDilation * 2 );

    //Wire up the drag listener.
    //Code for keeping the mouse centered on the same point copied from Beer's Law Lab: ConcentrationSlider.js -> ThumbDragHandler, see #21
    var clickXOffset; // x-offset between initial click and thumb's origin
    var dragNode = knob;
    var dragHandler = new SimpleDragHandler( {
        allowTouchSnag: true,
        start: function( event ) {
          clickXOffset = dragNode.globalToParentPoint( event.pointer.point ).x - event.currentTarget.x;
        },
        drag: function( event ) {
          var localValue = dragNode.globalToParentPoint( event.pointer.point ).x - clickXOffset;

          var x = Math.min( Math.max( localValue, -knob.width / 2 ), width - knob.width / 2 ) + knob.width / 2;
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
          if ( slider.zeroOnRelease ) {
            property.value = 0;
          }
        }
      }
    );
    knob.addInputListener( dragHandler );
    this.addChild( knob );

    //Show the knob as enabled or disabled
    this.enabledProperty.link( function( enabled ) {
      knob.children = [ enabled ? enabledKnob : disabledKnob ];
      knob.cursor = enabled ? 'pointer' : 'default';
      if ( enabled ) {
        knob.addInputListener( dragHandler );
      }
      else {
        knob.removeInputListener( dragHandler );
      }
    } );

    //Link to the property value so that when the model value changes the knob will change location.
    property.link( function( value ) { knob.x = linear( min, max, 0, width, value ) - knob.width / 2; } );

    //Update layout and settings for Node
    this.mutate( options );
  }

  forcesAndMotionBasics.register( 'HSlider', HSlider );

  return inherit( Node, HSlider, {

    //Add ticks at regular intervals in 8 divisions
    addNormalTicks: function() {

      //Constants and functions for creating the ticks
      var slider = this;
      var numDivisions = 10; //e.g. divide the ruler into 1/8ths
      var numTicks = numDivisions + 1; //ticks on the end
      var isMajor = function( tickIndex ) { return tickIndex % 5 === 0; };
      var hasLabel = function( tickIndex ) { return tickIndex % 5 === 0; };

      //Generate each of the ticks and add to the parent
      _.range( numTicks ).forEach( function( i ) {

        var x1 = linear( slider.min, slider.max, 0, slider.sliderWidth, i / (numTicks - 1) * (slider.max - slider.min) + slider.min );
        var tick = new Path( Shape.lineSegment( new Vector2( x1, 0 ), new Vector2( x1, isMajor( i ) ? -30 : -22 ) ), {
          pickable: false,
          stroke: 'black',
          lineWidth: 1
        } );
        slider.enabledProperty.link( function( enabled ) {tick.stroke = enabled ? 'black' : 'gray';} );
        slider.ticksLayer.addChild( tick );
        if ( hasLabel( i ) ) {
          var label = new Text( linear( 0, 1, slider.min, slider.max, i / Util.toFixed( (numTicks - 1), 0 ) ), {
            pickable: false,
            centerX: tick.centerX,
            bottom: tick.top,
            font: new PhetFont( 16 )
          } );
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
