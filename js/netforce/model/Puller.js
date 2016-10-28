// Copyright 2013-2015, University of Colorado Boulder

/**
 * Model for the red/blue pullers which can be dragged to the rope, and exert a force on the rope.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );
  var TString = require( 'ifphetio!PHET_IO/types/TString' );
  var TVector2 = require( 'ifphetio!PHET_IO/types/dot/TVector2' );
  var TKnot = require( 'ifphetio!PHET_IO/simulations/forces-and-motion-basics/TKnot' );

  /**
   *
   * @param x initial x-coordinate (in meters)
   * @param y initial y-coordinate (in meters)
   * @param type 'red'|'blue'
   * @param size 'small'|'medium'|'large'
   * @param dragOffsetX horizontal offset (in stage coordinates) to offset the puller image when pulling
   * @param {Tandem} tandem
   * @constructor
   */
  function Puller( x, y, type, size, dragOffsetX, tandem, options ) {
    assert && assert( [ 'small', 'medium', 'large' ].indexOf( size ) >= 0 );

    // @public - to synchronize tandem names with the view
    this.tandem = tandem;

    options = _.extend( { standOffsetX: 0, other: '' }, options );
    var self = this;

    this.dragOffsetX = dragOffsetX;
    this.standOffsetX = options.standOffsetX;
    this.type = type;
    this.size = size;
    this.force = this.size === 'small' ? 10 * 5 :
                 this.size === 'medium' ? 20 * 5 :
                 this.size === 'large' ? 30 * 5 :
                 NaN;

    var properties = {

      dragging: {
        value: false,
        tandem: tandem.createTandem( 'draggingProperty' ),
        phetioValueType: TBoolean
      },

      knot: {
        value: null,
        tandem: tandem.createTandem( 'knotProperty' ),
        phetioValueType: TKnot
      },

      position: {
        value: new Vector2( x, y ),
        tandem: tandem.createTandem( 'positionProperty' ),
        phetioValueType: TVector2
      },

      lastLocation: {
        value: 'home',
        tandem: tandem.createTandem( 'lastLocationProperty' ),
        phetioValueType: TVector2
      },

      // For keyboard accessibility, the knot that the puller is hovering over
      hoverKnot: {
        value: null,
        tandem: tandem.createTandem( 'hoverKnotProperty' ),
        phetioValueType: TKnot
      },

      textDescription: {
        value: '',
        tandem: tandem.createTandem( 'textDescriptionProperty' ),
        phetioValueType: TString
      }
    };

    PropertySet.call( this, null, null, properties );

    this.other = options.other;

    var pullerDescription = (this.type === 'red' ? 'Right Group' : 'Left Group' ) + ': ' +
                            options.other + ' ' +
                            (
                              this.size === 'small' ? 'Strong' :
                              this.size === 'medium' ? 'Stronger' :
                              'Strongest'
                            ) + ' ' + ' person';
    this.textDescription = pullerDescription;

    //Move with the knot
    var updatePosition = function( knotX ) {
      self.position = new Vector2( knotX, self.position.y );
    };

    //When the knot changes, wire up as a listener to the new knot
    this.knotProperty.link( function( newKnot, oldKnot ) {

      //Unlink from the previous knot if there was one
      if ( oldKnot ) {
        oldKnot.xProperty.unlink( updatePosition );
      }

      //Synchronize our location with the knot.
      if ( newKnot ) {
        newKnot.xProperty.link( updatePosition );
      }

      self.textDescription = pullerDescription + (newKnot ? '. attached to a knot on the rope' : '');
    } );
  }

  forcesAndMotionBasics.register( 'Puller', Puller );

  return inherit( PropertySet, Puller, {

    //Detach the puller from the knot.
    disconnect: function() {
      this.knot = null;
    },

    //Get the name for the puller, used in a11y
    get name() {
      return this.size + ' ' + this.type + ' Puller';
    } //TODO localize accessibility
  } );
} );