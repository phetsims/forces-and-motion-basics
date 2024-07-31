// Copyright 2024, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import LocalizedImageProperty from '../../joist/js/i18n/LocalizedImageProperty.js';
import forcesAndMotionBasics from './forcesAndMotionBasics.js';
import usaMotionIcon_png from '../images/usa/usaMotionIcon_png.js';
import usaGirlHolding_svg from '../images/usa/usaGirlHolding_svg.js';
import usaGirlSitting_svg from '../images/usa/usaGirlSitting_svg.js';
import usaGirlStanding_svg from '../images/usa/usaGirlStanding_svg.js';
import usaManHolding_svg from '../images/usa/usaManHolding_svg.js';
import usaManSitting_svg from '../images/usa/usaManSitting_svg.js';
import usaManStanding_svg from '../images/usa/usaManStanding_svg.js';

const ForcesAndMotionBasicsImages = {
  girlHoldingImageProperty: new LocalizedImageProperty( 'girlHolding', {
    usa: usaGirlHolding_svg
  } ),
  girlSittingImageProperty: new LocalizedImageProperty( 'girlSitting', {
    usa: usaGirlSitting_svg
  } ),
  girlStandingImageProperty: new LocalizedImageProperty( 'girlStanding', {
    usa: usaGirlStanding_svg
  } ),
  manHoldingImageProperty: new LocalizedImageProperty( 'manHolding', {
    usa: usaManHolding_svg
  } ),
  manSittingImageProperty: new LocalizedImageProperty( 'manSitting', {
    usa: usaManSitting_svg
  } ),
  manStandingImageProperty: new LocalizedImageProperty( 'manStanding', {
    usa: usaManStanding_svg
  } ),
  motionIconImageProperty: new LocalizedImageProperty( 'motionIcon', {
    usa: usaMotionIcon_png
  } )
};

forcesAndMotionBasics.register( 'ForcesAndMotionBasicsImages', ForcesAndMotionBasicsImages );

export default ForcesAndMotionBasicsImages;
