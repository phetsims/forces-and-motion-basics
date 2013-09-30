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
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Strings = require( 'FORCES_AND_MOTION_BASICS/forces-and-motion-basics-strings' );
  var stopUpImage = require( 'image!FORCES_AND_MOTION_BASICS/../images/stop_up.png' );
  var goUpImage = require( 'image!FORCES_AND_MOTION_BASICS/../images/go_up.png' );
  var goHoverImage = require( 'image!FORCES_AND_MOTION_BASICS/../images/go_hover.png' );
  var stopHoverImage = require( 'image!FORCES_AND_MOTION_BASICS/../images/stop_hover.png' );
  var stopPressedImage = require( 'image!FORCES_AND_MOTION_BASICS/../images/stop_pressed.png' );
  var goPressedImage = require( 'image!FORCES_AND_MOTION_BASICS/../images/go_pressed.png' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  /**
   * Create a GoPauseButton that appears below the candy cart when a puller has been attached to the rope.
   * @param {TugOfWarModel} model the TugOfWarModel
   * @param {Number} layoutWidth the layout width for centering the button
   * @constructor
   */
  function GoPauseButton( model, layoutWidth ) {
    var goPauseButton = this;
    Image.call( this, goUpImage, {y: 400, cursor: 'pointer'} );

    var updateOut = function() {goPauseButton.image = model.running ? stopUpImage : goUpImage;};

    goPauseButton.addInputListener( {
      over: function() {
        goPauseButton.image = model.running ? stopHoverImage : goHoverImage;
      },
      out: updateOut,
      down: function() {
        goPauseButton.image = model.running ? stopPressedImage : goPressedImage;
        model.running = !model.running;
      },
      up: function() {
        goPauseButton.image = model.running ? stopHoverImage : goHoverImage;
      }
    } );

    model.runningProperty.link( updateOut );

    //Pre create the text icons because dynamically changing text currently 4-1-2013 looks buggy on iPad 3
    var textOptions = {font: new PhetFont( 30 )};
    var textWidth = goPauseButton.width - 30;//Trim the edges because of the shadow and button padding

    var goText = new Text( Strings.go, textOptions );
    if ( goText.width > textWidth ) { goText.scale( textWidth / goText.width ); }
    goText.centerX = goPauseButton.width / 2 - 2;
    goText.centerY = goPauseButton.height / 2 - 3;

    var pauseText = new Text( Strings.pause, textOptions );
    if ( pauseText.width > textWidth ) { pauseText.scale( textWidth / pauseText.width ); }
    pauseText.centerX = goPauseButton.width / 2 - 2;
    pauseText.centerY = goPauseButton.height / 2 - 3;

    goPauseButton.addChild( goText );
    goPauseButton.addChild( pauseText );

    model.multilink( ['running', 'state', 'numberPullersAttached'], function( running, state, numberPullersAttached ) {
      var text = running ? pauseText : goText;
      var other = running ? goText : pauseText;
      text.visible = true;
      other.visible = false;
      goPauseButton.visible = state !== 'completed' && numberPullersAttached > 0;
    } );

    this.centerX = layoutWidth / 2;

    //Add accessibility peer
    this.addPeer( '<input type="button">', {click: function() {model.running = !model.running;}} );
  }

  inherit( Image, GoPauseButton );

  return GoPauseButton;
} );