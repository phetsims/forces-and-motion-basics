// Copyright 2013-2025, University of Colorado Boulder

/**
 * Shows the draggable node for any of the items in the Motion, Friction and Acceleration screens.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Matrix3 from '../../../../dot/js/Matrix3.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import BackgroundNode from '../../../../scenery-phet/js/BackgroundNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import HighlightFromNode from '../../../../scenery/js/accessibility/HighlightFromNode.js';
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
import ItemToolboxGroupNode from './ItemToolboxGroupNode.js';
import MotionScreenView from './MotionScreenView.js';

//Workaround for https://github.com/phetsims/scenery/issues/108
const IDENTITY = Matrix3.scaling( 1, 1 );

/**
 * Strategy interface for keyboard navigation behavior.
 * Different contexts (toolbox vs stack) can provide their own implementations.
 */
export type ItemKeyboardStrategy = {
  /**
   * Navigate between items in the same context
   * @param currentItem - The item currently focused
   * @param direction - The navigation direction
   * @returns The item to focus next, or null if navigation not possible
   */
  navigateToItem( currentItem: ItemNode, direction: 'left' | 'right' | 'up' | 'down' ): ItemNode | null;

  /**
   * Called after an item is successfully dropped
   * @param item - The item that was dropped
   * @param droppedOnStack - Whether the item was dropped on stack (true) or returned to toolbox (false)
   * @param wasAlreadyOnStack - Optional: For toolbox drops, whether the item originated from stack (vs toolbox)
   */
  onDropComplete( item: ItemNode, droppedOnStack: boolean, wasAlreadyOnStack?: boolean ): void;

  /**
   * Get the group of items this item belongs to
   * @returns Array of all items in the same context
   */
  getItemGroup(): ItemNode[];

  /**
   * Context-specific accessibility message
   * @param action - The action performed
   * @param location - Where the action occurred
   * @returns The accessibility message to announce
   */
  getAccessibilityMessage( action: 'grabbed' | 'dropped', location: 'stack' | 'toolbox' ): string;
};

export default class ItemNode extends Node {
  private readonly labelNode: Node;
  private readonly normalImageNode: Image;
  public readonly sittingImageNode: Image;
  private readonly dragListener: SoundDragListener;
  private keyboardStrategy: ItemKeyboardStrategy | null = null;
  private keyboardListener: KeyboardListener<OneKeyStroke[]> | null = null;
  private readonly model: MotionModel;
  private readonly motionView: MotionScreenView;

  // Track whether this item was originally on stack when grabbed (for focus management)
  private wasOriginallyOnStack = false;

  // Track original state for escape key functionality
  private originalPosition: Vector2 | null = null;

  // Keep reference to the toolbox group for focus management after drops
  private toolboxGroup: ItemToolboxGroupNode | null = null;

