// Copyright 2013-2019, University of Colorado Boulder

/**
 * Control panel with options to show sum of forces and values, and also buttons below the control panel for reset all and sound.
 *
 * @author Sam Reid
 */
define( require => {
  'use strict';

  // modules
  const forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  const ForcesAndMotionBasicsIconFactory = require( 'FORCES_AND_MOTION_BASICS/common/view/ForcesAndMotionBasicsIconFactory' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const SoundToggleButton = require( 'SCENERY_PHET/buttons/SoundToggleButton' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VerticalCheckboxGroup = require( 'SUN/VerticalCheckboxGroup' );

  // strings
  const sumOfForcesString = require( 'string!FORCES_AND_MOTION_BASICS/sumOfForces' );
  const valuesString = require( 'string!FORCES_AND_MOTION_BASICS/values' );

  // constants
  const BUTTON_PADDING = 7; // placement padding for the reset all button and the mute button

  // strings
  const speedString = require( 'string!FORCES_AND_MOTION_BASICS/speed' );

  /**
   * Create the NetForceControlPanel.
   *
   * @param {NetForceModel} model the model for this control panel
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function NetForceControlPanel( model, tandem, options ) {
    options = merge( { tandem: tandem }, options );
    Node.call( this, options );

    const fontOptions = { font: new PhetFont( 18 ), maxWidth: 230 };

    // the content for "show speed" is a label with an icon
    const speedometerIcon = ForcesAndMotionBasicsIconFactory.speedometerIcon( tandem.createTandem( 'speedometerIcon' ) );
    const showSpeedTextNode = new Text( speedString, merge( { tandem: tandem.createTandem( 'showSpeedTextNode' ) }, fontOptions ) );
    const showSpeedContent = new HBox( {
      children: [ showSpeedTextNode, speedometerIcon ],
      tandem: tandem.createTandem( 'showSpeedContent' ),
      spacing: 10
    } );

    const verticalCheckboxGroupTandem = tandem.createTandem( 'verticalCheckboxGroup' );
    this.verticalCheckboxGroup = new VerticalCheckboxGroup( [ {
      node: new Text( sumOfForcesString, merge( { tandem: tandem.createTandem( 'showSumOfForcesTextNode' ) }, fontOptions ) ),
      property: model.showSumOfForcesProperty,
      tandem: verticalCheckboxGroupTandem.createTandem( 'showSumOfForcesCheckbox' )
    }, {
      node: new Text( valuesString, merge( { tandem: tandem.createTandem( 'showValuesTextNode' ) }, fontOptions ) ),
      property: model.showValuesProperty,
      tandem: verticalCheckboxGroupTandem.createTandem( 'showValuesCheckbox' )
    }, {
      node: showSpeedContent,
      property: model.showSpeedProperty,
      tandem: verticalCheckboxGroupTandem.createTandem( 'showSpeedCheckbox' )
    } ], {
      tandem: verticalCheckboxGroupTandem
    } );
    const checkboxPanel = new Panel( this.verticalCheckboxGroup, {
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

    const soundToggleButton = new SoundToggleButton( model.volumeOnProperty, {
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
