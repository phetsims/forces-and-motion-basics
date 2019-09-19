// Copyright 2013-2019, University of Colorado Boulder

/**
 * The model for an item that can be dragged out of the toolbox and put into the play area to be pushed.
 *
 * @author Sam Reid
 */
define( require => {
  'use strict';

  // modules
  const AnimationStateIO = require( 'FORCES_AND_MOTION_BASICS/motion/model/AnimationStateIO' );
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ItemIO = require( 'FORCES_AND_MOTION_BASICS/motion/model/ItemIO' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const PhetioObject = require( 'TANDEM/PhetioObject' );
  const Property = require( 'AXON/Property' );
  const PropertyIO = require( 'AXON/PropertyIO' );
  const Range = require( 'DOT/Range' );
  const StringIO = require( 'TANDEM/types/StringIO' );
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2Property = require( 'DOT/Vector2Property' );

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
  function Item( context, name, tandem, image, mass, x, y, imageScale, homeScale, pusherInset, sittingImage, holdingImage, mystery ) {
    const self = this;

    this.name = name;

    //Non-observable properties
    this.initialX = x;
    this.initialY = y;
    this.image = image;
    this.mass = mass;
    this.pusherInset = pusherInset;
    this.sittingImage = sittingImage;
    this.holdingImage = holdingImage;
    this.context = context;
    this.mystery = mystery;
    this.homeScale = homeScale || 1.0;

    // @public - the position of the item
    this.positionProperty = new Vector2Property( new Vector2( x, y ), {
      tandem: tandem.createTandem( 'positionProperty' )
    } );

    // TODO: does this need to be instrumented for phet-io?
    this.pusherInsetProperty = new Property( pusherInset || 0 );

    // @public {Property.<boolean>} - whether or not the item is being dragged
    this.draggingProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'draggingProperty' )
    } );

    // @public {Property.<string>} - direction of the item, 'left'|'right'
    this.directionProperty = new Property( 'left', {
      tandem: tandem.createTandem( 'directionProperty' ),
      phetioType: PropertyIO( StringIO )
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
      phetioType: PropertyIO( AnimationStateIO )
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

    this.context.directionProperty.link( function( direction ) {

      //only change directions if on the board, and always choose one of left/right, and only for people
      if ( self.onBoardProperty.get() && direction !== 'none' && sittingImage ) {
        self.directionProperty.set( direction );
      }
    } );

    PhetioObject.call( this, { tandem: tandem, phetioType: ItemIO } );
  }

  forcesAndMotionBasics.register( 'Item', Item );

  return inherit( PhetioObject, Item, {

    //For unknown reasons, the trash can is not centered when drawn, so we make up for it with a workaround here
    get centeringOffset() {
      return this.image === 'trash-can.png' ? 5 : 0;
    },

    //Return true if the arms should be up (for a human)
    armsUp: function() {
      return this.context.draggingItems().length > 0 || this.context.isItemStackedAbove( this );
    },

    /**
     * Get the current scale for the Item.  The Item has two scales, imageScale and interactionScale.
     * The current scale is the product of these two scales.  This is used throughout the simulation, primarily
     * for transformations.
     */
    getCurrentScale: function() {
      return this.imageScaleProperty.get() * this.interactionScaleProperty.get();
    },

    //Animate the item to the specified location
    animateTo: function( x, y, destination ) {
      this.animationStateProperty.set( { enabled: true, x: x, y: y, destination: destination } );
    },

    //Animate the item to its original location
    animateHome: function() {

      //Make the characters face their original direction so that they won't be displaced within the toolbox, see #16
      this.directionProperty.set( 'left' );
      this.animateTo( this.initialX, this.initialY, 'home' );
    },

    //Cancel an animation when the user clicks on an item
    cancelAnimation: function() {
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
    },

    /**
     * Reset the item to its initial state by resetting all Properties.
     * @public
     */
    reset: function() {
      this.positionProperty.reset();
      this.pusherInsetProperty.reset();
      this.draggingProperty.reset();
      this.directionProperty.reset();
      this.animationStateProperty.reset();
      this.onBoardProperty.reset();
      this.imageScaleProperty.reset();
      this.interactionScaleProperty.reset();
    },

    //Step the item in time, making it grow or shrink (if necessary), or animate to its destination
    step: function( dt ) {
      if ( this.draggingProperty.get() ) {
        this.interactionScaleProperty.set( Math.min( this.interactionScaleProperty.get() + 9 * dt, 1.3 ) );
      }
      else if ( this.animationStateProperty.get().destination === 'home' ) {
        this.interactionScaleProperty.set( Math.max( this.interactionScaleProperty.get() - 9 * dt, this.homeScale ) );
      }

      if ( this.animationStateProperty.get().enabled ) {
        const destination = new Vector2( this.animationStateProperty.get().x, this.animationStateProperty.get().y );

        //Make sure not to blend outside of 0..1 or it could cause overshooting and oscillation
        const blendAmount = Util.clamp( 15 * dt, 0.1, 0.9 );
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
  } );
} );