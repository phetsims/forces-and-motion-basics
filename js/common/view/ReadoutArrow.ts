// Copyright 2013-2025, University of Colorado Boulder

/**
 * Arrow that displays a numerical value inside the arrow (if there is room) or above the arrow.
 * Used for force arrows in Forces and Motion: Basics
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ArrowShape from '../../../../scenery-phet/js/ArrowShape.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Path, { PathOptions } from '../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import ForcesAndMotionBasicsQueryParameters from '../ForcesAndMotionBasicsQueryParameters.js';

const pattern0ValueUnitsNStringProperty = ForcesAndMotionBasicsFluent.pattern[ '0valueUnitsNStringProperty' ];

type SelfOptions = {
  labelPosition?: 'top' | 'bottom' | 'side';
  arrowScale?: number;
  arrowNodeOptions?: PathOptions;
};
type ReadoutArrowOptions = StrictOmit<NodeOptions, 'pickable' | 'tandem'> & SelfOptions;
export default class ReadoutArrow extends Node {

  public static readonly ARROW_HEAD_WIDTH = 50;
  private static readonly ARROW_HEAD_HEIGHT = 25;
  private static readonly ARROW_LINE_WIDTH = 1;

  private readonly arrowNode: Path;
  private readonly valueBackgroundRectangle: Rectangle;
  private readonly valueNode: Node;
  private readonly labelNode: Text;

  // if the arrow overlaps another, we change the layout of the arrow labels so none of the text overlaps each other
  public overlapsOther = false;
  private hidden!: boolean;
  private value!: number;

  private labelPositionOption: string;
  private readonly arrowScale: number;

  /**
   * @param name
   * @param label the text to show for the arrow
   * @param fill the color of the arrow
   * @param tailX the position of the tail in X
   * @param tailY the position of the tail in Y
   * @param valueProperty the property for the value to display
   * @param showValuesProperty whether or not to display the values
   * @param mode whether this is for netforce or motion screen
   * @param providedOptions 'labelPosition' where the label text should be {side|top}
   */
  public constructor(
    public readonly name: 'left' | 'right' | 'sum' | 'friction' | 'applied',
    label: TReadOnlyProperty<string>,
    fill: string,
    private readonly tailX: number,
    private readonly tailY: number,
    valueProperty: TReadOnlyProperty<number>,
    private readonly showValuesProperty: TReadOnlyProperty<boolean>,
    private readonly mode: 'netforce' | 'motion',
    providedOptions: ReadoutArrowOptions ) {

    //Store fields
    const options = optionize<ReadoutArrowOptions, SelfOptions, NodeOptions>()( {
      labelPosition: 'top',
      arrowScale: 1,
      arrowNodeOptions: {},
      pickable: false
    }, providedOptions );

    //Call the super class.  Render in svg to make the text crisper on retina display.
    super( options );
    this.labelPositionOption = options.labelPosition;
    this.arrowScale = options.arrowScale;

    //Create and add the children
    const arrowNodeOptions = combineOptions<PathOptions>( {
      fill: fill,
      stroke: '#000000',
      lineWidth: ReadoutArrow.ARROW_LINE_WIDTH
    }, options );
    this.arrowNode = new Path( null, arrowNodeOptions );

    const fontOptions = { font: new PhetFont( { size: 16, weight: 'bold' } ), maxWidth: 112 };
    const valueTextPatternStringProperty = new PatternStringProperty( pattern0ValueUnitsNStringProperty,
      { value: new DerivedProperty( [ valueProperty ], value => Utils.toFixed( Math.abs( value ), 0 ) ) },
      { formatNames: [ 'value' ] } );
    const valueText = new Text( valueTextPatternStringProperty, fontOptions );
    const roundedRadius = 8;
    this.valueBackgroundRectangle = new Rectangle( 0, 0, valueText.width + roundedRadius, 0.7 * valueText.height + roundedRadius, roundedRadius, roundedRadius, {
      fill: 'white',
      opacity: 0.5
    } ).mutate( { centerX: valueText.centerX, centerY: valueText.centerY } );
    this.valueNode = new Node( {
      children: [ this.valueBackgroundRectangle, valueText ]
    } );
    this.labelNode = new Text( label, fontOptions );
    this.addChild( this.arrowNode );
    this.addChild( this.valueNode );
    this.addChild( this.labelNode );

    if ( this.labelPositionOption === 'top' ) {

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

    ManualConstraint.create( this, [ this.labelNode ], () => {
      this.update();
    } );

    //Update when the numeric readout visibility is toggled
    showValuesProperty.link( this.update.bind( this ) );

    this.update();
  }

  // Sets the arrow dash, which changes when the simulation starts playing
  public setArrowDash( lineDash: number[] ): void { this.arrowNode.lineDash = lineDash; }

  //On the motion screens, when the 'Friction' label overlaps the force vector it should be displaced vertically
  public set labelPosition( position: string ) {
    if ( this.labelPositionOption !== position ) {
      this.labelPositionOption = position;
      this.update();
    }
  }

  //Get the label position
  public get labelPosition(): string { return this.labelPositionOption; }

  // Update the arrow graphics and text labels
  public update(): void {

    const amount = Math.abs( this.value );
    
    // Use threshold-based descriptors that work for both netforce (quantized) and motion (continuous) values
    const amountDescriptor = amount < 75 ? 'small' :
                             amount < 125 ? 'medium small' :
                             amount < 175 ? 'medium' :
                             amount < 225 ? 'medium large' :
                             amount < 275 ? 'large' :
                             amount < 325 ? 'very large' :
                             'extremely large';

    // Build the accessible paragraph description
    if ( amount === 0 ) {
      this.accessibleParagraph = `There is no ${this.name} force arrow`;
    }
    else {
      let description = `The ${this.name} force arrow is ${amountDescriptor}`;

      // Add direction for sum arrows or for motion screen (except for applied/friction with value 0)
      if ( this.name === 'sum' || ( this.mode === 'motion' && amount !== 0 ) ) {
        const direction = this.value > 0 ? 'right' : 'left';
        description += `, to the ${direction}`;
      }

      this.accessibleParagraph = description;
    }

    // Add value and units if shown, otherwise just add period
    if ( this.showValuesProperty.value ) {
      this.accessibleParagraph += ` at ${amount} newtons.`;
    }
    else {
      this.accessibleParagraph += '.';
    }

    const value = this.value * ( this.arrowScale || 1 );

    //Don't show it if it is too small
    const hidden = Math.abs( value ) < 1E-6;
    this.hidden = hidden;
    this.arrowNode.visible = !hidden;
    this.valueNode.visible = !hidden && this.showValuesProperty.value;
    this.valueBackgroundRectangle.visible = false;

    // The label can also be hidden with a query parameter for screenshots.
    this.labelNode.visible = !hidden && ForcesAndMotionBasicsQueryParameters.showForceArrowLabels;

    //Only change the node if visible, for performance
    if ( !hidden ) {
      const tailX = this.tailX;
      const tailY = this.tailY;
      const tailWidth = ReadoutArrow.ARROW_HEAD_HEIGHT;
      const headWidth = ReadoutArrow.ARROW_HEAD_WIDTH;

      //For short arrows, the head height should be half of the arrow length.  See https://github.com/phetsims/scenery-phet/issues/30
      const headHeight = Math.min( Math.abs( value ) / 2, 40 );
      this.arrowNode.shape = new ArrowShape( tailX, tailY, tailX + value, tailY,
        { tailWidth: tailWidth, headWidth: headWidth, headHeight: headHeight } );

      // Position the value and label if the label position is on the side
      if ( this.labelPositionOption === 'side' ) {
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
        if ( this.labelPositionOption === 'bottom' ) {
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
          this.labelNode.bottom = tailY - ReadoutArrow.ARROW_HEAD_WIDTH / 2 - ReadoutArrow.ARROW_LINE_WIDTH * 2;

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

forcesAndMotionBasics.register( 'ReadoutArrow', ReadoutArrow );