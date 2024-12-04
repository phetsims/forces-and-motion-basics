// Copyright 2015-2024, University of Colorado Boulder

/**
 * TODO https://github.com/phetsims/forces-and-motion-basics/issues/319
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import forcesAndMotionBasics from '../forcesAndMotionBasics.js';
import MotionModel from './model/MotionModel.js';
import MotionScreenView from './view/MotionScreenView.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
type MotionScreenOptions = ScreenOptions;
export default class MotionScreen extends Screen<MotionModel, MotionScreenView> {

  public constructor( style: string, providedOptions?: MotionScreenOptions ) {

    const options = optionize<MotionScreenOptions, SelfOptions, ScreenOptions>()( {}, providedOptions );
    const tandem = options.tandem;

    super(
      () => new MotionModel( style, tandem.createTandem( 'model' ) ),
      model => new MotionScreenView( model, tandem.createTandem( 'view' ) ),
      options );
  }
}

forcesAndMotionBasics.register( 'MotionScreen', MotionScreen );