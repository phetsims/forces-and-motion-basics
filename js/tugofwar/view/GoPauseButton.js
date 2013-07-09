// Copyright 2002-2013, University of Colorado Boulder

define( function( require ) {
  'use strict';

  var Image = require( 'SCENERY/nodes/Image' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Strings = require( 'Strings' );

  function GoPauseButton( getImage, model, layoutWidth ) {
    var goPauseButton = this;
    Image.call( this, getImage( 'go_up.png' ), {y: 400, cursor: 'pointer'} );
    function updateOut() {
      goPauseButton.image = getImage( model.running ? 'stop_up.png' : 'go_up.png' );
    }

    goPauseButton.addInputListener( {
      over: function( event ) {
        goPauseButton.image = getImage( model.running ? 'stop_hover.png' : 'go_hover.png' );
      },
      out: updateOut,
      down: function( event ) {
        goPauseButton.image = getImage( model.running ? 'stop_pressed.png' : 'go_pressed.png' );
        model.running = !model.running;
      },
      up: function( event ) {
        goPauseButton.image = getImage( model.running ? 'stop_hover.png' : 'go_hover.png' );
      }
    } );

    model.runningProperty.link( updateOut );

    //Pre create the text icons because dynamically changing text currently 4-1-2013 looks buggy on ipad3
    var goText = new Text( Strings.go, {fontSize: '34px'} );
    var pauseText = new Text( Strings.pause, {fontSize: '34px'} );
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