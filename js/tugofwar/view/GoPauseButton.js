// Copyright 2002-2013, University of Colorado Boulder

/**
 * A big round Go/Pause button that appears when the user has attached any nonzero number of pullers to the rope
 * which can be used to start/pause the animation.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var Image = require( 'SCENERY/nodes/Image' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );
  var goString = require( 'string!FORCES_AND_MOTION_BASICS/go' );
  var pauseString = require( 'string!FORCES_AND_MOTION_BASICS/pause' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RoundPushButton = require( 'SUN/buttons/RoundPushButton' );
  var ToggleNode = require( 'SUN/ToggleNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  //Given nodes that have possibly different sizes, wrap the specified node in a parent empty Rectangle node so the bounds will match up
  //If the node is already the largest, don't wrap it.
  //Centers all the nodes in the parent wrappers
  //TODO: Would be good to factor this out or provide better library support
  function wrap( node, padX, padY, nodes ) {
    var maxWidth = -1;
    var maxHeight = -1;
    nodes.forEach( function( n ) {
      if ( n.width > maxWidth ) {
        maxWidth = n.width;
      }
      if ( n.height > maxHeight ) {
        maxHeight = n.height;
      }
    } );
    maxWidth += padX;
    maxHeight += padY;
    node.centerX = maxWidth / 2;
    node.centerY = maxHeight / 2;
    return new Rectangle( 0, 0, maxWidth, maxHeight, {children: [node]} );
  }

  /**
   * Create a GoPauseButton that appears below the candy cart when a puller has been attached to the rope.
   * @param {TugOfWarModel} model the TugOfWarModel
   * @param {Number} layoutWidth the layout width for centering the button
   * @constructor
   */
  function GoPauseButton( model, layoutWidth ) {
    var goPauseButton = this;

    var padX = 15;
    var padY = 10;
    var goText = new Text( goString, {font: new PhetFont( 42 )} );
    var pauseText = new Text( pauseString, {font: new PhetFont( 30 )} );

    var goButton = new RoundPushButton( {content: wrap( goText, padX, padY, [goText, pauseText] ), baseColor: '#94b830', listener: function() {model.running = true;}} );//green
    var pauseButton = new RoundPushButton( {content: wrap( pauseText, padX, padY, [goText, pauseText] ), baseColor: '#df1a22', listener: function() {model.running = false;}} );//red

    var showGoButtonProperty = model.toDerivedProperty( ['running', 'state', 'numberPullersAttached'], function( running, state, numberPullersAttached ) {
      return !running;
    } );
    ToggleNode.call( this, goButton, pauseButton, showGoButtonProperty, {top: 400} );

    //Show the go/pause button if any pullers are attached or if the cart got started moving, and if it hasn't already finished a match, see #61
    model.toDerivedProperty( ['running', 'state', 'numberPullersAttached'], function( running, state, numberPullersAttached ) {
      goPauseButton.visible = state !== 'completed' && (numberPullersAttached > 0 || running);
    } ).linkAttribute( this, 'visible' );

    this.centerX = layoutWidth / 2;
  }

  return inherit( ToggleNode, GoPauseButton );
} );