define( function( require ) {
  "use strict";

  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Inheritance = require( 'PHETCOMMON/util/Inheritance' );
  var Strings = require( "i18n!../../../nls/forces-and-motion-basics-strings" );

  function FlagNode( model ) {
    var flagNode = this;
    Node.call( this, {x: 420, y: 100} );
    this.addChild( new Text( model.cart.get( 'x' ) < 0 ? "Blue Team Wins" : "Red Team Wins", {fontSize: '34px', backend: 'svg'} ) );
    model.once( 'reset-all', function() {//Do it once, to remove as a listener.
      flagNode.detach();
    } );
  }

  Inheritance.inheritPrototype( FlagNode, Node );

  return FlagNode;
} );