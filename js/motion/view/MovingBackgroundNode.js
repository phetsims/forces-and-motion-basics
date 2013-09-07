// Copyright 2002-2013, University of Colorado Boulder

/**
 * This class shows all of the moving background, including the mountains, clouds and brick tile on the ground.
 *
 * Performance notes:
 * Using .boundsInaccurate = true; seems to save about 1 ms during rendering on the iPad3
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
  var forcesAndMotionBasicsImages = require( 'FORCES_AND_MOTION_BASICS/forces-and-motion-basics-images' );
  var linear = require( 'DOT/Util' ).linear;
  var Matrix3 = require( 'DOT/Matrix3' );
  var MotionConstants = require( 'FORCES_AND_MOTION_BASICS/motion/MotionConstants' );
  var Shape = require( 'KITE/Shape' );
  var Path = require( 'SCENERY/nodes/Path' );

  /**
   * Constructor for MovingBackgroundNode
   *
   * @param {MotionModel} model the model for the entire 'motion', 'friction' or 'acceleration' screen
   * @param layoutCenterX the location where the node should be centered horizontally
   * @constructor
   */
  function MovingBackgroundNode( model, layoutCenterX ) {
    var movingBackgroundNode = this;
    this.model = model;

    //Using low-density canvas here instead of svg saves about 8ms per frame
    Node.call( this, { renderer: 'svg', pickable: false } );

    var L = 900;

    //Add a background node at the specified X offset (pixels).  The distanceScale signifies how quickly it will scroll (mountains are far away so have a lower distanceScale)
    var toBackgroundImage = function( offset, imageName, distanceScale, y, scale, visibleProperty ) {
      var node = new Image( forcesAndMotionBasicsImages.getImage( imageName ), {scale: scale, x: offset, y: y, rendererOptions: {cssTransform: true}} );
      node.boundsInaccurate = true;
      node.offsetX = offset;
      node.scaleFactor = scale;
      return node;
    };

    var netDelta = 0;

    var stageWidth = L * 2;

    var mountainY = 311;
    var children = [toBackgroundImage( L / 2, 'mountains.png', 10, mountainY, 1 ),
      toBackgroundImage( L, 'mountains.png', 10, mountainY, 1 ),
      toBackgroundImage( -L / 3, 'mountains.png', 10, mountainY, 1 ),
      toBackgroundImage( 0, 'cloud1.png', 10, 10, 0.7 ),
      toBackgroundImage( L - 100, 'cloud1.png', 10, -30, 0.8 ),
      toBackgroundImage( -L / 3 - 100, 'cloud1.png', 10, 5, 1 )];

    //TODO: It would be good to use cssTransforms here but they are a bit buggy
    var mountainAndCloudLayer = new Node( {x: layoutCenterX, children: children, renderer: 'svg'} );
    this.addChild( mountainAndCloudLayer );

    //Move the background objects
    //TODO: support background objects with scale !== 1
    model.positionProperty.link( function( position, oldPosition ) {
      var delta = -(position - oldPosition) * MotionConstants.POSITION_SCALE / 2;
      netDelta += delta;
      mountainAndCloudLayer.translate( delta, 0 );

      var sign = position > oldPosition ? 1 : -1;
      for ( var i = 0; i < children.length; i++ ) {
        var child = children[i];

//        console.log( child.offsetX + netDelta );
        //model moving right
        if ( sign === 1 ) {
//          console.log( child.offsetX + netDelta, -800 );

          //TODO: use modulus instead of while loop
          while ( child.offsetX + netDelta < -L ) {
//            console.log( 'jump 1' );
            child.offsetX += stageWidth;
            child.translate( stageWidth / child.scaleFactor, 0 );
          }
        }

        //model moving left
        else {
//          console.log( child.offsetX + netDelta, L );

          //TODO: use modulus instead of while loop
          while ( child.offsetX + netDelta > L ) {
//            console.log( 'jump 2' );
            child.offsetX -= stageWidth;
            child.translate( -stageWidth / child.scaleFactor, 0 );
          }
        }
      }
    } );

    var tile = forcesAndMotionBasicsImages.getImage( 'brick-tile.png' );
    var tileWidth = tile.width;

    //Add the ground, offset the pattern so that the it aligns with the brick image
    var tilePattern = new Pattern( tile );
    var ground = new Rectangle( 0, 0, tile.width * 14, tile.height, {fill: tilePattern } );
    var mod = ground.width / 14;
    var centerX = layoutCenterX - ground.width / 2;

    //Rendering as a single image instead of a Pattern significantly improves performance on both iPad and Win8/Chrome
    ground.toImage( function( image ) {
      var groundY = mountainY + 50;
      var groundImageNode = new Image( image, {y: groundY, rendererOptions: {cssTransform: true}} );
      groundImageNode.boundsInaccurate = true;
      movingBackgroundNode.addChild( groundImageNode );
      model.positionProperty.link( function( position ) {
        groundImageNode.setTranslation( -position * MotionConstants.POSITION_SCALE % mod + centerX, groundY );
      } );

      //Add the gravel and ice.  Do this in the ground callback to keep the z-ordering correct
      if ( !model.skateboard ) {

        //Add the gravel
        var gravel = new Rectangle( 0, 0, tile.width * 14, 4, {y: -2, rendererOptions: {cssTransform: true}} );
        gravel.boundsInaccurate = true;

        //Adding the gravel directly to the moving ground makes the performance significantly faster on iPad3
        groundImageNode.addChild( gravel );

        //Add the ice
        var iceOverlay = new Rectangle( -400, groundY, tile.width * 15, tile.height, {fill: 'rgba(189,227,249,0.87)', rendererOptions: {cssTransform: true}} );
        iceOverlay.boundsInaccurate = true;
        var frictionZero = model.addDerivedProperty( 'frictionZero', ['friction'], function( friction ) {return friction === 0;} );
        var frictionNonZero = model.addDerivedProperty( 'frictionNonZero', ['friction'], function( friction ) {return friction !== 0;} );
        movingBackgroundNode.addChild( iceOverlay );
        model.frictionZeroProperty.linkAttribute( iceOverlay, 'visible' );

        //make sure gravel gets exactly removed if friction is zero.  Wasn't happening without this code, perhaps because of lazy callbacks and cached lastNumSpecks?
//      model.frictionNonZeroProperty.linkAttribute( gravel, 'visible' );

        //TODO: Add back support for ice after refactoring the main background callback.  Perhaps the ice will be children of the ground layer itself.
        var ice1 = toBackgroundImage( 100, 'icicle.png', 1, groundY + tile.height, 0.8, model.frictionZeroProperty );
        var ice2 = toBackgroundImage( -300, 'icicle.png', 1, groundY + tile.height, 0.8, model.frictionZeroProperty );

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
    }, 0, 0, ground.width, ground.height );
  }

  return inherit( Node, MovingBackgroundNode );
} );