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
  var PanelNode = require( 'SUN/PanelNode' );

  function TugOfWarControlPanel( model, options ) {
    options = _.extend( {renderer: 'svg'}, options );
    Node.call( this, options );

    var fontSize = '19px';
    var controlPanel = new VerticalCheckBoxGroup( [
      {content: new Text( Strings.sumOfForces, {fontSize: fontSize} ), property: model.showSumOfForcesProperty, label: Strings.sumOfForces},
      {content: new Text( Strings.values, {fontSize: fontSize} ), property: model.showValuesProperty, label: Strings.values}
    ] );
    this.addChild( new PanelNode( controlPanel, {fill: '#e3e980'} ) );

    //Create sound and reset buttons, and size them to be the same height 
    var resetButton = new ResetAllButton( model.reset.bind( model ) );
    var soundButton = new SoundToggleButton( model.volumeOnProperty, { padX: 19, padY: 19 } );
    this.addChild( new HBox( {spacing: 5, children: [ resetButton, soundButton ]} ).mutate( {centerX: controlPanel.centerX, top: controlPanel.bottom + 10} ) );
  }

  inherit( Node, TugOfWarControlPanel );

  return TugOfWarControlPanel;
} );