// Copyright 2013-2024, University of Colorado Boulder

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
import Stopwatch from '../../../../scenery-phet/js/Stopwatch.js';
import StopwatchNode from '../../../../scenery-phet/js/StopwatchNode.js';
import { HBox, HStrut, Node, Text, VBox, VStrut } from '../../../../scenery/js/imports.js';
import HSlider from '../../../../sun/js/HSlider.js';
import Panel from '../../../../sun/js/Panel.js';
import VerticalCheckboxGroup from '../../../../sun/js/VerticalCheckboxGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ForcesAndMotionBasicsLayoutBounds from '../../common/view/ForcesAndMotionBasicsLayoutBounds.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from '../../ForcesAndMotionBasicsStrings.js';
import MotionConstants from '../MotionConstants.js';
import AccelerometerNode from './AccelerometerNode.js';

const accelerationStringProperty = ForcesAndMotionBasicsStrings.accelerationStringProperty;
const forcesStringProperty = ForcesAndMotionBasicsStrings.forcesStringProperty;
const forceStringProperty = ForcesAndMotionBasicsStrings.forceStringProperty;
const frictionStringProperty = ForcesAndMotionBasicsStrings.frictionStringProperty;
const lotsStringProperty = ForcesAndMotionBasicsStrings.lotsStringProperty;
const massesStringProperty = ForcesAndMotionBasicsStrings.massesStringProperty;
const noneStringProperty = ForcesAndMotionBasicsStrings.noneStringProperty;
const speedStringProperty = ForcesAndMotionBasicsStrings.speedStringProperty;
const stopwatchStringProperty = ForcesAndMotionBasicsStrings.stopwatchStringProperty;
const sumOfForcesStringProperty = ForcesAndMotionBasicsStrings.sumOfForcesStringProperty;
const valuesStringProperty = ForcesAndMotionBasicsStrings.valuesStringProperty;

