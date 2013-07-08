// Copyright 2002-2013, University of Colorado Boulder

//Model for the Tug of War tab, in which Pullers can pull on a rope with different forces.
define( function( require ) {
  'use strict';

  var
    Property = require( 'AXON/Property' ),
    PropertySet = require( 'AXON/PropertySet' ),
    inherit = require( 'PHET_CORE/inherit' ),
    Puller = require( 'tugofwar/model/Puller' ),
    Knot = require( 'tugofwar/model/Knot' ),
    Cart = require( 'tugofwar/model/Cart' );

  //Abbreviations for colors and sizes used in this file.
  var
    red = 'red',
    blue = 'blue',
    small = 'small',
    medium = 'medium',
    large = 'large';

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
      new Puller( 38, smallPullerY, blue, large, 80 ),
      new Puller( 127, mediumPullerY, blue, medium, 50 ),
      new Puller( 208, bigPullerY, blue, small, 20 ),
      new Puller( 278, bigPullerY, blue, small, 20 ),
      new Puller( 648, bigPullerY, red, small, 10 ),
      new Puller( 717, bigPullerY, red, small, 10 ),
      new Puller( 789, mediumPullerY, red, medium, 20 ),
      new Puller( 860, smallPullerY, red, large, 30 )
    ];

    //Create a knot given a color and index (0-3)
    function createKnot( color, index ) { return new Knot( (color === 'blue' ? 62 : 680) + index * 80, color ); }

    //Create the knots
    this.knots = [
      createKnot( blue, 0 ),
      createKnot( blue, 1 ),
      createKnot( blue, 2 ),
      createKnot( blue, 3 ),
      createKnot( red, 0 ),
      createKnot( red, 1 ),
      createKnot( red, 2 ),
      createKnot( red, 3 )
    ];

    //When any puller is dragged, update the closest knots to be visible
    this.pullers.forEach( function( puller ) {
      puller.xProperty.link( tugOfWarModel.updateVisibleKnots.bind( tugOfWarModel ) );
      puller.yProperty.link( tugOfWarModel.updateVisibleKnots.bind( tugOfWarModel ) );
      puller.draggingProperty.link( function( dragging, oldDragging ) {

        //Bail on init, only want to handle when the puller is dropped
        //TODO: could use events like trigger for this
        if ( oldDragging === null ) {
          return;
        }

        if ( !dragging ) {
          var knot = tugOfWarModel.getTargetKnot( puller );

          //try to snap to a knot
          if ( knot ) {
            puller.set( {x: knot.x, y: knot.y, knot: knot} );
          }

          //Or go back home
          else {
            puller.xProperty.reset();
            puller.yProperty.reset();
          }

          //Keep track of their location to change the attach/detach thresholds, see TugOfWarModel.getTargetKnot
          puller.lastLocation = knot ? 'knot' : 'home';

          tugOfWarModel.numberPullersAttached = tugOfWarModel.countAttachedPullers();
        }
      } );
    } );
    this.runningProperty.link( function( running ) { if ( running ) { tugOfWarModel.started = true; }} );

    this.numberPullersAttachedProperty.link( function() {tugOfWarModel.netForce = tugOfWarModel.getNetForce();} );
    this.numberPullersAttachedProperty.link( function() {tugOfWarModel.leftForce = tugOfWarModel.getLeftForce();} );
    this.numberPullersAttachedProperty.link( function() {tugOfWarModel.rightForce = tugOfWarModel.getRightForce();} );
  }

  return inherit( PropertySet, TugOfWarModel, {
    countAttachedPullers: function() {
      return this.pullers.filter(function( puller ) {return puller.knot;} ).length;
    },
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
    getPuller: function( knot ) {
      var find = _.find( this.pullers, function( puller ) {return puller.knot === knot;} );
      return typeof(find) !== 'undefined' ? find : null;
    },
    getClosestOpenKnot: function( puller ) {
      var model = this;
      var distance = function( knot ) {
        return Math.sqrt( Math.pow( knot.x - puller.x, 2 ) + Math.pow( knot.y - puller.y, 2 ) );
      };
      var filter = this.knots.filter( function( knot ) {
        return knot.type === puller.type && model.getPuller( knot ) === null;
      } );
      var target = _.min( filter, distance );
      return target;
    },
    getTargetKnot: function( puller ) {
      var distance = function( knot ) {
        return Math.sqrt( Math.pow( knot.x - puller.x, 2 ) + Math.pow( knot.y - puller.y, 2 ) );
      };
      var target = this.getClosestOpenKnot( puller );
      var distanceToTarget = distance( target );

      //Only accept a target knot if the puller's head is close enough to the knot
      var threshold = puller.lastLocation === 'home' ? 370 : 300;
      if ( distanceToTarget < 220 && puller.y < threshold ) {
        return target;
      }
      else {
        return null;
      }
    },
    returnCart: function() {
      this.cart.reset();
      this.knots.forEach( function( knot ) {knot.reset();} );
      this.running = false;
      this.started = false;
      this.state = 'experimenting';
      this.trigger( 'cart-returned' );
    },
    reset: function() {
      PropertySet.prototype.reset.call( this );

      //Unset the knots before calling reset since the change of the number of attached pullers causes the force arrows to update
      this.pullers.forEach( function( puller ) {puller.disconnect();} );

      this.cart.reset();
      this.pullers.forEach( function( puller ) { puller.reset(); } );
      this.knots.forEach( function( knot ) {knot.reset();} );
      this.trigger( 'reset-all' );

      //Wacky workaround to make sure the arrows get the notification last after all forces have been updated.
      //TODO: Switch to use an event trigger
      this.numberPullersAttached = 1;
      this.numberPullersAttached = 0;
    },
    step: function( dt ) {
      if ( this.running ) {
        var newV = this.cart.v + this.getNetForce() / 20000;
        var newX = this.cart.x + newV;
        this.cart.set( {v: newV, x: newX} );
        this.knots.forEach( function( knot ) {
          knot.x = knot.initX + newX;
        } );

        if ( this.cart.x > 200 || this.cart.x < -200 ) {
          this.running = false;
          this.state = 'completed';
        }
      }
      this.time = this.time + dt;
    },
    getNetForce: function() {
      return this.getLeftForce() + this.getRightForce();
    },
    getLeftForce: function() {
      var sum = 0;

      this.pullers.forEach( function( puller ) {
        if ( puller.type === blue && puller.knot ) {
          sum -= puller.force;
        }
      } );
      return sum;
    },
    getRightForce: function() {
      var sum = 0;

      this.pullers.forEach( function( puller ) {
        if ( puller.type === red && puller.knot ) {
          sum += puller.force;
        }
      } );
      return sum;
    }
  } );
} );