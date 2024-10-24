// Copyright 2013-2024, University of Colorado Boulder

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
import { Image } from '../../scenery/js/imports.js';
import Tandem from '../../tandem/js/Tandem.js';
import accelerationIcon_png from '../images/accelerationIcon_png.js';
import frictionIcon_png from '../images/frictionIcon_png.js';
import tugIcon_png from '../images/tugIcon_png.js';
import ForcesAndMotionBasicsImages from './ForcesAndMotionBasicsImages.js';
import ForcesAndMotionBasicsStrings from './ForcesAndMotionBasicsStrings.js';
import MotionScreen from './motion/MotionScreen.js';
import NetForceModel from './netforce/model/NetForceModel.js';
import ForcesAndMotionBasicsPreferencesNode from './netforce/view/ForcesAndMotionBasicsPreferencesNode.js';
import NetForceScreenView from './netforce/view/NetForceScreenView.js';

const forcesAndMotionBasicsTitleStringProperty = ForcesAndMotionBasicsStrings[ 'forces-and-motion-basics' ].titleStringProperty;

// constants
const tandem = Tandem.ROOT;

const simOptions = {
  credits: {
    leadDesign: 'Ariel Paul, Noah Podolefsky',
    graphicArts: 'Mariah Hermsmeyer, Amanda McGarry, Sharon Siman-Tov',
    softwareDevelopment: 'Jesse Greenberg, Sam Reid, Luisa Vargas',
    team: 'Amy Rouinfar, Trish Loeblein, Kathy Perkins',
    qualityAssurance: 'Steele Dalton, Bryce Griebenow, Ethan Johnson, Elise Morgan, Oliver Orejola, Ben Roberts, ' +
                      'Bryan Yoelin'
  },
  preferencesModel: new PreferencesModel( {
    simulationOptions: {
      customPreferences: [ {
        createContent: () => new ForcesAndMotionBasicsPreferencesNode()
      } ]
    }
  } )
};

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
  const netForceScreen = new Screen(
    () => new NetForceModel( netForceScreenTandem.createTandem( 'model' ) ),
    model => new NetForceScreenView( model, netForceScreenTandem.createTandem( 'view' ) ), {
      name: ForcesAndMotionBasicsStrings.netForceStringProperty,
      homeScreenIcon: new ScreenIcon( new Image( tugIcon_png ), screenIconOptions )
    }
  );

  const motionScreen = new MotionScreen( 'motion', motionScreenTandem, {
    name: ForcesAndMotionBasicsStrings.motionStringProperty,
    homeScreenIcon: new ScreenIcon( new Image( ForcesAndMotionBasicsImages.motionIconImageProperty ), screenIconOptions )
  } );

  const frictionScreen = new MotionScreen( 'friction', frictionScreenTandem, {
    name: ForcesAndMotionBasicsStrings.frictionStringProperty,
    homeScreenIcon: new ScreenIcon( new Image( frictionIcon_png ), screenIconOptions )
  } );

  const accelerationScreen = new MotionScreen( 'acceleration', accelerationScreenTandem, {
    name: ForcesAndMotionBasicsStrings.accelerationStringProperty,
    homeScreenIcon: new ScreenIcon( new Image( accelerationIcon_png ), screenIconOptions )
  } );

  // Create and start the sim
  const sim = new Sim( forcesAndMotionBasicsTitleStringProperty, [
      netForceScreen,
      motionScreen,
      frictionScreen,
      accelerationScreen
    ],
    simOptions );
  sim.start();
} );