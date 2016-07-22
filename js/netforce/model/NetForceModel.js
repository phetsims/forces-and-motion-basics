// Copyright 2013-2015, University of Colorado Boulder

/**
 * Model for the Net Force screen, in which Pullers can pull on a rope with different forces.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Puller = require( 'FORCES_AND_MOTION_BASICS/netforce/model/Puller' );
  var Knot = require( 'FORCES_AND_MOTION_BASICS/netforce/model/Knot' );
  var Vector2 = require( 'DOT/Vector2' );
  var Cart = require( 'FORCES_AND_MOTION_BASICS/netforce/model/Cart' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  /**
   * Constructor for the net force model.
   *
   * @constructor
   */
  function NetForceModel() {
    var netForceModel = this;

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
      new Puller( 208, bigPullerY, 'blue', 'small', 10 ),
      new Puller( 278, bigPullerY, 'blue', 'small', 10, { other: 'other' } ),
      new Puller( 127, mediumPullerY, 'blue', 'medium', 50, { standOffsetX: -5 } ),
      new Puller( 38, smallPullerY, 'blue', 'large', 70, { standOffsetX: -18 } ),
      new Puller( 648, bigPullerY, 'red', 'small', 10 ),
      new Puller( 717, bigPullerY, 'red', 'small', 10, { other: 'other' } ),
      new Puller( 789, mediumPullerY, 'red', 'medium', 20 ),
      new Puller( 860, smallPullerY, 'red', 'large', 30 )
    ];

    //Create a knot given a color and index (0-3)
    function createKnot( color, index ) {
      return new Knot( (color === 'blue' ? 62 : 680) + index * 80, color );
    }

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

      puller.positionProperty.link( netForceModel.updateVisibleKnots.bind( netForceModel ) );
      puller.on( 'dragged', function() {
        netForceModel.numberPullersAttached = netForceModel.countAttachedPullers();
      } );
      puller.on( 'dropped', function() {
        var knot = netForceModel.getTargetKnot( puller );
        netForceModel.movePullerToKnot( puller, knot );
      } );
    } );

    //Update the started flag
    this.runningProperty.link( function( running ) { if ( running ) { netForceModel.started = true; }} );

    //Update the forces when the number of attached pullers changes
    this.numberPullersAttachedProperty.link( function() {netForceModel.netForce = netForceModel.getNetForce();} );
    this.numberPullersAttachedProperty.link( function() {netForceModel.leftForce = netForceModel.getLeftForce();} );
    this.numberPullersAttachedProperty.link( function() {netForceModel.rightForce = netForceModel.getRightForce();} );
  }

  forcesAndMotionBasics.register( 'NetForceModel', NetForceModel );

  return inherit( PropertySet, NetForceModel, {

    /**
     * Move a puller to a knot.  If no knot is specified, puller is moved to its original location in the Puller
     * toolbox.
     *
     * @param {Puller} puller
     * @param {Knot} [knot] - optional knot where the puller should be moved.
     */
    movePullerToKnot: function( puller, knot ) {

      //try to snap to a knot
      if ( knot ) {
        puller.setValues( { position: new Vector2( knot.x, knot.y ), knot: knot } );
      }

      //Or go back home
      else {
        puller.positionProperty.reset();
      }

      //Keep track of their location to change the attach/detach thresholds, see NetForceModel.getTargetKnot
      puller.lastLocation = knot ? 'knot' : 'home';

      this.numberPullersAttached = this.countAttachedPullers();
    },

    /**
     * Shift the puller to the left.
     *
     * @param  {Puller} puller [description]
     */
    shiftPullerLeft: function( puller ) {
      this.shiftPuller( puller, 0, 4, -1 );
    },

    /**
     * Shift a puller to the right.
     *
     * @param  {Puller} puller
     */
    shiftPullerRight: function( puller ) {
      this.shiftPuller( puller, 3, 7, 1 );
    },

    /**
     * Shift a puller by some delta, restricted by the desired bounds
     * @param  {Puller} puller
     * @param  {number} leftBoundIndex
     * @param  {number} rightBoundIndex
     * @param  {number} delta
     */
    shiftPuller: function( puller, leftBoundIndex, rightBoundIndex, delta ) {
      if ( puller.knot ) {
        var currentIndex = this.knots.indexOf( puller.knot );
        if ( currentIndex !== leftBoundIndex && currentIndex !== rightBoundIndex ) {
          var nextIndex = currentIndex + delta;

          var currentKnot = this.knots[ currentIndex ];
          var nextKnot = this.knots[ nextIndex ];

          var otherPuller = this.getPuller( nextKnot );

          puller.setValues( { position: new Vector2( nextKnot.x, nextKnot.y ), knot: nextKnot } );
          otherPuller && otherPuller.setValues( {
            position: new Vector2( currentKnot.x, currentKnot.y ),
            knot: currentKnot
          } );
        }
      }
    },

    //Count the number of pullers attached to the rope
    countAttachedPullers: function() {
      var count = 0;
      for ( var i = 0; i < this.pullers.length; i++ ) {
        if ( this.pullers[ i ].knot ) {
          count++;
        }
      }
      return count;
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

    /**
     * Gets the puller attached to a knot, or null if none attached to that knot.
     *
     * @param  {Knot} knot
     */
    getPuller: function( knot ) {
      var find = _.find( this.pullers, function( puller ) {return puller.knot === knot;} );
      return typeof(find) !== 'undefined' ? find : null;
    },

    /**
     * Given a puller, returns a function that computes the distance between that puller and any knot.
     *
     * @param  {Puller} puller
     * return {function}
     */
    getKnotPullerDistance: function( puller ) {

      // the blue pullers face to the right, so add a small correction so the distance feels more 'natural' when
      // placing the blue pullers
      var dx = puller.type === 'red' ? 0 : -40;
      return function( knot ) { return Math.sqrt( Math.pow( knot.x - puller.position.x + dx, 2 ) + Math.pow( knot.y - puller.position.y, 2 ) ); };
    },

    /**
     * Gets the closest unoccupied knot to the given puller, which is being dragged.
     *
     * @param  {Puller} puller [description]
     * @return {Knot}
     */
    getClosestOpenKnot: function( puller ) {
      var netForceModel = this;
      var filter = this.knots.filter( function( knot ) {
        return knot.type === puller.type && netForceModel.getPuller( knot ) === null;
      } );
      return _.min( filter, this.getKnotPullerDistance( puller ) );
    },

    /**
     * Gets the closest unoccupied knot to the given puller, which is being dragged.
     *
     * @param  {Puller} puller
     * @return {Knot}
     */
    getClosestOpenKnotFromCart: function( puller ) {
      var idx = puller.type === 'red' ? 4 : 3;
      var delta = puller.type === 'red' ? 1 : -1;
      while ( this.getPuller( this.knots[ idx ] ) !== null ) {
        idx += delta;
      }
      return this.knots[ idx ];
    },

    /**
     * Gets the closest unoccupied knot to the given puller if it is close enough to grab.
     * @param  {Puller} puller
     * @return {Knot}
     */
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
      this.trigger0( 'cart-returned' );
      this.started = false;
    },

    //Reset the entire model when "reset all" is pressed
    reset: function() {
      PropertySet.prototype.reset.call( this );

      //Unset the knots before calling reset since the change of the number of attached pullers causes the force arrows to update
      this.pullers.forEach( function( puller ) {puller.disconnect();} );

      this.cart.reset();
      this.pullers.forEach( function( puller ) {
        // if the puller is being dragged, we will need to cancel the drag in PullerNode
        if ( !puller.dragging ) {
          puller.reset();
        }
      } );
      this.knots.forEach( function( knot ) {knot.reset();} );
      this.trigger0( 'reset-all' );
    },

    /**
     * Update the physics when the clock ticks
     *
     * @param {number} dt
     */
    step: function( dt ) {
      if ( this.running ) {

        // Make the simulation run fast enough when only one puller, but slow enough when 4 pullers.
        var newV = this.cart.v + this.getNetForce() * dt * 0.00075;
        var newX = this.cart.x + newV * dt * 60.0;
        this.cart.setValues( { v: newV, x: newX } );
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
    getNetForce: function() {
      return this.getLeftForce() + this.getRightForce();
    },

    /**
     * Get an array of pullers of the specified type (color string)
     * @param  {striing} type - one of 'red' or 'blue'
     * @return {Array<Puller>}
     */
    getPullers: function( type ) {
      return _.filter( this.pullers, function( p ) {return p.type === type && p.knot;} );
    },

    /**
     * Function for internal use that helps to sum forces in _.reduce, see getLeftForce, getRightForce
     *
     * @param  {string} memo
     * @param  {Puller} puller
     * @return {string}
     */
    sumForces: function( memo, puller ) {
      return memo + puller.force;
    },

    //Gets the left force on the cart, applied by left and pullers
    getLeftForce: function() {
      return -_.reduce( this.getPullers( 'blue' ), this.sumForces, 0 );
    },

    //Gets the right force on the cart, applied by right pullers
    getRightForce: function() {
      return _.reduce( this.getPullers( 'red' ), this.sumForces, 0 );
    },

    /**
     * Gets the closest unoccupied knot to the given puller, which is being dragged.
     * @param  {Puller} puller
     * @param  {nuber} delta
     * @return {Knot}
     */
    getClosestOpenKnotInDirection: function( puller, delta ) {
      var netForceModel = this;
      var isInRightDirection = function( sourceKnot, destinationKnot, delta ) {
        assert && assert( delta < 0 || delta > 0 );
        return delta < 0 ? destinationKnot.x < sourceKnot.x :
               delta > 0 ? destinationKnot.x > sourceKnot.x :
               'error';
      };
      var filter = this.knots.filter( function( knot ) {
        return knot.type === puller.type &&
               netForceModel.getPuller( knot ) === null &&
               isInRightDirection( puller.knot, knot, delta );
      } );
      var result = _.min( filter, this.getKnotPullerDistance( puller ) );
      if ( result === Infinity || result === -Infinity ) {
        result = null;
      }
      return result;
    },

    /**
     * Get the next open knot in a given direction.  Very similar to the function above, but with a resultant knot
     * is a function of the distance to the next knot, not of the distance to the puller.  This is necessary because
     * when dragging, the puller does not yet have an associated knot.
     *
     * @param {Knot} sourceKnot
     * @param {Puller} puller
     * @param {number} delta
     */
    getNextOpenKnotInDirection: function( sourceKnot, puller, delta ) {
      var netForceModel = this;
      var isInRightDirection = function( destinationKnot, delta ) {
        assert && assert( delta < 0 || delta > 0 );
        return delta < 0 ? destinationKnot.x < sourceKnot.x :
               delta > 0 ? destinationKnot.x > sourceKnot.x :
               'error';
      };
      var filter = this.knots.filter( function( knot ) {
        return knot.type === puller.type &&
               netForceModel.getPuller( knot ) === null &&
               isInRightDirection( knot, delta );
      } );
      var result = _.min( filter, function( knot ) {
        return Math.abs( sourceKnot.x - knot.x );
      } );

      // we have reached the end of the knots.  Return either the first or last knot to loop the choice.
      if ( result === Infinity || result === -Infinity ) {
        result = null;
      }
      return result;
    },

    /**
     * Move a puller to an adjacent open knot in a direction specified by delta.
     *
     * @param  {Puller} puller
     * @param  {number} delta
     */
    movePullerToAdjacentOpenKnot: function( puller, delta ) {
      var closestOpenKnot = this.getClosestOpenKnotInDirection( puller, delta );
      if ( closestOpenKnot ) {
        this.movePullerToKnot( puller, closestOpenKnot );
      }
    }
  } );
} );