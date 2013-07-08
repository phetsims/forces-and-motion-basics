// Copyright 2002-2013, University of Colorado Boulder

//Draw an arrow from the tail to the tip with the specified tail width, and head dimensions.
define( function( require ) {
  'use strict';
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );

  //All parameters are Number
  function arrow( tailX, tailY, tipX, tipY, tailWidth, headWidth, headHeight ) {
    var arrowShape = new Shape();
    if ( tipX === tailX && tipY === tailY ) {
      return arrowShape;
    }
    var vector = new Vector2( tipX - tailX, tipY - tailY );
    var xHatUnit = vector.normalized();
    var yHatUnit = xHatUnit.rotated( Math.PI / 2 );
    var length = vector.magnitude();

    //Set up a coordinate frame that goes from the tail of the arrow to the tip.
    function getPoint( xHat, yHat ) {
      var x = xHatUnit.x * xHat + yHatUnit.x * yHat + tailX;
      var y = xHatUnit.y * xHat + yHatUnit.y * yHat + tailY;
      return new Vector2( x, y );
    }

    if ( headHeight > length / 2 ) {
      headHeight = length / 2;
    }

    var tailLength = length - headHeight;
    var points = [
      getPoint( 0, tailWidth / 2 ),
      getPoint( tailLength, tailWidth / 2 ),
      getPoint( tailLength, headWidth / 2 ),
      getPoint( length, 0 ),
      getPoint( tailLength, -headWidth / 2 ),
      getPoint( tailLength, -tailWidth / 2 ),
      getPoint( 0, -tailWidth / 2 )
    ];

    arrowShape.moveTo( points[0].x, points[0].y );
    var tail = _.tail( points );
    _.each( tail, function( element ) { arrowShape.lineTo( element.x, element.y ); } );
    arrowShape.close();

    return arrowShape;
  }

  return arrow;
} );