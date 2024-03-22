// Copyright 2024, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import LocalizedImageProperty from '../../joist/js/i18n/LocalizedImageProperty.js';
import forcesAndMotionBasics from './forcesAndMotionBasics.js';
import usaMotionIcon_png from '../images/usa/usaMotionIcon_png.js';
import usaGirlHolding_png from '../mipmaps/usa/usaGirlHolding_png.js';
import usaGirlSitting_png from '../mipmaps/usa/usaGirlSitting_png.js';
import usaGirlStanding_png from '../mipmaps/usa/usaGirlStanding_png.js';
import usaManHolding_png from '../mipmaps/usa/usaManHolding_png.js';
import usaManSitting_png from '../mipmaps/usa/usaManSitting_png.js';
import usaManStanding_png from '../mipmaps/usa/usaManStanding_png.js';

const ForcesAndMotionBasicsImages = {
  girlHoldingImageProperty: new LocalizedImageProperty( 'girlHolding', {
    usa: usaGirlHolding_png
  } ),
  girlSittingImageProperty: new LocalizedImageProperty( 'girlSitting', {
    usa: usaGirlSitting_png
  } ),
  girlStandingImageProperty: new LocalizedImageProperty( 'girlStanding', {
    usa: usaGirlStanding_png
  } ),
  manHoldingImageProperty: new LocalizedImageProperty( 'manHolding', {
    usa: usaManHolding_png
  } ),
  manSittingImageProperty: new LocalizedImageProperty( 'manSitting', {
    usa: usaManSitting_png
  } ),
  manStandingImageProperty: new LocalizedImageProperty( 'manStanding', {
    usa: usaManStanding_png
  } ),
  motionIconImageProperty: new LocalizedImageProperty( 'motionIcon', {
    usa: usaMotionIcon_png
  } )
};

forcesAndMotionBasics.register( 'ForcesAndMotionBasicsImages', ForcesAndMotionBasicsImages );

export default ForcesAndMotionBasicsImages;
