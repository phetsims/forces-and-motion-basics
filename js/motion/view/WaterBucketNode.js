// Copyright 2013-2023, University of Colorado Boulder

/**
 * This phet.scenery.Node shows the interactive water bucket.  The user can drag it from the toolbox to the play area, and the water sloshes based on the acceleration.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { Shape } from '../../../../kite/js/imports.js';
import { Path } from '../../../../scenery/js/imports.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ItemNode from './ItemNode.js';

// constants
const linear = Utils.linear;

class WaterBucketNode extends ItemNode {

  /**
   * WaterBucketNode constructor
   *
   * @param {MotionModel} model the model for the entire 'motion', 'friction' or 'acceleration' screen
   * @param {MotionScreenView} motionView the view for the entire 'motion', 'friction' or 'acceleration' screen
   * @param {Item} item the model for the item itself
   * @param {Image} image image to be shown when in the toolbox or being dragged
   * @param {Image} imageSitting image to be shown if it is a sitting person
   * @param {Image} imageHolding image to be shown if it is a sitting person holding their arms in the air
   * @param {Property} showMassesProperty boolean property of whether the masses should be shown
   * @param {Rectangle} toolboxNode parent toolbox for the WaterBucketNode
   * @param {Tandem} tandem
   */
  constructor( model, motionView, item, image, imageSitting, imageHolding, showMassesProperty, toolboxNode, tandem ) {
    super( model, motionView, item, image, imageSitting, imageHolding, showMassesProperty, toolboxNode, tandem );
    this.item = item;
    const waterPathNode = new Path( Shape.lineSegment( new Vector2( 0, 0 ), new Vector2( 0, 18 ) ), {
      stroke: 'black',
      fill: 'rgb(9, 125, 159)',
      lineWidth: 1,
      tandem: tandem.createTandem( 'waterPathNode' )
    } );
    this.addChild( waterPathNode );
    waterPathNode.moveToBack();

    //Keep track of the history to show a momentum-based "sloshing" effect
    const history = [];

    //Metrics based on original image size of 98 pixels wide.
    const padX = 4.5;
    const padY = 9;
    const s = image.width / 98.0;

    const leftLineX = x => linear( 0, 1, ( 1 + padX ) * s, ( 10 + padX ) * s, x );
    const leftLineY = x => linear( 0, 1, ( 9 - padY ) * s, ( 102 - padY ) * s, x );

    const rightLineX = x => linear( 1, 0, ( 87 - padX ) * s, ( 96 - padX ) * s, x );
    const rightLineY = x => linear( 1, 0, ( 102 - padY ) * s, ( 9 - padY ) * s, x );

    const min = 0.5; //Water level when acceleration = 0

    //When the model steps in time, update the water shape
    //The delta value is the critical value in determining the water shape.
    //Compute it separately as a guard against reshaping the water bucket node when the shape hasn't really changed
    const deltaProperty = new DerivedProperty( [ model.timeProperty, item.draggingProperty ], ( time, dragging ) => {

      // if the bucket is being dragged, we want delta to be zero, regardless of
      // whether or not the sim is running
      if ( dragging ) {
        return 0;
      }

      const acceleration = model.accelerationProperty.get();
      history.push( acceleration );
      while ( history.length > 7 ) {
        history.shift();//remove front item
      }

      let sum = 0;
      for ( let i = 0; i < history.length; i++ ) {
        sum += history[ i ];
      }
      const composite = sum / history.length;

      return model.isInStack( item ) ? -composite / 50 : 0;
    } );

    //When the shape has really changed, update the water node
    deltaProperty.link( delta => {

      const path = new Shape();
      path.moveTo( leftLineX( min + delta ), leftLineY( min + delta ) );
      path.lineTo( leftLineX( 1 ), leftLineY( 1 ) );
      path.lineTo( rightLineX( 1 ), rightLineY( 1 ) );
      path.lineTo( rightLineX( min - delta ), rightLineY( min - delta ) );
      path.close();

      waterPathNode.shape = path;
    } );
  }
}

forcesAndMotionBasics.register( 'WaterBucketNode', WaterBucketNode );

export default WaterBucketNode;