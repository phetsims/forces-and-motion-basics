require.config( {
                  config: {
                    //Set the config for the i18n
                    //module ID
                    i18n: {

                      //Specify the locale using a query parameter
                      locale: 'en_US'
                    }
                  },
                  deps: ['main'],

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
                    FORT: '../../fort/js',
                    SUN: '../../sun/js',

                    easel: '../contrib/easel-0.5.0',
                    image: '../contrib/image-0.2.2',
                    jquery: '../contrib/jquery-1.9.1',
                    underscore: '../contrib/underscore-1.4.2',
                    tpl: "../contrib/tpl-0.2",
                    i18n: "../contrib/i18n",
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
