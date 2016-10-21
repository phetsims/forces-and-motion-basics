// Copyright 2013-2015, University of Colorado Boulder

/**
 * Main class for the entire view of the Net Force model, including cart, pullers, background, controls & audio sounds (when Net Force game complete).
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var PullerNode = require( 'FORCES_AND_MOTION_BASICS/netforce/view/PullerNode' );
  var CartNode = require( 'FORCES_AND_MOTION_BASICS/netforce/view/CartNode' );
  var Shape = require( 'KITE/Shape' );
  var TandemPath = require( 'TANDEM/scenery/nodes/TandemPath' );
  var TandemText = require( 'TANDEM/scenery/nodes/TandemText' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var TandemImage = require( 'TANDEM/scenery/nodes/TandemImage' );
  var TandemNode = require( 'TANDEM/scenery/nodes/TandemNode' );
  var KnotHighlightNode = require( 'FORCES_AND_MOTION_BASICS/netforce/view/KnotHighlightNode' );
  var GoPauseButton = require( 'FORCES_AND_MOTION_BASICS/netforce/view/GoPauseButton' );
  var ReturnButton = require( 'FORCES_AND_MOTION_BASICS/netforce/view/ReturnButton' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var FlagNode = require( 'FORCES_AND_MOTION_BASICS/netforce/view/FlagNode' );
  var NetForceControlPanel = require( 'FORCES_AND_MOTION_BASICS/netforce/view/NetForceControlPanel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var ForcesAndMotionBasicsLayoutBounds = require( 'FORCES_AND_MOTION_BASICS/common/view/ForcesAndMotionBasicsLayoutBounds' );
  var ReadoutArrow = require( 'FORCES_AND_MOTION_BASICS/common/view/ReadoutArrow' );
  var Property = require( 'AXON/Property' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var sumOfForcesEqualsZeroString = require( 'string!FORCES_AND_MOTION_BASICS/sumOfForcesEqualsZero' );
  var Sound = require( 'VIBE/Sound' );
  var Input = require( 'SCENERY/input/Input' );
  var PullerToolboxNode = require( 'FORCES_AND_MOTION_BASICS/netforce/view/PullerToolboxNode' );
  var KnotFocusRegion = require( 'FORCES_AND_MOTION_BASICS/netforce/view/KnotFocusRegion' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  // phet-io modules
  var TString = require( 'ifphetio!PHET_IO/types/TString' );

  // images
  var grassImage = require( 'image!FORCES_AND_MOTION_BASICS/grass.png' );
  var ropeImage = require( 'image!FORCES_AND_MOTION_BASICS/rope.png' );
  var pullFigureBlue0Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_BLUE_0.png' );
  var pullFigureBlue3Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_BLUE_3.png' );
  var pullFigureLargeBlue0Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_lrg_BLUE_0.png' );
  var pullFigureLargeBlue3Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_lrg_BLUE_3.png' );
  var pullFigureSmallBlue0Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_small_BLUE_0.png' );
  var pullFigureSmallBlue3Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_small_BLUE_3.png' );
  var pullFigureRed0Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_RED_0.png' );
  var pullFigureRed3Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_RED_3.png' );
  var pullFigureLargeRed0Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_lrg_RED_0.png' );
  var pullFigureLargeRed3Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_lrg_RED_3.png' );
  var pullFigureSmallRed0Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_small_RED_0.png' );
  var pullFigureSmallRed3Image = require( 'image!FORCES_AND_MOTION_BASICS/pull_figure_small_RED_3.png' );

  // strings
  var sumOfForcesString = require( 'string!FORCES_AND_MOTION_BASICS/sumOfForces' );
  var leftForceString = require( 'string!FORCES_AND_MOTION_BASICS/leftForce' );
  var rightForceString = require( 'string!FORCES_AND_MOTION_BASICS/rightForce' );
  var netForceDescriptionString = require( 'string!FORCES_AND_MOTION_BASICS/netForce.description' );
  var bluePullerGroupDescriptionString = require( 'string!FORCES_AND_MOTION_BASICS/bluePullerGroup.description' );
  var redPullerGroupDescriptionString = require( 'string!FORCES_AND_MOTION_BASICS/redPullerGroup.description' );
  var gameTiedDescriptionString = require( 'string!FORCES_AND_MOTION_BASICS/gameTied.description' );
  var leftString = require( 'string!FORCES_AND_MOTION_BASICS/left' );
  var rightString = require( 'string!FORCES_AND_MOTION_BASICS/right' );
  var groupString = require( 'string!FORCES_AND_MOTION_BASICS/group' );
  var pullerString = require( 'string!FORCES_AND_MOTION_BASICS/puller' );

  // audio
  var golfClapSound = require( 'audio!FORCES_AND_MOTION_BASICS/golf-clap' );

  /**
   * @param {NetForceModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function NetForceScreenView( model, tandem ) {
    var self = this;

    ScreenView.call( this, {
      layoutBounds: ForcesAndMotionBasicsLayoutBounds,
      screenDescription: netForceDescriptionString
    } );

    //Fit to the window and render the initial scene
    var width = this.layoutBounds.width;
    var height = this.layoutBounds.height;

    this.model = model;

    //Create the sky and ground.  Allow the sky and ground to go off the screen in case the window is larger than the sim aspect ratio
    var skyHeight = 376;
    var grassY = 368;
    var groundHeight = height - skyHeight;
    this.addChild( new Rectangle( -width, -skyHeight, width * 3, skyHeight * 2, {
      fill: new LinearGradient( 0, 0, 0, skyHeight ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' )
    } ) );
    this.addChild( new Rectangle( -width, skyHeight, width * 3, groundHeight * 3, {
      fill: '#c59a5b'
    } ) );

    //Show the grass.
    this.addChild( new TandemImage( grassImage, {
      tandem: tandem.createTandem( 'grassImage1' ),
      x: 13,
      y: grassY
    } ) );
    this.addChild( new TandemImage( grassImage, {
      tandem: tandem.createTandem( 'grassImage2' ),
      x: 13 - grassImage.width,
      y: grassY
    } ) );
    this.addChild( new TandemImage( grassImage, {
      tandem: tandem.createTandem( 'grassImage3' ),
      x: 13 + grassImage.width,
      y: grassY
    } ) );

    this.cartNode = new CartNode( model.cart, tandem.createTandem( 'cartNode' ) );

    //Black caret below the cart
    var layoutCenterX = this.layoutBounds.width / 2;
    this.addChild( new TandemPath( new Shape().moveTo( -10, 10 ).lineTo( 0, 0 ).lineTo( 10, 10 ), {
      stroke: '#000000',
      lineWidth: 3,
      x: layoutCenterX,
      y: grassY + 10,
      tandem: tandem.createTandem( 'caretPathNode' )
    } ) );

    var cursorWidth = 18;

    var cursorPathNode = new TandemPath( new Shape().moveTo( 0, 0 ).lineTo( cursorWidth, 0 ).lineTo( cursorWidth / 2, cursorWidth / 10 * 8 ).close(), {
      fill: 'blue',
      stroke: 'black',
      lineWidth: 1,
      tandem: tandem.createTandem( 'cursorPathNode' )
    } );

    // create and add the rope node as an image
    this.ropeNode = new TandemImage( ropeImage, {
      tandem: tandem.createTandem( 'ropeImageNode' ),
      x: 51,
      y: 273
    } );
    this.addChild( this.ropeNode );

    // create the toolboxes that hold the puller children
    var leftToolbox = new PullerToolboxNode( model, this, 25, 'left', 0, 0, 3, 'blue', bluePullerGroupDescriptionString );
    var rightToolbox = new PullerToolboxNode( model, this, 630, 'right', model.pullers.length - 1, 4, model.pullers.length - 1, 'red', redPullerGroupDescriptionString );
    this.addChild( leftToolbox );
    this.addChild( rightToolbox );

    var ropeHeightOffset = 215;

    // region which holds the left knots for drag and drop
    var leftFocusRegion = new KnotFocusRegion( model, leftToolbox, ropeHeightOffset, 'left' );
    this.addChild( leftFocusRegion );

    // region which holds the right knots for drag and drop
    var rightFocusRegion = new KnotFocusRegion( model, rightToolbox, ropeHeightOffset, 'right' );
    this.addChild( rightFocusRegion );

    //Split into another canvas to speed up rendering
    this.addChild( new TandemNode( {
      tandem: tandem.createTandem( 'frontLayer' ),
      layerSplit: true
    } ) );

    //Create the arrow nodes
    var opacity = 0.8;
    this.sumArrow = new ReadoutArrow( sumOfForcesString, '#7dc673', layoutCenterX, 100, this.model.netForceProperty, this.model.showValuesProperty,
      tandem.createTandem( 'sumArrow' ), {
        lineDash: [ 10, 5 ], labelPosition: 'top', opacity: opacity
      } );
    this.leftArrow = new ReadoutArrow( leftForceString, '#bf8b63', layoutCenterX, 200, this.model.leftForceProperty, this.model.showValuesProperty,
      tandem.createTandem( 'leftArrow' ), {
        lineDash: [ 10, 5 ], labelPosition: 'side', opacity: opacity
      } );
    this.rightArrow = new ReadoutArrow( rightForceString, '#bf8b63', layoutCenterX, 200, this.model.rightForceProperty, this.model.showValuesProperty,
      tandem.createTandem( 'rightArrow' ), {
        lineDash: [ 10, 5 ], labelPosition: 'side', opacity: opacity
      } );

    //Arrows should be dotted when the sim is paused, but solid after pressing 'go'
    this.model.runningProperty.link( function( running ) {
      [ self.sumArrow, self.leftArrow, self.rightArrow ].forEach( function( arrow ) {
        arrow.setArrowDash( running ? null : [ 10, 5 ] );
      } );
    } );

    this.model.showSumOfForcesProperty.linkAttribute( this.sumArrow, 'visible' );

    this.model.cart.xProperty.link( function( x ) {
      self.cartNode.x = x + 412;
      self.ropeNode.x = x + 51;
    } );

    this.addChild( this.cartNode );

    //Lookup a puller image given a puller instance and whether they are leaning or not.
    var getPullerImage = function( puller, leaning ) {
      var type = puller.type;
      var size = puller.size;

      //todo: compress with more ternary?
      return type === 'blue' && size === 'large' && !leaning ? pullFigureLargeBlue0Image :
             type === 'blue' && size === 'large' && leaning ? pullFigureLargeBlue3Image :
             type === 'blue' && size === 'medium' && !leaning ? pullFigureBlue0Image :
             type === 'blue' && size === 'medium' && leaning ? pullFigureBlue3Image :
             type === 'blue' && size === 'small' && !leaning ? pullFigureSmallBlue0Image :
             type === 'blue' && size === 'small' && leaning ? pullFigureSmallBlue3Image :
             type === 'red' && size === 'large' && !leaning ? pullFigureLargeRed0Image :
             type === 'red' && size === 'large' && leaning ? pullFigureLargeRed3Image :
             type === 'red' && size === 'medium' && !leaning ? pullFigureRed0Image :
             type === 'red' && size === 'medium' && leaning ? pullFigureRed3Image :
             type === 'red' && size === 'small' && !leaning ? pullFigureSmallRed0Image :
             type === 'red' && size === 'small' && leaning ? pullFigureSmallRed3Image :
             null;
    };

    // get the focus region for a given puller.
    var getKnotRegion = function( puller ) {
      return puller.type === 'red' ? rightFocusRegion : leftFocusRegion;
    };

    // get the associated toolbox for the puller
    var getPullerToolbox = function( puller ) {
      return puller.type === 'red' ? rightToolbox : leftToolbox;
    };

    var getAccessiblePullerDescription = function( puller ) {
      var type = puller.type;
      var size = puller.size;

      var sideDescription = type === 'blue' ? leftString : rightString;

      // create the accessible description for this puller.
      return sideDescription + ' ' + groupString + ' ' + size + ' ' + pullerString + ' ';
    };

    var leftPullerLayer = new TandemNode( {
      tandem: tandem.createTandem( 'leftPullerLayer' )
    } );
    var rightPullerLayer = new TandemNode( {
      tandem: tandem.createTandem( 'rightPullerLayer' )
    } );
    this.pullerNodes = [];

    this.model.pullers.forEach( function( puller ) {
      var pullerNode = new PullerNode( puller, self.model,
        getPullerImage( puller, false ),
        getPullerImage( puller, true ),
        getKnotRegion( puller ),
        getPullerToolbox( puller ),
        getAccessiblePullerDescription( puller ),
        tandem.createTandem( puller.tandem.tail )
      );
      var pullerLayer = pullerNode.puller.type === 'blue' ? leftPullerLayer : rightPullerLayer;
      pullerLayer.addChild( pullerNode );
      self.pullerNodes.push( pullerNode );
    } );

    model.knots.forEach( function( knot, i ) {
      if ( knot.type === 'blue' ) {
        leftFocusRegion.addChild( new KnotHighlightNode( knot, leftPullerLayer.children, leftFocusRegion, leftToolbox, model, tandem.createTandem( 'blueHighlightNode' + i ) ) );
      }
      else if ( knot.type === 'red' ) {
        rightFocusRegion.addChild( new KnotHighlightNode( knot, rightPullerLayer.children, rightFocusRegion, rightToolbox, model, tandem.createTandem( 'redHighlightNode' + i ) ) );
      }
      else {
        assert && assert( 'Knots can only be of type "red" or "blue" in this sim.' );
      }
    } );

    // add puller groups to the tool boxes for nesting hierarchy in parallel DOM.  Specify puller order here.
    leftToolbox.accessibleOrder = leftPullerLayer.children.sort( function( a, b ) {
      if ( a.bounds.height < b.bounds.height ) {
        return 1;
      }
      if ( a.bounds.height > b.bounds.height ) {
        return -1;
      }
      else {
        return 0;
      }
    } );
    rightToolbox.accessibleOrder = rightPullerLayer.children.sort( function( a, b ) {
      if ( a.bounds.height < b.bounds.height ) {
        return -1;
      }
      if ( a.bounds.height > b.bounds.height ) {
        return 1;
      }
      else {
        return 0;
      }
    } );
    leftToolbox.addChild( leftPullerLayer );
    rightToolbox.addChild( rightPullerLayer );

    //Add the go button, but only if there is a puller attached
    // i18n - ensure that the go, pause, and return buttons will fit in between the puller toolboxes
    var maxWidth = ( rightToolbox.left - leftToolbox.right ) / 2;
    var goPauseButton = new GoPauseButton( this.model, this.layoutBounds.width, tandem.createTandem( 'goPauseButton' ), {
      maxWidth: maxWidth
    } );
    this.addChild( goPauseButton );

    //Return button
    this.addChild( new ReturnButton( model, tandem.createTandem( 'returnButton' ), {
      centerX: this.layoutBounds.centerX,
      top: goPauseButton.bottom + 5,
      maxWidth: maxWidth
    } ) );

    // Add the arrow nodes after the pullers so they will appear in the front in z-ordering
    this.addChild( this.leftArrow );
    this.addChild( this.rightArrow );
    this.addChild( this.sumArrow );

    // Show the control panel
    this.controlPanel = new NetForceControlPanel( this.model, tandem.createTandem( 'controlPanel' ) ).mutate( {
      right: 981 - 5,
      top: 5
    } );
    this.addChild( this.controlPanel );

    var flagNode = null;
    // Show the flag node when pulling is complete and update the accessible game over element in the parallel DOM
    var showFlagNode = function() {
      flagNode = new FlagNode( model, self.layoutBounds.width / 2, 10, tandem.createTandem( 'flagNode' ) );
      self.addChild( flagNode );
    };
    Property.multilink( [ model.stateProperty, model.cart.xProperty ], function( state ) {
      flagNode && flagNode.dispose();
      if ( state === 'completed' ) {
        showFlagNode();
      }
    } );

    // Accessibility for reading out the total force
    var accessibleTextProperty = new Property( '', {
      tandem: tandem.createTandem( 'accessibleTextProperty' ),
      phetioValueType: TString
    } );
    model.numberPullersAttachedProperty.link( function() {
      accessibleTextProperty.value = 'Left force: ' + Math.abs( model.getLeftForce() ) + ' Newtons, ' +
                                     'Right force: ' + Math.abs( model.getRightForce() ) + ' Newtons, ' +
                                     'Net Force: ' + Math.abs( model.getNetForce() ) + ' Newtons ' +
                                     (model.getNetForce() === 0 ? '' : model.getNetForce() > 0 ? 'to the right' : 'to the left');
    } );
    this.addLiveRegion( accessibleTextProperty );

    var golfClap = new Sound( golfClapSound );

    //Play audio golf clap when game completed
    model.stateProperty.link( function( state ) {
      if ( state === 'completed' && model.volumeOn ) {
        golfClap.play();
      }
    } );

    //Show 'Sum of Forces = 0' when showForces is selected but the force is zero
    this.sumOfForcesText = new TandemText( sumOfForcesEqualsZeroString, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      centerX: width / 2,
      y: 53,
      tandem: tandem.createTandem( 'sumOfForcesTextNode' )
    } );
    model.multilink( [ 'netForce', 'showSumOfForces' ], function( netForce, showSumOfForces ) {self.sumOfForcesText.visible = !netForce && showSumOfForces;} );
    this.addChild( this.sumOfForcesText );

    cursorPathNode.visible = false;
    this.addChild( cursorPathNode );

    // Show highlight around the toolbox when a toolbox node is focused.
    Input.focusedTrailProperty.link( function( focusedTrail ) {
      if ( focusedTrail ) {
        if ( focusedTrail.node instanceof PullerNode ) {
          if ( focusedTrail.node.puller.type === 'blue' ) {
            leftToolbox.highlighted = true;
            rightToolbox.highlighted = false;
          }
          else {
            leftToolbox.highlighted = false;
            rightToolbox.highlighted = true;
          }
        }
      }
    } );

    // implement accessible content.  For the screen view, this includes an auditory description for the entire screen
    // accessible content
    this.accessibleContent = {
      createPeer: function( accessibleInstance ) {

        // generate the 'supertype peer' for the ScreenView in the parallel DOM.
        var accessiblePeer = ScreenView.ScreenViewAccessiblePeer( accessibleInstance, netForceDescriptionString );

        // create an element for action descriptions.  This element gets updated whenever the user moves a puller
        // and places it in a new location.  The 'aria-live' attribute will read this element whenever the inner text
        // changes.
        var actionElement = document.createElement( 'p' );
        actionElement.innerText = '';
        actionElement.tabIndex = '-1';
        actionElement.setAttribute( 'aria-live', 'assertive' );
        actionElement.id = 'netForceActionElement';
        accessiblePeer.domElement.appendChild( actionElement );

        // create an element for notifying when the game of tug of war is over.
        // The 'aria-live' attribute will read this element whenever the inner text changes.
        // This live region should interrupt any other description so it is marked as assertive.
        var gameOverElement = document.createElement( 'p' );
        gameOverElement.innerText = '';
        gameOverElement.setAttribute( 'aria-live', 'assertive' );
        gameOverElement.id = 'netForceGameOverElement';
        gameOverElement.tabIndex = '-1';
        accessiblePeer.domElement.appendChild( gameOverElement );

        // on load, the screen view should be in the accessible order to provide an overall description of the sim
        accessiblePeer.domElement.tabIndex = '0';

        accessiblePeer.domElement.addEventListener( 'blur', function() {
          accessiblePeer.domElement.tabIndex = '-1';
        } );

        // hide this model sync in the accessible content.  It is not in the link above since this would break the sim
        // when accessible content is disabled.
        model.runningProperty.link( function( running ) {
          // if the net force is zero and the model is running, update aria-live property that the pullers are pulling but
          // the cart is stationary.
          if ( running ) {
            if ( model.netForceProperty.value === 0 && model.numberPullersAttachedProperty.value !== 0 ) {

              // get the live action element
              var actionElement = document.getElementById( 'netForceGameOverElement' );

              // update the live element inner text and fire associated aria events
              actionElement.innerText = gameTiedDescriptionString;
            }
          }
        } );

        // add a global event listener to all children of this screen view, bubbles through all children
        accessiblePeer.domElement.addEventListener( 'keydown', function( event ) {
          // 'global' event behavior in here...

          // when the user presses 'm' we want the AT to read off the sim state.
          //if( event.keyCode === )
        } );

        return accessiblePeer;
      }
    };
  }

  forcesAndMotionBasics.register( 'NetForceScreenView', NetForceScreenView );

  return inherit( ScreenView, NetForceScreenView );
} );
