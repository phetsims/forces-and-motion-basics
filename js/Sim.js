define( function( require ) {
  "use strict";
  var Fort = require( 'FORT/Fort' );
  var Util = require( 'SCENERY/util/Util' );
  var NavigationBar = require( 'SCENERY_PHET/NavigationBar' );
  var HomeScreen = require( 'SCENERY_PHET/HomeScreen' );
  var Scene = require( 'SCENERY/Scene' );
  var Node = require( 'SCENERY/nodes/Node' );

  function Sim( options ) {
    var options = options || {};
    var tabs = options.tabs || [];

    new FastClick( document.body );

    Util.polyfillRequestAnimationFrame();

    var appModel = new Fort.Model( {home: false, tab: 0} );

    var scene = new Scene( $( '.scene' ), {width: 200, height: 200, allowDevicePixelRatioScaling: true} );
    scene.initializeStandaloneEvents(); // sets up listeners on the document with preventDefault(), and forwards those events to our scene
    scene.resizeOnWindowResize(); // the scene gets resized to the full screen size

    var homeScreen = new HomeScreen( "Forces and Motion: Basics", tabs, appModel );

    var navigationBar = new NavigationBar( tabs, appModel ).mutate( {bottom: 644} );

    var root = new Node(); //root: homeScreen | tabNode
    var tabNode = new Node(); //tabNode: navigationBar tabContainer
    var tabContainer = new Node();//tabContainer: sceneForTab 
    tabNode.addChild( navigationBar );
    tabNode.addChild( tabContainer );
    scene.addChild( root );

    appModel.link( 'home', function( home ) { root.children = [home ? homeScreen : tabNode];} );

    function resize() {
      var width = $( window ).width();
      var height = $( window ).height();//leave room for the tab bar

      var scale = Math.min( width / 981, height / 644 );
      scene.resetTransform();
      scene.setScaleMagnitude( scale );

      //center vertically
      if ( scale === width / 981 ) {
        scene.translate( 0, (height - 644 * scale) / 2 / scale );
      }

      //center horizontally
      else if ( scale === height / 644 ) {
        scene.translate( (width - 981 * scale) / 2 / scale, 0 );
      }
    }

    //Fit to the window and render the initial scene
    $( window ).resize( resize );
    resize();

    //Load the modules lazily, makes the startup time on iPad3 go from 14 sec to 4 sec to see the home screen
    for ( var i = 0; i < tabs.length; i++ ) {
      tabs[i].instance = tabs[i].create();
    }

    appModel.link( 'tab', function( tabIndex ) { tabContainer.children = [tabs[tabIndex].instance]; } );
    scene.updateScene();

    //http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // place the rAF *before* the render() to assure as close to
    // 60fps with the setTimeout fallback.
    (function animationLoop() {
      requestAnimationFrame( animationLoop );

      //Update the tab, but not if the user is on the home screen
      if ( !appModel.home ) {
        tabs[appModel.tab].instance.model.step();
      }
      scene.updateScene();
    })();
  }

  Sim.prototype.start = function() {};

  return Sim;
} );