define( function( require ) {
  "use strict";
  var Property = require( 'AXON/Property' );
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Puller = require( 'tugofwar/model/Puller' );
  var Knot = require( 'tugofwar/model/Knot' );
  var Cart = require( 'tugofwar/model/Cart' );

  var red = "red",
    blue = "blue",
    small = "small",
    medium = "medium",
    large = "large";

  function TugOfWarModel() {
    PropertySet.call( this, {
      started: false,
      showSumOfForces: false,
      showValues: false,
      running: false,
      volumeOn: false,
      numberPullersAttached: 0,
      state: 'experimenting',
      time: 0
    } );

    //Mix in backbone events for trigger, on, once, etc.
    _.extend( this, Backbone.Events );

    this.cart = new Cart();
    //Create the pullers from left to right so the tab order will be as expected.
    var dy = -14;

    var bluePullers = [new Puller( 38, 407 + dy + 1, blue, large, 80 ),
      new Puller( 132 - 5, 446 + dy - 6, blue, medium, 50 ),
      new Puller( 198 + 10, 500 + dy - 13, blue, small, 20 ),
      new Puller( 260 + 18, 500 + dy - 13, blue, small, 20 )];

    this.pullers = [
      bluePullers[0],
      bluePullers[1],
      bluePullers[2],
      bluePullers[3],
      new Puller( 624 + 19 + 5, bluePullers[3].y, red, small, 10 ),
      new Puller( 684 + 28 + 5, bluePullers[2].y, red, small, 10 ),
      new Puller( 756 - 4 + 32 + 5, bluePullers[1].y, red, medium, 20 ),
      new Puller( 838 - 8 + 25 + 5, bluePullers[0].y, red, large, 30 )
    ];
    this.knots = [
      new Knot( 62 + 80 * 0, blue ),
      new Knot( 62 + 80 * 1, blue ),
      new Knot( 62 + 80 * 2, blue ),
      new Knot( 62 + 80 * 3, blue ),
      new Knot( 680 + 80 * 0, red ),
      new Knot( 680 + 80 * 1, red ),
      new Knot( 680 + 80 * 2, red ),
      new Knot( 680 + 80 * 3, red ) ];
    var model = this;

    //When any puller is dragged, update the closest knots to be visible
    this.pullers.forEach( function( puller ) {
      puller.xProperty.link( model.updateVisibleKnots.bind( model ) );
      puller.yProperty.link( model.updateVisibleKnots.bind( model ) );
      puller.draggingProperty.link( function( dragging, oldDragging ) {

        //Bail on init, only want to handle when the puller is dropped
        //TODO: could use events like trigger for this
        if ( oldDragging === null ) {
          return;
        }

        if ( !dragging ) {
          var knot = model.getTargetKnot( puller );

          //try to snap to a knot
          if ( knot ) {
            puller.set( {x: knot.x, y: knot.y, knot: knot} );
          }

          //Or go back home
          else {
            puller.xProperty.reset();
            puller.yProperty.reset();
          }

          model.numberPullersAttached = model.countAttachedPullers();
        }
      } );
    } );
    this.runningProperty.link( function( running ) { if ( running ) { model.started = true; }} );
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
      return typeof(find) !== "undefined" ? find : null;
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
      if ( distanceToTarget < 150 ) {
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
      this.pullers.forEach( function( puller ) {puller.knot = null;} );

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