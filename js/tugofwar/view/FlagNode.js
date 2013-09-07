// Copyright 2002-2013, University of Colorado Boulder

/**
 * Node that shows the waving flag when the tug of war game is complete.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Strings = require( 'FORCES_AND_MOTION_BASICS/forces-and-motion-basics-strings' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  /**

   * Constructor for FlagNode
   *
   * @param {MotionModel} model the model for the entire 'motion', 'friction' or 'acceleration' screen
   * @param {Number} centerX center for layout
   * @param {Number} top top for layout
   * @constructor
   */
  function FlagNode( model, centerX, top ) {
    var flagNode = this;
    this.model = model;
    Node.call( this );

    var text = new Text( model.cart.x < 0 ? Strings.blueWins : Strings.redWins, {font: new PhetFont( 32 ), fill: 'white'} );
    this.path = new Path( null, {fill: model.cart.x < 0 ? 'blue' : 'red', stroke: 'black', lineWidth: 2, centerX: 0, centerY: 0} );
    this.addChild( this.path );
    this.addChild( text );

    var update = this.updateFlagShape.bind( this );

    //Do it once, to remove as a listener since flag node gets recreated when another game won
    model.once( 'reset-all', function() {
      flagNode.detach();
      model.timeProperty.unlink( update );
    } );
    model.once( 'cart-returned', function() {
      flagNode.detach();
      model.timeProperty.unlink( update );
    } );

    //When the clock ticks, wave the flag
    model.timeProperty.link( update );
    text.centerX = this.path.centerX;
    text.centerY = this.path.centerY;
    this.centerX = centerX;
    this.top = top;
  }

  return inherit( Node, FlagNode, {

    //Update the flag shape, copied from the Java version
    updateFlagShape: function() {
      var shape = new Shape();
      var maxX = 220;
      var maxY = 75;
      var dy = ( 7 * Math.sin( this.model.time * 6 ) );
      var dx = ( 2 * Math.sin( this.model.time * 5 ) ) + 10;
      shape.moveTo( 0, 0 );
      shape.cubicCurveTo( maxX / 3 + dx, 25 + dy, 2 * maxX / 3 + dx, -25 - dy, maxX + dx, dy / 2 );
      shape.lineTo( maxX + dx, maxY + dy / 2 );
      shape.cubicCurveTo( 2 * maxX / 3 + dx, -25 + maxY - dy, maxX / 3 + dx, 25 + maxY + dy, 0, maxY );
      shape.lineTo( 0, 0 );
      shape.close();
      this.path.shape = shape;
    }} );
} );