// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the Tug of War tab, in which Pullers can pull on a rope with different forces.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var
    Property = require( 'AXON/Property' ),
    PropertySet = require( 'AXON/PropertySet' ),
    inherit = require( 'PHET_CORE/inherit' ),
    Puller = require( 'tugofwar/model/Puller' ),
    Knot = require( 'tugofwar/model/Knot' ),
    Vector2 = require( 'DOT/Vector2' ),
    Cart = require( 'tugofwar/model/Cart' );

  /**
   * Constructor for the tug of war model.
   * @constructor
   */
  function TugOfWarModel() {
    var tugOfWarModel = this;

    //Call the super class, with initial values for observable properties
    PropertySet.call( this, {
      started: false,
      running: false,
      numberPullersAttached: 0,
      state: 'experimenting',
      time: 0,
      netForce: 0,
      leftForce: 0,
      rightForce: 0,

      //User settings
      showSumOfForces: false,
      showValues: false,
      volumeOn: false
    } );

    this.cart = new Cart();

    //Create the pullers from left to right so the tab order (for accessibility) will be as expected.
    var bigPullerY = 473;
    var mediumPullerY = 426;
    var smallPullerY = 394;

    this.pullers = [
      new Puller( 38, smallPullerY, 'blue', 'large', 70, -18 ),
      new Puller( 127, mediumPullerY, 'blue', 'medium', 50, -5 ),
      new Puller( 208, bigPullerY, 'blue', 'small', 10 ),
      new Puller( 278, bigPullerY, 'blue', 'small', 10 ),
      new Puller( 648, bigPullerY, 'red', 'small', 10 ),
      new Puller( 717, bigPullerY, 'red', 'small', 10 ),
      new Puller( 789, mediumPullerY, 'red', 'medium', 20 ),
      new Puller( 860, smallPullerY, 'red', 'large', 30 )
    ];

    //Create a knot given a color and index (0-3)
    function createKnot( color, index ) { return new Knot( (color === 'blue' ? 62 : 680) + index * 80, color ); }

    //Create the knots
    this.knots = [
      createKnot( 'blue', 0 ),
      createKnot( 'blue', 1 ),
      createKnot( 'blue', 2 ),
      createKnot( 'blue', 3 ),
      createKnot( 'red', 0 ),
      createKnot( 'red', 1 ),
      createKnot( 'red', 2 ),
      createKnot( 'red', 3 )
    ];

    //When any puller is dragged, update the closest knots to be visible
    this.pullers.forEach( function( puller ) {

      puller.positionProperty.link( tugOfWarModel.updateVisibleKnots.bind( tugOfWarModel ) );

      puller.on( 'dropped', function() {
        var knot = tugOfWarModel.getTargetKnot( puller );

        //try to snap to a knot
        if ( knot ) {
          puller.set( {position: new Vector2( knot.x, knot.y ), knot: knot} );
        }

        //Or go back home
        else {
          puller.positionProperty.reset();
        }

        //Keep track of their location to change the attach/detach thresholds, see TugOfWarModel.getTargetKnot
        puller.lastLocation = knot ? 'knot' : 'home';

        tugOfWarModel.numberPullersAttached = tugOfWarModel.countAttachedPullers();
      } );
    } );

    //Update the started flag
    this.runningProperty.link( function( running ) { if ( running ) { tugOfWarModel.started = true; }} );

    //Update the forces when the number of attached pullers changes
    this.numberPullersAttachedProperty.link( function() {tugOfWarModel.netForce = tugOfWarModel.getNetForce();} );
    this.numberPullersAttachedProperty.link( function() {tugOfWarModel.leftForce = tugOfWarModel.getLeftForce();} );
    this.numberPullersAttachedProperty.link( function() {tugOfWarModel.rightForce = tugOfWarModel.getRightForce();} );
  }

  return inherit( PropertySet, TugOfWarModel, {

    //Count the number of pullers attached to the rope
    countAttachedPullers: function() {
      return this.pullers.filter(function( puller ) {return puller.knot;} ).length;
    },

    //Change knot visibility (halo highlight) when the pullers are dragged
    updateVisibleKnots: function() {
      var model = this;
      this.knots.forEach( function( knot ) {knot.visible = false;} );
      this.pullers.forEach( function( puller ) {
        if ( puller.dragging ) {
          var knot = model.getTargetKnot( puller );
          if ( knot ) {
            knot.visible = true;
          }
        }
      } );
    },

    //Gets the puller attached to a knot, or null if none attached to that knot.
    getPuller: function( knot ) {
      var find = _.find( this.pullers, function( puller ) {return puller.knot === knot;} );
      return typeof(find) !== 'undefined' ? find : null;
    },

    //Given a puller, returns a function that computes the distance between that puller and any knot
    getKnotPullerDistance: function( puller ) {
      return function( knot ) { return Math.sqrt( Math.pow( knot.x - puller.position.x, 2 ) + Math.pow( knot.y - puller.position.y, 2 ) ); };
    },

    //Gets the closest unoccupied knot to the given puller, which is being dragged.
    getClosestOpenKnot: function( puller ) {
      var tugOfWarModel = this;
      var filter = this.knots.filter( function( knot ) { return knot.type === puller.type && tugOfWarModel.getPuller( knot ) === null; } );
      return _.min( filter, this.getKnotPullerDistance( puller ) );
    },

    //Gets the closest unoccupied knot to the given puller if it is close enough to grab
    getTargetKnot: function( puller ) {
      var target = this.getClosestOpenKnot( puller );
      var distanceToTarget = this.getKnotPullerDistance( puller )( target );

      //Only accept a target knot if the puller's head is close enough to the knot
      var threshold = puller.lastLocation === 'home' ? 370 : 300;
      return distanceToTarget < 220 && puller.position.y < threshold ? target : null;
    },

    //Return the cart and prepare the model for another "go" run
    returnCart: function() {
      this.cart.reset();
      this.knots.forEach( function( knot ) {knot.reset();} );
      this.running = false;
      this.state = 'experimenting';
      this.trigger( 'cart-returned' );
      this.started = false;
    },

    //Reset the entire model when "reset all" is pressed
    reset: function() {
      PropertySet.prototype.reset.call( this );

      //Unset the knots before calling reset since the change of the number of attached pullers causes the force arrows to update
      this.pullers.forEach( function( puller ) {puller.disconnect();} );

      this.cart.reset();
      this.pullers.forEach( function( puller ) { puller.reset(); } );
      this.knots.forEach( function( knot ) {knot.reset();} );
      this.trigger( 'reset-all' );
    },

    //Update the physics when the clock ticks
    step: function( dt ) {
      if ( this.running ) {
        var newV = this.cart.v + this.getNetForce() / 20000;
        var newX = this.cart.x + newV;
        this.cart.set( {v: newV, x: newX} );
        this.knots.forEach( function( knot ) { knot.x = knot.initX + newX; } );

        //If the cart made it to the end, then stop and signify completion
        if ( this.cart.x > 200 || this.cart.x < -200 ) {
          this.running = false;
          this.state = 'completed';
        }
      }
      this.time = this.time + dt;
    },

    //Gets the net force on the cart, applied by both left and right pullers
    getNetForce: function() { return this.getLeftForce() + this.getRightForce(); },

    //Get an array of pullers of the specified type (color string)
    getPullers: function( type ) { return _.filter( this.pullers, function( p ) {return p.type === type && p.knot;} ); },

    //Function for internal use that helps to sum forces in _.reduce, see getLeftForce, getRightForce
    sumForces: function( memo, puller ) {return memo + puller.force;},

    //Gets the left force on the cart, applied by left and pullers
    getLeftForce: function() { return -_.reduce( this.getPullers( 'blue' ), this.sumForces, 0 ); },

    //Gets the right force on the cart, applied by right pullers
    getRightForce: function() { return _.reduce( this.getPullers( 'red' ), this.sumForces, 0 ); }
  } );
} );