define( function( require ) {
  "use strict";

  var Image = require( 'SCENERY/nodes/Image' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Strings = require( 'Strings' );
  var Layout = require( 'Layout' );
  var Button = require( 'SUN/Button' );
  var Font = require( 'SCENERY/util/Font' );

  function ReturnButton( model, options ) {
    Node.call( this );

    this.addChild( new Button( new Text( 'Return', {font: new Font( { weight: 'bold', size: 16 } )} ), model.returnCart.bind( model ), {fill: '#ffd438'} ) );
    this.mutate( options );
    model.link( 'started', this, 'visible' );
  }

  inherit( ReturnButton, Node );

  return ReturnButton;
} );
