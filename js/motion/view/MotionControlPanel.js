// Copyright 2002-2013, University of Colorado Boulder

/**
 * Scenery node that shows the control panel for the Motion, Friction and Acceleration screens.
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
  var HSlider = require( 'FORCES_AND_MOTION_BASICS/motion/view/HSlider' );
  var speedString = require( 'string!FORCES_AND_MOTION_BASICS/speed' );
  var accelerationString = require( 'string!FORCES_AND_MOTION_BASICS/acceleration' );
  var forceString = require( 'string!FORCES_AND_MOTION_BASICS/force' );
  var forcesString = require( 'string!FORCES_AND_MOTION_BASICS/forces' );
  var sumOfForcesString = require( 'string!FORCES_AND_MOTION_BASICS/sumOfForces' );
  var valuesString = require( 'string!FORCES_AND_MOTION_BASICS/values' );
  var massesString = require( 'string!FORCES_AND_MOTION_BASICS/masses' );
  var frictionString = require( 'string!FORCES_AND_MOTION_BASICS/friction' );
  var lotsString = require( 'string!FORCES_AND_MOTION_BASICS/lots' );
  var noneString = require( 'string!FORCES_AND_MOTION_BASICS/none' );
  var Property = require( 'AXON/Property' );
  var Panel = require( 'SUN/Panel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var VerticalCheckBoxGroup = require( 'SUN/VerticalCheckBoxGroup' );
  var MotionConstants = require( 'FORCES_AND_MOTION_BASICS/motion/MotionConstants' );
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var GaugeNode = require( 'SCENERY_PHET/GaugeNode' );
  var AccelerometerNode = require( 'FORCES_AND_MOTION_BASICS/motion/view/AccelerometerNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  /**
   * Main constructor for MotionControlPanel
   *
   * @param {MotionModel} model the model for the entire 'motion', 'friction' or 'acceleration' screen
   * @constructor
   */
  function MotionControlPanel( model ) {
    Node.call( this, {} );

    var fontSize = 18;

    var toElement = function( text, propertyName, checkboxID, options ) {
      options = _.extend( { indent: 0 }, options );
      var textNode = new Text( text, { font: new PhetFont( fontSize ) } );
      return {
        //TODO: Why is this immense spacing necessary here?
        content: options.icon ? new HBox( { spacing: 10, children: [ textNode, options.icon ] } ) : textNode,
        property: model.property( propertyName ),
        indent: options.indent,
        id: checkboxID
      };
    };

    //Icon for the forces in the control panel
    var arrowIcon = function() {
      return new ArrowNode( 0, 0, 40, 0, {
        headHeight: 20,
        headWidth: 20,
        tailWidth: 10,
        fill: '#e66e23',
        stroke: 'black'
      } );
    };
    var speedometerIcon = function() {
      return new GaugeNode( model.velocityProperty, speedString, {
        min: 0,
        max: MotionConstants.MAX_SPEED
      }, { scale: 0.2 } );
    };
    var accelerometerIcon = function() { return new AccelerometerNode( model.accelerationProperty ).mutate( { scale: 0.3 } ); };

    //Workarounds because VBox centering not working properly
    var spacer = function( width, height ) { return new Rectangle( 0, 0, width, height, { visible: false } ); };

    var createFrictionSlider = function() {
      var createTick = function( label, visible ) {
        var path = new Path( Shape.lineSegment( new Vector2( 0, 0 ), new Vector2( 0, -18 ) ), { stroke: 'black', lineWidth: 1 } );
        var text = new Text( label, { font: new PhetFont( 15 ) } );
        model.stack.lengthProperty.link( function( length ) {
          var enabled = length > 0;
          path.fill = enabled ? 'black' : 'gray';
          text.fill = enabled ? 'black' : 'gray';
        } );
        return new VBox( { children: [ text, path ], pickable: false, visible: visible } );
      };

      //Create the friction slider and its labels.
      // Add invisible symmetric ticks + labels so the slider will be perfectly centered.  A better way to do this would be just to line things up based on the track of the slider,
      // but this makes it work with VBox/HBox
      var frictionSlider = new HSlider( 0, MotionConstants.MAX_FRICTION, 150, model.frictionProperty, new Property( 'WITHIN_ALLOWED_RANGE', { id: 'disableLeftProperty' } ), null, null, { zeroOnRelease: false } ).
        addTick( 0, createTick( noneString, true ) ).addTick( 1, createTick( lotsString, true ) ).
        addTick( 0, createTick( lotsString, false ) ).addTick( 1, createTick( noneString, false ) );
      var frictionLabel = new Text( frictionString, new PhetFont( { size: fontSize, weight: 'bold' } ) );

      return new VBox( { spacing: -8, children: [ frictionLabel, frictionSlider ] } );
    };

    var indent = 24;
    var controlPanel = new VBox( {
      align: 'center',
      children: model.screen === 'motion' ?
                [ new VerticalCheckBoxGroup(
                  [
                    toElement( forceString, 'showForce', { icon: arrowIcon() } ),
                    toElement( valuesString, 'showValues', { indent: indent } ),
                    toElement( massesString, 'showMasses' ),
                    toElement( speedString, 'showSpeed', { icon: speedometerIcon() } )
                  ], { fill: '#e3e980' } ) ] :
                model.screen === 'friction' ?
                [ new VerticalCheckBoxGroup(
                  [
                    toElement( forcesString, 'showForce', { icon: arrowIcon() } ),
                    toElement( sumOfForcesString, 'showSumOfForces', { indent: indent } ),
                    toElement( valuesString, 'showValues', { indent: indent } ),
                    toElement( massesString, 'showMasses' ),
                    toElement( speedString, 'showSpeed', { icon: speedometerIcon() } )
                  ], { fill: '#e3e980' } ), spacer( 12, 12 ), createFrictionSlider() ] :
                [ new VerticalCheckBoxGroup(
                  [
                    toElement( forcesString, 'showForce', { icon: arrowIcon() } ),
                    toElement( sumOfForcesString, 'showSumOfForces', { indent: indent } ),
                    toElement( valuesString, 'showValues', { indent: indent } ),
                    toElement( massesString, 'showMasses' ),
                    toElement( speedString, 'showSpeed', { icon: speedometerIcon() } ),
                    toElement( accelerationString, 'showAcceleration', { icon: accelerometerIcon() } )
                  ], { fill: '#e3e980' } ), spacer( 12, 12 ), createFrictionSlider() ]
    } );
    var panelNode = new Panel( controlPanel, { xMargin: 10, yMargin: 10, fill: '#e3e980' } );
    this.addChild( panelNode.mutate( { left: 981 - panelNode.width - 5, top: 5 } ) );
  }

  return inherit( Node, MotionControlPanel );
} );