class MotionControlPanel extends Node {
  /**
   * @param {MotionModel} model the model for the entire 'motion', 'friction' or 'acceleration' screen
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {
    super( { tandem: tandem } );

    const fontSize = 18;
    const maxTextWidth = 110;

    // empirically determined so 'motion' and 'friction' screen controls more closely match the 'acceleration' screen controls
    const minMotionAndFrictionControlsContentWidth = 185;

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
      const frictionRange = new Range( 0, MotionConstants.MAX_FRICTION );
      const frictionSliderTandem = tandem.createTandem( 'frictionSlider' );
      const frictionSlider = new HSlider( model.frictionProperty, frictionRange, {
        trackSize: new Dimension2( 150, 6 ),
        majorTickLength: 18,
        tickLabelSpacing: 3,
        tandem: frictionSliderTandem
      } );
      const sliderTickOptions = { font: new PhetFont( 15 ), maxWidth: 45 };
      const invisibleSliderTickOptions = merge( { visible: false }, sliderTickOptions );

      frictionSlider.addMinorTick( MotionConstants.MAX_FRICTION / 4 );
      frictionSlider.addMinorTick( MotionConstants.MAX_FRICTION / 4 * 2 );
      frictionSlider.addMinorTick( MotionConstants.MAX_FRICTION / 4 * 3 );

      frictionSlider.addMajorTick( 0, new Text( noneStringProperty, merge( { tandem: tandem.createTandem( 'zeroTickText' ) }, sliderTickOptions ) ) );
      frictionSlider.addMajorTick( 0, new Text( lotsStringProperty, merge( { tandem: tandem.createTandem( 'invisibleZeroTickText' ) }, invisibleSliderTickOptions ) ) );

      frictionSlider.addMajorTick( MotionConstants.MAX_FRICTION, new Text( lotsStringProperty, merge( { tandem: tandem.createTandem( 'maxTickText' ) }, sliderTickOptions ) ) );
      frictionSlider.addMajorTick( MotionConstants.MAX_FRICTION, new Text( noneStringProperty, merge( { tandem: tandem.createTandem( 'invisibleMaxTickText' ) }, invisibleSliderTickOptions ) ) );

      const frictionText = new Text( frictionStringProperty, {
        font: new PhetFont( { size: fontSize, weight: 'bold' } ),
        maxWidth: maxTextWidth,
        tandem: tandem.createTandem( 'frictionText' )
      } );

      // Keep frictionText always centered on the frictionSlider
      frictionStringProperty.link( () => { frictionText.centerX = frictionSlider.centerX; } );

      return new VBox( { children: [ frictionText, frictionSlider ], resize: false } );
    };

    const createStopwatchIcon = () => {

      const stopwatch = new Stopwatch( {
        isVisible: true,
        tandem: Tandem.OPT_OUT
      } );

      const stopwatchNode = new StopwatchNode( stopwatch, {
        numberDisplayOptions: {
          textOptions: {
            maxWidth: 80
          }
        },
        tandem: Tandem.OPT_OUT
      } );

      const icon = stopwatchNode.rasterized( {
        resolution: 5,
        imageOptions: {
          cursor: 'pointer'
        }
      } );
      icon.setScaleMagnitude( 0.3 );

      return icon;
    };

    // Create controls for the 'motion' screen
    const createMotionControls = () => {

      // container node for checkboxes
      const containerNode = new Node( {
        tandem: tandem.createTandem( 'containerNode' )
      } );

      const items = [
        {
          createNode: () => createLabel( forceStringProperty, 'showForceCheckbox', { icon: createArrowIcon( 'showForceArrowIcon' ) } ),
          property: model.showForceProperty,
          tandemName: 'showForceCheckbox'
        },
        {
          createNode: () => createLabel( valuesStringProperty, 'showValuesCheckbox' ),
          property: model.showValuesProperty,
          tandemName: 'showValuesCheckbox'
        },
        {
          createNode: () => createLabel( massesStringProperty, 'showMassesCheckbox' ),
          property: model.showMassesProperty,
          tandemName: 'showMassesCheckbox'
        },
        {
          createNode: () => createLabel( speedStringProperty, 'showSpeedCheckbox', { icon: speedometerIcon() } ),
          property: model.showSpeedProperty,
          tandemName: 'showSpeedCheckbox'
        },
        {
          createNode: () => createLabel( stopwatchStringProperty, 'stopwatchCheckbox', { icon: createStopwatchIcon() } ),
          property: model.showStopwatchProperty,
          tandemName: 'showStopwatchCheckbox'
        }
      ];

      // create the checkboxes
      const checkboxGroup = new VerticalCheckboxGroup( items, {
        tandem: tandem.createTandem( 'checkboxGroup' ),
        minContentWidth: minMotionAndFrictionControlsContentWidth
      } );
      containerNode.addChild( checkboxGroup );

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
          createNode: () => createLabel( forcesStringProperty, 'showForceCheckbox', { icon: createArrowIcon( 'showForceArrowIcon' ) } ),
          property: model.showForceProperty,
          tandemName: 'showForceCheckbox'
        },
        {
          createNode: () => createLabel( sumOfForcesStringProperty, 'showSumOfForcesCheckbox' ),
          property: model.showSumOfForcesProperty,
          tandemName: 'showSumOfForcesCheckbox'
        },
        {
          createNode: () => createLabel( valuesStringProperty, 'showValuesCheckbox' ),
          property: model.showValuesProperty,
          tandemName: 'showValuesCheckbox'
        },
        {
          createNode: () => createLabel( massesStringProperty, 'showMassesCheckbox' ),
          property: model.showMassesProperty,
          tandemName: 'showMassesCheckbox'
        },
        {
          createNode: () => createLabel( speedStringProperty, 'showSpeedCheckbox', { icon: speedometerIcon() } ),
          property: model.showSpeedProperty,
          tandemName: 'showSpeedCheckbox'
        },
        {
          createNode: () => createLabel( stopwatchStringProperty, 'stopwatchCheckbox', { icon: createStopwatchIcon() } ),
          property: model.showStopwatchProperty,
          tandemName: 'showStopwatchCheckbox'
        }
      ];

      // create the checkboxes
      const checkboxGroup = new VerticalCheckboxGroup( items, {
        tandem: tandem.createTandem( 'checkboxGroup' ),
        minContentWidth: minMotionAndFrictionControlsContentWidth
      } );
      containerNode.addChild( checkboxGroup );

      // create a spacer for the checkboxes and the slider
      const strut = new VStrut( 12, { centerTop: checkboxGroup.centerBottom } );
      containerNode.addChild( strut );

      // create the slider
      const frictionSlider = createFrictionSlider();
      frictionSlider.top = strut.bottom;

      layoutFrictionSlider( checkboxGroup, frictionSlider );

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
          createNode: () => createLabel( forcesStringProperty, 'showForceCheckbox', { icon: createArrowIcon( 'showForceArrowIcon' ) } ),
          property: model.showForceProperty,
          tandemName: 'showForceCheckbox'
        },
        {
          createNode: () => createLabel( sumOfForcesStringProperty, 'showSumOfForcesCheckbox' ),
          property: model.showSumOfForcesProperty,
          tandemName: 'showSumOfForcesCheckbox'
        },
        {
          createNode: () => createLabel( valuesStringProperty, 'showValuesCheckbox' ),
          property: model.showValuesProperty,
          tandemName: 'showValuesCheckbox'
        },
        {
          createNode: () => createLabel( massesStringProperty, 'showMassesCheckbox' ),
          property: model.showMassesProperty,
          tandemName: 'showMassesCheckbox'
        },
        {
          createNode: () => createLabel( speedStringProperty, 'showSpeedCheckbox', { icon: speedometerIcon() } ),
          property: model.showSpeedProperty,
          tandemName: 'showSpeedCheckbox'
        },
        {
          createNode: () => createLabel( accelerationStringProperty, 'showAccelerationCheckbox', { icon: accelerometerIcon() } ),
          property: model.showAccelerationProperty,
          tandemName: 'showAccelerationCheckbox'
        }
      ];

      const checkboxGroup = new VerticalCheckboxGroup( items, {
        tandem: tandem.createTandem( 'checkboxGroup' )
      } );
      containerNode.addChild( checkboxGroup );

      // create the spacing strut
      const strut = new VStrut( 12, { centerTop: checkboxGroup.centerBottom } );
      containerNode.addChild( strut );

      // add the slider friction slider under the checkboxes
      const frictionSlider = createFrictionSlider();
      frictionSlider.top = strut.bottom;

      layoutFrictionSlider( checkboxGroup, frictionSlider );

      containerNode.addChild( frictionSlider );

      return containerNode;
    };

    // collect contents for the panel
    const contents = model.screen === 'motion' ? createMotionControls() :
                     model.screen === 'friction' ? createFrictionControls() :
                     createAccelerationControls();

    const panel = new Panel( contents, {
      xMargin: 12,
      yMargin: 7,
      fill: '#e3e980',
      resize: false,
      tandem: tandem.createTandem( 'panel' )
    } );
    this.addChild( panel.mutate( { left: ForcesAndMotionBasicsLayoutBounds.width - panel.width - 5, top: 5 } ) );
  }
}

forcesAndMotionBasics.register( 'MotionControlPanel', MotionControlPanel );

export default MotionControlPanel;