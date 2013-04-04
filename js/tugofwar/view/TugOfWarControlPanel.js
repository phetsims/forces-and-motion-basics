define( function( require ) {
  "use strict";

  var VBox = require( 'SCENERY/nodes/VBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Button = require( 'SUN/Button' );
  var ToggleButton = require( 'SUN/ToggleButton' );
  var ToggleNode = require( 'SUN/ToggleNode' );
  var CheckBox = require( 'SUN/CheckBox' );
  var inherit = require( 'PHET_CORE/inherit' );

  function TugOfWarControlPanel( model, imageLoader, options ) {
    Node.call( this, options );

    var controlPanel = new VBox( {align: 'left', children: [
      new CheckBox( new Text( "Sum of Forces", {fontSize: '22px'} ), model.property( 'showSumOfForces' ) ),
      new CheckBox( new Text( "Values", {fontSize: '22px'} ), model.property( 'showValues' ) )
    ]} );
    this.addChild( controlPanel );

    var resetButton = new Button( new Image( $( '.phet-icon-refresh' )[0], {scale: 0.025} ), {}, model.reset.bind( model ) );
    var soundButton = new ToggleButton( new ToggleNode( new Image( imageLoader.getImage( 'icon-volume-off.svg' ), {scale: 0.025} ),
                                                        new Image( imageLoader.getImage( 'icon-volume-up.svg' ), {scale: 0.025} ),
                                                        model.property( 'volumeOn' ) ), model.property( 'volumeOn' ) );
    this.addChild( new HBox( {spacing: 5, children: [ resetButton, soundButton ]} ).mutate( {left: controlPanel.left, top: controlPanel.bottom + 5} ) );
  }

  inherit( TugOfWarControlPanel, Node );

  return TugOfWarControlPanel;
} );