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
  var mountainImage = require( 'image!FORCES_AND_MOTION_BASICS/mountains.png' );
  var brickTileImage = require( 'image!FORCES_AND_MOTION_BASICS/brick-tile.png' );
  var cloudImage = require( 'image!FORCES_AND_MOTION_BASICS/cloud1.png' );
  var icicleImage = require( 'image!FORCES_AND_MOTION_BASICS/icicle.png' );
  var linear = require( 'DOT/Util' ).linear;
  var MotionConstants = require( 'FORCES_AND_MOTION_BASICS/motion/MotionConstants' );

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

    Node.call( this, { pickable: false } );

    var L = 900;

    //Add a background node at the specified X offset (pixels).  The distanceScale signifies how quickly it will scroll (mountains are far away so have a lower distanceScale)
    var toBackgroundImage = function( offset, image, y, scale ) {
      var node = new Image( image, { scale: scale, x: offset, y: y } );
      node.boundsInaccurate = true;
      node.offsetX = offset;
      node.scaleFactor = scale;
      return node;
    };

    var stageWidth = L * 2;

    var mountainY = 311;

    //TODO: It would be good to use cssTransforms here but they are a bit buggy
    var mountainAndCloudLayer = new Node( {
      x: layoutCenterX,
      children: [
        toBackgroundImage( L / 2, mountainImage, mountainY, 1 ),
        toBackgroundImage( L, mountainImage, mountainY, 1 ),
        toBackgroundImage( -L / 3, mountainImage, mountainY, 1 ),
        toBackgroundImage( 0, cloudImage, 10, 0.7 ),
        toBackgroundImage( L - 100, cloudImage, -30, 0.8 ),
        toBackgroundImage( -L / 3 - 100, cloudImage, 5, 1 )
      ]
    } );
    mountainAndCloudLayer.boundsInaccurate = true;
    this.addChild( mountainAndCloudLayer );

    //Move the background objects
    //TODO: support background objects with scale !== 1

    var getLayerUpdater = function( layer, motionScale ) {
      var netDelta = 0;
      var children = layer.children;
      return function( position, oldPosition ) {
        var delta = -(position - oldPosition) * MotionConstants.POSITION_SCALE / motionScale;
        netDelta += delta;
        layer.translate( delta, 0 );

        var sign = position > oldPosition ? 1 : -1;
        for ( var i = 0; i < children.length; i++ ) {
          var child = children[ i ];

//        console.log( child.offsetX + netDelta );
          //model moving right
          if ( sign === 1 ) {
//            console.log( child.offsetX + netDelta, -800 );

            //TODO: use modulus instead of while loop
            while ( child.offsetX + netDelta < -L ) {
//              console.log( 'jump 1' );
              child.offsetX += stageWidth;
              child.translate( stageWidth / child.scaleFactor, 0 );
            }
          }

          //model moving left
          else {
//          console.log( child.offsetX + netDelta, L );

            //TODO: use modulus instead of while loop
            while ( child.offsetX + netDelta > L ) {
//              console.log( 'jump 2' );
              child.offsetX -= stageWidth;
              child.translate( -stageWidth / child.scaleFactor, 0 );
            }
          }
        }
      };
    };

    model.positionProperty.link( getLayerUpdater( mountainAndCloudLayer, 10 ) );

    var tileWidth = brickTileImage.width;

    //Add the ground, offset the pattern so that the it aligns with the brick image
    var tilePattern = new Pattern( brickTileImage );
    var ground = new Rectangle( 0, 0, brickTileImage.width * 14, brickTileImage.height, { fill: tilePattern } );
    var mod = ground.width / 14;
    var centerX = layoutCenterX - ground.width / 2;

    //Rendering as a single image instead of a Pattern significantly improves performance on both iPad and Win8/Chrome
    var showGround = true;
    if ( showGround ) {
      ground.toImage( function( image ) {
        var groundY = mountainY + 50;
        var groundImageNode = new Image( image, { y: groundY } );
        groundImageNode.boundsInaccurate = true;
        movingBackgroundNode.addChild( groundImageNode );
        model.positionProperty.link( function( position ) {
          groundImageNode.setTranslation( -position * MotionConstants.POSITION_SCALE % mod + centerX, groundY );
        } );

        //Add the gravel and ice.  Do this in the ground callback to keep the z-ordering correct
        if ( !model.skateboard ) {

          //Add the gravel
          var gravel = new Rectangle( 0, 0, brickTileImage.width * 14, 4, { y: -2 } );
          gravel.boundsInaccurate = true;

          //Adding the gravel directly to the moving ground makes the performance significantly faster on iPad3
          groundImageNode.addChild( gravel );

          //Add the ice
          var iceOverlay = new Rectangle( -400, groundY, brickTileImage.width * 15, brickTileImage.height, { fill: 'rgba(189,227,249,0.87)' } );
          iceOverlay.boundsInaccurate = true;
          model.addDerivedProperty( 'frictionZero', [ 'friction' ], function( friction ) {return friction === 0;} );
          model.addDerivedProperty( 'frictionNonZero', [ 'friction' ], function( friction ) {return friction !== 0;} );
          movingBackgroundNode.addChild( iceOverlay );
          model.frictionZeroProperty.linkAttribute( iceOverlay, 'visible' );

          //make sure gravel gets exactly removed if friction is zero, in case it improves performance.
          model.frictionNonZeroProperty.linkAttribute( gravel, 'visible' );

          var iceLayer = new Node( {
            children: [
              toBackgroundImage( 0, icicleImage, 0, 0.8 ),
              toBackgroundImage( 300, icicleImage, 0, 0.8 )
            ], x: layoutCenterX, y: groundY + ground.height
          } );
          iceLayer.boundsInaccurate = true;
          model.frictionZeroProperty.linkAttribute( iceLayer, 'visible' );
          movingBackgroundNode.addChild( iceLayer );

          //TODO: could prevent updater from firing if ice is not visible
          model.positionProperty.link( getLayerUpdater( iceLayer, 1 ) );

          movingBackgroundNode.lastNumSpecks = 0;

          var gravelSource = new Node();

          var numBlack = 0;
          var numGray = 0;
          var numWhite = 0;

          //Create the gravel for nonzero friction.
          model.frictionProperty.link( function( newFriction, oldFriction ) {

            //Discretize the friction so that the new nodes/images are not created at every step
            newFriction = newFriction * 100;
            newFriction = Math.round( newFriction / 2 ) * 2;
            newFriction = newFriction / 100;

            var height = 3;
            var numSpecks = linear( MotionConstants.MAX_FRICTION * 0.1, MotionConstants.MAX_FRICTION, 0, 400, newFriction );
            numSpecks = numSpecks < 0 ? 0 : numSpecks;

            var desiredBlack = Math.round( numSpecks / 2 );
            var desiredGray = Math.round( numSpecks / 2 );
            var desiredWhite = Math.round( numSpecks / 10 );

            if ( desiredBlack === numBlack && desiredGray === numGray && desiredWhite === numWhite ) {
              return;
            }

            while ( numBlack < desiredBlack ) {
              gravelSource.addChild( new Rectangle( Math.floor( Math.random() * (tileWidth + 1) ), Math.floor( Math.random() * (height + 1) ), 1, 1, { fill: 'black' } ) );
              numBlack++;
            }

            while ( numGray < desiredGray ) {
              gravelSource.addChild( new Rectangle( Math.floor( Math.random() * (tileWidth + 1) ), Math.floor( Math.random() * (height + 1) ), 1, 1, { fill: 'gray' } ) );
              numGray++;
            }

            while ( numWhite < desiredWhite ) {
              gravelSource.addChild( new Rectangle( Math.floor( Math.random() * (tileWidth + 1) ), Math.floor( Math.random() * (height + 1) ), 1, 1, { fill: 'white' } ) );
              numWhite++;
            }

            var children;
            var i;
            while ( numBlack > desiredBlack ) {
              children = gravelSource.getChildren();
              for ( i = children.length - 1; i >= 0; i-- ) {
                if ( children[ i ].fill === 'black' ) {
                  gravelSource.removeChildAt( i );
                  break;
                }
              }
              numBlack--;
            }

            while ( numGray > desiredGray ) {
              children = gravelSource.getChildren();
              for ( i = children.length - 1; i >= 0; i-- ) {
                if ( children[ i ].fill === 'gray' ) {
                  gravelSource.removeChildAt( i );
                  break;
                }
              }
              numGray--;
            }

            while ( numWhite > desiredWhite ) {
              children = gravelSource.getChildren();
              for ( i = children.length - 1; i >= 0; i-- ) {
                if ( children[ i ].fill === 'white' ) {
                  gravelSource.removeChildAt( i );
                  break;
                }
              }
              numWhite--;
            }

            //TODO: get rid of pattern here, possibly by converting it too to an image?
            gravelSource.toImage( function( image ) { gravel.fill = new Pattern( image ); }, 0, 0, tileWidth, height );
          } );
        }
      }, 0, 0, ground.width, ground.height );
    }
  }

  return inherit( Node, MovingBackgroundNode );
} );