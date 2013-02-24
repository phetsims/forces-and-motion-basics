/*global module:false*/
module.exports = function ( grunt ) {

  // Project configuration.
  grunt.initConfig( {
                      pkg: '<json:package.json>',

                      jshint: {
                        files: [ 'js/**/*.js' ],
                        options: {
                          curly: true,
                          eqeqeq: true,
                          immed: false,
                          latedef: false,
                          newcap: true,
                          noarg: true,
                          sub: true,
                          undef: true,
                          boss: true,
                          eqnull: true,
                          browser: true,
                          node: true,
                          jquery: true,
                          expr: true,
                          // Custom globals.
                          "predef": [

                            //Custom globals for requirejs
                            "define",
                            "require",

                            //Custom global for request animation frame shim
                            "requestAnimFrame"
                          ]
                        },
                        globals: {
                          Modernizr: true,
                          define: true,
                          $: true
                        }
                      },

                      concat: {
                        "dist/debug/require.js": [
                          "js/vendor/almond.js",
                          "dist/debug/require.js"
                        ]
                      },

                      uglify: {
                        "dist/release/require.js": [
                          "dist/debug/require.js"
                        ]
                      },

                      requirejs: {
                        compile: {
                          options: {
                            mainConfigFile: "js/config.js",
                            out: "dist/debug/require.js",
                            name: "config",
                            wrap: false
                          }
                        }
                      },

                      reload: {
                        port: 6001,
                        proxy: {
                          host: 'localhost',
                          port: 8080
                        }
                      },
                      watch: {
                        files: ['index.html', 'js/**/*.js', 'css/*.css'],
                        tasks: ['reload']
                      }
                    } );

  // Default task.
  grunt.registerTask( 'default', ['jshint', 'requirejs', 'concat', 'uglify'] );
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-requirejs' );
  grunt.loadNpmTasks( 'grunt-contrib-concat' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-reload' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
};