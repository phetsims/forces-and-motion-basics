define( function( require ) {
  "use strict";
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var HSlider = require( 'motion/view/HSlider' );
  var Strings = require( "i18n!../../../nls/forces-and-motion-basics-strings" );
  var SpeedometerNode = require( "motion/view/SpeedometerNode" );
  var Button = require( 'SUN/Button' );
  var inherit = require( 'PHET_CORE/inherit' );
  var CheckBox = require( 'SUN/CheckBox' );

  function MotionControlPanel( model, imageLoader ) {
    Node.call( this );

    var forceCheckBox = new CheckBox( new Text( 'Force', {fontSize: '22px', x: 50, y: 50} ), model.property( 'showForce' ) );
    var sumOfForcesCheckBox = new CheckBox( new Text( 'Sum of Forces', {fontSize: '22px', x: 50, y: 50} ), model.property( 'showSumOfForces' ) );
    var valuesCheckBox = new CheckBox( new Text( 'Values', {fontSize: '22px', x: 50, y: 50} ), model.property( 'showValues' ) );
    var massesCheckBox = new CheckBox( new Text( 'Masses', {fontSize: '22px', x: 50, y: 50} ), model.property( 'showMasses' ) );
    var speedCheckBox = new CheckBox( new Text( 'Speed', {fontSize: '22px', x: 50, y: 50} ), model.property( 'showSpeed' ) );
    var accelerationCheckBox = new CheckBox( new Text( 'Acceleration', {fontSize: '22px', x: 50, y: 50} ), model.property( 'showAcceleration' ) );
    var controlPanel = new VBox( {align: 'left',
                                   children: model.tab === 'motion' ?
                                             [ forceCheckBox, valuesCheckBox, massesCheckBox, speedCheckBox] :
                                             model.tab === 'friction' ?
                                             [ forceCheckBox, sumOfForcesCheckBox, valuesCheckBox, massesCheckBox, speedCheckBox] :
                                             [ forceCheckBox, sumOfForcesCheckBox, valuesCheckBox, massesCheckBox, speedCheckBox, accelerationCheckBox]
                                 } );
    if ( model.tab !== 'motion' ) {
      var frictionSlider = new HSlider( -100, 100, 300, model.property( 'friction' ), imageLoader );
      var frictionLabel = new Text( 'Friction', {fontSize: '22px'} );
      controlPanel.addChild( new VBox( {spacing: 14, children: [frictionLabel, frictionSlider]} ).mutate( {left: 5, top: controlPanel.bottom + 5} ) );
    }
    this.addChild( controlPanel );
  }

  inherit( MotionControlPanel, Node );

  return MotionControlPanel;
} );
