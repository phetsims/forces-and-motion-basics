// Copyright 2025, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from forces-and-motion-basics-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
import forcesAndMotionBasics from './forcesAndMotionBasics.js';
import ForcesAndMotionBasicsStrings from './ForcesAndMotionBasicsStrings.js';

// This map is used to create the fluent file and link to all StringProperties.
// Accessing StringProperties is also critical for including them in the built sim.
// However, if strings are unused in Fluent system too, they will be fully excluded from
// the build. So we need to only add actually used strings.
const fluentKeyToStringPropertyMap = new Map();

const addToMapIfDefined = ( key: string, path: string ) => {
  const sp = _.get( ForcesAndMotionBasicsStrings, path );
  if ( sp ) {
    fluentKeyToStringPropertyMap.set( key, sp );
  }
};

addToMapIfDefined( 'none', 'noneStringProperty' );
addToMapIfDefined( 'force', 'forceStringProperty' );
addToMapIfDefined( 'values', 'valuesStringProperty' );
addToMapIfDefined( 'redWins', 'redWinsStringProperty' );
addToMapIfDefined( 'frictionForce', 'frictionForceStringProperty' );
addToMapIfDefined( 'pause', 'pauseStringProperty' );
addToMapIfDefined( 'friction', 'frictionStringProperty' );
addToMapIfDefined( 'forces_and_motion_basics_title', 'forces-and-motion-basics.titleStringProperty' );
addToMapIfDefined( 'leftForce', 'leftForceStringProperty' );
addToMapIfDefined( 'appliedForce', 'appliedForceStringProperty' );
addToMapIfDefined( 'rightForce', 'rightForceStringProperty' );
addToMapIfDefined( 'acceleration', 'accelerationStringProperty' );
addToMapIfDefined( 'lots', 'lotsStringProperty' );
addToMapIfDefined( 'forces', 'forcesStringProperty' );
addToMapIfDefined( 'netForce', 'netForceStringProperty' );
addToMapIfDefined( 'motion', 'motionStringProperty' );
addToMapIfDefined( 'go', 'goStringProperty' );
addToMapIfDefined( 'sumOfForcesEqualsZero', 'sumOfForcesEqualsZeroStringProperty' );
addToMapIfDefined( 'blueWins', 'blueWinsStringProperty' );
addToMapIfDefined( 'sumOfForces', 'sumOfForcesStringProperty' );
addToMapIfDefined( 'speed', 'speedStringProperty' );
addToMapIfDefined( 'stopwatch', 'stopwatchStringProperty' );
addToMapIfDefined( 'return', 'returnStringProperty' );
addToMapIfDefined( 'masses', 'massesStringProperty' );
addToMapIfDefined( 'unknownValueIndicator', 'unknownValueIndicatorStringProperty' );
addToMapIfDefined( 'netForcePullerColors', 'netForcePullerColorsStringProperty' );
addToMapIfDefined( 'blueAndRed', 'blueAndRedStringProperty' );
addToMapIfDefined( 'purpleAndOrange', 'purpleAndOrangeStringProperty' );
addToMapIfDefined( 'purpleWins', 'purpleWinsStringProperty' );
addToMapIfDefined( 'orangeWins', 'orangeWinsStringProperty' );

// A function that creates contents for a new Fluent file, which will be needed if any string changes.
const createFluentFile = (): string => {
  let ftl = '';
  for (const [key, stringProperty] of fluentKeyToStringPropertyMap.entries()) {
    ftl += `${key} = ${stringProperty.value}\n`;
  }
  return ftl;
};

const fluentSupport = new FluentContainer( createFluentFile, Array.from(fluentKeyToStringPropertyMap.values()) );

