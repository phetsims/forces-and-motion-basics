// Copyright 2013-2015, University of Colorado Boulder

/**
 * Scenery node that shows the control panel for the Motion, Friction and Acceleration screens.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var TandemNode = require( 'TANDEM/scenery/nodes/TandemNode' );
  var TandemText = require( 'TANDEM/scenery/nodes/TandemText' );
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

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );

  /**
   * Main constructor for MotionControlPanel
   *
   * @param {MotionModel} model the model for the entire 'motion', 'friction' or 'acceleration' screen
   * @param {Tandem} tandem
   * @constructor
   */
  function MotionControlPanel( model, tandem ) {
    TandemNode.call( this, {
      tandem: tandem
    } );

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
    var createCheckBox = function( text, propertyName, tandemName, options ) {

      var checkBoxTandem = tandem.createTandem( tandemName );
      options = _.extend( {
        indent: 0,
        checkBoxEnabledProperty: new Property( true, {
          tandem: checkBoxTandem.createTandem( 'enabledProperty' ),
          phetioValueType: TBoolean
        } ),
        icon: null
      }, options );

      // container for the checkbox and optional indentation and icon
      var checkBoxContainer = new HBox( { spacing: 0 } );

      // create the horizontal spacer for the indentation and add it to the container
      var hSeparator = new HStrut( options.indent );
      checkBoxContainer.insertChild( 0, hSeparator );

      // create the label for the checkbox
      var labelText = new TandemText( text, {
        font: new PhetFont( fontSize ),
        maxWidth: maxTextWidth,
        tandem: checkBoxTandem.createTandem( 'labelTextNode' )
      } );

      // create the check box and insert it into the container
      var checkBox = new CheckBox( labelText, model.property( propertyName ), {
        tandem: checkBoxTandem
      } );
      checkBoxContainer.insertChild( 1, checkBox );

      // add optional icon next to checkbox
      if ( options.icon ) {
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
      var speedometerIconValueProperty = new Property( 0 );
      return new GaugeNode( speedometerIconValueProperty, speedString, {
        min: 0,
        max: MotionConstants.MAX_SPEED
      }, { scale: 0.2 } );
    };
    var accelerometerIcon = function() {
      var accelerometerIconValueProperty = new Property( 5 ); // the acclerometer icon looks best with ~5 m/s^2 filled in
      return new AccelerometerNode( accelerometerIconValueProperty,
        tandem.createTandem( 'accelerometerIcon' ) ).mutate( { scale: 0.3 } );
    };

    var createFrictionSlider = function() {

      //Create the friction slider and its labels.
      // Add invisible symmetric ticks + labels so the slider will be perfectly centered.  A better way to do this would be just to line things up based on the track of the slider,
      // but this makes it work with VBox/HBox
      var frictionSlider = new HSlider( model.frictionProperty, { min: 0, max: MotionConstants.MAX_FRICTION }, {
        trackSize: new Dimension2( 150, 6 ),
        thumbNode: new SliderKnob( tandem.createTandem( 'sliderKnob' ) ),
        majorTickLength: 18,
        tickLabelSpacing: 3,
        tandem: tandem.createTandem( 'frictionSlider' )
      } );
      var sliderTickOptions = { font: new PhetFont( 15 ), maxWidth: maxTextWidth * 0.5 };
      var invisibleSliderTickOptions = _.extend( { visible: false }, sliderTickOptions );

      frictionSlider.addMajorTick( 0, new TandemText( noneString, _.extend( { tandem: tandem.createTandem( 'zeroTickTextNode' ) }, sliderTickOptions ) ) );
      frictionSlider.addMajorTick( 0, new TandemText( lotsString, _.extend( { tandem: tandem.createTandem( 'invisibleZeroTickTextNode' ) }, invisibleSliderTickOptions ) ) );

      frictionSlider.addMajorTick( MotionConstants.MAX_FRICTION, new TandemText( lotsString, _.extend( { tandem: tandem.createTandem( 'maxTickTextNode' ) }, sliderTickOptions ) ) );
      frictionSlider.addMajorTick( MotionConstants.MAX_FRICTION, new TandemText( noneString, _.extend( { tandem: tandem.createTandem( 'invisibleMaxTickTextNode' ) }, invisibleSliderTickOptions ) ) );

      var frictionTextNode = new TandemText( frictionString, {
        font: new PhetFont( { size: fontSize, weight: 'bold' } ),
        maxWidth: maxTextWidth,
        tandem: tandem.createTandem( 'frictionTextNode' )
      } );

      return new VBox( { spacing: -2, children: [ frictionTextNode, frictionSlider ], resize: false } );
    };

    // Create controls for the 'motion' screen
    var createMotionControls = function() {

      // container node for check boxes and an hstrut which makes the panel just a little wider to match the
      // other screens
      var containerNode = new TandemNode( {
        tandem: tandem.createTandem( 'containerNode' )
      } );

      // create the checkboxes
      var checkBoxes = new VBox( {
        children: [
          createCheckBox( forceString, 'showForce', 'showForceCheckBox', { icon: arrowIcon() } ),
          createCheckBox( valuesString, 'showValues', 'showValuesCheckBox' ),
          createCheckBox( massesString, 'showMasses', 'showMassesCheckBox' ),
          createCheckBox( speedString, 'showSpeed', 'showSpeedCheckBox', { icon: speedometerIcon() } )
        ],
        align: 'left',
        spacing: 10
      } );
      containerNode.addChild( checkBoxes );


      // create an hStrut to increase the width of the controls to the right
      var hStrut = new HStrut( 16, { leftCenter: checkBoxes.rightCenter } );
      containerNode.addChild( hStrut );

      return containerNode;
    };

    // if the the slider is wider than the group of checkboxes, align the check boxes to the left of the slider
    // otherwise, center with the checkboxes
    var layoutFrictionSlider = function( checkBoxes, frictionSlider ) {
      if ( frictionSlider.width > checkBoxes.width ) {
        checkBoxes.left = frictionSlider.left;
      }
      else {
        frictionSlider.centerX = checkBoxes.centerX;
      }
    };

    // Create controls for the 'friction' screen, including a set of check boxes and a slider
    // The slider is centered under the check boxes, which are aligned to the left
    var createFrictionControls = function() {

      // container for all controls
      var containerNode = new TandemNode( {
        tandem: tandem.createTandem( 'containerNode' )
      } );

      // create the checkboxes
      var checkBoxes = new VBox( {
        children: [
          createCheckBox( forcesString, 'showForce', 'showForceCheckBox', { icon: arrowIcon() } ),
          createCheckBox( sumOfForcesString, 'showSumOfForces', 'showSumOfForcesCheckBox' ),
          createCheckBox( valuesString, 'showValues', 'showValuesCheckBox' ),
          createCheckBox( massesString, 'showMasses', 'showMassesCheckBox' ),
          createCheckBox( speedString, 'showSpeed', 'showSpeedCheckBox', { icon: speedometerIcon() } )
        ],
        align: 'left',
        spacing: 10
      } );
      containerNode.addChild( checkBoxes );

      // create a spacer for the check boxes and the slider
      var strut = new VStrut( 12, { centerTop: checkBoxes.centerBottom } );
      containerNode.addChild( strut );

      // create the slider
      var frictionSlider = createFrictionSlider();
      frictionSlider.top = strut.bottom;

      layoutFrictionSlider( checkBoxes, frictionSlider );

      containerNode.addChild( frictionSlider );

      return containerNode;
    };

    // Create controls for the 'acceleration' screen
    // The slider is centered under the check boxes, which are aligned to the left
    var createAccelerationControls = function() {

      // node containing checkboxes, spacing, and slider
      var containerNode = new TandemNode( {
        tandem: tandem.createTandem( 'containerNode' )
      } );

      var checkBoxes = new VBox( {
        children: [
          createCheckBox( forcesString, 'showForce', 'showForceCheckBox', { icon: arrowIcon() } ),
          createCheckBox( sumOfForcesString, 'showSumOfForces', 'showSumOfForcesCheckBox' ),
          createCheckBox( valuesString, 'showValues', 'showValuesCheckBox' ),
          createCheckBox( massesString, 'showMasses', 'showMassesCheckBox' ),
          createCheckBox( speedString, 'showSpeed', 'showSpeedCheckBox', { icon: speedometerIcon() } ),
          createCheckBox( accelerationString, 'showAcceleration', 'showAccelerationCheckBox', { icon: accelerometerIcon() } )
        ],
        align: 'left',
        spacing: 10
      } );
      containerNode.addChild( checkBoxes );

      // create the spacing strut
      var strut = new VStrut( 12, { centerTop: checkBoxes.centerBottom } );
      containerNode.addChild( strut );

      // add the slider friction slider under the checkboxes
      var frictionSlider = createFrictionSlider();
      frictionSlider.top = strut.bottom;

      layoutFrictionSlider( checkBoxes, frictionSlider );

      containerNode.addChild( frictionSlider );

      return containerNode;
    };

    // collect contents for the panel
    var contents = model.screen === 'motion' ? createMotionControls() :
                   model.screen === 'friction' ? createFrictionControls() :
                   createAccelerationControls();

    var panelNode = new Panel( contents, { xMargin: 12, yMargin: 7, fill: '#e3e980', resize: false } );
    this.addChild( panelNode.mutate( { left: 981 - panelNode.width - 5, top: 5 } ) );
  }

  forcesAndMotionBasics.register( 'MotionControlPanel', MotionControlPanel );

  return inherit( TandemNode, MotionControlPanel );

} );
