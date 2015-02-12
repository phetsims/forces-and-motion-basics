// Copyright 2002-2013, University of Colorado Boulder

require.config( {
  deps: [ 'forces-and-motion-basics-main' ],

  paths: {

    //Load dependencies from sibling directories
    AXON: '../../axon/js',
    BRAND: '../../brand/js',
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
    image: '../../chipper/js/requirejs-plugins/image',
    audio: '../../chipper/js/requirejs-plugins/audio',
    string: '../../chipper/js/requirejs-plugins/string',

    text: '../../sherpa/text'
  },

  // optional cache buster to make browser refresh load all included scripts, can be disabled with ?cacheBuster=false
  urlArgs: phet.chipper.getCacheBusterArgs()
} );
