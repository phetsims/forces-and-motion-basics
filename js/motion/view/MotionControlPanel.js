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
  var Property = require( 'AXON/Property' );
  var CheckBox = require( 'SUN/CheckBox' );
  var VStrut = require( 'SCENERY/nodes/VStrut' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
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
    var maxTextWidth = 250;

    /**
     * Create a check box that will be placed in this control panel with others in a VBox.
     * Has optional horizontal indentation, icon, and property to control how the checkbox is enabled.
     *
     * @param {string} text - label for the check box
     * @param {Property<boolean>} propertyName
     * @param {object} options
     */
    var createCheckBox = function( text, propertyName, options ) {
      options = _.extend( { 
        indent: 0,
        checkBoxEnabledProperty: new Property( true ),
        icon: null
      }, options );

      // container for the checkbox and optional indentation and icon
      var checkBoxContainer = new HBox( { spacing: 0 } );

      // create the horizontal spacer for the indentation and add it to the container
      var hSeparator = new HStrut( options.indent );
      checkBoxContainer.insertChild( 0, hSeparator );

      // create the label for the checkbox
      var labelText = new Text( text, { font: new PhetFont( fontSize ), maxWidth: maxTextWidth } );

      // create the check box and insert it into the container
      var checkBox = new CheckBox( labelText, model.property( propertyName ) );
      checkBoxContainer.insertChild( 1, checkBox );

      // add optional icon next to checkbox
      if( options.icon ) {
        // create a horizontal spacer for the icon
        var iconSpacer = new HStrut( 10 );
        checkBoxContainer.insertChild( 2, iconSpacer );
        checkBoxContainer.insertChild( 3, options.icon );
      }

      // link the property to the enabled state of the check box
      // check box persists for the lifetime of the simulation, no dispose necessary
      options.checkBoxEnabledProperty.link( function( enabled ) {
        checkBox.enabled = enabled;
      } );

      return checkBoxContainer;
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
      var sliderTickOptions = { font: new PhetFont( 15 ), maxWidth: maxTextWidth * 0.5 };
      var invisibleSliderTickOptions = _.extend( { visible: false }, sliderTickOptions );
      frictionSlider.addMajorTick( 0, new Text( noneString, sliderTickOptions ) );
      frictionSlider.addMajorTick( MotionConstants.MAX_FRICTION, new Text( lotsString, sliderTickOptions ) );
      frictionSlider.addMajorTick( MotionConstants.MAX_FRICTION, new Text( noneString, invisibleSliderTickOptions ) );
      frictionSlider.addMajorTick( 0, new Text( lotsString, invisibleSliderTickOptions ) );

      var frictionLabel = new Text( frictionString, { font: new PhetFont( { size: fontSize, weight: 'bold' } ), maxWidth: maxTextWidth  } );

      return new VBox( { spacing: -2, children: [ frictionLabel, frictionSlider ] } );
    };

    var indent = 24;

    // Create controls for the 'motion' screen
    var createMotionControls = function() {
      var vBox = new VBox( {
          children: [
            createCheckBox( forceString, 'showForce', { icon: arrowIcon() } ),
            createCheckBox( valuesString, 'showValues' ),
            createCheckBox( massesString, 'showMasses' ),
            createCheckBox( speedString, 'showSpeed', {icon: speedometerIcon() } )
          ],
          align: 'left',
          spacing: 10
        } );
      return [ vBox ];
    };

    // Create controls for the 'friction' screen
    var createFrictionControls = function() {
      var vBox = new VBox( {
        children: [
          createCheckBox( forcesString, 'showForce', { icon: arrowIcon() } ),
          createCheckBox( sumOfForcesString, 'showSumOfForces', { indent: indent } ),
          createCheckBox( valuesString, 'showValues' ),
          createCheckBox( massesString, 'showMasses' ),
          createCheckBox( speedString, 'showSpeed', { icon: speedometerIcon() } )
        ],
        align: 'left',
        spacing: 10
      } );
      return [ vBox, new VStrut( 12 ), createFrictionSlider() ];
    };

    // Create controls for the 'acceleration' screen
    var createAccelerationControls = function() {
      var vBox = new VBox( {
        children: [
          createCheckBox( forcesString, 'showForce', { icon: arrowIcon() } ),
          createCheckBox( sumOfForcesString, 'showSumOfForces', { indent: indent } ),
          createCheckBox( valuesString, 'showValues' ),
          createCheckBox( massesString, 'showMasses' ),
          createCheckBox( speedString, 'showSpeed', { icon: speedometerIcon() } ),
          createCheckBox( accelerationString, 'showAcceleration', { icon: accelerometerIcon() } )
        ],
        align: 'left',
        spacing: 10
      } );
      return [ vBox, new VStrut( 12 ), createFrictionSlider() ];
    };


    var controlPanel = new VBox( {
      align: 'center',
      children: model.screen === 'motion' ? createMotionControls() :
                model.screen === 'friction' ? createFrictionControls() :
                createAccelerationControls()
    } );
    var panelNode = new Panel( controlPanel, { xMargin: 12, yMargin: 7, fill: '#e3e980' } );
    this.addChild( panelNode.mutate( { left: 981 - panelNode.width - 5, top: 5 } ) );
  }

  forcesAndMotionBasics.register( 'MotionControlPanel', MotionControlPanel );

  return inherit( Node, MotionControlPanel );

} );
