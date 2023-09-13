// Copyright 2015-2020, University of Colorado Boulder

/**
 * TODO https://github.com/phetsims/tasks/issues/1129
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Screen from '../../../joist/js/Screen.js';
import forcesAndMotionBasics from '../forcesAndMotionBasics.js';
import MotionModel from './model/MotionModel.js';
import MotionScreenView from './view/MotionScreenView.js';

class MotionScreen extends Screen {

  /**
   * @param style
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( style, tandem, options ) {

    options = options || {};

    assert && assert( !options.tandem, 'tandem is a constructor param, not an option' );
    options.tandem = tandem;

    super(
      () => new MotionModel( style, tandem.createTandem( 'model' ) ),
      model => new MotionScreenView( model, tandem.createTandem( 'view' ) ),
      options );
  }

  /**
   * TODO https://github.com/phetsims/tasks/issues/1129
   * @returns TODO
   * @public
   */
  getState() {
    return { model: this.model.getState(), view: {} };
  }

  /**
   * TODO https://github.com/phetsims/tasks/issues/1129
   * @public
   */
  setState() {
  }
}

forcesAndMotionBasics.register( 'MotionScreen', MotionScreen );
export default MotionScreen;