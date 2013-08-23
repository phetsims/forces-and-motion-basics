// Copyright 2002-2013, University of Colorado Boulder

/**
 * Provides "caveman" style metrics and statistics for memory allocations to help us diagnose and reduce garbage collections.
 *
 * For this to work, you have to add a line of code like this to your constructor hot spots:
 * window.phetMemory && window.phetMemory.allocated( 'Bounds2' );
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var count = 0;

  //Keep track of instance allocations
  var statsByName = {};

  //Keep track of which code allocated the instances
  var statsByTrace = {};

  var running = false;
  var phetMemory = {
    allocated: function( x ) {
      if ( !running ) {
        return;
      }
      if ( statsByName[x] ) {
        statsByName[x] = statsByName[x] + 1;
      }
      else {
        statsByName[x] = 1;
      }

      var trace = x + ' @ ' + (new Error().stack);
      if ( statsByTrace[trace] ) {
        statsByTrace[trace] = statsByTrace[trace] + 1;
      }
      else {
        statsByTrace[trace] = 1;
      }

      count++;
    },

    print: function() {
//      console.log( 'statsByName: ', statsByName );
//      console.log( 'statsByTrace: ', statsByTrace );

      var keys = [];
      for ( var key in statsByTrace ) {
        if ( statsByTrace.hasOwnProperty( key ) ) {
          keys.push( key );
        }
      }

      var sortedKeys = _.sortBy( keys, function( key ) {
        return -statsByTrace[key];
      } );

      var sorted = _.map( sortedKeys, function( k ) {return statsByTrace[k] + ': ' + k } );
      console.log( 'START' );
      console.log( 'statsByName: ', statsByName );
      console.log( '.' );
      sorted.forEach( function( element ) {console.log( element )} );
      console.log( 'STOP' );
    },
    clear: function() {
      statsByName = {};
    },
    on: function() {
      running = true;
    },
    off: function() {
      running = false;
    }

  };

  return phetMemory;
} );