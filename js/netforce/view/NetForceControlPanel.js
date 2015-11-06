// Copyright 2013-2015, University of Colorado Boulder

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
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var SoundToggleButton = require( 'SCENERY_PHET/buttons/SoundToggleButton' );
  var inherit = require( 'PHET_CORE/inherit' );
  var sumOfForcesString = require( 'string!FORCES_AND_MOTION_BASICS/sumOfForces' );
  var valuesString = require( 'string!FORCES_AND_MOTION_BASICS/values' );
  var VerticalCheckBoxGroup = require( 'SUN/VerticalCheckBoxGroup' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  /**
   * Create the NetForceControlPanel.
   * @param {NetForceModel} model the model for this control panel
   * @param {Object} [options]
   * @constructor
   */
  function NetForceControlPanel( model, options ) {
    options = _.extend( {}, options );
    Node.call( this, options );

    var fontOptions = { font: new PhetFont( 18 ) };
    this.verticalCheckBoxGroup = new VerticalCheckBoxGroup( [
      {
        content: new Text( sumOfForcesString, fontOptions ),
        property: model.showSumOfForcesProperty,
        label: sumOfForcesString
      },
      {
        content: new Text( valuesString, fontOptions ), property: model.showValuesProperty, label: valuesString
      }
    ] );
    this.addChild( new Panel( this.verticalCheckBoxGroup, { xMargin: 10, yMargin: 10, fill: '#e3e980' } ) );

    //Create sound and reset buttons, and size them to be the same height.  They appear below the top panel
    this.resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
      },
      scale: 1.13,
      textDescription: 'Restart game button'
    } );
    var soundButton = new SoundToggleButton( model.volumeOnProperty, { padX: 19, padY: 19 } );
    this.addChild( new HBox( { spacing: 5, children: [ this.resetAllButton, soundButton ] } ).mutate( {
      centerX: this.verticalCheckBoxGroup.centerX,
      top: this.verticalCheckBoxGroup.bottom + 15
    } ) );
  }

  return inherit( Node, NetForceControlPanel );
} );
