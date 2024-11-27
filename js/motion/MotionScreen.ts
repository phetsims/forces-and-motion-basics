// Copyright 2015-2024, University of Colorado Boulder

/**
 * TODO https://github.com/phetsims/forces-and-motion-basics/issues/319
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Screen from '../../../joist/js/Screen.js';
import IntentionalAny from '../../../phet-core/js/types/IntentionalAny.js';
import Tandem from '../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../forcesAndMotionBasics.js';
import MotionModel from './model/MotionModel.js';
import MotionScreenView from './view/MotionScreenView.js';

export default class MotionScreen extends Screen<MotionModel, MotionScreenView> {

  public constructor( style: string, tandem: Tandem, options?: IntentionalAny ) {

    options = options || {};

    assert && assert( !options.tandem, 'tandem is a constructor param, not an option' );
    options.tandem = tandem;

    super(
      () => new MotionModel( style, tandem.createTandem( 'model' ) ),
      model => new MotionScreenView( model, tandem.createTandem( 'view' ) ),
      options );
  }
}

forcesAndMotionBasics.register( 'MotionScreen', MotionScreen );