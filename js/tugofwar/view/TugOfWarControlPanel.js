define( function( require ) {
  "use strict";

  var VBox = require( 'SCENERY/nodes/VBox' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Button = require( 'SUN/Button' );
  var CheckBox = require( 'SUN/CheckBox' );
  var inherit = require( 'PHET_CORE/inherit' );

  function TugOfWarControlPanel( model, options ) {
    Node.call( this, options );

    var controlPanel = new VBox( {align: 'left', children: [
      new CheckBox( new Text( "Sum of Forces", {fontSize: '22px'} ), model.property( 'showSumOfForces' ) ),
      new CheckBox( new Text( "Values", {fontSize: '22px'} ), model.property( 'showValues' ) ),
      new CheckBox( new Text( "Sound", {fontSize: '22px'} ), model.property( 'volumeOn' ) )
    ]} );
    this.addChild( controlPanel );

    var resetButton = new Button( new Image( $( '.phet-icon-refresh' )[0], {scale: 0.025} ), {}, model.reset.bind( model ) ).
        mutate( {left: controlPanel.left, top: controlPanel.bottom + 5} );
    this.addChild( resetButton );
  }

  inherit( TugOfWarControlPanel, Node );

  return TugOfWarControlPanel;
} );