  /**
   * Constructor for ItemNode
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
  public constructor( model: MotionModel,
                      motionView: MotionScreenView,
                      public readonly item: Item,
                      normalImageProperty: TReadOnlyProperty<ImageableImage>,
                      sittingImageProperty: TReadOnlyProperty<ImageableImage>,
                      holdingImageProperty: TReadOnlyProperty<ImageableImage>,
                      showMassesProperty: TReadOnlyProperty<boolean>, itemToolbox: Node, tandem: Tandem ) {

    // Set up strings for mass labels
    const unknownValueIndicatorStringProperty = ForcesAndMotionBasicsFluent.unknownValueIndicatorStringProperty;
    const pattern0MassUnitsKilogramsStringProperty = new PatternStringProperty(
      ForcesAndMotionBasicsFluent.pattern[ '0massUnitsKilogramsStringProperty' ], { mass: item.massProperty }, { formatNames: [ 'mass' ] } );

    // Get the localized item name
    const localizedItemNameProperty = item.name === 'fridge' ? ForcesAndMotionBasicsFluent.a11y.motionScreen.items.names.fridgeStringProperty :
                                      item.name === 'crate1' ? ForcesAndMotionBasicsFluent.a11y.motionScreen.items.names.crate1StringProperty :
                                      item.name === 'crate2' ? ForcesAndMotionBasicsFluent.a11y.motionScreen.items.names.crate2StringProperty :
                                      item.name === 'girl' ? ForcesAndMotionBasicsFluent.a11y.motionScreen.items.names.girlStringProperty :
                                      item.name === 'man' ? ForcesAndMotionBasicsFluent.a11y.motionScreen.items.names.manStringProperty :
                                      item.name === 'trash' ? ForcesAndMotionBasicsFluent.a11y.motionScreen.items.names.trashStringProperty :
                                      item.name === 'mystery' ? ForcesAndMotionBasicsFluent.a11y.motionScreen.items.names.mysteryStringProperty :
                                      ForcesAndMotionBasicsFluent.a11y.motionScreen.items.names.fridgeStringProperty; // fallback

    // Create fluent property for accessible name with mass
    const massUnknownStringProperty = ForcesAndMotionBasicsFluent.a11y.motionScreen.items.massUnknownStringProperty;
    const itemAccessibleNameWithMassProperty = ForcesAndMotionBasicsFluent.a11y.motionScreen.items.itemAccessibleNameWithMass.createProperty( {
      itemName: localizedItemNameProperty,
      mass: item.mystery ? massUnknownStringProperty : pattern0MassUnitsKilogramsStringProperty
    } );

    // Create a derived property that switches between plain name and name with mass
    const accessibleNameProperty = new DerivedProperty(
      [ showMassesProperty, itemAccessibleNameWithMassProperty, localizedItemNameProperty ],
      ( showMasses: boolean, itemNameWithMass: string, localizedItemName: string ): string => {
        return showMasses ? itemNameWithMass : localizedItemName;
      }
    );

    super( {
      cursor: 'pointer',
      scale: item.imageScale,
      tandem: tandem,
      phetioFeatured: true,
      phetioInputEnabledPropertyInstrumented: true,
      visiblePropertyOptions: { phetioFeatured: true },
      tagName: 'button',

      // Keyboard accessibility
      focusable: true,
      ariaRole: 'button',
      accessibleName: accessibleNameProperty
    } );

    this.model = model;
    this.motionView = motionView;

    // translate this node to the item's position
    this.translate( item.positionProperty.get() );

    // Create the node for the main graphic
    const normalImageNode = new Image( normalImageProperty );
    this.normalImageNode = normalImageNode;

    // keep track of the sitting image to track its width for the pusher
    this.sittingImageNode = new Image( sittingImageProperty );

    //When the model changes, update the image position as well as which image is shown
    const updateImage = () => {
      // var centerX = normalImageNode.centerX;
      if ( ( typeof holdingImageProperty.value !== 'undefined' ) && ( item.armsUp() && item.inStackProperty.get() ) ) {
        normalImageNode.imageProperty = holdingImageProperty;
      }
      else if ( item.inStackProperty.get() && typeof sittingImageProperty.value !== 'undefined' ) {
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

    //When the user drags the object, start
    const moveToStack = () => {
      item.inStackProperty.set( true );
      const imageWidth = item.getCurrentScale() * normalImageNode.width;

      // NOTE: similar to MotionModel.spliceStack
      item.animateTo( motionView.layoutBounds.width / 2 - imageWidth / 2, motionView.topOfStack - this.height, 'stack' );
      model.stackedItems.add( item );
      if ( model.stackedItems.length > 3 ) {
        model.spliceStackBottom();
      }
    };


    this.dragListener = new SoundDragListener( {
      tandem: tandem.createTandem( 'dragListener' ),
      positionProperty: item.positionProperty,

      //When picking up an object, remove it from the stack.
      start: () => {
        // Track original state for keyboard escape functionality
        this.wasOriginallyOnStack = item.inStackProperty.get();
        this.originalPosition = item.positionProperty.get().copy();

        //Move it to front (z-order)
        this.moveToFront();

        // move the parent toolbox to the front so that items of one toolbox are not in front of another
        // itemToolbox is in a container so it should not occlude other items in the screen view
        itemToolbox.moveToFront();

        // Set mode to mouseGrabbed when dragging with mouse
        item.modeProperty.set( 'mouseGrabbed' );
        const index = model.stackedItems.indexOf( item );
        if ( index >= 0 ) {
          model.spliceStack( index );
        }
        item.inStackProperty.set( false );

        // Don't allow the user to translate the object while it is animating
        item.cancelAnimation();
      },

      // End the drag
      end: () => {
        // Reset mode based on where the item ends up (let setupModeCalculation handle it)
        // We'll temporarily set to a non-grabbed state to trigger the update
        const toolboxSide = item.getToolboxSide();
        item.modeProperty.set( toolboxSide === 'left' ? 'inLeftToolbox' : 'inRightToolbox' );

        //If the user drops it above the ground, move to the top of the stack on the skateboard, otherwise go back to the original position.
        const droppedOnStack = item.positionProperty.get().y < 350 || !motionView.isToolboxContainerVisible();

        if ( droppedOnStack ) {
          moveToStack();

          // if item is man or girl, rotate depending on the current model velocity and applied force
          if ( item.name === 'man' || item.name === 'girl' ) {
            this.updatePersonDirection( item );
          }
        }
        else {
          // send the item home and make sure that the label is centered
          item.animateHome();
          this.labelNode.centerX = normalImageNode.centerX;
        }

        // Notify keyboard strategy about drop completion
        if ( this.keyboardStrategy ) {
          this.keyboardStrategy.onDropComplete( this, droppedOnStack, this.wasOriginallyOnStack );
        }
      }
    } );
    this.addInputListener( this.dragListener );

    // if the item is being dragged, cancel the drag on reset
    model.resetAllEmitter.addListener( () => {
      // cancel the drag and reset item
      if ( item.userControlledProperty.get() ) {
        this.dragListener.interrupt();
        item.reset();
      }
    } );

    //Label for the mass (if it is shown)
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

    //Update the position of the item
    item.positionProperty.link( position => { this.setTranslation( position ); } );

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

    const highlightFromNode = new HighlightFromNode( this );
    this.focusHighlight = highlightFromNode;

    item.modeProperty.link( mode => {
      if ( mode.startsWith( 'keyboardGrabbed' ) ) {
        highlightFromNode.setDashed( true );
      }
      else {
        highlightFromNode.setDashed( false );
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
   * Get the width of this item node, modified by the current scale factor.  If the item
   * is using its sitting representation, use that to get the scaled width
   */
  public getScaledWidth(): number {

    // if the item has a sitting image, use that image for the width
    let scaledWidth;
    if ( this.sittingImageNode ) {
      scaledWidth = this.sittingImageNode.width * this.item.getCurrentScale();
    }
    else {
      scaledWidth = this.normalImageNode.width * this.item.getCurrentScale();
    }
    return scaledWidth;
  }

