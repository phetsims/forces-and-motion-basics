// Copyright 2013-2020, University of Colorado Boulder

/**
 * Scenery node that shows the control panel for the Motion, Friction and Acceleration screens.
 *
 * @author Sam Reid
 */

import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import GaugeNode from '../../../../scenery-phet/js/GaugeNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import HStrut from '../../../../scenery/js/nodes/HStrut.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import VStrut from '../../../../scenery/js/nodes/VStrut.js';
import HSlider from '../../../../sun/js/HSlider.js';
import Panel from '../../../../sun/js/Panel.js';
import VerticalCheckboxGroup from '../../../../sun/js/VerticalCheckboxGroup.js';
import SliderKnob from '../../common/view/SliderKnob.js';
import forcesAndMotionBasicsStrings from '../../forces-and-motion-basics-strings.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import MotionConstants from '../MotionConstants.js';
import AccelerometerNode from './AccelerometerNode.js';

const accelerationString = forcesAndMotionBasicsStrings.acceleration;
const forcesString = forcesAndMotionBasicsStrings.forces;
const forceString = forcesAndMotionBasicsStrings.force;
const frictionString = forcesAndMotionBasicsStrings.friction;
const lotsString = forcesAndMotionBasicsStrings.lots;
const massesString = forcesAndMotionBasicsStrings.masses;
const noneString = forcesAndMotionBasicsStrings.none;
const speedString = forcesAndMotionBasicsStrings.speed;
const sumOfForcesString = forcesAndMotionBasicsStrings.sumOfForces;
const valuesString = forcesAndMotionBasicsStrings.values;

/**
 * @param {MotionModel} model the model for the entire 'motion', 'friction' or 'acceleration' screen
 * @param {Tandem} tandem
 * @constructor
 */
