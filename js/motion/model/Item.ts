// Copyright 2013-2024, University of Colorado Boulder

/**
 * The model for an item that can be dragged out of the toolbox and put into the play area to be pushed.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import ObjectLiteralIO from '../../../../tandem/js/types/ObjectLiteralIO.js';
import ReferenceIO from '../../../../tandem/js/types/ReferenceIO.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import HumanTypeEnum from './HumanTypeEnum.js';
import MotionModel from './MotionModel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import { ImageableImage } from '../../../../scenery/js/imports.js';
import LocalizedImageProperty from '../../../../joist/js/i18n/LocalizedImageProperty.js';
// eslint-disable-next-line phet/no-view-imported-from-model
import ItemNode from '../view/ItemNode.js';

type AnimationState = {
  enabled: boolean;
  x: number;
  y: number;
  end?: null | ( () => void );
  destination?: string;
};

export default class Item extends PhetioObject {
  public readonly name: string;
  private readonly initialX: number;
  private readonly initialY: number;
  private readonly homeScale: number;
  public readonly imageProperty: Property<ImageableImage> | LocalizedImageProperty;
  public readonly sittingImageProperty: LocalizedImageProperty | Property<ImageableImage>;
  public readonly holdingImageProperty: LocalizedImageProperty | Property<ImageableImage>;

  // the position of the item
  public readonly positionProperty: Vector2Property;

  // TODO: does this need to be instrumented for phet-io? https://github.com/phetsims/tasks/issues/1129
  public readonly pusherInsetProperty: Property<number>;

  // whether the item is being dragged
  public readonly draggingProperty: BooleanProperty;

  // direction of the item, 'left'|'right'
  // TODO: Why not an enum? https://github.com/phetsims/tasks/issues/1129
  public readonly directionProperty: StringProperty;

  // tracks the animation state of the item
  public readonly animationStateProperty: Property<AnimationState>;

  // Flag for whether the item is on the skateboard
  public readonly onBoardProperty: BooleanProperty;

  // How much to increase/shrink the original image. Could all be set to 1.0 if images pre-scaled in an external program
  public readonly imageScaleProperty: NumberProperty;
  public readonly interactionScaleProperty: NumberProperty;

  // True if and only if the item is a bucket
  public bucket = false;
  public view: ItemNode | null = null;

  /**
   * Constructor for Item
   *
   * @param context - model context in which this item exists
   * @param name - string describing this type of item, or HumanTypeEnum of this human item
   * @param tandem
   * @param image - image from the 'image!' plugin, representing the item
   * @param mass - model mass of the item
   * @param x - home value x position for the item
   * @param y - home value y position for the item
   * @param imageScale - base scacle of the image
   * @param homeScale - additional scale factor for when the item is in the toolbox
   * @param pusherInset - inset value to align the item with the pusher's hands
   * @param sittingImage - image from the 'image!' plugin, representing a 'sitting' item
   * @param holdingImage - image from the 'image!' plugin, representing a 'sitting' item
   * @param mystery      [description]
   */
  public constructor(
    public readonly context: MotionModel, name: string | HumanTypeEnum, tandem: Tandem,
    image: ImageableImage | undefined,
    public readonly mass: number,
    x: number, y: number, imageScale: number,
    homeScale?: number,
    pusherInset?: number,
    sittingImage?: ImageableImage,
    holdingImage?: ImageableImage,
    public readonly mystery?: boolean ) {

    super( {
      tandem: tandem,
      phetioType: ReferenceIO( IOType.ObjectIO ),
      phetioState: false
    } );

    this.name = typeof name === 'string' ? name : name.name.toLowerCase();

    // Set the standing, sitting, and holding image properties if item is human
    let standingImageProperty: LocalizedImageProperty | null = null;
    let sittingImageProperty: LocalizedImageProperty | null = null;
    let holdingImageProperty: LocalizedImageProperty | null = null;
    if ( name === HumanTypeEnum.GIRL ) {
      standingImageProperty = HumanTypeEnum.GIRL.standingImageProperty;
      sittingImageProperty = HumanTypeEnum.GIRL.sittingImageProperty;
      holdingImageProperty = HumanTypeEnum.GIRL.holdingImageProperty;
    }
    else if ( name === HumanTypeEnum.MAN ) {
      standingImageProperty = HumanTypeEnum.MAN.standingImageProperty;
      sittingImageProperty = HumanTypeEnum.MAN.sittingImageProperty;
      holdingImageProperty = HumanTypeEnum.MAN.holdingImageProperty;
    }

    //Non-observable properties
    this.initialX = x;
    this.initialY = y;
    this.homeScale = homeScale || 1.0;

    this.imageProperty = typeof name === 'string' ? new Property( image! ) : standingImageProperty!;
    this.sittingImageProperty = typeof name === 'string' ? new Property( sittingImage! ) : sittingImageProperty!;
    this.holdingImageProperty = typeof name === 'string' ? new Property( holdingImage! ) : holdingImageProperty!;

    this.positionProperty = new Vector2Property( new Vector2( x, y ), {
      tandem: tandem.createTandem( 'positionProperty' )
    } );

    this.pusherInsetProperty = new Property( pusherInset || 0 );

    this.draggingProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'draggingProperty' )
    } );

    this.directionProperty = new StringProperty( 'left', {
      tandem: tandem.createTandem( 'directionProperty' )
    } );

    this.animationStateProperty = new Property<AnimationState>( {
      enabled: false,
      x: 0,
      y: 0,
      end: null,
      destination: 'home'
    }, {
      tandem: tandem.createTandem( 'animationStateProperty' ),
      phetioValueType: ObjectLiteralIO
    } );

    this.onBoardProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'onBoardProperty' )
    } );

    this.imageScaleProperty = new NumberProperty( imageScale || 1.0, {
      tandem: tandem.createTandem( 'imageScaleProperty' )
    } );

    // How much the object grows or shrinks when interacting with it
    const minValue = homeScale || 1.0;
    this.interactionScaleProperty = new NumberProperty( homeScale || 1.0, {
      tandem: tandem.createTandem( 'interactionScaleProperty' ),
      range: new Range( minValue, 1.3 )
    } );

    // @ts-expect-error
    this.context.directionProperty.link( direction => {

      //only change directions if on the board, and always choose one of left/right, and only for people
      if ( this.onBoardProperty.get() && direction !== 'none' && ( name === HumanTypeEnum.GIRL || name === HumanTypeEnum.MAN ) ) {
        this.directionProperty.set( direction );
      }
    } );
  }

  // Return true if the arms should be up (for a human)
  public armsUp(): boolean {
    // @ts-expect-error
    return this.context.draggingItems().length > 0 || this.context.isItemStackedAbove( this );
  }

  /**
   * Get the current scale for the Item.  The Item has two scales, imageScale and interactionScale.
   * The current scale is the product of these two scales.  This is used throughout the simulation, primarily
   * for transformations.
   */
  public getCurrentScale(): number {
    return this.imageScaleProperty.get() * this.interactionScaleProperty.get();
  }

  // Animate the item to the specified position
  public animateTo( x: number, y: number, destination: string ): void {
    this.animationStateProperty.set( { enabled: true, x: x, y: y, destination: destination } );
  }

  // Animate the item to its original position
  public animateHome(): void {

    //Make the characters face their original direction so that they won't be displaced within the toolbox, see #16
    this.directionProperty.set( 'left' );
    this.animateTo( this.initialX, this.initialY, 'home' );
  }

  // Cancel an animation when the user clicks on an item
  public cancelAnimation(): void {
    if ( this.animationStateProperty.get().enabled ) {
      if ( this.draggingProperty.get() ) {
        this.interactionScaleProperty.set( 1.3 );
      }
      else {
        if ( this.animationStateProperty.get().destination === 'home' ) {
          this.interactionScaleProperty.set( this.homeScale );
        }
      }
      this.animationStateProperty.set( { enabled: false, x: 0, y: 0, end: null, destination: 'home' } );
    }
  }

  /**
   * Reset the item to its initial state by resetting all Properties.
   */
  public reset(): void {
    this.positionProperty.reset();
    this.pusherInsetProperty.reset();
    this.draggingProperty.reset();
    this.directionProperty.reset();
    this.animationStateProperty.reset();
    this.onBoardProperty.reset();
    this.imageScaleProperty.reset();
    this.interactionScaleProperty.reset();
  }

  // Step the item in time, making it grow or shrink (if necessary), or animate to its destination
  public step( dt: number ): void {
    if ( this.draggingProperty.get() ) {
      this.interactionScaleProperty.set( Math.min( this.interactionScaleProperty.get() + 9 * dt, 1.3 ) );
    }
    else if ( this.animationStateProperty.get().destination === 'home' ) {
      this.interactionScaleProperty.set( Math.max( this.interactionScaleProperty.get() - 9 * dt, this.homeScale ) );
    }

    if ( this.animationStateProperty.get().enabled ) {
      const destination = new Vector2( this.animationStateProperty.get().x, this.animationStateProperty.get().y );

      //Make sure not to blend outside of 0..1 or it could cause overshooting and oscillation
      const blendAmount = Utils.clamp( 15 * dt, 0.1, 0.9 );
      this.positionProperty.set( this.positionProperty.get().blend( destination, blendAmount ) );

      const distanceToTarget = this.positionProperty.get().distance( destination );
      if ( distanceToTarget < 1 && ( this.interactionScaleProperty.get() === 1.3 || this.interactionScaleProperty.get() === this.homeScale ) ) {

        //Snap to exact final destination, see #59
        this.positionProperty.set( destination );
        if ( this.animationStateProperty.get().end ) {
          // @ts-expect-error
          this.animationState.end();
        }
        this.animationStateProperty.set( { enabled: false, x: 0, y: 0, end: null } );
      }
    }
  }
}

forcesAndMotionBasics.register( 'Item', Item );