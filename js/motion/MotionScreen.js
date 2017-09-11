// Copyright 2015, University of Colorado Boulder

/**
 *
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MotionModel = require( 'FORCES_AND_MOTION_BASICS/motion/model/MotionModel' );
  var MotionScreenView = require( 'FORCES_AND_MOTION_BASICS/motion/view/MotionScreenView' );
  var Screen = require( 'JOIST/Screen' );

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