// Copyright 2024, University of Colorado Boulder

/**
 * This file instantiates the USA region and culture portrayals.
 *
 * @author Luisa Vargas
 *
 */

import usaMotionIcon_png from '../../../images/usa/usaMotionIcon_png.js';
import usaGirlHolding_png from '../../../mipmaps/usa/usaGirlHolding_png.js';
import usaGirlSitting_png from '../../../mipmaps/usa/usaGirlSitting_png.js';
import usaGirlStanding_png from '../../../mipmaps/usa/usaGirlStanding_png.js';
import usaManHolding_png from '../../../mipmaps/usa/usaManHolding_png.js';
import usaManSitting_png from '../../../mipmaps/usa/usaManSitting_png.js';
import usaManStanding_png from '../../../mipmaps/usa/usaManStanding_png.js';
import MassPlayerPortrayal from './MassPlayerPortrayal.js';

const MassPlayerPortrayalUSA = new MassPlayerPortrayal(
  'usa',
  usaGirlHolding_png[ 1 ].img,
  usaGirlSitting_png,
  usaGirlStanding_png,
  usaManHolding_png,
  usaManSitting_png,
  usaManStanding_png,
  usaMotionIcon_png
);

export default MassPlayerPortrayalUSA;