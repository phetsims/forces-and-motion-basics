// Copyright 2013-2015, University of Colorado Boulder

/**
 * A big round Go/Pause button that appears when the user has attached any nonzero number of pullers to the rope
 * which can be used to start/pause the animation.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var TandemText = require( 'TANDEM/scenery/nodes/TandemText' );
  var inherit = require( 'PHET_CORE/inherit' );
  var goString = require( 'string!FORCES_AND_MOTION_BASICS/go' );
  var pauseString = require( 'string!FORCES_AND_MOTION_BASICS/pause' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RoundPushButton = require( 'SUN/buttons/RoundPushButton' );
  var ToggleNode = require( 'SUN/ToggleNode' );
  var TandemEmitter = require( 'TANDEM/axon/TandemEmitter' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Input = require( 'SCENERY/input/Input' );
  var AccessiblePeer = require( 'SCENERY/accessibility/AccessiblePeer' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );
  var TNode = require( 'ifphetio!PHET_IO/types/scenery/nodes/TNode' );


  // phet-io modules
  var TString = require( 'ifphetio!PHET_IO/types/TString' );
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );

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
   * @return {Rectangle}
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
    var goTextNode = new TandemText( goString, {
      font: new PhetFont( 42 ),
      tandem: tandem.createTandem( 'goTextNode' )
    } );
    var pauseTextNode = new TandemText( pauseString, {
      font: new PhetFont( 30 ),
      tandem: tandem.createTandem( 'pauseTextNode' )
    } );

    // boolean function to determine if the go button should be enabled based on model state.
    var isGoButtonEnabled = function() {
      return model.state !== 'completed' && ( model.numberPullersAttached > 0 || model.running );
    };

    // When the go button is pressed, indicate which pullers are on which knots and what the net force is.
    var goButtonPressedEmitter = new TandemEmitter( {
      tandem: tandem.createTandem( 'goButtonPressedEmitter' ),
      phetioArgumentTypes: [ TNumber( { units: 'newtons' } ), TString ]
    } );
    var goListener = function() {
      goButtonPressedEmitter.emit2( model.netForce, JSON.stringify( model.getKnotDescription() ) );
      model.running = true;
    };
    var goButton = new RoundPushButton( {
      content: wrap( goTextNode, padX, padY, [ goTextNode, pauseTextNode ] ),
      baseColor: '#94b830',
      listener: goListener,
      tandem: tandem.createTandem( 'goButton' )
    } );//green

    goButton.accessibleContent = {
      createPeer: function( accessibleInstance ) {
        /*
         * Parallel DOM element will look like:
         * <input id="butonID" value="GO!" type="button" tabindex="0" aria-disabled="true"><br>
         */
        var domElement = document.createElement( 'input' );
        domElement.value = goString;
        domElement.type = 'button';
        domElement.setAttribute( 'aria-disabled', !isGoButtonEnabled() );
        domElement.className = 'GoButton';
        domElement.id = 'goButton';

        // create an aria element that describes the button.
        var descriptionElement = document.createElement( 'p' );
        descriptionElement.innerText = goButtonDescriptionString;
        descriptionElement.id = 'go-description';
        domElement.appendChild( descriptionElement );

        domElement.setAttribute( 'aria-describedby', descriptionElement.id );

        domElement.tabIndex = '0';

        model.multilink( [ 'running', 'state', 'numberPullersAttached' ], function() {
          var enabled = isGoButtonEnabled();
          domElement.setAttribute( 'aria-disabled', !enabled );
        } );

        domElement.addEventListener( 'click', function() {
          // if the go button is disabled, do nothing.
          if ( !isGoButtonEnabled() ) {
            return;
          }

          // fire the model listener
          goListener();

          // remove this button from the tab order
          domElement.tabIndex = '-1';

          // add the 'pause' button to the tab order.
          var pauseButtonElement = document.getElementsByClassName( 'PauseButton' )[ 0 ];
          pauseButtonElement.tabIndex = '0';

          // set the aria-attribute to disabled
          domElement.setAttribute( 'aria-disabled', !isGoButtonEnabled() );

          // aria-enable the 'pause' button.
          var pauseButton = document.getElementsByClassName( 'PauseButton' )[ 0 ];
          pauseButton.setAttribute( 'aria-disabled', 'false' );

          // set focus immediately to the 'pause' button
          pauseButton.focus();

        } );

        var accessiblePeer = new AccessiblePeer( accessibleInstance, domElement );
        return accessiblePeer;
      }
    };

    var pauseListener = function() {
      model.running = false;
    };
    var pauseButton = new RoundPushButton( {
      content: wrap( pauseTextNode, padX, padY, [ goTextNode, pauseTextNode ] ),
      baseColor: '#df1a22',
      listener: pauseListener,
      tandem: tandem.createTandem( 'pauseButton' ),
      accessibleContent: {
        createPeer: function( accessibleInstance ) {
          /*
           * Parallel DOM element will look like:
           * <input id="butonID" value="GO!" type="button" tabindex="0" aria-disabled="true"><br>
           */
          var domElement = document.createElement( 'input' );
          domElement.value = pauseString;
          domElement.type = 'button';
          domElement.tabIndex = '-1';
          domElement.className = 'PauseButton';

          // create an aria element that describes the button
          var descriptionElement = document.createElement( 'p' );
          descriptionElement.innerText = pauseButtonDescriptionString;
          descriptionElement.id = 'pause-descriptoin';
          domElement.appendChild( descriptionElement );

          domElement.setAttribute( 'aria-describedby', descriptionElement.id );

          domElement.addEventListener( 'click', function() {
            // fire the model listener
            pauseListener();

            // remove this button from the tab order
            this.tabIndex = '-1';

            // add the 'go' button to the tab order.
            var goButton = document.getElementsByClassName( 'GoButton' )[ 0 ];
            goButton.tabIndex = '0';

            // set the aria-attribute to disabled
            //domElement.setAttribute( 'aria-disabled', 'true' );

            // set focus immediately to the 'go' button
            goButton.focus();

          } );

          var accessiblePeer = new AccessiblePeer( accessibleInstance, domElement );
          domElement.id = accessiblePeer.id;
          return accessiblePeer;
        }
      }
    } );//red

    var showGoButtonProperty = new DerivedProperty( [ model.runningProperty ], function( running ) { return !running; } );
    ToggleNode.call( this, goButton, pauseButton, showGoButtonProperty, options );

    //Show the go/pause button if any pullers are attached or if the cart got started moving, and if it hasn't already finished a match, see #61
    model.multilink( [ 'running', 'state', 'numberPullersAttached' ], function() {
      var enabled = isGoButtonEnabled();
      goButton.enabled = enabled;
      pauseButton.enabled = enabled;
      var buttonText = showGoButtonProperty.value ? 'Go Button' : 'Pause Button';
      self.textDescription = buttonText + (enabled ? '' : ' (disabled)');
    } );

    this.centerX = layoutWidth / 2;

    this.addInputListener( {
      keydown: function( event ) {
        var keyCode = event.domEvent.keyCode;
        if ( keyCode === Input.KEY_ENTER || keyCode === Input.KEY_SPACE ) {
          var activeButton = model.running ? pauseButton : goButton;
          activeButton.buttonModel.overProperty.set( true );
          activeButton.buttonModel.downProperty.set( true );
        }
      },
      keyup: function( event ) {
        var keyCode = event.domEvent.keyCode;
        if ( keyCode === Input.KEY_ENTER || keyCode === Input.KEY_SPACE ) {
          var activeButton = model.running ? pauseButton : goButton;
          activeButton.buttonModel.downProperty.set( false );
          activeButton.buttonModel.overProperty.set( false );
        }
      }
    } );

    tandem.addInstance( this, TNode );
  }

  forcesAndMotionBasics.register( 'GoPauseButton', GoPauseButton );

  return inherit( ToggleNode, GoPauseButton );
} );
