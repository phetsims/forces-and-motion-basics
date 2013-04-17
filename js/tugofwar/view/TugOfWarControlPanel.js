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
  var Strings = require( 'Strings' );
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  var VerticalCheckBoxGroup = require( 'SUN/VerticalCheckBoxGroup' );

  function TugOfWarControlPanel( model, imageLoader, options ) {
    Node.call( this, options );

    var fontSize = '19px';
    var controlPanel = new VerticalCheckBoxGroup( [
                                                    {content: new Text( Strings.sumOfForces, {fontSize: fontSize} ), property: model.property( 'showSumOfForces' )},
                                                    {content: new Text( Strings.values, {fontSize: fontSize} ), property: model.property( 'showValues' )}
                                                  ] );
    this.addChild( controlPanel );

    var resetButton = new Button( new FontAwesomeNode( 'refresh', {fill: '#fff'} ), {}, model.reset.bind( model ) );
    var soundButton = new ToggleButton( new ToggleNode( new FontAwesomeNode( 'volume_off' ),
                                                        new FontAwesomeNode( 'volume_up' ),
                                                        model.property( 'volumeOn' ) ), model.property( 'volumeOn' ) );
    this.addChild( new HBox( {spacing: 5, children: [ resetButton, soundButton ]} ).mutate( {left: controlPanel.left, top: controlPanel.bottom + 5} ) );
  }

  inherit( TugOfWarControlPanel, Node );

  return TugOfWarControlPanel;
} );