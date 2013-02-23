define( function ( require ) {

  var Strings = require( "i18n!../../nls/forces-and-motion-basics-strings" );

  function View( $images ) {

    function getImage( name ) {
      var selector = 'img[src^="images/' + name + '"]';
      return $images.parent().find( selector )[0];
    }

    console.log( Strings );
    this.scene = new scenery.Scene( $( "#scene" ), {width: 200, height: 200, preferredSceneLayerType: scenery.LayerType.SVG} );
    this.scene.addChild( new scenery.Text( "hi there", {x: 100, y: 100, fontSize: 42} ) );
    this.scene.addChild( new scenery.Image( getImage( 'cart' ), {x: 100, y: 100, fontSize: 42} ) );

    var blueImageNames = ['pull_figure_small_BLUE_0', 'pull_figure_small_BLUE_0', 'pull_figure_BLUE_0', 'pull_figure_lrg_BLUE_0'];
    var redImageNames = ['pull_figure_small_RED_0', 'pull_figure_small_RED_0', 'pull_figure_RED_0', 'pull_figure_lrg_RED_0'];
    var view = this;

    function addImages( imageNames ) {
      for ( var i = 0; i < imageNames.length; i++ ) {
        var image = getImage( imageNames[i] );
        console.log( image );
        var imageNode = new scenery.Image( image, {x: 100, y: 100, fontSize: 42} );
        imageNode.addInputListener( new scenery.SimpleDragHandler( {allowTouchSnag: true} ) );
        view.scene.addChild( imageNode );
      }
    }

    addImages.call( this, blueImageNames );
    addImages.call( this, redImageNames );

    this.scene.initializeFullscreenEvents(); // sets up listeners on the document with preventDefault(), and forwards those events to our scene
    this.scene.resizeOnWindowResize(); // the scene gets resized to the full screen size

    //Fit to the window and render the initial scene
    $( window ).resize( this.resize );
    this.resize();

    //http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // place the rAF *before* the render() to assure as close to
    // 60fps with the setTimeout fallback.
    (function animloop() {
      requestAnimFrame( animloop );
      view.render();
    })();
  }

  View.prototype.resize = function () {
    var width = $( window ).width();
    var height = $( window ).height();

    var scale = Math.min( width / 981, height / 644 );

    this.scene.resize( width, height );
    this.scene.setScale( scale );
    this.render();
  };

  View.prototype.render = function () {
    this.scene.updateScene();
  };

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

  return View;
} );