  /**
   * Set the keyboard navigation strategy for this item.
   * This determines how keyboard interactions behave based on context (toolbox vs stack).
   * @param strategy - The strategy to use, or null to remove keyboard handling
   * @param toolboxGroup - Optional reference to the toolbox group (used for focus management)
   */
  public setKeyboardStrategy( strategy: ItemKeyboardStrategy | null, toolboxGroup?: ItemToolboxGroupNode ): void {
    // Remove existing keyboard listener if any
    if ( this.keyboardListener ) {
      this.removeInputListener( this.keyboardListener );
      this.keyboardListener = null;
    }

    this.keyboardStrategy = strategy;

    // Store toolbox group reference if provided
    if ( toolboxGroup ) {
      this.toolboxGroup = toolboxGroup;
    }

    if ( strategy ) {
      // Create keyboard listener for item interactions
      this.keyboardListener = new KeyboardListener( {
        keys: [
          'arrowLeft', 'arrowRight', 'arrowUp', 'arrowDown',
          'enter', 'space', 'escape'
        ],
        fireOnDown: false,
        fire: ( event, keysPressed ) => this.handleKeyboardInput( keysPressed )
      } );
      this.addInputListener( this.keyboardListener );
    }
  }

  /**
   * Handle keyboard input based on current state and strategy
   * @param keysPressed - The key(s) that were pressed
   */
  private handleKeyboardInput( keysPressed: string ): void {
    if ( !this.keyboardStrategy ) { return; }

    const isGrabbed = this.item.userControlledProperty.get();

    if ( keysPressed === 'escape' ) {
      this.handleEscapeKey();
      return;
    }

    if ( keysPressed === 'enter' || keysPressed === 'space' ) {
      this.handleSelectKey();
      return;
    }

    // Arrow key navigation
    if ( [ 'arrowLeft', 'arrowRight', 'arrowUp', 'arrowDown' ].includes( keysPressed ) ) {
      const direction = keysPressed.replace( 'arrow', '' ).toLowerCase() as 'left' | 'right' | 'up' | 'down';

      if ( isGrabbed ) {
        this.handleGrabbedNavigation( direction );
      }
      else {
        this.handleNormalNavigation( direction );
      }
    }
  }

  /**
   * Handle escape key to cancel current interaction
   */
  private handleEscapeKey(): void {
    if ( this.item.userControlledProperty.get() && this.originalPosition ) {

      // Cancel interaction and return to original position
      const toolboxSide = this.item.getToolboxSide();
      this.item.modeProperty.set( toolboxSide === 'left' ? 'inLeftToolbox' : 'inRightToolbox' );
      this.item.positionProperty.set( this.originalPosition );

      // Restore original stack state
      if ( this.wasOriginallyOnStack ) {
        this.item.inStackProperty.set( true );
        // Add back to stack if it was originally there
        if ( !this.model.stackedItems.includes( this.item ) ) {
          this.model.stackedItems.add( this.item );
        }
      }
      else {
        this.item.inStackProperty.set( false );
        this.item.animateHome();
      }
    }
  }

