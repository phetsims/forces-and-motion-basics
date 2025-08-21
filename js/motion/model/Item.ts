// Copyright 2013-2025, University of Colorado Boulder

/**
 * The model for an item that can be dragged out of the toolbox and put into the play area to be pushed.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import LocalizedImageProperty from '../../../../joist/js/i18n/LocalizedImageProperty.js';
import { ImageableImage } from '../../../../scenery/js/nodes/Imageable.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import ObjectLiteralIO from '../../../../tandem/js/types/ObjectLiteralIO.js';
import ReferenceIO from '../../../../tandem/js/types/ReferenceIO.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import HumanTypeEnum from './HumanTypeEnum.js';
import MotionModel from './MotionModel.js';

type AnimationState = {
  enabled: boolean;
  x: number;
  y: number;
  end?: null | ( () => void );
  destination?: 'home' | 'stack';
};

// Unified mode representing the complete state of an item
export type ItemMode =
  | 'inLeftToolbox'        // Item is resting in the left toolbox
  | 'inRightToolbox'       // Item is resting in the right toolbox  
  | 'onStack'              // Item is resting on the skateboard stack
  | 'mouseGrabbed'         // Item is being dragged with mouse
  | 'keyboardGrabbedFromLeftToolbox'   // Item grabbed from left toolbox via keyboard
  | 'keyboardGrabbedFromRightToolbox'  // Item grabbed from right toolbox via keyboard
  | 'keyboardGrabbedFromStack'         // Item grabbed from stack via keyboard
  | 'animatingToLeftToolbox'   // Item is animating back to left toolbox
  | 'animatingToRightToolbox'  // Item is animating back to right toolbox
  | 'animatingToStack';        // Item is animating to stack

export default class Item extends PhetioObject {
  public readonly name: string;
  private readonly initialX: number;
  private readonly initialY: number;
  private readonly homeScale: number;
  public readonly imageProperty: TReadOnlyProperty<ImageableImage> | LocalizedImageProperty;
  public readonly sittingImageProperty: LocalizedImageProperty | Property<ImageableImage>;
  public readonly holdingImageProperty: LocalizedImageProperty | Property<ImageableImage>;

  // the position of the item
  public readonly positionProperty: Vector2Property;

  public readonly pusherInsetProperty: Property<number>;

  // whether the item is being user controlled (dragged)
  public readonly userControlledProperty: TReadOnlyProperty<boolean>;

  // direction of the item, 'left'|'right'
  public readonly directionProperty: StringUnionProperty<'left' | 'right'>;

  // tracks the animation state of the item
  public readonly animationStateProperty: Property<AnimationState>;

  // Flag for whether the item is on the skateboard
  public readonly inStackProperty: BooleanProperty;

  // Unified mode property representing the complete state of the item
  public readonly modeProperty: StringUnionProperty<ItemMode>;

  // How much to increase/shrink the original image. Could all be set to 1.0 if images pre-scaled in an external program
  public readonly imageScale: number;
  public readonly interactionScaleProperty: NumberProperty;

  // True if and only if the item is a bucket
  public bucket = false;

  // The mass is constant in the PhET brand sim, but can be edited in PhET-iO
  public readonly massProperty: NumberProperty;

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
    mass: number,
    x: number, y: number, imageScale: number,
    homeScale?: number,
    pusherInset?: number,
    sittingImage?: ImageableImage,
    holdingImage?: ImageableImage,
    public readonly mystery?: boolean ) {

    super( {
      tandem: tandem,
      phetioType: ReferenceIO( IOType.ObjectIO ),
      phetioState: false,
      phetioFeatured: true
    } );

    this.massProperty = new NumberProperty( mass, {
      tandem: tandem.createTandem( 'massProperty' ),
      phetioFeatured: true,
      numberType: 'FloatingPoint',
      units: 'kg',
      range: new Range( 0, 200 )
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

    // Initialize mode property first - start in appropriate toolbox based on item type
    const initialMode = this.getToolboxSide() === 'left' ? 'inLeftToolbox' : 'inRightToolbox';
    this.modeProperty = new StringUnionProperty<ItemMode>( initialMode, {
      validValues: [
        'inLeftToolbox', 'inRightToolbox', 'onStack',
        'mouseGrabbed', 'keyboardGrabbedFromLeftToolbox', 'keyboardGrabbedFromRightToolbox', 'keyboardGrabbedFromStack',
        'animatingToLeftToolbox', 'animatingToRightToolbox', 'animatingToStack'
      ],
      tandem: tandem.createTandem( 'modeProperty' ),
      phetioReadOnly: true,
      phetioFeatured: true,
      phetioDocumentation: 'Unified state representing the current mode and location of the item'
    } );

    // userControlledProperty is now derived from modeProperty
    this.userControlledProperty = new DerivedProperty( [ this.modeProperty ], ( mode: ItemMode ) => {
      // Item is user controlled if it's grabbed by mouse or keyboard
      return mode === 'mouseGrabbed' ||
             mode === 'keyboardGrabbedFromLeftToolbox' ||
             mode === 'keyboardGrabbedFromRightToolbox' ||
             mode === 'keyboardGrabbedFromStack';
    } );

    this.directionProperty = new StringUnionProperty( 'left', {
      validValues: [ 'left', 'right' ],
      tandem: tandem.createTandem( 'directionProperty' ),
      phetioReadOnly: true,
      phetioDocumentation: 'For PhET-iO internal use only, tracks the direction of the item for state'
    } );

    this.animationStateProperty = new Property<AnimationState>( {
      enabled: false,
      x: 0,
      y: 0,
      end: null,
      destination: 'home'
    }, {

      // Instrumentation needed to get the object size correct in phet-io state
      tandem: tandem.createTandem( 'animationStateProperty' ),
      phetioValueType: ObjectLiteralIO,
      phetioReadOnly: true,
      phetioDocumentation: 'For PhET-iO internal use only, tracks the animation state of the item to get the size correct in state'
    } );

    this.inStackProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'inStackProperty' ),
      phetioReadOnly: true,
      phetioFeatured: true,
      phetioDocumentation: 'Indicates the item is part of the experiment.'
    } );

    this.imageScale = imageScale || 1.0;

    // How much the object grows or shrinks when interacting with it
    const minValue = homeScale || 1.0;
    this.interactionScaleProperty = new NumberProperty( homeScale || 1.0, {
      range: new Range( minValue, 1.3 ),

      // Instrumentation needed to get the object size correct in phet-io state
      tandem: tandem.createTandem( 'interactionScaleProperty' ),
      phetioReadOnly: true
    } );

    this.context.directionProperty.link( direction => {

      //only change directions if on the board, and always choose one of left/right, and only for people
      if ( this.inStackProperty.get() && direction !== 'none' && ( name === HumanTypeEnum.GIRL || name === HumanTypeEnum.MAN ) ) {
        this.directionProperty.value = direction;
      }
    } );

    // Set up automatic mode calculation based on existing properties
    this.setupModeCalculation();
  }

  // Return true if the arms should be up (for a human)
  public armsUp(): boolean {
    return this.context.userControlledItems().length > 0 || this.context.isItemStackedAbove( this );
  }

  /**
   * Get the current scale for the Item.  The Item has two scales, imageScale and interactionScale.
   * The current scale is the product of these two scales.  This is used throughout the simulation, primarily
   * for transformations.
   */
  public getCurrentScale(): number {
    return this.imageScale * this.interactionScaleProperty.get();
  }

  // Animate the item to the specified position
  public animateTo( x: number, y: number, destination: 'home' | 'stack' ): void {
    this.animationStateProperty.value = { enabled: true, x: x, y: y, destination: destination };
  }

  // Animate the item to its original position
  public animateHome(): void {

    //Make the characters face their original direction so that they won't be displaced within the toolbox, see #16
    this.directionProperty.value = 'left';
    this.animateTo( this.initialX, this.initialY, 'home' );
  }

  // Cancel an animation when the user clicks on an item
  public cancelAnimation(): void {
    if ( this.animationStateProperty.get().enabled ) {
      if ( this.userControlledProperty.get() ) {
        this.interactionScaleProperty.value = 1.3;
      }
      else {
        if ( this.animationStateProperty.get().destination === 'home' ) {
          this.interactionScaleProperty.value = this.homeScale;
        }
      }
      this.animationStateProperty.value = { enabled: false, x: 0, y: 0, end: null, destination: 'home' };
    }
  }

  /**
   * Get which toolbox side this item belongs to based on its type
   */
  public getToolboxSide(): 'left' | 'right' {
    // The fridge and the crates both go in the left toolbox
    if ( this.name === 'fridge' || this.name === 'crate1' || this.name === 'crate2' ) {
      return 'left';
    }
    else {
      return 'right';
    }
  }

  /**
   * Set up automatic mode calculation based on changes to existing properties
   */
  private setupModeCalculation(): void {
    const updateMode = () => {
      const inStack = this.inStackProperty.get();
      const animating = this.animationStateProperty.get().enabled;
      const animatingToStack = animating && this.animationStateProperty.get().destination === 'stack';
      const animatingToHome = animating && this.animationStateProperty.get().destination === 'home';

      let newMode: ItemMode;

      if ( animating ) {
        if ( animatingToStack ) {
          newMode = 'animatingToStack';
        }
        else if ( animatingToHome ) {
          // Determine which toolbox based on item type
          newMode = this.getToolboxSide() === 'left' ? 'animatingToLeftToolbox' : 'animatingToRightToolbox';
        }
        else {
          // Fallback - shouldn't happen but be safe
          newMode = this.getToolboxSide() === 'left' ? 'inLeftToolbox' : 'inRightToolbox';
        }
      }
      else if ( inStack ) {
        newMode = 'onStack';
      }
      else {
        // Item is at rest in toolbox (when not animating and not in stack)
        // Keep current mode if it's a grabbed state - only update if it's not
        const currentMode = this.modeProperty.get();
        const isGrabbed = currentMode === 'mouseGrabbed' ||
                          currentMode === 'keyboardGrabbedFromLeftToolbox' ||
                          currentMode === 'keyboardGrabbedFromRightToolbox' ||
                          currentMode === 'keyboardGrabbedFromStack';

        if ( !isGrabbed ) {
          newMode = this.getToolboxSide() === 'left' ? 'inLeftToolbox' : 'inRightToolbox';
        }
        else {
          // Keep the current grabbed state
          newMode = currentMode;
        }
      }

      this.modeProperty.value = newMode;
    };

    // Listen to all relevant property changes (not userControlledProperty since it's derived from modeProperty)
    this.inStackProperty.link( updateMode );
    this.animationStateProperty.link( updateMode );
  }

  /**
   * Manually set the mode to a keyboard-grabbed state (called from view layer)
   */
  public setKeyboardGrabbedMode( fromLocation: 'leftToolbox' | 'rightToolbox' | 'stack' ): void {
    if ( fromLocation === 'leftToolbox' ) {
      this.modeProperty.value = 'keyboardGrabbedFromLeftToolbox';
    }
    else if ( fromLocation === 'rightToolbox' ) {
      this.modeProperty.value = 'keyboardGrabbedFromRightToolbox';
    }
    else {
      this.modeProperty.value = 'keyboardGrabbedFromStack';
    }
  }

  /**
   * Convenience method to check if item is in any toolbox
   */
  public isInToolbox(): boolean {
    const mode = this.modeProperty.get();
    return mode === 'inLeftToolbox' || mode === 'inRightToolbox';
  }

  /**
   * Convenience method to check if item is being grabbed (any method)
   */
  public isGrabbed(): boolean {
    const mode = this.modeProperty.get();
    return mode === 'mouseGrabbed' ||
           mode === 'keyboardGrabbedFromLeftToolbox' ||
           mode === 'keyboardGrabbedFromRightToolbox' ||
           mode === 'keyboardGrabbedFromStack';
  }

  /**
   * Convenience method to check if item is animating
   */
  public isAnimating(): boolean {
    const mode = this.modeProperty.get();
    return mode === 'animatingToLeftToolbox' ||
           mode === 'animatingToRightToolbox' ||
           mode === 'animatingToStack';
  }

  /**
   * Reset the item to its initial state by resetting all Properties.
   */
  public reset(): void {
    this.positionProperty.reset();
    this.pusherInsetProperty.reset();
    // userControlledProperty is derived from modeProperty, so no need to reset it
    this.directionProperty.reset();
    this.animationStateProperty.reset();
    this.inStackProperty.reset();
    this.interactionScaleProperty.reset();
    this.modeProperty.reset();
  }

  // Step the item in time, making it grow or shrink (if necessary), or animate to its destination
  public step( dt: number ): void {
    if ( this.userControlledProperty.get() ) {
      this.interactionScaleProperty.value = Math.min( this.interactionScaleProperty.get() + 9 * dt, 1.3 );
    }
    else if ( this.animationStateProperty.get().destination === 'home' ) {
      this.interactionScaleProperty.value = Math.max( this.interactionScaleProperty.get() - 9 * dt, this.homeScale );
    }

    if ( this.animationStateProperty.get().enabled ) {
      const destination = new Vector2( this.animationStateProperty.get().x, this.animationStateProperty.get().y );

      //Make sure not to blend outside of 0..1 or it could cause overshooting and oscillation
      const blendAmount = Utils.clamp( 15 * dt, 0.1, 0.9 );
      this.positionProperty.value = this.positionProperty.get().blend( destination, blendAmount );

      const distanceToTarget = this.positionProperty.get().distance( destination );
      if ( distanceToTarget < 1 && ( this.interactionScaleProperty.get() === 1.3 || this.interactionScaleProperty.get() === this.homeScale ) ) {

        //Snap to exact final destination, see #59
        this.positionProperty.value = destination;
        if ( this.animationStateProperty.get().end ) {
          this.animationStateProperty.get().end!();
        }
        this.animationStateProperty.value = { enabled: false, x: 0, y: 0, end: null };
      }
    }
  }
}

forcesAndMotionBasics.register( 'Item', Item );