// Copyright 2013-2015, University of Colorado Boulder

/**
 * A big round Go/Pause button that appears when the user has attached any nonzero number of pullers to the rope
 * which can be used to start/pause the animation.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var Emitter = require( 'AXON/Emitter' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var goString = require( 'string!FORCES_AND_MOTION_BASICS/go' );
  var inherit = require( 'PHET_CORE/inherit' );
  var pauseString = require( 'string!FORCES_AND_MOTION_BASICS/pause' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var RoundPushButton = require( 'SUN/buttons/RoundPushButton' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ToggleNode = require( 'SUN/ToggleNode' );

  // phet-io modules
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );
  var TString = require( 'ifphetio!PHET_IO/types/TString' );

  // strings
  var goButtonDescriptionString = require( 'string!FORCES_AND_MOTION_BASICS/goButton.description' );
  var pauseButtonDescriptionString = require( 'string!FORCES_AND_MOTION_BASICS/pauseButton.description' );

  //Given nodes that have possibly different sizes, wrap the specified node in a parent empty Rectangle node so the bounds will match up
  //If the node is already the largest, don't wrap it.
  //Centers all the nodes in the parent wrappers
  //TODO: Would be good to factor this out or provide better library support
  /**
   * Given nodes that have possibly different sizes, wrap the specified node in a parent empty Rectangle node so the
   * bounds will match up.  If the node is already the largest, don't wrap it.
   * Centers all the nodes in the parent wrappers.
   * @param  {Node} node
   * @param  {number} padX
   * @param  {number} padY
   * @param  {Array<Node>} nodes
   * @returns {Rectangle}
   */
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
    return new Rectangle( 0, 0, maxWidth, maxHeight, { children: [ node ] } );
  }

  /**
   * Create a GoPauseButton that appears below the candy cart when a puller has been attached to the rope.
   *
   * @param {NetForceModel} model the NetForceModel
   * @param {number} layoutWidth the layout width for centering the button
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function GoPauseButton( model, layoutWidth, tandem, options ) {

    options = _.extend( {
      top: 400,
      textDescription: 'Go Button'
    }, options );
    var self = this;
    var padX = 15;
    var padY = 10;
    var goTextNode = new Text( goString, {
      font: new PhetFont( 42 ),
      tandem: tandem.createTandem( 'goTextNode' )
    } );
    var pauseTextNode = new Text( pauseString, {
      font: new PhetFont( 30 ),
      tandem: tandem.createTandem( 'pauseTextNode' )
    } );

    // boolean function to determine if the go button should be enabled based on model state.
    var isGoButtonEnabled = function() {
      return model.stateProperty.get() !== 'completed' && ( model.numberPullersAttachedProperty.get() > 0 || model.runningProperty.get() );
    };

    // When the go button is pressed, indicate which pullers are on which knots and what the net force is.
    var goButtonPressedEmitter = new Emitter( {
      tandem: tandem.createTandem( 'goButtonPressedEmitter' ),
      phetioArgumentTypes: [ TNumber, TString ]
    } );
    var goListener = function() {
      goButtonPressedEmitter.emit2( model.netForceProperty.get(), JSON.stringify( model.getKnotDescription() ) );
      model.runningProperty.set( true );
    };
    var goButton = new RoundPushButton( {
      content: wrap( goTextNode, padX, padY, [ goTextNode, pauseTextNode ] ),
      baseColor: '#94b830',
      listener: goListener,
      tandem: tandem.createTandem( 'goButton' )
    } );//green

    goButton.mutate( {
      tagName: 'input',
      inputType: 'button',
      accessibleDescription: goButtonDescriptionString,
      descriptionTagName: 'p'
    } );
    goButton.setAccessibleAttribute( 'aria-disabled', !isGoButtonEnabled() );

    var pauseListener = function() {
      model.runningProperty.set( false );
    };
    var pauseButton = new RoundPushButton( {
      content: wrap( pauseTextNode, padX, padY, [ goTextNode, pauseTextNode ] ),
      baseColor: '#df1a22',
      listener: pauseListener,
      tandem: tandem.createTandem( 'pauseButton' ),

      // a11y
      tagName: 'input',
      inputType: 'button',
      focusable: false,
      accessibleDescription: pauseButtonDescriptionString
    } );//red

    var showGoButtonProperty = new DerivedProperty( [ model.runningProperty ], function( running ) { return !running; } );
    ToggleNode.call( this, goButton, pauseButton, showGoButtonProperty, options );

    //Show the go/pause button if any pullers are attached or if the cart got started moving, and if it hasn't already finished a match, see #61
    Property.multilink( [ model.runningProperty, model.stateProperty, model.numberPullersAttachedProperty ], function() {
      var enabled = isGoButtonEnabled();
      goButton.enabled = enabled;
      pauseButton.enabled = enabled;
      var buttonText = showGoButtonProperty.value ? 'Go Button' : 'Pause Button';
      self.textDescription = buttonText + (enabled ? '' : ' (disabled)');
    } );

    this.centerX = layoutWidth / 2;
  }

  forcesAndMotionBasics.register( 'GoPauseButton', GoPauseButton );

  return inherit( ToggleNode, GoPauseButton );
} );
