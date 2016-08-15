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
   * Constructor.
   * @param {Tandem} tandem
   */
  function Cart( tandem ) {
    PropertySet.call( this, {

      //Position and velocity are in MKS
      x: 0,
      v: 0
    }, {
      tandemSet: {
        x: tandem.createTandem( 'xProperty' ),
        v: tandem.createTandem( 'vProperty' )
      },
      phetioValueTypeSet: {
        x: TNumber( { units: 'meters', range: new Range( -200, 200 ) } ),
        v: TNumber( { units: 'meters/second', range: new Range( -1.35, 1.35 ) } )
      }
    } );
  }

  forcesAndMotionBasics.register( 'Cart', Cart );

  return inherit( PropertySet, Cart );
} );