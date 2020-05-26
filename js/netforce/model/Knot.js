// Copyright 2013-2020, University of Colorado Boulder

/**
 * Model for the 8 knots that appear on the rope.
 *
 * @author Sam Reid
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import required from '../../../../phet-core/js/required.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import KnotIO from './KnotIO.js';

/**
 * Constructor for the 8 knots that appear along the rope.
 *
 * @param {number} x - the horizontal position (in meters) of the knot
 * // TODO: Fix JSDoc
 * @param {string} type - whether the knot is for red or blue pullers
 * @param ropeStart
 * @param {number} ropeLength - the length of the rope in model coordinates
 * @param {Object} [options]
 * @constructor
 */
function Knot( x, type, ropeStart, ropeLength, options ) {

  options = merge( {

    // {Tandem}
    tandem: required( Tandem.REQUIRED ),
    phetioType: KnotIO
  }, options );
  const tandem = options.tandem;

  this.initX = x;
  this.type = type;

  // @public {number} - the 1-D x position of the knot
  this.xProperty = new NumberProperty( x, {
    tandem: tandem.createTandem( 'xProperty' ),
    units: 'meters'
  } );

  // @public {boolean} - whether or not the know is visible
  this.visibleProperty = new BooleanProperty( false, {
    tandem: tandem.createTandem( 'visibleProperty' )
  } );

  // the knot needs a unique ID so that it can be easily found by pullers in the Parallel DOM.
  this.acessibleKnotId = 'knot-' + type + '-' + this.initX;

  // Constant value for the y position (in screen coordinates)
  this.y = 285;

  PhetioObject.call( this, options );
}

forcesAndMotionBasics.register( 'Knot', Knot );

inherit( PhetioObject, Knot, {

  /**
   * Reset this knot by resetting its associated model Properties.
   *
   * @returns {}
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

export default Knot;
