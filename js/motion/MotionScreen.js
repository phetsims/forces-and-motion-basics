// Copyright 2015-2017, University of Colorado Boulder

/**
 *
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MotionModel = require( 'FORCES_AND_MOTION_BASICS/motion/model/MotionModel' );
  const MotionScreenView = require( 'FORCES_AND_MOTION_BASICS/motion/view/MotionScreenView' );
  const Screen = require( 'JOIST/Screen' );

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

  return inherit( Screen, MotionScreen, {

    getState: function() {
      return { model: this.model.getState(), view: {} };
    },

    setState: function() {
    }
  } );
} );