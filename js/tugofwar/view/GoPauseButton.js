define( function( require ) {
  "use strict";

  var Image = require( 'SCENERY/nodes/Image' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Strings = require( 'Strings' );
  var Layout = require( 'Layout' );

  function GoPauseButton( getImage, model ) {
    var goPauseButton = this;
    Image.call( this, getImage( 'go_up.png' ), {y: 400, cursor: 'pointer'} );
    goPauseButton.addInputListener(
        {
          over: function( event ) {
            goPauseButton.image = getImage( 'go_hover.png' );
            goPauseButton.invalidateSelf( new Bounds2( 0, 0, goPauseButton.image.width, goPauseButton.image.height ) );
          },
          out: function( event ) {
            goPauseButton.image = getImage( 'go_up.png' );
            goPauseButton.invalidateSelf( new Bounds2( 0, 0, goPauseButton.image.width, goPauseButton.image.height ) );
          },
          down: function( event ) {
            goPauseButton.image = getImage( 'go_pressed.png' );
            goPauseButton.invalidateSelf( new Bounds2( 0, 0, goPauseButton.image.width, goPauseButton.image.height ) );
            model.running = !model.running;
          },
          up: function( event ) {
            goPauseButton.image = getImage( 'go_hover.png' );
            goPauseButton.invalidateSelf( new Bounds2( 0, 0, goPauseButton.image.width, goPauseButton.image.height ) );
          }
        } );

    //Pre create the text icons because dynamically changing text currently 4-1-2013 looks buggy on ipad3
    var goText = new Text( Strings.go, {fontSize: '34px'} );
    var pauseText = new Text( Strings.pause, {fontSize: '34px'} );
    var textContainer = new Node( {children: [goText]} );
    textContainer.x = goPauseButton.width / 2 - textContainer.width / 2 - 5;
    textContainer.y = goPauseButton.height / 2 + 7;
    goPauseButton.addChild( textContainer );

    model.on( "change:running change:state change:numberPullersAttached", function() {
      var child = model.running ? pauseText : goText;
      textContainer.children = [child];
      textContainer.x = goPauseButton.width / 2 - child.width / 2 - 5;
      textContainer.y = goPauseButton.height / 2 + 7;
    } );

    model.trigger( 'change:numberPullersAttached' );
    this.centerX = Layout.width / 2;

    //Add accessibility peer
    this.addPeer( '<input type="button">', {click: function() {model.running = !model.running;}} );
  }

  inherit( GoPauseButton, Image );

  return GoPauseButton;
} );
