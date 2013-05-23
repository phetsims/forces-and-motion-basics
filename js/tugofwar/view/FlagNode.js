define( function( require ) {
  "use strict";

  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Strings = require( 'Strings' );

  function FlagNode( model, centerX, top ) {
    var flagNode = this;
    Node.call( this );

    var text = new Text( model.cart.x < 0 ? "Blue Wins!" : "Red Wins!", {fontSize: '32px', fill: 'white'} );
    text.centerX = 0;
    text.centerY = 0;
    var path = new Path( {fill: model.cart.x < 0 ? 'blue' : 'red', stroke: 'black', lineWidth: 2} );
    path.centerX = 0;
    path.centerY = 0;
    this.addChild( path );
    this.addChild( text );

    //Do it once, to remove as a listener since flag node gets recreated when another game won
    model.once( 'reset-all', function() {flagNode.detach();} );

    var updateFlagShape = function() {
      var shape = new Shape();
      var maxX = 220;
      var maxY = 75;
      var dy = ( 7 * Math.sin( model.time * 6 ) );
      var dx = ( 2 * Math.sin( model.time * 5 ) ) + 10;
      shape.moveTo( 0, 0 );
      shape.cubicCurveTo( maxX / 3 + dx, 25 + dy, 2 * maxX / 3 + dx, -25 - dy, maxX + dx, dy / 2 );
      shape.lineTo( maxX + dx, maxY + dy / 2 );
      shape.cubicCurveTo( 2 * maxX / 3 + dx, -25 + maxY - dy, maxX / 3 + dx, 25 + maxY + dy, 0, maxY );
      shape.lineTo( 0, 0 );
      shape.close();
      path.shape = shape;
    };
    model.on( 'step', updateFlagShape );
    updateFlagShape();
    text.centerX = path.centerX;
    text.centerY = path.centerY;
    console.log( "width=", this.width, 'centerx ', centerX );
    this.centerX = centerX;
    this.top = top;
  }

  inherit( FlagNode, Node );

  return FlagNode;
} );