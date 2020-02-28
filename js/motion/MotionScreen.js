// Copyright 2015-2020, University of Colorado Boulder

/**
 *
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Screen from '../../../joist/js/Screen.js';
import inherit from '../../../phet-core/js/inherit.js';
import forcesAndMotionBasics from '../forcesAndMotionBasics.js';
import MotionModel from './model/MotionModel.js';
import MotionScreenView from './view/MotionScreenView.js';

/**
 * @param style
 * @param {Tandem} tandem
 * @constructor
 */
function MotionScreen( style, tandem, options ) {

  options = options || {};

  assert && assert( !options.tandem, 'tandem is a constructor param, not an option' );
  options.tandem = tandem;

  Screen.call( this,
    function() {
      return new MotionModel( style, tandem.createTandem( 'model' ) );
    },
    function( model ) {
      return new MotionScreenView( model, tandem.createTandem( 'view' ) );
    },
    options );
}

forcesAndMotionBasics.register( 'MotionScreen', MotionScreen );

export default inherit( Screen, MotionScreen, {

  getState: function() {
    return { model: this.model.getState(), view: {} };
  },

  setState: function() {
  }
} );