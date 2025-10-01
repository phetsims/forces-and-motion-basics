// Copyright 2013-2025, University of Colorado Boulder

/**
 * Shows the draggable node for any of the items in the Motion, Friction and Acceleration screens.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Matrix3 from '../../../../dot/js/Matrix3.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import BackgroundNode from '../../../../scenery-phet/js/BackgroundNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import HighlightPath from '../../../../scenery/js/accessibility/HighlightPath.js';
import InteractiveHighlighting from '../../../../scenery/js/accessibility/voicing/InteractiveHighlighting.js';
import { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import { ImageableImage } from '../../../../scenery/js/nodes/Imageable.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import phetioStateSetEmitter from '../../../../tandem/js/phetioStateSetEmitter.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import forcesAndMotionBasics from '../../forcesAndMotionBasics.js';
import ForcesAndMotionBasicsFluent from '../../ForcesAndMotionBasicsFluent.js';
import Item from '../model/Item.js';
import MotionModel from '../model/MotionModel.js';
import ItemDescriber from './ItemDescriber.js';
import ItemNodeDragListener from './ItemNodeDragListener.js';
import ItemNodeKeyboardListener from './ItemNodeKeyboardListener.js';
import MotionScreenView from './MotionScreenView.js';

// Workaround for https://github.com/phetsims/scenery/issues/108
const IDENTITY = Matrix3.scaling( 1, 1 );

export default class ItemNode extends InteractiveHighlighting( Node ) {

  // Mass label that appears beneath the item's graphic.
  private readonly labelNode: Node;

  // Primary image that represents the item while active.
  private readonly normalImageNode: Image;

  // Alternate image used when the item is sitting in the stack.
  public readonly sittingImageNode: Image;

  // Drag listener that manages pointer interactions and sound.
  private readonly dragListener: SoundDragListener;

  // Keyboard listener that wires up the item interaction keys.
  private readonly keyboardListener: KeyboardListener<OneKeyStroke[]> | null = null;

  // Highlight path instance used for focus visualization.
  private readonly focusHighlightPath: HighlightPath;

  // Track whether this item was originally on stack when grabbed (for focus management)
  public wasOriginallyOnStack = false;

  // Track original state for escape key functionality
  public originalPosition: Vector2 | null = null;

  /**
   * @param model the entire model for the containing screen
   * @param motionView the entire view for the containing screen
   * @param item the corresponding to this ItemNode
   * @param normalImageProperty property for the phet.scenery.Image to show for this node
   * @param sittingImageProperty property fot optional sitting image for when the person is sitting down
   * @param holdingImageProperty property for optional holding image for when the person is holding an object
   * @param showMassesProperty property for whether the mass value should be shown
   * @param itemToolbox - The toolbox that contains this item
   * @param tandem
   */
  public constructor( public readonly model: MotionModel,
                      private readonly motionView: MotionScreenView,
                      public readonly item: Item,
                      normalImageProperty: TReadOnlyProperty<ImageableImage>,
                      sittingImageProperty: TReadOnlyProperty<ImageableImage>,
                      holdingImageProperty: TReadOnlyProperty<ImageableImage>,
                      showMassesProperty: TReadOnlyProperty<boolean>,
                      public readonly itemToolbox: Node,
                      tandem: Tandem ) {

    // Set up strings for mass labels
    const unknownValueIndicatorStringProperty = ForcesAndMotionBasicsFluent.unknownValueIndicatorStringProperty;
    const pattern0MassUnitsKilogramsStringProperty = new PatternStringProperty(
      ForcesAndMotionBasicsFluent.pattern[ '0massUnitsKilogramsStringProperty' ], { mass: item.massProperty }, { formatNames: [ 'mass' ] } );

    // Localized name and accessible name with mass, using shared helpers
    const localizedItemNameProperty = ItemDescriber.getLocalizedItemNameProperty( item );
    const itemAccessibleNameWithMassProperty = ItemDescriber.createItemAccessibleNameWithMassProperty( item );

    // Create a derived property that switches between plain name and name with mass
    const accessibleNameProperty = DerivedProperty.deriveAny(
      [ showMassesProperty, itemAccessibleNameWithMassProperty, localizedItemNameProperty ],
      () => showMassesProperty.value ? itemAccessibleNameWithMassProperty.value : localizedItemNameProperty.value
    ) as TReadOnlyProperty<string>;

    super( {
      cursor: 'pointer',
      scale: item.imageScale,
      tandem: tandem,
      phetioFeatured: true,
      phetioInputEnabledPropertyInstrumented: true,
      visiblePropertyOptions: { phetioFeatured: true },
      tagName: 'button',

      // ARIA attributes for the group
      focusable: true,

      accessibleName: accessibleNameProperty
    } );

    // translate this node to the item's position
    this.translate( item.positionProperty.value );

    // Create the node for the main graphic
    const normalImageNode = new Image( normalImageProperty );
    this.normalImageNode = normalImageNode;

    // keep track of the sitting image to track its width for the pusher
    this.sittingImageNode = new Image( sittingImageProperty );

    // When the model changes, update the image position as well as which image is shown
    const updateImage = () => {
      if ( ( typeof holdingImageProperty.value !== 'undefined' ) && ( item.armsUp() && item.inStackProperty.value ) ) {
        normalImageNode.imageProperty = holdingImageProperty;
      }
      else if ( item.inStackProperty.value && typeof sittingImageProperty.value !== 'undefined' ) {
        normalImageNode.imageProperty = sittingImageProperty;
      }
      else {
        normalImageNode.imageProperty = normalImageProperty;
      }
      if ( this.labelNode ) {
        this.updateLabelPosition();
      }
    };

    // Make sure the arms are updated (even if nothing else changed)
    phetioStateSetEmitter.addListener( updateImage );

    for ( let i = 0; i < model.items.length; i++ ) {
      model.items[ i ].userControlledProperty.link( updateImage );
    }

    model.stackedItems.lengthProperty.link( updateImage );

    this.dragListener = new ItemNodeDragListener( this, tandem.createTandem( 'dragListener' ) );
    this.addInputListener( this.dragListener );

    // if the item is being dragged, cancel the drag on reset
    model.resetAllEmitter.addListener( () => {
      // cancel the drag and reset item
      if ( item.userControlledProperty.value ) {
        this.dragListener.interrupt();
        item.reset();
      }
    } );

    // Label for the mass (if it is shown)
    // Denominator empirically determined to prevent most labels from overlapping. The second value was empirically
    // determined to prevent the label from overlapping on larger images.
    const maxWidth = Math.min( normalImageNode.width / 1.7, 70 );
    const massLabelText = new Text( item.mystery ? unknownValueIndicatorStringProperty : pattern0MassUnitsKilogramsStringProperty, {
      font: new PhetFont( {
        size: 15,
        weight: 'bold'
      } ),
      maxWidth: maxWidth // Denominator empirically determined to prevent labels from overlapping.
    } );
    const roundedRadius = 10;

    const massLabelBackground = new BackgroundNode( massLabelText, {
      rectangleOptions: {
        cornerRadius: roundedRadius,
        opacity: 1,
        fill: 'white',
        stroke: 'gray'
      },
      xMargin: roundedRadius / 2
    } );

    // the label needs to be scaled back up after the image was scaled down
    // normalize the maximum width to then restrict the labels for i18n
    const labelText = new Node( {
      children: [ massLabelBackground ],
      scale: 1.0 / item.imageScale
    } );
    this.labelNode = labelText;

    // Ensure the massLabelText is centered in the roundRect and fits within the roundRect with dynamic locale
    ManualConstraint.create( this, [ labelText, this.normalImageNode ], () => {
      this.updateLabelPosition();
    } );

    // Update the position of the item
    item.positionProperty.link( position => this.setTranslation( position ) );

    // When the object is scaled or change direction, update the image part
    Multilink.multilink( [ item.interactionScaleProperty, item.directionProperty ], ( interactionScale, direction ) => {
      const scale = item.imageScale * interactionScale;
      this.setScaleMagnitude( scale );

      // make sure that labels remain the same size
      labelText.setScaleMagnitude( 1 / scale );

      normalImageNode.setMatrix( IDENTITY );
      if ( direction === 'right' ) {

        // store the center so that it can be reapplied after change in scale
        const centerX = normalImageNode.centerX;

        normalImageNode.scale( -1, 1 );

        // reapply the center
        normalImageNode.centerX = centerX;
      }

      // when scale or direction change, make sure that the label is still centered
      this.updateLabelPosition();
    } );
    item.inStackProperty.link( updateImage );

    this.addChild( normalImageNode );
    this.addChild( labelText );

    showMassesProperty.link( showMasses => { labelText.visible = showMasses; } );

    this.addLinkedElement( item );

    // When hiding the item via the PhET-iO API (e.g. in PhET-iO Studio or PhET Studio), remove from the stack and move back to the toolbox, invisibly
    this.visibleProperty.link( visible => {
      if ( !visible ) {
        const stackedIndex = model.stackedItems.indexOf( item );
        stackedIndex >= 0 && model.spliceStack( stackedIndex );
        item.reset();
      }
    } );

    // Use a HighlightPath without a transformSourceNode to avoid DAG assertions during rapid reparenting
    this.focusHighlightPath = new HighlightPath( null );
    this.focusHighlight = this.focusHighlightPath;

    // Keep the focus highlight in sync with this node's local bounds
    this.localBoundsProperty.link( localBounds => {
      if ( localBounds.isFinite() ) {
        this.focusHighlightPath.setShape( Shape.bounds( localBounds ) );
      }
    } );

    // Keep dashed style consistent with interaction state
    item.modeProperty.link( mode => {
      this.focusHighlightPath.setDashed( mode === 'keyboardGrabbedFromStack' || mode === 'keyboardGrabbedFromToolbox' || mode === 'pointerGrabbed' );

      this.accessibleRoleDescription = mode === 'pointerGrabbed' || mode === 'keyboardGrabbedFromStack' || mode === 'keyboardGrabbedFromToolbox' ?
                                       ForcesAndMotionBasicsFluent.a11y.navigableStringProperty : ForcesAndMotionBasicsFluent.a11y.sortableStringProperty;
    } );

    // Create keyboard listener for item interactions
    this.keyboardListener = new ItemNodeKeyboardListener( keys => this.handleKeyboardInput( keys ) );

    this.addInputListener( this.keyboardListener );

    /**
     * On focus lost, if the item is currently grabbed, return it where it came from.
     * See https://github.com/phetsims/forces-and-motion-basics/issues/446
     */
    this.focusedProperty.link( focused => {
      if ( !focused ) {

        if ( this.item.modeProperty.value === 'keyboardGrabbedFromToolbox' ) {
          this.returnItemToToolbox();
        }
        else if ( this.item.modeProperty.value === 'keyboardGrabbedFromStack' ) {
          const priorLength = this.placeItemOnStack();
          this.addAccessibleContextResponse( ItemDescriber.getDroppedOnStackResponse( this.model, priorLength ) );
        }
      }
    } );
  }

  /**
   * Set the label position relative to the bottom of the image.
   */
  private updateLabelPosition(): void {
    this.labelNode.bottom = this.normalImageNode.height - 5;
    this.labelNode.centerX = this.normalImageNode.centerX;
  }

  /**
   * Get the width of this item node, modified by the current scale factor. If the item
   * is using its sitting representation, use that to get the scaled width.
   */
  public getScaledWidth(): number {
    return ( this.sittingImageNode ? this.sittingImageNode.width : this.normalImageNode.width ) * this.item.getCurrentScale();
  }

  /**
   * Handle keyboard input based on current state and strategy
   * @param keysPressed - The key(s) that were pressed
   */
  public handleKeyboardInput( keysPressed: OneKeyStroke ): void {
    const isGrabbed = this.item.userControlledProperty.value;

    if ( keysPressed === 'escape' ) {
      this.handleEscapeKey();
      return;
    }

    if ( keysPressed === 'enter' || keysPressed === 'space' ) {
      this.handleGrabDropKey();
      return;
    }

    if ( keysPressed === 'delete' || keysPressed === 'backspace' ) {
      this.handleReturnToToolboxKey();
      return;
    }

    // Arrow key navigation
    if ( [ 'arrowLeft', 'arrowRight', 'arrowUp', 'arrowDown' ].includes( keysPressed ) ) {

      if ( isGrabbed ) {
        this.handleGrabbedNavigation();
      }
      else {

        // Map arrow key string to direction
        const arrowToDirection = {
          arrowLeft: 'left',
          arrowRight: 'right',
          arrowUp: 'up',
          arrowDown: 'down'
        } as const;
        const direction = arrowToDirection[ keysPressed as keyof typeof arrowToDirection ];

        this.handleSelectionNavigation( direction );
      }
    }
  }

  /**
   * Handle escape key to cancel current interaction
   */
  private handleEscapeKey(): void {
    if ( this.item.userControlledProperty.value && this.originalPosition ) {

      this.item.cancelAnimation();

      if ( this.wasOriginallyOnStack ) {
        this.item.modeProperty.value = 'onStack';
        this.item.positionProperty.value = this.originalPosition;

        // Add back to stack if it was originally there
        if ( !this.model.stackedItems.includes( this.item ) ) {
          this.model.stackedItems.add( this.item );
        }

        // Announce returned to stack
        this.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.motionScreen.objectResponses.returnedToStackStringProperty );
      }
      else {
        this.item.modeProperty.value = 'inToolbox';
        this.item.positionProperty.value = this.originalPosition;
        this.item.directionProperty.value = 'left';

        // Announce returned to toolbox
        this.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.motionScreen.objectResponses.returnedToToolboxStringProperty );
      }
    }
  }

  /**
   * Handle delete/backspace to return grabbed item to toolbox with announcement
   */
  private handleReturnToToolboxKey(): void {
    if ( this.item.userControlledProperty.value ) {

      // Force return to toolbox
      this.returnItemToToolbox();

      // Announce returned to toolbox
      this.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.motionScreen.objectResponses.returnedToToolboxStringProperty );
    }
  }

  /**
   * Handle enter/space key to grab or drop item
   */
  private handleGrabDropKey(): void {
    const isGrabbed = this.item.userControlledProperty.value;

    if ( !isGrabbed ) {

      // Grab the item
      this.wasOriginallyOnStack = this.item.inStackProperty.value;
      this.originalPosition = this.item.positionProperty.value.copy();

      // Set keyboard grabbed mode based on current location
      if ( this.wasOriginallyOnStack ) {
        this.item.setKeyboardGrabbedMode( 'stack' );
      }
      else {
        const toolboxSide = this.item.getToolboxSide();
        this.item.setKeyboardGrabbedMode( toolboxSide === 'left' ? 'leftToolbox' : 'rightToolbox' );
      }

      // Remove from stack if it was there
      const index = this.model.stackedItems.indexOf( this.item );
      if ( index >= 0 ) {
        this.model.spliceStack( index );
      }
      this.item.cancelAnimation();

      // Move to front
      this.moveToFront();

      // If grabbing from toolbox, immediately move to proposed stack position
      if ( !this.wasOriginallyOnStack ) {
        const stackX = this.motionView.layoutBounds.width / 2 - this.width / 2;
        const stackY = this.motionView.topOfStack - this.height - 20;
        this.item.positionProperty.value = new Vector2( stackX, stackY );
      }

      // Announce initial grabbed location
      this.addAccessibleContextResponse( ItemDescriber.getOverAreaMessageForStackHover( this.model ) );
    }
    else {

      // Drop the item at current position

      // Determine drop location based on current position
      const droppedOnStack = this.isOverStackArea();

      if ( droppedOnStack ) {
        const priorLength = this.placeItemOnStack();
        this.addAccessibleContextResponse( ItemDescriber.getDroppedOnStackResponse( this.model, priorLength ) );
      }
      else {
        this.returnItemToToolbox();
        this.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.motionScreen.objectResponses.returnedToToolboxStringProperty );
      }
    }
  }

  /**
   * Handle navigation while item is grabbed (cycling through drop positions)
   */
  private handleGrabbedNavigation(): void {
    if ( !this.originalPosition ) { return; }

    // For grabbed items, any arrow key cycles between home (toolbox) and stack positions
    const currentY = this.item.positionProperty.value.y;

    // Determine the home position - for items grabbed from stack, use their reset position (toolbox)
    // For items grabbed from toolbox, use their original position
    const homePosition = this.wasOriginallyOnStack ?
                         new Vector2( this.item.positionProperty.initialValue.x, this.item.positionProperty.initialValue.y - 40 ) :
                         this.originalPosition.plusXY( 0, -40 ); // it is larger during interaction, so move even more above its home spot

    const isAtHome = Math.abs( currentY - homePosition.y ) < 50; // Within 50 pixels of home position

    if ( isAtHome ) {

      // Move to stack position
      const stackX = this.motionView.layoutBounds.width / 2 - this.width / 2;
      const stackY = this.motionView.topOfStack - this.height - 20;
      this.item.positionProperty.value = new Vector2( stackX, stackY );

      // Announce over area
      this.addAccessibleContextResponse( ItemDescriber.getOverAreaMessageForStackHover( this.model ) );
    }
    else {

      // Move back to home position
      this.item.positionProperty.value = homePosition;

      // Announce over toolbox
      this.addAccessibleContextResponse( ForcesAndMotionBasicsFluent.a11y.motionScreen.objectResponses.overToolboxStringProperty );
    }
  }

  /**
   * Handle normal navigation between items using strategy
   */
  private handleSelectionNavigation( direction: 'left' | 'right' | 'up' | 'down' ): void {
    const nextItem = this.getNextNavigableItem( direction );
    if ( nextItem && nextItem !== this ) {

      // Update focus management
      this.focusable = false;
      nextItem.focusable = true;
      nextItem.focus();
    }
  }

  /**
   * Update direction of girl or man to match current applied force and velocity of model
   * Called on end drag (both mouse and keyboard)
   */
  private updatePersonDirection( person: Item ): void {

    // default direction is to the left
    let direction: 'left' | 'right' = 'left';

    // if girl or man is already on the stack, direction should match person that is already on the stack
    let personInStack;
    for ( let i = 0; i < this.model.stackedItems.length; i++ ) {
      const itemInStack = this.model.stackedItems.get( i );

      if ( itemInStack === person ) {

        // skip the person that is currently being dragged
        continue;
      }
      if ( itemInStack.name === 'girl' || itemInStack.name === 'man' ) {
        personInStack = itemInStack;
      }
    }
    if ( personInStack ) {
      direction = personInStack.directionProperty.value;
    }
    else if ( person.model.appliedForceProperty.value !== 0 ) {

      // if there is an applied force on the stack, direction should match applied force
      if ( person.model.appliedForceProperty.value > 0 ) {
        direction = 'right';
      }
      else {
        direction = 'left';
      }
    }
    else {
      // if there is no applied force, check velocity for direction
      if ( person.model.velocityProperty.value > 0 ) {
        direction = 'right';
      }
    }
    person.directionProperty.value = direction;
  }

  /**
   * Determine if the item is positioned over the stack area.
   */
  public isOverStackArea(): boolean {
    return this.item.positionProperty.value.y < 350 || !this.motionView.isToolboxContainerVisible();
  }

  /**
   * Place the item on the stack with animation and model updates. Returns the prior stack length.
   */
  public placeItemOnStack(): number {
    const priorLength = this.model.stackedItems.length;

    const height = this.item.getCurrentScale() * this.sittingImageNode.height;
    const imageWidth = this.item.getCurrentScale() * this.sittingImageNode.width;

    this.item.animateTo(
      this.motionView.layoutBounds.width / 2 - imageWidth / 2,
      this.motionView.topOfStack - height,
      'stack'
    );
    this.model.stackedItems.add( this.item );
    if ( this.model.stackedItems.length > 3 ) {
      this.model.spliceStackBottom();
      this.focus();
    }

    // Handle person direction if needed
    if ( this.item.name === 'man' || this.item.name === 'girl' ) {
      this.updatePersonDirection( this.item );
    }

    return priorLength;
  }

  /** Return the item to the toolbox and ensure label alignment is restored. */
  public returnItemToToolbox(): void {
    this.item.animateHome();
    this.labelNode.centerX = this.normalImageNode.centerX;
  }

  /** Compute the next ItemNode to move focus to based on context and direction. */
  private getNextNavigableItem( direction: 'left' | 'right' | 'up' | 'down' ): ItemNode | null {

    // If on stack, navigate within stack (up/left towards top, down/right towards bottom)
    if ( this.item.inStackProperty.value ) {
      const stackItems = this.motionView.itemStackGroup.stackItemNodes;
      const currentIndex = stackItems.indexOf( this );
      if ( currentIndex === -1 ) { return null; }

      const delta = ( direction === 'up' || direction === 'left' ) ? 1 :
                    ( direction === 'down' || direction === 'right' ) ? -1 : 0;
      const newIndex = currentIndex + delta;
      if ( newIndex >= 0 && newIndex < stackItems.length ) {
        return stackItems[ newIndex ];
      }
      return null;
    }
    else {

      // In toolbox, only left/right navigation between available toolbox items
      if ( direction === 'up' || direction === 'down' ) { return null; }
      const itemsInToolbox = this.motionView.itemToolboxGroup.itemNodes.filter( n => !n.item.inStackProperty.value );
      const currentIndex = itemsInToolbox.indexOf( this );
      if ( currentIndex === -1 ) { return null; }
      const delta = ( direction === 'left' ) ? -1 : 1;
      const newIndex = currentIndex + delta;
      if ( newIndex >= 0 && newIndex < itemsInToolbox.length ) {
        return itemsInToolbox[ newIndex ];
      }
      return null;
    }
  }

}

forcesAndMotionBasics.register( 'ItemNode', ItemNode );
