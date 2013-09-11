// Copyright 2002-2013, University of Colorado Boulder

/**
 * Control panel with options to show sum of forces and values, and also buttons below the control panel for reset all and sound.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var HBox = require( 'SCENERY/nodes/HBox' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ResetAllButton = require( 'FORCES_AND_MOTION_BASICS/common/view/ResetAllButton' );
  var SoundToggleButton = require( 'SCENERY_PHET/SoundToggleButton' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Strings = require( 'FORCES_AND_MOTION_BASICS/forces-and-motion-basics-strings' );
  var VerticalCheckBoxGroup = require( 'SUN/VerticalCheckBoxGroup' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  /**
   * Create the TugOfWarControlPanel.
   * @param {TugOfWarModel} model the model for this control panel
   * @param {Object} options
   * @constructor
   */
  function TugOfWarControlPanel( model, options ) {
    options = _.extend( {}, options );
    Node.call( this, options );

    var fontOptions = {font: new PhetFont( 18 )};
    var controlPanel = new VerticalCheckBoxGroup( [
      {content: new Text( Strings.sumOfForces, fontOptions ), property: model.showSumOfForcesProperty, label: Strings.sumOfForces},
      {content: new Text( Strings.values, fontOptions ), property: model.showValuesProperty, label: Strings.values}
    ] );
    this.addChild( new Panel( controlPanel, {xMargin: 10, yMargin: 10, fill: '#e3e980'} ) );

    //Create sound and reset buttons, and size them to be the same height.  They appear below the top panel
    var resetButton = new ResetAllButton( model.reset.bind( model ), {scale: 88 / 103} );
    var soundButton = new SoundToggleButton( model.volumeOnProperty, { padX: 19, padY: 19 } );
    this.addChild( new HBox( {spacing: 5, children: [ resetButton, soundButton ]} ).mutate( {centerX: controlPanel.centerX, top: controlPanel.bottom + 15} ) );
  }

  return inherit( Node, TugOfWarControlPanel );
} );
