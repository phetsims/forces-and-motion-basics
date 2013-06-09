/**
 * Arrow that displays a numerical value inside the arrow (if there is room) or above the arrow.
 * Used for force arrows in Forces and Motion: Basics
 * @author Sam Reid
 */
define( function( require ) {
  "use strict";
  var Path = require( 'SCENERY/nodes/Path' );
  var Font = require( 'SCENERY/util/Font' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Node = require( 'SCENERY/nodes/Node' );
  var arrow = require( 'tugofwar/view/arrow' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MotionConstants = require( 'motion/MotionConstants' );

  /**
   *
   * @param fill the color of the arrow
   * @param options 'labelPosition' where the label text should be {side|*top}
   * @constructor
   */
  function ReadoutArrow( label, fill, tailX, tailY, valueProperty, showValuesProperty, options ) {
    var readoutArrow = this;
    this.options = _.extend( {labelPosition: 'top'}, options );
    this.showValuesProperty = showValuesProperty;
    this.tailX = tailX;
    this.tailY = tailY;
    Node.call( this );

    this.arrowNode = new Path( _.extend( {fill: fill, stroke: '#000000', lineWidth: 1}, options ) );
    this.valueNode = new Text( '110N', {font: new Font( { weight: 'bold', size: 16 } )} );
    this.labelNode = new Text( label, {font: new Font( { weight: 'bold', size: 16 } )} );
    this.addChild( this.arrowNode );
    this.addChild( this.valueNode );
    this.addChild( this.labelNode );
    valueProperty.link( function( value ) {
      readoutArrow.value = value;
      readoutArrow.valueNode.text = Math.abs( value ).toFixed( 0 ) + 'N';
      readoutArrow.update();
    } );
    showValuesProperty.link( this.update.bind( this ) );
  }

  inherit( Node, ReadoutArrow, {
    setArrowDash: function( lineDash ) { this.arrowNode.lineDash = lineDash; },
    update: function() {
      var value = this.value;
      var hidden = Math.abs( value ) < 1E-6;
      this.hidden = hidden;
      this.arrowNode.visible = !hidden;
      this.valueNode.visible = !hidden && this.showValuesProperty.value;
      this.labelNode.visible = !hidden;
      if ( !hidden ) {
        var tailX = this.tailX;
        var tailY = this.tailY;
        var tailWidth = 25;
        var headWidth = 50;
        var headHeight = 40;
        this.arrowNode.shape = arrow( tailX, tailY, tailX + value, tailY, tailWidth, headWidth, headHeight );
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
          this.labelNode.bottom = isFinite( this.arrowNode.centerY ) ? this.arrowNode.centerY - headHeight / 2 - this.labelNode.height - 5 : 0;
          if ( this.valueNode.width + 5 > this.arrowNode.width ) {
            this.valueNode.top = this.labelNode.bottom;
          }
        }
      }
    }
  } );

  return ReadoutArrow;
} );