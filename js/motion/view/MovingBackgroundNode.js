// Copyright 2013-2022, University of Colorado Boulder

/**
 * This class shows all of the moving background, including the mountains, clouds and brick tile on the ground.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */


import dotRandom from '../../../../dot/js/dotRandom.js';
// modules
import Utils from '../../../../dot/js/Utils.js';
import { Image, Node, Pattern, Rectangle } from '../../../../scenery/js/imports.js';
import brickTile_png from '../../../images/brickTile_png.js';
import cloud1_png from '../../../images/cloud1_png.js';
import icicle_png from '../../../images/icicle_png.js';
import mountains_png from '../../../images/mountains_png.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import MotionConstants from '../MotionConstants.js';

// constants
const linear = Utils.linear;

class MovingBackgroundNode extends Node {

  /**
   * Constructor for MovingBackgroundNode
   *
   * @param {MotionModel} model the model for the entire 'motion', 'friction' or 'acceleration' screen
   * @param {number} layoutCenterX the position where the node should be centered horizontally
   * @param {Tandem} tandem
   */
  constructor( model, layoutCenterX, tandem ) {

    super( {
      pickable: false,
      preventFit: true,
      tandem: tandem
    } );
    this.model = model;

    const L = 900;

    //Add a background node at the specified X offset (pixels).  The distanceScale signifies how quickly it will scroll (mountains are far away so have a lower distanceScale)
    const toBackgroundImage = ( offset, image, y, scale, tandemName ) => {

      const node = new Image( image, {
        scale: scale,
        x: offset,
        y: y,
        tandem: tandem.createTandem( tandemName )
      } );
      node.offsetX = offset;
      node.scaleFactor = scale;
      return node;
    };

    const stageWidth = L * 2;

    const mountainY = 311;

    //TODO: It would be good to use cssTransforms here but they are a bit buggy
    const mountainAndCloudLayer = new Node( {
      tandem: tandem.createTandem( 'mountainAndCloudLayer' ),
      x: layoutCenterX,
      children: [
        toBackgroundImage( L / 2, mountains_png, mountainY, 1, 'mountainImage1' ),
        toBackgroundImage( L, mountains_png, mountainY, 1, 'mountainImage2' ),
        toBackgroundImage( -L / 3, mountains_png, mountainY, 1, 'mountainImage3' ),
        toBackgroundImage( 0, cloud1_png, 10, 0.7, 'cloudImage1' ),
        toBackgroundImage( L - 100, cloud1_png, -30, 0.8, 'cloudImage2' ),
        toBackgroundImage( -L / 3 - 100, cloud1_png, 5, 1, 'cloudImage3' )
      ]
    } );
    this.addChild( mountainAndCloudLayer );

    //Move the background objects
    //TODO: support background objects with scale !== 1

    const getLayerUpdater = ( layer, motionScale ) => {
      let netDelta = 0;
      const children = layer.children;
      return ( position, oldPosition ) => {
        const delta = -( position - oldPosition ) * MotionConstants.POSITION_SCALE / motionScale;
        netDelta += delta;
        layer.translate( delta, 0 );

        const sign = position > oldPosition ? 1 : -1;
        for ( let i = 0; i < children.length; i++ ) {
          const child = children[ i ];

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

    const tileWidth = brickTile_png.width;

    //Add the ground, offset the pattern so that the it aligns with the brick image
    const tilePattern = new Pattern( brickTile_png );
    const ground = new Rectangle( 0, 0, brickTile_png.width * 14, brickTile_png.height, { fill: tilePattern } );
    const mod = ground.width / 14;
    const centerX = layoutCenterX - ground.width / 2;

    //Rendering as a single image instead of a Pattern significantly improves performance on both iPad and Win8/Chrome
    const showGround = true;
    if ( showGround ) {
      ground.toImage( image => {
        const groundY = mountainY + 50;
        const groundImageNode = new Image( image, {
          y: groundY,
          tandem: tandem.createTandem( 'groundImageNode' )
        } );
        this.addChild( groundImageNode );
        model.positionProperty.link( position => {
          groundImageNode.setTranslation( -position * MotionConstants.POSITION_SCALE % mod + centerX, groundY );
        } );

        //Add the gravel and ice.  Do this in the ground callback to keep the z-ordering correct
        if ( !model.skateboard ) {

          //Add the gravel
          const gravel = new Rectangle( 0, 0, brickTile_png.width * 14, 4, { y: -2 } );

          //Adding the gravel directly to the moving ground makes the performance significantly faster on iPad3
          groundImageNode.addChild( gravel );

          //Add the ice
          const iceOverlay = new Rectangle( -400, groundY, brickTile_png.width * 15, brickTile_png.height, { fill: 'rgba(189,227,249,0.87)' } );
          this.addChild( iceOverlay );
          model.frictionZeroProperty.linkAttribute( iceOverlay, 'visible' );

          //make sure gravel gets exactly removed if friction is zero, in case it improves performance.
          model.frictionNonZeroProperty.linkAttribute( gravel, 'visible' );

          const iceLayer = new Node( {
            tandem: tandem.createTandem( 'iceLayer' ),
            children: [
              toBackgroundImage( 0, icicle_png, 0, 0.8, 'iceImageNode1' ),
              toBackgroundImage( 300, icicle_png, 0, 0.8, 'iceImageNode2' )
            ], x: layoutCenterX, y: groundY + ground.height
          } );
          model.frictionZeroProperty.linkAttribute( iceLayer, 'visible' );
          this.addChild( iceLayer );

          //TODO: could prevent updater from firing if ice is not visible
          model.positionProperty.link( getLayerUpdater( iceLayer, 1 ) );

          this.lastNumSpecks = 0;

          const gravelSource = new Node( {
            tandem: tandem.createTandem( 'gravelSource' )
          } );

          let numBlack = 0;
          let numGray = 0;
          let numWhite = 0;

          //Create the gravel for nonzero friction.
          model.frictionProperty.link( ( newFriction, oldFriction ) => {

            //Discretize the friction so that the new nodes/images are not created at every step
            newFriction = newFriction * 100;
            newFriction = Utils.roundSymmetric( newFriction / 2 ) * 2;
            newFriction = newFriction / 100;

            const height = 3;
            let numSpecks = linear( MotionConstants.MAX_FRICTION * 0.1, MotionConstants.MAX_FRICTION, 0, 400, newFriction );
            numSpecks = numSpecks < 0 ? 0 : numSpecks;

            const desiredBlack = Utils.roundSymmetric( numSpecks / 2 );
            const desiredGray = Utils.roundSymmetric( numSpecks / 2 );
            const desiredWhite = Utils.roundSymmetric( numSpecks / 10 );

            if ( desiredBlack === numBlack && desiredGray === numGray && desiredWhite === numWhite ) {
              return;
            }

            while ( numBlack < desiredBlack ) {
              gravelSource.addChild( new Rectangle( Math.floor( dotRandom.nextDouble() * ( tileWidth + 1 ) ), Math.floor( dotRandom.nextDouble() * ( height + 1 ) ), 1, 1, { fill: 'black' } ) );
              numBlack++;
            }

            while ( numGray < desiredGray ) {
              gravelSource.addChild( new Rectangle( Math.floor( dotRandom.nextDouble() * ( tileWidth + 1 ) ), Math.floor( dotRandom.nextDouble() * ( height + 1 ) ), 1, 1, { fill: 'gray' } ) );
              numGray++;
            }

            while ( numWhite < desiredWhite ) {
              gravelSource.addChild( new Rectangle( Math.floor( dotRandom.nextDouble() * ( tileWidth + 1 ) ), Math.floor( dotRandom.nextDouble() * ( height + 1 ) ), 1, 1, { fill: 'white' } ) );
              numWhite++;
            }

            let children;
            let i;
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
            gravelSource.toImage( image => { gravel.fill = new Pattern( image ); }, 0, 0, tileWidth, height );
          } );
        }
      }, 0, 0, ground.width, ground.height );
    }
  }
}

forcesAndMotionBasics.register( 'MovingBackgroundNode', MovingBackgroundNode );

export default MovingBackgroundNode;
