// Copyright 2013-2017, University of Colorado Boulder

/**
 * Model for the red/blue pullers which can be dragged to the rope, and exert a force on the rope.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var Emitter = require( 'AXON/Emitter' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var TVector2 = require( 'DOT/TVector2' );
  var Vector2 = require( 'DOT/Vector2' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );
  var TKnot = require( 'FORCES_AND_MOTION_BASICS/netforce/model/TKnot' );
  var TString = require( 'ifphetio!PHET_IO/types/TString' );

  /**
   *
   * @param x initial x-coordinate (in meters)
   * @param y initial y-coordinate (in meters)
   * @param type 'red'|'blue'
   * @param size 'small'|'medium'|'large'
   * @param dragOffsetX horizontal offset (in stage coordinates) to offset the puller image when pulling
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function Puller( x, y, type, size, dragOffsetX, tandem, options ) {
    assert && assert( [ 'small', 'medium', 'large' ].indexOf( size ) >= 0 );

    // @public - to synchronize tandem names with the view
    this.pullerTandem = tandem;

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

    // @public {boolean} - whether or not the puller is currently being dragged
    this.draggingProperty = new Property( false, {
      tandem: tandem.createTandem( 'draggingProperty' ),
      phetioValueType: TBoolean
    } );

    // @public {Knot|null} - the knot that this puller is attached to
    this.knotProperty = new Property( null, {
      tandem: tandem.createTandem( 'knotProperty' ),
      phetioValueType: TKnot
    } );

    // @public {Vector2} - the position of this puller
    this.positionProperty = new Property( new Vector2( x, y ), {
      tandem: tandem.createTandem( 'positionProperty' ),
      phetioValueType: TVector2
    } );

    // @public {string} - a classified location in the play area
    // TODO: What are the valid values for this Property?
    this.lastPlacementProperty = new Property( 'home', {
      tandem: tandem.createTandem( 'lastPlacementProperty' ),
      phetioValueType: TString
    } );

    // For keyboard accessibility, the knot that the puller is hovering over
    // TODO: What are the valid values for this Property?
    this.hoverKnotProperty = new Property( null, {
      tandem: tandem.createTandem( 'hoverKnotProperty' ),
      phetioValueType: TKnot
    } );

    // @public {string} - text description for accessibility
    this.textDescriptionProperty = new Property( '', {
      tandem: tandem.createTandem( 'textDescriptionProperty' ),
      phetioValueType: TString
    } );

    // @public - emits an event when the puller is dropped
    this.droppedEmitter = new Emitter();

    // @public - emits an event when the puller is dragged
    this.draggedEmitter = new Emitter();

    this.other = options.other;

    var pullerDescription = (this.type === 'red' ? 'Right Group' : 'Left Group' ) + ': ' +
                            options.other + ' ' +
                            (
                              this.size === 'small' ? 'Strong' :
                              this.size === 'medium' ? 'Stronger' :
                              'Strongest'
                            ) + ' ' + ' person';
    this.textDescriptionProperty.set( pullerDescription );

    //Move with the knot
    var updatePosition = function( knotX ) {
      self.positionProperty.set( new Vector2( knotX, self.positionProperty.get().y ) );
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

      self.textDescriptionProperty.set( pullerDescription + (newKnot ? '. attached to a knot on the rope' : '' ) );
    } );
  }

  forcesAndMotionBasics.register( 'Puller', Puller );

  return inherit( Object, Puller, {

    /**
     * Reset the model by resetting all associated Properties.
     * @public
     */
    reset: function() {
      this.draggingProperty.reset();
      this.knotProperty.reset();
      this.positionProperty.reset();
      this.lastPlacementProperty.reset();
      this.hoverKnotProperty.reset();
      this.textDescriptionProperty.reset();
    },

    //Detach the puller from the knot.
    disconnect: function() {
      this.knotProperty.set( null );
    },

    //Get the name for the puller, used in a11y
    get name() {
      return this.size + ' ' + this.type + ' Puller';
    } //TODO localize accessibility
  } );
} );