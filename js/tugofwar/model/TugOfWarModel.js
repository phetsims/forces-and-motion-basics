define( function( require ) {
  "use strict";
  var Fort = require( 'FORT/Fort' );
  var Property = require( 'PHETCOMMON/model/property/Property' );
  var PropertySet = require( 'PHETCOMMON/model/property/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Puller = require( 'tugofwar/model/Puller' );
  var Knot = require( 'tugofwar/model/Knot' );
  var Cart = require( 'tugofwar/model/Cart' );

  var red = "red",
      blue = "blue",
      small = "small",
      medium = "medium",
      large = "large";

  var blueKnots = _.map( [10.0, 90.0, 170.0, 250.0], function( v ) {return v + 50;} );
  var ropeWidth = 880;
  var redKnots = _.map( blueKnots, function( v ) {return ropeWidth - v;} );
  return Fort.Model.extend(
      {
        defaults: {
          started: false,
          showSumOfForces: false,
          showValues: false,
          running: false,
          volumeOn: false,
          blueKnots: blueKnots,
          redKnots: redKnots,
          numberPullersAttached: 0,
          state: 'experimenting',
          time: 0
        },
        init: function() {
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
            new Puller( 624 + 19 + 5, bluePullers[3].y.value, red, small, 10 ),
            new Puller( 684 + 28 + 5, bluePullers[2].y.value, red, small, 10 ),
            new Puller( 756 - 4 + 32 + 5, bluePullers[1].y.value, red, medium, 20 ),
            new Puller( 838 - 8 + 25 + 5, bluePullers[0].y.value, red, large, 30 )
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
            puller.x.link( model.updateVisibleKnots.bind( model ) );
            puller.y.link( model.updateVisibleKnots.bind( model ) );
            puller.dragging.link( function( dragging ) {
              if ( !dragging ) {
                var knot = model.getTargetKnot( puller );

                //try to snap to a knot
                if ( knot ) {
                  puller.set( {x: knot.x.value, y: knot.y, knot: knot} );
                }

                //Or go back home
                else {
                  puller.x.reset();
                  puller.y.reset();
                }

                model.numberPullersAttached = model.countAttachedPullers();
              }
            } );
          } );
          this.link( 'running', function( running ) { if ( running ) { model.started = true; }} );
        },
        countAttachedPullers: function() {
          return this.pullers.filter(function( puller ) {return puller.knot.value;} ).length;
        },
        updateVisibleKnots: function() {
          var model = this;
          this.knots.forEach( function( knot ) {knot.visible.value = false;} );
          this.pullers.forEach( function( puller ) {
            if ( puller.dragging.value ) {
              var knot = model.getTargetKnot( puller );
              if ( knot ) {
                knot.visible.value = true;
              }
            }
          } );
        },
        getPuller: function( knot ) {
          var find = _.find( this.pullers, function( puller ) {return puller.knot.value === knot;} );
          return typeof(find) !== "undefined" ? find : null;
        },
        getClosestOpenKnot: function( puller ) {
          var model = this;
          var distance = function( knot ) {
            return Math.sqrt( Math.pow( knot.x.value - puller.x.value, 2 ) + Math.pow( knot.y - puller.y.value, 2 ) );
          };
          var filter = this.knots.filter( function( knot ) {
            return knot.type === puller.type && model.getPuller( knot ) === null;
          } );
          var target = _.min( filter, distance );
          return target;
        },
        getTargetKnot: function( puller ) {
          var distance = function( knot ) {
            return Math.sqrt( Math.pow( knot.x.value - puller.x.value, 2 ) + Math.pow( knot.y - puller.y.value, 2 ) );
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

          //Unset the knots before calling reset since the change of the number of attached pullers causes the force arrows to update
          this.pullers.forEach( function( puller ) {puller.knot.value = null;} );

          Fort.Model.prototype.reset.call( this );
          this.cart.reset();
          this.pullers.forEach( function( puller ) { puller.reset(); } );
          this.knots.forEach( function( knot ) {knot.reset();} );
          this.trigger( 'reset-all' );
        },
        step: function( dt ) {
          if ( this.running ) {
            var newV = this.cart.v.value + this.getNetForce() / 20000;
            var newX = this.cart.x.value + newV;
            this.cart.set( {v: newV, x: newX} );
            this.knots.forEach( function( knot ) {
              knot.x.value = knot.initX + newX;
            } );

            if ( this.cart.x.value > 200 || this.cart.x.value < -200 ) {
              this.running = false;
              this.state = 'completed';
            }
          }
          this.time = this.time + dt;
          this.trigger( 'step' );
        },
        getNetForce: function() {
          return this.getLeftForce() + this.getRightForce();
        },
        getLeftForce: function() {
          var sum = 0;

          this.pullers.forEach( function( puller ) {
            if ( puller.type === blue && puller.knot.value ) {
              sum -= puller.force;
              if ( isNaN( sum ) ) { throw new Error( 'nan' ); }
            }
          } );
          return sum;
        },
        getRightForce: function() {
          var sum = 0;

          this.pullers.forEach( function( puller ) {
            if ( puller.type === red && puller.knot.value ) {
              sum += puller.force;
            }
          } );
          return sum;
        }
      } );
} );