// Copyright 2002-2013, University of Colorado Boulder

/**
 * A Big round Go/Pause button that appears when the user has attached any nonzero number of pullers to the rope
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
  var Strings = require( 'Strings' );
  var imageLoader = require( 'imageLoader' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  /**
   * Create a GoPauseButton that appears below the candy cart when a puller has been attached to the rope.
   * @param {TugOfWarModel} model the TugOfWarModel
   * @param {Number} layoutWidth the layout width for centering the button
   * @constructor
   */
  function GoPauseButton( model, layoutWidth ) {
    var goPauseButton = this;
    Image.call( this, imageLoader.getImage( 'go_up.png' ), {y: 400, cursor: 'pointer', renderer: 'svg'} );

    var updateOut = function() {goPauseButton.image = imageLoader.getImage( model.running ? 'stop_up.png' : 'go_up.png' );};

    goPauseButton.addInputListener( {
      over: function() {
        goPauseButton.image = imageLoader.getImage( model.running ? 'stop_hover.png' : 'go_hover.png' );
      },
      out: updateOut,
      down: function() {
        goPauseButton.image = imageLoader.getImage( model.running ? 'stop_pressed.png' : 'go_pressed.png' );
        model.running = !model.running;
      },
      up: function() {
        goPauseButton.image = imageLoader.getImage( model.running ? 'stop_hover.png' : 'go_hover.png' );
      }
    } );

    model.runningProperty.link( updateOut );

    //Pre create the text icons because dynamically changing text currently 4-1-2013 looks buggy on iPad 3
    var textOptions = {font: new PhetFont( 34 )};
    var goText = new Text( Strings.go, textOptions );
    var pauseText = new Text( Strings.pause, textOptions );
    var textContainer = new Node( {children: [goText]} );
    textContainer.x = goPauseButton.width / 2 - textContainer.width / 2 - 5;
    textContainer.y = goPauseButton.height / 2 + 7;
    goPauseButton.addChild( textContainer );

    model.multilink( ['running', 'state', 'numberPullersAttached'], function( running, state ) {
      var text = running ? pauseText : goText;
      textContainer.children = [text];
      textContainer.x = goPauseButton.width / 2 - text.width / 2 - 5;
      textContainer.y = goPauseButton.height / 2 + 7;
      goPauseButton.visible = (state !== 'completed');
    } );

    this.centerX = layoutWidth / 2;

    //Add accessibility peer
    this.addPeer( '<input type="button">', {click: function() {model.running = !model.running;}} );
  }

  inherit( Image, GoPauseButton );

  return GoPauseButton;
} );