// Copyright 2015, University of Colorado Boulder

/**
 *
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var MotionModel = require( 'FORCES_AND_MOTION_BASICS/motion/model/MotionModel' );
  var MotionScreenView = require( 'FORCES_AND_MOTION_BASICS/motion/view/MotionScreenView' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  /**
   *
   * @constructor
   */
  function MotionScreen( title, icon, style, tandem ) {
    Screen.call( this, title, icon,
      function() {
        return new MotionModel( style, tandem.createTandem( 'model' ) );
      },
      function( model ) {
        return new MotionScreenView( model, tandem.createTandem( 'view' ) );
      }, {
        tandem: tandem
      } );
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