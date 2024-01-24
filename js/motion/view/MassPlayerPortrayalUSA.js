// Copyright 2024, University of Colorado Boulder

/**
 * This file instantiates the USA region and culture portrayals.
 *
 * @author Luisa Vargas
 *
 */

import JoistStrings from '../../../../joist/js/JoistStrings.js';
import { USA_REGION_AND_CULTURE_ID } from '../../../../joist/js/preferences/RegionAndCulturePortrayal.js';
import motionIcon_png from '../../../images/motionIcon_png.js';
import girlHolding_png from '../../../mipmaps/girlHolding_png.js';
import girlSitting_png from '../../../mipmaps/girlSitting_png.js';
import girlStanding_png from '../../../mipmaps/girlStanding_png.js';
import manHolding_png from '../../../mipmaps/manHolding_png.js';
import manSitting_png from '../../../mipmaps/manSitting_png.js';
import manStanding_png from '../../../mipmaps/manStanding_png.js';
import MassPlayerPortrayal from './MassPlayerPortrayal.js';

const MassPlayerPortrayalUSA = new MassPlayerPortrayal(
  JoistStrings.preferences.tabs.localization.regionAndCulture.portrayalSets.unitedStatesOfAmericaStringProperty,
  girlHolding_png[ 1 ].img,
  girlSitting_png,
  girlStanding_png,
  manHolding_png,
  manSitting_png,
  manStanding_png,
  motionIcon_png,
  USA_REGION_AND_CULTURE_ID
);

export default MassPlayerPortrayalUSA;