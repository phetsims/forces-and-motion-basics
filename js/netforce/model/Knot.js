// Copyright 2013-2015, University of Colorado Boulder

/**
 * Model for the 8 knots that appear on the rope.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var Property = require( 'AXON/Property' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );
  var Range = require( 'DOT/Range' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  // phet-io modules
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );
  var TKnot = require( 'FORCES_AND_MOTION_BASICS/netforce/model/TKnot' );

  /**
   * Constructor for the 8 knots that appear along the rope.
   *
   * @param {number} x the horizontal position (in meters) of the knot
   * @param {string} type whether the knot is for red or blue pullers
   * @param {number} ropeLength - the length of the rope in model coordinates
   * @param {Tandem} tandem
   * @constructor
   */
  function Knot( x, type, ropeStart, ropeLength, tandem ) {

    this.initX = x;
    this.type = type;

    // @public {number} - the 1-D x location of the knot
    this.xProperty = new Property( x, {
      tandem: tandem.createTandem( 'xProperty' ),
      phetioValueType: TNumber( { units: 'meters', range: new Range( ropeStart, ropeLength + ropeStart ) } )
    } );

    // @public {boolean} - whether or not the know is visible
    this.visibleProperty = new Property( false, {
      tandem: tandem.createTandem( 'visibleProperty' ),
      phetioValueType: TBoolean
    } );

    // the knot needs a unique ID so that it can be easily found by pullers in the Parallel DOM.
    this.acessibleKnotId = 'knot-' + type + '-' + this.initX;

    // Constant value for the y position (in screen coordinates)
    this.y = 285;

    tandem.addInstance( this, TKnot );
  }

  forcesAndMotionBasics.register( 'Knot', Knot );

  return inherit( Object, Knot, {

    /**
     * Reset this knot by resetting its associated model Properties.
     * 
     * @return {}
     */
    reset: function() {
      this.xProperty.reset();
      this.visibleProperty.reset();
    },

    /**
     * Get the 2-D position of the knot
     *
     * @returns {Vector2}
     */
    get position() {
      return new Vector2( this.xProperty.get(), this.y );
    }
  } );
} );