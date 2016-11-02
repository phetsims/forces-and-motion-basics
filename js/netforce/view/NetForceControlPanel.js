// Copyright 2013-2015, University of Colorado Boulder

/**
 * Control panel with options to show sum of forces and values, and also buttons below the control panel for reset all and sound.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var TandemNode = require( 'TANDEM/scenery/nodes/TandemNode' );
  var TandemText = require( 'TANDEM/scenery/nodes/TandemText' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var SoundToggleButton = require( 'SCENERY_PHET/buttons/SoundToggleButton' );
  var inherit = require( 'PHET_CORE/inherit' );
  var sumOfForcesString = require( 'string!FORCES_AND_MOTION_BASICS/sumOfForces' );
  var valuesString = require( 'string!FORCES_AND_MOTION_BASICS/values' );
  var VerticalCheckBoxGroup = require( 'SUN/VerticalCheckBoxGroup' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  // constants
  var BUTTON_PADDING = 7; // placement padding for the reset all button and the mute button

  /**
   * Create the NetForceControlPanel.
   *
   * @param {NetForceModel} model the model for this control panel
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function NetForceControlPanel( model, tandem, options ) {
    options = _.extend( { tandem: tandem }, options );
    TandemNode.call( this, options );

    var fontOptions = { font: new PhetFont( 18 ) };
    this.verticalCheckBoxGroup = new VerticalCheckBoxGroup( [
      {
        content: new TandemText( sumOfForcesString, _.extend( { tandem: tandem.createTandem( 'showSumOfForcesTextNode' ) }, fontOptions ) ),
        property: model.showSumOfForcesProperty,
        label: sumOfForcesString,
        accessibleLabel: sumOfForcesString,
        tandemName: 'showSumOfForcesCheckBox'
      },
      {
        content: new TandemText( valuesString, _.extend( { tandem: tandem.createTandem( 'showValuesTextNode' ) }, fontOptions ) ),
        property: model.showValuesProperty,
        label: valuesString,
        accessibleLabel: valuesString,
        tandemName: 'showValuesCheckBox'
      }
    ], {
      tandem: tandem.createTandem( 'verticalCheckBoxGroup' )
    } );
    var checkBoxPanel = new Panel( this.verticalCheckBoxGroup, { xMargin: 10, yMargin: 10, fill: '#e3e980' } );
    this.addChild( checkBoxPanel );

    //Create sound and reset buttons, and size them to be the same height.  They appear below the top panel
    this.resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
      },
      radius: 23,
      rightCenter: checkBoxPanel.rightBottom.plusXY( -BUTTON_PADDING, 35 ),
      textDescription: 'Restart game button',
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( this.resetAllButton );

    var soundToggleButton = new SoundToggleButton( model.volumeOnProperty, {
      padX: 19,
      padY: 19,
      centerY: this.resetAllButton.centerY,
      tandem: tandem.createTandem( 'soundToggleButton' )
    } );

    // i18n - if the strings are too short, the sound toggle button will overlap the reset all button
    // if this happens, provide some space - otherwise place relative to left of check box panel
    if ( this.resetAllButton.left < soundToggleButton.right ) {
      soundToggleButton.right = this.resetAllButton.left - 2 * BUTTON_PADDING;
    }
    else {
      soundToggleButton.left = checkBoxPanel.left + BUTTON_PADDING;
    }

    this.addChild( soundToggleButton );
  }

  forcesAndMotionBasics.register( 'NetForceControlPanel', NetForceControlPanel );

  return inherit( TandemNode, NetForceControlPanel );

} );
