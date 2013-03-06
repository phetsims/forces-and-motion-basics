define( function( require ) {
  "use strict";

  var Image = require( 'SCENERY/nodes/Image' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Inheritance = require( 'PHETCOMMON/util/Inheritance' );
  var Strings = require( "i18n!../../../nls/forces-and-motion-basics-strings" );

  function GoButton( getImage, model ) {
    var goButtonImage = this;
    Image.call( this, getImage( 'go_up' ), {x: 420, y: 400, cursor: 'pointer'} );
    goButtonImage.addInputListener(
        {
          over: function( event ) {
            goButtonImage.image = getImage( 'go_hover' );
            goButtonImage.invalidateSelf( new Bounds2( 0, 0, goButtonImage.image.width, goButtonImage.image.height ) );
          },
          out: function( event ) {
            goButtonImage.image = getImage( 'go_up' );
            goButtonImage.invalidateSelf( new Bounds2( 0, 0, goButtonImage.image.width, goButtonImage.image.height ) );
          },
          down: function( event ) {
            goButtonImage.image = getImage( 'go_pressed' );
            goButtonImage.invalidateSelf( new Bounds2( 0, 0, goButtonImage.image.width, goButtonImage.image.height ) );
            model.set( {running: !model.get( "running" )} );
          },
          up: function( event ) {
            goButtonImage.image = getImage( 'go_hover' );
            goButtonImage.invalidateSelf( new Bounds2( 0, 0, goButtonImage.image.width, goButtonImage.image.height ) );
          }
        } );
    var goButtonText = new Text( Strings.go, {fontSize: '34px', backend: 'svg'} );
    goButtonText.x = goButtonImage.width / 2 - goButtonText.width / 2 - 5;
    goButtonText.y = goButtonImage.height / 2 + 7;
    goButtonImage.addChild( goButtonText );

    model.on( "change:running", function( m, running ) {
      goButtonText.text = running ? Strings.pause : Strings.go;
      goButtonText.x = goButtonImage.width / 2 - goButtonText.width / 2 - 5;
      goButtonText.y = goButtonImage.height / 2 + 7;
    } );

    model.on( 'change:numberPullersAttached', function( m, numberAttached ) { goButtonImage.visible = numberAttached > 0; } );
    model.trigger( 'change:numberPullersAttached' );
  }

  Inheritance.inheritPrototype( GoButton, Image );

  return GoButton;
} );