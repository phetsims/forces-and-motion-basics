require( [ "tugofwar/model/TugOfWarModel",
           "motion/view/MotionView",
           "motion/model/MotionModel",
           'SCENERY/nodes/Image',
           'PHETCOMMON/util/ImagesLoader',
           "i18n!../nls/forces-and-motion-basics-strings",
           'FORT/examples',
           'FORT/Fort',
           'SCENERY/util/Util',
           'SCENERY_PHET/NavigationBar',
           'SCENERY_PHET/HomeScreen',
           'SCENERY/Scene',
           'SCENERY/nodes/Text',
           'SCENERY/nodes/Node',
           'motion/view/MotionScenery',
           'tugofwar/view/TugOfWarNode'
         ], function( TugOfWarModel, MotionView, MotionModel, Image, ImagesLoader, Strings, fortExamples, Fort, Util, NavigationBar, HomeScreen, Scene, Text, Node, MotionScenery, TugOfWarNode ) {
  "use strict";

  new FastClick( document.body );

  Util.polyfillRequestAnimationFrame();

  //Code to show console output in a div, requires a #debugDiv in the HTML
  var useDebugDiv = false;
  if ( useDebugDiv ) {
    if ( typeof console !== "undefined" ) {
      if ( typeof console.log !== 'undefined' ) { console.olog = console.log; }
      else { console.olog = function() {}; }
    }
    console.log = function( message ) {
      console.olog( message );
      $( '#debugDiv' ).append( '<p>' + message + '</p>' );
    };
  }

  var homeScreen = null;
  var imageLoader = null;
  var inited = false;
  var inited2 = false;
  var scene = null;
  var tabs = null;
  var appModel = new Fort.Model( {home: false, tab: 0} );
  var tabContainer = null;

  function init() {

    scene = new Scene( $( '.scene' ), {width: 200, height: 200, allowDevicePixelRatioScaling: true} );
    scene.initializeStandaloneEvents(); // sets up listeners on the document with preventDefault(), and forwards those events to our scene
    scene.resizeOnWindowResize(); // the scene gets resized to the full screen size

    window.accessibilityScene = new Scene( $( '.accessibility-scene' ) );

    //Start in Tab 2 for debugging

    var tabWrappers = [
      {name: "Tug of War", icon: new Image( imageLoader.getImage( 'Tug_Icon.png' ) )},
      {name: "Motion", icon: new Image( imageLoader.getImage( 'Motion_icon.png' ) )},
      {name: "Friction", icon: new Image( imageLoader.getImage( 'Friction_Icon.png' ) )},
      {name: "Acceleration", icon: new Image( imageLoader.getImage( 'Acceleration_Icon.png' ) )}
    ];
    homeScreen = new HomeScreen( "Forces and Motion: Basics", tabWrappers, appModel );

    $( "#overlay" ).remove();
    if ( !useDebugDiv ) {
      $( "debugDiv" ).remove();
    }

    var navigationBar = new NavigationBar( tabWrappers, appModel );

    var root = new Node(); //root: homeScreen | tabNode
    var tabNode = new Node(); //tabNode: navigationBar tabContainer
    tabContainer = new Node();//tabContainer: sceneForTab 
    tabNode.addChild( navigationBar );
    tabNode.addChild( tabContainer );
    scene.addChild( root );

    appModel.link( 'home', function( m, home ) { root.children = [home ? homeScreen : tabNode];} );

    function resize() {
      var width = $( window ).width();
      var height = $( window ).height();

      navigationBar.bottom = height;
    }

    //Fit to the window and render the initial scene
    $( window ).resize( resize );
    resize();
    console.log( "init finished" );
  }

  //Wait until images are loaded, then launch the sim and show the initial tab
  new ImagesLoader( function( loader ) {
    imageLoader = loader;

    //http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // place the rAF *before* the render() to assure as close to
    // 60fps with the setTimeout fallback.
    (function animationLoop() {
      requestAnimationFrame( animationLoop );

      if ( !inited ) {
        init();
        inited = true;
        scene.updateScene();
      }

      //Load the modules lazily, makes the startup time on iPad3 go from 14 sec to 4 sec to see the home screen
      else if ( inited && !inited2 ) {
        tabs = [
          new TugOfWarNode( new TugOfWarModel(), imageLoader ),
          new MotionScenery( new MotionModel(), imageLoader ).scene,
          new MotionScenery( new MotionModel(), imageLoader ).scene,
          new MotionScenery( new MotionModel(), imageLoader ).scene
        ];

        appModel.link( 'tab', function( m, tab ) { tabContainer.children = [tabs[tab]]; } );
        inited2 = true;
        scene.updateScene();
        console.log( "init2 finished" );
      }
      else if ( inited && inited2 ) {

        //Update the tab, but not if the user is on the home screen
        if ( !appModel.home && tabs ) {
          tabs[appModel.tab].model.step();
        }
        scene.updateScene();
      }
    })();
  } );
} );