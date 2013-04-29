define( function( require ) {
  "use strict";

  var VBox = require( 'SCENERY/nodes/VBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var SoundToggleButton = require( 'SCENERY_PHET/SoundToggleButton' );
  var CheckBox = require( 'SUN/CheckBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Strings = require( 'Strings' );
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  var VerticalCheckBoxGroup = require( 'SUN/VerticalCheckBoxGroup' );

  function TugOfWarControlPanel( model, options ) {
    Node.call( this, options );

    var fontSize = '19px';
    var controlPanel = new VerticalCheckBoxGroup( [
                                                    {content: new Text( Strings.sumOfForces, {fontSize: fontSize} ), property: model.property( 'showSumOfForces' )},
                                                    {content: new Text( Strings.values, {fontSize: fontSize} ), property: model.property( 'showValues' )}
                                                  ] );
    this.addChild( controlPanel );

    var resetButton = new ResetAllButton( model.reset.bind( model ) );
    var soundButton = new SoundToggleButton( model.property( 'volumeOn' ) );
    this.addChild( new HBox( {spacing: 5, children: [ resetButton, soundButton ]} ).mutate( {left: controlPanel.left, top: controlPanel.bottom + 5} ) );
  }

  inherit( TugOfWarControlPanel, Node );

  return TugOfWarControlPanel;
} );