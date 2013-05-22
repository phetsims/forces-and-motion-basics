/**
 * Arrow that displays a numerical value inside the arrow (if there is room) or above the arrow.
 * Used for force arrows in Forces and Motion: Basics
 * @author Sam Reid
 */
define( function( require ) {
  "use strict";
  var Path = require( 'SCENERY/nodes/Path' );
  var Node = require( 'SCENERY/nodes/Node' );
  var arrow = require( 'tugofwar/view/arrow' );
  var inherit = require( 'PHET_CORE/inherit' );

  function ReadoutArrow( options ) {
    Node.call( this );
    this.arrowPath = new Path( options );
    this.addChild( this.arrowPath );
  }

  inherit( ReadoutArrow, Node, {
    setValue: function( value ) {
      var tailX = 981 / 2;
      var tailY = 280;
      var tailWidth = 25;
      var headWidth = 50;
      var headHeight = 40;
      this.arrowPath.shape = arrow( tailX, tailY, tailX + value, tailY, tailWidth, headWidth, headHeight );
    }
  } );

  return ReadoutArrow;
} );