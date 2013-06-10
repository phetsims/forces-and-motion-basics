define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );
  var HSlider = require( 'motion/view/HSlider' );
  var Strings = require( 'Strings' );
  var Button = require( 'SUN/Button' );
  var Property = require( 'AXON/Property' );
  var PanelNode = require( 'SUN/PanelNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var CheckBox = require( 'SUN/CheckBox' );
  var VerticalCheckBoxGroup = require( 'SUN/VerticalCheckBoxGroup' );

  function MotionControlPanel( model ) {
    Node.call( this );

    var fontSize = '19px';

    var toElement = function( text, propertyName ) {
      return {
        content: new Text( text, {fontSize: fontSize} ),
        property: model[propertyName + 'Property']
      };
    };

    var controlPanel = new VBox( {
      align: 'left',
      children: model.tab === 'motion' ?
                [new PanelNode( new VerticalCheckBoxGroup(
                  [
                    toElement( Strings.force, 'showForce' ),
                    toElement( Strings.values, 'showValues' ),
                    toElement( Strings.masses, 'showMasses' ),
                    toElement( Strings.speed, 'showSpeed' )
                  ] ), {fill: '#e3e980'} )] :
                model.tab === 'friction' ?
                [new PanelNode( new VerticalCheckBoxGroup(
                  [
                    toElement( Strings.force, 'showForce' ),
                    toElement( Strings.sumOfForces, 'showSumOfForces' ),
                    toElement( Strings.values, 'showValues' ),
                    toElement( Strings.masses, 'showMasses' ),
                    toElement( Strings.speed, 'showSpeed' )
                  ] ), {fill: '#e3e980'} )] :
                [new PanelNode( new VerticalCheckBoxGroup(
                  [
                    toElement( Strings.force, 'showForce' ),
                    toElement( Strings.sumOfForces, 'showSumOfForces' ),
                    toElement( Strings.values, 'showValues' ),
                    toElement( Strings.masses, 'showMasses' ),
                    toElement( Strings.speed, 'showSpeed' ),
                    toElement( Strings.acceleration, 'showAcceleration' )
                  ] ), {fill: '#e3e980'} )]
    } );
    if ( model.tab !== 'motion' ) {

      var createTick = function( label ) {
        return new VBox( {spacing: 10, children: [
          new Path( {shape: Shape.lineSegment( new Vector2( 0, 0 ), new Vector2( 0, 18 ) ), stroke: 'black', lineWidth: 1} ),
          new Text( label )
        ]} );
      };

      var frictionSlider = new HSlider( 0, 2, 150, model.frictionProperty, new Property( 'WITHIN_ALLOWED_RANGE' ), {zeroOnRelease: false} ).addTick( 0, createTick( 'None' ) ).addTick( 1, createTick( 'Lots' ) );
      var frictionLabel = new Text( 'Friction', {fontSize: fontSize} );
      controlPanel.addChild( new PanelNode( new VBox( {spacing: 14, children: [frictionLabel, frictionSlider]} ), {left: 5, top: controlPanel.bottom + 5} ) );
    }
    this.addChild( controlPanel.mutate( { left: 981 - controlPanel.width - 5, top: 5} ) );
  }

  inherit( Node, MotionControlPanel );

  return MotionControlPanel;
} );