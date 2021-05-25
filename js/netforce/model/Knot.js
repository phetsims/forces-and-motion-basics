// Copyright 2013-2021, University of Colorado Boulder

/**
 * Model for the 8 knots that appear on the rope.
 *
 * @author Sam Reid
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import ReferenceIO from '../../../../tandem/js/types/ReferenceIO.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

class Knot extends PhetioObject {

  /**
   * Constructor for the 8 knots that appear along the rope.
   *
   * @param {number} x - the horizontal position (in meters) of the knot
   * // TODO: Fix JSDoc
   * @param {string} type - whether the knot is for red or blue pullers
   * @param ropeStart
   * @param {number} ropeLength - the length of the rope in model coordinates
   * @param {Object} [options]
   */
  constructor( x, type, ropeStart, ropeLength, options ) {

    options = merge( {

      // {Tandem}
      tandem: Tandem.REQUIRED,
      phetioType: Knot.KnotIO
    }, options );
    const tandem = options.tandem;

    super( options );

    this.initX = x;
    this.type = type;

    // @public {number} - the 1-D x position of the knot
    this.xProperty = new NumberProperty( x, {
      tandem: tandem.createTandem( 'xProperty' ),
      units: 'm'
    } );

    // @public {boolean} - whether or not the know is visible
    this.visibleProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'visibleProperty' )
    } );

    // the knot needs a unique ID so that it can be easily found by pullers in the Parallel DOM.
    this.acessibleKnotId = `knot-${type}-${this.initX}`;

    // Constant value for the y position (in screen coordinates)
    this.y = 285;
  }


  /**
   * Reset this knot by resetting its associated model Properties.
   *
   * @public
   */
  reset() {
    this.xProperty.reset();
    this.visibleProperty.reset();
  }

  /**
   * Get the 2-D position of the knot
   *
   * @returns {Vector2}
   */
  get position() {
    return new Vector2( this.xProperty.get(), this.y );
  }
}

forcesAndMotionBasics.register( 'Knot', Knot );

Knot.KnotIO = new IOType( 'KnotIO', {
  valueType: Knot,
  supertype: ReferenceIO( IOType.ObjectIO )
} );

export default Knot;
