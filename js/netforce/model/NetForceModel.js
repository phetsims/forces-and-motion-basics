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
  var Range = require( 'DOT/Range' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );
  var TString = require( 'ifphetio!PHET_IO/types/TString' );
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );
  var TNetForceModel = require( 'FORCES_AND_MOTION_BASICS/netforce/model/TNetForceModel' );

  /**
   * Constructor for the net force model.
   *
   * @param {Tandem} tandem
   * @constructor
   */
  function NetForceModel( tandem ) {

    var self = this;

    var properties = {

      started: {
        value: false,
        tandem: tandem.createTandem( 'startedProperty' ),
        phetioValueType: TBoolean
      },

      running: {
        value: false,
        tandem: tandem.createTandem( 'runningProperty' ),
        phetioValueType: TBoolean
      },

      numberPullersAttached: {
        value: 0,
        tandem: tandem.createTandem( 'numberPullersAttachedProperty' ),
        phetioValueType: TNumber()
      },

      state: {
        value: 'experimenting', //TODO what are the valid values?
        tandem: tandem.createTandem( 'stateProperty' ),
        phetioValueType: TString
      },

      time: {
        value: 0
        // TODO: Removed this property for phet-io spam
        // tandem: tandem.createTandem( 'timeProperty' )
        // phetioValueType: TNumber( 'seconds' )
      },

      netForce: {
        value: 0,
        tandem: tandem.createTandem( 'netForceProperty' ),
        phetioValueType: TNumber( { units: 'newtons', range: new Range( -350, 350 ) } )
      },

      leftForce: {
        value: 0,
        tandem: tandem.createTandem( 'leftForceProperty' ),
        phetioValueType: TNumber( { units: 'newtons', range: new Range( -350, 0 ) } )
      },

      rightForce: {
        value: 0,
        tandem: tandem.createTandem( 'rightForceProperty' ),
        phetioValueType: TNumber( { units: 'newtons', range: new Range( 0, 350 ) } )
      },

      duration: {
        value: 0,
        tandem: tandem.createTandem( 'durationProperty' ),
        phetioValueType: TNumber( { units: 'seconds' } )
      },

      // User settings
      showSumOfForces: {
        value: false,
        tandem: tandem.createTandem( 'showSumOfForcesProperty' ),
        phetioValueType: TBoolean
      },
      showValues: {
        value: false,
        tandem: tandem.createTandem( 'showValuesProperty' ),
        phetioValueType: TBoolean
      },
      volumeOn: {
        value: false,
        tandem: tandem.createTandem( 'volumeOnProperty' ),
        phetioValueType: TBoolean
      },
      speed: {
        value: 0,
        tandem: tandem.createTandem( 'speedProperty' ),
        phetioValueType: TNumber( { units: 'meters/second' } )
      }
    };

    PropertySet.call( this, null, properties );

    this.cart = new Cart( tandem.createTandem( 'cart' ) );

    //Create a knot given a color and index (0-3)
    function createKnot( color, index, tandem ) {
      return new Knot( (color === 'blue' ? 62 : 680) + index * 80, color, tandem );
    }


    // Create the knots
    // To support PhET-iO, the knots should be created before the pullers.
    // This allows the pullers to be attached to the knots using the PhET-iO API
    this.knots = [
      createKnot( 'blue', 0, tandem.createTandem( 'blueKnot0' ) ),
      createKnot( 'blue', 1, tandem.createTandem( 'blueKnot1' ) ),
      createKnot( 'blue', 2, tandem.createTandem( 'blueKnot2' ) ),
      createKnot( 'blue', 3, tandem.createTandem( 'blueKnot3' ) ),
      createKnot( 'red', 0, tandem.createTandem( 'redKnot0' ) ),
      createKnot( 'red', 1, tandem.createTandem( 'redKnot1' ) ),
      createKnot( 'red', 2, tandem.createTandem( 'redKnot2' ) ),
      createKnot( 'red', 3, tandem.createTandem( 'redKnot3' ) )
    ];

    //Create the pullers from left to right so the tab order (for accessibility) will be as expected.
    var bigPullerY = 473;
    var mediumPullerY = 426;
    var smallPullerY = 394;

    this.pullers = [
      new Puller( 208, bigPullerY, 'blue', 'small', 10, tandem.createTandem( 'smallBluePuller1' ) ),
      new Puller( 278, bigPullerY, 'blue', 'small', 10, tandem.createTandem( 'smallBluePuller2' ), { other: 'other' } ),
      new Puller( 127, mediumPullerY, 'blue', 'medium', 50, tandem.createTandem( 'mediumBluePuller' ), { standOffsetX: -5 } ),
      new Puller( 38, smallPullerY, 'blue', 'large', 70, tandem.createTandem( 'largeBluePuller' ), { standOffsetX: -18 } ),
      new Puller( 648, bigPullerY, 'red', 'small', 10, tandem.createTandem( 'smallRedPuller1' ) ),
      new Puller( 717, bigPullerY, 'red', 'small', 10, tandem.createTandem( 'smallRedPuller2' ), { other: 'other' } ),
      new Puller( 789, mediumPullerY, 'red', 'medium', 20, tandem.createTandem( 'mediumRedPuller' ) ),
      new Puller( 860, smallPullerY, 'red', 'large', 30, tandem.createTandem( 'largeRedPuller' ) )
    ];


    // When any puller is dragged or moved with phet-io, update the closest knots to be visible
    // and change the numberPullersAttached
    this.pullers.forEach( function( puller ) {

      puller.positionProperty.link( self.updateVisibleKnots.bind( self ) );
      puller.on( 'dragged', function() {
        self.numberPullersAttached = self.countAttachedPullers();
      } );
      puller.on( 'dropped', function() {
        var knot = self.getTargetKnot( puller );
        self.movePullerToKnot( puller, knot );
      } );
      puller.knotProperty.link( function() {
        self.numberPullersAttached = self.countAttachedPullers();
      } );
    } );

    //Update the started flag
    this.runningProperty.link( function( running ) { if ( running ) { self.started = true; }} );

    //Update the forces when the number of attached pullers changes
    this.numberPullersAttachedProperty.link( function() {self.netForce = self.getNetForce();} );
    this.numberPullersAttachedProperty.link( function() {self.leftForce = self.getLeftForce();} );
    this.numberPullersAttachedProperty.link( function() {self.rightForce = self.getRightForce();} );

    tandem.addInstance( this, TNetForceModel );
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
      var self = this;
      this.knots.forEach( function( knot ) {knot.visible = false;} );
      this.pullers.forEach( function( puller ) {
        if ( puller.dragging ) {
          var knot = self.getTargetKnot( puller );
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
      var self = this;
      var filter = this.knots.filter( function( knot ) {
        return knot.type === puller.type && self.getPuller( knot ) === null;
      } );
      return _.minBy( filter, this.getKnotPullerDistance( puller ) );
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
      this.duration = 0; // Reset tug-of-war timer
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

        this.duration += dt; // Increment tug-of-war timer

        // Make the simulation run about as fast as the Java version
        var newV = this.cart.v + this.getNetForce() * dt * 0.003;
        this.speedProperty.set( Math.abs( newV ) );

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
      var self = this;
      var isInRightDirection = function( sourceKnot, destinationKnot, delta ) {
        assert && assert( delta < 0 || delta > 0 );
        return delta < 0 ? destinationKnot.x < sourceKnot.x :
               delta > 0 ? destinationKnot.x > sourceKnot.x :
               'error';
      };
      var filter = this.knots.filter( function( knot ) {
        return knot.type === puller.type &&
               self.getPuller( knot ) === null &&
               isInRightDirection( puller.knot, knot, delta );
      } );
      var result = _.minBy( filter, this.getKnotPullerDistance( puller ) );
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
      var self = this;
      var isInRightDirection = function( destinationKnot, delta ) {
        assert && assert( delta < 0 || delta > 0 );
        return delta < 0 ? destinationKnot.x < sourceKnot.x :
               delta > 0 ? destinationKnot.x > sourceKnot.x :
               'error';
      };
      var filter = this.knots.filter( function( knot ) {
        return knot.type === puller.type &&
               self.getPuller( knot ) === null &&
               isInRightDirection( knot, delta );
      } );
      var result = _.minBy( filter, function( knot ) {
        return Math.abs( sourceKnot.x - knot.x );
      } );

      // we have reached the end of the knots.  Return either the first or last knot to loop the choice.
      if ( result === Infinity || result === -Infinity ) {
        result = null;
      }
      return result;
    },

    /**
     * For phet-io, describe what pullers are on what knots
     */
    getKnotDescription: function() {
      return this.pullers.map( function( p ) {
        return {
          id: p.tandem.id, // TODO: addInstance for Puller
          knot: p.knot && p.knot.phetioID
        };
      } );
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