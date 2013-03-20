define( function( require ) {
  "use strict";

  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Inheritance = require( 'PHETCOMMON/util/Inheritance' );
  var Strings = require( "i18n!../../../nls/forces-and-motion-basics-strings" );

  function FlagNode( model ) {
    var flagNode = this;
    Node.call( this, {x: 981 / 2, y: 100} );

    var text = new Text( model.cart.x < 0 ? "Blue Team Wins" : "Red Team Wins", {fontSize: '34px', backend: 'svg'} );
    text.centerX = 0;
    text.centerY = 0;
    var path = new Path( {shape: Shape.rect( 0, 0, text.width * 2, text.height * 3 ), fill: 'yellow'} );
    path.centerX = 0;
    path.centerY = 0;
    this.addChild( path );
    this.addChild( text );
    //Do it once, to remove as a listener since flag node gets recreated when another game won
    model.once( 'reset-all', function() {flagNode.detach();} );
  }

  Inheritance.inheritPrototype( FlagNode, Node );

  return FlagNode;
} );