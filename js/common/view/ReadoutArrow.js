// Copyright 2013-2024, University of Colorado Boulder

/**
 * Arrow that displays a numerical value inside the arrow (if there is room) or above the arrow.
 * Used for force arrows in Forces and Motion: Basics
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import ArrowShape from '../../../../scenery-phet/js/ArrowShape.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Path, Rectangle, Text } from '../../../../scenery/js/imports.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';

const pattern0ValueUnitsNStringProperty = ForcesAndMotionBasicsStrings.pattern[ '0valueUnitsNStringProperty' ];

// constants
const ARROW_HEAD_WIDTH = 50;
const ARROW_HEAD_HEIGHT = 25;

class ReadoutArrow extends Node {
  /**
   * @param label {TReadOnlyProperty<string>} the text to show for the arrow
   * @param fill the color of the arrow
   * @param tailX {number} the position of the tail in X
   * @param tailY {number} the position of the tail in Y
   * @param valueProperty {Property.<Number>} the property for the value to display
   * @param showValuesProperty {Property.<Boolean>} whether or not to display the values
   * @param {Tandem} tandem
   * @param {Object} [options] 'labelPosition' where the label text should be {side|top}
   */
  constructor( label, fill, tailX, tailY, valueProperty, showValuesProperty, tandem, options ) {

    //Call the super class.  Render in svg to make the text crisper on retina display.
    super( {
      tandem: tandem,
      pickable: false
    } );

    //Store fields
    options = merge( { labelPosition: 'top', arrowScale: 1 }, options );
    this.options = options; // @private
    this.showValuesProperty = showValuesProperty;
    this.tailX = tailX;
    this.tailY = tailY;

    //Create and add the children
    this.arrowNode = new Path( null, merge( {
      fill: fill,
      stroke: '#000000',
      lineWidth: 1,
      tandem: tandem.createTandem( 'arrowNode' )
    }, options ) );
    const fontOptions = { font: new PhetFont( { size: 16, weight: 'bold' } ), maxWidth: 112 };
    const valueTextPatternStringProperty = new PatternStringProperty( pattern0ValueUnitsNStringProperty,
      { value: new DerivedProperty( [ valueProperty ], value => Utils.toFixed( Math.abs( value ), 0 ) ) },
      { formatNames: [ 'value' ] } );
    const valueText = new Text( valueTextPatternStringProperty,
      merge( { tandem: tandem.createTandem( 'valueText' ) }, fontOptions ) );
    const roundedRadius = 8;
    this.valueBackgroundRectangle = new Rectangle( 0, 0, valueText.width + roundedRadius, 0.7 * valueText.height + roundedRadius, roundedRadius, roundedRadius, {
      fill: 'white',
      opacity: 0.5
    } ).mutate( { centerX: valueText.centerX, centerY: valueText.centerY } );
    this.valueNode = new Node( {
      children: [ this.valueBackgroundRectangle, valueText ]
    } );
    this.labelNode = new Text( label, merge( { tandem: tandem.createTandem( 'labelText' ) }, fontOptions ) );
    this.addChild( this.arrowNode );
    this.addChild( this.valueNode );
    this.addChild( this.labelNode );

    if ( this.options.labelPosition === 'top' ) {

      // Ensure the labelNode is on top of the arrow with dynamic locale
      label.lazyLink( () => {
        this.labelNode.bottom = isFinite( this.arrowNode.top ) ? this.arrowNode.top : 0;
      } );
    }

    // Update background rectangle when the value text changes
    const updateValueBackgroundRectangleWidth = () => { this.valueBackgroundRectangle.setRectWidth( valueText.width + roundedRadius ); };

    // Update background rectangle width and label positions to readout arrow with dynamic locale.
    valueTextPatternStringProperty.lazyLink( () => {
      updateValueBackgroundRectangleWidth();
      this.update();
    } );

    //Update when the value changes
    valueProperty.link( value => {
      this.value = value;
      updateValueBackgroundRectangleWidth();
      this.update();
    } );

    // @public {boolean} - if the arrow overlaps another, we change the layout of the arrow labels so none of the
    // text overlaps eachother
    this.overlapsOther = false;

    //Update when the numeric readout visibility is toggled
    showValuesProperty.link( this.update.bind( this ) );
  }

  // @public - Sets the arrow dash, which changes when the simulation starts playing
  setArrowDash( lineDash ) { this.arrowNode.lineDash = lineDash; }

  //On the motion screens, when the 'Friction' label overlaps the force vector it should be displaced vertically
  set labelPosition( position ) {
    if ( this.options.labelPosition !== position ) {
      this.options.labelPosition = position;
      this.update();
    }
  }

  //Get the label position
  get labelPosition() { return this.options.labelPosition; }

  // @public - Update the arrow graphics and text labels
  update() {
    const value = this.value * this.options.arrowScale;

    //Don't show it if it is too small
    const hidden = Math.abs( value ) < 1E-6;
    this.hidden = hidden;
    this.arrowNode.visible = !hidden;
    this.valueNode.visible = !hidden && this.showValuesProperty.value;
    this.valueBackgroundRectangle.visible = false;
    this.labelNode.visible = !hidden;

    //Only change the node if visible, for performance
    if ( !hidden ) {
      const tailX = this.tailX;
      const tailY = this.tailY;
      const tailWidth = ARROW_HEAD_HEIGHT;
      const headWidth = ARROW_HEAD_WIDTH;

      //For short arrows, the head height should be half of the arrow length.  See https://github.com/phetsims/scenery-phet/issues/30
      const headHeight = Math.min( Math.abs( value ) / 2, 40 );
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

        // if the arrow node is still small or overlaps another arrow, the value readout will be below the arrow label
        if ( this.valueNode.width + 5 > this.arrowNode.width || this.overlapsOther ) {
          this.valueNode.top = this.labelNode.bottom;
          this.valueNode.centerX = this.labelNode.centerX;
          this.valueBackgroundRectangle.visible = true;
        }
      }
      else {
        this.valueNode.center = this.arrowNode.center;

        //Position the value and label if the label position is on the bottom
        if ( this.options.labelPosition === 'bottom' ) {
          this.labelNode.centerX = this.arrowNode.centerX;
          this.labelNode.top = isFinite( this.arrowNode.centerY ) ? this.arrowNode.centerY + this.labelNode.height + 10 : 0;

          // if the arrow overlaps another or is small, we align the value readout horizontally
          // with the arrow label.
          if ( this.valueNode.width + 5 > this.arrowNode.width || this.overlapsOther ) {
            this.valueNode.leftCenter = this.labelNode.rightCenter.plusXY( 5, 0 );
            this.valueBackgroundRectangle.visible = true;
          }
          else {
            this.valueNode.center = this.arrowNode.center;
          }
        }

        //Position the value and label if the label position is on the top
        else {
          this.labelNode.centerX = this.tailX;
          this.labelNode.bottom = isFinite( this.arrowNode.top ) ? this.arrowNode.top : 0;

          if ( this.valueNode.width + 5 > this.arrowNode.width ) {
            this.valueBackgroundRectangle.visible = true;
            const spacingOffset = 5;
            if ( value > 0 ) {
              this.valueNode.left = this.arrowNode.right + spacingOffset;
            }
            else {
              this.valueNode.right = this.arrowNode.left - spacingOffset;
            }
          }
        }
      }
    }
  }

}


// statics
ReadoutArrow.ARROW_HEAD_WIDTH = ARROW_HEAD_WIDTH;
ReadoutArrow.ARROW_HEAD_HEIGHT = ARROW_HEAD_HEIGHT;

forcesAndMotionBasics.register( 'ReadoutArrow', ReadoutArrow );

export default ReadoutArrow;