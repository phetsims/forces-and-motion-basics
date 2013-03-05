define( function( require ) {
  "use strict";
  var red = "red",
      blue = "blue",
      small = "small",
      medium = "medium",
      large = "large";

  var Puller = Backbone.Model.extend( { defaults: { }, initialize: function() {
    this.initAttributes = this.toJSON();//For resetting
  } } );
  var Pullers = Backbone.Collection.extend( { model: Puller } );

  var Knot = Backbone.Model.extend( { defaults: { }, initialize: function() {
    this.initAttributes = this.toJSON();//For resetting
  } } );
  var Knots = Backbone.Collection.extend( { model: Knot } );

  var Cart = Backbone.Model.extend( {defaults: {x: 0, v: 0}} );

  var blueKnots = [10.0, 90.0, 170.0, 250.0];
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
          this.knots = new Knots( [ new Knot( {x: blueKnots[0], type: blue} ),
                                    new Knot( {x: blueKnots[1], type: blue} ),
                                    new Knot( {x: blueKnots[2], type: blue} ),
                                    new Knot( {x: blueKnots[3], type: blue} ),
                                    new Knot( {x: redKnots[0], type: red} ),
                                    new Knot( {x: redKnots[1], type: red} ),
                                    new Knot( {x: redKnots[2], type: red} ),
                                    new Knot( {x: redKnots[3], type: red} ) ] );
        },
        resetAll: function() {
          this.set( this.defaults ); //do not clear, which could remove children set in initialize
          this.cart.set( this.cart.defaults );
          this.pullers.each( function( puller ) {
            puller.set( puller.initAttributes );
            if ( puller.node.knot ) {
              delete puller.node.knot.puller;
            }
            delete puller.node.knot;
          } );
          this.trigger( 'reset-all' );
        },
        step: function( netForce ) {
          if ( this.get( 'running' ) ) {
            var newV = this.cart.get( 'v' ) + netForce / 20000;
            this.cart.set( {v: newV, x: this.cart.get( 'x' ) + newV} );
          }
        }
      } );
} );