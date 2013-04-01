define( function( require ) {
  "use strict";

  var VBox = require( 'SCENERY/nodes/VBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var CheckBox = require( 'SUN/CheckBox' );
  var Button = require( 'SUN/Button' );
  var CheckBoxIcon = require( 'SUN/CheckBoxIcon' );
  var Inheritance = require( 'PHETCOMMON/util/Inheritance' );

  function TugOfWarControlPanel( model, options ) {
    Node.call( this, options );

    function checkBoxItem( propertyName, text ) {
      return new CheckBox( new HBox( {spacing: 10, children: [new CheckBoxIcon( model.property( propertyName ) ), new Text( text, {fontSize: '22px'} )]} ), {}, model.property( propertyName ) );
    }

    var controlPanel = new VBox( {align: 'left', children: [
      checkBoxItem( 'showSumOfForces', "Sum of Forces" ),
      checkBoxItem( 'showValues', "Values" ),
      checkBoxItem( 'volumeOn', "Sound" )
    ]} );
    this.addChild( controlPanel );

    var resetButton = new Button( new Text( '\uf021', {fontFamily: 'FontAwesome', fontSize: '36px', x: 50, y: 50, renderer: 'svg'} ), {}, model.reset.bind( model ) ).
        mutate( {left: controlPanel.left, top: controlPanel.bottom + 5} );
    this.addChild( resetButton );
  }

  Inheritance.inheritPrototype( TugOfWarControlPanel, Node );

  return TugOfWarControlPanel;
} );