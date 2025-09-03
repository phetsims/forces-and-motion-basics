// Copyright 2013-2025, University of Colorado Boulder

/**
 * Main class for the entire view of the Net Force model, including cart, pullers, background, controls & audio sounds (when Net Force game complete).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import Shape from '../../../../kite/js/Shape.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import LinearGradient from '../../../../scenery/js/util/LinearGradient.js';
import SoundClip from '../../../../tambo/js/sound-generators/SoundClip.js';
import soundManager from '../../../../tambo/js/soundManager.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import grass_png from '../../../images/grass_png.js';
import rope_png from '../../../images/rope_png.js';
import golfClap_mp3 from '../../../sounds/golfClap_mp3.js';
import ForcesAndMotionBasicsLayoutBounds from '../../common/view/ForcesAndMotionBasicsLayoutBounds.js';
import ReadoutArrow from '../../common/view/ReadoutArrow.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import ForcesAndMotionBasicsPreferences from '../model/ForcesAndMotionBasicsPreferences.js';
import NetForceModel from '../model/NetForceModel.js';
import CartNode from './CartNode.js';
import CartStopperNode from './CartStopperNode.js';
import FlagNode from './FlagNode.js';
import ForcesListDescription from './ForcesListDescription.js';
import GoPauseButton from './GoPauseButton.js';
import KnotHighlightNode from './KnotHighlightNode.js';
import NetForceControlPanel from './NetForceControlPanel.js';
import NetForceGrabReleaseCueNode from './NetForceGrabReleaseCueNode.js';
import NetForceScreenSummaryContent from './NetForceScreenSummaryContent.js';
import PullerGroupNode from './PullerGroupNode.js';
import PullerNode from './PullerNode.js';
import PullerToolboxNode from './PullerToolboxNode.js';
import ReturnButton from './ReturnButton.js';
import SpeedDescription from './SpeedDescription.js';
import TugOfWarDescription from './TugOfWarDescription.js';

const leftForceStringProperty = ForcesAndMotionBasicsFluent.leftForceStringProperty;
const rightForceStringProperty = ForcesAndMotionBasicsFluent.rightForceStringProperty;
const sumOfForcesStringProperty = ForcesAndMotionBasicsFluent.sumOfForcesStringProperty;

// constants
const MARGIN_FROM_LAYOUT_BOUNDS = 5;
const STOPPER_TOP_WIDTH = 11;
const STOPPER_BOTTOM_WIDTH = 30;
const STOPPER_HEIGHT = 24;
const SUM_ARROW_TAIL_Y = 127;
const BUTTON_PADDING = 7; // placement padding for the reset all button

export default class NetForceScreenView extends ScreenView {
  private readonly cartNode: CartNode;
  private readonly ropeImageNode: Image;
  private readonly sumArrow: ReadoutArrow;
  private readonly leftArrow: ReadoutArrow;
  private readonly rightArrow: ReadoutArrow;
  public readonly pullerNodes: PullerNode[] = [];
  private readonly controlPanel: NetForceControlPanel;
  private readonly resetAllButton: ResetAllButton;
  private readonly sumOfForcesText: Text;
  private readonly leftPullerGroup: PullerGroupNode;
  private readonly rightPullerGroup: PullerGroupNode;
  private readonly returnButton: ReturnButton;
  private readonly grabReleaseCueNode: NetForceGrabReleaseCueNode;

  public constructor( private readonly model: NetForceModel, tandem: Tandem ) {

    super( {
      layoutBounds: ForcesAndMotionBasicsLayoutBounds,
      tandem: tandem,
      screenSummaryContent: new NetForceScreenSummaryContent( model )
    } );
    // Fit to the window and render the initial scene
    const width = this.layoutBounds.width;
    const height = this.layoutBounds.height;

    // Create the sky and ground.  Allow the sky and ground to go off the screen in case the window is larger than the sim aspect ratio
    const skyHeight = 376;
    const grassY = 368;
    const groundHeight = height - skyHeight;
    this.addChild( new Rectangle( -width, -skyHeight, width * 3, skyHeight * 2, {
      fill: new LinearGradient( 0, 0, 0, skyHeight ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' )
    } ) );
    this.addChild( new Rectangle( -width, skyHeight, width * 3, groundHeight * 3, {
      fill: '#c59a5b'
    } ) );

    // Show the grass.
    this.addChild( new Image( grass_png, {
      x: 13,
      y: grassY
    } ) );
    this.addChild( new Image( grass_png, {
      x: 13 - grass_png.width,
      y: grassY
    } ) );
    this.addChild( new Image( grass_png, {
      x: 13 + grass_png.width,
      y: grassY
    } ) );

    this.cartNode = new CartNode( model.cart, model.speedProperty, model.showSpeedProperty );

    // Black caret below the cart
    const layoutCenterX = this.layoutBounds.width / 2;
    this.addChild( new Path( new Shape().moveTo( -10, 10 ).lineTo( 0, 0 ).lineTo( 10, 10 ), {
      stroke: '#000000',
      lineWidth: 3,
      x: layoutCenterX,
      y: grassY + 10
    } ) );

    const cursorWidth = 18;

    const cursorPathNode = new Path( new Shape().moveTo( 0, 0 ).lineTo( cursorWidth, 0 ).lineTo( cursorWidth / 2, cursorWidth / 10 * 8 ).close(), {
      fill: 'blue',
      stroke: 'black',
      lineWidth: 1
    } );

    // cart stoppers that seem to stop cart motion
    const stopperY = grassY + 5; // a little lower than the grass because the grass includes some sky blue
    const rightStopper = new CartStopperNode( STOPPER_TOP_WIDTH, STOPPER_BOTTOM_WIDTH, STOPPER_HEIGHT, {
      left: layoutCenterX + NetForceModel.GAME_LENGTH,
      y: stopperY
    } );
    const leftStopper = new CartStopperNode( STOPPER_TOP_WIDTH, STOPPER_BOTTOM_WIDTH, STOPPER_HEIGHT, {
      direction: 'right',
      right: layoutCenterX - NetForceModel.GAME_LENGTH,
      y: stopperY
    } );
    this.addChild( rightStopper );
    this.addChild( leftStopper );

    // create and add the rope node as an image
    const SVG_WIDTH = 1130.2;
    const PRIOR_SCALE = 0.78;
    const PNG_WIDTH = 2356;
    this.ropeImageNode = new Image( rope_png, {

      // Exactly match the dimensions of the prior SVG image
      scale: ( SVG_WIDTH * PRIOR_SCALE ) / PNG_WIDTH,
      x: 51,
      y: 273
    } );
    this.addChild( this.ropeImageNode );

    model.knots.forEach( ( knot, i ) => this.addChild( new KnotHighlightNode( knot ) ) );

    // Split into another canvas to speed up rendering
    this.addChild( new Node( {
      layerSplit: true
    } ) );

    // Create the arrow nodes
    const opacity = 0.8;
    this.sumArrow = new ReadoutArrow( 'sum', sumOfForcesStringProperty, '#7dc673', layoutCenterX, SUM_ARROW_TAIL_Y, this.model.netForceProperty, this.model.showValuesProperty, {
      labelPosition: 'top', opacity: opacity,
      arrowNodeOptions: {
        lineDash: [ 10, 5 ]
      }
    } );
    this.leftArrow = new ReadoutArrow( 'left', leftForceStringProperty, '#bf8b63', layoutCenterX, 200, this.model.leftForceProperty, this.model.showValuesProperty, {
      labelPosition: 'side', opacity: opacity,
      arrowNodeOptions: {
        lineDash: [ 10, 5 ]
      }
    } );
    this.rightArrow = new ReadoutArrow( 'right', rightForceStringProperty, '#bf8b63', layoutCenterX, 200, this.model.rightForceProperty, this.model.showValuesProperty, {
      labelPosition: 'side', opacity: opacity,
      arrowNodeOptions: {
        lineDash: [ 10, 5 ]
      }
    } );

    // Arrows should be dotted when the sim is paused, but solid after pressing 'go'
    this.model.isRunningProperty.link( running => {
      [ this.sumArrow, this.leftArrow, this.rightArrow ].forEach( arrow => {
        arrow.setArrowDash( running ? [] : [ 10, 5 ] );
      } );
    } );

    this.model.showSumOfForcesProperty.linkAttribute( this.sumArrow, 'visible' );

    this.model.cart.positionProperty.link( x => {
      this.cartNode.x = x + 412;
      this.ropeImageNode.x = x + 51;
    } );

    this.addChild( this.cartNode );

    // Create the toolboxes with dynamic accessibility properties
    const leftToolbox = new PullerToolboxNode( model, this, 25, 'left', 0, 0, 3, 'blue', {
      tagName: 'div',
      accessibleHeading: ForcesAndMotionBasicsFluent.a11y.netForceScreen.teamName.createProperty( {
        color: model.leftTeamColorProperty
      } )
    } );
    const rightToolbox = new PullerToolboxNode( model, this, 630, 'right', model.pullers.length - 1, 4, model.pullers.length - 1, 'red', {
      tagName: 'div',
      accessibleHeading: ForcesAndMotionBasicsFluent.a11y.netForceScreen.teamName.createProperty( {
        color: model.rightTeamColorProperty
      } )
    } );

    // Create instruction nodes that will be read before the puller groups
    const leftInstructions = new Node( {
      tagName: 'p',
      innerContent: ForcesAndMotionBasicsFluent.a11y.pullers.pullerInstructionStringProperty
    } );
    const rightInstructions = new Node( {
      tagName: 'p',
      innerContent: ForcesAndMotionBasicsFluent.a11y.pullers.pullerInstructionStringProperty
    } );

    // Add instructions to toolboxes first (so they're read before puller groups)
    leftToolbox.addChild( leftInstructions );
    rightToolbox.addChild( rightInstructions );

    this.addChild( leftToolbox );
    this.addChild( rightToolbox );

    const pullersTandem = tandem.createTandem( 'pullers' );

    this.leftPullerGroup = new PullerGroupNode( model, leftToolbox.bounds, {
      side: 'left'
    } );
    this.rightPullerGroup = new PullerGroupNode( model, rightToolbox.bounds, {
      side: 'right'
    } );
    this.model.pullers.forEach( puller => {

      const accessibleNameProperty = ForcesAndMotionBasicsFluent.a11y.netForceScreen.puller.accessibleName.createProperty( {
        size: puller.size,
        color: puller.type,
        index: puller.descriptionIndex
      } );

      const pullerNode = new PullerNode( puller, this, {
        tandem: pullersTandem.createTandem( `${puller.tandem.name}Node` ),
        accessibleName: accessibleNameProperty
      } );
      const pullerGroup = pullerNode.puller.type === 'blue' ? this.leftPullerGroup : this.rightPullerGroup;
      pullerGroup.addChild( pullerNode );
      this.pullerNodes.push( pullerNode );
    } );

    leftToolbox.addChild( this.leftPullerGroup );
    rightToolbox.addChild( this.rightPullerGroup );

    const playAreaControlNode = new Node( {
      tagName: 'div',
      accessibleHeading: ForcesAndMotionBasicsFluent.a11y.netForceScreen.playAreaControls.accessibleHeadingStringProperty,
      appendDescription: false
    } );

    this.addChild( playAreaControlNode );

    // i18n - ensure that the go, pause, and return buttons will fit in between the puller toolboxes
    const maxWidth = ( rightToolbox.left - leftToolbox.right ) / 2;
    const goPauseButton = new GoPauseButton( this.model, this.layoutBounds.width, tandem.createTandem( 'goPauseButton' ), {
      maxWidth: maxWidth,
      tandem: tandem.createTandem( 'goPauseButton' )
    } );
    playAreaControlNode.addChild( goPauseButton );

    // Return button
    this.returnButton = new ReturnButton( model, tandem.createTandem( 'returnButton' ), {
      centerX: this.layoutBounds.centerX,
      top: goPauseButton.bottom + MARGIN_FROM_LAYOUT_BOUNDS,
      maxWidth: maxWidth
    } );
    playAreaControlNode.addChild( this.returnButton );

    // Add the arrow nodes after the pullers so they will appear in the front in z-ordering
    this.addChild( this.leftArrow );
    this.addChild( this.rightArrow );
    this.addChild( this.sumArrow );

    const forcesListDescription = new ForcesListDescription( model );

    // Show the control panel
    this.controlPanel = new NetForceControlPanel( this.model, tandem.createTandem( 'controlPanel' ), forcesListDescription.netForceDescriptionProperty, {
      visiblePropertyOptions: { phetioFeatured: true }
    } );

    // Create reset all button
    this.resetAllButton = new ResetAllButton( {
      listener: () => {
        model.reset();

        // Reset all puller nodes
        this.pullerNodes.forEach( pullerNode => pullerNode.reset() );

        // Reset the grab release cue node
        this.grabReleaseCueNode.reset();
      },
      radius: 23,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );

    this.addChild( this.controlPanel );
    this.addChild( this.resetAllButton );

    ManualConstraint.create( this, [ this.controlPanel ], controlPanelProxy => {
      controlPanelProxy.right = this.layoutBounds.width - MARGIN_FROM_LAYOUT_BOUNDS;
      controlPanelProxy.top = MARGIN_FROM_LAYOUT_BOUNDS;
    } );

    // It was specifically requested that the reset all button not move when the control panel visibleProperty becomes false,
    // see https://github.com/phetsims/forces-and-motion-basics/issues/353
    this.resetAllButton.right = this.layoutBounds.width - MARGIN_FROM_LAYOUT_BOUNDS;
    this.resetAllButton.top = this.controlPanel.bottom + BUTTON_PADDING;

    let lastFlagNode: FlagNode | null = null;
    let hasAnnouncedWinner = false; // Prevent duplicate win announcements

    // Show the flag node when pulling is complete
    Multilink.multilink( [ model.stateProperty, model.cart.positionProperty ], ( state, x ) => {
      lastFlagNode && lastFlagNode.dispose();
      lastFlagNode = null;
      if ( state === 'completed' && Math.abs( x ) > 1E-6 ) {
        lastFlagNode = new FlagNode( model );
        this.addChild( lastFlagNode );
        lastFlagNode.centerX = this.layoutBounds.width / 2;
        lastFlagNode.top = 8;

        // Add ARIA-LIVE announcement for the winner (only once per game)
        if ( !hasAnnouncedWinner ) {
          const pullerColor = ForcesAndMotionBasicsPreferences.netForcePullerColorsProperty.value;
          let winnerAnnouncement: string;
          if ( pullerColor === 'purpleOrange' ) {
            winnerAnnouncement = x < 0 ? 'Purple wins!' : 'Orange wins!';
          }
          else {
            winnerAnnouncement = x < 0 ? 'Blue wins!' : 'Red wins!';
          }
          this.addAccessibleResponse( winnerAnnouncement );
          hasAnnouncedWinner = true;
        }
      }
    } );

    const golfClap = new SoundClip( golfClap_mp3 );
    soundManager.addSoundGenerator( golfClap );

    // Play audio golf clap when game completed
    model.stateProperty.link( state => {
      if ( state === 'completed' ) {
        golfClap.play();
      }
      // Reset the win announcement flag when starting a new game
      if ( state === 'experimenting' ) {
        hasAnnouncedWinner = false;
      }
    } );

    // Show 'Sum of Forces = 0' when showForces is selected but the force is zero
    this.sumOfForcesText = new Text( ForcesAndMotionBasicsFluent.sumOfForcesEqualsZeroStringProperty, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      bottom: SUM_ARROW_TAIL_Y - ReadoutArrow.ARROW_HEAD_WIDTH / 2,
      maxWidth: 280
    } );
    ForcesAndMotionBasicsFluent.sumOfForcesEqualsZeroStringProperty.link( () => {
      this.sumOfForcesText.centerX = width / 2;
    } );

    Multilink.multilink( [ model.netForceProperty, model.showSumOfForcesProperty ], ( netForce, showSumOfForces ) => { this.sumOfForcesText.visible = !netForce && showSumOfForces; } );
    this.addChild( this.sumOfForcesText );

    cursorPathNode.visible = false;
    this.addChild( cursorPathNode );

    // Create Tug of War overview node
    const tugOfWarOverviewNode = new TugOfWarDescription( model, this.pullerNodes );
    this.addChild( tugOfWarOverviewNode );

    // Create Forces list description node
    this.addChild( forcesListDescription );

    // Create Speed description node
    const speedDescription = new SpeedDescription( model );
    this.addChild( speedDescription );

    // Set up the pdomOrder for proper accessibility hierarchy
    // Play Area: left toolbox -> right toolbox -> tug of war overview -> forces list -> speed -> play area controls -> cart -> arrows
    this.pdomPlayAreaNode.pdomOrder = [
      leftToolbox,
      rightToolbox,
      tugOfWarOverviewNode,
      forcesListDescription,
      speedDescription,
      playAreaControlNode,
      this.cartNode,
      // stateDescriptionNode,
      this.leftArrow,
      this.rightArrow,
      this.sumArrow
    ];

    // Control Area: control panel and reset button
    this.pdomControlAreaNode.pdomOrder = [
      this.controlPanel,
      this.resetAllButton
    ];

    this.grabReleaseCueNode = new NetForceGrabReleaseCueNode( this.pullerNodes, this.layoutBounds, tandem.createTandem( 'grabReleaseCueNode' ) );
    this.addChild( this.grabReleaseCueNode );

    // Hide cue node after any interaction with pullers
    this.pullerNodes.forEach( pullerNode => {
      pullerNode.puller.modeProperty.link( mode => {
        if ( mode.isKeyboardGrabbed() ) {
          this.grabReleaseCueNode.hasInteractedProperty.value = true;
        }
      } );
    } );

    // Update PDOM order whenever any puller's mode changes to match X-coordinate focus order
    this.model.pullers.forEach( puller => {
      puller.modeProperty.link( () => {
        this.updatePullerPDOMOrder();
      } );
    } );

    // Set initial PDOM order
    this.updatePullerPDOMOrder();
  }

  /**
   * Updates the PDOM order of puller nodes to prioritize pullers on the rope first,
   * then pullers in the toolbox, all ordered left to right.
   */
  private updatePullerPDOMOrder(): void {
    // Separate pullers into those on rope and those in toolbox
    const pullersOnRope = this.pullerNodes.filter( node => node.puller.modeProperty.value.isAttached() );
    const pullersInToolbox = this.pullerNodes.filter( node => !node.puller.modeProperty.value.isAttached() );

    // Sort each group by X position (left to right)
    pullersOnRope.sort( ( a, b ) => a.centerX - b.centerX );
    pullersInToolbox.sort( ( a, b ) => a.centerX - b.centerX );

    // Combine: rope pullers first, then toolbox pullers
    const sortedPullerNodes = [ ...pullersOnRope, ...pullersInToolbox ];

    // Separate into left and right groups while maintaining the rope-first order
    const leftPullers = sortedPullerNodes.filter( node => node.puller.type === 'blue' );
    const rightPullers = sortedPullerNodes.filter( node => node.puller.type === 'red' );

    // Set PDOM order for each group
    this.leftPullerGroup.pdomOrder = leftPullers;
    this.rightPullerGroup.pdomOrder = rightPullers;
  }
}

forcesAndMotionBasics.register( 'NetForceScreenView', NetForceScreenView );