// Copyright 2002-2013, University of Colorado Boulder

/**
 * Constants just used for the motion tabs (2-4)
 *
 * @author Sam Reid
 */
define( function() {
  'use strict';

  //REVIEW idiomatic.js recommends uppercase names for constants: POSITION_SCALE, MAX_FRICTION, MAX_SPEED
  return {

    //The scale mapping between model units (meters) and stage coordinates, How much to translate model coordinates into view pixels for translating the background ground
    POSITION_SCALE: 40,

    //Coefficient of friction (Friction is unitless and not bounded between 0 and 1)
    MAX_FRICTION: 0.5,

    //Maximum speed in meters/second before the pusher falls down
    MAX_SPEED: 20
  };
} );