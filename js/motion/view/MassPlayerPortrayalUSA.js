// Copyright 2024, University of Colorado Boulder

/**
 * This file instantiates the USA region and culture portrayals.
 *
 * @author Luisa Vargas
 *
 */

import JoistStrings from '../../../../joist/js/JoistStrings.js';
import { USA_REGION_AND_CULTURE_ID } from '../../../../joist/js/preferences/RegionAndCulturePortrayal.js';
import usaMotionIcon_png from '../../../images/localized/usaMotionIcon_png.js';
import usaGirlHolding_png from '../../../mipmaps/localized/usaGirlHolding_png.js';
import usaGirlSitting_png from '../../../mipmaps/localized/usaGirlSitting_png.js';
import usaGirlStanding_png from '../../../mipmaps/localized/usaGirlStanding_png.js';
import usaManHolding_png from '../../../mipmaps/localized/usaManHolding_png.js';
import usaManSitting_png from '../../../mipmaps/localized/usaManSitting_png.js';
import usaManStanding_png from '../../../mipmaps/localized/usaManStanding_png.js';
import MassPlayerPortrayal from './MassPlayerPortrayal.js';

const MassPlayerPortrayalUSA = new MassPlayerPortrayal(
  JoistStrings.preferences.tabs.localization.regionAndCulture.portrayalSets.unitedStatesOfAmericaStringProperty,
  usaGirlHolding_png[ 1 ].img,
  usaGirlSitting_png,
  usaGirlStanding_png,
  usaManHolding_png,
  usaManSitting_png,
  usaManStanding_png,
  usaMotionIcon_png,
  USA_REGION_AND_CULTURE_ID
);

export default MassPlayerPortrayalUSA;