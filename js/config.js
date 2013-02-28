require.config( {
                  deps: ['main'],

                  paths: {
                    common: 'common',
                    PHETCOMMON: '../../phetcommon/js',
                    PHETCOMMON_HTML: '../../phetcommon/html',

                    //Load scenery and its dependencies
                    ASSERT: '../../scenery/common/assert/js',
                    DOT: '../../scenery/common/dot/js',
                    SCENERY: '../../scenery/js',

                    easel: '../contrib/easel-0.5.0',
                    image: '../contrib/image-0.2.2',
                    jquery: '../contrib/jquery-1.9.1',
                    underscore: '../contrib/underscore-1.4.2',
                    tpl: "../contrib/tpl-0.2",
                    i18n: "../../i18n/i18n"
                  },

                  shim: {
                    underscore: { exports: "_" },
                    easel: { exports: "createjs" },
                    jquery: { exports: "$" },
                    numeric: {exports: "numeric"}
                  },

                  urlArgs: new Date().getTime() // add cache buster query string to make browser refresh actually reload everything
                } );
