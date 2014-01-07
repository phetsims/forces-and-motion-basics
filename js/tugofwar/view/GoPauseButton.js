// Copyright 2002-2013, University of Colorado Boulder

/**
 * A big round Go/Pause button that appears when the user has attached any nonzero number of pullers to the rope
 * which can be used to start/pause the animation.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var Image = require( 'SCENERY/nodes/Image' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );
  var goString = require( 'string!FORCES_AND_MOTION_BASICS/go' );
  var stopUpImage = require( 'image!FORCES_AND_MOTION_BASICS/stop_up.png' );
  var pauseString = require( 'string!FORCES_AND_MOTION_BASICS/pause' );
  var goUpImage = require( 'image!FORCES_AND_MOTION_BASICS/go_up.png' );
  var goHoverImage = require( 'image!FORCES_AND_MOTION_BASICS/go_hover.png' );
  var stopHoverImage = require( 'image!FORCES_AND_MOTION_BASICS/stop_hover.png' );
  var stopPressedImage = require( 'image!FORCES_AND_MOTION_BASICS/stop_pressed.png' );
  var goPressedImage = require( 'image!FORCES_AND_MOTION_BASICS/go_pressed.png' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var PushButton = require( 'SUN/PushButton' );
  var ToggleNode = require( 'SUN/ToggleNode' );

  /**
   * Create a GoPauseButton that appears below the candy cart when a puller has been attached to the rope.
   * @param {TugOfWarModel} model the TugOfWarModel
   * @param {Number} layoutWidth the layout width for centering the button
   * @constructor
   */
  function GoPauseButton( model, layoutWidth ) {
    var goPauseButton = this;

    //Pre create the text icons because dynamically changing text currently 4-1-2013 looks buggy on iPad 3
    var textOptions = {font: new PhetFont( 30 )};
    var textWidth = goUpImage.width - 30;//Trim the edges because of the shadow and button padding

    var goText = new Text( goString, textOptions );
    if ( goText.width > textWidth ) { goText.scale( textWidth / goText.width ); }

    var pauseText = new Text( pauseString, textOptions );
    if ( pauseText.width > textWidth ) { pauseText.scale( textWidth / pauseText.width ); }

    var goButton = new PushButton( new Image( goUpImage ), new Image( goHoverImage ), new Image( goPressedImage ), new Image( goUpImage ) );

    //Account for the button not being centered
    goText.center = goButton.center.plusXY( -3, -5 );
    goButton.addChild( goText );

    goButton.addListener( function() { model.running = true; } );

    var pauseButton = new PushButton( new Image( stopUpImage ), new Image( stopHoverImage ), new Image( stopPressedImage ), new Image( stopUpImage ) );

    //Account for the button not being centered
    pauseText.center = pauseButton.center.plusXY( -3, -5 );
    pauseButton.addChild( pauseText );

    pauseButton.addListener( function() { model.running = false; } );

    var showGoButtonProperty = model.toDerivedProperty( ['running', 'state', 'numberPullersAttached'], function( running, state, numberPullersAttached ) {
      return !running;
    } );
    ToggleNode.call( this, goButton, pauseButton, showGoButtonProperty, {y: 400} );

    //Show the go/pause button if any pullers are attached or if the cart got started moving, and if it hasn't already finished a match, see #61
    var showGoPauseButtonProperty = model.toDerivedProperty( ['running', 'state', 'numberPullersAttached'], function( running, state, numberPullersAttached ) {
      goPauseButton.visible = state !== 'completed' && (numberPullersAttached > 0 || running);
    } );
    showGoPauseButtonProperty.linkAttribute( this, 'visible' );

    this.centerX = layoutWidth / 2;

    //Add accessibility peer
    this.addPeer( '<input type="button">', {click: function() {model.running = !model.running;}} );
  }

  return inherit( ToggleNode, GoPauseButton );
} );