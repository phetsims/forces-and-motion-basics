// Copyright 2013-2015, University of Colorado Boulder

/**
 * The model for an item that can be dragged out of the toolbox and put into the play area to be pushed.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var PropertySet = require( 'AXON/PropertySet' );
  var TVector2 = require( 'DOT/TVector2' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var inherit = require( 'PHET_CORE/inherit' );

  // phet-io modules
  var TItem = require( 'FORCES_AND_MOTION_BASICS/motion/model/TItem' );
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );
  var TObject = require( 'ifphetio!PHET_IO/types/TObject' );
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );
  var TString = require( 'ifphetio!PHET_IO/types/TString' );

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
    var self = this;

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

    var properties = {

      position: {
        value: new Vector2( x, y ),
        tandem: tandem.createTandem( 'positionProperty' ),
        phetioValueType: TVector2
      },

      //TODO does this need to be instrumented for phet-io?
      pusherInset: {
        value: pusherInset || 0
      },

      dragging: {
        value: false,
        tandem: tandem.createTandem( 'draggingProperty' ),
        phetioValueType: TBoolean
      },

      direction: {
        value: 'left',
        tandem: tandem.createTandem( 'directionProperty' ),
        phetioValueType: TString
      },

      animationState: {
        value: {
          enabled: false,
          x: 0,
          y: 0,
          end: null,
          destination: 'home'
        },
        tandem: tandem.createTandem( 'animationStateProperty'),
        phetioValueType: TObject
      },

      // Flag for whether the item is on the skateboard
      onBoard: {
        value: false,
        tandem: tandem.createTandem( 'onBoardProperty' ),
        phetioValueType: TBoolean
      },

      // How much to increase/shrink the original image. Could all be set to 1.0 if images pre-scaled in an external program
      imageScale: {
        value: imageScale || 1.0,
        tandem: tandem.createTandem( 'imageScaleProperty' ),
        phetioValueType: TNumber()
      },

      // How much the object grows or shrinks when interacting with it
      interactionScale: {
        value: homeScale || 1.0,
        tandem: tandem.createTandem( 'interactionScaleProperty' ),
        phetioValueType: TNumber()
      }
    };

    PropertySet.call( this, null, properties );

    this.context.directionProperty.link( function( direction ) {

      //only change directions if on the board, and always choose one of left/right, and only for people
      if ( self.onBoard && direction !== 'none' && sittingImage ) {
        self.direction = direction;
      }
    } );

    tandem.addInstance( this, TItem );
  }

  forcesAndMotionBasics.register( 'Item', Item );

  return inherit( PropertySet, Item, {

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
      return this.imageScale * this.interactionScale;
    },

    //Animate the item to the specified location
    animateTo: function( x, y, destination ) {
      this.animationState = { enabled: true, x: x, y: y, destination: destination };
    },

    //Animate the item to its original location
    animateHome: function() {

      //Make the characters face their original direction so that they won't be displaced within the toolbox, see #16
      this.direction = 'left';
      this.animateTo( this.initialX, this.initialY, 'home' );
    },

    //Cancel an animation when the user clicks on an item
    cancelAnimation: function() {
      if ( this.animationState.enabled ) {
        if ( this.dragging ) {
          this.interactionScale = 1.3;
        }
        else {
          if ( this.animationState.destination === 'home' ) {
            this.interactionScale = this.homeScale;
          }
        }
        this.animationState = { enabled: false, x: 0, y: 0, end: null, destination: 'home' };
      }
    },

    //Step the item in time, making it grow or shrink (if necessary), or animate to its destination
    step: function( dt ) {
      if ( this.dragging ) {
        this.interactionScale = Math.min( this.interactionScale + 9 * dt, 1.3 );
      }
      else if ( this.animationState.destination === 'home' ) {
        this.interactionScale = Math.max( this.interactionScale - 9 * dt, this.homeScale );
      }

      if ( this.animationState.enabled ) {
        var destination = new Vector2( this.animationState.x, this.animationState.y );

        //Make sure not to blend outside of 0..1 or it could cause overshooting and oscillation
        var blendAmount = Util.clamp( 15 * dt, 0.1, 0.9 );
        this.position = this.position.blend( destination, blendAmount );

        var distanceToTarget = this.position.distance( destination );
        if ( distanceToTarget < 1 && (this.interactionScale === 1.3 || this.interactionScale === this.homeScale ) ) {

          //Snap to exact final destination, see #59
          this.position = destination;
          if ( this.animationState.end ) {
            this.animationState.end();
          }
          this.animationState = { enabled: false, x: 0, y: 0, end: null };
        }
      }
    }
  } );
} );