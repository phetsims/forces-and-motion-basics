// Copyright 2013-2025, University of Colorado Boulder

/**
 * Shows the graphic for the puller, which can be dragged from the toolbox to the rope to apply force.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import Image, { ImageOptions } from '../../../../scenery/js/nodes/Image.js';
import { ImageableImage } from '../../../../scenery/js/nodes/Imageable.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import Knot from '../model/Knot.js';
import NetForceModel from '../model/NetForceModel.js';
import Puller from '../model/Puller.js';

type SelfOptions = EmptySelfOptions;
type PullerNodeOptions = ImageOptions & SelfOptions;

export default class PullerNode extends Image {
  public standImage: ImageableImage;
  private readonly dragListener: SoundDragListener;

  /**
   * Create a PullerNode for the specified puller
   *
   * @param puller
   * @param model
   * @param image image of the puller standing upright
   * @param pullImage image of the puller exerting a force
   * @param [providedOptions]
   */
  public constructor(
    public readonly puller: Puller,
    model: NetForceModel,
    image: ImageableImage,
    public pullImage: ImageableImage,
    providedOptions?: PullerNodeOptions ) {

    const x = puller.positionProperty.get().x;
    const y = puller.positionProperty.get().y;

    const options = optionize<PullerNodeOptions, SelfOptions, ImageOptions>()( {
      phetioInputEnabledPropertyInstrumented: true,
      phetioFeatured: true,
      visiblePropertyOptions: { phetioFeatured: true }
    }, providedOptions );

    super( image, {
      x: x,
      y: y,
      cursor: 'pointer',
      scale: 0.86,
      tagName: 'button'
    } );

    this.puller.node = this; //Wire up so node can be looked up by model element.
    this.standImage = image;

    model.hasStartedProperty.link( () => {
      this.updateImage( puller, model );
      this.updatePosition( puller, model );
    } );
    puller.positionProperty.link( () => {
      this.updateImage( puller, model );
      this.updatePosition( puller, model );
    } );

    model.hasStartedProperty.link( () => {
      this.updateImage( puller, model );
      this.updatePosition( puller, model );
    } );
    model.isRunningProperty.link( () => {
      this.updateImage( puller, model );
      this.updatePosition( puller, model );
    } );
    model.stateProperty.link( () => {
      this.updateImage( puller, model );
      this.updatePosition( puller, model );
    } );

    this.dragListener = new SoundDragListener( {
        tandem: options.tandem?.createTandem( 'dragListener' ),
        allowTouchSnag: true,
        positionProperty: puller.positionProperty,
        start: () => {

          // check to see if a puller is knotted - if it is, store the knot
          const knot = puller.knotProperty.get();

          // disconnect the puller from the knot and update the image
          puller.disconnect();
          this.updateImage( puller, model );

          // fire updates
          puller.userControlledProperty.set( true );
          this.moveToFront();
          puller.userControlledEmitter.emit();

          // if the puller was knotted, update the image position so that it is centered on the knot it was previously
          // grabbing
          if ( knot ) {
            this.updatePositionKnotted( puller, model, knot );
          }
        },
        end: () => {
          this.updatePosition( puller, model );
          puller.userControlledProperty.set( false );
          puller.droppedEmitter.emit();
          this.updateImage( puller, model );

          // Add accessible response when a puller is dropped
          if ( puller.knotProperty.get() ) {
            this.addAccessibleContextResponse( `${puller.size} ${puller.type} puller attached to rope.` );
          }
          else {
            this.addAccessibleContextResponse( `${puller.size} ${puller.type} puller returned to toolbox.` );
          }
        }
      }
    );
    this.addInputListener( this.dragListener );

    model.resetAllEmitter.addListener( () => {
      this.updatePosition( puller, model );

      // cancel the drag
      if ( puller.userControlledProperty.get() ) {
        this.dragListener.interrupt();

        puller.reset();
      }
    } );

    this.mutate( options );

    this.addLinkedElement( this.puller, {
      tandemName: 'puller'
    } );

    // When hiding the puller via the PhET-iO API (e.g. in PhET-iO Studio or PhET Studio), detach from the knot and move back to the toolbox, invisibly
    this.visibleProperty.link( visible => {
      if ( !visible ) {
        puller.reset();
      }
    } );
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
  public updatePositionKnotted( puller: Puller, model: NetForceModel, knot: Knot ): void {
    const blueOffset = this.puller.type === 'blue' ? -60 : 0;
    puller.positionProperty.set( new Vector2( knot.positionProperty.get() + blueOffset, knot.y - this.height + 90 ) );
  }

  /**
   * Update the image puller image depending on whether the puller is knotted and pulling
   */
  public updateImage( puller: Puller, model: NetForceModel ): void {
    const knotted = puller.knotProperty.get();
    const pulling = model.hasStartedProperty.get() && knotted && model.stateProperty.get() !== 'completed';
    this.image = pulling ? this.pullImage : this.standImage;
  }

  /**
   * Update the position of a puller depending on whether it is knotted and pulling.
   */
  public updatePosition( puller: Puller, model: NetForceModel ): void {
    const knotted = puller.knotProperty.get();
    const pulling = model.hasStartedProperty.get() && knotted && model.stateProperty.get() !== 'completed';
    if ( knotted ) {
      const pullingOffset = pulling ? -puller.dragOffsetX : puller.standOffsetX;
      const blueOffset = this.puller.type === 'blue' ? -60 + 10 : 0;
      this.setTranslation( puller.knotProperty.get()!.positionProperty.get() + pullingOffset + blueOffset, puller.knotProperty.get()!.y - this.height + 90 );
    }
    else {
      this.setTranslation( puller.positionProperty.get() );
    }
  }
}

forcesAndMotionBasics.register( 'PullerNode', PullerNode );