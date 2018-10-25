// Copyright 2013-2017, University of Colorado Boulder

/**
 * Scenery node that shows the control panel for the Motion, Friction and Acceleration screens.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var accelerationString = require( 'string!FORCES_AND_MOTION_BASICS/acceleration' );
  var AccelerometerNode = require( 'FORCES_AND_MOTION_BASICS/motion/view/AccelerometerNode' );
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var forcesString = require( 'string!FORCES_AND_MOTION_BASICS/forces' );
  var forceString = require( 'string!FORCES_AND_MOTION_BASICS/force' );
  var frictionString = require( 'string!FORCES_AND_MOTION_BASICS/friction' );
  var GaugeNode = require( 'SCENERY_PHET/GaugeNode' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HSlider = require( 'SUN/HSlider' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var lotsString = require( 'string!FORCES_AND_MOTION_BASICS/lots' );
  var massesString = require( 'string!FORCES_AND_MOTION_BASICS/masses' );
  var MotionConstants = require( 'FORCES_AND_MOTION_BASICS/motion/MotionConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var noneString = require( 'string!FORCES_AND_MOTION_BASICS/none' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var SliderKnob = require( 'FORCES_AND_MOTION_BASICS/common/view/SliderKnob' );
  var speedString = require( 'string!FORCES_AND_MOTION_BASICS/speed' );
  var sumOfForcesString = require( 'string!FORCES_AND_MOTION_BASICS/sumOfForces' );
  var Text = require( 'SCENERY/nodes/Text' );
  var valuesString = require( 'string!FORCES_AND_MOTION_BASICS/values' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var VerticalCheckboxGroup = require( 'SUN/VerticalCheckboxGroup' );
  var VStrut = require( 'SCENERY/nodes/VStrut' );

  /**
   * Main constructor for MotionControlPanel
   *
   * @param {MotionModel} model the model for the entire 'motion', 'friction' or 'acceleration' screen
   * @param {Tandem} tandem
   * @constructor
   */
  function MotionControlPanel( model, tandem ) {
    Node.call( this, { tandem: tandem } );

    var fontSize = 18;
    var maxTextWidth = 120;

    /**
     * Create a label node with options icon
     * @param {string} text - the label string
     * @param {Object} [options]
     */
    var createLabel = function( text, tandemName, options ) {
      options = _.extend( {
        indent: 0,
        icon: new Node()
      }, options );

      // create the label for the checkbox
      var labelText = new Text( text, {
        font: new PhetFont( fontSize ),
        maxWidth: maxTextWidth,
        tandem: tandem.createTandem( tandemName ).createTandem( 'labelTextNode' ) // this is a bit of a hack to support backwards tandem api
      } );

      // optional icon needs spacing next to text
      var iconSpacer = new HStrut( 0 );
      if ( options.icon ) {
        // create a horizontal spacer for the icon
        iconSpacer = new HStrut( 10 );
      }

      return new HBox( { spacing: 0, children: [ labelText, iconSpacer, options.icon ] } );
    };

    //Icon for the forces in the control panel
    var createArrowIcon = function( phetioID ) {
      return new ArrowNode( 0, 0, 40, 0, {
        headHeight: 20,
        headWidth: 20,
        tailWidth: 10,
        fill: '#e66e23',
        stroke: 'black',
        tandem: tandem.createTandem( phetioID )
      } );
    };
    var speedometerIcon = function() {
      var speedometerIconValueProperty = new Property( 0 );
      return new GaugeNode( speedometerIconValueProperty, speedString, new Range( 0, MotionConstants.MAX_SPEED ),
        { scale: 0.2, tandem: tandem.createTandem( 'speedometerIcon' ) } );
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
      var frictionSlider = new HSlider( model.frictionProperty, new Range( 0, MotionConstants.MAX_FRICTION ), {
        trackSize: new Dimension2( 150, 6 ),
        thumbNode: new SliderKnob( tandem.createTandem( 'sliderKnob' ) ),
        majorTickLength: 18,
        tickLabelSpacing: 3,
        tandem: tandem.createTandem( 'frictionSlider' )
      } );
      var sliderTickOptions = { font: new PhetFont( 15 ), maxWidth: 125 };
      var invisibleSliderTickOptions = _.extend( { visible: false }, sliderTickOptions );

      frictionSlider.addMajorTick( 0, new Text( noneString, _.extend( { tandem: tandem.createTandem( 'zeroTickTextNode' ) }, sliderTickOptions ) ) );
      frictionSlider.addMajorTick( 0, new Text( lotsString, _.extend( { tandem: tandem.createTandem( 'invisibleZeroTickTextNode' ) }, invisibleSliderTickOptions ) ) );

      frictionSlider.addMajorTick( MotionConstants.MAX_FRICTION, new Text( lotsString, _.extend( { tandem: tandem.createTandem( 'maxTickTextNode' ) }, sliderTickOptions ) ) );
      frictionSlider.addMajorTick( MotionConstants.MAX_FRICTION, new Text( noneString, _.extend( { tandem: tandem.createTandem( 'invisibleMaxTickTextNode' ) }, invisibleSliderTickOptions ) ) );

      var frictionTextNode = new Text( frictionString, {
        font: new PhetFont( { size: fontSize, weight: 'bold' } ),
        maxWidth: maxTextWidth,
        tandem: tandem.createTandem( 'frictionTextNode' )
      } );

      return new VBox( { spacing: -2, children: [ frictionTextNode, frictionSlider ], resize: false } );
    };

    // Create controls for the 'motion' screen
    var createMotionControls = function() {

      // container node for checkboxes and an hstrut which makes the panel just a little wider to match the
      // other screens
      var containerNode = new Node( {
        tandem: tandem.createTandem( 'containerNode' )
      } );

      var items = [
        {
          node: createLabel( forceString, 'showForceCheckbox', { icon: createArrowIcon( 'showForceArrowIcon' ) } ),
          property: model.showForceProperty,
          tandem: tandem.createTandem( 'showForceCheckbox' )
        },
        {
          node: createLabel( valuesString, 'showValuesCheckbox' ),
          property: model.showValuesProperty,
          tandem: tandem.createTandem( 'showValuesCheckbox' )
        },
        {
          node: createLabel( massesString, 'showMassesCheckbox' ),
          property: model.showMassesProperty,
          tandem: tandem.createTandem( 'showMassesCheckbox' )
        },
        {
          node: createLabel( speedString, 'showSpeedCheckbox', { icon: speedometerIcon() } ),
          property: model.showSpeedProperty,
          tandem: tandem.createTandem( 'showSpeedCheckbox' )
        }
      ];

      // create the checkboxes
      var checkboxes = new VerticalCheckboxGroup( items );
      containerNode.addChild( checkboxes );


      // create an hStrut to increase the width of the controls to the right
      var hStrut = new HStrut( 16, { leftCenter: checkboxes.rightCenter } );
      containerNode.addChild( hStrut );

      return containerNode;
    };

    // if the slider is wider than the group of checkboxes, align the checkboxes to the left of the slider
    // otherwise, center with the checkboxes
    var layoutFrictionSlider = function( checkboxes, frictionSlider ) {
      if ( frictionSlider.width > checkboxes.width ) {
        checkboxes.left = frictionSlider.left;
      }
      else {
        frictionSlider.centerX = checkboxes.centerX;
      }
    };

    // Create controls for the 'friction' screen, including a set of checkboxes and a slider
    // The slider is centered under the checkboxes, which are aligned to the left
    var createFrictionControls = function() {

      // container for all controls
      var containerNode = new Node( {
        tandem: tandem.createTandem( 'containerNode' )
      } );

      var items = [
        {
          node: createLabel( forcesString, 'showForceCheckbox', { icon: createArrowIcon( 'showForceArrowIcon' ) } ),
          property: model.showForceProperty,
          tandem: tandem.createTandem( 'showForceCheckbox' )
        },
        {
          node: createLabel( sumOfForcesString, 'showSumOfForcesCheckbox' ),
          property: model.showSumOfForcesProperty,
          tandem: tandem.createTandem( 'showSumOfForcesCheckbox' )
        },
        {
          node: createLabel( valuesString, 'showValuesCheckbox' ),
          property: model.showValuesProperty,
          tandem: tandem.createTandem( 'showValuesCheckbox' )
        },
        {
          node: createLabel( massesString, 'showMassesCheckbox' ),
          property: model.showMassesProperty,
          tandem: tandem.createTandem( 'showMassesCheckbox' )
        },
        {
          node: createLabel( speedString, 'showSpeedCheckbox', { icon: speedometerIcon() } ),
          property: model.showSpeedProperty,
          tandem: tandem.createTandem( 'showSpeedCheckbox' )
        }
      ];

      // create the checkboxes
      var checkboxes = new VerticalCheckboxGroup( items );
      containerNode.addChild( checkboxes );

      // create a spacer for the checkboxes and the slider
      var strut = new VStrut( 12, { centerTop: checkboxes.centerBottom } );
      containerNode.addChild( strut );

      // create the slider
      var frictionSlider = createFrictionSlider();
      frictionSlider.top = strut.bottom;

      layoutFrictionSlider( checkboxes, frictionSlider );

      containerNode.addChild( frictionSlider );

      return containerNode;
    };

    // Create controls for the 'acceleration' screen
    // The slider is centered under the checkboxes, which are aligned to the left
    var createAccelerationControls = function() {

      // node containing checkboxes, spacing, and slider
      var containerNode = new Node( {
        tandem: tandem.createTandem( 'containerNode' )
      } );

      var items = [
        {
          node: createLabel( forcesString, 'showForceCheckbox', { icon: createArrowIcon( 'showForceArrowIcon' ) } ),
          property: model.showForceProperty,
          tandem: tandem.createTandem( 'showForceCheckbox' )
        },
        {
          node: createLabel( sumOfForcesString, 'showSumOfForcesCheckbox' ),
          property: model.showSumOfForcesProperty,
          tandem: tandem.createTandem( 'showSumOfForcesCheckbox' )
        },
        {
          node: createLabel( valuesString, 'showValuesCheckbox' ),
          property: model.showValuesProperty,
          tandem: tandem.createTandem( 'showValuesCheckbox' )
        },
        {
          node: createLabel( massesString, 'showMassesCheckbox' ),
          property: model.showMassesProperty,
          tandem: tandem.createTandem( 'showMassesCheckbox' )
        },
        {
          node: createLabel( speedString, 'showSpeedCheckbox', { icon: speedometerIcon() } ),
          property: model.showSpeedProperty,
          tandem: tandem.createTandem( 'showSpeedCheckbox' )
        },
        {
          node: createLabel( accelerationString, 'showAccelerationCheckbox', { icon: accelerometerIcon() } ),
          property: model.showAccelerationProperty,
          tandem: tandem.createTandem( 'showAccelerationCheckbox' )
        }
      ];

      var checkboxes = new VerticalCheckboxGroup( items );
      containerNode.addChild( checkboxes );

      // create the spacing strut
      var strut = new VStrut( 12, { centerTop: checkboxes.centerBottom } );
      containerNode.addChild( strut );

      // add the slider friction slider under the checkboxes
      var frictionSlider = createFrictionSlider();
      frictionSlider.top = strut.bottom;

      layoutFrictionSlider( checkboxes, frictionSlider );

      containerNode.addChild( frictionSlider );

      return containerNode;
    };

    // collect contents for the panel
    var contents = model.screen === 'motion' ? createMotionControls() :
                   model.screen === 'friction' ? createFrictionControls() :
                   createAccelerationControls();

    var panelNode = new Panel( contents, {
      xMargin: 12,
      yMargin: 7,
      fill: '#e3e980',
      resize: false,
      tandem: tandem.createTandem( 'panel' )
    } );
    this.addChild( panelNode.mutate( { left: 981 - panelNode.width - 5, top: 5 } ) );
  }

  forcesAndMotionBasics.register( 'MotionControlPanel', MotionControlPanel );

  return inherit( Node, MotionControlPanel );

} );
