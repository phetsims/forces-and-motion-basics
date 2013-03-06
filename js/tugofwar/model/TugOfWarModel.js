define( function( require ) {
  "use strict";
  var red = "red",
      blue = "blue",
      small = "small",
      medium = "medium",
      large = "large";

  var Puller = Backbone.Model.extend( { defaults: { dragging: false, knot: null},

                                        //For resetting
                                        initialize: function() {
                                          this.initAttributes = this.toJSON();
                                        },
                                        disconnect: function() {}} );
  var Pullers = Backbone.Collection.extend( { defaults: {knot: null}, model: Puller } );

  var Knot = Backbone.Model.extend( {
                                      defaults: { y: 275},
                                      initialize: function() {
                                        this.initAttributes = this.toJSON();//For resetting
                                        this.initX = this.get( 'x' );
                                      } } );
  var Knots = Backbone.Collection.extend( { model: Knot } );

  var Cart = Backbone.Model.extend( {defaults: {x: 0, v: 0}} );

  var blueKnots = _.map( [10.0, 90.0, 170.0, 250.0], function( v ) {return v + 50;} );
  var ropeWidth = 880;
  var redKnots = _.map( blueKnots, function( v ) {return ropeWidth - v;} );
  return Backbone.Model.extend(
      {
        defaults: {
          showSumOfForces: true,
          running: false,
          volumeOn: false,
          blueKnots: blueKnots,
          redKnots: redKnots
        },
        initialize: function() {
          this.cart = new Cart();
          this.pullers = new Pullers( [ new Puller( {x: 260, y: 500, dragOffsetX: 20, type: blue, size: small } ),
                                        new Puller( {x: 198, y: 500, dragOffsetX: 20, type: blue, size: small } ),
                                        new Puller( {x: 132, y: 446, dragOffsetX: 50, type: blue, size: medium} ),
                                        new Puller( {x: 38, y: 407, dragOffsetX: 80, type: blue, size: large  } ),
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
                var knot = model.closestKnot( puller );
                //try to snap to a knot
                puller.set( {x: knot.get( 'x' ), y: knot.get( 'y' ), knot: knot} );
              }
            } );
          } );
        },
        updateVisibleKnots: function() {
          var model = this;
          this.knots.each( function( knot ) {knot.set( 'visible', false );} );
          this.pullers.each( function( puller ) {
            if ( puller.get( 'dragging' ) ) {
              var knot = model.closestKnot( puller );
              knot.set( 'visible', true );
            }
          } );
        },
        closestKnot: function( puller ) {
          var filter = this.knots.filter( function( knot ) {return knot.get( 'type' ) === puller.get( 'type' );} );
          var closest = _.min( filter, function( knot ) {
            return Math.abs( knot.get( 'x' ) - puller.get( 'x' ) );
          } );
          return closest;
        },
        resetAll: function() {
          this.set( this.defaults ); //do not clear, which could remove children set in initialize
          this.cart.set( this.cart.defaults );
          this.pullers.each( function( puller ) {
            puller.set( puller.initAttributes );
          } );
          this.trigger( 'reset-all' );
          this.knots.each( function( knot ) {knot.set( 'x', knot.initX );} );
          this.pullers.each( function( puller ) {puller.trigger( 'knot-moved' );} );
        },
        step: function() {
          if ( this.get( 'running' ) ) {
            var newV = this.cart.get( 'v' ) + this.getNetForce() / 20000;
            var newX = this.cart.get( 'x' ) + newV;
            this.cart.set( {v: newV, x: newX} );
            this.knots.each( function( knot ) {
              knot.set( 'x', knot.initX + newX );
            } );
            this.pullers.each( function( puller ) {
              puller.trigger( 'knot-moved' );
            } );
          }
        },
        getNetForce: function() {
          return this.getLeftForce() + this.getRightForce();
        },
        getLeftForce: function() {
          var sum = 0;

          this.pullers.each( function( puller ) {
            if ( puller.get( 'type' ) == blue && puller.has( 'knot' ) ) {
              sum -= 100;
            }
          } );
          return sum;
        },
        getRightForce: function() {
          var sum = 0;

          this.pullers.each( function( puller ) {
            if ( puller.get( 'type' ) == red && puller.has( 'knot' ) ) {
              sum += 100;
            }
          } );
          return sum;
        }
      } );
} );