require.config( {
                  deps: ['forces-and-motion-basics-main'],
//                  config: { i18n: { locale: 'en_US' } },

                  paths: {
                    common: 'common',
                    PHETCOMMON: '../../phetcommon/js',
                    PHETCOMMON_HTML: '../../phetcommon/html',

                    //Load dependencies from sibling directories
                    ASSERT: '../../assert/js',
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
                    tpl: "../lib/tpl-0.2",
                    i18n: "../lib/i18n",
                    watch: "../../Watch.JS/src/watch",
                    imagesloaded: "../../phetcommon/contrib/jquery.imagesloaded-2.1.1"
                  },

                  shim: {
                    underscore: { exports: "_" },
                    easel: { exports: "createjs" },
                    jquery: { exports: "$" },
                    numeric: {exports: "numeric"}
                  },

                  urlArgs: new Date().getTime() // add cache buster query string to make browser refresh actually reload everything
                } );
