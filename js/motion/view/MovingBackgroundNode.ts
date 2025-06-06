// Copyright 2013-2025, University of Colorado Boulder

/**
 * This class shows all the moving backgrounds, including the mountains, clouds and brick tile on the ground.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */


import dotRandom from '../../../../dot/js/dotRandom.js';
// modules
import Utils from '../../../../dot/js/Utils.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import { ImageableImage } from '../../../../scenery/js/nodes/Imageable.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Pattern from '../../../../scenery/js/util/Pattern.js';
import brickTile_png from '../../../images/brickTile_png.js';
import cloud1_svg from '../../../images/cloud1_svg.js';
import icicle_png from '../../../images/icicle_png.js';
import mountains_svg from '../../../images/mountains_svg.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import MotionModel from '../model/MotionModel.js';
import MotionConstants from '../MotionConstants.js';

// constants
const linear = Utils.linear;

export default class MovingBackgroundNode extends Node {
  private lastNumSpecks = 0;

  /**
   * Constructor for MovingBackgroundNode
   *
   * @param model the model for the entire 'motion', 'friction' or 'acceleration' screen
   * @param layoutCenterX the position where the node should be centered horizontally
   * @param tandem
   */
  public constructor( private readonly model: MotionModel, layoutCenterX: number ) {

    super( {
      pickable: false,
      preventFit: true
    } );

    const L = 900;

    //Add a background node at the specified X offset (pixels).  The distanceScale signifies how quickly it will scroll (mountains are far away so have a lower distanceScale)
    const toBackgroundImage = ( offset: number, image: ImageableImage, y: number, scale: number, tandemName: string ) => new Image( image, {
      scale: scale,
      x: offset,
      y: y
    } );

    const mountainY = 311;

    const mountainAndCloudLayer = new Node( {
      x: layoutCenterX,
      children: [
        toBackgroundImage( L / 2, mountains_svg, mountainY, 0.84, 'mountainImage1' ),
        toBackgroundImage( L, mountains_svg, mountainY, 0.84, 'mountainImage2' ),
        toBackgroundImage( -L / 3, mountains_svg, mountainY, 0.84, 'mountainImage3' ),
        toBackgroundImage( 0, cloud1_svg, 10, 0.545, 'cloudImage1' ),
        toBackgroundImage( L - 100, cloud1_svg, -30, 0.62, 'cloudImage2' ),
        toBackgroundImage( -L / 3 - 100, cloud1_svg, 5, 0.78, 'cloudImage3' )
      ]
    } );
    this.addChild( mountainAndCloudLayer );

    // Move the background objects
    const getLayerUpdater = ( layer: Node, motionScale: number ) => {
      return ( position: number, oldPosition: number ) => {
        const delta = -( position - oldPosition ) * MotionConstants.POSITION_SCALE / motionScale;
        layer.translate( delta, 0 );
      };
    };
    model.positionProperty.link( () => getLayerUpdater( mountainAndCloudLayer, 10 ) );

    const tileWidth = brickTile_png.width;

    // Add the ground, offset the pattern so that the it aligns with the brick image
    const tilePattern = new Pattern( brickTile_png );
    const ground = new Rectangle( 0, 0, brickTile_png.width * 14, brickTile_png.height, { fill: tilePattern } );
    const mod = ground.width / 14;
    const centerX = layoutCenterX - ground.width / 2;

    // Rendering as a single image instead of a Pattern significantly improves performance on both iPad and Win8/Chrome
    const showGround = true;
    if ( showGround ) {
      ground.toImage( image => {
        const groundY = mountainY + 50;
        const groundImageNode = new Image( image, {
          y: groundY
        } );
        this.addChild( groundImageNode );
        model.positionProperty.link( position => {
          groundImageNode.setTranslation( -position * MotionConstants.POSITION_SCALE % mod + centerX, groundY );
        } );

        // Add the gravel and ice.  Do this in the ground callback to keep the z-ordering correct
        if ( !model.skateboard ) {

          // Add the gravel
          const gravel = new Rectangle( 0, 0, brickTile_png.width * 14, 4, { y: -2 } );

          // Adding the gravel directly to the moving ground makes the performance significantly faster on iPad3
          groundImageNode.addChild( gravel );

          // Add the ice
          const iceOverlay = new Rectangle( -400, groundY, brickTile_png.width * 15, brickTile_png.height, { fill: 'rgba(189,227,249,0.87)' } );
          this.addChild( iceOverlay );
          model.frictionZeroProperty.linkAttribute( iceOverlay, 'visible' );

          // make sure gravel gets exactly removed if friction is zero, in case it improves performance.
          model.frictionNonZeroProperty.linkAttribute( gravel, 'visible' );

          const iceLayer = new Node( {
            children: [
              toBackgroundImage( 0, icicle_png, 0, 0.8, 'iceImageNode1' ),
              toBackgroundImage( 300, icicle_png, 0, 0.8, 'iceImageNode2' )
            ], x: layoutCenterX, y: groundY + ground.height
          } );
          model.frictionZeroProperty.linkAttribute( iceLayer, 'visible' );
          this.addChild( iceLayer );

          model.positionProperty.link( () => getLayerUpdater( iceLayer, 1 ) );

          const gravelSource = new Node();

          let numBlack = 0;
          let numGray = 0;
          let numWhite = 0;

          //Create the gravel for nonzero friction.
          model.frictionCoefficientProperty.link( ( newFriction, oldFriction ) => {

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
              children = gravelSource.getChildren() as Path[];
              for ( i = children.length - 1; i >= 0; i-- ) {
                if ( children[ i ].fill === 'black' ) {
                  gravelSource.removeChildAt( i );
                  break;
                }
              }
              numBlack--;
            }

            while ( numGray > desiredGray ) {
              children = gravelSource.getChildren() as Path[];
              for ( i = children.length - 1; i >= 0; i-- ) {
                if ( children[ i ].fill === 'gray' ) {
                  gravelSource.removeChildAt( i );
                  break;
                }
              }
              numGray--;
            }

            while ( numWhite > desiredWhite ) {
              children = gravelSource.getChildren() as Path[];
              for ( i = children.length - 1; i >= 0; i-- ) {
                if ( children[ i ].fill === 'white' ) {
                  gravelSource.removeChildAt( i );
                  break;
                }
              }
              numWhite--;
            }

            gravelSource.toImage( image => { gravel.fill = new Pattern( image ); }, 0, 0, tileWidth, height );
          } );
        }
      }, 0, 0, ground.width, ground.height );
    }
  }
}

forcesAndMotionBasics.register( 'MovingBackgroundNode', MovingBackgroundNode );