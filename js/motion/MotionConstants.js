// Copyright 2002-2013, University of Colorado Boulder

/**
 * Constants just used for the motion tabs (2-4)
 *
 * @author Sam Reid
 */
define( function() {
  'use strict';

  return {

    //The scale mapping between model units (meters) and stage coordinates, How much to translate model coordinates into view pixels for translating the background ground
    positionScale: 40,

    //Coefficient of friction (Friction is unitless and not bounded between 0 and 1)
    maxFriction: 0.5,

    //Maximum speed in meters/second before the pusher falls down
    maxSpeed: 20
  };
} );