// Copyright 2015-2020, University of Colorado Boulder

/**
 * TODO
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
      function() {
        return new MotionModel( style, tandem.createTandem( 'model' ) );
      },
      function( model ) {
        return new MotionScreenView( model, tandem.createTandem( 'view' ) );
      },
      options );
  }

  /**
   * TODO
   * @returns TODO
   * @public
   */
  getState() {
    return { model: this.model.getState(), view: {} };
  }

  /**
   * TODO
   * @public
   */
  setState() {
  }
}

forcesAndMotionBasics.register( 'MotionScreen', MotionScreen );
export default MotionScreen;