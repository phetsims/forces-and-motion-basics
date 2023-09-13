// Copyright 2013-2023, University of Colorado Boulder

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

class Item extends PhetioObject {

  /**
   * Constructor for Item
   *
   * @param {MotionModel || NetForceModel} context - model context in which this item exists
   * @param {string} name - string describing this type of item
   * @param {Tandem} tandem
   * @param {image} image - image from the 'image!' plugin, representing the item
   * @param {number} mass - model mass of the item
   * @param {number} x - home value x position for the item
   * @param {number} y - home value y position for the item
   * @param {number} imageScale - base scacle of the image
   * @param {number} homeScale - additional scale factor for when the item is in the toolbox
   * @param {number} pusherInset - inset value to align the item with the pusher's hands
   * @param {image} sittingImage - image from the 'image!' plugin, representing a 'sitting' item
   * @param {image} holdingImage - image from the 'image!' plugin, representing a 'sitting' item
   * @param {boolean} mystery      [description]
   */
  constructor( context, name, tandem, image, mass, x, y, imageScale, homeScale, pusherInset, sittingImage, holdingImage, mystery ) {

    super( {
      tandem: tandem,
      phetioType: ReferenceIO( IOType.ObjectIO ),
      phetioState: false
    } );

    this.name = name;

    //Non-observable properties
    this.initialX = x;
    this.initialY = y;
    this.image = image;
    this.mass = mass;
    this.pusherInset = pusherInset;
    this.sittingImageNode = sittingImage;
    this.holdingImage = holdingImage;
    this.context = context;
    this.mystery = mystery;
    this.homeScale = homeScale || 1.0;

    // @public - the position of the item
    this.positionProperty = new Vector2Property( new Vector2( x, y ), {
      tandem: tandem.createTandem( 'positionProperty' )
    } );

    // TODO: does this need to be instrumented for phet-io? https://github.com/phetsims/tasks/issues/1129
    this.pusherInsetProperty = new Property( pusherInset || 0 );

    // @public {Property.<boolean>} - whether or not the item is being dragged
    this.draggingProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'draggingProperty' )
    } );

    // @public {Property.<string>} - direction of the item, 'left'|'right'
    // TODO: Why not an enum? https://github.com/phetsims/tasks/issues/1129
    this.directionProperty = new StringProperty( 'left', {
      tandem: tandem.createTandem( 'directionProperty' )
    } );

    // @public {Object} - tracks the animation state of the item
    this.animationStateProperty = new Property( {
      enabled: false,
      x: 0,
      y: 0,
      end: null,
      destination: 'home'
    }, {
      tandem: tandem.createTandem( 'animationStateProperty' ),
      phetioValueType: ObjectLiteralIO
    } );

    // Flag for whether the item is on the skateboard
    this.onBoardProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'onBoardProperty' )
    } );

    // How much to increase/shrink the original image. Could all be set to 1.0 if images pre-scaled in an external program
    this.imageScaleProperty = new NumberProperty( imageScale || 1.0, {
      tandem: tandem.createTandem( 'imageScaleProperty' )
    } );

    // How much the object grows or shrinks when interacting with it
    const minValue = homeScale || 1.0;
    this.interactionScaleProperty = new NumberProperty( homeScale || 1.0, {
      tandem: tandem.createTandem( 'interactionScaleProperty' ),
      range: new Range( minValue, 1.3 )
    } );

    this.context.directionProperty.link( direction => {

      //only change directions if on the board, and always choose one of left/right, and only for people
      if ( this.onBoardProperty.get() && direction !== 'none' && sittingImage ) {
        this.directionProperty.set( direction );
      }
    } );
  }

  //For unknown reasons, the trash can is not centered when drawn, so we make up for it with a workaround here
  get centeringOffset() {
    return this.image === 'trashCan.png' ? 5 : 0;
  }

  // @public - Return true if the arms should be up (for a human)
  armsUp() {
    return this.context.draggingItems().length > 0 || this.context.isItemStackedAbove( this );
  }

  /**
   * Get the current scale for the Item.  The Item has two scales, imageScale and interactionScale.
   * The current scale is the product of these two scales.  This is used throughout the simulation, primarily
   * for transformations.
   * @public
   */
  getCurrentScale() {
    return this.imageScaleProperty.get() * this.interactionScaleProperty.get();
  }

  // @public - Animate the item to the specified position
  animateTo( x, y, destination ) {
    this.animationStateProperty.set( { enabled: true, x: x, y: y, destination: destination } );
  }

  // @public - Animate the item to its original position
  animateHome() {

    //Make the characters face their original direction so that they won't be displaced within the toolbox, see #16
    this.directionProperty.set( 'left' );
    this.animateTo( this.initialX, this.initialY, 'home' );
  }

  // @public - Cancel an animation when the user clicks on an item
  cancelAnimation() {
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
   * @public
   */
  reset() {
    this.positionProperty.reset();
    this.pusherInsetProperty.reset();
    this.draggingProperty.reset();
    this.directionProperty.reset();
    this.animationStateProperty.reset();
    this.onBoardProperty.reset();
    this.imageScaleProperty.reset();
    this.interactionScaleProperty.reset();
  }

  // @public - Step the item in time, making it grow or shrink (if necessary), or animate to its destination
  step( dt ) {
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
          this.animationState.end();
        }
        this.animationStateProperty.set( { enabled: false, x: 0, y: 0, end: null } );
      }
    }
  }
}

forcesAndMotionBasics.register( 'Item', Item );

export default Item;
