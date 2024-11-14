// Copyright 2024, University of Colorado Boulder

/**
 * HumanTypeEnum identifies the human object type and sets the holding, standing, or sitting image for the human.
 *
 * @author Luisa Vargas
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsImages from '../../ForcesAndMotionBasicsImages.js';

export default class HumanTypeEnum extends EnumerationValue {

  static GIRL = new HumanTypeEnum(
    ForcesAndMotionBasicsImages.girlHoldingImageProperty,
    ForcesAndMotionBasicsImages.girlStandingImageProperty,
    ForcesAndMotionBasicsImages.girlSittingImageProperty
  );

  static MAN = new HumanTypeEnum(
    ForcesAndMotionBasicsImages.manHoldingImageProperty,
    ForcesAndMotionBasicsImages.manStandingImageProperty,
    ForcesAndMotionBasicsImages.manSittingImageProperty
  );

  static enumeration = new Enumeration( HumanTypeEnum );

  constructor( holdingImageProperty, standingImageProperty, sittingImageProperty ) {
    super();
    this.holdingImageProperty = holdingImageProperty;
    this.standingImageProperty = standingImageProperty;
    this.sittingImageProperty = sittingImageProperty;
  }
}

forcesAndMotionBasics.register( 'HumanTypeEnum', HumanTypeEnum );