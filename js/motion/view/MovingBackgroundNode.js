// Copyright 2002-2013, University of Colorado Boulder

/**
 * This class shows all of the moving background, including the mountains, clouds and brick tile on the ground.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Pattern = require( 'SCENERY/util/Pattern' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var imageLoader = require( 'imageLoader' );
  var linear = require( 'DOT/Util' ).linear;
  var Matrix3 = require( 'DOT/Matrix3' );
  var MotionConstants = require( 'motion/MotionConstants' );
  var Shape = require( 'KITE/Shape' );
  var Path = require( 'SCENERY/nodes/Path' );

  /**
   * Constructor for MovingBackgroundNode
   *
   * @param {MotionModel} model the model for the entire 'motion', 'friction' or 'acceleration' tab
   * @param layoutCenterX the location where the node should be centered horizontally
   * @constructor
   */
  function MovingBackgroundNode( model, layoutCenterX ) {
    var movingBackgroundNode = this;
    this.model = model;
    Node.call( this, { pickable: false } );

    var modWidth = 120 * 15;
    var L = modWidth / 2;

    //Add a background node at the specified X offset (pixels).  The distanceScale signifies how quickly it will scroll (mountains are far away so have a lower distanceScale)
    var addBackgroundNode = function( offset, node, distanceScale ) {
      movingBackgroundNode.addChild( node );
      var centering = layoutCenterX - node.width / 2;
      if ( centering === Number.POSITIVE_INFINITY ) {
        centering = 0;
      }
      model.positionProperty.link( function( position ) {
        var a = -position / distanceScale * MotionConstants.POSITION_SCALE + offset;
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
      return node;
    };
    var addBackgroundImage = function( offset, imageName, distanceScale, y, scale ) {
      var sprite = new Image( imageLoader.getImage( imageName ), {scale: scale, y: y, renderer: 'svg', rendererOptions: { cssTransform: true } } );
      return addBackgroundNode( offset, sprite, distanceScale );
    };

    //Add the mountains
    var mountainY = 311;
    addBackgroundImage( L / 2, 'mountains.png', 10, mountainY, 1 );
//    addBackgroundImage( L, 'mountains.png', 10, mountainY, 1 );
//    addBackgroundImage( -L / 3, 'mountains.png', 10, mountainY, 1 );

    //Add the clouds
    addBackgroundImage( 100, 'cloud1.png', 5, 10, 1 );
//    addBackgroundImage( 600, 'cloud1.png', 5, -30, 1 );
//    addBackgroundImage( 1200, 'cloud1.png', 5, 5, 0.9 );

    var tile = imageLoader.getImage( 'brick-tile.png' );
    var tileWidth = tile.width;

    //Add the ground, offset the pattern so that the it aligns with the brick image
    var tilePattern = new Pattern( tile );
    var ground = new Rectangle( 0, 0, tile.width * 14, tile.height, {fill: tilePattern } );
    var mod = ground.width / 14;
    var offset = layoutCenterX - ground.width / 2;

    //Rendering as a single image instead of a Pattern significantly improves performance on both iPad and Win8/Chrome
    ground.toImage( function( image ) {
      var imageNode = new Image( image, {y: mountainY + 50} );
      console.log( imageNode.width, imageNode.height );
      movingBackgroundNode.addChild( imageNode );
      model.positionProperty.link( function( position ) { imageNode.x = -position * MotionConstants.POSITION_SCALE % mod + offset; } );
    }, 0, 0, ground.width, ground.height );

    //Add the gravel and ice
    if ( !model.skateboard ) {

      //Add the gravel
      var gravel = new Rectangle( 0, 0, tile.width * 14, 4, {y: mountainY + 48} );
      model.positionProperty.link( function( position ) { gravel.x = -position * MotionConstants.POSITION_SCALE % mod + offset; } );
      this.addChild( gravel );

      //Add the ice
      var iceOverlay = new Rectangle( -400, mountainY + 50, tile.width * 15, tile.height, {fill: 'rgba(189,227,249,0.87)'} );
      var frictionZero = model.addDerivedProperty( 'frictionZero', ['friction'], function( friction ) {return friction === 0;} );
      var frictionNonZero = model.addDerivedProperty( 'frictionNonZero', ['friction'], function( friction ) {return friction !== 0;} );
      this.addChild( iceOverlay );
      model.frictionZeroProperty.linkAttribute( iceOverlay, 'visible' );

      //make sure gravel gets exactly removed if friction is zero.  Wasn't happening without this code, perhaps because of lazy callbacks and cached lastNumSpecks?
//      model.frictionNonZeroProperty.linkAttribute( gravel, 'visible' );

      var ice1 = addBackgroundImage( 100, 'icicle.png', 1, mountainY + 50 + tile.height, 0.8 );
      var ice2 = addBackgroundImage( -300, 'icicle.png', 1, mountainY + 50 + tile.height, 0.8 );

      model.frictionZeroProperty.linkAttribute( ice1, 'visible' );
      model.frictionZeroProperty.linkAttribute( ice2, 'visible' );

      movingBackgroundNode.lastNumSpecks = 0;

      //Create the gravel for nonzero friction.
      model.frictionProperty.link( function() {
        var height = 3;
        var numSpecks = linear( MotionConstants.MAX_FRICTION * 0.1, MotionConstants.MAX_FRICTION, 0, 400, model.friction );
        numSpecks = numSpecks < 0 ? 0 : numSpecks;

        //Use the same seed so it will look like the gravel is 'building up' instead of 'scrambling'
        Math.seedrandom( 'standardseed' );
        var node = new Node();
        for ( var i = 0; i < numSpecks / 2; i++ ) {
          node.addChild( new Rectangle( Math.floor( Math.random() * (tileWidth + 1) ), Math.floor( Math.random() * (height + 1) ), 1, 1, {fill: 'black'} ) );
        }

        for ( i = 0; i < numSpecks / 2; i++ ) {
          node.addChild( new Rectangle( Math.floor( Math.random() * (tileWidth + 1) ), Math.floor( Math.random() * (height + 1) ), 1, 1, {fill: 'gray'} ) );
        }

        for ( i = 0; i < numSpecks / 10; i++ ) {
          node.addChild( new Rectangle( Math.floor( Math.random() * (tileWidth + 1) ), Math.floor( Math.random() * (height + 1) ), 1, 1, {fill: 'white'} ) );
        }
        node.toImage( function( image ) { gravel.fill = new Pattern( image ); }, 0, 0, tileWidth, height );
      } );
    }
  }

  return inherit( Node, MovingBackgroundNode );
} );