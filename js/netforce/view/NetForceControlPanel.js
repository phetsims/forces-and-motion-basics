// Copyright 2013-2018, University of Colorado Boulder

/**
 * Control panel with options to show sum of forces and values, and also buttons below the control panel for reset all and sound.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var ForcesAndMotionBasicsIconFactory = require( 'FORCES_AND_MOTION_BASICS/common/view/ForcesAndMotionBasicsIconFactory' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var SoundToggleButton = require( 'SCENERY_PHET/buttons/SoundToggleButton' );
  var sumOfForcesString = require( 'string!FORCES_AND_MOTION_BASICS/sumOfForces' );
  var Text = require( 'SCENERY/nodes/Text' );
  var valuesString = require( 'string!FORCES_AND_MOTION_BASICS/values' );
  var VerticalCheckboxGroup = require( 'SUN/VerticalCheckboxGroup' );


  // constants
  var BUTTON_PADDING = 7; // placement padding for the reset all button and the mute button

  // strings
  var speedString = require( 'string!FORCES_AND_MOTION_BASICS/speed' );

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
    Node.call( this, options );

    var fontOptions = { font: new PhetFont( 18 ), maxWidth: 230 };

    // the content for "show speed" is a label with an icon
    var speedometerIcon = ForcesAndMotionBasicsIconFactory.speedometerIcon( tandem.createTandem( 'speedometerIcon' ) );
    var showSpeedTextNode = new Text( speedString, _.extend( { tandem: tandem.createTandem( 'showSpeedTextNode' ) }, fontOptions ) );
    var showSpeedContent = new HBox( {
      children: [ showSpeedTextNode, speedometerIcon ],
      tandem: tandem.createTandem( 'showSpeedContent' ),
      spacing: 10
    } );

    var verticalCheckboxGroupTandem = tandem.createTandem( 'verticalCheckboxGroup' );
    this.verticalCheckboxGroup = new VerticalCheckboxGroup( [ {
      content: new Text( sumOfForcesString, _.extend( { tandem: tandem.createTandem( 'showSumOfForcesTextNode' ) }, fontOptions ) ),
      property: model.showSumOfForcesProperty,
      tandem: verticalCheckboxGroupTandem.createTandem( 'showSumOfForcesCheckbox' )
    }, {
      content: new Text( valuesString, _.extend( { tandem: tandem.createTandem( 'showValuesTextNode' ) }, fontOptions ) ),
      property: model.showValuesProperty,
      tandem: verticalCheckboxGroupTandem.createTandem( 'showValuesCheckbox' )
    }, {
      content: showSpeedContent,
      property: model.showSpeedProperty,
      tandem: verticalCheckboxGroupTandem.createTandem( 'showSpeedCheckbox' )
    } ], {
      tandem: verticalCheckboxGroupTandem
    } );
    var checkboxPanel = new Panel( this.verticalCheckboxGroup, {
      xMargin: 10,
      yMargin: 10,
      fill: '#e3e980',
      tandem: tandem.createTandem( 'verticalCheckboxGroupPanel' )
    } );
    this.addChild( checkboxPanel );

    //Create sound and reset buttons, and size them to be the same height.  They appear below the top panel
    this.resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
      },
      radius: 23,
      rightCenter: checkboxPanel.rightBottom.plusXY( -BUTTON_PADDING, 35 ),
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( this.resetAllButton );

    var soundToggleButton = new SoundToggleButton( model.volumeOnProperty, {
      padX: 19,
      padY: 19,
      centerY: this.resetAllButton.centerY,
      tandem: tandem.createTandem( 'soundToggleButton' )
    } );

    // layout
    soundToggleButton.left = checkboxPanel.left + BUTTON_PADDING;

    // i18n - if the strings are too short, the sound toggle button will overlap the reset all button, add some padding
    if ( this.resetAllButton.left < soundToggleButton.right ) {
      soundToggleButton.right = this.resetAllButton.left - 2 * BUTTON_PADDING;
    }

    this.addChild( soundToggleButton );
  }

  forcesAndMotionBasics.register( 'NetForceControlPanel', NetForceControlPanel );

  return inherit( Node, NetForceControlPanel );

} );
