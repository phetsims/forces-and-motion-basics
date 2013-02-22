define( [], function ( require ) {
  var Strings = require( "i18n!../../nls/forces-and-motion-basics-strings" );
  var cart = require( "image!images/cart.png" );
  var pullFigureBlue0 = require( "image!images/pull_figure_BLUE_0.png" );
  console.log( cart );

  function View() {

  };
  console.log( Strings );
  var scene = new scenery.Scene( $( "#scene" ), {width: 200, height: 200, preferredSceneLayerType: scenery.LayerType.SVG} );
  scene.addChild( new scenery.Text( "hi there", {x: 100, y: 100, fontSize: 42} ) );
  scene.addChild( new scenery.Image( cart, {x: 100, y: 100, fontSize: 42} ) );
  var blueFigure = new scenery.Image( pullFigureBlue0, {x: 100, y: 100, fontSize: 42} );
  blueFigure.addInputListener( new scenery.SimpleDragHandler( {allowTouchSnag: true} ) );
  scene.addChild( blueFigure );
  scene.updateScene();

  scene.initializeFullscreenEvents(); // sets up listeners on the document with preventDefault(), and forwards those events to our scene
  scene.resizeOnWindowResize(); // the scene gets resized to the full screen size

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

  function render() {
    scene.updateScene();
  }

  window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           function ( callback ) {
             window.setTimeout( callback, 1000 / 60 );
           };
  })();

  //http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // place the rAF *before* the render() to assure as close to
  // 60fps with the setTimeout fallback.
  (function animloop() {
    requestAnimFrame( animloop );
    render();
  })();
  return View;
} );
