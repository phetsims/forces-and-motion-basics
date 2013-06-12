define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );

  function SliderKnob( options ) {

    options = _.extend( { enabled: true }, options );
    this.enabled = options.enabled;

    Node.call( this );

    var scale = 0.8;
    var width = 20 * scale;
    var height = 50 * scale;
    var gradient = new LinearGradient( 0, 0, width, 0 ).addColorStop( 0, '#2FB0E4' ).addColorStop( 0.5, '#B8E4FB' ).addColorStop( 1, '#2FB0E4' );
    this.addChild( new Rectangle( 0, 0, width, height, 10 * scale, 10 * scale, {fill: this.enabled ? gradient : 'gray', stroke: this.enabled ? 'black' : 'gray', lineWidth: 2} ) );

    var dx = width / 5;
    var dy = height / 6;
    this.addGripDot( width / 2 - dx, height / 2 - dy );
    this.addGripDot( width / 2 + dx, height / 2 - dy );
    this.addGripDot( width / 2 - dx, height / 2 );
    this.addGripDot( width / 2 + dx, height / 2 );
    this.addGripDot( width / 2 - dx, height / 2 + dy );
    this.addGripDot( width / 2 + dx, height / 2 + dy );
  }

  inherit( Node, SliderKnob, {
    addGripDot: function( x, y ) {
      var radius = 1.8;
      var stroke = new LinearGradient( -radius, -radius, radius * 2, radius * 2 ).
        addColorStop( 0, 'black' ).addColorStop( 0.5, '#56889F' ).addColorStop( 1, 'white' );
      this.addChild( new Circle( radius, {x: x, y: y, fill: this.enabled ? '#56889F' : 'gray', stroke: this.enabled ? stroke : 'gray', lineWidth: 1} ) );
    }
  } );

  return SliderKnob;
} );