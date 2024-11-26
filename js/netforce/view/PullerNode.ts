// Copyright 2013-2024, University of Colorado Boulder

/**
 * Shows the graphic for the puller, which can be dragged from the toolbox to the rope to apply force.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import { Image, ImageableImage } from '../../../../scenery/js/imports.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import Puller from '../model/Puller.js';
import NetForceModel from '../model/NetForceModel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Knot from '../model/Knot.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';

export default class PullerNode extends Image {
  public standImage: ImageableImage;

  /**
   * Create a PullerNode for the specified puller
   *
   * @param puller
   * @param model
   * @param image image of the puller standing upright
   * @param pullImage image of the puller exerting a force
   * @param pullerToolboxNode
   * @param tandem
   * @param [options]
   */
  public constructor(
    public readonly puller: Puller,
    model: NetForceModel,
    image: ImageableImage,
    public pullImage: ImageableImage,
    tandem: Tandem, options?: IntentionalAny ) {

    const x = puller.positionProperty.get().x;
    const y = puller.positionProperty.get().y;

    super( image, {
      tandem: tandem,
      x: x,
      y: y,
      cursor: 'pointer',
      scale: 0.86
    } );

    this.puller.node = this; //Wire up so node can be looked up by model element.
    this.standImage = image;

    model.startedProperty.link( () => {
      this.updateImage( puller, model );
      this.updatePosition( puller, model );
    } );
    puller.positionProperty.link( () => {
      this.updateImage( puller, model );
      this.updatePosition( puller, model );
    } );

    model.startedProperty.link( () => {
      this.updateImage( puller, model );
      this.updatePosition( puller, model );
    } );
    model.runningProperty.link( () => {
      this.updateImage( puller, model );
      this.updatePosition( puller, model );
    } );
    model.stateProperty.link( () => {
      this.updateImage( puller, model );
      this.updatePosition( puller, model );
    } );

    const dragListener = new SoundDragListener( {
        tandem: tandem.createTandem( 'dragListener' ),
        allowTouchSnag: true,
        positionProperty: puller.positionProperty,
        start: () => {

          // check to see if a puller is knotted - if it is, store the knot
          const knot = puller.knotProperty.get();

          // disconnect the puller from the knot and update the image
          puller.disconnect();
          this.updateImage( puller, model );

          // fire updates
          puller.draggingProperty.set( true );
          this.moveToFront();
          puller.draggedEmitter.emit();

          // if the puller was knotted, update the image position so that it is centered on the knot it was previously
          // grabbing
          if ( knot ) {
            this.updatePositionKnotted( puller, model, knot );
          }
        },
        end: () => {
          this.updatePosition( puller, model );
          puller.draggingProperty.set( false );
          puller.droppedEmitter.emit();
          this.updateImage( puller, model );
        }
      }
    );
    this.addInputListener( dragListener );

    model.resetAllEmitter.addListener( () => {
      this.updatePosition( puller, model );

      // cancel the drag
      if ( puller.draggingProperty.get() ) {
        dragListener.interrupt();

        puller.reset();
      }
    } );

    this.mutate( options );
  }

  /**
   * Update the position of the puller immediately after it has been clicked on after being removed from a knot
   * position.  Sets the translation of the puller relative to its previous knot position.  This knot position is
   * lost in updatePosition because the puller has already been disconnected from the knot by the time those functions
   * are called.
   *
   * @param puller
   * @param model
   * @param knot - the last knot that the puller was holding on to
   */
  private updatePositionKnotted( puller: Puller, model: NetForceModel, knot: Knot ): void {
    const blueOffset = this.puller.type === 'blue' ? -60 : 0;
    puller.positionProperty.set( new Vector2( knot.xProperty.get() + blueOffset, knot.y - this.height + 90 ) );
  }

  /**
   * Update the image puller image depending on whether the puller is knotted and pulling
   */
  public updateImage( puller: Puller, model: NetForceModel ): void {
    const knotted = puller.knotProperty.get();
    const pulling = model.startedProperty.get() && knotted && model.stateProperty.get() !== 'completed';
    this.image = pulling ? this.pullImage : this.standImage;
  }

  /**
   * Update the position of a puller depending on whether it is knotted and pulling.
   */
  public updatePosition( puller: Puller, model: NetForceModel ): void {
    const knotted = puller.knotProperty.get();
    const pulling = model.startedProperty.get() && knotted && model.stateProperty.get() !== 'completed';
    if ( knotted ) {
      const pullingOffset = pulling ? -puller.dragOffsetX : puller.standOffsetX;
      const blueOffset = this.puller.type === 'blue' ? -60 + 10 : 0;
      this.setTranslation( puller.knotProperty.get()!.xProperty.get() + pullingOffset + blueOffset, puller.knotProperty.get()!.y - this.height + 90 );
    }
    else {
      this.setTranslation( puller.positionProperty.get() );
    }
  }
}

forcesAndMotionBasics.register( 'PullerNode', PullerNode );