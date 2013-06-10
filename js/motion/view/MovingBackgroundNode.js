/**
 * This class shows all of the moving background, including the mountains, clouds and brick tile on the ground.
 */
define( function( require ) {
  "use strict";
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Pattern = require( 'SCENERY/util/Pattern' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ItemNode = require( 'motion/view/ItemNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var imageLoader = require( 'imageLoader' );
  var linear = require( 'DOT/Util' ).linear;
  var Matrix3 = require( 'DOT/Matrix3' );
  var MotionConstants = require( 'motion/MotionConstants' );
  var Shape = require( 'KITE/Shape' );
  var Path = require( 'SCENERY/nodes/Path' );

  function MovingBackgroundNode( model, layoutCenterX ) {
    var movingBackgroundNode = this;
    this.model = model;
    Node.call( this );

    var modWidth = 120 * 15;
    var L = modWidth / 2;
    var addBackgroundNode = function( offset, node, distanceScale ) {
      movingBackgroundNode.addChild( node );
      var centering = layoutCenterX - node.width / 2;
      if ( centering === Number.POSITIVE_INFINITY ) {
        centering = 0;
      }
      model.positionProperty.link( function( position ) {
        var a = -position / distanceScale * MotionConstants.positionScale + offset;
        var n, z;

        //A function that maps values as such:
        //0=>0
        //1=>1
        //-1 => -1
        //L+a => -L+a
        //-L-a => L-a
        if ( a < -L ) {
          //put 'a' between -L and +L by adding an integral number of 2L
          //How many 2L to add to put a back above -L?
          //2L*n+ a >= -L
          //2L*n >= -L - a
          //n >= -(L+a)/2L
          n = Math.ceil( -(L + a) / 2 / L );
          z = n * 2 * L + a;
          node.x = z + centering;
        }
        else if ( a < L ) {
          node.x = a + centering;
        }
        else {
          //Put 'a' between -L and +L by subtracting an integral number of 2L
          //a - 2*L*n <= L
          //-2L*n <= L - a
          //n >= (L-a)/2L
          n = Math.floor( (L + a) / 2 / L );
          z = a - 2 * L * n;
          node.x = z + centering;
        }
      } );
    };
    var addBackgroundImage = function( offset, imageName, distanceScale, y, scale ) {
      var sprite = new Image( imageLoader.getImage( imageName ), {scale: scale, y: y} );
      addBackgroundNode( offset, sprite, distanceScale );
    };

    var mountainY = 311;
    addBackgroundImage( L / 2, 'mountains.png', 10, mountainY, 1 );
    addBackgroundImage( L, 'mountains.png', 10, mountainY, 1 );
    addBackgroundImage( -L / 3, 'mountains.png', 10, mountainY, 1 );

    addBackgroundImage( 100, 'cloud1.png', 5, 10, 1 );
    addBackgroundImage( 600, 'cloud1.png', 5, -30, 1 );
    addBackgroundImage( 1200, 'cloud1.png', 5, 5, 0.9 );

    //We tested that Pattern has superior performance to a large cached image
    var tile = imageLoader.getImage( 'brick-tile.png' );
    var tileWidth = tile.width;

    //offset the pattern so that the it aligns with the brick image
    var tilePattern = new Pattern( tile );
    var ground = new Rectangle( 0, 0, tile.width * 12, tile.height, {fill: tilePattern, y: mountainY + 50 } );

//    var groundOriginMarker = new Rectangle( 0, mountainY + 50 + patternOffsetY, tile.width * 12, tile.height, {stroke: 'black'} );
//    ground.addChild(groundOriginMarker);

    var xAxis = new Path( {shape: Shape.lineSegment( 10, 0, -10, 0 ), stroke: 'red'} );
    var yAxis = new Path( {shape: Shape.lineSegment( 0, -10, 0, 10 ), stroke: 'red'} );
    ground.addChild( xAxis );
    ground.addChild( yAxis );

    var mod = ground.width / 12;
    var offset = layoutCenterX - ground.width / 2;
    model.positionProperty.link( function( position ) { ground.x = -position * MotionConstants.positionScale % mod + offset; } );
    this.addChild( ground );

    var gravel = new Rectangle( 0, 0, tile.width * 12, 5, {y: mountainY + 50 - 5} );
    model.positionProperty.link( function( position ) { gravel.x = -position * MotionConstants.positionScale % mod + offset; } );
    this.addChild( gravel );

    //Add the gravel and ice
    if ( !model.skateboard ) {

      var iceOverlay = new Rectangle( -200, mountainY + 50, tile.width * 12, tile.height, {fill: 'rgba(189,227,249,0.87)'} );
      var frictionZero = model.addDerivedProperty( 'frictionZero', ['friction'], function( friction ) {return friction === 0;} );
      var frictionNonZero = model.addDerivedProperty( 'frictionNonZero', ['friction'], function( friction ) {return friction !== 0;} );
      this.addChild( iceOverlay );
      model.frictionZeroProperty.linkAttribute( iceOverlay, 'visible' );

      //make sure gravel gets exactly removed if friction is zero.  Wasn't happening without this code, perhaps because of lazy callbacks and cached lastNumSpecks?
      model.frictionNonZeroProperty.linkAttribute( gravel, 'visible' );

      movingBackgroundNode.lastNumSpecks = 0;

      model.frictionProperty.link( function() {
        var maxFriction = 2;
        var width = tileWidth;
        var height = 5;
        var numSpecks = linear( maxFriction * 0.1, maxFriction, 0, 300, model.friction );
        numSpecks = numSpecks < 0 ? 0 : numSpecks;

        //Save computation, esp. for older machines
        if ( numSpecks === movingBackgroundNode.lastNumSpecks ) {return;}

        var node = new Node();
        for ( var i = 0; i < numSpecks / 2; i++ ) {
          node.addChild( new Rectangle( Math.floor( Math.random() * (width + 1) ), Math.floor( Math.random() * (height + 1) ), 1, 1, {fill: 'black'} ) );
        }

        for ( i = 0; i < numSpecks / 2; i++ ) {
          node.addChild( new Rectangle( Math.floor( Math.random() * (width + 1) ), Math.floor( Math.random() * (height + 1) ), 1, 1, {fill: 'gray'} ) );
        }

        for ( i = 0; i < numSpecks / 10; i++ ) {
          node.addChild( new Rectangle( Math.floor( Math.random() * (width + 1) ), Math.floor( Math.random() * (height + 1) ), 1, 1, {fill: 'white'} ) );
        }
        node.toImage( function( image ) { gravel.fill = new Pattern( image ); }, 0, 0, width, height );
        movingBackgroundNode.lastNumSpecks = numSpecks;
      } );
    }
  }

  inherit( Node, MovingBackgroundNode );

  return MovingBackgroundNode;
} );