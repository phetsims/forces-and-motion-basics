// Copyright 2013-2024, University of Colorado Boulder

/**
 * Model for the 8 knots that appear on the rope.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import ReferenceIO from '../../../../tandem/js/types/ReferenceIO.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';

type SelfOptions = EmptySelfOptions;
type KnotOptions = PhetioObjectOptions & SelfOptions;

export type KnotType = 'blue' | 'red';
export default class Knot extends PhetioObject {

  // the 1-D x position of the knot
  public readonly xProperty: NumberProperty;

  // The knots are always visible as part of the image, but when the visible flag is set,
  // the highlight is shown.
  public readonly visibleProperty: BooleanProperty;

  // Constant value for the y position (in screen coordinates)
  public readonly y = 285;

  /**
   * Constructor for the 8 knots that appear along the rope.
   *
   * @param initX - the horizontal position (in meters) of the knot
   * // TODO: Fix JSDoc https://github.com/phetsims/forces-and-motion-basics/issues/319
   * @param type - whether the knot is for red or blue pullers
   * @param providedOptions
   */
  public constructor( public readonly initX: number, public readonly type: KnotType, providedOptions?: KnotOptions ) {

    const options = optionize<KnotOptions, SelfOptions, PhetioObjectOptions>()( {

      // {Tandem}
      tandem: Tandem.REQUIRED,
      phetioType: Knot.KnotIO,
      phetioState: false // Because IOType extends ReferenceIO
    }, providedOptions );
    const tandem = options.tandem;

    super( options );

    this.xProperty = new NumberProperty( this.initX, {
      tandem: tandem.createTandem( 'xProperty' ),
      units: 'm'
    } );

    this.visibleProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'visibleProperty' )
    } );
  }

  /**
   * Reset this knot by resetting its associated model Properties.
   */
  public reset(): void {
    this.xProperty.reset();
    this.visibleProperty.reset();
  }

  public static KnotIO = new IOType( 'KnotIO', {
    valueType: Knot,
    supertype: ReferenceIO( IOType.ObjectIO )
  } );
}

forcesAndMotionBasics.register( 'Knot', Knot );