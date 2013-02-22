require( [ "i18n!../nls/forces-and-motion-basics-strings"], function ( Strings ) {
  var scene = new scenery.Scene( $( "#scene" ), {width: 200, height: 200, preferredSceneLayerType: scenery.LayerType.SVG} );
  scene.addChild( new scenery.Text( "hi there", {x: 100, y: 100, fontSize: 42} ) );
//  scene.addChild( arrow( tail, tip, {width: 50, fill: 'red', strokeWidth: 2 } ) );
  scene.updateScene();

  var resize = function () {
    var width = $( window ).width();
    var height = $( window ).height();

    var scale = Math.min( width / 981, height / 644 );

    scene.resize( width, height );
    scene.updateScene();
    console.log( "width", width, "height", height );
    scene.setScale( scale );
  };
  $( window ).resize( resize );
  resize();
} );