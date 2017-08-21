// Copyright 2013-2015, University of Colorado Boulder

/**
 * Model for the cart, which has a position (x) and velocity (v).
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var Property = require( 'AXON/Property' );
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

    // @public {number} - 1-D x location of the cart
    this.xProperty = new Property( 0, {
      value: 0,
      tandem: tandem.createTandem( 'xProperty' ),
      phetioValueType: TNumber( { units: 'meters', range: new Range( -200, 200 ) } )
    } );


    // @public {number} - 1-D velocity in MKS
    this.vProperty = new Property( 0, {
      value: 0,
      tandem: tandem.createTandem( 'vProperty' ),
     phetioValueType: TNumber( { units: 'meters/second', range: new Range( -1.35, 1.35 ) } )
    } );

    // @public (read-only) - width from the center of the cart to the wheels, used to determine when a wheel touches
    // a game stopper
    this.widthToWheel = 55;
  }

  forcesAndMotionBasics.register( 'Cart', Cart );

  return inherit( Object, Cart, {

    /**
     * Reset the Properties associated with this model.
     * @public
     */
    reset: function() {
      this.xProperty.reset();
      this.vProperty.reset();
    }
  } );
} );