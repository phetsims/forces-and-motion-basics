define( function ( require ) {
  "use strict";
  var Strings = require( "i18n!../../nls/forces-and-motion-basics-strings" );
  var Shape = require( 'SCENERY/Shape' );
  var LayerType = require( 'SCENERY/layers/LayerType' );
  var Scene = require( 'SCENERY/Scene' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Image = require( 'SCENERY/nodes/Image' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  function View( $images ) {

    function getImage( name ) {
      var selector = 'img[src^="images/' + name + '"]';
      return $images.parent().find( selector )[0];
    }

    this.scene = new Scene( $( "#scene" ), {width: 200, height: 200} );

    var misc = [
      {image: 'grass', x: 13, y: 368 },
      {image: 'rope', x: 51, y: 277 },
      {image: 'cart', x: 399, y: 221 },
      {image: 'go_up', x: 420, y: 386 }
    ];
    for ( var i = 0; i < misc.length; i++ ) {
      this.scene.addChild( new Image( getImage( misc[i].image ), {x: misc[i].x, y: misc[i].y} ) );
    }

    var blueImageNames = [
      {image: 'pull_figure_small_BLUE_0', x: 260, y: 498 },
      {image: 'pull_figure_small_BLUE_0', x: 198, y: 499 },
      {image: 'pull_figure_BLUE_0', x: 132, y: 446 },
      {image: 'pull_figure_lrg_BLUE_0', x: 34, y: 420  }
    ];
    var redImageNames = [
      {image: 'pull_figure_small_RED_0', x: 624, y: 500 },
      {image: 'pull_figure_small_RED_0', x: 684, y: 500 },
      {image: 'pull_figure_RED_0', x: 756, y: 446 },
      {image: 'pull_figure_lrg_RED_0', x: 838, y: 407  }
    ];
    var view = this;

    function addImages( imageNames ) {
      for ( var i = 0; i < imageNames.length; i++ ) {
        var image = getImage( imageNames[i].image );
        var imageNode = new Image( image, {x: imageNames[i].x, y: imageNames[i].y, fontSize: 42} );
        imageNode.addInputListener( new SimpleDragHandler( {allowTouchSnag: true} ) );
        view.scene.addChild( imageNode );
      }
    }

    addImages.call( this, blueImageNames );
    addImages.call( this, redImageNames );

    this.scene.initializeFullscreenEvents(); // sets up listeners on the document with preventDefault(), and forwards those events to our scene
    this.scene.resizeOnWindowResize(); // the scene gets resized to the full screen size

    //Fit to the window and render the initial scene
    $( window ).resize( function () { view.resize(); } );
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

    var skyHeight = (376) * scale;
    var groundHeight = height - skyHeight;

    //Clear raphael layers and rebuild
    $( "#background" ).empty();

    //Show the sky
    var paper = Raphael( document.getElementById( "background" ), width - 5, height - 5 );
    var sky = paper.rect( 0, 0, width - 5, height - groundHeight );
    sky.attr( 'fill', '90-#cfecfc-#02ace4' );
    sky.attr( 'stroke', '#fff' );

    //Show the ground
    var ground = paper.rect( 0, height - groundHeight, width, groundHeight );
    ground.attr( 'fill', '#c59a5b' );
    ground.attr( 'stroke', '#fff' );

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