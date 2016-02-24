// Copyright 2013-2015, University of Colorado Boulder

/**
 * Scenery node that shows the control panel for the Motion, Friction and Acceleration screens.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var VStrut = require( 'SCENERY/nodes/VStrut' );
  // var HSlider = require( 'FORCES_AND_MOTION_BASICS/motion/view/HSlider' );
  var SliderKnob = require( 'FORCES_AND_MOTION_BASICS/common/view/SliderKnob' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var HSlider = require( 'SUN/HSlider' );
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
  var Panel = require( 'SUN/Panel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var VerticalCheckBoxGroup = require( 'SUN/VerticalCheckBoxGroup' );
  var MotionConstants = require( 'FORCES_AND_MOTION_BASICS/motion/MotionConstants' );
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var GaugeNode = require( 'SCENERY_PHET/GaugeNode' );
  var AccelerometerNode = require( 'FORCES_AND_MOTION_BASICS/motion/view/AccelerometerNode' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  /**
   * Main constructor for MotionControlPanel
   *
   * @param {MotionModel} model the model for the entire 'motion', 'friction' or 'acceleration' screen
   * @constructor
   */
  function MotionControlPanel( model ) {
    Node.call( this, {} );

    var fontSize = 18;

    var toElement = function( text, propertyName, options ) {
      options = _.extend( { indent: 0 }, options );
      var textNode = new Text( text, { font: new PhetFont( fontSize ) } );
      return {
        //TODO: Why is this immense spacing necessary here?
        content: options.icon ? new HBox( { spacing: 10, children: [ textNode, options.icon ] } ) : textNode,
        property: model.property( propertyName ),
        indent: options.indent
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

    var createFrictionSlider = function() {

      //Create the friction slider and its labels.
      // Add invisible symmetric ticks + labels so the slider will be perfectly centered.  A better way to do this would be just to line things up based on the track of the slider,
      // but this makes it work with VBox/HBox
      var frictionSlider = new HSlider( model.frictionProperty, { min: 0, max: MotionConstants.MAX_FRICTION }, {
        trackSize: new Dimension2( 150, 6 ),
        thumbNode: new SliderKnob(),
        majorTickLength: 18,
        tickLabelSpacing: 3
      } );
      frictionSlider.addMajorTick( 0, new Text( noneString, { font: new PhetFont( 15 ) } ) );
      frictionSlider.addMajorTick( MotionConstants.MAX_FRICTION, new Text( lotsString, { font: new PhetFont( 15 ) } ) );
      frictionSlider.addMajorTick( MotionConstants.MAX_FRICTION, new Text( noneString, { font: new PhetFont( 15 ), visible: false } ) );
      frictionSlider.addMajorTick( 0, new Text( lotsString, { font: new PhetFont( 15 ), visible: false } ) );

      var frictionLabel = new Text( frictionString, new PhetFont( { size: fontSize, weight: 'bold' } ) );

      return new VBox( { spacing: -8, children: [ frictionLabel, frictionSlider ] } );
    };

    var indent = 24;

    // Create controls for the 'motion' screen
    var createMotionControls = function() {
      return [ new VerticalCheckBoxGroup( [
        toElement( forceString, 'showForce', { icon: arrowIcon() } ),
        toElement( valuesString, 'showValues', { indent: indent } ),
        toElement( massesString, 'showMasses' ),
        toElement( speedString, 'showSpeed', { icon: speedometerIcon() } )
      ], { fill: '#e3e980' } ) ];
    };

    // Create controls for the 'friction' screen
    var createFrictionControls = function() {
      return [
        new VerticalCheckBoxGroup( [
          toElement( forcesString, 'showForce', { icon: arrowIcon() } ),
          toElement( sumOfForcesString, 'showSumOfForces', { indent: indent } ),
          toElement( valuesString, 'showValues', { indent: indent } ),
          toElement( massesString, 'showMasses' ),
          toElement( speedString, 'showSpeed', { icon: speedometerIcon() } )
        ], { fill: '#e3e980' } ),
        new VStrut( 12 ),
        createFrictionSlider() ];
    };

    // Create controls for the 'acceleration' screen
    var createAccelerationControls = function() {
      return [
        new VerticalCheckBoxGroup( [
          toElement( forcesString, 'showForce', { icon: arrowIcon() } ),
          toElement( sumOfForcesString, 'showSumOfForces', { indent: indent } ),
          toElement( valuesString, 'showValues', { indent: indent } ),
          toElement( massesString, 'showMasses' ),
          toElement( speedString, 'showSpeed', { icon: speedometerIcon() } ),
          toElement( accelerationString, 'showAcceleration', { icon: accelerometerIcon() } )
        ], { fill: '#e3e980' } ),
        new VStrut( 12 ),
        createFrictionSlider()
      ];
    };

    var controlPanel = new VBox( {
      align: 'center',
      children: model.screen === 'motion' ? createMotionControls() :
                model.screen === 'friction' ? createFrictionControls() :
                createAccelerationControls()
    } );
    var panelNode = new Panel( controlPanel, { xMargin: 10, yMargin: 10, fill: '#e3e980' } );
    this.addChild( panelNode.mutate( { left: 981 - panelNode.width - 5, top: 5 } ) );
  }

  forcesAndMotionBasics.register( 'MotionControlPanel', MotionControlPanel );

  return inherit( Node, MotionControlPanel );

} );
