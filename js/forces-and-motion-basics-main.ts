// Copyright 2013-2025, University of Colorado Boulder

/**
 * Entry point for PhET Interactive Simulation's Forces and Motion: Basics application.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import PreferencesModel from '../../joist/js/preferences/PreferencesModel.js';
import Screen from '../../joist/js/Screen.js';
import ScreenIcon from '../../joist/js/ScreenIcon.js';
import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Image from '../../scenery/js/nodes/Image.js';
import ToggleNode from '../../sun/js/ToggleNode.js';
import Tandem from '../../tandem/js/Tandem.js';
import accelerationIcon_png from '../images/accelerationIcon_png.js';
import frictionIcon_png from '../images/frictionIcon_png.js';
import tugIconBlueRed_png from '../images/tugIconBlueRed_png.js';
import tugIconPurpleOrange_png from '../images/tugIconPurpleOrange_png.js';
import ForcesAndMotionBasicsFluent from './ForcesAndMotionBasicsFluent.js';
import ForcesAndMotionBasicsImages from './ForcesAndMotionBasicsImages.js';
import MotionScreen from './motion/MotionScreen.js';
import ForcesAndMotionBasicsPreferences from './netforce/model/ForcesAndMotionBasicsPreferences.js';
import NetForceModel from './netforce/model/NetForceModel.js';
import ForcesAndMotionBasicsPreferencesNode from './netforce/view/ForcesAndMotionBasicsPreferencesNode.js';
import NetForceScreenView from './netforce/view/NetForceScreenView.js';
import NetForceKeyboardHelpContent from './netforce/view/NetForceKeyboardHelpContent.js';

const forcesAndMotionBasicsTitleStringProperty = ForcesAndMotionBasicsFluent[ 'forces-and-motion-basics' ].titleStringProperty;

// constants
const tandem = Tandem.ROOT;

simLauncher.launch( () => {

  const netForceScreenTandem = tandem.createTandem( 'netForceScreen' );
  const motionScreenTandem = tandem.createTandem( 'motionScreen' );
  const frictionScreenTandem = tandem.createTandem( 'frictionScreen' );
  const accelerationScreenTandem = tandem.createTandem( 'accelerationScreen' );

  const screenIconOptions = {
    maxIconWidthProportion: 1,
    maxIconHeightProportion: 1
  };

  // Provide the screen names as named fields, so they can be easily accessed dynamically, for API features
  // and lookups will still work properly even if the screens are reduced with ?screens=...

  const netForceScreenIconNode = new ToggleNode( ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty, [
    {
      value: 'blueRed',
      createNode: () => new Image( tugIconBlueRed_png )
    },
    {
      value: 'purpleOrange',
      createNode: () => new Image( tugIconPurpleOrange_png )
    }
  ] );
  const netForceScreen = new Screen(
    () => new NetForceModel( netForceScreenTandem.createTandem( 'model' ) ),
    model => new NetForceScreenView( model, netForceScreenTandem.createTandem( 'view' ) ), {
      name: ForcesAndMotionBasicsFluent.netForceStringProperty,
      homeScreenIcon: new ScreenIcon( netForceScreenIconNode, screenIconOptions ),
      createKeyboardHelpNode: () => new NetForceKeyboardHelpContent(),
      tandem: netForceScreenTandem
    }
  );

  const motionScreen = new MotionScreen( 'motion', {
    name: ForcesAndMotionBasicsFluent.motionStringProperty,
    homeScreenIcon: new ScreenIcon( new Image( ForcesAndMotionBasicsImages.motionIconImageProperty ), screenIconOptions ),
    tandem: motionScreenTandem
  } );

  const frictionScreen = new MotionScreen( 'friction', {
    name: ForcesAndMotionBasicsFluent.frictionStringProperty,
    homeScreenIcon: new ScreenIcon( new Image( frictionIcon_png ), screenIconOptions ),
    tandem: frictionScreenTandem
  } );

  const accelerationScreen = new MotionScreen( 'acceleration', {
    name: ForcesAndMotionBasicsFluent.accelerationStringProperty,
    homeScreenIcon: new ScreenIcon( new Image( accelerationIcon_png ), screenIconOptions ),
    tandem: accelerationScreenTandem
  } );

  // Create and start the sim
  const sim = new Sim( forcesAndMotionBasicsTitleStringProperty, [
    netForceScreen,
    motionScreen,
    frictionScreen,
    accelerationScreen
  ], {
    credits: {
      leadDesign: 'Ariel Paul, Noah Podolefsky',
      graphicArts: 'Mariah Hermsmeyer, Amanda McGarry, Sharon Siman-Tov',
      softwareDevelopment: 'Jesse Greenberg, Sam Reid, Marla Schulz, Luisa Vargas',
      team: 'Amy Rouinfar, Trish Loeblein, Kathy Perkins, Nancy Salpepi',
      qualityAssurance: 'Steele Dalton, Bryce Griebenow, Ethan Johnson, Matthew Moore, Elise Morgan, Ashton Morris, ' +
                        'Oliver Orejola, Valentina Pérez, Ben Roberts, ' +
                        'Kathryn Woessner, Bryan Yoelin'
    },
    preferencesModel: new PreferencesModel( {
      simulationOptions: {
        customPreferences: [ {
          createContent: tandem => new ForcesAndMotionBasicsPreferencesNode( tandem )
        } ]
      }
    } )
  } );
  sim.start();
} );