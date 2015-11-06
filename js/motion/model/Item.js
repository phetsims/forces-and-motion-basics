// Copyright 2013-2015, University of Colorado Boulder

/**
 * The model for an item that can be dragged out of the toolbox and put into the play area to be pushed.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var Vector2 = require( 'DOT/Vector2' );
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Util = require( 'DOT/Util' );

  function Item( context, name, image, mass, x, y, imageScale, pusherInset, sittingImage, holdingImage, mystery ) {
    var item = this;

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

    //Observable properties
    PropertySet.call( this, {
      position: new Vector2( x, y ),
      pusherInset: pusherInset || 0,
      dragging: false,
      direction: 'left',
      animating: {
        enabled: false,
        x: 0,
        y: 0,
        end: null,
        destination: 'home'
      },
      //Flag for whether the item is on the skateboard
      onBoard: false,

      //How much to increase/shrink the original image.  Could all be set to 1.0 if images pre-scaled in an external program
      imageScale: imageScale || 1.0,

      //How much the object grows or shrinks when interacting with it
      interactionScale: 1.0
    } );

    this.context.directionProperty.link( function( direction ) {

      //only change directions if on the board, and always choose one of left/right, and only for people
      if ( item.onBoard && direction !== 'none' && sittingImage ) {
        item.direction = direction;
      }
    } );
  }

  return inherit( PropertySet, Item, {

    //For unknown reasons, the trash can is not centered when drawn, so we make up for it with a workaround here
    get centeringOffset() {
      return this.image === 'trash-can.png' ? 5 : 0;
    },

    //Return true if the arms should be up (for a human)
    armsUp: function() {
      return this.context.draggingItems().length > 0 || this.context.isItemStackedAbove( this );
    },

    //Animate the item to the specified location
    animateTo: function( x, y, destination ) {
      this.animating = { enabled: true, x: x, y: y, destination: destination };
    },

    //Animate the item to its original location
    animateHome: function() {

      //Make the characters face their original direction so that they won't be displaced within the toolbox, see #16
      this.direction = 'left';
      this.animateTo( this.initialX, this.initialY, 'home' );
    },

    //Cancel an animation when the user clicks on an item
    cancelAnimation: function() {
      if ( this.animating.enabled ) {
        if ( this.dragging ) {
          this.interactionScale = 1.3;
        }
        else {
          if ( this.animating.destination === 'home' ) {
            this.interactionScale = 1.0;
          }
        }
        this.animating = { enabled: false, x: 0, y: 0, end: null, destination: 'home' };
      }
    },

    //Step the item in time, making it grow or shrink (if necessary), or animate to its destination
    step: function( dt ) {
      if ( this.dragging ) {
        this.interactionScale = Math.min( this.interactionScale + 9 * dt, 1.3 );
      }
      else if ( this.animating.destination === 'home' ) {
        this.interactionScale = Math.max( this.interactionScale - 9 * dt, 1.0 );
      }

      if ( this.animating.enabled ) {
        var destination = new Vector2( this.animating.x, this.animating.y );

        //Make sure not to blend outside of 0..1 or it could cause overshooting and oscillation
        var blendAmount = Util.clamp( 15 * dt, 0.1, 0.9 );
        this.position = this.position.blend( destination, blendAmount );

        var distanceToTarget = this.position.distance( destination );
        if ( distanceToTarget < 1 && (this.interactionScale === 1.3 || this.interactionScale === 1) ) {

          //Snap to exact final destination, see #59
          this.position = destination;
          if ( this.animating.end ) {
            this.animating.end();
          }
          this.animating = { enabled: false, x: 0, y: 0, end: null };
        }
      }
    }
  } );
} );