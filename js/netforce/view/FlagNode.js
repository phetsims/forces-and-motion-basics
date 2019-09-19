// Copyright 2013-2019, University of Colorado Boulder

/**
 * Node that shows the waving flag when the net force game is complete.
 *
 * @author Sam Reid
 */
define( require => {
  'use strict';

  // modules
  const forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Shape = require( 'KITE/Shape' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const blueWinsString = require( 'string!FORCES_AND_MOTION_BASICS/blueWins' );
  const redWinsString = require( 'string!FORCES_AND_MOTION_BASICS/redWins' );

  /**
   * Constructor for FlagNode
   *
   * @param {MotionModel} model the model for the entire 'motion', 'friction' or 'acceleration' screen
   * @param {number} centerX center for layout
   * @param {number} top top for layout
   * @param {Tandem} tandem
   * @constructor
   */
  function FlagNode( model, centerX, top, tandem ) {
    var self = this;
    this.model = model;
    Node.call( this, {
      tandem: tandem
    } );

    var textNode = new Text( model.cart.xProperty.get() < 0 ? blueWinsString : redWinsString, {
      tandem: tandem.createTandem( 'textNode' ),
      font: new PhetFont( 24 ),
      fill: 'white'
    } );
    this.path = new Path( null, {
      fill: model.cart.xProperty.get() < 0 ? 'blue' : 'red',
      stroke: 'black',
      lineWidth: 2,
      tandem: tandem.createTandem( 'pathNode' )
    } );
    this.addChild( this.path );

    //Shrink the text to fit on the flag if necessary
    if ( textNode.width > 220 ) {
      textNode.scale( 220 / textNode.width );
    }
    this.addChild( textNode );

    var update = this.updateFlagShape.bind( this );

    // listeners that will dispose the flag node when model is reset or cart is returned -
    // these must also be disposed

    this.disposeFlagNode = function() {
      self.detach();
      model.timeProperty.unlink( update );
      textNode.dispose();
      self.path.dispose();
    };

    //When the clock ticks, wave the flag
    model.timeProperty.link( update );
    textNode.centerX = this.path.centerX;
    textNode.centerY = this.path.centerY;
    this.centerX = centerX;
    this.top = top;
  }

  forcesAndMotionBasics.register( 'FlagNode', FlagNode );

  return inherit( Node, FlagNode, {
    dispose: function() {
      this.disposeFlagNode();
      Node.prototype.dispose.call( this );
    },

    //Update the flag shape, copied from the Java version
    updateFlagShape: function() {
      var shape = new Shape();
      var maxX = 220;
      var maxY = 55;
      var dy = ( 7 * Math.sin( this.model.timeProperty.get() * 6 ) );
      var dx = ( 2 * Math.sin( this.model.timeProperty.get() * 5 ) ) + 10;
      shape.moveTo( 0, 0 );
      shape.cubicCurveTo( maxX / 3 + dx, 25 + dy, 2 * maxX / 3 + dx, -25 - dy, maxX + dx, dy / 2 );
      shape.lineTo( maxX + dx, maxY + dy / 2 );
      shape.cubicCurveTo( 2 * maxX / 3 + dx, -25 + maxY - dy, maxX / 3 + dx, 25 + maxY + dy, 0, maxY );
      shape.lineTo( 0, 0 );
      shape.close();
      this.path.shape = shape;
    }
  } );
} );