function MotionControlPanel( model, tandem ) {
  Node.call( this, { tandem: tandem } );

  const fontSize = 18;
  const maxTextWidth = 120;

  /**
   * Create a label node with options icon
   * @param {string} text - the label string
   * @param {Object} [options]
   */
  const createLabel = function( text, tandemName, options ) {
    options = merge( {
      indent: 0,
      icon: new Node()
    }, options );

    // create the label for the checkbox
    const labelText = new Text( text, {
      font: new PhetFont( fontSize ),
      maxWidth: maxTextWidth,
      tandem: tandem.createTandem( tandemName ).createTandem( 'labelTextNode' ) // this is a bit of a hack to support backwards tandem api
    } );

    // optional icon needs spacing next to text
    let iconSpacer = new HStrut( 0 );
    if ( options.icon ) {
      // create a horizontal spacer for the icon
      iconSpacer = new HStrut( 10 );
    }

    return new HBox( { spacing: 0, children: [ labelText, iconSpacer, options.icon ] } );
  };

  //Icon for the forces in the control panel
  const createArrowIcon = function( phetioID ) {
    return new ArrowNode( 0, 0, 40, 0, {
      headHeight: 20,
      headWidth: 20,
      tailWidth: 10,
      fill: '#e66e23',
      stroke: 'black',
      tandem: tandem.createTandem( phetioID )
    } );
  };
  const speedometerIcon = function() {
    const speedometerIconValueProperty = new Property( 0 );
    return new GaugeNode( speedometerIconValueProperty, speedString, new Range( 0, MotionConstants.MAX_SPEED ),
      { radius: 67, scale: 0.2, tandem: tandem.createTandem( 'speedometerIcon' ) } );
  };
  const accelerometerIcon = function() {
    const accelerometerIconValueProperty = new Property( 5 ); // the acclerometer icon looks best with ~5 m/s^2 filled in
    return new AccelerometerNode( accelerometerIconValueProperty,
      tandem.createTandem( 'accelerometerIcon' ) ).mutate( { scale: 0.3 } );
  };

  const createFrictionSlider = function() {

    //Create the friction slider and its labels.
    // Add invisible symmetric ticks + labels so the slider will be perfectly centered.  A better way to do this would be just to line things up based on the track of the slider,
    // but this makes it work with VBox/HBox
    const frictionSlider = new HSlider( model.frictionProperty, new Range( 0, MotionConstants.MAX_FRICTION ), {
      trackSize: new Dimension2( 150, 6 ),
      thumbNode: new SliderKnob( tandem.createTandem( 'sliderKnob' ) ),
      majorTickLength: 18,
      tickLabelSpacing: 3,
      tandem: tandem.createTandem( 'frictionSlider' )
    } );
    const sliderTickOptions = { font: new PhetFont( 15 ), maxWidth: 125 };
    const invisibleSliderTickOptions = merge( { visible: false }, sliderTickOptions );

    frictionSlider.addMajorTick( 0, new Text( noneString, merge( { tandem: tandem.createTandem( 'zeroTickTextNode' ) }, sliderTickOptions ) ) );
    frictionSlider.addMajorTick( 0, new Text( lotsString, merge( { tandem: tandem.createTandem( 'invisibleZeroTickTextNode' ) }, invisibleSliderTickOptions ) ) );

    frictionSlider.addMajorTick( MotionConstants.MAX_FRICTION, new Text( lotsString, merge( { tandem: tandem.createTandem( 'maxTickTextNode' ) }, sliderTickOptions ) ) );
    frictionSlider.addMajorTick( MotionConstants.MAX_FRICTION, new Text( noneString, merge( { tandem: tandem.createTandem( 'invisibleMaxTickTextNode' ) }, invisibleSliderTickOptions ) ) );

    const frictionTextNode = new Text( frictionString, {
      font: new PhetFont( { size: fontSize, weight: 'bold' } ),
      maxWidth: maxTextWidth,
      tandem: tandem.createTandem( 'frictionTextNode' )
    } );

    return new VBox( { spacing: -2, children: [ frictionTextNode, frictionSlider ], resize: false } );
  };

  // Create controls for the 'motion' screen
  const createMotionControls = function() {

    // container node for checkboxes and an hstrut which makes the panel just a little wider to match the
    // other screens
    const containerNode = new Node( {
      tandem: tandem.createTandem( 'containerNode' )
    } );

    const items = [
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
    const checkboxes = new VerticalCheckboxGroup( items );
    containerNode.addChild( checkboxes );


    // create an hStrut to increase the width of the controls to the right
    const hStrut = new HStrut( 16, { leftCenter: checkboxes.rightCenter } );
    containerNode.addChild( hStrut );

    return containerNode;
  };

  // if the slider is wider than the group of checkboxes, align the checkboxes to the left of the slider
  // otherwise, center with the checkboxes
  const layoutFrictionSlider = function( checkboxes, frictionSlider ) {
    if ( frictionSlider.width > checkboxes.width ) {
      checkboxes.left = frictionSlider.left;
    }
    else {
      frictionSlider.centerX = checkboxes.centerX;
    }
  };

  // Create controls for the 'friction' screen, including a set of checkboxes and a slider
  // The slider is centered under the checkboxes, which are aligned to the left
  const createFrictionControls = function() {

    // container for all controls
    const containerNode = new Node( {
      tandem: tandem.createTandem( 'containerNode' )
    } );

    const items = [
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
    const checkboxes = new VerticalCheckboxGroup( items );
    containerNode.addChild( checkboxes );

    // create a spacer for the checkboxes and the slider
    const strut = new VStrut( 12, { centerTop: checkboxes.centerBottom } );
    containerNode.addChild( strut );

    // create the slider
    const frictionSlider = createFrictionSlider();
    frictionSlider.top = strut.bottom;

    layoutFrictionSlider( checkboxes, frictionSlider );

    containerNode.addChild( frictionSlider );

    return containerNode;
  };

  // Create controls for the 'acceleration' screen
  // The slider is centered under the checkboxes, which are aligned to the left
  const createAccelerationControls = function() {

    // node containing checkboxes, spacing, and slider
    const containerNode = new Node( {
      tandem: tandem.createTandem( 'containerNode' )
    } );

    const items = [
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

    const checkboxes = new VerticalCheckboxGroup( items );
    containerNode.addChild( checkboxes );

    // create the spacing strut
    const strut = new VStrut( 12, { centerTop: checkboxes.centerBottom } );
    containerNode.addChild( strut );

    // add the slider friction slider under the checkboxes
    const frictionSlider = createFrictionSlider();
    frictionSlider.top = strut.bottom;

    layoutFrictionSlider( checkboxes, frictionSlider );

    containerNode.addChild( frictionSlider );

    return containerNode;
  };

  // collect contents for the panel
  const contents = model.screen === 'motion' ? createMotionControls() :
                   model.screen === 'friction' ? createFrictionControls() :
                   createAccelerationControls();

  const panelNode = new Panel( contents, {
    xMargin: 12,
    yMargin: 7,
    fill: '#e3e980',
    resize: false,
    tandem: tandem.createTandem( 'panel' )
  } );
  this.addChild( panelNode.mutate( { left: 981 - panelNode.width - 5, top: 5 } ) );
}

forcesAndMotionBasics.register( 'MotionControlPanel', MotionControlPanel );

inherit( Node, MotionControlPanel );
export default MotionControlPanel;