// Copyright 2002-2013, University of Colorado Boulder

//The string plugin loader has problems if you try to load the strings from different relative paths
//So just load them once and make them easily available
define( function( require ) {
  'use strict';
  var Strings = require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/forces-and-motion-basics-strings' );

  //Only the strings specified in the config file get loaded unless you explicitly require them,
  // see https://github.com/phetsims/ohms-law/issues/16
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/ca/forces-and-motion-basics-strings' );
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/da/forces-and-motion-basics-strings' );
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/de/forces-and-motion-basics-strings' );
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/el/forces-and-motion-basics-strings' );
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/es/forces-and-motion-basics-strings' );
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/es-es/forces-and-motion-basics-strings' );
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/es-pe/forces-and-motion-basics-strings' );
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/eu/forces-and-motion-basics-strings' );
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/fa/forces-and-motion-basics-strings' );
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/fr/forces-and-motion-basics-strings' );
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/gl/forces-and-motion-basics-strings' );
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/hu/forces-and-motion-basics-strings' );
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/it/forces-and-motion-basics-strings' );
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/iw/forces-and-motion-basics-strings' );
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/mk/forces-and-motion-basics-strings' );
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/nl/forces-and-motion-basics-strings' );
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/pl/forces-and-motion-basics-strings' );
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/pt-br/forces-and-motion-basics-strings' );
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/sk/forces-and-motion-basics-strings' );
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/sr/forces-and-motion-basics-strings' );
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/sv/forces-and-motion-basics-strings' );
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/ta/forces-and-motion-basics-strings' );
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/tr/forces-and-motion-basics-strings' );
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/vi/forces-and-motion-basics-strings' );
  require( 'i18n!FORCES_AND_MOTION_BASICS/../nls/zh-tw/forces-and-motion-basics-strings' );

  //For testing the i18n coverage
//  for ( var key in Strings ) {
//    console.log( key );
//    Strings[key] = Strings[key] + Strings[key];
//  }

  return Strings;
} );