//Main class that represents one simulation, including the tabs, home screen, play area, etc.
define( function( require ) {
  "use strict";

  var Fort = require( 'FORT/Fort' );
  var Util = require( 'SCENERY/util/Util' );
  var NavigationBar = require( 'SCENERY_PHET/NavigationBar' );
  var HomeScreen = require( 'SCENERY_PHET/HomeScreen' );
  var Scene = require( 'SCENERY/Scene' );
  var Node = require( 'SCENERY/nodes/Node' );

  //Default size to use, which will be scaled up and down isometrically
  var HEIGHT = 644;
  var WIDTH = 981;

  function Sim( name, tabs ) {
    var sim = this;
    this.tabs = tabs;
    new FastClick( document.body );

    Util.polyfillRequestAnimationFrame();

    this.appModel = new Fort.Model( {home: false, tab: 0} );

    this.scene = new Scene( $( '.scene' ), {width: WIDTH, height: HEIGHT, allowDevicePixelRatioScaling: true} );
    this.scene.initializeStandaloneEvents(); // sets up listeners on the document with preventDefault(), and forwards those events to our scene
    this.scene.resizeOnWindowResize(); // the scene gets resized to the full screen size

    var homeScreen = new HomeScreen( name, tabs, this.appModel );

    var navigationBar = new NavigationBar( tabs, this.appModel ).mutate( {bottom: HEIGHT - 2} );//TODO: this padding amount is copied in NavigationBar 

    var root = new Node(); //root: homeScreen | tabNode
    var tabNode = new Node(); //tabNode: navigationBar tabContainer
    var tabContainer = new Node();//tabContainer: sceneForTab 
    tabNode.addChild( navigationBar );
    tabNode.addChild( tabContainer );
    this.scene.addChild( root );

    this.appModel.link( 'home', function( home ) { root.children = [home ? homeScreen : tabNode];} );

    function resize() {
      var width = $( window ).width();
      var height = $( window ).height();//leave room for the tab bar

      var scale = Math.min( width / WIDTH, height / HEIGHT );
      sim.scene.resetTransform();
      sim.scene.setScaleMagnitude( scale );

      //center vertically
      if ( scale === width / WIDTH ) {
        sim.scene.translate( 0, (height - HEIGHT * scale) / 2 / scale );
      }

      //center horizontally
      else if ( scale === height / HEIGHT ) {
        sim.scene.translate( (width - WIDTH * scale) / 2 / scale, 0 );
      }
      sim.scene.updateScene();
    }

    //Fit to the window and render the initial scene
    $( window ).resize( resize );
    resize();

    //Load the modules lazily, makes the startup time on iPad3 go from 14 sec to 4 sec to see the home screen
    for ( var i = 0; i < tabs.length; i++ ) {
      tabs[i].instance = tabs[i].create();
    }

    this.appModel.link( 'tab', function( tabIndex ) { tabContainer.children = [tabs[tabIndex].instance]; } );
    this.scene.updateScene();
  }

  Sim.prototype.start = function() {
    var sim = this;
    //http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // place the rAF *before* the render() to assure as close to
    // 60fps with the setTimeout fallback.
    (function animationLoop() {
      requestAnimationFrame( animationLoop );

      //Update the tab, but not if the user is on the home screen
      if ( !sim.appModel.home ) {
        sim.tabs[sim.appModel.tab].instance.model.step();
      }
      sim.scene.updateScene();
    })();
  };

  return Sim;
} );