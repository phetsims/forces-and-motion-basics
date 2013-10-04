// Copyright 2002-2013, University of Colorado Boulder

require.config( {
  deps: ['forces-and-motion-basics-main'],

  config: {
    i18n: {
      locale: 'en_us'
    }
  },

  paths: {

    //Load dependencies from sibling directories
    ASSERT: '../../assert/js',
    AXON: '../../axon/js',
    DOT: '../../dot/js',
    SCENERY: '../../scenery/js',
    SCENERY_PHET: '../../scenery-phet/js',
    KITE: '../../kite/js',
    PHET_CORE: '../../phet-core/js',
    PHETCOMMON: '../../phetcommon/js',
    SUN: '../../sun/js',
    JOIST: '../../joist/js',
    FORCES_AND_MOTION_BASICS: '../../forces-and-motion-basics/js',
    VIBE: '../../vibe/js',
    SHERPA: '../../sherpa/',

    //Load plugins
    image: '../../chipper/requirejs-plugins/image',
    audio: '../../chipper/requirejs-plugins/audio',
    string: '../../chipper/requirejs-plugins/string',

    text: '../../sherpa/text'
  },

  urlArgs: new Date().getTime() // add cache buster query string to make browser refresh actually reload everything
} );
