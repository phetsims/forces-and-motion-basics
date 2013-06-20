require.config( {
  deps: ['forces-and-motion-basics-main'],
//                  config: { i18n: { locale: 'en_US' } },

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

    easel: '../lib/easel-0.5.0',
    image: '../lib/image-0.2.2',
    jquery: '../lib/jquery-1.9.1',
    underscore: '../lib/underscore-1.4.2',
    i18n: "../lib/i18n"
  },

  shim: {
    underscore: { exports: "_" },
    jquery: { exports: "$" },
    numeric: {exports: "numeric"}
  },

  urlArgs: new Date().getTime() // add cache buster query string to make browser refresh actually reload everything
} );
