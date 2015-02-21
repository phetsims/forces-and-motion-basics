// Copyright 2002-2013, University of Colorado Boulder

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
  var AriaSpeech = require( 'SCENERY/accessibility/AriaSpeech' );

  /**
   *
   * @param x initial x-coordinate (in meters)
   * @param y initial y-coordinate (in meters)
   * @param type 'red'|'blue'
   * @param size 'small'|'medium'|'large'
   * @param dragOffsetX horizontal offset (in stage coordinates) to offset the puller image when pulling
   * @param standOffsetX horizontal offset in stage coordinates when attached to a knot but not pulling (standing)
   * @constructor
   */
  function Puller( x, y, type, size, dragOffsetX, options ) {
    assert && assert( [ 'small', 'medium', 'large' ].indexOf( size ) >= 0 );

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
      focusable: false,
      textDescription: ''
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
      if ( newKnot ) {
        AriaSpeech.setText( 'Attached to a knot on the rope' );
      }
      else {
        AriaSpeech.setText( 'Detached from the rope' );
      }
    } );
  }

  return inherit( PropertySet, Puller, {

    // The puller was selected and will hover over the rope until the user chooses where to put the puller.
    popAboveRope: function() {

    },

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