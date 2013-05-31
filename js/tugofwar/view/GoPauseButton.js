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
    var values = model.values;
    var goPauseButton = this;
    Image.call( this, getImage( 'go_up.png' ), {y: 400, cursor: 'pointer'} );
    function updateOut() {
      goPauseButton.image = getImage( values.running ? 'stop_up.png' : 'go_up.png' );
    }

    goPauseButton.addInputListener(
        {
          over: function( event ) {
            goPauseButton.image = getImage( values.running ? 'stop_hover.png' : 'go_hover.png' );
          },
          out: updateOut,
          down: function( event ) {
            goPauseButton.image = getImage( values.running ? 'stop_pressed.png' : 'go_pressed.png' );
            values.running = !values.running;
          },
          up: function( event ) {
            goPauseButton.image = getImage( values.running ? 'stop_hover.png' : 'go_hover.png' );
          }
        } );

    model.running.link( updateOut );

    //Pre create the text icons because dynamically changing text currently 4-1-2013 looks buggy on ipad3
    var goText = new Text( Strings.go, {fontSize: '34px'} );
    var pauseText = new Text( Strings.pause, {fontSize: '34px'} );
    var textContainer = new Node( {children: [goText]} );
    textContainer.x = goPauseButton.width / 2 - textContainer.width / 2 - 5;
    textContainer.y = goPauseButton.height / 2 + 7;
    goPauseButton.addChild( textContainer );

    var update = function() {
      var child = values.running ? pauseText : goText;
      textContainer.children = [child];
      textContainer.x = goPauseButton.width / 2 - child.width / 2 - 5;
      textContainer.y = goPauseButton.height / 2 + 7;
    };
    model.running.link( update );
    model.state.link( update );
    model.numberPullersAttached.link( update );

    this.centerX = Layout.width / 2;

    //Add accessibility peer
    this.addPeer( '<input type="button">', {click: function() {values.running = !values.running;}} );
  }

  inherit( GoPauseButton, Image );

  return GoPauseButton;
} );