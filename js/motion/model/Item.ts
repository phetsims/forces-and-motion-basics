// Copyright 2013-2025, University of Colorado Boulder

/**
 * The model for an item that can be dragged out of the toolbox and put into the play area to be pushed.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import { clamp } from '../../../../dot/js/util/clamp.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import LocalizedImageProperty from '../../../../joist/js/i18n/LocalizedImageProperty.js';
import { kilogramsUnit } from '../../../../scenery-phet/js/units/kilogramsUnit.js';
import { ImageableImage } from '../../../../scenery/js/nodes/Imageable.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import phetioStateSetEmitter from '../../../../tandem/js/phetioStateSetEmitter.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import ReferenceIO from '../../../../tandem/js/types/ReferenceIO.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import HumanTypeEnum from './HumanTypeEnum.js';
import InteractionMode, { InteractionModes } from './InteractionMode.js';
import MotionModel from './MotionModel.js';

export const ENGAGED_INTERACTION_SCALE = 1.3;

type AnimationState = {
  targetPosition: Vector2;
};

export default class Item extends PhetioObject {

  // Identifier for this item, used in instrumentation and accessibility descriptions.
  public readonly name: string;

  // Initial x-coordinate for reset logic.
  private readonly initialX: number;

  // Initial y-coordinate for reset logic.
  private readonly initialY: number;

  // Scale applied when the item sits in the toolbox.
  private readonly homeScale: number;

  // Image displayed while the item is active.
  public readonly imageProperty: TReadOnlyProperty<ImageableImage> | LocalizedImageProperty;

  // Image shown when the item is sitting on the skateboard stack.
  public readonly sittingImageProperty: LocalizedImageProperty | Property<ImageableImage>;

  // Image shown when the item is being held.
  public readonly holdingImageProperty: LocalizedImageProperty | Property<ImageableImage>;

  // the position of the item
  public readonly positionProperty: Vector2Property;

  // Horizontal offset to align the item with the pusher's hands.
  public readonly pusherInsetProperty: Property<number>;

  // whether the item is being user controlled (dragged)
  public readonly userControlledProperty: TReadOnlyProperty<boolean>;

  // direction of the item, 'left'|'right'
  public readonly directionProperty: StringUnionProperty<'left' | 'right'>;

  // tracks the animation state of the item
  private animationState: AnimationState | null;

  // Flag for whether the item is on the skateboard
  public readonly inStackProperty: TReadOnlyProperty<boolean>;

  // Unified mode property representing the complete state of the item
  public readonly modeProperty: StringUnionProperty<InteractionMode>;

  // How much to increase/shrink the original image. Could all be set to 1.0 if images pre-scaled in an external program
  public readonly imageScale: number;

  // Derived scale used to animate between toolbox and active states.
  public readonly interactionScaleProperty: TReadOnlyProperty<number>;

  // True if and only if the item is a bucket
  public readonly isBucket: boolean;

  // The mass is constant in the PhET brand sim, but can be edited in PhET-iO
  public readonly massProperty: NumberProperty;

  // Whether the item's mass is hidden from the learner (mystery mass).
  public readonly mystery: boolean;

  // Automatically focus the item if last interaction was via keyboard
  public lastInteractionType: 'none' | 'pointer' | 'pdom' = 'none';

  /**
   * @param model - model context in which this item exists
   * @param name - string describing this type of item, or HumanTypeEnum of this human item
   * @param tandem
   * @param image - image from the 'image!' plugin, representing the item
   * @param mass - model mass of the item
   * @param x - home value x position for the item
   * @param y - home value y position for the item
   * @param imageScale - base scale of the image
   * @param isBucket - true if and only if the item is a bucket
   * @param homeScale - additional scale factor for when the item is in the toolbox
   * @param pusherInset - inset value to align the item with the pusher's hands
   * @param sittingImage - image from the 'image!' plugin, representing a 'sitting' item
   * @param holdingImage - image from the 'image!' plugin, representing a 'sitting' item
   * @param mystery - whether the mass of this item is unknown to the user
   */
  public constructor(
    public readonly model: MotionModel,
    name: string | HumanTypeEnum,
    tandem: Tandem,
    image: ImageableImage | undefined,
    mass: number,
    x: number,
    y: number,
    imageScale: number,
    isBucket: boolean,
    homeScale?: number,
    pusherInset?: number,
    sittingImage?: ImageableImage,
    holdingImage?: ImageableImage,
    mystery?: boolean ) {

    super( {
      tandem: tandem,
      phetioType: ReferenceIO( IOType.ObjectIO ),
      phetioState: false,
      phetioFeatured: true
    } );

    this.isBucket = isBucket;

    this.massProperty = new NumberProperty( mass, {
      tandem: tandem.createTandem( 'massProperty' ),
      phetioFeatured: true,
      numberType: 'FloatingPoint',
      units: kilogramsUnit,
      range: new Range( 1, 200 )
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

    // Non-observable properties
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

    this.mystery = mystery ?? false;

    // Initialize mode property first - start in appropriate toolbox based on item type
    this.modeProperty = new StringUnionProperty<InteractionMode>( 'inToolbox', {
      validValues: InteractionModes,
      tandem: tandem.createTandem( 'modeProperty' ),
      phetioReadOnly: true,
      phetioFeatured: true,
      phetioDocumentation: 'Unified state representing the current mode and location of the item'
    } );

    this.userControlledProperty = new DerivedProperty( [ this.modeProperty ], ( mode: InteractionMode ) => {
      return mode === 'pointerGrabbed' ||
             mode === 'keyboardGrabbedFromToolbox' ||
             mode === 'keyboardGrabbedFromStack';
    } );

    this.directionProperty = new StringUnionProperty( 'left', {
      validValues: [ 'left', 'right' ],
      tandem: tandem.createTandem( 'directionProperty' ),
      phetioReadOnly: true,
      phetioDocumentation: 'For PhET-iO internal use only, tracks the direction of the item for state'
    } );

    this.interactionScaleProperty = new DerivedProperty( [ this.modeProperty ], mode => {
      return mode === 'inToolbox' || mode === 'animatingToToolbox' ? this.homeScale : ENGAGED_INTERACTION_SCALE;
    } );

    this.animationState = null;

    this.inStackProperty = new DerivedProperty( [ this.modeProperty ], mode => {
      return mode === 'onStack' ||
             mode === 'animatingToStack' ||
             mode === 'keyboardGrabbedFromStack';
    }, {
      tandem: tandem.createTandem( 'inStackProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'Indicates the item is part of the experiment.',
      phetioValueType: BooleanIO
    } );

    this.imageScale = imageScale;

    this.model.directionProperty.link( direction => {

      // only change directions if on the board, and always choose one of left/right, and only for people
      if ( this.inStackProperty.value && direction !== 'none' && ( name === HumanTypeEnum.GIRL || name === HumanTypeEnum.MAN ) ) {
        this.directionProperty.value = direction;
      }
    } );

    // Synchronization band-aid for when state is loaded via phet-io, to update the modeProperty based on the location of the item
    // Solves inconsistencies in https://github.com/phetsims/forces-and-motion-basics/issues/446
    phetioStateSetEmitter.addListener( () => {
      if ( this.positionProperty.value.x === this.initialX && this.positionProperty.value.y === this.initialY ) {
        this.modeProperty.value = 'inToolbox';
        this.animationState = null;
      }
      else {
        this.modeProperty.value = 'onStack';
      }
    } );
  }

  // Return true if the arms should be up (for a human)
  public armsUp(): boolean {
    return this.model.userControlledItems().length > 0 || this.model.isItemStackedAbove( this );
  }

  /**
   * Get the current scale for the Item.  The Item has two scales, imageScale and interactionScale.
   * The current scale is the product of these two scales.  This is used throughout the simulation, primarily
   * for transformations.
   */
  public getCurrentScale(): number {
    return this.imageScale * this.interactionScaleProperty.value;
  }

  // Animate the item to the specified position
  public animateTo( x: number, y: number, destination: 'home' | 'stack' ): void {
    this.animationState = {
      targetPosition: new Vector2( x, y )
    };

    this.modeProperty.value = destination === 'home' ? 'animatingToToolbox' : 'animatingToStack';
  }

  // Animate the item to its original position
  public animateHome(): void {

    // Make the characters face their original direction so that they won't be displaced within the toolbox, see #16
    this.directionProperty.value = 'left';
    this.animateTo( this.initialX, this.initialY, 'home' );
  }

  // Cancel an animation when the user clicks on an item
  public cancelAnimation(): void {
    this.animationState = null;
  }

  /**
   * Get which toolbox side this item belongs to based on its type
   */
  public getToolboxSide(): 'left' | 'right' {
    const leftToolboxItems = [ 'fridge', 'crate1', 'crate2' ];
    return leftToolboxItems.includes( this.name ) ? 'left' : 'right';
  }

  /**
   * Manually set the mode to a keyboard-grabbed state (called from view layer)
   */
  public setKeyboardGrabbedMode( fromLocation: 'leftToolbox' | 'rightToolbox' | 'stack' ): void {
    if ( fromLocation === 'leftToolbox' || fromLocation === 'rightToolbox' ) {
      this.modeProperty.value = 'keyboardGrabbedFromToolbox';
    }
    else {
      this.modeProperty.value = 'keyboardGrabbedFromStack';
    }
  }

  /**
   * Convenience method to check if item is being grabbed (any method)
   */
  public isGrabbed(): boolean {
    const mode = this.modeProperty.value;
    return mode === 'pointerGrabbed' ||
           mode === 'keyboardGrabbedFromToolbox' ||
           mode === 'keyboardGrabbedFromStack';
  }

  /**
   * Convenience method to check if item is animating
   */
  public isAnimating(): boolean {
    return this.animationState !== null;
  }

  /**
   * Reset the item to its initial state by resetting all Properties.
   */
  public reset(): void {
    this.positionProperty.reset();
    this.pusherInsetProperty.reset();
    this.directionProperty.reset();
    this.animationState = null;
    this.modeProperty.reset();

    this.lastInteractionType = 'none';
  }

  // Step the item in time, making it grow or shrink (if necessary), or animate to its destination
  public step( dt: number ): void {

    if ( this.animationState ) {
      const destination = this.animationState.targetPosition;
      const blendAmount = clamp( 15 * dt, 0.1, 0.9 );
      this.positionProperty.value = this.positionProperty.value.blend( destination, blendAmount );

      const distanceToTarget = this.positionProperty.value.distance( destination );

      if ( distanceToTarget < 1 ) {
        this.positionProperty.value = destination;
        this.animationState = null;
        const previousMode = this.modeProperty.value;
        this.modeProperty.value = previousMode === 'animatingToToolbox' ? 'inToolbox' : 'onStack';
      }
    }
  }
}

forcesAndMotionBasics.register( 'Item', Item );
