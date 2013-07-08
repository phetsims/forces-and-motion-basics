// Copyright 2002-2013, University of Colorado Boulder

//TODO delete this
/**
 * Layout.js is no longer recommend for sim usage, please see TabView.js instead.
 *
 * Gives the default layout dimensions for a simulation, including the play area and navigation bar.
 * These values should be treated as constants, or it will cause buggy behavior.
 */
define( function() {
  'use strict';

  var simHeight = 644;
  var simWidth = 981;
  var navBarHeight = 40;

  return {
    //The width of the sim, play area and navigation bar (all the same)
    width: simWidth,

    //The height of the play area (does not include the vertical space for the navigation bar)
    height: simHeight - navBarHeight,

    //Width of one module
    simWidth: simWidth,

    //The height of the entire sim, including the navigation bar
    simHeight: simHeight,

    //Height of the navigation bar
    navBarHeight: navBarHeight
  };
} );