// Copyright 2002-2013, University of Colorado Boulder

/**
 * Scenery node that shows the control panel for the Motion, Friction and Acceleration tabs.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );
  var HSlider = require( 'motion/view/HSlider' );
  var Strings = require( 'Strings' );
  var Property = require( 'AXON/Property' );
  var Panel = require( 'SUN/Panel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var VerticalCheckBoxGroup = require( 'SUN/VerticalCheckBoxGroup' );
  var MotionConstants = require( 'motion/MotionConstants' );
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var SpeedometerNode = require( 'motion/view/SpeedometerNode' );
  var AccelerometerNode = require( 'motion/view/AccelerometerNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  /**
   * Main constructor for MotionControlPanel
   *
   * @param {MotionModel} model the model for the entire 'motion', 'friction' or 'acceleration' tab
   * @constructor
   */
  function MotionControlPanel( model ) {
    Node.call( this, {renderer: 'svg'} );

    var fontSize = '19px';

    var toElement = function( text, propertyName, options ) {
      options = _.extend( {indent: 0}, options );
      return {
        //TODO: Why is this immense spacing necessary here?
        content: options.icon ? new HBox( {spacing: 40, children: [ new Text( text, {font: new PhetFont( fontSize )} ), options.icon]} ) : new Text( text, {font: new PhetFont( fontSize )} ),
        property: model[propertyName + 'Property'],
        indent: options.indent
      };
    };

    //Icon for the forces in the control panel
    var arrowIcon = function() {return new ArrowNode( 0, 0, 40, 0, 20, 20, 10, {fill: '#e66e23', stroke: 'black'} );};
    var speedometerIcon = function() { return new SpeedometerNode( model.velocityProperty ).mutate( {scale: 0.2} ); };
    var accelerometerIcon = function() { return new AccelerometerNode( model.accelerationProperty ).mutate( {scale: 0.3} ); };

    var createFrictionSlider = function() {
      var createTick = function( label ) {
        var path = new Path( {shape: Shape.lineSegment( new Vector2( 0, 0 ), new Vector2( 0, -18 ) ), stroke: 'black', lineWidth: 1} );
        var text = new Text( label, {font: new PhetFont( 15 )} );
        model.stack.lengthProperty.link( function( length ) {
          var enabled = length > 0;
          path.fill = enabled ? 'black' : 'gray';
          text.fill = enabled ? 'black' : 'gray';
        } );
        return new VBox( {children: [ text, path ]} );
      };

      var frictionSlider = new HSlider( 0, MotionConstants.MAX_FRICTION, 150, model.frictionProperty, new Property( 'WITHIN_ALLOWED_RANGE' ), null, null, {zeroOnRelease: false} ).addTick( 0, createTick( 'None' ) ).addTick( 1, createTick( 'Lots' ) );
      var frictionLabel = new Text( 'Friction', new PhetFont( fontSize ) );
      var spacer = new Rectangle( 0, 0, 0, 4 );
      return new VBox( {children: [spacer, frictionLabel, frictionSlider], left: 5} );
    };

    var indent = 24;
    var controlPanel = new VBox( {
      align: 'left',
      children: model.tab === 'motion' ?
                [ new VerticalCheckBoxGroup(
                  [
                    toElement( Strings.force, 'showForce', {icon: arrowIcon()} ),
                    toElement( Strings.values, 'showValues', {indent: indent} ),
                    toElement( Strings.masses, 'showMasses' ),
                    toElement( Strings.speed, 'showSpeed', {icon: speedometerIcon()} )
                  ], {fill: '#e3e980'} )] :
                model.tab === 'friction' ?
                [ new VerticalCheckBoxGroup(
                  [
                    toElement( Strings.forces, 'showForce', {icon: arrowIcon()} ),
                    toElement( Strings.sumOfForces, 'showSumOfForces', {indent: indent} ),
                    toElement( Strings.values, 'showValues', {indent: indent} ),
                    toElement( Strings.masses, 'showMasses' ),
                    toElement( Strings.speed, 'showSpeed', {icon: speedometerIcon()} )
                  ], {fill: '#e3e980'} ), createFrictionSlider()] :
                [ new VerticalCheckBoxGroup(
                  [
                    toElement( Strings.forces, 'showForce', {icon: arrowIcon()} ),
                    toElement( Strings.sumOfForces, 'showSumOfForces', {indent: indent} ),
                    toElement( Strings.values, 'showValues', {indent: indent} ),
                    toElement( Strings.masses, 'showMasses' ),
                    toElement( Strings.speed, 'showSpeed', {icon: speedometerIcon()} ),
                    toElement( Strings.acceleration, 'showAcceleration', {icon: accelerometerIcon()} )
                  ], {fill: '#e3e980'} ), createFrictionSlider()]
    } );
    var panelNode = new Panel( controlPanel, {fill: '#e3e980'} );
    this.addChild( panelNode.mutate( { left: 981 - panelNode.width - 5, top: 5} ) );
  }

  return inherit( Node, MotionControlPanel );
} );