// Copyright 2013-2022, University of Colorado Boulder

/**
 * Entry point for PhET Interactive Simulation's Forces and Motion: Basics application.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Screen from '../../joist/js/Screen.js';
import ScreenIcon from '../../joist/js/ScreenIcon.js';
import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import { Image } from '../../scenery/js/imports.js';
import Tandem from '../../tandem/js/Tandem.js';
import accelerationIcon_png from '../images/accelerationIcon_png.js';
import frictionIcon_png from '../images/frictionIcon_png.js';
import tugIcon_png from '../images/tugIcon_png.js';
import ForcesAndMotionBasicsStrings from './ForcesAndMotionBasicsStrings.js';
import MotionScreen from './motion/MotionScreen.js';
import PreferencesModelSingleton from './motion/PreferencesModelSingleton.js';
import MassPlayerImages from './motion/view/MassPlayerImages.js';
import MotionScreenIcon from './motion/view/MotionScreenIcon.js';
import NetForceModel from './netforce/model/NetForceModel.js';
import NetForceScreenView from './netforce/view/NetForceScreenView.js';

const forcesAndMotionBasicsTitleStringProperty = ForcesAndMotionBasicsStrings[ 'forces-and-motion-basics' ].titleStringProperty;

// constants
const tandem = Tandem.ROOT;

const simOptions = {
  preferencesModel: PreferencesModelSingleton,
  credits: {
    leadDesign: 'Ariel Paul, Noah Podolefsky',
    graphicArts: 'Mariah Hermsmeyer, Sharon Siman-Tov',
    softwareDevelopment: 'Jesse Greenberg, Sam Reid',
    team: 'Amy Rouinfar, Trish Loeblein, Kathy Perkins',
    qualityAssurance: 'Steele Dalton, Bryce Griebenow, Ethan Johnson, Elise Morgan, Oliver Orejola, Ben Roberts, ' +
                      'Bryan Yoelin'
  }
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

  //Provide the screen names as named fields so they can be easily accessed dynamically, for API features
  //And lookups will still work properly even if the screens are reduced with ?screens=...
  const netForceImageNode = new Image( tugIcon_png, { tandem: netForceScreenTandem.createTandem( 'icon' ) } );
  const netForceScreen = new Screen(
    () => new NetForceModel( netForceScreenTandem.createTandem( 'model' ) ),
    model => new NetForceScreenView( model, netForceScreenTandem.createTandem( 'view' ) ), {
      name: ForcesAndMotionBasicsStrings.netForceStringProperty,
      tandem: netForceScreenTandem,
      homeScreenIcon: new ScreenIcon( netForceImageNode, screenIconOptions )
    }
  );

  const motionScreen = new MotionScreen( 'motion', motionScreenTandem, {
    name: ForcesAndMotionBasicsStrings.motionStringProperty,
    homeScreenIcon: new MotionScreenIcon( MassPlayerImages.MASS_PLAYER_PORTRAYALS, screenIconOptions, motionScreenTandem )
  } );

  const frictionScreen = new MotionScreen( 'friction', frictionScreenTandem, {
    name: ForcesAndMotionBasicsStrings.frictionStringProperty,
    homeScreenIcon: new ScreenIcon( new Image( frictionIcon_png, {
      tandem: frictionScreenTandem.createTandem( 'icon' )
    } ), screenIconOptions )
  } );

  const accelerationScreen = new MotionScreen( 'acceleration', accelerationScreenTandem, {
    name: ForcesAndMotionBasicsStrings.accelerationStringProperty,
    homeScreenIcon: new ScreenIcon( new Image( accelerationIcon_png, {
      tandem: accelerationScreenTandem.createTandem( 'icon' )
    } ), screenIconOptions )
  } );

  //Create and start the sim
  const sim = new Sim( forcesAndMotionBasicsTitleStringProperty, [
      netForceScreen,
      motionScreen,
      frictionScreen,
      accelerationScreen
    ],
    simOptions );
  sim.start();
} );