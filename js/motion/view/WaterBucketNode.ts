// Copyright 2013-2024, University of Colorado Boulder

/**
 * This phet.scenery.Node shows the interactive water bucket.  The user can drag it from the toolbox to the play area, and the water sloshes based on the
 * acceleration.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { Shape } from '../../../../kite/js/imports.js';
import { Image, ImageableImage, Path, Rectangle } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import Item from '../model/Item.js';
import MotionModel from '../model/MotionModel.js';
import ItemNode from './ItemNode.js';
import MotionScreenView from './MotionScreenView.js';

// constants
const linear = Utils.linear;

export default class WaterBucketNode extends ItemNode {

  /**
   * WaterBucketNode constructor
   *
   * @param model the model for the entire 'motion', 'friction' or 'acceleration' screen
   * @param motionView the view for the entire 'motion', 'friction' or 'acceleration' screen
   * @param item the model for the item itself
   * @param imageProperty imageProperty holds image to be shown when in the toolbox or being dragged
   * @param imageSittingProperty imageProperty holds image to be shown if it is a sitting person
   * @param imageHoldingProperty imageProperty holds image to be shown if it is a sitting person holding their arms in the air
   * @param showMassesProperty boolean property of whether the masses should be shown
   * @param toolboxNode parent toolbox for the WaterBucketNode
   * @param tandem
   */
  public constructor( model: MotionModel, motionView: MotionScreenView,
                      item: Item,
                      imageProperty: TReadOnlyProperty<ImageableImage>,
                      imageSittingProperty: TReadOnlyProperty<ImageableImage>,
                      imageHoldingProperty: TReadOnlyProperty<ImageableImage>,
                      showMassesProperty: TReadOnlyProperty<boolean>,
                      toolboxNode: Rectangle, tandem: Tandem ) {
    super( model, motionView, item, imageProperty, imageSittingProperty, imageHoldingProperty, showMassesProperty, toolboxNode, tandem );
    const waterPathNode = new Path( Shape.lineSegment( new Vector2( 0, 0 ), new Vector2( 0, 18 ) ), {
      stroke: 'black',
      fill: 'rgb(9, 125, 159)',
      lineWidth: 1
    } );
    this.addChild( waterPathNode );
    waterPathNode.moveToBack();

    //Keep track of the history to show a momentum-based "sloshing" effect
    const history: number[] = [];

    //Metrics based on original image size of 98 pixels wide.
    const padX = 4.5;
    const padY = 9;

    const imageWidth = new Image( imageProperty.value ).width;
    const s = imageWidth / 98.0;

    const leftLineX = ( x: number ) => linear( 0, 1, ( 1 + padX ) * s, ( 10 + padX ) * s, x );
    const leftLineY = ( x: number ) => linear( 0, 1, ( 9 - padY ) * s, ( 102 - padY ) * s, x );

    const rightLineX = ( x: number ) => linear( 1, 0, ( 87 - padX ) * s, ( 96 - padX ) * s, x );
    const rightLineY = ( x: number ) => linear( 1, 0, ( 102 - padY ) * s, ( 9 - padY ) * s, x );

    const min = 0.5; //Water level when acceleration = 0

    //When the model steps in time, update the water shape
    //The delta value is the critical value in determining the water shape.
    //Compute it separately as a guard against reshaping the water bucket node when the shape hasn't really changed
    const deltaProperty = new DerivedProperty( [ model.timeProperty, item.draggingProperty, model.accelerationProperty ], ( time, dragging, acceleration ) => {

      // if the bucket is being dragged, we want delta to be zero, regardless of
      // whether or not the sim is running
      if ( dragging ) {
        return 0;
      }

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