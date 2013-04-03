define( function( require ) {
  "use strict";
  var Fort = require( 'FORT/Fort' );
  var red = "red",
      blue = "blue",
      small = "small",
      medium = "medium",
      large = "large";

  var Puller = Fort.Model.extend( { defaults: { dragging: false, knot: null},

                                    //For resetting
                                    init: function() {
                                      this.initAttributes = this.toJSON();
                                      this.initX = this.x;
                                      this.initY = this.y;
                                      this.force = this.size === small ? 10 * 5 :
                                                   this.size === medium ? 20 * 5 :
                                                   this.size === large ? 30 * 5 :
                                                   NaN;
                                    },
                                    disconnect: function() {this.knot = null;}
                                  } );
  var Pullers = Backbone.Collection.extend( { defaults: {knot: null}, model: Puller } );

  var Knot = Fort.Model.extend( {
                                  defaults: { y: 275, visible: false},
                                  init: function() {
                                    this.initAttributes = this.toJSON();//For resetting
                                    this.initX = this.x;
                                  } } );
  var Knots = Backbone.Collection.extend( { model: Knot } );

  var Cart = Fort.Model.extend( {defaults: {x: 0, v: 0}, initialize: function() {this.generateGettersAndSetters();}} );

  var blueKnots = _.map( [10.0, 90.0, 170.0, 250.0], function( v ) {return v + 50;} );
  var ropeWidth = 880;
  var redKnots = _.map( blueKnots, function( v ) {return ropeWidth - v;} );
  return Fort.Model.extend(
      {
        defaults: {
          showSumOfForces: false,
          showValues: false,
          running: false,
          volumeOn: false,
          blueKnots: blueKnots,
          redKnots: redKnots,
          numberPullersAttached: 0,
          state: 'experimenting'
        },
        init: function() {
          this.cart = new Cart();
          //Create the pullers from left to right so the tab order will be as expected.
          this.pullers = new Pullers( [
                                        new Puller( {x: 38, y: 407, dragOffsetX: 80, type: blue, size: large  } ),
                                        new Puller( {x: 132, y: 446, dragOffsetX: 50, type: blue, size: medium} ),
                                        new Puller( {x: 198, y: 500, dragOffsetX: 20, type: blue, size: small } ),
                                        new Puller( {x: 260, y: 500, dragOffsetX: 20, type: blue, size: small } ),
                                        new Puller( {x: 624, y: 500, dragOffsetX: 10, type: red, size: small } ),
                                        new Puller( {x: 684, y: 500, dragOffsetX: 10, type: red, size: small } ),
                                        new Puller( {x: 756, y: 446, dragOffsetX: 20, type: red, size: medium } ),
                                        new Puller( {x: 838, y: 407, dragOffsetX: 30, type: red, size: large  } )
                                      ] );
          this.knots = new Knots( [ new Knot( {x: 62 + 80 * 0, type: blue} ),
                                    new Knot( {x: 62 + 80 * 1, type: blue} ),
                                    new Knot( {x: 62 + 80 * 2, type: blue} ),
                                    new Knot( {x: 62 + 80 * 3, type: blue} ),
                                    new Knot( {x: 680 + 80 * 0, type: red} ),
                                    new Knot( {x: 680 + 80 * 1, type: red} ),
                                    new Knot( {x: 680 + 80 * 2, type: red} ),
                                    new Knot( {x: 680 + 80 * 3, type: red} ) ] );
          var model = this;

          //When any puller is dragged, update the closest knots to be visible
          this.pullers.each( function( puller ) {
            puller.on( 'change:x change:y', function() { model.updateVisibleKnots(); } );
            puller.on( 'change:dragging', function( puller, dragging ) {
              if ( !dragging ) {
                var knot = model.getTargetKnot( puller );

                //try to snap to a knot
                if ( knot ) {
                  puller.set( {x: knot.x, y: knot.y, knot: knot} );
                }

                //Or go back home
                else {
                  puller.set( {x: puller.initX, y: puller.initY} );
                }

                model.numberPullersAttached = model.countAttachedPullers();
              }
            } );
          } );
        },
        countAttachedPullers: function() {
          return this.pullers.filter(function( puller ) {return puller.has( 'knot' );} ).length;
        },
        updateVisibleKnots: function() {
          var model = this;
          this.knots.each( function( knot ) {knot.visible = false;} );
          this.pullers.each( function( puller ) {
            if ( puller.get( 'dragging' ) ) {
              var knot = model.getTargetKnot( puller );
              if ( knot ) {
                knot.visible = true;
              }
            }
          } );
        },
        getPuller: function( knot ) {
          var find = this.pullers.find( function( puller ) {return puller.get( 'knot' ) === knot;} );
          return typeof(find) !== "undefined" ? find : null;
        },
        getTargetKnot: function( puller ) {
          var model = this;
          var filter = this.knots.filter( function( knot ) {
            return knot.get( 'type' ) === puller.get( 'type' ) && model.getPuller( knot ) === null;
          } );
          var distance = function( knot ) {
            return Math.sqrt( Math.pow( knot.x - puller.x, 2 ) + Math.pow( knot.y - puller.y, 2 ) );
          };
          var target = _.min( filter, distance );
          var distanceToTarget = distance( target );
          if ( distanceToTarget < 150 ) {
            return target;
          }
          else {
            return null;
          }
        },
        reset: function() {
          Fort.Model.prototype.reset.call( this );
          this.cart.set( this.cart.defaults );
          this.pullers.each( function( puller ) { puller.set( puller.initAttributes ); } );
          this.trigger( 'reset-all' );
          this.knots.each( function( knot ) {knot.x = knot.initX;} );
          this.pullers.each( function( puller ) {puller.trigger( 'knot-moved' );} );
        },
        step: function() {
          if ( this.running ) {
            var newV = this.cart.v + this.getNetForce() / 20000;
            var newX = this.cart.x + newV;
            this.cart.set( {v: newV, x: newX} );
            this.knots.each( function( knot ) {
              knot.x = knot.initX + newX;
            } );
            this.pullers.each( function( puller ) {
              puller.trigger( 'knot-moved' );
            } );

            if ( this.cart.x > 200 || this.cart.x < -200 ) {
              this.running = false;
              this.state = 'completed';
            }
          }
        },
        getNetForce: function() {
          return this.getLeftForce() + this.getRightForce();
        },
        getLeftForce: function() {
          var sum = 0;

          this.pullers.each( function( puller ) {
            if ( puller.type === blue && puller.has( 'knot' ) ) {
              sum -= puller.force;
            }
          } );
          return sum;
        },
        getRightForce: function() {
          var sum = 0;

          this.pullers.each( function( puller ) {
            if ( puller.type === red && puller.has( 'knot' ) ) {
              sum += puller.force;
            }
          } );
          return sum;
        }
      } )
      ;
} )
;