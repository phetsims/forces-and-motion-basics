// Copyright 2002-2013, University of Colorado Boulder

require.config( {
  deps: ['forces-and-motion-basics-main'],

  paths: {

    //Load dependencies from sibling directories
    ASSERT: '../../assert/js',
    AXON: '../../axon/js',
    DOT: '../../dot/js',
    SCENERY: '../../scenery/js',
    SCENERY_PHET: '../../scenery-phet/js',
    KITE: '../../kite/js',
    PHET_CORE: '../../phet-core/js',
    SUN: '../../sun/js',
    JOIST: '../../joist/js',

    //Load lib dependencies
    jquery: '../lib/jquery-1.9.1',
    i18n: '../lib/i18n'
  },

  urlArgs: new Date().getTime() // add cache buster query string to make browser refresh actually reload everything
} );