const ForcesAndMotionBasicsFluent = {
  noneStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'none', _.get( ForcesAndMotionBasicsStrings, 'noneStringProperty' ) ),
  forceStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'force', _.get( ForcesAndMotionBasicsStrings, 'forceStringProperty' ) ),
  valuesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'values', _.get( ForcesAndMotionBasicsStrings, 'valuesStringProperty' ) ),
  redWinsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'redWins', _.get( ForcesAndMotionBasicsStrings, 'redWinsStringProperty' ) ),
  frictionForceStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'frictionForce', _.get( ForcesAndMotionBasicsStrings, 'frictionForceStringProperty' ) ),
  pauseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'pause', _.get( ForcesAndMotionBasicsStrings, 'pauseStringProperty' ) ),
  frictionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'friction', _.get( ForcesAndMotionBasicsStrings, 'frictionStringProperty' ) ),
  "forces-and-motion-basics": {
    titleStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'forces_and_motion_basics_title', _.get( ForcesAndMotionBasicsStrings, 'forces-and-motion-basics.titleStringProperty' ) )
  },
  leftForceStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'leftForce', _.get( ForcesAndMotionBasicsStrings, 'leftForceStringProperty' ) ),
  appliedForceStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'appliedForce', _.get( ForcesAndMotionBasicsStrings, 'appliedForceStringProperty' ) ),
  rightForceStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'rightForce', _.get( ForcesAndMotionBasicsStrings, 'rightForceStringProperty' ) ),
  pattern: {
    "0massUnitsKilogramsStringProperty": _.get( ForcesAndMotionBasicsStrings, 'pattern.0massUnitsKilogramsStringProperty' ),
    "0valueUnitsNewtonsStringProperty": _.get( ForcesAndMotionBasicsStrings, 'pattern.0valueUnitsNewtonsStringProperty' ),
    "0name": {
      "1valueUnitsAccelerationStringProperty": _.get( ForcesAndMotionBasicsStrings, 'pattern.0name.1valueUnitsAccelerationStringProperty' ),
      "1valueUnitsVelocityStringProperty": _.get( ForcesAndMotionBasicsStrings, 'pattern.0name.1valueUnitsVelocityStringProperty' )
    },
    "0valueUnitsNStringProperty": _.get( ForcesAndMotionBasicsStrings, 'pattern.0valueUnitsNStringProperty' )
  },
  accelerationStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'acceleration', _.get( ForcesAndMotionBasicsStrings, 'accelerationStringProperty' ) ),
  lotsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'lots', _.get( ForcesAndMotionBasicsStrings, 'lotsStringProperty' ) ),
  forcesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'forces', _.get( ForcesAndMotionBasicsStrings, 'forcesStringProperty' ) ),
  netForceStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'netForce', _.get( ForcesAndMotionBasicsStrings, 'netForceStringProperty' ) ),
  motionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'motion', _.get( ForcesAndMotionBasicsStrings, 'motionStringProperty' ) ),
  goStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'go', _.get( ForcesAndMotionBasicsStrings, 'goStringProperty' ) ),
  sumOfForcesEqualsZeroStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'sumOfForcesEqualsZero', _.get( ForcesAndMotionBasicsStrings, 'sumOfForcesEqualsZeroStringProperty' ) ),
  blueWinsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'blueWins', _.get( ForcesAndMotionBasicsStrings, 'blueWinsStringProperty' ) ),
  sumOfForcesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'sumOfForces', _.get( ForcesAndMotionBasicsStrings, 'sumOfForcesStringProperty' ) ),
  speedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'speed', _.get( ForcesAndMotionBasicsStrings, 'speedStringProperty' ) ),
  stopwatchStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'stopwatch', _.get( ForcesAndMotionBasicsStrings, 'stopwatchStringProperty' ) ),
  returnStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'return', _.get( ForcesAndMotionBasicsStrings, 'returnStringProperty' ) ),
  massesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'masses', _.get( ForcesAndMotionBasicsStrings, 'massesStringProperty' ) ),
  unknownValueIndicatorStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'unknownValueIndicator', _.get( ForcesAndMotionBasicsStrings, 'unknownValueIndicatorStringProperty' ) ),
  netForcePullerColorsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'netForcePullerColors', _.get( ForcesAndMotionBasicsStrings, 'netForcePullerColorsStringProperty' ) ),
  blueAndRedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'blueAndRed', _.get( ForcesAndMotionBasicsStrings, 'blueAndRedStringProperty' ) ),
  purpleAndOrangeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'purpleAndOrange', _.get( ForcesAndMotionBasicsStrings, 'purpleAndOrangeStringProperty' ) ),
  purpleWinsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'purpleWins', _.get( ForcesAndMotionBasicsStrings, 'purpleWinsStringProperty' ) ),
  orangeWinsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'orangeWins', _.get( ForcesAndMotionBasicsStrings, 'orangeWinsStringProperty' ) )
};

export default ForcesAndMotionBasicsFluent;

forcesAndMotionBasics.register('ForcesAndMotionBasicsFluent', ForcesAndMotionBasicsFluent);