  /**
   * Handle enter/space key to grab or drop item
   */
  private handleSelectKey(): void {
    const isGrabbed = this.item.userControlledProperty.get();

    if ( !isGrabbed ) {
      // Grab the item
      this.wasOriginallyOnStack = this.item.inStackProperty.get();
      this.originalPosition = this.item.positionProperty.get().copy();

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
      this.item.inStackProperty.set( false );
      this.item.cancelAnimation();

      // Move to front
      this.moveToFront();

      // If grabbing from toolbox, immediately move to proposed stack position
      if ( !this.wasOriginallyOnStack ) {
        const imageWidth = this.item.getCurrentScale() * this.normalImageNode.width;
        const stackX = this.motionView.layoutBounds.width / 2 - imageWidth / 2;
        const stackY = this.motionView.topOfStack - this.height;
        this.item.positionProperty.set( new Vector2( stackX, stackY ) );
      }

      this.addAccessibleContextResponse( 'grabbed' );
    }
    else {
      // Drop the item at current position

      // Reset mode to a non-grabbed state to trigger proper mode calculation
      const toolboxSide = this.item.getToolboxSide();
      this.item.modeProperty.set( toolboxSide === 'left' ? 'inLeftToolbox' : 'inRightToolbox' );

      // Determine drop location based on current position
      const droppedOnStack = this.item.positionProperty.get().y < 350 || !this.motionView.isToolboxContainerVisible();

      if ( droppedOnStack ) {
        // Complete the stack placement
        this.item.inStackProperty.set( true );
        const imageWidth = this.item.getCurrentScale() * this.normalImageNode.width;
        this.item.animateTo( this.motionView.layoutBounds.width / 2 - imageWidth / 2, this.motionView.topOfStack - this.height, 'stack' );
        this.model.stackedItems.add( this.item );
        if ( this.model.stackedItems.length > 3 ) {
          this.model.spliceStackBottom();
        }

        // Handle person direction if needed
        if ( this.item.name === 'man' || this.item.name === 'girl' ) {
          this.updatePersonDirection( this.item );
        }
      }
      else {
        // Return to toolbox
        this.item.animateHome();
        this.labelNode.centerX = this.normalImageNode.centerX;
      }

      // Handle focus management after drop
      if ( droppedOnStack ) {
        if ( !this.wasOriginallyOnStack && this.toolboxGroup ) {
          // Item was dropped from toolbox to stack - focus next toolbox item
          this.toolboxGroup.focusNextItemInToolbox( this );
        }
        else if ( this.wasOriginallyOnStack ) {
          // Item was dropped back onto stack from where it came - preserve focus on this item
          // Ensure this item remains focusable and focused after the transfer
          this.focusable = true;
          // Focus will be maintained since item is staying on the stack
          this.focus();
        }
      }

      // Still notify the strategy for other handling
      if ( this.keyboardStrategy ) {
        this.keyboardStrategy.onDropComplete( this, droppedOnStack, this.wasOriginallyOnStack );
      }
    }
  }

  /**
   * Handle navigation while item is grabbed (cycling through drop positions)
   */
  private handleGrabbedNavigation( direction: 'left' | 'right' | 'up' | 'down' ): void {
    if ( !this.originalPosition ) { return; }

    // For grabbed items, any arrow key cycles between home (toolbox) and stack positions
    const currentY = this.item.positionProperty.get().y;

    // Determine the home position - for items grabbed from stack, use their reset position (toolbox)
    // For items grabbed from toolbox, use their original position
    const homePosition = this.wasOriginallyOnStack ?
                         new Vector2( this.item.positionProperty.initialValue.x, this.item.positionProperty.initialValue.y ) :
                         this.originalPosition;

    const isAtHome = Math.abs( currentY - homePosition.y ) < 50; // Within 50 pixels of home position

    if ( isAtHome ) {
      // Move to stack position
      const imageWidth = this.item.getCurrentScale() * this.normalImageNode.width;
      const stackX = this.motionView.layoutBounds.width / 2 - imageWidth / 2;
      const stackY = this.motionView.topOfStack - this.height;
      this.item.positionProperty.set( new Vector2( stackX, stackY ) );
    }
    else {
      // Move back to home position
      this.item.positionProperty.set( homePosition );
    }
  }

  /**
   * Handle normal navigation between items using strategy
   */
  private handleNormalNavigation( direction: 'left' | 'right' | 'up' | 'down' ): void {
    if ( !this.keyboardStrategy ) { return; }

    const nextItem = this.keyboardStrategy.navigateToItem( this, direction );
    if ( nextItem ) {

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
      direction = personInStack.directionProperty.get();
    }
    else if ( person.context.appliedForceProperty.get() !== 0 ) {
      // if there is an applied force on the stack, direction should match applied force
      if ( person.context.appliedForceProperty.get() > 0 ) {
        direction = 'right';
      }
      else {
        direction = 'left';
      }
    }
    else {
      // if there is no applied force, check velocity for direction
      if ( person.context.velocityProperty.get() > 0 ) {
        direction = 'right';
      }
    }
    person.directionProperty.set( direction );
  }
}

forcesAndMotionBasics.register( 'ItemNode', ItemNode );