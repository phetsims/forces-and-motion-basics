require( [ "i18n!../nls/forces-and-motion-basics-strings", "image!images/cart.png"], function ( Strings, cart ) {
  console.log( Strings );
  var scene = new scenery.Scene( $( "#scene" ), {width: 200, height: 200, preferredSceneLayerType: scenery.LayerType.SVG} );
  scene.addChild( new scenery.Text( "hi there", {x: 100, y: 100, fontSize: 42} ) );
  scene.addChild( new scenery.Image( cart, {x: 100, y: 100, fontSize: 42} ) );
  scene.updateScene();

  var resize = function () {
    var width = $( window ).width();
    var height = $( window ).height();

    var scale = Math.min( width / 981, height / 644 );

    scene.resize( width, height );
    scene.updateScene();
    scene.setScale( scale );
  };
  $( window ).resize( resize );
  resize();
} );