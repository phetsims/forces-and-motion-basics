// Copyright 2015-2025, University of Colorado Boulder

/**
 * The MotionScreen shows the latter 3 screens in the sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
import forcesAndMotionBasics from '../forcesAndMotionBasics.js';
import MotionModel from './model/MotionModel.js';
import MotionKeyboardHelpContent from './view/MotionKeyboardHelpContent.js';
import MotionScreenView from './view/MotionScreenView.js';

type SelfOptions = EmptySelfOptions;
type MotionScreenOptions = ScreenOptions;
export default class MotionScreen extends Screen<MotionModel, MotionScreenView> {

  public constructor( style: 'motion' | 'friction' | 'acceleration', providedOptions?: MotionScreenOptions ) {

    const options = optionize<MotionScreenOptions, SelfOptions, ScreenOptions>()( {

      createKeyboardHelpNode: () => new MotionKeyboardHelpContent()
    }, providedOptions );
    const tandem = options.tandem;

    super(
      () => new MotionModel( style, tandem.createTandem( 'model' ) ),
      model => new MotionScreenView( model, tandem.createTandem( 'view' ) ),
      options );
  }
}

forcesAndMotionBasics.register( 'MotionScreen', MotionScreen );