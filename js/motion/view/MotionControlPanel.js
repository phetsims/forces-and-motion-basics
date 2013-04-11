define( function( require ) {
  "use strict";
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );
  var HSlider = require( 'motion/view/HSlider' );
  var Strings = require( "i18n!../../../nls/forces-and-motion-basics-strings" );
  var SpeedometerNode = require( "motion/view/SpeedometerNode" );
  var Button = require( 'SUN/Button' );
  var inherit = require( 'PHET_CORE/inherit' );
  var CheckBox = require( 'SUN/CheckBox' );

  function MotionControlPanel( model, imageLoader ) {
    Node.call( this );

    var fontSize = '19px';
    var forceCheckBox = new CheckBox( new Text( 'Force', {fontSize: fontSize, x: 50, y: 50} ), model.property( 'showForce' ) );
    var sumOfForcesCheckBox = new CheckBox( new Text( 'Sum of Forces', {fontSize: fontSize, x: 50, y: 50} ), model.property( 'showSumOfForces' ) );
    var valuesCheckBox = new CheckBox( new Text( 'Values', {fontSize: fontSize, x: 50, y: 50} ), model.property( 'showValues' ) );
    var massesCheckBox = new CheckBox( new Text( 'Masses', {fontSize: fontSize, x: 50, y: 50} ), model.property( 'showMasses' ) );
    var speedCheckBox = new CheckBox( new Text( 'Speed', {fontSize: fontSize, x: 50, y: 50} ), model.property( 'showSpeed' ) );
    var accelerationCheckBox = new CheckBox( new Text( 'Acceleration', {fontSize: fontSize, x: 50, y: 50} ), model.property( 'showAcceleration' ) );
    var controlPanel = new VBox( {align: 'left',
                                   children: model.tab === 'motion' ?
                                             [ forceCheckBox, valuesCheckBox, massesCheckBox, speedCheckBox] :
                                             model.tab === 'friction' ?
                                             [ forceCheckBox, sumOfForcesCheckBox, valuesCheckBox, massesCheckBox, speedCheckBox] :
                                             [ forceCheckBox, sumOfForcesCheckBox, valuesCheckBox, massesCheckBox, speedCheckBox, accelerationCheckBox]
                                 } );
    if ( model.tab !== 'motion' ) {

      var createTick = function( label ) {
        return new VBox( {spacing: 10, children: [
          new Path( {shape: Shape.lineSegment( new Vector2( 0, 0 ), new Vector2( 0, 18 ) ), stroke: 'black', lineWidth: 1} ),
          new Text( label )
        ]} );
      };

      var frictionSlider = new HSlider( 0, 2, 150, model.property( 'friction' ), imageLoader ).addTick( 0, createTick( 'None' ) ).addTick( 1, createTick( 'Lots' ) );
      var frictionLabel = new Text( 'Friction', {fontSize: fontSize} );
      controlPanel.addChild( new VBox( {spacing: 14, children: [frictionLabel, frictionSlider]} ).mutate( {left: 5, top: controlPanel.bottom + 5} ) );
    }
    this.addChild( controlPanel.mutate( { left: 981 - controlPanel.width - 5, top: 5} ) );
  }

  inherit( MotionControlPanel, Node );

  return MotionControlPanel;
} );
