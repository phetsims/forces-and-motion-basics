// Copyright 2002-2013, University of Colorado Boulder

/**
 * Arrow that displays a numerical value inside the arrow (if there is room) or above the arrow.
 * Used for force arrows in Forces and Motion: Basics
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var Path = require( 'SCENERY/nodes/Path' );
  var Font = require( 'SCENERY/util/Font' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MotionConstants = require( 'motion/MotionConstants' );
  var FAMBFont = require( 'common/view/FAMBFont' );

  /**
   * Main constructor for ReadoutArrow, a scenery.Node that shows arrows for both tabs of Forces and Motion Basics, with readouts.
   *
   * @param label the text to show for the arrow
   * @param fill the color of the arrow
   * @param tailX {Number} the location of the tail in X
   * @param tailY {Number} the location of the tail in Y
   * @param valueProperty {Property<Number>} the property for the value to display
   * @param showValuesProperty {Property<Boolean>} whether or not to display the values
   * @param options 'labelPosition' where the label text should be {side|top}
   * @constructor
   */
  function ReadoutArrow( label, fill, tailX, tailY, valueProperty, showValuesProperty, options ) {
    var readoutArrow = this;

    //Store fields
    this.options = _.extend( {labelPosition: 'top', arrowScale: 1}, options );
    this.showValuesProperty = showValuesProperty;
    this.tailX = tailX;
    this.tailY = tailY;

    //Call the super class.  Render in svg to make the text crisper on retina display.
    Node.call( this, {pickable: false, renderer: 'svg'} );

    //Create and add the children
    this.arrowNode = new Path( _.extend( {fill: fill, stroke: '#000000', lineWidth: 1}, options ) );
    var fontOptions = {font: new FAMBFont( 16, 'bold' )};
    this.valueNode = new Text( '110N', fontOptions );
    this.labelNode = new Text( label, fontOptions );
    this.addChild( this.arrowNode );
    this.addChild( this.valueNode );
    this.addChild( this.labelNode );

    //Update when the value changes
    valueProperty.link( function( value ) {
      readoutArrow.value = value;
      readoutArrow.valueNode.text = Math.abs( value ).toFixed( 0 ) + 'N';
      readoutArrow.update();
    } );

    //Update when the numeric readout visibility is toggled
    showValuesProperty.link( this.update.bind( this ) );
  }

  return inherit( Node, ReadoutArrow, {

    //Sets the arrow dash, which changes when the simulation starts playing
    setArrowDash: function( lineDash ) { this.arrowNode.lineDash = lineDash; },

    //On the motion tabs, when the 'Friction' label overlaps the force vector it should be displaced vertically
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
        var headHeight = 40;
        this.arrowNode.shape = ArrowNode.createArrowShape( tailX, tailY, tailX + value, tailY, tailWidth, headWidth, headHeight );

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
