// Copyright 2013-2022, University of Colorado Boulder

/**
 * Scenery node that shows the control panel for the Motion, Friction and Acceleration screens.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import merge from '../../../../phet-core/js/merge.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import GaugeNode from '../../../../scenery-phet/js/GaugeNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { HBox, HStrut, Node, Text, VBox, VStrut } from '../../../../scenery/js/imports.js';
import HSlider from '../../../../sun/js/HSlider.js';
import Panel from '../../../../sun/js/Panel.js';
import Slider from '../../../../sun/js/Slider.js';
import VerticalCheckboxGroup from '../../../../sun/js/VerticalCheckboxGroup.js';
import SliderKnob from '../../common/view/SliderKnob.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';
import MotionConstants from '../MotionConstants.js';
import AccelerometerNode from './AccelerometerNode.js';

const accelerationString = ForcesAndMotionBasicsStrings.acceleration;
const forcesString = ForcesAndMotionBasicsStrings.forces;
const forceString = ForcesAndMotionBasicsStrings.force;
const frictionString = ForcesAndMotionBasicsStrings.friction;
const lotsString = ForcesAndMotionBasicsStrings.lots;
const massesString = ForcesAndMotionBasicsStrings.masses;
const noneString = ForcesAndMotionBasicsStrings.none;
const speedStringProperty = ForcesAndMotionBasicsStrings.speedStringProperty;
const sumOfForcesString = ForcesAndMotionBasicsStrings.sumOfForces;
const valuesString = ForcesAndMotionBasicsStrings.values;

class MotionControlPanel extends Node {
  /**
   * @param {MotionModel} model the model for the entire 'motion', 'friction' or 'acceleration' screen
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {
    super( { tandem: tandem } );

    const fontSize = 18;
    const maxTextWidth = 120;

    /**
     * Create a label node with options icon
     * @param {string} text - the label string
     * @param {Object} [options]
     */
    const createLabel = ( text, tandemName, options ) => {
      options = merge( {
        indent: 0,
        icon: new Node()
      }, options );

      // create the label for the checkbox
      const labelText = new Text( text, {
        font: new PhetFont( fontSize ),
        maxWidth: maxTextWidth,

        // this is a bit of a hack to support backwards tandem API
        tandem: tandem.createTandem( tandemName ).createTandem( 'labelText' )
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
    const createArrowIcon = phetioID => new ArrowNode( 0, 0, 40, 0, {
      headHeight: 20,
      headWidth: 20,
      tailWidth: 10,
      fill: '#e66e23',
      stroke: 'black',
      tandem: tandem.createTandem( phetioID )
    } );
    const speedometerIcon = () => {
      const speedometerIconValueProperty = new Property( 0 );
      return new GaugeNode( speedometerIconValueProperty, speedStringProperty, new Range( 0, MotionConstants.MAX_SPEED ),
        { radius: 67, scale: 0.2, tandem: tandem.createTandem( 'speedometerIconNode' ) } );
    };
    const accelerometerIcon = () => {
      const accelerometerIconValueProperty = new Property( 5 ); // the acclerometer icon looks best with ~5 m/s^2 filled in
      return new AccelerometerNode( accelerometerIconValueProperty,
        tandem.createTandem( 'accelerometerIcon' ) ).mutate( { scale: 0.3 } );
    };

    const createFrictionSlider = () => {

      //Create the friction slider and its labels.
      // Add invisible symmetric ticks + labels so the slider will be perfectly centered.  A better way to do this would be just to line things up based on the track of the slider,
      // but this makes it work with VBox/HBox
      const frictionSliderTandem = tandem.createTandem( 'frictionSlider' );
      const frictionSlider = new HSlider( model.frictionProperty, new Range( 0, MotionConstants.MAX_FRICTION ), {
        trackSize: new Dimension2( 150, 6 ),
        thumbNode: new SliderKnob( frictionSliderTandem.createTandem( Slider.THUMB_NODE_TANDEM_NAME ) ),
        majorTickLength: 18,
        tickLabelSpacing: 3,
        tandem: frictionSliderTandem
      } );
      const sliderTickOptions = { font: new PhetFont( 15 ), maxWidth: 125 };
      const invisibleSliderTickOptions = merge( { visible: false }, sliderTickOptions );

      frictionSlider.addMajorTick( 0, new Text( noneString, merge( { tandem: tandem.createTandem( 'zeroTickText' ) }, sliderTickOptions ) ) );
      frictionSlider.addMajorTick( 0, new Text( lotsString, merge( { tandem: tandem.createTandem( 'invisibleZeroTickText' ) }, invisibleSliderTickOptions ) ) );

      frictionSlider.addMajorTick( MotionConstants.MAX_FRICTION, new Text( lotsString, merge( { tandem: tandem.createTandem( 'maxTickText' ) }, sliderTickOptions ) ) );
      frictionSlider.addMajorTick( MotionConstants.MAX_FRICTION, new Text( noneString, merge( { tandem: tandem.createTandem( 'invisibleMaxTickText' ) }, invisibleSliderTickOptions ) ) );

      const frictionText = new Text( frictionString, {
        font: new PhetFont( { size: fontSize, weight: 'bold' } ),
        maxWidth: maxTextWidth,
        tandem: tandem.createTandem( 'frictionText' )
      } );

      return new VBox( { children: [ frictionText, frictionSlider ], resize: false } );
    };

    // Create controls for the 'motion' screen
    const createMotionControls = () => {

      // container node for checkboxes and an hstrut which makes the panel just a little wider to match the
      // other screens
      const containerNode = new Node( {
        tandem: tandem.createTandem( 'containerNode' )
      } );

      const items = [
        {
          createNode: tandem => createLabel( forceString, 'showForceCheckbox', { icon: createArrowIcon( 'showForceArrowIcon' ) } ),
          property: model.showForceProperty,
          tandemName: 'showForceCheckbox'
        },
        {
          createNode: tandem => createLabel( valuesString, 'showValuesCheckbox' ),
          property: model.showValuesProperty,
          tandemName: 'showValuesCheckbox'
        },
        {
          createNode: tandem => createLabel( massesString, 'showMassesCheckbox' ),
          property: model.showMassesProperty,
          tandemName: 'showMassesCheckbox'
        },
        {
          createNode: tandem => createLabel( speedStringProperty, 'showSpeedCheckbox', { icon: speedometerIcon() } ),
          property: model.showSpeedProperty,
          tandemName: 'showSpeedCheckbox'
        }
      ];

      // create the checkboxes
      const checkboxes = new VerticalCheckboxGroup( items, {
        tandem: tandem.createTandem( 'checkboxGroup' )
      } );
      containerNode.addChild( checkboxes );


      // create an hStrut to increase the width of the controls to the right
      const hStrut = new HStrut( 16, { leftCenter: checkboxes.rightCenter } );
      containerNode.addChild( hStrut );

      return containerNode;
    };

    // if the slider is wider than the group of checkboxes, align the checkboxes to the left of the slider
    // otherwise, center with the checkboxes
    const layoutFrictionSlider = ( checkboxes, frictionSlider ) => {
      if ( frictionSlider.width > checkboxes.width ) {
        checkboxes.left = frictionSlider.left;
      }
      else {
        frictionSlider.centerX = checkboxes.centerX;
      }
    };

    // Create controls for the 'friction' screen, including a set of checkboxes and a slider
    // The slider is centered under the checkboxes, which are aligned to the left
    const createFrictionControls = () => {

      // container for all controls
      const containerNode = new Node( {
        tandem: tandem.createTandem( 'containerNode' )
      } );

      const items = [
        {
          createNode: tandem => createLabel( forcesString, 'showForceCheckbox', { icon: createArrowIcon( 'showForceArrowIcon' ) } ),
          property: model.showForceProperty,
          tandemName: 'showForceCheckbox'
        },
        {
          createNode: tandem => createLabel( sumOfForcesString, 'showSumOfForcesCheckbox' ),
          property: model.showSumOfForcesProperty,
          tandemName: 'showSumOfForcesCheckbox'
        },
        {
          createNode: tandem => createLabel( valuesString, 'showValuesCheckbox' ),
          property: model.showValuesProperty,
          tandemName: 'showValuesCheckbox'
        },
        {
          createNode: tandem => createLabel( massesString, 'showMassesCheckbox' ),
          property: model.showMassesProperty,
          tandemName: 'showMassesCheckbox'
        },
        {
          createNode: tandem => createLabel( speedStringProperty, 'showSpeedCheckbox', { icon: speedometerIcon() } ),
          property: model.showSpeedProperty,
          tandemName: 'showSpeedCheckbox'
        }
      ];

      // create the checkboxes
      const checkboxes = new VerticalCheckboxGroup( items, {
        tandem: tandem.createTandem( 'checkboxGroup' )
      } );
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
    const createAccelerationControls = () => {

      // node containing checkboxes, spacing, and slider
      const containerNode = new Node( {
        tandem: tandem.createTandem( 'containerNode' )
      } );

      const items = [
        {
          createNode: tandem => createLabel( forcesString, 'showForceCheckbox', { icon: createArrowIcon( 'showForceArrowIcon' ) } ),
          property: model.showForceProperty,
          tandemName: 'showForceCheckbox'
        },
        {
          createNode: tandem => createLabel( sumOfForcesString, 'showSumOfForcesCheckbox' ),
          property: model.showSumOfForcesProperty,
          tandemName: 'showSumOfForcesCheckbox'
        },
        {
          createNode: tandem => createLabel( valuesString, 'showValuesCheckbox' ),
          property: model.showValuesProperty,
          tandemName: 'showValuesCheckbox'
        },
        {
          createNode: tandem => createLabel( massesString, 'showMassesCheckbox' ),
          property: model.showMassesProperty,
          tandemName: 'showMassesCheckbox'
        },
        {
          createNode: tandem => createLabel( speedStringProperty, 'showSpeedCheckbox', { icon: speedometerIcon() } ),
          property: model.showSpeedProperty,
          tandemName: 'showSpeedCheckbox'
        },
        {
          createNode: tandem => createLabel( accelerationString, 'showAccelerationCheckbox', { icon: accelerometerIcon() } ),
          property: model.showAccelerationProperty,
          tandemName: 'showAccelerationCheckbox'
        }
      ];

      const checkboxes = new VerticalCheckboxGroup( items, {
        tandem: tandem.createTandem( 'checkboxGroup' )
      } );
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
}

forcesAndMotionBasics.register( 'MotionControlPanel', MotionControlPanel );

export default MotionControlPanel;