// Copyright 2024, University of Colorado Boulder

/**
 * HumanTypeEnum identifies the human object type and sets the holding, standing, or sitting image for the human.
 *
 * @author Luisa Vargas
 */

import LocalizedImageProperty from '../../../../joist/js/i18n/LocalizedImageProperty.js';
import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsImages from '../../ForcesAndMotionBasicsImages.js';

export default class HumanTypeEnum extends EnumerationValue {

  public static readonly GIRL = new HumanTypeEnum(
    ForcesAndMotionBasicsImages.girlHoldingImageProperty,
    ForcesAndMotionBasicsImages.girlStandingImageProperty,
    ForcesAndMotionBasicsImages.girlSittingImageProperty
  );

  public static readonly MAN = new HumanTypeEnum(
    ForcesAndMotionBasicsImages.manHoldingImageProperty,
    ForcesAndMotionBasicsImages.manStandingImageProperty,
    ForcesAndMotionBasicsImages.manSittingImageProperty
  );

  private static readonly enumeration = new Enumeration( HumanTypeEnum );

  public constructor(
    public readonly holdingImageProperty: LocalizedImageProperty,
    public readonly standingImageProperty: LocalizedImageProperty,
    public readonly sittingImageProperty: LocalizedImageProperty ) {
    super();
  }
}

forcesAndMotionBasics.register( 'HumanTypeEnum', HumanTypeEnum );