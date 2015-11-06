// Copyright 2013-2015, University of Colorado Boulder

/**
 * Arrow that displays a numerical value inside the arrow (if there is room) or above the arrow.
 * Used for force arrows in Forces and Motion: Basics
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var Path = require( 'SCENERY/nodes/Path' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ArrowShape = require( 'SCENERY_PHET/ArrowShape' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var forceReadoutPatternString = require( 'string!FORCES_AND_MOTION_BASICS/forceReadout.pattern' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  /**
   * Main constructor for ReadoutArrow, a scenery.Node that shows arrows with readouts.
   *
   * @param label the text to show for the arrow
   * @param fill the color of the arrow
   * @param tailX {Number} the location of the tail in X
   * @param tailY {Number} the location of the tail in Y
   * @param valueProperty {Property<Number>} the property for the value to display
   * @param showValuesProperty {Property<Boolean>} whether or not to display the values
   * @param {Object} [options] 'labelPosition' where the label text should be {side|top}
   * @constructor
   */
  function ReadoutArrow( label, fill, tailX, tailY, valueProperty, showValuesProperty, options ) {
    var readoutArrow = this;

    //Store fields
    options = _.extend( { labelPosition: 'top', arrowScale: 1 }, options );
    this.options = options; // @private
    this.showValuesProperty = showValuesProperty;
    this.tailX = tailX;
    this.tailY = tailY;

    //Call the super class.  Render in svg to make the text crisper on retina display.
    Node.call( this, { pickable: false } );

    //Create and add the children
    this.arrowNode = new Path( null, _.extend( { fill: fill, stroke: '#000000', lineWidth: 1 }, options ) );
    var fontOptions = { font: new PhetFont( { size: 16, weight: 'bold' } ) };
    this.valueNode = new Text( '110N', fontOptions );
    this.labelNode = new Text( label, fontOptions );
    this.addChild( this.arrowNode );
    this.addChild( this.valueNode );
    this.addChild( this.labelNode );

    //Update when the value changes
    valueProperty.link( function( value ) {
      readoutArrow.value = value;
      readoutArrow.valueNode.text = StringUtils.format( forceReadoutPatternString, Math.round( Math.abs( value ) ).toFixed( 0 ) );
      readoutArrow.update();
    } );

    //Update when the numeric readout visibility is toggled
    showValuesProperty.link( this.update.bind( this ) );
  }

  return inherit( Node, ReadoutArrow, {

    //Sets the arrow dash, which changes when the simulation starts playing
    setArrowDash: function( lineDash ) { this.arrowNode.lineDash = lineDash; },

    //On the motion screens, when the 'Friction' label overlaps the force vector it should be displaced vertically
    set labelPosition( position ) {
      if ( this.options.labelPosition !== position ) {
        this.options.labelPosition = position;
        this.update();
      }
    },

    //Get the label position
    get labelPosition() { return this.options.labelPosition; },

    //Update the arrow graphics and text labels
    update: function() {
      var value = this.value * this.options.arrowScale;

      //Don't show it if it is too small
      var hidden = Math.abs( value ) < 1E-6;
      this.hidden = hidden;
      this.arrowNode.visible = !hidden;
      this.valueNode.visible = !hidden && this.showValuesProperty.value;
      this.labelNode.visible = !hidden;

      //Only change the node if visible, for performance
      if ( !hidden ) {
        var tailX = this.tailX;
        var tailY = this.tailY;
        var tailWidth = 25;
        var headWidth = 50;

        //For short arrows, the head height should be half of the arrow length.  See https://github.com/phetsims/scenery-phet/issues/30
        var headHeight = Math.min( Math.abs( value ) / 2, 40 );
        this.arrowNode.shape = new ArrowShape( tailX, tailY, tailX + value, tailY,
          { tailWidth: tailWidth, headWidth: headWidth, headHeight: headHeight } );

        //Position the value and label if the label position is on the side
        if ( this.options.labelPosition === 'side' ) {
          if ( value > 0 ) {
            this.labelNode.left = this.arrowNode.right + 5;
          }
          else {
            this.labelNode.right = this.arrowNode.left - 5;
          }
          this.labelNode.centerY = this.arrowNode.centerY;

          this.valueNode.center = this.arrowNode.center;

          if ( this.valueNode.width + 5 > this.arrowNode.width ) {
            this.valueNode.top = this.labelNode.bottom;
            this.valueNode.centerX = this.labelNode.centerX;
          }
        }
        else {
          this.valueNode.center = this.arrowNode.center;
          this.labelNode.centerX = this.arrowNode.centerX;

          //Position the value and label if the label position is on the bottom
          if ( this.options.labelPosition === 'bottom' ) {
            this.labelNode.top = isFinite( this.arrowNode.centerY ) ? this.arrowNode.centerY + headHeight / 2 + this.labelNode.height + 5 : 0;
            if ( this.valueNode.width + 5 > this.arrowNode.width ) {
              this.valueNode.bottom = this.labelNode.top;
            }
          }

          //Position the value and label if the label position is on the top
          else {
            this.labelNode.bottom = isFinite( this.arrowNode.centerY ) ? this.arrowNode.centerY - headHeight / 2 - this.labelNode.height + 12 : 0;
            if ( this.valueNode.width + 5 > this.arrowNode.width ) {
              this.valueNode.top = this.labelNode.bottom;
            }
          }
        }
      }
    }
  } );
} );
