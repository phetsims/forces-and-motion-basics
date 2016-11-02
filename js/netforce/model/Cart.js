// Copyright 2013-2015, University of Colorado Boulder

/**
 * Model for the cart, which has a position (x) and velocity (v).
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var Range = require( 'DOT/Range' );

  // phet-io modules
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function Cart( tandem ) {

    var properties = {

      // position in MKS
      x: {
        value: 0,
        tandem: tandem.createTandem( 'xProperty' ),
        phetioValueType: TNumber( { units: 'meters', range: new Range( -200, 200 ) } )
      },


      // velocity in MKS
      v: {
        value: 0,
        tandem: tandem.createTandem( 'vProperty' ),
        phetioValueType: TNumber( { units: 'meters/second', range: new Range( -1.35, 1.35 ) } )
      }
    };

    PropertySet.call( this, null, properties );
  }

  forcesAndMotionBasics.register( 'Cart', Cart );

  return inherit( PropertySet, Cart );
} );