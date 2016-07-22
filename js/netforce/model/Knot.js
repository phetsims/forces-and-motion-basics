// Copyright 2013-2015, University of Colorado Boulder

/**
 * Model for the 8 knots that appear on the rope.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  // phet-io types
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );

  /**
   * Constructor for the 8 knots that appear along the rope.
   *
   * @param {number} x the horizontal position (in meters) of the knot
   * @param {string} type whether the knot is for red or blue pullers
   * @constructor
   */
  function Knot( x, type, tandem ) {
    this.initX = x;
    this.type = type;

    // the knot needs a unique ID so that it can be easily found by pullers in the Parallel DOM.
    this.acessibleKnotId = 'knot-' + type + '-' + this.initX;

    PropertySet.call( this, {
      x: x,
      visible: false
    }, {
      tandemSet: {
        x: tandem.createTandem( 'xProperty' ),
        visible: tandem.createTandem( 'visibleProperty' )
      },
      typeSet: {
        x: TNumber && TNumber( 'meters' ),
        visible: TBoolean
      }
    } );

    // Constant value for the y position (in screen coordinates)
    this.y = 285;
  }

  forcesAndMotionBasics.register( 'Knot', Knot );

  return inherit( PropertySet, Knot, {
    /**
     * Get the position of the knot
     *
     * @return {Vector2}
     */
    get position() {
      return new Vector2( this.x, this.y );
    }
  } );
} );