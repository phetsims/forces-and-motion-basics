// Copyright 2013-2025, University of Colorado Boulder

/**
 * Model for the red/blue pullers which can be dragged to the rope, and exert a force on the rope.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsPreferences from './ForcesAndMotionBasicsPreferences.js';
import HomeOrKnot, { homeOrKnotValues } from './HomeOrKnot.js';
import Knot from './Knot.js';
import NetForceModel, { LeftTeamColor, RightTeamColor } from './NetForceModel.js';

import PullerMode from './PullerMode.js';

type SelfOptions = {
  standOffsetX?: number;
  other?: string;
};
type PullerOptions = SelfOptions & PhetioObjectOptions & { tandem: Tandem };

export default class Puller extends PhetioObject {

  // to synchronize tandem names with the view
  public readonly standOffsetX: number;
  public readonly forceProperty: TReadOnlyProperty<number>;

  // The current interaction mode of the puller
  public readonly modeProperty: Property<PullerMode>;

  // the position of this puller
  public readonly positionProperty: Vector2Property;

  // a classified position in the play area
  public readonly lastPlacementProperty: StringUnionProperty<HomeOrKnot>;

  // Accounts for the ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty
  public readonly colorProperty: TReadOnlyProperty<LeftTeamColor | RightTeamColor>;

  // For the small pullers, there are index 1 and 2. For others, there is no suffix.
  public readonly descriptionIndex: '1' | '2' | ''; //REVIEW Use enumeration pattern

  /**
   * @param model the NetForceModel that this puller is associated with, for context
   * @param x initial x-coordinate (in meters)
   * @param y initial y-coordinate (in meters)
   * @param type 'red'|'blue'
   * @param size 'small'|'medium'|'large'
   * @param dragOffsetX horizontal offset (in stage coordinates) to offset the puller image when pulling
   * @param tandem
   * @param providedOptions
   */
  public constructor( public readonly model: NetForceModel,
                      x: number, y: number,
                      public readonly type: 'red' | 'blue', //REVIEW Use enumeration pattern
                      public readonly size: 'small' | 'medium' | 'large', //REVIEW Use enumeration pattern
                      public readonly dragOffsetX: number,
                      providedOptions: PullerOptions ) {

    const options = optionize<PullerOptions, SelfOptions, PhetioObjectOptions>()( {
      standOffsetX: 0,
      other: '',
      phetioFeatured: true,
      phetioState: false
    }, providedOptions );

    super( options );

    this.descriptionIndex = options.tandem.name.includes( '1' ) ? '1' : options.tandem.name.includes( '2' ) ? '2' : '';

    this.standOffsetX = options.standOffsetX;

    const forceBySize = {
      small: 50,
      medium: 100,
      large: 150
    } as const;
    const rangeBySize = {
      small: new Range( 1, 50 ),
      medium: new Range( 51, 100 ),
      large: new Range( 101, 150 )
    } as const;

    this.forceProperty = new NumberProperty( forceBySize[ this.size ], {
      tandem: options.tandem.createTandem( 'forceProperty' ),
      phetioFeatured: true,
      numberType: 'FloatingPoint',
      units: 'N',
      range: rangeBySize[ this.size ]
    } );

    // Initialize the mode property - this is the authoritative state
    this.modeProperty = new Property<PullerMode>( PullerMode.home(), {
      valueType: PullerMode,
      tandem: options.tandem.createTandem( 'modeProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'The current mode/state of the puller - authoritative source of truth',
      phetioValueType: PullerMode.PullerModeIO,
      valueComparisonStrategy: 'equalsFunction'
    } );

    this.positionProperty = new Vector2Property( new Vector2( x, y ), {
      tandem: options.tandem.createTandem( 'positionProperty' ),
      phetioReadOnly: true,
      valueComparisonStrategy: 'equalsFunction',
      reentrant: true
    } );

    this.lastPlacementProperty = new StringUnionProperty( 'home', {
      validValues: homeOrKnotValues,
      tandem: options.tandem.createTandem( 'lastPlacementProperty' ),
      phetioDocumentation: 'For PhET-iO internal use only, tracks the last placement of the puller for purposes of determining thresholds for where it should drop',
      phetioReadOnly: true
    } );

    this.colorProperty = new DerivedProperty( [ ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty ], preference => {
      return preference === 'blueRed' && this.type === 'red' ? 'red' :
             preference === 'blueRed' && this.type === 'blue' ? 'blue' :
             preference === 'purpleOrange' && this.type === 'red' ? 'orange' :
             'purple';
    } );

    // When the knot changes, wire up as a listener to the new knot
    this.modeProperty.link( mode => {

      const knot = mode.getKnot( model );

      // Synchronize our position with the knot.
      if ( knot ) {
        this.positionProperty.value = new Vector2( knot.positionProperty.value, knot.y );
      }

      if ( mode.isHome() ) {
        this.positionProperty.reset();
      }
    } );
  }

  public step(): void {
    if ( this.getKnot() ) {
      // If attached to a knot, update position to match the knot's position
      const knot = this.getKnot();
      if ( knot ) {
        this.positionProperty.value = new Vector2( knot.positionProperty.value, knot.y );
      }
    }
  }

  /**
   * Get the mode for attachment to a given knot
   */
  public getModeForKnot( knot: Knot | null ): PullerMode {
    if ( knot === null ) {
      return PullerMode.home();
    }

    // Find the absolute index in the knots array
    const knotIndex = this.model.knots.indexOf( knot );
    affirm( knotIndex >= 0 && knotIndex <= 7, `knotIndex must be 0-7 for absolute indexing, got ${knotIndex}` );

    return PullerMode.attachedToKnot( knotIndex );
  }

  // Grab origin storage for cancel functionality
  private grabOrigin: {
    mode: PullerMode;
    position: Vector2;
  } | null = null;

  /**
   * Reset the model by resetting all associated Properties.
   */
  public reset(): void {
    this.modeProperty.reset(); // This will trigger updates to derived properties
    this.positionProperty.reset();
    this.lastPlacementProperty.reset();
    // forceProperty is constant for each puller, no need to reset
  }

  /**
   * Store current state as grab origin for potential cancel operation
   */
  public storeGrabOrigin(): void {
    this.grabOrigin = {
      mode: this.modeProperty.value,
      position: this.positionProperty.value.copy()
    };
  }

  /**
   * Clear grab origin after successful drop
   */
  public clearGrabOrigin(): void {
    this.grabOrigin = null;
  }

  /**
   * Drop at a specific knot (called by mouse/touch drag listener)
   */
  public dropAtKnot( knot: Knot ): void {
    this.modeProperty.value = this.getModeForKnot( knot );
    this.lastPlacementProperty.value = 'knot';
    this.clearGrabOrigin();
  }

  /**
   * Drop at home/toolbox (called by mouse/touch drag listener)
   */
  public dropAtHome(): void {
    this.modeProperty.value = PullerMode.home();
    this.lastPlacementProperty.value = 'home';
    this.clearGrabOrigin();
  }

  /**
   * Cancel grab and return to origin
   */
  public cancelGrab(): void {
    if ( this.grabOrigin ) {
      // Restore original state
      this.modeProperty.value = this.grabOrigin.mode;
      this.positionProperty.value = this.grabOrigin.position;

      // Clear grab origin
      this.grabOrigin = null;
    }
  }

  /**
   * Check if puller is currently grabbed/dragged
   */
  public isGrabbed(): boolean {
    return this.modeProperty.value.isGrabbed();
  }

  public getKnot(): Knot | null {
    return this.modeProperty.value.getKnot( this.model );
  }
}

forcesAndMotionBasics.register( 'Puller', Puller );
