// Copyright 2017, University of Colorado Boulder

/**
 * Constructs a shape that looks like trapezoid.  This shape is to be placed in the screen view at a place that
 * makes it look like this is the item that is stopping motion when the game of tug of war is over.
 * 
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  // constants
  var DIRECTIONS = [ 'left', 'right' ];

  /**
   * @constructor
   */
  function CartStopperNode( topWidth, bottomWidth, height, tandem, options ) {
    options = _.extend( {
      direction: 'left',

      fill: 'grey'
    }, options );

    var stopperShape = new Shape().moveTo( 0, 0 ).lineTo( bottomWidth, 0 ).lineTo( topWidth, -height ).lineTo( 0, -height );
    Path.call( this, stopperShape );

    // flip around the y axis
    assert && assert( _.includes( DIRECTIONS, options.direction ), 'stopper can only have directon "left" or "right"' );
    if ( options.direction === 'right' ) {
      this.scale( -1, 1 );
    }

    options.tandem = tandem;

    // mutate after scaling so that positioning is correct
    this.mutate( options );
  }

  forcesAndMotionBasics.register( 'CartStopperNode', CartStopperNode );

  return inherit( Path, CartStopperNode );
} );