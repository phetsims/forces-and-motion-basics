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
    var puller = this;

    this.dragOffsetX = dragOffsetX;
    this.standOffsetX = options.standOffsetX;
    this.type = type;
    this.size = size;
    this.force = this.size === 'small' ? 10 * 5 :
                 this.size === 'medium' ? 20 * 5 :
                 this.size === 'large' ? 30 * 5 :
                 NaN;

    //Create the properties and mix them in
    PropertySet.call( this, {
      dragging: false,
      knot: null,
      position: new Vector2( x, y ),
      lastLocation: 'home',

      // For keyboard accessibility, the knot that the puller is hovering over
      hoverKnot: null,
      textDescription: ''
    }, {
      tandemSet: {
        dragging: tandem.createTandem( 'draggingProperty' ),
        knot: tandem.createTandem( 'knotProperty' ),
        position: tandem.createTandem( 'positionProperty' ),
        lastLocation: tandem.createTandem( 'lastLocationProperty' ),
        hoverKnot: tandem.createTandem( 'hoverKnotProperty' ),
        textDescription: tandem.createTandem( 'textDescriptionProperty' )
      },
      phetioValueTypeSet: {
        dragging: TBoolean,
        knot: TKnot,
        position: TVector2,
        lastLocation: TVector2,
        hoverKnot: TKnot,
        textDescription: TString
      }
    } );
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
      puller.position = new Vector2( knotX, puller.position.y );
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

      puller.textDescription = pullerDescription + (newKnot ? '. attached to a knot on the rope' : '');
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