// Copyright 2013-2024, University of Colorado Boulder

/**
 * Model for the 8 knots that appear on the rope.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import ReferenceIO from '../../../../tandem/js/types/ReferenceIO.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

export default class Knot extends PhetioObject {
  public readonly initX: number;

  // the 1-D x position of the knot
  public readonly xProperty: NumberProperty;

  // whether or not the know is visible
  public readonly visibleProperty: BooleanProperty;

  // the knot needs a unique ID so that it can be easily found by pullers in the Parallel DOM.
  public readonly accessibleKnotId: string;

  // Constant value for the y position (in screen coordinates)
  public readonly y = 285;

  /**
   * Constructor for the 8 knots that appear along the rope.
   *
   * @param x - the horizontal position (in meters) of the knot
   * // TODO: Fix JSDoc https://github.com/phetsims/tasks/issues/1129
   * @param type - whether the knot is for red or blue pullers
   * @param ropeStart
   * @param ropeLength - the length of the rope in model coordinates
   * @param [options]
   */
  public constructor( x: number, public readonly type: string, ropeStart: number, ropeLength: number, options?: IntentionalAny ) {

    // eslint-disable-next-line phet/bad-typescript-text
    options = merge( {

      // {Tandem}
      tandem: Tandem.REQUIRED,
      phetioType: Knot.KnotIO,
      phetioState: false // Because IOType extends ReferenceIO
    }, options );
    const tandem = options.tandem;

    super( options );

    this.initX = x;

    this.xProperty = new NumberProperty( x, {
      tandem: tandem.createTandem( 'xProperty' ),
      units: 'm'
    } );

    this.visibleProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'visibleProperty' )
    } );

    this.accessibleKnotId = `knot-${type}-${this.initX}`; // TODO: see https://github.com/phetsims/forces-and-motion-basics/issues/317
  }


  /**
   * Reset this knot by resetting its associated model Properties.
   */
  public reset(): void {
    this.xProperty.reset();
    this.visibleProperty.reset();
  }

  /**
   * Get the 2-D position of the knot
   */
  public get position(): Vector2 {
    return new Vector2( this.xProperty.get(), this.y );
  }

  public static KnotIO = new IOType( 'KnotIO', {
    valueType: Knot,
    supertype: ReferenceIO( IOType.ObjectIO )
  } );
}

forcesAndMotionBasics.register( 'Knot', Knot );