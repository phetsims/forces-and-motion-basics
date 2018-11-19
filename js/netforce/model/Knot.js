// Copyright 2013-2018, University of Colorado Boulder

/**
 * Model for the 8 knots that appear on the rope.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanIO = require( 'TANDEM/types/BooleanIO' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var KnotIO = require( 'FORCES_AND_MOTION_BASICS/netforce/model/KnotIO' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var PhetioObject = require( 'TANDEM/PhetioObject' );
  var Property = require( 'AXON/Property' );
  var PropertyIO = require( 'AXON/PropertyIO' );
  var Tandem = require( 'TANDEM/Tandem' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * Constructor for the 8 knots that appear along the rope.
   *
   * @param {number} x - the horizontal position (in meters) of the knot
   * // TODO: Fix JSDoc
   * @param {string} type - whether the knot is for red or blue pullers
   * @param ropeStart
   * @param {number} ropeLength - the length of the rope in model coordinates
   * @param {Object} options - required
   * @constructor
   */
  function Knot( x, type, ropeStart, ropeLength, options ) {

    options = _.extend( {
      tandem: Tandem.required,
      phetioType: KnotIO
    }, options );
    var tandem = options.tandem;

    this.initX = x;
    this.type = type;

    // @public {number} - the 1-D x location of the knot
    this.xProperty = new NumberProperty( x, {
      tandem: tandem.createTandem( 'xProperty' ),
      units: 'meters'
      // TODO: Fix range, was buggy during https://github.com/phetsims/axon/issues/137 and hence removed
    } );

    // @public {boolean} - whether or not the know is visible
    this.visibleProperty = new Property( false, {
      tandem: tandem.createTandem( 'visibleProperty' ),
      phetioType: PropertyIO( BooleanIO )
    } );

    // the knot needs a unique ID so that it can be easily found by pullers in the Parallel DOM.
    this.acessibleKnotId = 'knot-' + type + '-' + this.initX;

    // Constant value for the y position (in screen coordinates)
    this.y = 285;

    PhetioObject.call( this, options );
  }

  forcesAndMotionBasics.register( 'Knot', Knot );

  return inherit( PhetioObject, Knot, {

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