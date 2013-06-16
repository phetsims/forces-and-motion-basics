// Copyright 2002-2013, University of Colorado

/**
 * Copied from beers-law-lab\js\common\view\RightArrowButton.js
 * Button with an arrow that points left.
 *
 * @author Chris Malley (PixelZoom, Inc)
 */
define( function( require ) {

  // imports
  var Button = require( 'SUN/Button' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  function LeftArrowButton( callback, options ) {

    var DEFAULT_ARROW_WIDTH = 20;
    options = _.extend( {
        arrowHeight: DEFAULT_ARROW_WIDTH,
        arrowWidth: DEFAULT_ARROW_WIDTH * Math.sqrt( 3 ) / 2,
        cornerRadius: 4,
        xMargin: 7
      },
      options );

    Button.call( this,
      new Path( { fill: "black", shape: new Shape().moveTo( 0, 0 ).lineTo( options.arrowWidth, options.arrowHeight / 2 ).lineTo( 0, options.arrowHeight ).close() } ),
      callback,
      options );
  }

  inherit( Button, LeftArrowButton );

  return LeftArrowButton;
} );